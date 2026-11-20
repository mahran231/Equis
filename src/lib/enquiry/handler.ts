import { enquiryRequestSchema, enquirySchema, fieldErrors, spamFieldsSchema } from "@/lib/validation/enquiry";
import { createRateLimiter, isTooFast } from "@/lib/spam/rateLimit";
import type { EnquiryDelivery } from "./adapter";

export type EnquiryResponse =
  | { status: "ok" }
  | { status: "invalid"; errors: Record<string, string> }
  | { status: "rejected" }
  | { status: "rate_limited"; retryAfterSeconds: number }
  | { status: "not_configured" }
  | { status: "error" };

export const MAX_BODY_BYTES = 10_000;

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
export const __resetRateLimit = () => limiter.reset();

/** Logs only outcome codes — never names, contact details or messages. */
function log(event: string, extra: Record<string, string | number> = {}) {
  console.info(JSON.stringify({ scope: "enquiry", event, ...extra }));
}

/**
 * Pure request handler, independent of Next.js so it can be unit-tested.
 * Returns an HTTP status code and a JSON body.
 */
export async function handleEnquiry(input: {
  rawBody: string;
  clientKey: string;
  provider: EnquiryDelivery | null;
  now?: number;
}): Promise<{ status: number; body: EnquiryResponse; headers?: Record<string, string> }> {
  const now = input.now ?? Date.now();

  if (input.rawBody.length > MAX_BODY_BYTES) {
    log("rejected", { reason: "too_large" });
    return { status: 413, body: { status: "rejected" } };
  }

  const rate = limiter.check(input.clientKey, now);
  if (!rate.allowed) {
    log("rate_limited");
    const retryAfterSeconds = Math.ceil(rate.retryAfterMs / 1000);
    return {
      status: 429,
      body: { status: "rate_limited", retryAfterSeconds },
      headers: { "Retry-After": String(retryAfterSeconds) },
    };
  }

  let json: unknown;
  try {
    json = JSON.parse(input.rawBody);
  } catch {
    log("rejected", { reason: "bad_json" });
    return { status: 400, body: { status: "rejected" } };
  }

  const envelope = enquiryRequestSchema.safeParse(json);
  if (!envelope.success || !spamFieldsSchema.safeParse(envelope.data.meta).success) {
    log("rejected", { reason: "spam_or_shape" });
    return { status: 400, body: { status: "rejected" } };
  }
  if (isTooFast(envelope.data.meta.startedAt, now)) {
    log("rejected", { reason: "too_fast" });
    return { status: 400, body: { status: "rejected" } };
  }

  const parsed = enquirySchema.safeParse(envelope.data.enquiry);
  if (!parsed.success) {
    log("invalid", { fields: Object.keys(fieldErrors(parsed.error)).join(",") });
    return { status: 400, body: { status: "invalid", errors: fieldErrors(parsed.error) } };
  }

  if (!input.provider) {
    log("not_configured");
    return { status: 503, body: { status: "not_configured" } };
  }

  const result = await input.provider.deliver(parsed.data, {
    locale: envelope.data.meta.locale,
    receivedAt: new Date(now).toISOString(),
  });
  if (!result.ok) {
    log("delivery_failed", { provider: input.provider.name, reason: result.reason });
    return { status: 502, body: { status: "error" } };
  }

  log("delivered", { provider: input.provider.name });
  return { status: 200, body: { status: "ok" } };
}

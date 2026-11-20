import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { __resetRateLimit, handleEnquiry } from "@/lib/enquiry/handler";
import type { EnquiryDelivery } from "@/lib/enquiry/adapter";

const NOW = 1_800_000_000_000;
const enquiry = {
  name: "Secret Name",
  email: "secret@example.com",
  phone: "",
  country: "",
  goal: "",
  preferredContact: "email",
  message: "private message text",
  consent: true,
};
const body = (overrides: Record<string, unknown> = {}, meta: Record<string, unknown> = {}) =>
  JSON.stringify({
    enquiry: { ...enquiry, ...overrides },
    meta: { website: "", startedAt: NOW - 10_000, locale: "en", ...meta },
  });

const okProvider: EnquiryDelivery = { name: "test", deliver: vi.fn(async () => ({ ok: true as const })) };
const failingProvider: EnquiryDelivery = {
  name: "test",
  deliver: async () => ({ ok: false as const, reason: "provider_error" as const }),
};

let logSpy: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  __resetRateLimit();
  logSpy = vi.spyOn(console, "info").mockImplementation(() => {});
});
afterEach(() => logSpy.mockRestore());

const run = (rawBody: string, provider: EnquiryDelivery | null = okProvider, clientKey = "1.1.1.1") =>
  handleEnquiry({ rawBody, provider, clientKey, now: NOW });

describe("handleEnquiry", () => {
  it("reports success only when the provider confirms delivery", async () => {
    const r = await run(body());
    expect(r.status).toBe(200);
    expect(r.body).toEqual({ status: "ok" });
    expect(okProvider.deliver).toHaveBeenCalledOnce();
  });

  it("never fakes success when no provider is configured", async () => {
    const r = await run(body(), null);
    expect(r.status).toBe(503);
    expect(r.body.status).toBe("not_configured");
  });

  it("returns an error when the provider fails", async () => {
    const r = await run(body(), failingProvider);
    expect(r.status).toBe(502);
    expect(r.body.status).toBe("error");
  });

  it("validates on the server and returns field error keys", async () => {
    const r = await run(body({ name: "", email: "", consent: false }));
    expect(r.status).toBe(400);
    expect(r.body).toMatchObject({ status: "invalid", errors: { name: "nameRequired", consent: "consentRequired" } });
  });

  it("rejects honeypot submissions", async () => {
    const r = await run(body({}, { website: "http://spam" }));
    expect(r.status).toBe(400);
    expect(r.body.status).toBe("rejected");
  });

  it("rejects submissions that are too fast to be human", async () => {
    const r = await run(body({}, { startedAt: NOW - 500 }));
    expect(r.body.status).toBe("rejected");
  });

  it("rejects malformed JSON and oversized bodies", async () => {
    expect((await run("{not json")).status).toBe(400);
    expect((await run("x".repeat(20_000))).status).toBe(413);
  });

  it("rate limits repeated submissions from one client", async () => {
    for (let i = 0; i < 5; i++) expect((await run(body(), okProvider, "9.9.9.9")).status).toBe(200);
    const r = await run(body(), okProvider, "9.9.9.9");
    expect(r.status).toBe(429);
    expect(r.headers?.["Retry-After"]).toBeDefined();
    expect((await run(body(), okProvider, "8.8.8.8")).status).toBe(200);
  });

  it("never logs personal data from the payload", async () => {
    await run(body());
    await run(body({ email: "bad" }));
    await run(body(), null);
    const logged = logSpy.mock.calls.flat().join(" ");
    expect(logged).not.toContain("Secret Name");
    expect(logged).not.toContain("secret@example.com");
    expect(logged).not.toContain("private message text");
  });
});

import type { Enquiry } from "@/lib/validation/enquiry";

export type DeliveryResult = { ok: true } | { ok: false; reason: "provider_error" | "network_error" };

export interface EnquiryDelivery {
  readonly name: string;
  deliver(enquiry: Enquiry, meta: { locale: string; receivedAt: string }): Promise<DeliveryResult>;
}

type Env = Record<string, string | undefined>;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function formatEnquiry(e: Enquiry, meta: { locale: string; receivedAt: string }) {
  const rows: [string, string][] = [
    ["Name", e.name],
    ["Email", e.email || "—"],
    ["Phone / WhatsApp", e.phone || "—"],
    ["Country", e.country || "—"],
    ["Main goal", e.goal || "—"],
    ["Preferred contact", e.preferredContact],
    ["Message", e.message || "—"],
    ["Consent to be contacted", e.consent ? "Yes" : "No"],
    ["Site language", meta.locale],
    ["Received", meta.receivedAt],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="vertical-align:top;color:#183F35">${escapeHtml(k)}</th><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;
  return { subject: `New EQUIS consultation enquiry — ${e.name}`, text, html };
}

/** Resend (https://resend.com) transactional email API — no SDK needed. */
function resendProvider(apiKey: string, to: string, from: string): EnquiryDelivery {
  return {
    name: "resend",
    async deliver(enquiry, meta) {
      const { subject, text, html } = formatEnquiry(enquiry, meta);
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from,
            to: [to],
            subject,
            text,
            html,
            ...(enquiry.email ? { reply_to: enquiry.email } : {}),
          }),
          signal: AbortSignal.timeout(10_000),
        });
        return res.ok ? { ok: true } : { ok: false, reason: "provider_error" };
      } catch {
        return { ok: false, reason: "network_error" };
      }
    },
  };
}

/**
 * Generic HTTPS webhook (form backends, automation tools, your own endpoint).
 * Success requires a 2xx response from the destination.
 */
function webhookProvider(url: string, apiKey?: string): EnquiryDelivery {
  return {
    name: "webhook",
    async deliver(enquiry, meta) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
          },
          body: JSON.stringify({ type: "equis.consultation_enquiry", enquiry, meta }),
          signal: AbortSignal.timeout(10_000),
        });
        return res.ok ? { ok: true } : { ok: false, reason: "provider_error" };
      } catch {
        return { ok: false, reason: "network_error" };
      }
    },
  };
}

/**
 * Returns the configured delivery provider, or null when online enquiries are
 * not set up. Callers must treat null as "cannot accept enquiries" and never
 * report success.
 */
export function getDeliveryProvider(env: Env = process.env): EnquiryDelivery | null {
  const provider = env.ENQUIRY_PROVIDER?.trim().toLowerCase();
  const apiKey = env.ENQUIRY_PROVIDER_API_KEY?.trim();
  const destination = env.ENQUIRY_DESTINATION?.trim();
  if (!provider || !destination) return null;

  if (provider === "resend") {
    const from = env.ENQUIRY_FROM?.trim();
    if (!apiKey || !from || !destination.includes("@")) return null;
    return resendProvider(apiKey, destination, from);
  }
  if (provider === "webhook") {
    try {
      const url = new URL(destination);
      if (url.protocol !== "https:") return null;
    } catch {
      return null;
    }
    return webhookProvider(destination, apiKey || undefined);
  }
  return null;
}

export function isEnquiryConfigured(env: Env = process.env) {
  return getDeliveryProvider(env) !== null;
}

import { afterEach, describe, expect, it, vi } from "vitest";
import { formatEnquiry, getDeliveryProvider, isEnquiryConfigured } from "@/lib/enquiry/adapter";

const enquiry = {
  name: "<b>Ana</b>",
  email: "ana@example.com",
  phone: "",
  country: "EG" as const,
  goal: "" as const,
  preferredContact: "email" as const,
  message: "hi",
  consent: true,
};

afterEach(() => vi.unstubAllGlobals());

describe("getDeliveryProvider", () => {
  it("is not configured by default", () => {
    expect(getDeliveryProvider({})).toBeNull();
    expect(isEnquiryConfigured({})).toBe(false);
  });

  it("requires complete Resend settings", () => {
    expect(getDeliveryProvider({ ENQUIRY_PROVIDER: "resend", ENQUIRY_DESTINATION: "a@b.co" })).toBeNull();
    const p = getDeliveryProvider({
      ENQUIRY_PROVIDER: "resend",
      ENQUIRY_PROVIDER_API_KEY: "key",
      ENQUIRY_DESTINATION: "inbox@example.com",
      ENQUIRY_FROM: "EQUIS <enquiries@example.com>",
    });
    expect(p?.name).toBe("resend");
  });

  it("only accepts https webhooks", () => {
    expect(getDeliveryProvider({ ENQUIRY_PROVIDER: "webhook", ENQUIRY_DESTINATION: "http://x.test" })).toBeNull();
    expect(getDeliveryProvider({ ENQUIRY_PROVIDER: "webhook", ENQUIRY_DESTINATION: "https://x.test/hook" })?.name).toBe(
      "webhook",
    );
  });

  it("ignores unknown providers", () => {
    expect(getDeliveryProvider({ ENQUIRY_PROVIDER: "carrier-pigeon", ENQUIRY_DESTINATION: "x" })).toBeNull();
  });

  it("treats non-2xx and network failures as failure", async () => {
    const p = getDeliveryProvider({ ENQUIRY_PROVIDER: "webhook", ENQUIRY_DESTINATION: "https://x.test/hook" })!;
    const meta = { locale: "en", receivedAt: "now" };
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("", { status: 500 })),
    );
    expect(await p.deliver(enquiry, meta)).toEqual({ ok: false, reason: "provider_error" });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("down");
      }),
    );
    expect(await p.deliver(enquiry, meta)).toEqual({ ok: false, reason: "network_error" });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("{}", { status: 200 })),
    );
    expect(await p.deliver(enquiry, meta)).toEqual({ ok: true });
  });
});

describe("formatEnquiry", () => {
  it("escapes HTML in the email body", () => {
    const { html, text } = formatEnquiry(enquiry, { locale: "en", receivedAt: "now" });
    expect(html).toContain("&lt;b&gt;Ana&lt;/b&gt;");
    expect(html).not.toContain("<b>Ana</b>");
    expect(text).toContain("Name: <b>Ana</b>");
  });
});

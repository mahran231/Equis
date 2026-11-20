import { describe, expect, it } from "vitest";
import en from "@/messages/en.json";
import ar from "@/messages/ar-EG.json";
import fr from "@/messages/fr.json";
import { businessConfig } from "@/config/business";
import { contentConfig } from "@/config/content";
import { enabledPages, mainNav } from "@/config/pages";
import { getContactChannels, getSocialLinks } from "@/lib/contact";
import { createRateLimiter } from "@/lib/spam/rateLimit";

function shape(value: unknown, path = ""): string[] {
  if (Array.isArray(value)) return [`${path}[${value.length}]`, ...value.flatMap((v, i) => shape(v, `${path}[${i}]`))];
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([k, v]) => shape(v, path ? `${path}.${k}` : k));
  return [path];
}

describe("translations", () => {
  it("Arabic and French have exactly the same keys as English", () => {
    const base = shape(en).sort();
    expect(shape(ar).sort()).toEqual(base);
    expect(shape(fr).sort()).toEqual(base);
  });

  it("contain no empty strings", () => {
    for (const messages of [en, ar, fr]) {
      const walk = (v: unknown): void => {
        if (typeof v === "string") expect(v.trim().length).toBeGreaterThan(0);
        else if (v && typeof v === "object") Object.values(v).forEach(walk);
      };
      walk(messages);
    }
  });

  it("publish no prices or specific weight-change figures", () => {
    const all = JSON.stringify([en, ar, fr]);
    expect(all).not.toMatch(/\b\d+\s?(kg|kilos?|lbs?)\b|كيلو\s?\d|\d\s?كيلو|EGP|USD|AED|SAR|\$\d|€\s?\d|جنيه/i);
  });
});

describe("content gating", () => {
  it("hides transformations and resources by default", () => {
    expect(contentConfig.transformationsEnabled).toBe(false);
    expect(contentConfig.recipesEnabled).toBe(false);
    const keys = enabledPages.map((p) => p.key);
    expect(keys).not.toContain("transformations");
    expect(keys).not.toContain("resources");
    expect(mainNav.map((p) => p.key)).toEqual(["about", "services", "howItWorks", "faq", "contact"]);
  });

  it("includes every required public page", () => {
    const keys = enabledPages.map((p) => p.key);
    for (const k of ["home", "about", "services", "howItWorks", "faq", "contact", "privacy", "terms"]) {
      expect(keys).toContain(k);
    }
  });
});

describe("contact details", () => {
  it("publishes nothing while business details are blank", () => {
    expect(getContactChannels(businessConfig)).toEqual([]);
    expect(getSocialLinks(businessConfig)).toEqual([]);
  });

  it("builds safe links only from valid configured values", () => {
    const cfg = {
      ...businessConfig,
      contactEmail: "hello@example.com",
      phone: "+20 100 123 4567",
      whatsappNumber: "00971 50 123 4567",
      social: { instagram: "https://instagram.com/x", facebook: "not a url", tiktok: "", youtube: "" },
    };
    const channels = getContactChannels(cfg);
    expect(channels.map((c) => c.href)).toEqual([
      "mailto:hello@example.com",
      "tel:+201001234567",
      "https://wa.me/971501234567",
    ]);
    expect(getSocialLinks(cfg)).toEqual([{ network: "instagram", href: "https://instagram.com/x" }]);
  });
});

describe("rate limiter", () => {
  it("allows up to the limit per window and then recovers", () => {
    const rl = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(rl.check("a", 0).allowed).toBe(true);
    expect(rl.check("a", 10).allowed).toBe(true);
    expect(rl.check("a", 20).allowed).toBe(false);
    expect(rl.check("a", 1011).allowed).toBe(true);
  });
});

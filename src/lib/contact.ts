import { businessConfig } from "@/config/business";

/** Keep only digits (and a leading +) so we never publish malformed links. */
function normalizePhone(raw: string) {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/[^\d]/g, "");
  if (digits.length < 7) return null;
  return { display: trimmed, e164: `+${digits.replace(/^00/, "")}` };
}

function isHttpUrl(value: string) {
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export type ContactChannel = {
  kind: "email" | "phone" | "whatsapp";
  href: string;
  display: string;
};

/** Only channels with real, configured values are returned. */
export function getContactChannels(cfg = businessConfig): ContactChannel[] {
  const out: ContactChannel[] = [];
  if (cfg.contactEmail && isEmail(cfg.contactEmail)) {
    const email = cfg.contactEmail.trim();
    out.push({ kind: "email", href: `mailto:${email}`, display: email });
  }
  const phone = cfg.phone ? normalizePhone(cfg.phone) : null;
  if (phone) out.push({ kind: "phone", href: `tel:${phone.e164}`, display: phone.display });
  const wa = cfg.whatsappNumber ? normalizePhone(cfg.whatsappNumber) : null;
  if (wa) {
    out.push({
      kind: "whatsapp",
      href: `https://wa.me/${wa.e164.slice(1)}`,
      display: wa.display,
    });
  }
  return out;
}

/** WhatsApp chat link, optionally with a pre-filled first message. Null when no number is configured. */
export function getWhatsAppLink(prefill?: string, cfg = businessConfig): string | null {
  const wa = cfg.whatsappNumber ? normalizePhone(cfg.whatsappNumber) : null;
  if (!wa) return null;
  const base = `https://wa.me/${wa.e164.slice(1)}`;
  return prefill ? `${base}?text=${encodeURIComponent(prefill)}` : base;
}

export type SocialLink = { network: keyof typeof businessConfig.social; href: string };

export function getSocialLinks(cfg = businessConfig): SocialLink[] {
  return (Object.entries(cfg.social) as [SocialLink["network"], string][])
    .filter(([, href]) => href && isHttpUrl(href))
    .map(([network, href]) => ({ network, href }));
}

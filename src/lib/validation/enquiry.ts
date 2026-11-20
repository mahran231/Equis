import { z } from "zod";

export const COUNTRIES = ["EG", "SA", "AE", "KW", "QA", "BH", "OM", "other"] as const;
export const GOALS = ["fat-loss", "muscle-gain", "recomposition", "nutrition-training", "not-sure"] as const;
export const CONTACT_METHODS = ["email", "phone", "whatsapp"] as const;
export const MESSAGE_MAX = 1000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidPhone(value: string) {
  if (!/^\+?[\d\s\-().]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "").length;
  return digits >= 7 && digits <= 15;
}

/**
 * Public consultation enquiry. Error messages are translation keys
 * (contact.form.errors.*) so client and server share one schema.
 * Deliberately contains NO health, body-measurement or medical fields.
 */
export const enquirySchema = z
  .object({
    name: z.string().trim().min(1, "nameRequired").max(100, "nameTooLong"),
    email: z
      .string()
      .trim()
      .max(254, "emailInvalid")
      .refine((v) => v === "" || EMAIL_RE.test(v), "emailInvalid"),
    phone: z
      .string()
      .trim()
      .max(32, "phoneInvalid")
      .refine((v) => v === "" || isValidPhone(v), "phoneInvalid"),
    country: z.union([z.enum(COUNTRIES), z.literal("")]),
    goal: z.union([z.enum(GOALS), z.literal("")]),
    preferredContact: z.enum(CONTACT_METHODS, { error: "methodRequired" }),
    message: z.string().trim().max(MESSAGE_MAX, "messageTooLong"),
    consent: z.boolean().refine((v) => v === true, "consentRequired"),
  })
  .superRefine(
    (data, ctx) => {
      // Runs even when other fields are invalid (see `when`), so read defensively.
      const raw = data as Partial<Record<"email" | "phone" | "preferredContact", unknown>>;
      const email = typeof raw.email === "string" ? raw.email.trim() : "";
      const phone = typeof raw.phone === "string" ? raw.phone.trim() : "";
      if (!email && !phone) {
        ctx.addIssue({ code: "custom", path: ["email"], message: "contactRequired" });
        ctx.addIssue({ code: "custom", path: ["phone"], message: "contactRequired" });
        return;
      }
      if (raw.preferredContact === "email" && !email) {
        ctx.addIssue({ code: "custom", path: ["preferredContact"], message: "methodEmailMissing" });
      }
      if ((raw.preferredContact === "phone" || raw.preferredContact === "whatsapp") && !phone) {
        ctx.addIssue({ code: "custom", path: ["preferredContact"], message: "methodPhoneMissing" });
      }
    },
    // Show the "email or phone" error together with the other field errors.
    { when: (payload) => typeof payload.value === "object" && payload.value !== null },
  );

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

/** Anti-spam fields added to the payload by the browser form only. */
export const spamFieldsSchema = z.object({
  website: z.string().max(0), // honeypot: must stay empty
  startedAt: z.number().int().positive(),
  locale: z.enum(["ar-EG", "en", "fr"]),
});

export const enquiryRequestSchema = z.object({
  enquiry: z.unknown(),
  meta: spamFieldsSchema,
});

export type EnquiryErrorKey =
  | "nameRequired"
  | "nameTooLong"
  | "emailInvalid"
  | "phoneInvalid"
  | "contactRequired"
  | "methodRequired"
  | "methodEmailMissing"
  | "methodPhoneMissing"
  | "messageTooLong"
  | "consentRequired";

/** Flatten Zod issues into { field: errorKey } (first issue per field). */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");
    if (!out[field]) out[field] = issue.message;
  }
  return out;
}

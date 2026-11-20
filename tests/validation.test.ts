import { describe, expect, it } from "vitest";
import { enquirySchema, fieldErrors } from "@/lib/validation/enquiry";

const valid = {
  name: "Test Person",
  email: "test@example.com",
  phone: "",
  country: "EG",
  goal: "fat-loss",
  preferredContact: "email",
  message: "",
  consent: true,
};

const errorsFor = (input: unknown) => {
  const r = enquirySchema.safeParse(input);
  return r.success ? {} : fieldErrors(r.error);
};

describe("enquirySchema", () => {
  it("accepts a minimal valid enquiry", () => {
    expect(enquirySchema.safeParse(valid).success).toBe(true);
  });

  it("requires a name", () => {
    expect(errorsFor({ ...valid, name: "   " }).name).toBe("nameRequired");
  });

  it("requires at least one of email or phone", () => {
    const e = errorsFor({ ...valid, email: "", phone: "" });
    expect(e.email).toBe("contactRequired");
    expect(e.phone).toBe("contactRequired");
  });

  it("accepts phone-only with WhatsApp preference", () => {
    expect(
      enquirySchema.safeParse({ ...valid, email: "", phone: "+20 100 000 0000", preferredContact: "whatsapp" }).success,
    ).toBe(true);
  });

  it("requires the chosen contact method to have matching details", () => {
    expect(errorsFor({ ...valid, preferredContact: "whatsapp" }).preferredContact).toBe("methodPhoneMissing");
    expect(
      errorsFor({ ...valid, email: "", phone: "+971 50 000 0000", preferredContact: "email" }).preferredContact,
    ).toBe("methodEmailMissing");
  });

  it("requires consent", () => {
    expect(errorsFor({ ...valid, consent: false }).consent).toBe("consentRequired");
  });

  it("rejects invalid email and phone formats", () => {
    expect(errorsFor({ ...valid, email: "nope" }).email).toBe("emailInvalid");
    expect(errorsFor({ ...valid, phone: "12ab" }).phone).toBe("phoneInvalid");
  });

  it("limits message length", () => {
    expect(errorsFor({ ...valid, message: "x".repeat(1001) }).message).toBe("messageTooLong");
  });

  it("rejects unknown country/goal values", () => {
    expect(errorsFor({ ...valid, country: "XX" }).country).toBeDefined();
    expect(errorsFor({ ...valid, goal: "lose 10kg in 2 weeks" }).goal).toBeDefined();
  });

  it("collects no health or body data and strips unknown fields", () => {
    const keys = Object.keys(enquirySchema.shape ?? {});
    for (const forbidden of ["weight", "height", "medical", "medications", "allergies", "photo", "measurements"]) {
      expect(keys.join(",")).not.toMatch(new RegExp(forbidden, "i"));
    }
    const parsed = enquirySchema.parse({ ...valid, weight: 90, medications: "x" });
    expect(parsed).not.toHaveProperty("weight");
    expect(parsed).not.toHaveProperty("medications");
  });
});

describe("enquirySchema cross-field errors", () => {
  it("reports missing contact details alongside other field errors", () => {
    const e = errorsFor({ name: "", email: "", phone: "", country: "", goal: "", message: "", consent: false });
    expect(e).toMatchObject({ name: "nameRequired", email: "contactRequired", consent: "consentRequired" });
  });
});

import type { Locale } from "@/config/site";

/**
 * Approved, authentic content only.
 *
 * These lists are intentionally empty. Add an entry only when the owner has
 * supplied the real material AND written publication consent for that exact
 * item. Never add AI-generated, stock or invented client content.
 * The matching flag in src/config/content.ts must also be enabled.
 */

type Localized = Record<Locale, string>;

export type Testimonial = {
  id: string;
  quote: Localized;
  /** Name or initials exactly as the client approved for publication. */
  attribution: string;
  consentConfirmed: true;
};

export type Transformation = {
  id: string;
  /** Path under /public/images/transformations/ */
  image: string;
  imageAlt: Localized;
  caption: Localized;
  consentConfirmed: true;
};

export type Resource = {
  id: string;
  title: Localized;
  summary: Localized;
  body: Localized;
};

export const testimonials: Testimonial[] = [];
export const transformations: Transformation[] = [];
export const resources: Resource[] = [];

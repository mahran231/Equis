import { siteConfig, type Locale } from "@/config/site";

export function dirFor(locale: Locale) {
  return siteConfig.direction[locale];
}

/** BCP-47 tag used for Open Graph (e.g. ar_EG). */
export function ogLocale(locale: Locale) {
  return { "ar-EG": "ar_EG", en: "en_US", fr: "fr_FR" }[locale];
}

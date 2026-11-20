import { defineRouting } from "next-intl/routing";
import { siteConfig } from "@/config/site";

export const routing = defineRouting({
  locales: siteConfig.locales,
  defaultLocale: siteConfig.defaultLocale,
  // Short, readable URL prefixes: /ar, /en, /fr
  localePrefix: {
    mode: "always",
    prefixes: { "ar-EG": "/ar", en: "/en", fr: "/fr" },
  },
  // Remember the visitor's choice for a year.
  localeCookie: { maxAge: 60 * 60 * 24 * 365 },
  // hreflang alternates are emitted through page metadata instead.
  alternateLinks: false,
});

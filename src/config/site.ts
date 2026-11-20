export const siteConfig = {
  name: "EQUIS",
  descriptor: "Nutrition",
  defaultLocale: "ar-EG" as const,
  locales: ["ar-EG", "en", "fr"] as const,
  direction: {
    "ar-EG": "rtl",
    en: "ltr",
    fr: "ltr",
  } as const,
  // Set NEXT_PUBLIC_SITE_URL to the official domain before launch (see docs/OPEN_ITEMS.md).
  // The fallback is a local URL so no invented domain is ever published.
  publicUrl: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
};

export type Locale = (typeof siteConfig.locales)[number];

import type { MetadataRoute } from "next";
import { enabledPages } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { languageAlternates, localizedUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return enabledPages.flatMap((page) =>
    siteConfig.locales.map((locale) => ({
      url: localizedUrl(locale, page.href),
      changeFrequency: "monthly" as const,
      priority: page.key === "home" ? 1 : page.key === "privacy" || page.key === "terms" ? 0.3 : 0.7,
      alternates: { languages: languageAlternates(page.href) },
    })),
  );
}

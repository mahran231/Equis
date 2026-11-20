import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig, type Locale } from "@/config/site";
import { contentConfig } from "@/config/content";
import { getPathname } from "@/i18n/navigation";
import { ogLocale } from "@/lib/i18n/locale";
import type { PageKey } from "@/config/pages";

export function absoluteUrl(path: string) {
  return `${siteConfig.publicUrl}${path === "/" ? "" : path}`;
}

export function localizedUrl(locale: Locale, href: string) {
  return absoluteUrl(getPathname({ locale, href }));
}

/** hreflang map for every locale plus x-default (the default locale). */
export function languageAlternates(href: string) {
  const languages: Record<string, string> = {};
  for (const l of siteConfig.locales) languages[l] = localizedUrl(l, href);
  languages["x-default"] = localizedUrl(siteConfig.defaultLocale, href);
  return languages;
}

export async function pageMetadata(
  locale: Locale,
  key: Exclude<PageKey, "transformations" | "resources">,
  href: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t(`${key}.title`);
  const description = t(`${key}.description`);
  const url = localizedUrl(locale, href);
  return {
    title: key === "home" ? { absolute: t("defaultTitle") } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(href) },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: key === "home" ? t("defaultTitle") : `${title} | ${t("siteName")}`,
      description,
      url,
      locale: ogLocale(locale),
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: t("siteName") }],
    },
    twitter: { card: "summary_large_image", images: ["/og-image.png"] },
    robots: contentConfig.copyApproved ? undefined : { index: false, follow: true },
  };
}

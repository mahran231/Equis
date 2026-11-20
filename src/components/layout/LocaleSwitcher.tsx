"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig, type Locale } from "@/config/site";

const labels: Record<Locale, { short: string; full: string }> = {
  "ar-EG": { short: "ع", full: "العربية" },
  en: { short: "EN", full: "English" },
  fr: { short: "FR", full: "Français" },
};

export function LocaleSwitcher({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const t = useTranslations("nav");
  const active = useLocale() as Locale;
  // Pathname without the locale prefix, so the visitor stays on the equivalent page.
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")}>
      <ul className="flex items-center gap-1">
        {siteConfig.locales.map((l) => {
          const isActive = l === active;
          return (
            <li key={l}>
              <Link
                href={pathname}
                locale={l}
                hrefLang={l}
                lang={l}
                aria-current={isActive ? "true" : undefined}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2.5 text-sm font-semibold transition-colors ${
                  isActive ? "bg-evergreen text-cream" : "text-evergreen hover:bg-white"
                }`}
              >
                {variant === "full" ? labels[l].full : <span aria-hidden="true">{labels[l].short}</span>}
                {variant === "compact" ? <span className="sr-only">{labels[l].full}</span> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

import { getTranslations } from "next-intl/server";

export async function SkipLink() {
  const t = await getTranslations("nav");
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-evergreen focus:px-4 focus:py-3 focus:text-cream"
    >
      {t("skipToContent")}
    </a>
  );
}

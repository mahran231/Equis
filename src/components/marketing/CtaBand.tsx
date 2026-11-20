import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";

export async function CtaBand() {
  const t = await getTranslations();
  return (
    <section aria-labelledby="cta-title" className="bg-cream py-16 md:py-24">
      <div className="container-site">
        <div className="flex flex-col items-start gap-8 rounded-[14px] bg-evergreen p-8 text-cream md:flex-row md:items-center md:justify-between md:p-14">
          <div className="max-w-xl">
            <h2 id="cta-title" className="font-serif text-3xl font-medium md:text-4xl">
              {t("home.finalCta.title")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-cream/85">{t("home.finalCta.lead")}</p>
          </div>
          <ButtonLink href="/contact" variant="inverse" className="shrink-0">
            {t("common.ctaPrimary")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

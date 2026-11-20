import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Section";
import { Symbol } from "@/components/layout/Logo";

type Service = { id: string; title: string };

export async function Hero() {
  const t = await getTranslations();
  const services = t.raw("services.items") as Service[];

  return (
    <section aria-labelledby="hero-title" className="bg-cream">
      <div className="container-site grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <Eyebrow>{t("home.hero.eyebrow")}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-4 font-serif text-[2.6rem] leading-[1.05] font-medium text-balance sm:text-5xl lg:text-[3.6rem]"
          >
            {t("home.hero.title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-evergreen/80 md:text-xl">{t("home.hero.lead")}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">{t("common.ctaPrimary")}</ButtonLink>
            <ButtonLink href="/how-it-works" variant="secondary">
              {t("common.ctaSecondary")}
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-[14px] border border-neutral bg-white p-8 md:p-10">
          <Symbol className="mx-auto w-28 md:w-36" />
          <ul className="mt-8 divide-y divide-neutral border-y border-neutral">
            {services.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-4 py-3.5">
                <span className="font-medium">{s.title}</span>
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

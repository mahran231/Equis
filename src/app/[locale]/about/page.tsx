import { getTranslations } from "next-intl/server";
import { resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { businessConfig } from "@/config/business";
import { PageHeader } from "@/components/marketing/PageHeader";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Section } from "@/components/ui/Section";
import { Symbol } from "@/components/layout/Logo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  return pageMetadata(await resolveLocale(params), "about", "/about");
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  await resolveLocale(params);
  const t = await getTranslations("about");
  const approach = t.raw("approach") as { title: string; text: string }[];

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-20">
          <div className="space-y-14">
            <section aria-labelledby="purpose">
              <h2 id="purpose" className="font-serif text-3xl font-medium">
                {t("purposeTitle")}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-evergreen/85">{t("purpose")}</p>
            </section>
            <section aria-labelledby="approach">
              <h2 id="approach" className="font-serif text-3xl font-medium">
                {t("approachTitle")}
              </h2>
              <ul className="mt-6 space-y-4">
                {approach.map((item) => (
                  <li key={item.title} className="border-s-2 border-sage ps-5 text-lg leading-relaxed">
                    <strong className="block font-semibold">{item.title}</strong>
                    <span className="text-evergreen/85">{item.text}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="founder">
              <h2 id="founder" className="font-serif text-3xl font-medium">
                {t("founderTitle")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-evergreen/85">
                {t("founder", { name: businessConfig.founderName })}
              </p>
            </section>
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-28 rounded-[14px] border border-neutral bg-cream p-10">
              <Symbol className="mx-auto w-40" />
            </div>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}

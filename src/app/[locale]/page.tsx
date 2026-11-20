import { getTranslations } from "next-intl/server";
import { resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/marketing/Hero";
import { PromiseSection } from "@/components/marketing/PromiseSection";
import { ServicesGrid } from "@/components/marketing/ServicesGrid";
import { ProcessSteps } from "@/components/marketing/ProcessSteps";
import { Principles } from "@/components/marketing/Principles";
import { FaqList } from "@/components/marketing/FaqList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Testimonials } from "@/components/marketing/Testimonials";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  return pageMetadata(await resolveLocale(params), "home", "/");
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  await resolveLocale(params);
  const t = await getTranslations();

  return (
    <>
      <Hero />
      <PromiseSection />
      <Section tone="white" labelledBy="services-title">
        <SectionHeading id="services-title" title={t("home.services.title")} lead={t("home.services.lead")} />
        <div className="mt-12">
          <ServicesGrid />
        </div>
      </Section>
      <Section labelledBy="process-title">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="process-title" title={t("home.process.title")} lead={t("home.process.lead")} />
          <ButtonLink href="/how-it-works" variant="secondary" className="self-start md:self-auto">
            {t("common.learnMore")}
          </ButtonLink>
        </div>
        <div className="mt-12">
          <ProcessSteps />
        </div>
      </Section>
      <Principles />
      <Testimonials />
      <Section labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <SectionHeading id="faq-title" title={t("home.faq.title")} />
            <ButtonLink href="/faq" variant="secondary" className="mt-8">
              {t("common.seeAllFaq")}
            </ButtonLink>
          </div>
          <FaqList limit={4} />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}

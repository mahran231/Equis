import { getTranslations } from "next-intl/server";
import { resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/marketing/PageHeader";
import { ProcessSteps } from "@/components/marketing/ProcessSteps";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Section } from "@/components/ui/Section";

export async function generateMetadata({ params }: PageProps<"/[locale]/how-it-works">) {
  return pageMetadata(await resolveLocale(params), "howItWorks", "/how-it-works");
}

export default async function HowItWorksPage({ params }: PageProps<"/[locale]/how-it-works">) {
  await resolveLocale(params);
  const t = await getTranslations("process");
  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <Section tone="white">
        <ProcessSteps headingLevel={2} />
        <p className="mt-10 max-w-3xl rounded-[10px] border border-neutral bg-cream px-5 py-4 text-[0.95rem] leading-relaxed text-evergreen/85">
          {t("note")}
        </p>
      </Section>
      <CtaBand />
    </>
  );
}

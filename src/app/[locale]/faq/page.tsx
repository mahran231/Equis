import { getTranslations } from "next-intl/server";
import { resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/marketing/PageHeader";
import { FaqList } from "@/components/marketing/FaqList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Section } from "@/components/ui/Section";

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">) {
  return pageMetadata(await resolveLocale(params), "faq", "/faq");
}

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  await resolveLocale(params);
  const t = await getTranslations("faq");
  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <Section tone="white">
        <div className="max-w-4xl">
          <FaqList headingLevel={2} />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}

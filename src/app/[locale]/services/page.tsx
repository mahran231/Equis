import { getTranslations } from "next-intl/server";
import { resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/marketing/PageHeader";
import { ServicesGrid } from "@/components/marketing/ServicesGrid";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Section } from "@/components/ui/Section";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">) {
  return pageMetadata(await resolveLocale(params), "services", "/services");
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  await resolveLocale(params);
  const t = await getTranslations("services");
  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <Section tone="white">
        <ServicesGrid detailed />
        <p className="mt-10 max-w-3xl rounded-[10px] border border-neutral bg-cream px-5 py-4 text-[0.95rem] leading-relaxed text-evergreen/85">
          {t("noGuarantee")}
        </p>
      </Section>
      <CtaBand />
    </>
  );
}

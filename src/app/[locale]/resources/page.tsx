import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { resolveLocale } from "@/lib/page";
import { contentConfig } from "@/config/content";
import { resources } from "@/content/approved";
import { PageHeader } from "@/components/marketing/PageHeader";
import { Section } from "@/components/ui/Section";

const enabled = contentConfig.recipesEnabled && resources.length > 0;

export async function generateMetadata({ params }: PageProps<"/[locale]/resources">) {
  const locale = await resolveLocale(params);
  if (!enabled) return { robots: { index: false } };
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("resources") };
}

export default async function ResourcesPage({ params }: PageProps<"/[locale]/resources">) {
  const locale = await resolveLocale(params);
  if (!enabled) notFound();
  const t = await getTranslations("nav");
  return (
    <>
      <PageHeader title={t("resources")} />
      <Section tone="white">
        <ul className="grid gap-6 md:grid-cols-2">
          {resources.map((r) => (
            <li key={r.id} className="rounded-[12px] border border-neutral p-7">
              <h2 className="font-serif text-2xl font-medium">{r.title[locale]}</h2>
              <p className="mt-3 text-evergreen/80">{r.summary[locale]}</p>
              <div className="mt-4 whitespace-pre-line leading-relaxed">{r.body[locale]}</div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

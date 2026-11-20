import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { resolveLocale } from "@/lib/page";
import { contentConfig } from "@/config/content";
import { transformations } from "@/content/approved";
import { PageHeader } from "@/components/marketing/PageHeader";
import { Section } from "@/components/ui/Section";

const items = transformations.filter((t) => t.consentConfirmed);
const enabled = contentConfig.transformationsEnabled && items.length > 0;

export async function generateMetadata({ params }: PageProps<"/[locale]/transformations">) {
  const locale = await resolveLocale(params);
  if (!enabled) return { robots: { index: false } };
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("transformations") };
}

export default async function TransformationsPage({ params }: PageProps<"/[locale]/transformations">) {
  const locale = await resolveLocale(params);
  if (!enabled) notFound();
  const t = await getTranslations("nav");
  return (
    <>
      <PageHeader title={t("transformations")} />
      <Section tone="white">
        <ul className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <li key={item.id}>
              <figure>
                <Image
                  src={item.image}
                  alt={item.imageAlt[locale]}
                  width={800}
                  height={600}
                  className="h-auto w-full rounded-[12px]"
                />
                <figcaption className="mt-3">{item.caption[locale]}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

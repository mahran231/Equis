import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "@/components/ui/Section";

type Item = { title: string; text: string };

export async function PromiseSection() {
  const t = await getTranslations("home.promise");
  const items = t.raw("items") as Item[];
  return (
    <Section tone="evergreen" labelledBy="promise-title">
      <SectionHeading id="promise-title" title={t("title")} lead={t("lead")} inverse />
      <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
        {items.map((item, i) => (
          <li key={item.title} className="border-t border-cream/25 pt-6">
            <span className="text-sm font-semibold text-sage" aria-hidden="true">
              0{i + 1}
            </span>
            <h3 className="mt-2 font-serif text-2xl font-medium">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-cream/85">{item.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

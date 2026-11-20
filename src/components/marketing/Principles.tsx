import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "@/components/ui/Section";

type Item = { title: string; text: string };

export async function Principles() {
  const t = await getTranslations("home.principles");
  const items = t.raw("items") as Item[];
  return (
    <Section tone="white" labelledBy="principles-title">
      <SectionHeading id="principles-title" title={t("title")} />
      <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.title} className="border-s-2 border-sage ps-5">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-evergreen/80">{item.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

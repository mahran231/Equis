import { getTranslations } from "next-intl/server";

type Step = { title: string; text: string };

export async function ProcessSteps({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const t = await getTranslations("process");
  const steps = t.raw("steps") as Step[];
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <ol className="grid gap-px overflow-hidden rounded-[12px] border border-neutral bg-neutral md:grid-cols-5">
      {steps.map((s, i) => (
        <li key={s.title} className="bg-white p-6 md:p-7">
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-evergreen text-sm font-semibold text-cream"
          >
            {i + 1}
          </span>
          <H className="mt-5 text-lg leading-snug font-semibold">{s.title}</H>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-evergreen/80">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

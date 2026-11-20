import { getTranslations } from "next-intl/server";

type Item = { q: string; a: string };

/** Native <details> disclosure: accessible and works without JavaScript. */
export async function FaqList({ limit, headingLevel = 3 }: { limit?: number; headingLevel?: 2 | 3 }) {
  const t = await getTranslations("faq");
  const items = (t.raw("items") as Item[]).slice(0, limit);
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="divide-y divide-neutral border-y border-neutral">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <H className="text-lg leading-snug font-semibold">{item.q}</H>
            <span
              aria-hidden="true"
              className="relative h-4 w-4 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-[1.5px] before:w-4 before:-translate-y-1/2 before:bg-clay after:absolute after:top-0 after:left-1/2 after:h-4 after:w-[1.5px] after:-translate-x-1/2 after:bg-clay after:transition-transform group-open:after:scale-y-0"
            />
          </summary>
          <p className="max-w-3xl pb-6 leading-relaxed text-evergreen/80">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

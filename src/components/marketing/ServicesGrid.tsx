import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Service = { id: string; title: string; summary: string; points: string[] };

export async function ServicesGrid({ detailed = false }: { detailed?: boolean }) {
  const t = await getTranslations();
  const items = t.raw("services.items") as Service[];
  const Heading = detailed ? "h2" : "h3";
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {items.map((s) => (
        <li
          key={s.id}
          id={detailed ? s.id : undefined}
          className="flex scroll-mt-28 flex-col rounded-[12px] border border-neutral bg-white p-7 md:p-8"
        >
          <Heading className="font-serif text-2xl font-medium">{s.title}</Heading>
          <p className="mt-3 leading-relaxed text-evergreen/80">{s.summary}</p>
          {detailed ? (
            <ul className="mt-6 space-y-2.5 border-t border-neutral pt-6">
              {s.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          ) : (
            <Link
              href={{ pathname: "/services", hash: s.id }}
              className="mt-6 inline-flex min-h-11 items-center self-start font-semibold underline decoration-clay decoration-2 underline-offset-[6px] hover:decoration-evergreen"
            >
              {t("common.learnMore")}
              <span className="sr-only">: {s.title}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

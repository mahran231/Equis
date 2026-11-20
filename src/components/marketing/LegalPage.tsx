import { getFormatter, getTranslations } from "next-intl/server";
import { contentConfig } from "@/config/content";
import { businessConfig } from "@/config/business";
import { PageHeader } from "./PageHeader";

type LegalSection = { h: string; p: string[] };

export async function LegalPage({ namespace }: { namespace: "privacy" | "terms" }) {
  const t = await getTranslations(namespace);
  const tc = await getTranslations("common");
  const format = await getFormatter();
  const sections = t.raw("sections") as LegalSection[];
  const fill = (s: string) => s.replaceAll("{founder}", businessConfig.founderName);

  return (
    <>
      <PageHeader title={t("title")} />
      <div className="bg-white py-14 md:py-20">
        <div className="container-site">
          <article className="max-w-3xl">
            {!contentConfig.legalReviewed ? (
              <p
                role="note"
                className="mb-10 rounded-[10px] border border-clay/40 bg-cream px-5 py-4 text-[0.95rem] font-medium"
              >
                {tc("legalDraft")}
              </p>
            ) : contentConfig.legalLastUpdated ? (
              <p className="mb-10 text-sm text-evergreen/75">
                {tc("lastUpdated", {
                  date: format.dateTime(new Date(contentConfig.legalLastUpdated), { dateStyle: "long" }),
                })}
              </p>
            ) : null}
            <div className="space-y-10">
              {sections.map((s) => (
                <section key={s.h}>
                  <h2 className="font-serif text-2xl font-medium">{s.h}</h2>
                  {s.p.map((para) => (
                    <p key={para} className="mt-3 leading-relaxed text-evergreen/85">
                      {fill(para)}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

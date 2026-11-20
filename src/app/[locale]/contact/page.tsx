import { connection } from "next/server";
import { getTranslations } from "next-intl/server";
import { resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { isEnquiryConfigured } from "@/lib/enquiry/adapter";
import { getContactChannels } from "@/lib/contact";
import { PageHeader } from "@/components/marketing/PageHeader";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  return pageMetadata(await resolveLocale(params), "contact", "/contact");
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  await resolveLocale(params);
  // Read enquiry-provider settings at request time so env changes apply without a rebuild.
  await connection();
  const t = await getTranslations("contact");
  const channels = getContactChannels();
  const configured = isEnquiryConfigured();

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <div className="bg-white py-14 md:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            <EnquiryForm configured={configured} hasDirectContact={channels.length > 0} />
          </div>
          <aside className="space-y-6">
            {channels.length > 0 ? (
              <section aria-labelledby="direct" className="rounded-[12px] border border-neutral bg-cream p-7">
                <h2 id="direct" className="font-serif text-2xl font-medium">
                  {t("directTitle")}
                </h2>
                <ul className="mt-5 space-y-3">
                  {channels.map((c) => (
                    <li key={c.kind}>
                      <span className="block text-sm text-evergreen/75">{t(c.kind)}</span>
                      <a
                        href={c.href}
                        {...(c.kind === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="ltr-isolate inline-flex min-h-11 items-center text-lg font-semibold underline underline-offset-4"
                      >
                        {c.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <p className="rounded-[12px] border border-neutral p-6 text-[0.95rem] leading-relaxed text-evergreen/85">
              {t("privacyNote")}
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}

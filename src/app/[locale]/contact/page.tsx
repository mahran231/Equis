import { connection } from "next/server";
import { getTranslations } from "next-intl/server";
import { resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { isEnquiryConfigured } from "@/lib/enquiry/adapter";
import { getContactChannels, getWhatsAppLink } from "@/lib/contact";
import { WhatsAppButton } from "@/components/marketing/WhatsAppButton";
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
  const hasWhatsApp = getWhatsAppLink() !== null;

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <div className="bg-white py-14 md:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            {hasWhatsApp ? (
              <section
                aria-labelledby="whatsapp"
                className={`mb-10 rounded-[12px] p-7 ${configured ? "border border-neutral bg-cream" : "bg-evergreen text-cream"}`}
              >
                <h2 id="whatsapp" className="font-serif text-2xl font-medium">
                  {t("whatsappTitle")}
                </h2>
                <p className={`mt-2 leading-relaxed ${configured ? "text-evergreen/80" : "text-cream/85"}`}>
                  {t("whatsappLead")}
                </p>
                <WhatsAppButton variant={configured ? "primary" : "inverse"} className="mt-5 w-full sm:w-auto" />
              </section>
            ) : null}
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

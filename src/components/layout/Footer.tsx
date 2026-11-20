import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { enabledPages } from "@/config/pages";
import { getContactChannels, getSocialLinks } from "@/lib/contact";
import { Wordmark } from "./Logo";

const socialNames = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", youtube: "YouTube" } as const;

export async function Footer() {
  const t = await getTranslations();
  const main = enabledPages.filter((p) => p.inFooter === "main");
  const legal = enabledPages.filter((p) => p.inFooter === "legal");
  const contacts = getContactChannels();
  const socials = getSocialLinks();

  return (
    <footer className="border-t border-neutral bg-cream">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Wordmark className="w-[140px]" />
          <p className="mt-5 text-[0.95rem] leading-relaxed text-evergreen/80">{t("footer.tagline")}</p>
          {contacts.length > 0 ? (
            <ul className="mt-5 space-y-1.5 text-[0.95rem]">
              {contacts.map((c) => (
                <li key={c.kind}>
                  <span className="text-evergreen/75">{t(`contact.${c.kind}`)}: </span>
                  <a href={c.href} className="ltr-isolate font-medium underline-offset-4 hover:underline">
                    {c.display}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <nav aria-label={t("nav.footer")}>
          <ul className="space-y-1">
            {main.map((p) => (
              <li key={p.key}>
                <Link
                  href={p.href}
                  className="inline-flex min-h-10 items-center text-[0.95rem] hover:underline underline-offset-4"
                >
                  {t(`nav.${p.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-evergreen/75">{t("footer.legal")}</p>
          <ul className="mt-3 space-y-1">
            {legal.map((p) => (
              <li key={p.key}>
                <Link
                  href={p.href}
                  className="inline-flex min-h-10 items-center text-[0.95rem] hover:underline underline-offset-4"
                >
                  {t(`nav.${p.key}`)}
                </Link>
              </li>
            ))}
          </ul>
          {socials.length > 0 ? (
            <>
              <p className="mt-6 text-xs font-semibold tracking-[0.14em] uppercase text-evergreen/75">
                {t("footer.follow")}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {socials.map((s) => (
                  <li key={s.network}>
                    <a
                      href={s.href}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="inline-flex min-h-10 items-center text-[0.95rem] hover:underline underline-offset-4"
                    >
                      {socialNames[s.network]}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
      <div className="border-t border-neutral">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-evergreen/75 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}

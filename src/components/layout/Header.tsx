import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { mainNav } from "@/config/pages";
import { Wordmark } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { ButtonLink } from "@/components/ui/ButtonLink";

export async function Header() {
  const t = await getTranslations("nav");
  const tc = await getTranslations("common");
  const items = mainNav.map((p) => ({ href: p.href, label: t(p.key) }));

  return (
    <header className="sticky top-0 z-50 border-b border-neutral bg-cream [--header-h:4.5rem]">
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="shrink-0 rounded-md" aria-label={t("homeLink")}>
          <Wordmark className="w-[112px] md:w-[128px]" priority />
        </Link>

        <nav aria-label={t("primary")} className="hidden lg:block">
          <NavLinks items={items} />
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>
          <div className="hidden lg:block">
            <ButtonLink href="/contact">{tc("ctaPrimary")}</ButtonLink>
          </div>
          <MobileMenu items={[{ href: "/", label: t("home") }, ...items]} />
        </div>
      </div>
    </header>
  );
}

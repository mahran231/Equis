"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { buttonStyles } from "@/components/ui/ButtonLink";

export function MobileMenu({ items }: { items: { href: string; label: string }[] }) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-evergreen hover:bg-white"
      >
        <span className="sr-only">{open ? t("nav.closeMenu") : t("nav.openMenu")}</span>
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        >
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto border-t border-neutral bg-cream"
      >
        <nav aria-label={t("nav.primary")} className="container-site py-6">
          <ul className="flex flex-col">
            {items.map((item) => {
              const current = item.href === pathname;
              return (
                <li key={item.href} className="border-b border-neutral">
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`block py-4 text-lg ${current ? "font-semibold" : "font-medium"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6">
            <Link href="/contact" className={`${buttonStyles.primary} w-full`}>
              {t("common.ctaPrimary")}
            </Link>
          </div>
          <div className="mt-6">
            <LocaleSwitcher variant="full" />
          </div>
        </nav>
      </div>
    </div>
  );
}

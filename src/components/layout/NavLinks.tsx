"use client";

import { Link, usePathname } from "@/i18n/navigation";

export function NavLinks({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1">
      {items.map((item) => {
        const current = item.href === pathname;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-lg px-3 text-[0.95rem] transition-colors hover:bg-white ${
                current
                  ? "font-semibold text-evergreen underline decoration-clay decoration-2 underline-offset-8"
                  : "font-medium text-evergreen/85"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

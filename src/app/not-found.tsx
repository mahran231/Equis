import Link from "next/link";
import { fontVariables } from "@/lib/fonts";

// Fallback for requests outside any locale (the proxy normally redirects these).
export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body className="flex min-h-dvh items-center justify-center bg-cream p-8 text-evergreen">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-medium">Page not found</h1>
          <p className="mt-3" lang="ar-EG" dir="rtl">
            الصفحة مش موجودة
          </p>
          <p className="mt-6 flex justify-center gap-4 font-semibold">
            <Link href="/ar" className="underline">
              العربية
            </Link>
            <Link href="/en" className="underline">
              English
            </Link>
            <Link href="/fr" className="underline">
              Français
            </Link>
          </p>
        </div>
      </body>
    </html>
  );
}

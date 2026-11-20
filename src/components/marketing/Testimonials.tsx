import { getLocale } from "next-intl/server";
import { contentConfig } from "@/config/content";
import { testimonials } from "@/content/approved";
import type { Locale } from "@/config/site";

/** Renders nothing unless enabled AND real, consented testimonials exist. */
export async function Testimonials() {
  const items = testimonials.filter((t) => t.consentConfirmed);
  if (!contentConfig.testimonialsEnabled || items.length === 0) return null;
  const locale = (await getLocale()) as Locale;
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-site grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <figure key={item.id} className="rounded-[12px] border border-neutral bg-cream p-8">
            <blockquote className="font-serif text-xl leading-relaxed">{item.quote[locale]}</blockquote>
            <figcaption className="mt-4 text-sm font-semibold">{item.attribution}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

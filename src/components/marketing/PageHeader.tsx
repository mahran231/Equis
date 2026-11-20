import { Eyebrow } from "@/components/ui/Section";

export function PageHeader({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: string }) {
  return (
    <header className="border-b border-neutral bg-cream">
      <div className="container-site py-14 md:py-20">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.1] font-medium text-balance md:text-5xl">
          {title}
        </h1>
        {lead ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-evergreen/80">{lead}</p> : null}
      </div>
    </header>
  );
}

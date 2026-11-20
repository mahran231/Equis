import type { ReactNode } from "react";

export function Section({
  id,
  tone = "cream",
  className = "",
  children,
  labelledBy,
}: {
  id?: string;
  tone?: "cream" | "white" | "evergreen";
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  const tones = {
    cream: "bg-cream text-evergreen",
    white: "bg-white text-evergreen",
    evergreen: "bg-evergreen text-cream",
  };
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} py-16 md:py-24 ${className}`}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-xs font-semibold tracking-[0.14em] text-clay-ink uppercase ${className}`}>{children}</p>;
}

export function SectionHeading({
  id,
  title,
  lead,
  as: Tag = "h2",
  inverse = false,
}: {
  id?: string;
  title: string;
  lead?: string;
  as?: "h1" | "h2";
  inverse?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <Tag
        id={id}
        className={`font-serif text-3xl leading-tight font-medium text-balance md:text-4xl ${inverse ? "text-cream" : "text-evergreen"}`}
      >
        {title}
      </Tag>
      {lead ? (
        <p className={`mt-4 text-lg leading-relaxed ${inverse ? "text-cream/85" : "text-evergreen/80"}`}>{lead}</p>
      ) : null}
    </div>
  );
}

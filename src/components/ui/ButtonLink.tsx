import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "inverse";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] px-5 py-2.5 text-[0.95rem] font-semibold transition-colors duration-150";

export const buttonStyles: Record<Variant, string> = {
  primary: `${base} bg-evergreen text-cream hover:bg-evergreen-700`,
  secondary: `${base} border border-evergreen/30 text-evergreen hover:border-evergreen hover:bg-white`,
  inverse: `${base} bg-cream text-evergreen hover:bg-white`,
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={`${buttonStyles[variant]} ${className}`} />;
}

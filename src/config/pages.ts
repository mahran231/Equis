import { contentConfig } from "./content";
import { resources, transformations } from "@/content/approved";

export type PageKey =
  | "home"
  | "about"
  | "services"
  | "howItWorks"
  | "transformations"
  | "resources"
  | "faq"
  | "contact"
  | "privacy"
  | "terms";

export type PageDef = {
  key: PageKey;
  href: string;
  enabled: boolean;
  inMainNav: boolean;
  inFooter: "main" | "legal" | false;
};

/** Single source of truth for public routes, navigation and sitemap. */
export const pages: PageDef[] = [
  { key: "home", href: "/", enabled: true, inMainNav: false, inFooter: false },
  { key: "about", href: "/about", enabled: true, inMainNav: true, inFooter: "main" },
  { key: "services", href: "/services", enabled: true, inMainNav: true, inFooter: "main" },
  { key: "howItWorks", href: "/how-it-works", enabled: true, inMainNav: true, inFooter: "main" },
  {
    key: "transformations",
    href: "/transformations",
    enabled: contentConfig.transformationsEnabled && transformations.length > 0,
    inMainNav: true,
    inFooter: "main",
  },
  {
    key: "resources",
    href: "/resources",
    enabled: contentConfig.recipesEnabled && resources.length > 0,
    inMainNav: true,
    inFooter: "main",
  },
  { key: "faq", href: "/faq", enabled: true, inMainNav: true, inFooter: "main" },
  { key: "contact", href: "/contact", enabled: true, inMainNav: true, inFooter: "main" },
  { key: "privacy", href: "/privacy", enabled: true, inMainNav: false, inFooter: "legal" },
  { key: "terms", href: "/terms", enabled: true, inMainNav: false, inFooter: "legal" },
];

export const enabledPages = pages.filter((p) => p.enabled);
export const mainNav = enabledPages.filter((p) => p.inMainNav);

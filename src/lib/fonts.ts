import { Manrope, Newsreader, Noto_Sans_Arabic } from "next/font/google";

export const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-newsreader",
  display: "swap",
});

export const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-arabic",
  display: "swap",
  preload: false,
});

export const fontVariables = `${manrope.variable} ${newsreader.variable} ${notoArabic.variable}`;

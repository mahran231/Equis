import "./globals.css";

// The <html> element is rendered by the locale layout (src/app/[locale]/layout.tsx)
// so that `lang` and `dir` always match the active language.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

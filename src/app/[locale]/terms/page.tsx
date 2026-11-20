import { resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/marketing/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/terms">) {
  return pageMetadata(await resolveLocale(params), "terms", "/terms");
}

export default async function TermsPage({ params }: PageProps<"/[locale]/terms">) {
  await resolveLocale(params);
  return <LegalPage namespace="terms" />;
}

import { resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/marketing/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">) {
  return pageMetadata(await resolveLocale(params), "privacy", "/privacy");
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  await resolveLocale(params);
  return <LegalPage namespace="privacy" />;
}

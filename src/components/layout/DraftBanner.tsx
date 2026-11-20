import { getTranslations } from "next-intl/server";
import { contentConfig } from "@/config/content";

/** Honest pre-launch marker shown until the owner approves all public copy. */
export async function DraftBanner() {
  if (contentConfig.copyApproved) return null;
  const t = await getTranslations("common");
  return (
    <div role="note" className="bg-evergreen text-cream">
      <p className="container-site py-2 text-center text-[0.8rem] font-medium">{t("draftBanner")}</p>
    </div>
  );
}

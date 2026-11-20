import { contentConfig } from "@/config/content";
import { siteConfig } from "@/config/site";

/**
 * Search engines may index the site only when the copy is approved AND the
 * real domain is configured. This keeps temporary/preview hosts out of search
 * results and avoids canonical URLs pointing at localhost.
 */
export function isIndexingAllowed(
  copyApproved: boolean = contentConfig.copyApproved,
  hasPublicUrl: boolean = siteConfig.hasPublicUrl,
) {
  return copyApproved && hasPublicUrl;
}

export const noIndex = { index: false, follow: true } as const;

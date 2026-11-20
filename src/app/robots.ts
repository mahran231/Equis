import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { isIndexingAllowed } from "@/lib/indexing";

export default function robots(): MetadataRoute.Robots {
  return {
    // Until the copy is approved and the real domain is set, ask crawlers to stay away.
    rules: isIndexingAllowed() ? { userAgent: "*", allow: "/", disallow: "/api/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${siteConfig.publicUrl}/sitemap.xml`,
  };
}

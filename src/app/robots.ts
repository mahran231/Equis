import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { contentConfig } from "@/config/content";

export default function robots(): MetadataRoute.Robots {
  return {
    // Until the owner approves the public copy, ask crawlers to stay away.
    rules: contentConfig.copyApproved
      ? { userAgent: "*", allow: "/", disallow: "/api/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteConfig.publicUrl}/sitemap.xml`,
  };
}

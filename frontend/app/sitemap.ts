import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return [{ url, changeFrequency: "monthly", priority: 1 }];
}

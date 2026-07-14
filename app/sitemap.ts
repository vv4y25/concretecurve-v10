import type { MetadataRoute } from "next";
import { issues } from "@/lib/issues";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/accessibility", "/privacy"].map(
    (path) => ({
      url: `${site.url}${path || "/"}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.6,
    }),
  );

  const issueRoutes = issues.map((issue) => ({
    url: `${site.url}/issues/${issue.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...issueRoutes];
}

import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getPublishedArticles } from "@/lib/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/member-network", "/safety-compliance", "/news", "/contact"];
  return [...paths.map(path => ({ url: `${site.url}${path}`, changeFrequency: "monthly" as const, priority: path ? 0.7 : 1 })), ...getPublishedArticles().map(article => ({ url: `${site.url}/news/${article.slug}`, lastModified: new Date(`${article.date}T12:00:00Z`), changeFrequency: "monthly" as const, priority: 0.5 }))];
}

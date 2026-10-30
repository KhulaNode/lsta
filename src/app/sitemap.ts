import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getPublishedArticles } from "@/lib/news";
import { getPublishedEvents } from "@/lib/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/member-network", "/safety-compliance", "/media-centre", "/gallery", "/contact"];
  return [
    ...paths.map(path => ({ url: `${site.url}${path}` })),
    ...getPublishedArticles().map(article => ({ url: `${site.url}/news/${article.slug}` })),
    ...getPublishedEvents().map(event => ({ url: `${site.url}/events/${event.slug}` })),
  ];
}

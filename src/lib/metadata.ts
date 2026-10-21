import type { Metadata } from "next";
import { site } from "@/config/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | ${site.name}`, description, url, siteName: site.name, type: "website", images: [{ url: `${site.url}/images/hero-transport.png`, width: 1672, height: 941, alt: "Scholar transport vehicles in Limpopo" }] },
    twitter: { card: "summary_large_image" },
  };
}

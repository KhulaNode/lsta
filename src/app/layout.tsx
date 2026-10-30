import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site, socialLinks } from "@/config/site";
import { getUmamiConfig } from "@/config/umami";
import "./globals.css";
import "./news/news-images.css";
import "./social.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Safe Journeys. Brighter Futures.`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: "en_ZA", type: "website" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#111111" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const umami = getUmamiConfig();
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url, telephone: "+27722394875", email: site.email, sameAs: socialLinks.map(link => link.href), areaServed: { "@type": "AdministrativeArea", name: "Limpopo" } };
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        {umami && (
          <>
            <Script id="umami-tracker" src={`${umami.origin}/script.js`} data-website-id={umami.websiteId} data-domains="lsta.org.za,www.lsta.org.za" strategy="afterInteractive" />
            <Script id="umami-recorder" src={`${umami.origin}/recorder.js`} data-website-id={umami.websiteId} strategy="lazyOnload" />
          </>
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}

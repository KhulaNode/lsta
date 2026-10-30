import Link from "next/link";
import { GalleryGrid } from "@/components/gallery-grid";
import { galleryItems } from "@/content/gallery";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/metadata";
import "./gallery.css";

export const metadata = pageMetadata("Photo & Video Gallery", "Browse photos and videos of LSTA meetings, public inquiries and scholar transport stakeholder activities in Limpopo.", "/gallery");

export default function GalleryPage() {
  return <>
    <PageHero title="Gallery" subtitle="Photographs and videos from the LSTA community." />
    <section className="section section-cream gallery-section">
      <div className="container">
        <Link href="/media-centre" className="text-link">← Back to Media Centre</Link>
        <div className="section-heading-row gallery-heading"><div><span className="eyebrow">LSTA media</span><h2>GALLERY</h2><p>Select a photo to view it in full, or play a video here.</p></div></div>
        {galleryItems.length ? <GalleryGrid items={galleryItems} /> : <p>No gallery media has been published yet.</p>}
      </div>
    </section>
  </>;
}

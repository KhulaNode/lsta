"use client";

import Image from "next/image";
import { ArrowUpRight, Expand, X } from "lucide-react";
import { useRef, useState } from "react";
import type { GalleryItem } from "@/content/gallery";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  function openImage(item: GalleryItem) {
    setActiveImage(item);
    dialogRef.current?.showModal();
  }

  function closeImage() {
    dialogRef.current?.close();
  }

  return <>
    <div className="gallery-grid">
      {items.map(item => <figure className="gallery-card" key={item.id}>
        {item.kind === "image" ? <button type="button" className="gallery-image-button" onClick={() => openImage(item)} aria-label={`View full image: ${item.title}`}>
          <Image src={item.src} alt={item.alt || item.title} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />
          <span className="gallery-expand"><Expand size={18} aria-hidden="true" /> View image</span>
        </button> : <video className="gallery-video" controls playsInline preload="metadata" aria-label={item.title}>
          <source src={item.src} type="video/mp4" />
          <track kind="captions" src={item.id === "march-alliance-banner" ? "/captions/lsta-march-banner.vtt" : "/captions/lsta-march-crowd.vtt"} srcLang="en" label="English" />
          Your browser does not support this video.
        </video>}
        <figcaption><strong>{item.title}</strong><span>{item.description}</span>{item.relatedUrl && <a className="gallery-related-link" href={item.relatedUrl} target="_blank" rel="noopener noreferrer">Read related news coverage <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}</figcaption>
      </figure>)}
    </div>
    <dialog ref={dialogRef} className="gallery-dialog" aria-label={activeImage?.title || "Gallery image"} onClose={() => setActiveImage(null)}>
      {activeImage && <div className="gallery-dialog-content">
        <button type="button" className="gallery-dialog-close" onClick={closeImage} aria-label="Close image"><X size={22} aria-hidden="true" /></button>
        <div className="gallery-dialog-image"><Image src={activeImage.src} alt={activeImage.alt || activeImage.title} fill sizes="100vw" /></div>
        <p>{activeImage.title}</p>
      </div>}
    </dialog>
  </>;
}

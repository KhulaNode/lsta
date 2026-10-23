import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { getPublishedEvent, getPublishedEvents, formatEventDateTime } from "@/lib/events";
import { pageMetadata } from "@/lib/metadata";
import "../events.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedEvents().map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getPublishedEvent(slug);
  if (!event) return {};
  const base = pageMetadata(event.title, event.summary, `/events/${slug}`);
  return event.image
    ? { ...base, openGraph: { ...base.openGraph, images: [{ url: event.image.src, alt: event.image.alt }] } }
    : base;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getPublishedEvent(slug);
  if (!event) notFound();

  return (
    <article className="section event-detail">
      <div className="container event-detail-inner">
        <Link className="event-back-link" href="/media-centre#events">← All events</Link>
        <span className="eyebrow">LSTA event</span>
        <h1>{event.title}</h1>
        <div className="event-detail-meta">
          <time dateTime={event.startsAt}>{formatEventDateTime(event.startsAt)}</time>
          <span><MapPin aria-hidden="true" size={18} />{event.location}</span>
        </div>
        <p className="event-detail-summary">{event.summary}</p>
        {event.image && <div className="event-detail-image"><Image src={event.image.src} alt={event.image.alt} fill priority sizes="(max-width: 900px) 100vw, 900px" /></div>}
        <div className="event-detail-copy">
          {event.details?.map((paragraph, index) => <p key={`${event.slug}-${index}`}>{paragraph}</p>)}
          {event.sections?.map((section) => <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
            {section.note && <p className="event-detail-note">{section.note}</p>}
          </section>)}
          {event.action && <a className="button event-detail-action" href={event.action.href} target={event.action.href.startsWith("http") ? "_blank" : undefined} rel={event.action.href.startsWith("http") ? "noopener noreferrer" : undefined}>{event.action.label} →</a>}
        </div>
      </div>
    </article>
  );
}

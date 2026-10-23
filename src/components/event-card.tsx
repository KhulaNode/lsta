import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { LstaEvent } from "@/content/events";
import { formatEventDateTime } from "@/lib/events";

export function EventCard({ event }: { event: LstaEvent }) {
  return (
    <article className="event-card">
      {event.image && (
        <Link className="event-card-image" href={`/events/${event.slug}`} tabIndex={-1} aria-hidden="true">
          <Image src={event.image.src} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw" />
        </Link>
      )}
      <div className="event-card-content">
        <time dateTime={event.startsAt}>{formatEventDateTime(event.startsAt)}</time>
        <h3><Link href={`/events/${event.slug}`}>{event.title}</Link></h3>
        <p className="event-card-location"><MapPin aria-hidden="true" size={16} />{event.location}</p>
        <p>{event.summary}</p>
        <Link className="event-card-link" href={`/events/${event.slug}`}>Event details <ArrowUpRight aria-hidden="true" size={17} /></Link>
      </div>
    </article>
  );
}

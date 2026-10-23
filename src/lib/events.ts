import { events, type LstaEvent } from "@/content/events";

const timeZone = "Africa/Johannesburg";

export function getPublishedEvents(): LstaEvent[] {
  return events.filter((event) => event.approved);
}

export function getPublishedEvent(slug: string): LstaEvent | null {
  return getPublishedEvents().find((event) => event.slug === slug) ?? null;
}

export function getEventLists(now = Date.now()) {
  const published = getPublishedEvents();
  return {
    upcoming: published
      .filter((event) => Date.parse(event.endsAt ?? event.startsAt) >= now)
      .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)),
    past: published
      .filter((event) => Date.parse(event.endsAt ?? event.startsAt) < now)
      .sort((a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt)),
  };
}

export function formatEventDateTime(startsAt: string): string {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
    timeZoneName: "short",
  }).format(new Date(startsAt));
}

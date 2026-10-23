import { ArrowUpRight, CalendarDays, FileText, Radio } from "lucide-react";
import { EventCard } from "@/components/event-card";
import { CoverageVideoPlayer } from "@/components/coverage-video-player";
import { NewsCard } from "@/components/news-card";
import { PageHero } from "@/components/page-hero";
import { mediaCoverage, type MediaCoverage } from "@/content/media-coverage";
import { getEventLists } from "@/lib/events";
import { getPublishedArticles } from "@/lib/news";
import { pageMetadata } from "@/lib/metadata";
import "./media-centre.css";
import "../events/events.css";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata(
  "Media Centre",
  "Read LSTA articles and announcements, explore independent media coverage and find upcoming events.",
  "/media-centre",
);

const coverageIcons = { "Social post": Radio, Article: FileText };

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

function CoverageCard({ item }: { item: MediaCoverage }) {
  const Icon = item.kind === "Video" ? null : coverageIcons[item.kind];

  return <article className={`coverage-card${item.kind === "Video" ? " coverage-card-video" : ""}`}>
    {item.kind === "Video" && <CoverageVideoPlayer video={item} />}
    <div className="coverage-card-body">
      {Icon && <div className="coverage-card-top"><span className="coverage-icon"><Icon size={23} aria-hidden="true" /></span><span className="coverage-kind">{item.kind}</span></div>}
      <p className="coverage-outlet">{item.outlet}{item.date ? ` · ${formatDate(item.date)}` : ""}</p>
      <h3><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}<span className="sr-only"> (opens in a new tab)</span></a></h3>
      <p>{item.summary}</p>
      <a className="coverage-link" href={item.url} target="_blank" rel="noopener noreferrer">{item.kind === "Video" ? "Watch on YouTube" : "View original"} <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
    </div>
  </article>;
}

export default function MediaCentrePage() {
  const articles = getPublishedArticles();
  const { upcoming, past } = getEventLists();
  const videos = mediaCoverage.filter(item => item.kind === "Video");
  const otherCoverage = mediaCoverage.filter(item => item.kind !== "Video");

  return (
    <>
      <PageHero title="Media Centre" subtitle="Articles, announcements, coverage and events from the LSTA community." />
      <nav className="media-section-nav" aria-label="Media Centre sections">
        <div className="container">
          <a href="#articles">Articles and Announcements</a>
          <a href="#coverage">Media &amp; news coverage</a>
          <a href="#events">Events</a>
        </div>
      </nav>

      <section className="section section-cream media-section" id="articles" aria-labelledby="articles-heading">
        <div className="container">
          <div className="section-heading-row"><div><span className="eyebrow">From the alliance</span><h2 id="articles-heading">ARTICLES AND ANNOUNCEMENTS</h2><p>Articles and announcements published by LSTA.</p></div></div>
          {articles.length ? <div className="news-grid">{articles.map(article => <NewsCard key={article.slug} article={article} />)}</div> : <p>No articles or announcements have been published yet.</p>}
        </div>
      </section>

      <section className="section media-section" id="coverage" aria-labelledby="coverage-heading">
        <div className="container">
          <div className="section-heading-row"><div><span className="eyebrow">In the media</span><h2 id="coverage-heading">MEDIA &amp; NEWS COVERAGE</h2><p>Watch the videos here or follow each link to its original publisher.</p></div></div>
          <div className="coverage-video-grid">{videos.map(item => <CoverageCard item={item} key={item.url} />)}</div>
          <div className="coverage-grid">{otherCoverage.map(item => <CoverageCard item={item} key={item.url} />)}</div>
        </div>
      </section>

      <section className="section section-cream media-section" id="events" aria-labelledby="events-heading">
        <div className="container">
          <div className="section-heading-row"><div><span className="eyebrow">Join us</span><h2 id="events-heading">EVENTS</h2><p>Upcoming LSTA gatherings and a record of past events.</p></div></div>
          <div className="events-subheading"><CalendarDays size={21} aria-hidden="true" /><h3>Upcoming events</h3></div>
          {upcoming.length ? <div className="events-grid">{upcoming.map(event => <EventCard key={event.slug} event={event} />)}</div> : <div className="events-empty"><p>No upcoming events announced.</p></div>}
          <div className="events-subheading events-past-heading"><CalendarDays size={21} aria-hidden="true" /><h3>Past events</h3></div>
          {past.length ? <div className="events-grid">{past.map(event => <EventCard key={event.slug} event={event} />)}</div> : <div className="events-empty"><p>No past events listed yet.</p></div>}
        </div>
      </section>
    </>
  );
}

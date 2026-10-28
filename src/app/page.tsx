import Image from "next/image";
import Link from "next/link";
import { BookOpen, Check, GraduationCap, MapPin, Phone, ShieldCheck, UsersRound } from "lucide-react";
import { NewsCard } from "@/components/news-card";
import { getPublishedArticles } from "@/lib/news";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/config/site";
import { SocialLinks } from "@/components/social-links";
import { formatEventDateTime, getEventLists } from "@/lib/events";
import "./home-event.css";

export const metadata = pageMetadata("Home", "LSTA supports scholar transport operators and safer journeys for learners across Limpopo.", "/");
export const dynamic = "force-dynamic";

const pillars = [
  { icon: ShieldCheck, title: "Safety First", description: "Safer learners. Safer communities." },
  { icon: UsersRound, title: "Stronger Together", description: "Supporting operators. Building community." },
  { icon: BookOpen, title: "Compliant Operations", description: "Following the rules for a better future." },
  { icon: GraduationCap, title: "Brighter Futures", description: "Reliable transport for every learner." },
];

export default function Home() {
  const articles = getPublishedArticles().slice(0, 3);
  const featuredEvent = getEventLists().upcoming[0];
  const eventDate = featuredEvent ? new Date(featuredEvent.startsAt) : null;
  const datePart = (part: "day" | "month" | "year") => eventDate ? new Intl.DateTimeFormat("en-ZA", { [part]: part === "month" ? "short" : "numeric", timeZone: "Africa/Johannesburg" }).format(eventDate) : "";
  return <>
    <section className="hero"><Image className="hero-image" src="/images/hero-transport.png" alt="Two scholar transport minibuses on a road in Limpopo at sunrise" fill priority sizes="100vw" /><div className="hero-overlay" /><div className="container hero-content"><div className="hero-copy"><span className="eyebrow">For operators, families and schools</span><h1>SAFE JOURNEYS.<span>BRIGHTER FUTURES.</span></h1><p>Limpopo Scholar Transport Alliance represents and supports scholar transport operators in Limpopo, working toward safer, more reliable journeys for learners.</p><div className="hero-actions"><Link className="button" href="/member-network#join"><UsersRound size={17} /> Join the Alliance</Link><Link className="button button-outline" href="/contact"><Phone size={17} /> Contact Us</Link></div></div></div></section>
    <section className="pillars" aria-label="Our priorities"><div className="container pillar-grid">{pillars.map(({ icon: Icon, title, description }) => <div className="pillar" key={title}><Icon aria-hidden="true" /><h2>{title}</h2><p>{description}</p></div>)}</div></section>
    {featuredEvent && <section className="home-event" aria-labelledby="home-event-heading"><div className="container home-event-inner">
      <div className="home-event-date" aria-hidden="true"><span>{datePart("month")}</span><strong>{datePart("day")}</strong><span>{datePart("year")}</span></div>
      <div className="home-event-copy"><span className="eyebrow light">Upcoming LSTA event</span><h2 id="home-event-heading">{featuredEvent.title}</h2><div className="home-event-meta"><time dateTime={featuredEvent.startsAt}>{formatEventDateTime(featuredEvent.startsAt)}</time><span><MapPin size={17} aria-hidden="true" />{featuredEvent.location}</span></div><p>{featuredEvent.summary}</p></div>
      <Link className="button home-event-button" href={`/events/${featuredEvent.slug}`}>View event details <span aria-hidden="true">→</span></Link>
    </div></section>}
    <section className="section"><div className="container intro-grid"><div className="intro-photo"><Image src="/images/learner-transport.png" alt="Learner smiling from the window of a scholar transport minibus" fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div><span className="eyebrow">About the alliance</span><h2>A BETTER TOMORROW<br />FOR OUR LEARNERS.</h2><p className="section-intro">We work with operators, schools, parents and communities to promote safe, compliant and professional scholar transport services across Limpopo.</p><ul className="bullet-list"><li><Check /> A collective voice for local operators</li><li><Check /> A commitment to safer journeys</li><li><Check /> Stronger links across our communities</li></ul><Link className="button" href="/about">Learn More About Us <span aria-hidden="true">→</span></Link></div></div></section>
    <section className="section section-cream"><div className="container"><div className="section-heading-row"><div><span className="eyebrow">From the alliance</span><h2>LATEST ARTICLES AND ANNOUNCEMENTS</h2></div><Link className="text-link" href="/media-centre">Visit Media Centre <span aria-hidden="true">→</span></Link></div><div className="news-grid">{articles.map(article => <NewsCard key={article.slug} article={article} />)}</div></div></section>
    <section className="social-feature" aria-labelledby="follow-lsta-heading"><div className="container social-feature-inner"><div><span className="eyebrow">Stay connected</span><h2 id="follow-lsta-heading">FOLLOW LSTA</h2><p>Find the alliance on Facebook and TikTok.</p></div><SocialLinks className="social-links-feature" /></div></section>
    <section className="cta-band"><div className="container cta-band-inner"><div><h2>Let’s move forward together.</h2><p>Ask about the alliance or talk to us about scholar transport in Limpopo.</p></div><a className="button" href={site.whatsappHref} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp <span aria-hidden="true">→</span></a></div></section>
  </>;
}

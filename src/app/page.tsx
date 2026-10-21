import Image from "next/image";
import Link from "next/link";
import { BookOpen, Check, GraduationCap, Phone, ShieldCheck, UsersRound } from "lucide-react";
import { NewsCard } from "@/components/news-card";
import { getArticles } from "@/lib/news";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

export const metadata = pageMetadata("Home", "LSTA supports scholar transport operators and safer journeys for learners across Limpopo.", "/");

const pillars = [
  { icon: ShieldCheck, title: "Safety First", description: "Safer learners. Safer communities." },
  { icon: UsersRound, title: "Stronger Together", description: "Supporting operators. Building community." },
  { icon: BookOpen, title: "Compliant Operations", description: "Following the rules for a better future." },
  { icon: GraduationCap, title: "Brighter Futures", description: "Reliable transport for every learner." },
];

export default function Home() {
  const articles = getArticles().slice(0, 3);
  return <>
    <section className="hero"><Image className="hero-image" src="/images/hero-transport.png" alt="Two scholar transport minibuses on a road in Limpopo at sunrise" fill priority sizes="100vw" /><div className="hero-overlay" /><div className="container hero-content"><div className="hero-copy"><span className="eyebrow">For operators, families and schools</span><h1>SAFE JOURNEYS.<span>BRIGHTER FUTURES.</span></h1><p>Limpopo Scholar Transport Alliance represents and supports scholar transport operators in Limpopo, working toward safer, more reliable journeys for learners.</p><div className="hero-actions"><Link className="button" href="/membership"><UsersRound size={17} /> Join the Alliance</Link><Link className="button button-outline" href="/contact"><Phone size={17} /> Contact Us</Link></div></div></div></section>
    <section className="pillars" aria-label="Our priorities"><div className="container pillar-grid">{pillars.map(({ icon: Icon, title, description }) => <div className="pillar" key={title}><Icon aria-hidden="true" /><h2>{title}</h2><p>{description}</p></div>)}</div></section>
    <section className="section"><div className="container intro-grid"><div className="intro-photo"><Image src="/images/learner-transport.png" alt="Learner smiling from the window of a scholar transport minibus" fill sizes="(max-width: 700px) 100vw, 50vw" /></div><div><span className="eyebrow">About the alliance</span><h2>A BETTER TOMORROW<br />FOR OUR LEARNERS.</h2><p className="section-intro">We work with operators, schools, parents and communities to promote safe, compliant and professional scholar transport services across Limpopo.</p><ul className="bullet-list"><li><Check /> A collective voice for local operators</li><li><Check /> A commitment to safer journeys</li><li><Check /> Stronger links across our communities</li></ul><Link className="button" href="/about">Learn More About Us <span aria-hidden="true">→</span></Link></div></div></section>
    <section className="section section-cream"><div className="container"><div className="section-heading-row"><div><span className="eyebrow">From the alliance</span><h2>LATEST NEWS & UPDATES</h2></div><Link className="text-link" href="/news">View All <span aria-hidden="true">→</span></Link></div><p className="demo-note">Preview articles below are demonstration content. LSTA should replace them with approved updates before public launch.</p><div className="news-grid">{articles.map(article => <NewsCard key={article.slug} article={article} />)}</div></div></section>
    <section className="cta-band"><div className="container cta-band-inner"><div><h2>Let’s move forward together.</h2><p>Ask about the alliance or talk to us about scholar transport in Limpopo.</p></div><a className="button" href={site.whatsappHref} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp <span aria-hidden="true">→</span></a></div></section>
  </>;
}

import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/news";

export function NewsCard({ article }: { article: Article }) {
  const isAnnouncement = article.category === "Announcement";
  return <article className="news-card"><Link href={`/news/${article.slug}`} className={`news-card-image${article.imagePresentation === "poster" ? " news-card-image-poster" : ""}`} aria-label={`View ${article.title}`}><Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" /></Link><div className="news-card-body"><span className="article-meta">{!isAnnouncement && article.date ? `${new Intl.DateTimeFormat("en-ZA", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${article.date}T12:00:00Z`))} · ` : ""}{article.category}</span><h3><Link href={`/news/${article.slug}`}>{article.title}</Link></h3><p>{article.summary}</p><Link className="text-link" href={`/news/${article.slug}`}>{isAnnouncement ? "View announcement" : "Read article"} <span aria-hidden="true">→</span></Link></div></article>;
}

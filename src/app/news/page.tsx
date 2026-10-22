import { PageHero } from "@/components/page-hero";
import { NewsCard } from "@/components/news-card";
import { getPublishedArticles } from "@/lib/news";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("News & Updates", "Read articles and updates from Limpopo Scholar Transport Alliance.", "/news");

export default function NewsPage() {
  const articles = getPublishedArticles();
  return <><PageHero title="News & Updates" subtitle="Latest announcements, safety tips and important information." /><section className="section section-cream"><div className="container"><div className="section-heading-row"><div><span className="eyebrow">From the alliance</span><h2>ALL ARTICLES</h2></div></div><div className="news-grid">{articles.map(article => <NewsCard key={article.slug} article={article} />)}</div></div></section></>;
}

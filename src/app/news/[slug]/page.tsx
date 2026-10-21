import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getArticle, getArticles } from "@/lib/news";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getArticles().map(article => ({ slug: article.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { ...pageMetadata(article.title, article.summary, `/news/${slug}`), openGraph: { title: article.title, description: article.summary, type: "article", publishedTime: `${article.date}T12:00:00Z`, images: [{ url: article.image, alt: article.imageAlt }] } };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <article className="container"><div className="article-layout"><header className="article-header"><Link href="/news" className="text-link">← All news</Link><div style={{marginTop:25}} className="article-meta">{new Intl.DateTimeFormat("en-ZA", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${article.date}T12:00:00Z`))} · {article.category}</div><h1>{article.title}</h1><p>{article.summary}</p></header>{article.demo && <p className="demo-note">This is demonstration content, not an official LSTA announcement.</p>}<div className="article-image"><Image src={article.image} alt={article.imageAlt} fill priority sizes="(max-width: 800px) 100vw, 800px" /></div><div className="article-body"><ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown></div></div></article>;
}

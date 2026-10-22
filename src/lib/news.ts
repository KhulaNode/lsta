import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

export type Article = {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  imageAlt: string;
  imagePresentation: "photo" | "poster";
  summary: string;
  body: string;
  demo: boolean;
};

const contentDir = path.join(process.cwd(), "src/content/news");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function getArticle(slug: string): Article | null {
  if (!slugPattern.test(slug)) return null;
  const file = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  if (!match) throw new Error(`Missing frontmatter in article ${slug}`);
  const data = YAML.parse(match[1]);
  if (!data || typeof data !== "object") throw new Error(`Invalid frontmatter in article ${slug}`);
  for (const field of ["title", "date", "category", "image", "imageAlt", "summary"] as const) {
    if (typeof data[field] !== "string" || !data[field].trim()) throw new Error(`Invalid ${field} in article ${slug}`);
  }
  if (data.slug !== slug || !/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !data.image.startsWith("/images/")) throw new Error(`Invalid metadata in article ${slug}`);
  return { slug, title: data.title, date: data.date, category: data.category, image: data.image, imageAlt: data.imageAlt, imagePresentation: data.imagePresentation === "poster" ? "poster" : "photo", summary: data.summary, body: match[2], demo: data.demo !== false };
}

export function getArticles(): Article[] {
  return fs.readdirSync(contentDir).filter(file => file.endsWith(".md")).map(file => getArticle(file.slice(0, -3))).filter((article): article is Article => article !== null).sort((a, b) => b.date.localeCompare(a.date));
}

export function getPublishedArticle(slug: string): Article | null {
  const article = getArticle(slug);
  return article && !article.demo ? article : null;
}

export function getPublishedArticles(): Article[] {
  return getArticles().filter(article => !article.demo);
}

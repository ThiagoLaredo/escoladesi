import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MobileMenu from "../../mobile-menu";
import SiteFooter from "../../site-footer";
import { getNewsArticleBySlug } from "../../../lib/contentful";

type NewsArticleRouteProps = {
  params: Promise<{ slug: string }>;
};

function splitParagraphs(value: string): string[] {
  return value
    .split(/\r?\n\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function formatNewsDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function generateMetadata({ params }: NewsArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) return {};

  return {
    description: article.description,
    title: `${article.title} | Escoladesi`,
  };
}

export default async function NewsArticlePage({ params }: NewsArticleRouteProps) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) notFound();

  const paragraphs = splitParagraphs(article.content);

  return (
    <main className="news-article-page">
      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="Escoladesi - início">
          <Image src="/logo-escola-de-si-1.png" alt="Escoladesi" width={872} height={148} priority />
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="/">home</Link><Link href="/sobre">sobre</Link><Link href="/#agenda">agenda</Link><Link href="/#pesquisa">pesquisa</Link><Link href="/sob-medida">sob medida</Link><Link href="/metodologia">metodologia</Link><Link aria-current="page" href="/news">news</Link>
        </nav>
        <Link className="menu-link" href="/#contato">contato</Link>
        <MobileMenu activeLabel="news" />
      </header>

      <article className="news-article">
        <div className="news-article-inner">
          <Link className="news-article-back" href="/news">← voltar para news</Link>
          <span className="news-article-date">{formatNewsDate(article.date)}</span>
          <h1>{article.title}</h1>
          {article.imageUrl ? (
            <div className="news-article-image-wrap">
              <Image
                alt={article.title}
                className="news-article-image"
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 980px"
                src={article.imageUrl}
              />
            </div>
          ) : null}
          <div className="news-article-content">
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
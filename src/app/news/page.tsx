import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "../mobile-menu";
import SiteFooter from "../site-footer";
import { getNewsArticles } from "../../lib/contentful";

export const metadata: Metadata = {
  description: "Notícias, reflexões e atualizações da Escola de Si.",
  title: "News | Escoladesi",
};

function formatNewsDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function NewsPage() {
  const articles = await getNewsArticles();

  return (
    <main className="news-page">
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

      <section className="news-hero" aria-labelledby="news-title">
        <p>atualizações da escola</p>
        <h1 id="news-title">news</h1>
        <p className="news-hero-copy">textos, anúncios e notícias publicadas a partir do contentful, organizadas para leitura rápida na lista e acesso completo em páginas individuais.</p>
      </section>

      <section className="news-list-section" aria-label="Lista de notícias">
        {articles.length > 0 ? (
          <div className="news-grid">
            {articles.map((article) => (
              <Link className="news-card" href={`/news/${article.slug}`} key={article.slug}>
                <div className="news-card-image-wrap">
                  {article.imageUrl ? (
                    <Image
                      alt={article.title}
                      className="news-card-image"
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={article.imageUrl}
                    />
                  ) : null}
                </div>
                <div className="news-card-body">
                  <span className="news-card-date">{formatNewsDate(article.date)}</span>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <span className="news-card-cta">ler notícia →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="news-empty">Nenhuma notícia foi encontrada no Contentful ainda.</p>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
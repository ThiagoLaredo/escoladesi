import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import MobileMenu from "../mobile-menu";
import SiteFooter from "../site-footer";
import { getActivityPageBySlug } from "../../lib/contentful";

type ActivityRouteProps = {
  params: Promise<{ slug: string }>;
};

function splitParagraphs(value?: string): string[] {
  if (!value) return [];

  return value
    .split(/\r?\n\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export async function generateMetadata({ params }: ActivityRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getActivityPageBySlug(slug);

  if (!page) return {};

  return {
    description: page.seoDescricao ?? page.introducao,
    title: page.seoTitulo ?? page.titulo,
  };
}

export default async function ActivityPageBySlug({ params }: ActivityRouteProps) {
  const { slug } = await params;
  const page = await getActivityPageBySlug(slug);

  if (!page) notFound();

  const introParagraphs = splitParagraphs(page.introducao);
  const programInfoParagraphs = splitParagraphs(page.informacoesProgramacao);
  const cancellationParagraphs = splitParagraphs(page.politicaCancelamento);
  const doubtParagraphs = splitParagraphs(page.textoDuvidas);
  const contactEmail = page.emailContato?.trim() || "ola@escoladesi.com.br";

  return (
    <main className="activity-page">
      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="Escoladesi - início">
          <Image src="/logo-escola-de-si-1.png" alt="Escoladesi" width={872} height={148} priority />
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="/">home</Link><Link href="/sobre">sobre</Link><Link href="/#agenda">agenda</Link><Link href="/#pesquisa">pesquisa</Link><Link href="/sob-medida">sob medida</Link><Link href="/metodologia">metodologia</Link><Link href="/#novidades">news</Link>
        </nav>
        <Link className="menu-link" href="/#contato">contato</Link>
        <MobileMenu activeLabel="atividades" />
      </header>

      <section className="activity-hero" aria-labelledby="activity-title">
        {page.imagemHeroUrl ? (
          <Image
            alt=""
            aria-hidden="true"
            className="activity-hero-graphic"
            fill
            priority
            sizes="100vw"
            src={page.imagemHeroUrl}
          />
        ) : null}
        {page.formato ? <p className="activity-format">{page.formato}</p> : null}
        <h1 id="activity-title">{page.titulo}</h1>
        {page.preco ? <p className="activity-price">{page.preco}</p> : null}
        {introParagraphs.length > 0 ? introParagraphs.map((paragraph) => (
          <p className="activity-intro" key={paragraph}>{paragraph}</p>
        )) : null}
        {page.linkInscricao ? (
          <a className="activity-cta" href={page.linkInscricao} rel="noopener noreferrer" target="_blank">quero participar</a>
        ) : null}
      </section>

      <div className="activity-feature-grid">
        <section className="activity-section" aria-label="Com quem">
          <h2>_com quem</h2>
          {page.comQuem ? (
            <div className="activity-speaker">
              <div className="activity-speaker-profile">
                {page.comQuem.fotoUrl ? (
                  <Image alt={page.comQuem.nome} className="activity-speaker-photo" height={220} src={page.comQuem.fotoUrl} width={220} />
                ) : null}
                <span className="activity-speaker-name">{page.comQuem.nome}</span>
              </div>
              <div className="activity-speaker-copy">
                {page.comQuem.bio ? <p>{page.comQuem.bio}</p> : null}
                {page.comQuem.linkedin || page.comQuem.instagram ? (
                  <div className="activity-social-links">
                    {page.comQuem.linkedin ? (
                      <a aria-label={`LinkedIn de ${page.comQuem.nome}`} href={page.comQuem.linkedin} rel="noopener noreferrer" target="_blank"><FaLinkedinIn aria-hidden="true" /></a>
                    ) : null}
                    {page.comQuem.instagram ? (
                      <a aria-label={`Instagram de ${page.comQuem.nome}`} href={page.comQuem.instagram} rel="noopener noreferrer" target="_blank"><FaInstagram aria-hidden="true" /></a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </section>

        <section className="activity-section highlight" aria-label="Programação">
          <h2>_programação</h2>
          {page.datas ? <p className="activity-schedule-dates">{page.datas}</p> : null}
          {page.horario ? <p>{page.horario}</p> : null}
          {programInfoParagraphs.length > 0 ? programInfoParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>) : null}
          {page.linkInscricao ? (
            <a className="activity-cta" href={page.linkInscricao} rel="noopener noreferrer" target="_blank">quero participar</a>
          ) : null}
        </section>
      </div>

      <section className="activity-section" aria-label="Pra quem">
        <h2>_pra quem</h2>
        <ul className="activity-list activity-card-list">
          {page.praQuem.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="activity-section" aria-label="Como é">
        <h2>_como é</h2>
        <div className="activity-copy-cards">
          {page.comoE.map((item) => (
            <article className="activity-copy-card" key={`${item.titulo}:${item.texto}`}>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="activity-section" aria-label="Ao longo da oficina, vamos">
        <h2>_ao longo da oficina, vamos</h2>
        <ul className="activity-list activity-card-list">
          {page.aoLongoDaOficina.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="activity-section" aria-label="Por que essa oficina existe">
        <h2>_por que essa oficina existe</h2>
        <div className="activity-copy-cards">
          {page.porQueEssaOficinaExiste.map((item) => (
            <article className="activity-copy-card" key={`${item.titulo}:${item.texto}`}>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="activity-section" aria-label="O que você leva dessa experiência">
        <h2>_o que você leva dessa experiência</h2>
        <ul className="activity-list activity-card-list">
          {page.oQueVoceLeva.map((item) => <li key={item}>{item}</li>)}
        </ul>
        {page.linkInscricao ? (
          <a className="activity-cta" href={page.linkInscricao} rel="noopener noreferrer" target="_blank">quero participar</a>
        ) : null}
      </section>

      <section className="activity-section" aria-label="Cancelamentos e reembolsos">
        <h2>_cancelamentos e reembolsos</h2>
        {cancellationParagraphs.length > 0 ? (
          <details className="activity-disclosure">
            <summary>clique para ver política de cancelamento e reembolso</summary>
            <div className="activity-disclosure-body">
              {cancellationParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </details>
        ) : null}
      </section>

      <section className="activity-section" aria-label="Dúvidas">
        <h2>_tem dúvidas?</h2>
        {doubtParagraphs.length > 0 ? doubtParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>) : null}
        <p>escreve pra <a href={`mailto:${contactEmail}`}>{contactEmail}</a> e seguimos :)</p>
      </section>

      <SiteFooter />
    </main>
  );
}
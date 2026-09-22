import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import MobileMenu from "../mobile-menu";
import SiteFooter from "../site-footer";
import {
  getActivityPageBySlug,
  getAllActivityPages,
  getAllFreePages,
  getFreePageBySlug,
  type ActivityPage,
  type ContentfulRichTextNode,
  type FreePage,
} from "../../lib/contentful";

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

function toEmbeddedAsset(node?: ContentfulRichTextNode): { title?: string; url?: string } | null {
  const fields = node?.data?.target?.fields;
  if (!fields) return null;

  const url = fields.file?.url?.startsWith("//") ? `https:${fields.file.url}` : fields.file?.url;
  return { title: fields.title?.trim(), url };
}

function renderRichTextMarks(value: string, marks?: Array<{ type?: string }>): ReactNode {
  return (marks ?? []).reduce<ReactNode>((content, mark, index) => {
    const key = `${mark.type ?? "mark"}_${index}`;
    if (mark.type === "bold") return <strong key={key}>{content}</strong>;
    if (mark.type === "italic") return <em key={key}>{content}</em>;
    if (mark.type === "underline") return <u key={key}>{content}</u>;
    if (mark.type === "code") return <code key={key}>{content}</code>;
    return content;
  }, value);
}

function renderRichTextNodes(nodes?: ContentfulRichTextNode[], keyPrefix = "node"): ReactNode[] {
  return (nodes ?? []).map((node, index) => renderRichTextNode(node, `${keyPrefix}_${index}`)).filter((node) => node !== null);
}

function renderRichTextNode(node?: ContentfulRichTextNode, key = "node"): ReactNode | null {
  if (!node) return null;

  if (node.nodeType === "text") {
    if (!node.value) return null;
    return <Fragment key={key}>{renderRichTextMarks(node.value, node.marks)}</Fragment>;
  }

  const children = renderRichTextNodes(node.content, key);

  switch (node.nodeType) {
    case "document":
      return <Fragment key={key}>{children}</Fragment>;
    case "paragraph":
      return <p key={key}>{children}</p>;
    case "heading-1":
      return <h2 key={key}>{children}</h2>;
    case "heading-2":
      return <h3 key={key}>{children}</h3>;
    case "heading-3":
      return <h4 key={key}>{children}</h4>;
    case "unordered-list":
      return <ul key={key}>{children}</ul>;
    case "ordered-list":
      return <ol key={key}>{children}</ol>;
    case "list-item":
      return <li key={key}>{children}</li>;
    case "blockquote":
      return <blockquote key={key}>{children}</blockquote>;
    case "hr":
      return <hr key={key} />;
    case "hyperlink":
      return <a key={key} href={node.data?.uri} rel="noopener noreferrer" target="_blank">{children}</a>;
    case "embedded-asset-block": {
      const asset = toEmbeddedAsset(node);
      if (!asset?.url) return null;

      return (
        <figure className="free-page-figure" key={key}>
          <img alt={asset.title ?? ""} className="free-page-inline-image" loading="lazy" src={asset.url} />
          {asset.title ? <figcaption>{asset.title}</figcaption> : null}
        </figure>
      );
    }
    default:
      return children.length > 0 ? <Fragment key={key}>{children}</Fragment> : null;
  }
}

function RootPageHeader({ activeLabel }: { activeLabel: string }) {
  return (
    <header className="topbar">
      <Link className="wordmark" href="/" aria-label="Escoladesi - início">
        <Image src="/logo-escola-de-si-1.png" alt="Escoladesi" width={872} height={148} priority />
      </Link>
      <nav aria-label="Navegação principal">
        <Link href="/">home</Link><Link href="/sobre">sobre</Link><Link href="/#agenda">agenda</Link><Link href="/#pesquisa">pesquisa</Link><Link href="/sob-medida">sob medida</Link><Link href="/metodologia">metodologia</Link><Link href="/news">news</Link>
      </nav>
      <Link className="menu-link" href="/#contato">contato</Link>
      <MobileMenu activeLabel={activeLabel} />
    </header>
  );
}

function ActivityPageView({ page }: { page: ActivityPage }) {
  const introParagraphs = splitParagraphs(page.introducao);
  const programInfoParagraphs = splitParagraphs(page.informacoesProgramacao);
  const contactEmail = page.emailContato?.trim() || "ola@escoladesi.com.br";
  const cancellationParagraphs = splitParagraphs(page.politicaCancelamento);
  const finalCancellationParagraphs = cancellationParagraphs.length > 0
    ? cancellationParagraphs
    : ["Cancele sua participação com antecedência e, se necessário, a gente conversa sobre reembolso ou reagendamento. Para mais detalhes, escreva para ola@escoladesi.com.br."];
  const doubtParagraphs = splitParagraphs(page.textoDuvidas);
  const finalDoubtParagraphs = doubtParagraphs.length > 0 ? doubtParagraphs : [];

  return (
    <main className="activity-page">
      <RootPageHeader activeLabel="atividades" />

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
          {page.atividadesData ? <p className="activity-schedule-dates">{page.atividadesData}</p> : null}
          {page.horario ? <p>{page.horario}</p> : null}
          {page.formato ? <p>{page.formato}</p> : null}
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
          {page.comoE.map((item, index) => (
            <article className="activity-copy-card" key={`comoE_${index}`}>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="activity-section" aria-label="Ao longo da oficina, vamos">
        <h2>_ao longo da oficina, vamos</h2>
        <ul className="activity-list activity-card-list">
          {page.aoLongoDaOficina.map((item, index) => <li key={`aoLongo_${index}`}>{item}</li>)}
        </ul>
      </section>

      <section className="activity-section" aria-label="Por que essa oficina existe">
        <h2>_por que essa oficina existe</h2>
        <div className="activity-copy-cards">
          {page.porQueEssaOficinaExiste.map((item, index) => (
            <article className="activity-copy-card" key={`porQue_${index}`}>
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
        {finalCancellationParagraphs.length > 0 ? (
          <details className="activity-disclosure">
            <summary>clique para ver política de cancelamento e reembolso</summary>
            <div className="activity-disclosure-body">
              {finalCancellationParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </details>
        ) : null}
      </section>

      <section className="activity-section" aria-label="Dúvidas">
        <h2>_tem dúvidas?</h2>
        {finalDoubtParagraphs.length > 0 ? finalDoubtParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>) : null}
        <p>escreve pra <a href={`mailto:${contactEmail}`}>{contactEmail}</a> e seguimos :)</p>
      </section>

      <SiteFooter />
    </main>
  );
}

function FreePageView({ page }: { page: FreePage }) {
  const contentParagraphs = typeof page.conteudo === "string" ? splitParagraphs(page.conteudo) : [];

  return (
    <main className="free-page">
      <RootPageHeader activeLabel="página" />

      <section className="free-page-hero" aria-labelledby="free-page-title">
        {page.imagemHeroUrl ? (
          <Image
            alt=""
            aria-hidden="true"
            className="free-page-hero-image"
            fill
            priority
            sizes="100vw"
            src={page.imagemHeroUrl}
          />
        ) : null}
        <h1 id="free-page-title">{page.titulo}</h1>
      </section>

      <section className="free-page-body" aria-label="Conteúdo da página">
        <div className="free-page-rich-text">
          {typeof page.conteudo === "string"
            ? contentParagraphs.map((paragraph, index) => <p key={`free_page_paragraph_${index}`}>{paragraph}</p>)
            : renderRichTextNode(page.conteudo, "free_page_content")}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

export async function generateMetadata({ params }: ActivityRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const activityPage = await getActivityPageBySlug(slug);

  if (activityPage) {
    return {
      description: activityPage.seoDescricao ?? activityPage.introducao,
      title: activityPage.seoTitulo ?? activityPage.titulo,
    };
  }

  const freePage = await getFreePageBySlug(slug);

  if (freePage) {
    return {
      description: freePage.seoDescricao ?? freePage.conteudoTexto,
      title: freePage.seoTitulo ?? freePage.titulo,
    };
  }

  return {};
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const [activityPages, freePages] = await Promise.all([
    getAllActivityPages(),
    getAllFreePages(),
  ]);

  const seenSlugs = new Set<string>();

  return [...activityPages, ...freePages].flatMap((page) => {
    if (!page.slug || seenSlugs.has(page.slug)) return [];
    seenSlugs.add(page.slug);
    return [{ slug: page.slug }];
  });
}

export default async function ActivityPageBySlug({ params }: ActivityRouteProps) {
  const { slug } = await params;
  const activityPage = await getActivityPageBySlug(slug);
  if (activityPage) return <ActivityPageView page={activityPage} />;

  const freePage = await getFreePageBySlug(slug);
  if (freePage) return <FreePageView page={freePage} />;

  notFound();
}
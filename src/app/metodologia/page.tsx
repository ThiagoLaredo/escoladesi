import Image from "next/image";
import Link from "next/link";
import MobileMenu from "../mobile-menu";
import SiteFooter from "../site-footer";

export default function MetodologiaPage() {
  return (
    <main className="metodologia-page">
      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="Escoladesi - início">
          <Image src="/logo-escola-de-si-1.png" alt="Escoladesi" width={872} height={148} priority />
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="/">home</Link><Link href="/sobre">sobre</Link><Link href="/#agenda">agenda</Link><Link href="/#pesquisa">pesquisa</Link><Link href="/sob-medida">sob medida</Link><Link aria-current="page" href="/metodologia">metodologia</Link><Link href="/#novidades">news</Link>
        </nav>
        <Link className="menu-link" href="/#contato">contato</Link>
        <MobileMenu activeLabel="metodologia" />
      </header>

      <section className="metodologia-hero" aria-labelledby="metodologia-title">
        <div className="metodologia-hero-copy">
          <p>como pensamos</p>
          <h1 id="metodologia-title">metodologia</h1>
          <p className="metodologia-lead">na base de nossa escola estão questionamentos, reflexões, técnicas e práticas voltadas pra comunicação pessoal autêntica, pra expressão de identidade e pra uma atuação criativa na vida e no trabalho.</p>
          <p className="metodologia-pillars">sobre essa base, desenhamos uma arquitetura que conta com três pilares estruturantes (<strong>identidade</strong>, <strong>ferramentas</strong> e <strong>relacionamento</strong>) e um pilar transversal (<strong>prática</strong>), contornados por três dimensões (<strong>humanidade</strong>, <strong>criatividade</strong> e <strong>bem-estar</strong>) que dão vida e sentido a eles.</p>
        </div>
        <img className="metodologia-diagram" src="/diagrama-metodologia.svg" alt="Diagrama da metodologia da Escoladesi" />
      </section>

      <section className="pillars-section" aria-labelledby="pillars-title">
        <h2 id="pillars-title">pilares estruturantes</h2>
        <div className="pillars-grid">
          <article className="pillar-card">
            <h3>_identidade / saber de si</h3>
            <p>reconhecer quem se é e o que se quer representar no mundo; cultivar expressão genína, clareza de valores e orgulho da própria história, entendendo que identidade é algo vivo, que flui e se transforma.</p>
          </article>
          <article className="pillar-card">
            <h3>_ferramentas / onde estar, como estar</h3>
            <p>transformar intenção em forma; usar métodos, rotinas e estruturas (do calendário editorial ao guarda-roupa, dos roteiros aos cenários) pra dar sustentação prática à expressão criativa.</p>
          </article>
          <article className="pillar-card">
            <h3>_relacionamento / se conectar! formar comunidade</h3>
            <p>comunicar de gente pra gente; botar foco em criar vínculos com clientes, equipes, parceiras, fazendo da troca o motor da colaboração e do crescimento coletivo.</p>
          </article>
        </div>
      </section>

      <section className="pillars-section transversal-section" aria-labelledby="transversal-title">
        <h2 id="transversal-title">pilar transversal</h2>
        <article className="pillar-card transversal-card">
          <h3>_prática (falar de si)</h3>
          <p>transformar teoria em movimento; fazer consciente, aprender fazendo, ajustar no caminho e seguir, porque é praticando que tudo se integra e amadurece (a prática melhora todas as práticas!).</p>
        </article>
      </section>

      <section className="pillars-section dimensions-section" aria-labelledby="dimensions-title">
        <h2 id="dimensions-title">dimensões que contornam tudo</h2>
        <div className="pillars-grid">
          <article className="pillar-card">
            <h3>_humanidade</h3>
            <p>reconexão com o sentir, com nossos limites e atributos mais naturais, com a empatia e com o tempo humano, tendo o coração como ponte entre pensar e agir.</p>
          </article>
          <article className="pillar-card">
            <h3>_criatividade</h3>
            <p>experimentação e recombinação de repertórios que dão permissão pra desenvolver olhar autoral e inventar novos trabalhos, soluções ou produtos, do zero.</p>
          </article>
          <article className="pillar-card">
            <h3>_bem-estar</h3>
            <p>convite à atenção consigo, à autonomia e à celebração: produzir e comunicar bem é também cuidar de si.</p>
          </article>
        </div>
      </section>

      <section className="methodology-cta" aria-label="Convite para co-criação">
        <p>quer compartilhar saberes em nossa escola? vem co-criar com a gente!</p>
        <Link href="/#contato">clica aqui ;)</Link>
      </section>

      <SiteFooter />
    </main>
  );
}

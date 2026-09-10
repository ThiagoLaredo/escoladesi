import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AccordionSections from "./accordion-sections";
import HeroRotatingPhrase from "./hero-rotating-phrase";
import MobileMenu from "./mobile-menu";
import ProgramsCarousel from "./programs-carousel";
import SiteFooter from "./site-footer";

const schoolLinks = [
  ["aulas & oficinas", "técnicas e questionamentos pra transformar reflexão em prática e sair com ideias testadas, com a sua cara", "#agenda"],
  ["vivências in company", "experiências co-criadas para fortalecer cultura, pertencimento e comunicação dentro das organizações", "#contato"],
  ["grupos de estudos", "encontros para investigar ideias, organizar repertório e aprender em companhia", "#contato"],
  ["ante_sala", "uma comunidade para cultivar conversas, práticas e presença em ritmos possíveis", "#metodologia"],
  ["nossa metodologia", "um ciclo contínuo de prática e consciência para falar de si com autenticidade", "#metodologia"],
  ["nossa pesquisa", "perguntas e descobertas sobre identidade, comunicação pessoal e vida online", "#contato"],
] as const;

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="Escoladesi - inicio">
          <Image src="/logo-escola-de-si-1.png" alt="Escoladesi" width={872} height={148} priority />
        </Link>
        <nav aria-label="Navegacao principal">
          <Link href="/" aria-current="page">home</Link><Link href="/sobre">sobre</Link><a href="#agenda">agenda</a><a href="#pesquisa">pesquisa</a><Link href="/sob-medida">sob medida</Link><Link href="/metodologia">metodologia</Link><a href="#novidades">news</a>
        </nav>
        <a className="menu-link" href="#contato">contato</a>
        <MobileMenu />
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">saber de si pra falar de si</h1>
        <div className="hero-bottom"><p>capacitação contínua em identidade &amp; presença online</p><HeroRotatingPhrase /></div>
      </section>

      <section className="manifesto" id="escola" aria-labelledby="manifesto-title">
        <h2 id="manifesto-title">fazer companhia &gt;<br /><strong>fazer campanha :)</strong></h2>
        <div className="manifesto-columns">
          <p>uma escola de autoconhecimento pra comunicação pessoal! <strong>pra quem quer ser porta-voz da própria história com autenticidade, se reconhecendo no processo e também em como se apresenta pro mundo.</strong></p>
          <p>nossa metodologia oferece caminhos de investigação de si e ferramentas pra <strong>reconhecer identidade, se apropriar da própria trajetória como repertório &amp; desenhar estratégias pra uma presença online saudável :)</strong> em processos criativos que tornam possível a continuidade e a consistência do que começa dentro pra, então, encontrar uma comunidade.</p>
          <p>sem ficar refém de algoritmos, sem precisar fazer marketing, sem cair em armadilhas que afastam do que é humano! encontrando jeito e ritmo próprios pra falar de ideias e do trabalho, sem tomar mais tempo que nossas próprias carreiras/nossas próprias vidas.</p>
        </div>
      </section>

      <ProgramsCarousel />

      <section className="school-nav" aria-labelledby="school-nav-title">
        <h2 id="school-nav-title">conheça a escola</h2>
        <div className="school-nav-grid">
          {schoolLinks.map(([title, description, href]) => <a className="school-nav-card" href={href} key={title}>
            <span className="school-nav-card-title">{title}<ArrowUpRight aria-hidden="true" /></span>
            <span className="school-nav-card-description">{description}</span>
          </a>)}
        </div>
      </section>

      <section className="method" id="metodologia" aria-labelledby="method-title">
        <div><h2 id="method-title">nossa<br />metodologia</h2><p>uma escola de autoconhecimento
      pra comunicação pessoal! <strong>pra
      quem quer ser porta-voz da
própria história com
autenticidade, se reconhecendo
no processo e também em como
      se apresenta pro mundo..</strong></p><a href="#contato">saiba mais</a></div>
  <img className="method-diagram" src="/diagrama-metodologia.svg" alt="Diagrama da metodologia da Escoladesi" />
      </section>

      <AccordionSections />

      <section className="escola-fix" aria-labelledby="escola-fix-title">
        <div className="escola-fix-frame"><h2 id="escola-fix-title">escola_f ix</h2></div>
      </section>

      <SiteFooter />
    </main>
  );
}

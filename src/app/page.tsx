import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import AccordionSections from "./accordion-sections";
import HeroRotatingPhrase from "./hero-rotating-phrase";
import MobileMenu from "./mobile-menu";
import ProgramsCarousel from "./programs-carousel";

const schoolLinks = ["aulas & oficinas", "vivências in company", "grupos de estudos", "ante_sala", "nossa metodologia", "nossa pesquisa"];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="Escoladesi - inicio">
          <Image src="/logo-escola-de-si-1.png" alt="Escoladesi" width={872} height={148} priority />
        </Link>
        <nav aria-label="Navegacao principal">
          <Link href="/" aria-current="page">home</Link><a href="#agenda">agenda</a><a href="#pesquisa">pesquisa</a><Link href="/sob-medida">sob medida</Link><a href="#metodologia">metodologia</a><a href="#novidades">news</a>
        </nav>
        <a className="menu-link" href="#contato">contato</a>
        <MobileMenu />
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">saber de si<br /><strong>pra falar de si</strong></h1>
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
        {schoolLinks.map((link, index) => <a href={index === 3 ? "#metodologia" : "#contato"} key={link}>{link}<ArrowUpRight aria-hidden="true" /></a>)}
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

      <section className="newsletter" id="novidades"><h2>receba nossa newsletter</h2><p>ideias construídas coletivamente nas aulas, toda semana em seu email</p><form><label className="sr-only" htmlFor="email">Seu email</label><input id="email" type="email" placeholder="seu melhor email" /><button type="submit">enviar &#8594;</button></form></section>
      <footer id="contato"><Link className="footer-logo" href="/" aria-label="Escoladesi - início"><Image src="/logo-escola-de-si-1.png" alt="Escoladesi" width={872} height={148} /></Link><div className="footer-contact"><a className="email-link" href="mailto:ola@escoladesi.com.br" aria-label="Enviar e-mail para Escoladesi"><Mail aria-hidden="true" strokeWidth={1.75} /></a><div className="social-links"><a href="https://www.instagram.com" aria-label="Instagram da Escoladesi" rel="noreferrer" target="_blank"><FaInstagram aria-hidden="true" /></a><a href="https://www.linkedin.com" aria-label="LinkedIn da Escoladesi" rel="noreferrer" target="_blank"><FaLinkedinIn aria-hidden="true" /></a></div></div><span>© 2026</span></footer>
    </main>
  );
}

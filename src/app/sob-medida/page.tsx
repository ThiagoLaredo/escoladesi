import Image from "next/image";
import Link from "next/link";
import MobileMenu from "../mobile-menu";

export default function SobMedidaPage() {
  return (
    <main className="sob-medida-page">
      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="Escoladesi - início">
          <Image src="/logo-escola-de-si-1.png" alt="Escoladesi" width={872} height={148} priority />
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="/">home</Link><Link href="/#agenda">agenda</Link><Link href="/#pesquisa">pesquisa</Link><Link aria-current="page" href="/sob-medida">sob medida</Link><Link href="/#metodologia">metodologia</Link><Link href="/#novidades">news</Link>
        </nav>
        <Link className="menu-link" href="/#contato">contato</Link>
        <MobileMenu activeLabel="sob medida" />
      </header>

      <section className="sob-medida-hero" aria-labelledby="sob-medida-title">
        <p>pra fazer junto</p>
        <h1 id="sob-medida-title">sob<br /><strong>medida_</strong></h1>
        <div className="sob-medida-mark" aria-hidden="true"><span>+</span><span>+</span><span>+</span></div>
      </section>

      <section className="sob-medida-content" aria-label="Conteúdo sob medida">
        <p className="sob-medida-lead"><strong>nossos conteúdos de capacitação em comunicação pessoal vêm de mais de 20 anos de experiência e das dores reais do nosso tempo, abrindo espaço para saber de si e se enxergar com clareza; sem artifícios mercadológicos que confundem pessoas em produtos.</strong></p>
        <p className="sob-medida-body">pra reconhecer quem somos, as narrativas que queremos colocar no mundo e as ferramentas disponíveis para criar formas próprias de expressão! e assim estar em conexão, construir reputação e dar forma a comunidades.</p>
        <Link className="sob-medida-contact" href="/#contato">vamos conversar</Link>
      </section>
    </main>
  );
}
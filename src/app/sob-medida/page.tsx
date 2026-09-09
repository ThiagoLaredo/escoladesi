import Image from "next/image";
import Link from "next/link";
import MobileMenu from "../mobile-menu";
import SiteFooter from "../site-footer";

export default function SobMedidaPage() {
  return (
    <main className="sob-medida-page">
      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="Escoladesi - início">
          <Image src="/logo-escola-de-si-1.png" alt="Escoladesi" width={872} height={148} priority />
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="/">home</Link><Link href="/sobre">sobre</Link><Link href="/#agenda">agenda</Link><Link href="/#pesquisa">pesquisa</Link><Link aria-current="page" href="/sob-medida">sob medida</Link><Link href="/#metodologia">metodologia</Link><Link href="/#novidades">news</Link>
        </nav>
        <Link className="menu-link" href="/#contato">contato</Link>
        <MobileMenu activeLabel="sob medida" />
      </header>

      <section className="sob-medida-hero" aria-labelledby="sob-medida-title">
        <p>pra fazer junto</p>
        <h1 id="sob-medida-title">sob medida_</h1>
        <p className="sob-medida-lead"><strong>nossos conteúdos de capacitação em comunicação pessoal vêm de mais de 20 anos de experiência e das dores reais do nosso tempo, abrindo espaço para saber de si e se enxergar com clareza; sem artifícios mercadológicos que confundem pessoas em produtos.</strong></p>
        <p className="sob-medida-body">pra reconhecer quem somos, as narrativas que queremos colocar no mundo e as ferramentas disponíveis para criar formas próprias de expressão! e assim estar em conexão, construir reputação e dar forma a comunidades.</p>
        <Link className="sob-medida-contact" href="/#contato">vamos conversar</Link>
      </section>

      <section className="in-company-section" aria-labelledby="in-company-title">
        <h2 id="in-company-title">_vivências co-criadas in company</h2>
        <div className="in-company-layout">
          <div className="in-company-copy">
            <p className="in-company-lead"><strong>cocriamos experiências que formam pessoas como porta-vozes humanos, consistentes e confiáveis, tornando visíveis os aprendizados do trabalho cotidiano e fazendo da comunicação uma prática contínua de cultura, reputação e saúde emocional (e não uma sequência de campanhas pontuais ;-).</strong></p>
            <p>nossa metodologia pode fortalecer vínculos entre pessoas, entre áreas, entre o que se faz e por quê se faz; ampliar pertencimento e criar sistemas de autoridade entre colaboradores e empresa: quando alguém comunica com segurança o que constrói, essa relevância se estende à organização.</p>
            <p>um caminho alinhado às novas diretrizes de saúde mental no trabalho (NR-1), para marcas e empresas que entendem comunicação como prática viva de cultura e reputação, capaz de sustentar bem-estar, confiança e impacto real.</p>
          </div>
          <ul>
            <li>vivências presenciais ou online (humanidade, criatividade, bem-estar)</li>
            <li>oficinas presenciais ou online (identidade, ferramentas, relacionamento, prática)</li>
            <li>do conceito à entrega: cada formato termina com um ‘próximo passo testável’ (pequeno, concreto, mensurável)</li>
            <li>resultados potenciais: clareza de mensagem, fortalecimento de cultura, pertencimento, sistemas de autoridade distribuída</li>
          </ul>
        </div>
      </section>
      <section className="sob-medida-proof" aria-label="Experiência e depoimentos">
        <div className="sob-medida-proof-section">
          <h2>com quem já trabalhamos</h2>
          <div className="partner-logos" aria-label="Empresas parceiras">
            {['tarzi', 'mira', 'aura', 'nativa', 'norte', 'modo'].map((partner) => <span key={partner}>{partner}</span>)}
          </div>
        </div>
        <div className="sob-medida-proof-section">
          <h2>depoimentos</h2>
          <div className="sob-medida-testimonials">
            <figure><blockquote>“encontrei um jeito mais verdadeiro de apresentar meu trabalho e minhas ideias.”</blockquote><figcaption>participante da escola</figcaption></figure>
            <figure><blockquote>“foi um processo potente para reconhecer minha trajetória e transformá-la em comunicação.”</blockquote><figcaption>participante da escola</figcaption></figure>
            <figure><blockquote>“saí com mais clareza, repertório e vontade de seguir falando de mim no meu próprio ritmo.”</blockquote><figcaption>participante da escola</figcaption></figure>
          </div>
        </div>
      </section>
      <section className="sob-medida-cta" aria-label="Contato sob medida">
        <h2>somos muito boas de criar junto!</h2>
        <h2>vamos conversar sobre as versões corporativas desses programas?</h2>
        <a href="mailto:ola@escoladesi.com.br">escola de si_sob medida</a>
      </section>
      <SiteFooter />
    </main>
  );
}
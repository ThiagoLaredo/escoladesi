import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import MobileMenu from "../../mobile-menu";
import SiteFooter from "../../site-footer";

const registrationUrl = "https://pay.hub.la/SzZ2evL3VVBOTYeKGoy7";

const forWhom = [
  "acha dificílimo escrever uma boa bio sobre si mesma",
  "trava quando alguém pergunta “o que você faz?”",
  "pensa em diferencial e sente insegurança em relação a isso",
  "tem perfis diferentes em cada plataforma e sente que nenhum representa quem é",
  "quer falar do próprio trabalho com mais espontaneidade e menos improviso",
  "sente que sua trajetória é maior do que consegue colocar em palavras",
  "quer aproveitar o tempo da oficina pra já sair com textos prontos (e coragem pra botar pra jogo!)",
];

const alongTheWay = [
  "entender por que é tão difícil escrever sobre a gente mesma (spoiler: o nervoso não é individual)",
  "ter tempo pra botar no papel: trajetória, atuação, valores e visão de mundo",
  "investigar quais são nossos próprios diferenciais e que palavras/expressões-chave surgem daí pra personalizar nossa comunicação",
  "construir apresentações em diferentes tamanhos e formatos",
  "adaptar esses textos pra instagram, linkedin, sites, newsletters e outros contextos",
  "usar o feedback coletivo pra identificar pontos de confusão, fortalecer ideias e aperfeiçoar nossos textos",
  "experimentar leituras em voz alta e receber orientações de uma convidada especialista em oratória ;-)",
  "preencher bio/sobre nas próprias plataformas durante a oficina, aproveitando esse tempo pra tirar essa tarefa da frente",
  "receber contribuições de participantes com trajetórias e olhares diferentes <3",
];

const takeaways = [
  "template de notion pra duplicar e seguir trabalhando nos exercícios da oficina + versão em pdf pra quem gosta de imprimir <3",
  "uma apresentação principal sobre quem você é e o que faz",
  "versões adaptadas pra diferentes plataformas e situações",
  "um jeito mais organizado de pensar a própria trajetória",
  "mais segurança pra se apresentar em conversas, reuniões e eventos",
  "feedbacks de pessoas que acompanharam todo o processo",
  "um material pronto para continuar sendo atualizado ao longo da carreira",
  "a sensação muuuuito boa de finalmente tirar essa tarefa da frente e deixar suas apresentações organizadas, atualizadas, prontas pra quando surgirem novos convites e oportunidades",
];

export default function GrupoDeEstudoPage() {
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
        <Image alt="" aria-hidden="true" className="activity-hero-graphic" height={576} src="/imagens/graf/grafismos-vazados-cor-8-1024x576.png" width={1024} />
        <p className="activity-format">oficina ao vivo/online</p>
        <h1 id="activity-title">falar da gente mesma (assumir tamanho real)</h1>
        <p className="activity-price">R$ 498,00</p>
        <p className="activity-intro">a gente passa anos construindo trajetória e, ainda assim, costuma travar quando precisa contar quem é, o que faz e no que acredita. uma oficina prática pra escrever, revisar e experimentar apresentações que façam sentido; e já deixando tudo prontinho: na ponta da língua e nas plataformas onde a vida acontece.</p>
        <a className="activity-cta" href={registrationUrl} rel="noopener noreferrer" target="_blank">quero participar</a>
      </section>

      <div className="activity-feature-grid">
        <section className="activity-section" aria-label="Com quem">
          <h2>_com quem</h2>
          <div className="activity-speaker">
            <div className="activity-speaker-profile">
              <Image alt="Fernanda Resende" className="activity-speaker-photo" height={220} src="/imagens/team/fefe resende.jpg" width={220} />
              <span className="activity-speaker-name">fefe resende</span>
            </div>
            <div className="activity-speaker-copy">
              <p>fefe resende trabalha há mais de 20 anos com identidade e autoexpressão. criou metodologias em consultoria de imagem, formou centenas de profissionais e vem desenvolvendo sistemas práticos que transformam intenção em ação e organizam vida, trabalho e comunicação como partes do mesmo campo. autora de gente &gt; internet e outros 4 livros, tem formações em antroposofia, semiótica e relações humanas.</p>
              <div className="activity-social-links">
                <a aria-label="LinkedIn de fefe resende" href="https://www.linkedin.com/in/feferesende/" rel="noopener noreferrer" target="_blank"><FaLinkedinIn aria-hidden="true" /></a>
                <a aria-label="Instagram de fefe resende" href="https://www.instagram.com/feferesende/" rel="noopener noreferrer" target="_blank"><FaInstagram aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="activity-section highlight" aria-label="Programação">
          <h2>_programação</h2>
          <p className="activity-schedule-dates">15, 22 e 29 de setembro, terças-feiras</p>
          <p>de 19h30 às 21h</p>
          <p>online/ao vivo via zoom — o link chega por email na confirmação da matrícula :)</p>
          <a className="activity-cta" href={registrationUrl} rel="noopener noreferrer" target="_blank">quero participar</a>
        </section>
      </div>

      <section className="activity-section" aria-label="Pra quem">
        <h2>_pra quem</h2>
        <ul className="activity-list activity-card-list">
          {forWhom.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="activity-section" aria-label="Como é">
        <h2>_como é</h2>
        <div className="activity-copy-cards">
          <article className="activity-copy-card">
            <h3>estrutura da experiência</h3>
            <p>uma oficina prática de escrita, reflexão e inteligência coletiva. ao longo de 3 encontros, a gente organiza quem é e quem vem sendo pra construir apresentações prontas pra usar no instagram, linkedin, site, newsletter, palestras, propostas e conversas do dia a dia.</p>
          </article>
          <article className="activity-copy-card">
            <h3>resultado no fim da oficina</h3>
            <p>uma tarefa que costuma ficar esquecida vira processo acompanhado, com mão na massa e feedback real. você sai com bios e apresentações revisadas, adaptadas e atualizadas nas plataformas que fazem sentido pra sua vida e trabalho.</p>
          </article>
        </div>
      </section>

      <section className="activity-section" aria-label="Ao longo da oficina, vamos">
        <h2>_ao longo da oficina, vamos</h2>
        <ul className="activity-list activity-card-list">
          {alongTheWay.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="activity-section" aria-label="Por que essa oficina existe">
        <h2>_por que essa oficina existe</h2>
        <div className="activity-copy-cards">
          <article className="activity-copy-card">
            <h3>o problema real</h3>
            <p>quase todo mundo passa anos construindo trajetória e poucos minutos tentando explicar quem é e o que faz.</p>
          </article>
          <article className="activity-copy-card">
            <h3>o que acontece na pressa</h3>
            <p>a gente copia fórmulas, acumula versões diferentes dessas apresentações ou deixa espaços em branco esperando inspiração aparecer.</p>
          </article>
          <article className="activity-copy-card">
            <h3>o que essa oficina propõe</h3>
            <p>se reconhecer no próprio tamanho: sem precisar se aumentar, mas também sem se diminuir.</p>
          </article>
          <article className="activity-copy-card">
            <h3>por que isso importa</h3>
            <p>transformar ansiedade em processo prático e coletivo. ter na ponta da língua quem você é ajuda a se conectar, colaborar, criar junto e abrir novas oportunidades.</p>
          </article>
        </div>
      </section>

      <section className="activity-section" aria-label="O que você leva dessa experiência">
        <h2>_o que você leva dessa experiência</h2>
        <ul className="activity-list activity-card-list">
          {takeaways.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <a className="activity-cta" href={registrationUrl} rel="noopener noreferrer" target="_blank">quero participar</a>
      </section>

      <section className="activity-section" aria-label="Cancelamentos e reembolsos">
        <h2>_cancelamentos e reembolsos</h2>
        <details className="activity-disclosure">
          <summary>clique para ver política de cancelamento e reembolso</summary>
          <div className="activity-disclosure-body">
            <p>seguimos a legislação brasileira pra compras online + nosso jeito cuidadoso de organizar as aulas:</p>
            <p>em cancelamentos até 10 dias antes do encontro devolvemos 100% do valor pago.</p>
            <p>em cancelamentos nos 10 dias anteriores à aula não fazemos reembolso, mas é possível ceder sua vaga para uma amiga. pedimos que avise o quanto antes em <a href="mailto:ola@escoladesi.com.br">ola@escoladesi.com.br</a> pra reorganização interna e envio de link/orientações pra nova participante.</p>
          </div>
        </details>
      </section>

      <section className="activity-section" aria-label="Dúvidas">
        <h2>_tem dúvidas?</h2>
        <p>escreve pra <a href="mailto:ola@escoladesi.com.br">ola@escoladesi.com.br</a> e seguimos :)</p>
      </section>

      <SiteFooter />
    </main>
  );
}

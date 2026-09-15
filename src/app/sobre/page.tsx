import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import MobileMenu from "../mobile-menu";
import SiteFooter from "../site-footer";
import TimelineCarousel, { type TimelineItem } from "../timeline-carousel";
import TeamCarousel from "../team-carousel";

type TeamLink = { type: "instagram" | "linkedin" | "site"; url: string };
type TeamMember = { name: string; role: string; image: string; links: TeamLink[] };

const team: TeamMember[] = [
  {
    name: "fefe resende",
    role: "trabalha com autoexpressão e construção de narrativas desde 2001, orientando a criação de interfaces de interação com o mundo a partir das escolhas de vestir. formou mais de 400 profissionais e publicou 4 livros pela companhia das letras.",
    image: "/imagens/team/fefe resende.jpg",
    links: [
      { type: "instagram", url: "https://www.instagram.com/feferesende/" },
      { type: "site", url: "https://feferesende.substack.com/" },
      { type: "linkedin", url: "https://www.linkedin.com/in/feferesende/" },
    ],
  },
  {
    name: "paula leandro",
    role: "participa da comunicação e do planejamento, e lidera a comunidade de nossa escola, a ante_sala.",
    image: "/imagens/team/paula leandro.jpeg",
    links: [{ type: "instagram", url: "https://www.instagram.com/vidadepaulinha_/" }],
  },
  {
    name: "carol fajardo",
    role: "guardiã da identidade visual da escola e também tá na comunicação, no planejamento e no cultivo de nossa comunidade.",
    image: "/imagens/team/carol fajardo.jpeg",
    links: [{ type: "instagram", url: "https://www.instagram.com/carolfajardo/" }],
  },
  {
    name: "gabi miranda",
    role: "projeto educacional",
    image: "/imagens/team/gabi-miranda.jpeg",
    links: [
      { type: "instagram", url: "https://www.instagram.com/agabriellamiranda/" },
      { type: "linkedin", url: "https://www.linkedin.com/in/agabriellamiranda/" },
    ],
  },
  {
    name: "débora malveira",
    role: "financeiro",
    image: "/imagens/team/debora malveira.jpeg",
    links: [
      { type: "instagram", url: "https://www.instagram.com/debora_malveira/" },
      { type: "site", url: "https://olivafinancas.com.br/" },
    ],
  },
  {
    name: "bruna pereira",
    role: "jurídico",
    image: "/imagens/team/bruna.jpeg",
    links: [{ type: "instagram", url: "https://www.instagram.com/brunabarbosap/" }],
  },
  {
    name: "manu fernandes",
    role: "estratégia de comunicação",
    image: "/imagens/team/manu.jpeg",
    links: [{ type: "instagram", url: "https://www.instagram.com/manu_fernds/" }],
  },
  {
    name: "thayná julia",
    role: "design de site + marcas",
    image: "/imagens/team/thayná julia.png",
    links: [
      { type: "instagram", url: "https://www.instagram.com/wocria" },
      { type: "site", url: "https://wocria.com.br/links" },
      { type: "linkedin", url: "https://www.linkedin.com/in/thaynajulia/" },
    ],
  },
  {
    name: "marcia breda",
    role: "marketing",
    image: "/imagens/team/marcia.jpeg",
    links: [
      { type: "site", url: "https://marciabreda.com.br/" },
      { type: "instagram", url: "https://www.instagram.com/marciabreda/" },
    ],
  },
  {
    name: "gabi pompílio",
    role: "integrações e automações",
    image: "/imagens/team/gabi-pompilio.jpg",
    links: [{ type: "instagram", url: "https://www.instagram.com/gabipompilio/" }],
  },
  {
    name: "day dias",
    role: "planejamento estratégico",
    image: "/imagens/team/day dias.jpeg",
    links: [
      { type: "instagram", url: "https://www.instagram.com/daydias.com.br/" },
      { type: "linkedin", url: "https://www.linkedin.com/in/dayane-dias-94a2573b/" },
    ],
  },
  {
    name: "mari pelli",
    role: "comunidade",
    image: "/imagens/team/mari pelli.jpeg",
    links: [{ type: "site", url: "https://maripelli.substack.com/" }],
  },
];

const timeline: TimelineItem[] = [
  { year: "2001", title: "o começo", text: "início do trabalho com autoexpressão e construção de narrativas através da moda." },
  { year: "2003", title: "oficina de estilo", text: "criação e direção da Oficina de Estilo, empresa pioneira em consultoria de imagem no Brasil, com mais de 300 clientes individuais atendidos entre 2003 e 2017." },
  { year: "2006—2017", title: "uma conversa que cresce", text: "mais de 300.000 mulheres alcançadas por newsletter, blog, YouTube, Instagram e Twitter." },
  { year: "2007", title: "primeira cobertura", text: "participação no projeto de primeira cobertura oficial de blogs numa SPFW." },
  { year: "2009", title: "personal shopper", text: "implementação do primeiro serviço de personal shoppers do país, no Shopping Cidade Jardim, em São Paulo." },
  { year: "2010—2013", title: "a internet na palma", text: "smartphones chegam em massa ao Brasil e mudam a forma como todo mundo acessa a internet." },
  { year: "2013", title: "vista quem você é", text: "publicação do primeiro livro." },
  { year: "2014—2017", title: "mais quatro livros", text: "publicação de Como construir um guarda-roupa inteligente, Substitua consumo por autoestima e O guia das doações." },
  { year: "2015—2017", title: "cooperativa_ODE", text: "idealização e condução de um espaço colaborativo com mais de 150 personal stylists, compartilhando ideias, processos e experiências para um aperfeiçoamento coletivo contínuo." },
  { year: "2013—2017", title: "formação em movimento", text: "mais de 400 consultoras de imagem formadas com metodologia autoral, além de palestras e treinamentos para SENAI, Luxottica, Johnson & Johnson, Danone, Oi, Novartis, Senac e mais." },
  { year: "2018", title: "identidade & presença online", text: "início das turmas com foco em autoconhecimento, planejamento e expressão autêntica." },
  { year: "2018", title: "uma prática compartilhada", text: "mais de 80 turmas e 300 participantes experimentando práticas, técnicas e estratégias de comunicação pessoal." },
  { year: "2021", title: "ante_sala", text: "criação da comunidade: um espaço de conexões e potenciais colaborações com mais de 300 integrantes, curadoria de conteúdos e encontros mensais." },
  { year: "2023", title: "gente > internet", text: "lançamento do livro na Flip — Festa Literária Internacional de Paraty, abrindo o eixo de pensamento que hoje fundamenta a Escola de Si." },
  { year: "2025", title: "escola de si", text: "idealização e construção da escola, com consolidação da metodologia como campo de pesquisa viva sobre comunicação, identidade e trabalho." },
];

export default function SobrePage() {
  return (
    <main className="sobre-page">
      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="Escoladesi - início">
          <Image src="/logo-escola-de-si-1.png" alt="Escoladesi" width={872} height={148} priority />
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="/">home</Link><Link aria-current="page" href="/sobre">sobre</Link><Link href="/#agenda">agenda</Link><Link href="/#pesquisa">pesquisa</Link><Link href="/sob-medida">sob medida</Link><Link href="/metodologia">metodologia</Link><Link href="/#novidades">news</Link>
        </nav>
        <Link className="menu-link" href="/#contato">contato</Link>
        <MobileMenu activeLabel="sobre" />
      </header>

      <section className="sobre-hero" aria-labelledby="sobre-title">
        <div className="sobre-intro-content">
          <h1 id="sobre-title">saber de si pra falar de si, de dentro pra fora </h1>
          <p className="sobre-intro">a escola de si parte da <strong>identidade</strong> como essência, estrutura <strong>ferramentas</strong> pra ação e fortalece <strong>relacionamentos</strong> significativos e tem a <strong>prática</strong> como caminho de aprendizagem; <strong>tudo com o olhar humano, criativo e cuidadoso</strong> de quem vive o que ensina e ensina o que vive.</p>
          <div className="sobre-cards">
            <article className="sobre-card blue"><h2>saber de si_</h2><p>é investigar identidade: quem somos, qual o tom do texto que nos traduz, nossa imagem, linguagem visual e os temas sobre os quais queremos conversar.</p></article>
            <article className="sobre-card peach"><h2>conhecer as ferramentas_</h2><p>é aprender, e também questionar, as metodologias, formatos e canais de comunicação pessoal que fazem sentido ocupar, entendendo potencialidades e delineando métricas de sucesso particulares e individuais.</p></article>
            <article className="sobre-card yellow"><h2>falar de si_</h2><p>é praticar uma comunicação de gente pra gente, com escuta e atenção, nutrindo não só resultados, mas o sentimento de troca honesta que nos conecta a outras pessoas de forma real.</p></article>
          </div>
          <p className="sobre-cycle">no centro de nossa metodologia há <strong>um ciclo contínuo de prática e consciência,</strong> mirando na consistência que só é possível quando substituímos o cansaço da performance pelo contentamento da autoexpressão autêntica.</p>
        </div>
      </section>
      <section className="team-gallery" aria-label="Equipe da Escoladesi">
        <h2>quem somos</h2>
        <TeamCarousel team={team} />
      </section>
      <section className="trajectory" aria-labelledby="trajectory-title">
        <div className="trajectory-intro">
          <h2 id="trajectory-title">trajetória</h2>
          <p className="trajectory-lead">deslize pelos marcos que transformaram experiência em método, e método em uma escola viva.</p>
        </div>
        <TimelineCarousel items={timeline} />
      </section>
      <section className="seasonal-banner" aria-label="Programação sazonal">
        <h2>nossa programação é sazonal: <strong>um convite pra viver e aprender conforme o tempo e o ritmo da vida.</strong></h2>
        <Link href="/#agenda">ver próximas atividades <span>↗</span></Link>
      </section>
      <SiteFooter />
    </main>
  );
}
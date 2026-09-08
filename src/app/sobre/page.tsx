import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import MobileMenu from "../mobile-menu";
import SiteFooter from "../site-footer";

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

const teamLinkIcon = { instagram: FaInstagram, linkedin: FaLinkedinIn, site: Globe };

export default function SobrePage() {
  return (
    <main className="sobre-page">
      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="Escoladesi - início">
          <Image src="/logo-escola-de-si-1.png" alt="Escoladesi" width={872} height={148} priority />
        </Link>
        <nav aria-label="Navegação principal">
          <Link href="/">home</Link><Link aria-current="page" href="/sobre">sobre</Link><Link href="/#agenda">agenda</Link><Link href="/#pesquisa">pesquisa</Link><Link href="/sob-medida">sob medida</Link><Link href="/#metodologia">metodologia</Link><Link href="/#novidades">news</Link>
        </nav>
        <Link className="menu-link" href="/#contato">contato</Link>
        <MobileMenu activeLabel="sobre" />
      </header>

      <section className="sobre-hero" aria-labelledby="sobre-title">
        <div className="sobre-intro-content">
          <h1 id="sobre-title">saber de si<br /><strong>pra falar de si, de dentro pra fora</strong></h1>
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
        <div className="team-grid">
          {team.map((member) => (
            <article className="team-card" key={member.name}>
              <Image alt={member.name} className="team-photo" height={400} src={encodeURI(member.image)} width={300} />
              <div className="team-card-body">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                {member.links.length > 0 && (
                  <div className="team-links">
                    {member.links.map((link) => {
                      const Icon = teamLinkIcon[link.type];
                      return (
                        <a aria-label={`${member.name} - ${link.type}`} href={link.url} key={link.url} rel="noopener noreferrer" target="_blank">
                          <Icon aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="seasonal-banner" aria-label="Programação sazonal">
        <h2>nossa programação é sazonal: <strong>um convite pra viver e aprender conforme o tempo e o ritmo da vida.</strong></h2>
      </section>
      <SiteFooter />
    </main>
  );
}
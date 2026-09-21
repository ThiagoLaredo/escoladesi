import { createClient } from "contentful";

export type ProgramColor = "blue" | "peach" | "yellow";

export type Program = {
  name: string;
  subtituloDoCard?: string;
  description: string;
  color: ProgramColor;
  href: string;
};

export type ActivityContentCard = {
  titulo: string;
  texto: string;
};

export type ActivityPerson = {
  nome: string;
  fotoUrl?: string;
  bio?: string;
  linkedin?: string;
  instagram?: string;
};

export type TeamLink = { type: "instagram" | "linkedin" | "site"; url: string };

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio?: string;
  links: TeamLink[];
};

export type NewsArticle = {
  slug: string;
  title: string;
  imageUrl?: string;
  date: string;
  description: string;
  content: string;
};

export type Testimonial = {
  quote: string;
  author: string;
};

export type PartnerLogo = {
  title: string;
  url: string;
};

export type ActivityPage = {
  nomeDaPagina: string;
  slug: string;
  formato?: string;
  titulo: string;
  preco?: string;
  introducao?: string;
  imagemHeroUrl?: string;
  linkInscricao?: string;
  comQuem?: ActivityPerson;
  datas?: string;
  horario?: string;
  informacoesProgramacao?: string;
  praQuem: string[];
  comoE: ActivityContentCard[];
  aoLongoDaOficina: string[];
  porQueEssaOficinaExiste: ActivityContentCard[];
  oQueVoceLeva: string[];
  politicaCancelamento?: string;
  textoDuvidas?: string;
  emailContato?: string;
  seoTitulo?: string;
  seoDescricao?: string;
};

type ContentfulProgramFields = {
  name?: string;
  description?: string;
  color?: ProgramColor;
  href?: string;
};

type ContentfulAssetFields = {
  title?: string;
  file?: {
    url?: string;
  };
};

type ContentfulAsset = {
  fields?: ContentfulAssetFields;
};

type ContentfulPessoaFields = {
  nome?: string;
  foto?: ContentfulAsset;
  bio?: string;
  linkedin?: string;
  linkedIn?: string;
  instagram?: string;
  site?: string;
  role?: string;
};

type ContentfulConteudoFields = {
  titulo?: string;
  texto?: string;
};

type ContentfulEntry<TFields> = {
  fields: TFields;
};

type ContentfulSys = {
  id: string;
};

type ContentfulEntryWithSys<TFields> = {
  fields: TFields;
  sys: ContentfulSys;
};

type ContentfulPaginaDeAtividadeFields = {
  nomeDaPagina?: string;
  nomeDaPgina?: string;
  slug?: string;
  formato?: string;
  titulo?: string;
  subtituloDoCard?: string;
  preco?: string;
  introducao?: string;
  imagemHero?: ContentfulAsset;
  imagemDoHero?: ContentfulAsset;
  linkInscricao?: string;
  comQuem?: ContentfulEntry<ContentfulPessoaFields> | ContentfulPessoaFields;
  datas?: string;
  horario?: string;
  horarios?: string;
  informacoesProgramacao?: string;
  praQuem?: string | string[];
  comoE?: Array<ContentfulEntry<ContentfulConteudoFields>>;
  aoLongoDaOficina?: string | string[];
  porQueEssaOficinaExiste?: Array<ContentfulEntry<ContentfulConteudoFields>>;
  oQueVoceLeva?: string | string[];
  politicaCancelamento?: string;
  textoDuvidas?: string;
  emailContato?: string;
  seoTitulo?: string;
  seoDescricao?: string;
};

type ContentfulRichTextNode = {
  content?: ContentfulRichTextNode[];
  nodeType?: string;
  value?: string;
};

type ContentfulNewsFields = {
  data?: string;
  imagemNews?: ContentfulAsset;
  textoNews?: string | ContentfulRichTextNode;
  tituloNews?: string;
};

type ContentfulTestimonialFields = {
  nomeDepoimento?: string;
  textoDepoimento?: string | ContentfulRichTextNode;
};

type ContentfulPartnerLogosFields = {
  logosClientes?: ContentfulAsset[];
};

const activityContentTypeIds = ["paginaDeAtividade", "pginaDeAtividade"] as const;
const newsContentTypeIds = ["news", "noticia", "noticias"] as const;
const testimonialContentTypeIds = ["depoimento", "depoimentos", "testimonial", "testimonials"] as const;

const fallbackPrograms: Program[] = [
  { name: "grupo\n_de estudo", description: "encontros mensais pra conhecer gente interessante e seus jeitos de organizar a vida, o trabalho e sua comunicação.", color: "blue", href: "/grupo-de-estudo" },
  { name: "oficina\nfalar _de si", description: "uma oficina online prática pra escrever, revisar e experimentar apresentações que façam sentido.", color: "peach", href: "/falar-da-gente-mesma" },
  { name: "vender sem\nse vender_", description: "uma aula online prática e também reflexiva sobre comunicar o que você faz de um jeito interessante, confiável e humano.", color: "blue", href: "#contato" },
  { name: "escola\n_offline", description: "uma vivência que vira repertório e que pode sacudir nossas práticas de comunicação SIM!", color: "yellow", href: "#contato" },
];

const CONTENTFUL_SPACE_ID_KEY = "CONTENTFUL_SPACE_ID";
const CONTENTFUL_ACCESS_TOKEN_KEY = "CONTENTFUL_ACCESS_TOKEN";

const contentfulSpaceId = process.env[CONTENTFUL_SPACE_ID_KEY];
const contentfulAccessToken = process.env[CONTENTFUL_ACCESS_TOKEN_KEY];

const contentfulClient = contentfulSpaceId && contentfulAccessToken
  ? createClient({
    accessToken: contentfulAccessToken,
    space: contentfulSpaceId,
  })
  : null;

const programColors: ProgramColor[] = ["blue", "peach", "yellow"];

function pickProgramColor(index: number): ProgramColor {
  return programColors[index % programColors.length];
}

export async function getPrograms(): Promise<Program[]> {
  if (!contentfulClient) return fallbackPrograms;

  for (const contentTypeId of activityContentTypeIds) {
    try {
      const response = await contentfulClient.getEntries({
        content_type: contentTypeId,
        limit: 100,
        include: 2,
      });

      const programsFromActivities = response.items.flatMap((item, index) => {
        const fields = item.fields as unknown as ContentfulPaginaDeAtividadeFields;
        const nome = fields.titulo?.trim();
        const slug = fields.slug?.trim();
        if (!nome || !slug) return [];

        const descriptionSource = fields.introducao?.trim() || fields.informacoesProgramacao?.trim();
        if (!descriptionSource) return [];

        return [{
          color: pickProgramColor(index),
          description: descriptionSource,
          href: `/${normalizeSlugValue(slug)}`,
          name: nome,
          subtituloDoCard: fields.subtituloDoCard?.trim() || undefined,
        }];
      });

      if (programsFromActivities.length > 0) return programsFromActivities;
    } catch {
      continue;
    }
  }

  try {
    const response = await contentfulClient.getEntries({ content_type: "program" });
    const programs = response.items.flatMap((entry) => {
      const fields = entry.fields as unknown as ContentfulProgramFields;
      if (!fields.name || !fields.description || !fields.href) return [];

      return [{
        color: fields.color ?? "blue",
        description: fields.description,
        href: fields.href,
        name: fields.name,
      }];
    });

    return programs.length > 0 ? programs : fallbackPrograms;
  } catch {
    return fallbackPrograms;
  }
}

function toAssetUrl(asset?: ContentfulAsset): string | undefined {
  const url = asset?.fields?.file?.url;
  if (!url) return undefined;
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

function normalizeList(value?: string | string[]): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((item) => item.trim()).filter(Boolean);

  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeContentCards(
  entries?: Array<ContentfulEntry<ContentfulConteudoFields>>,
): ActivityContentCard[] {
  if (!entries) return [];

  return entries.flatMap((entry) => {
    const titulo = entry.fields?.titulo?.trim();
    const texto = entry.fields?.texto?.trim();
    if (!titulo || !texto) return [];
    return [{ titulo, texto }];
  });
}

function normalizePerson(entry?: ContentfulEntry<ContentfulPessoaFields> | ContentfulPessoaFields): ActivityPerson | undefined {
  const fields = entry && 'fields' in entry ? entry.fields : entry;
  if (!fields) return undefined;

  const nome = fields?.nome?.trim();
  if (!nome) return undefined;

  return {
    nome,
    fotoUrl: toAssetUrl(fields.foto),
    bio: fields.bio?.trim(),
    instagram: fields.instagram?.trim(),
    linkedin: (fields.linkedin || fields.linkedIn)?.trim(),
  };
}

function normalizeSlugValue(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function collectRichTextValue(node?: ContentfulRichTextNode): string {
  if (!node) return "";
  if (typeof node.value === "string") return node.value;

  return (node.content ?? []).map((child) => collectRichTextValue(child)).join("");
}

function normalizeLongText(value?: string | ContentfulRichTextNode): string {
  if (!value) return "";
  if (typeof value === "string") return value.trim();

  const paragraphs = (value.content ?? [])
    .map((node) => {
      const text = collectRichTextValue(node).trim();
      return text;
    })
    .filter(Boolean);

  return paragraphs.join("\n\n");
}

function splitTextParagraphs(value?: string): string[] {
  if (!value) return [];

  return value
    .split(/\r?\n\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function buildNewsDescription(content: string): string {
  const firstParagraph = splitTextParagraphs(content)[0] ?? content;
  const compact = firstParagraph.replace(/\s+/g, " ").trim();
  if (compact.length <= 180) return compact;
  return `${compact.slice(0, 177).trimEnd()}...`;
}

function mapNewsEntry(
  entry: ContentfulEntryWithSys<ContentfulNewsFields>,
  usedSlugs: Set<string>,
): NewsArticle | null {
  const title = entry.fields.tituloNews?.trim();
  const date = entry.fields.data?.trim();
  const content = normalizeLongText(entry.fields.textoNews);
  if (!title || !date || !content) return null;

  const baseSlug = normalizeSlugValue(title);
  if (!baseSlug) return null;

  const slug = usedSlugs.has(baseSlug)
    ? `${baseSlug}-${entry.sys.id.slice(-6).toLowerCase()}`
    : baseSlug;

  usedSlugs.add(slug);

  return {
    content,
    date,
    description: buildNewsDescription(content),
    imageUrl: toAssetUrl(entry.fields.imagemNews),
    slug,
    title,
  };
}

function sortNewsArticles(items: NewsArticle[]): NewsArticle[] {
  return [...items].sort((left, right) => {
    const leftTime = Number.isNaN(Date.parse(left.date)) ? 0 : Date.parse(left.date);
    const rightTime = Number.isNaN(Date.parse(right.date)) ? 0 : Date.parse(right.date);
    return rightTime - leftTime;
  });
}

function mapTestimonialEntry(entry: ContentfulEntry<ContentfulTestimonialFields>): Testimonial | null {
  const quote = normalizeLongText(entry.fields.textoDepoimento);
  const author = entry.fields.nomeDepoimento?.trim();
  if (!quote || !author) return null;

  return { author, quote };
}

function mapPartnerLogosEntry(entry: ContentfulEntry<ContentfulPartnerLogosFields>): PartnerLogo[] {
  const assets = entry.fields.logosClientes;
  if (!assets || assets.length === 0) return [];

  return assets.flatMap((asset, index) => {
    const url = toAssetUrl(asset);
    if (!url) return [];
    const title = asset.fields?.title?.trim();

    return [{
      title: title || `logo cliente ${index + 1}`,
      url,
    }];
  });
}

async function fetchNewsEntriesByContentType(contentTypeId: string): Promise<ContentfulEntryWithSys<ContentfulNewsFields>[]> {
  if (!contentfulClient) return [];

  try {
    const response = await contentfulClient.getEntries({
      content_type: contentTypeId,
      include: 2,
      limit: 100,
    });

    return response.items as Array<ContentfulEntryWithSys<ContentfulNewsFields>>;
  } catch {
    return [];
  }
}

async function fetchFallbackNewsEntries(): Promise<ContentfulEntryWithSys<ContentfulNewsFields>[]> {
  if (!contentfulClient) return [];

  try {
    const response = await contentfulClient.getEntries({
      include: 2,
      limit: 200,
    });

    return (response.items as Array<ContentfulEntryWithSys<ContentfulNewsFields>>).filter((item) => {
      const fields = item.fields;
      return Boolean(fields?.tituloNews && fields?.textoNews && fields?.data);
    });
  } catch {
    return [];
  }
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  if (!contentfulClient) return [];

  const usedSlugs = new Set<string>();

  for (const contentTypeId of newsContentTypeIds) {
    const entries = await fetchNewsEntriesByContentType(contentTypeId);
    if (entries.length === 0) continue;

    const items = entries
      .map((entry) => mapNewsEntry(entry, usedSlugs))
      .filter((entry): entry is NewsArticle => entry !== null);

    if (items.length > 0) return sortNewsArticles(items);
  }

  const fallbackEntries = await fetchFallbackNewsEntries();
  return sortNewsArticles(
    fallbackEntries
      .map((entry) => mapNewsEntry(entry, usedSlugs))
      .filter((entry): entry is NewsArticle => entry !== null),
  );
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const items = await getNewsArticles();
  return items.find((item) => item.slug === slug) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!contentfulClient) return [];

  for (const contentTypeId of testimonialContentTypeIds) {
    try {
      const response = await contentfulClient.getEntries({
        content_type: contentTypeId,
        include: 2,
        limit: 100,
      });

      const testimonials = response.items
        .map((item) => mapTestimonialEntry(item as ContentfulEntry<ContentfulTestimonialFields>))
        .filter((item): item is Testimonial => item !== null);

      if (testimonials.length > 0) return testimonials;
    } catch {
      continue;
    }
  }

  try {
    const response = await contentfulClient.getEntries({
      include: 2,
      limit: 200,
    });

    const testimonials = response.items
      .filter((item) => {
        const fields = item.fields as ContentfulTestimonialFields;
        return Boolean(fields?.textoDepoimento && fields?.nomeDepoimento);
      })
      .map((item) => mapTestimonialEntry(item as ContentfulEntry<ContentfulTestimonialFields>))
      .filter((item): item is Testimonial => item !== null);

    return testimonials;
  } catch {
    return [];
  }
}

export async function getPartnerLogos(): Promise<PartnerLogo[]> {
  if (!contentfulClient) return [];

  try {
    const response = await contentfulClient.getEntries({
      include: 2,
      limit: 200,
    });

    for (const item of response.items) {
      const logos = mapPartnerLogosEntry(item as ContentfulEntry<ContentfulPartnerLogosFields>);
      if (logos.length > 0) return logos;
    }

    return [];
  } catch {
    return [];
  }
}

export async function getActivityPageBySlug(slug: string): Promise<ActivityPage | null> {
  if (!contentfulClient) return null;

  const normalizedSlug = normalizeSlugValue(slug);

  for (const contentTypeId of activityContentTypeIds) {
    try {
      const response = await contentfulClient.getEntries({
        content_type: contentTypeId,
        limit: 100,
        include: 2,
      });

      const page = response.items
        .map((item) => mapActivityEntryToPage(item.fields as unknown as ContentfulPaginaDeAtividadeFields))
        .find((entry) => entry !== null && normalizeSlugValue(entry.slug) === normalizedSlug);

      if (page) return page;
    } catch {
      continue;
    }
  }

  return null;
}

export async function getAllActivityPages(): Promise<ActivityPage[]> {
  if (!contentfulClient) return [];

  const pages: ActivityPage[] = [];

  for (const contentTypeId of activityContentTypeIds) {
    try {
      const response = await contentfulClient.getEntries({
        content_type: contentTypeId,
        limit: 100,
        include: 2,
      });

      for (const item of response.items) {
        const page = mapActivityEntryToPage(item.fields as unknown as ContentfulPaginaDeAtividadeFields);
        if (page) pages.push(page);
      }
    } catch {
      continue;
    }
  }

  return pages;
}

function mapActivityEntryToPage(fields: ContentfulPaginaDeAtividadeFields): ActivityPage | null {
  const nomeDaPagina = (fields.nomeDaPagina ?? fields.nomeDaPgina)?.trim();
  const slug = fields.slug?.trim();
  const titulo = fields.titulo?.trim();
  if (!nomeDaPagina || !slug || !titulo) return null;

  return {
    nomeDaPagina,
    slug,
    formato: fields.formato?.trim(),
    titulo,
    preco: fields.preco?.trim(),
    introducao: fields.introducao?.trim(),
    imagemHeroUrl: toAssetUrl(fields.imagemHero ?? fields.imagemDoHero),
    linkInscricao: fields.linkInscricao?.trim(),
    comQuem: normalizePerson(fields.comQuem),
    datas: fields.datas?.trim(),
    horario: fields.horario ?? fields.horarios?.trim(),
    informacoesProgramacao: fields.informacoesProgramacao?.trim(),
    praQuem: normalizeList(fields.praQuem),
    comoE: normalizeContentCards(fields.comoE),
    aoLongoDaOficina: normalizeList(fields.aoLongoDaOficina),
    porQueEssaOficinaExiste: normalizeContentCards(fields.porQueEssaOficinaExiste),
    oQueVoceLeva: normalizeList(fields.oQueVoceLeva),
    politicaCancelamento: fields.politicaCancelamento?.trim(),
    textoDuvidas: fields.textoDuvidas?.trim(),
    emailContato: fields.emailContato?.trim(),
    seoTitulo: fields.seoTitulo?.trim(),
    seoDescricao: fields.seoDescricao?.trim(),
  };
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!contentfulClient) return [];

  try {
    const response = await contentfulClient.getEntries({
      content_type: "pessoa",
      limit: 100,
      include: 1,
      order: ['sys.createdAt'],
    });

    const teamMembers = response.items.flatMap((item) => {
      const fields = item.fields as unknown as ContentfulPessoaFields;
      const nome = fields.nome?.trim();
      const role = fields.role?.trim();
      const bio = fields.bio?.trim();
      const imageUrl = toAssetUrl(fields.foto);

      if (!nome || !imageUrl) return [];

      const links: TeamLink[] = [];
      if (fields.instagram) links.push({ type: "instagram", url: fields.instagram.trim() });
      if (fields.linkedin || fields.linkedIn) links.push({ type: "linkedin", url: (fields.linkedin || fields.linkedIn)!.trim() });
      if (fields.site) links.push({ type: "site", url: fields.site.trim() });

      return [{
        name: nome,
        role: role || "",
        image: imageUrl,
        bio: bio || undefined,
        links,
      }];
    });

    return teamMembers;
  } catch {
    return [];
  }
}
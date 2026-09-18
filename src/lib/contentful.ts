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

const activityContentTypeIds = ["paginaDeAtividade", "pginaDeAtividade"] as const;

const fallbackPrograms: Program[] = [
  { name: "grupo\n_de estudo", description: "encontros mensais pra conhecer gente interessante e seus jeitos de organizar a vida, o trabalho e sua comunicação.", color: "blue", href: "/grupo-de-estudo" },
  { name: "oficina\nfalar _de si", description: "uma oficina online prática pra escrever, revisar e experimentar apresentações que façam sentido.", color: "peach", href: "/falar-da-gente-mesma" },
  { name: "vender sem\nse vender_", description: "uma aula online prática e também reflexiva sobre comunicar o que você faz de um jeito interessante, confiável e humano.", color: "blue", href: "#contato" },
  { name: "escola\n_offline", description: "uma vivência que vira repertório e que pode sacudir nossas práticas de comunicação SIM!", color: "yellow", href: "#contato" },
];

const contentfulClient = process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN
  ? createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID,
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
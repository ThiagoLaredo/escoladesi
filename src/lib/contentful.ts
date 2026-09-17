import { createClient } from "contentful";

export type ProgramColor = "blue" | "peach" | "yellow";

export type Program = {
  name: string;
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
  instagram?: string;
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
  preco?: string;
  introducao?: string;
  imagemHero?: ContentfulAsset;
  imagemDoHero?: ContentfulAsset;
  linkInscricao?: string;
  comQuem?: ContentfulEntry<ContentfulPessoaFields>;
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

function normalizePerson(entry?: ContentfulEntry<ContentfulPessoaFields>): ActivityPerson | undefined {
  const fields = entry?.fields;
  if (!fields) return undefined;

  const nome = fields?.nome?.trim();
  if (!nome) return undefined;

  return {
    nome,
    fotoUrl: toAssetUrl(fields.foto),
    bio: fields.bio?.trim(),
    instagram: fields.instagram?.trim(),
    linkedin: fields.linkedin?.trim(),
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

function mapActivityEntryToPage(fields: ContentfulPaginaDeAtividadeFields): ActivityPage | null {
  const nomeDaPagina = (fields.nomeDaPagina ?? fields.nomeDaPgina)?.trim();
  const slug = fields.slug?.trim();
  const titulo = fields.titulo?.trim();
  if (!nomeDaPagina || !slug || !titulo) return null;

  return {
    aoLongoDaOficina: normalizeList(fields.aoLongoDaOficina),
    comQuem: normalizePerson(fields.comQuem),
    comoE: normalizeContentCards(fields.comoE),
    datas: fields.datas?.trim(),
    emailContato: fields.emailContato?.trim(),
    formato: fields.formato?.trim(),
    imagemHeroUrl: toAssetUrl(fields.imagemHero ?? fields.imagemDoHero),
    informacoesProgramacao: fields.informacoesProgramacao?.trim(),
    introducao: fields.introducao?.trim(),
    linkInscricao: fields.linkInscricao?.trim(),
    nomeDaPagina,
    oQueVoceLeva: normalizeList(fields.oQueVoceLeva),
    politicaCancelamento: fields.politicaCancelamento?.trim(),
    porQueEssaOficinaExiste: normalizeContentCards(fields.porQueEssaOficinaExiste),
    praQuem: normalizeList(fields.praQuem),
    preco: fields.preco?.trim(),
    horario: (fields.horario ?? fields.horarios)?.trim(),
    seoDescricao: fields.seoDescricao?.trim(),
    seoTitulo: fields.seoTitulo?.trim(),
    slug,
    textoDuvidas: fields.textoDuvidas?.trim(),
    titulo,
  };
}

export async function getActivityPageBySlug(slug: string): Promise<ActivityPage | null> {
  if (!contentfulClient) return null;

  const normalizedSlug = normalizeSlugValue(slug);

  for (const contentTypeId of activityContentTypeIds) {
    try {
      const response = await contentfulClient.getEntries({
        content_type: contentTypeId,
        include: 2,
        limit: 100,
      });

      const matchedEntry = response.items.find((item) => {
        const fields = item.fields as unknown as ContentfulPaginaDeAtividadeFields;
        if (!fields?.slug) return false;
        return normalizeSlugValue(fields.slug) === normalizedSlug;
      }) as unknown as ContentfulEntry<ContentfulPaginaDeAtividadeFields> | undefined;

      if (!matchedEntry) continue;

      return mapActivityEntryToPage(matchedEntry.fields);
    } catch {
      continue;
    }
  }

  return null;
}
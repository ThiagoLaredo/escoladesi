import { createClient } from "contentful";

export type ProgramColor = "blue" | "peach" | "yellow";

export type Program = {
  name: string;
  description: string;
  color: ProgramColor;
  href: string;
};

type ContentfulProgramFields = {
  name?: string;
  description?: string;
  color?: ProgramColor;
  href?: string;
};

const fallbackPrograms: Program[] = [
  { name: "grupo\n_de estudo", description: "encontros mensais pra conhecer gente interessante e seus jeitos de organizar a vida, o trabalho e sua comunicação.", color: "blue", href: "/atividades/grupo-de-estudo" },
  { name: "oficina\nfalar _de si", description: "uma oficina online prática pra escrever, revisar e experimentar apresentações que façam sentido.", color: "peach", href: "/atividades/falar-de-si" },
  { name: "vender sem\nse vender_", description: "uma aula online prática e também reflexiva sobre comunicar o que você faz de um jeito interessante, confiável e humano.", color: "blue", href: "#contato" },
  { name: "escola\n_offline", description: "uma vivência que vira repertório e que pode sacudir nossas práticas de comunicação SIM!", color: "yellow", href: "#contato" },
];

const contentfulClient = process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN
  ? createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID,
  })
  : null;

export async function getPrograms(): Promise<Program[]> {
  if (!contentfulClient) return fallbackPrograms;

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
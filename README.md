# Escoladesi

Site institucional da Escoladesi, construido com Next.js e React.

## Comecar

1. Execute `npm install`.
2. Execute `npm run dev`.
3. Acesse `http://localhost:3000`.

## Contentful

O site busca os cards da agenda no Contentful e usa o conteúdo local como fallback enquanto o CMS não estiver configurado.

1. Copie `.env.example` para `.env.local`.
2. Preencha `CONTENTFUL_SPACE_ID` e `CONTENTFUL_ACCESS_TOKEN` com um token de API de entrega do Contentful.
3. No Contentful, crie o content type `program` com estes campos:
	- `name`: Short text. Use `\\n` para separar linhas do título.
	- `description`: Long text.
	- `color`: Short text. Valores aceitos: `blue`, `peach` ou `yellow`.
	- `href`: Short text, com a URL ou âncora do programa.
4. Publique as entradas. O conteúdo publicado aparecerá na agenda após recarregar o site.

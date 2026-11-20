import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const buildDate = new Date();

/**
 * Categorias sin ninguna ficha publicada. Su pagina se sirve con noindex, asi
 * que tampoco puede anunciarse en el sitemap: seria una senal contradictoria.
 * Se deriva del frontmatter de src/content/inflables para que no haya que
 * mantener una lista a mano.
 */
const CATEGORIA_SLUG = { castillos: "castillos-inflables", toboganes: "toboganes-acuaticos", pistas: "pistas-obstaculos", interactivos: "juegos-interactivos" };
const categoriasConFicha = new Set(
  readdirSync("./src/content/inflables", { withFileTypes: true })
    .filter(entry => entry.isFile() && /\.mdx?$/.test(entry.name))
    .map(entry => readFileSync(join("./src/content/inflables", entry.name), "utf8").match(/^categoria:\s*"([^"]+)"/m)?.[1])
    .filter(Boolean)
);
const rutasVacias = new Set(
  Object.entries(CATEGORIA_SLUG)
    .filter(([key]) => !categoriasConFicha.has(key))
    .map(([, slug]) => `/inflables/${slug}/`)
);
const blogLastmod = new Map(
  readdirSync("./src/content/blog", { withFileTypes: true })
    .filter(entry => entry.isFile() && /\.mdx?$/.test(entry.name))
    .map(entry => {
      const source = readFileSync(join("./src/content/blog", entry.name), "utf8");
      const pubDate = source.match(/^pubDate:\s*(\d{4}-\d{2}-\d{2})\s*$/m)?.[1];
      const slug = entry.name.replace(/\.mdx?$/, "");
      return [`/blog/${slug}/`, pubDate ? new Date(`${pubDate}T00:00:00.000Z`).toISOString() : buildDate.toISOString()];
    })
);

export default defineConfig({
  site: "https://inflablee.com",
  integrations: [
    mdx(),
    sitemap({
      lastmod: buildDate,
      filter: url => !rutasVacias.has(new URL(url).pathname),
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        return { ...item, lastmod: blogLastmod.get(pathname) ?? buildDate.toISOString() };
      },
    }),
  ],
});

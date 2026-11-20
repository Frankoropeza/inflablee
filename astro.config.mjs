import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const buildDate = new Date();
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
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        return { ...item, lastmod: blogLastmod.get(pathname) ?? buildDate.toISOString() };
      },
    }),
  ],
});

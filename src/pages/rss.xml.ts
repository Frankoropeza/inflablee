import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "@/data/site";

const escapeXml = (value: string) => value.replace(/[&<>\"]/g, character => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
})[character] ?? character);

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog"))
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const items = posts.map(post => {
    const url = new URL(`/blog/${post.id}/`, SITE.url).href;
    return `    <item>\n      <title>${escapeXml(post.data.title)}</title>\n      <description>${escapeXml(post.data.description)}</description>\n      <link>${escapeXml(url)}</link>\n      <guid isPermaLink="true">${escapeXml(url)}</guid>\n      <pubDate>${escapeXml(post.data.pubDate.toUTCString())}</pubDate>\n    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${escapeXml(SITE.name)}</title>\n    <description>${escapeXml(SITE.description)}</description>\n    <link>${escapeXml(SITE.url)}</link>\n    <language>es-MX</language>\n${items}\n  </channel>\n</rss>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};

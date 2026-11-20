import type { APIRoute } from "astro";
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\nSitemap: https://inflablee.com/sitemap-index.xml\n# Feed: https://inflablee.com/rss.xml`);

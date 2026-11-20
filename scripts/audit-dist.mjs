import { access, readdir, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const SITE_ORIGIN = "https://inflablee.com";
const EXPECTED_PRICES = [1400, 1600, 1600, 1600, 1800, 2300, 2500, 2600].sort((a, b) => a - b);
const FORBIDDEN_MARKER = /\b[0-9]+\+?\s?(empresas|cursos|municipios|clientes|proyectos|eventos|modelos|tipos|alcaldías|familias|años de experiencia)\b/giu;
const RETIRED_PROMISES = ["seguro de responsabilidad", "supervisor certificado", "0 accidentes", "cero accidentes", "desde $800", "anticipo del 30"];

const distDirectory = path.resolve(process.argv[2] ?? "dist");

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  }));
  return files.flat();
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return match ? (match[1] ?? match[2] ?? match[3] ?? "") : null;
}

function textContent(fragment) {
  return fragment.replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim();
}

function routeForFile(file) {
  const relative = path.relative(distDirectory, file).split(path.sep).join("/");
  if (relative === "index.html") return "/";
  if (relative === "404.html") return "/404/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"index.html".length)}`;
  return `/${relative}`;
}

function safePath(relativePath) {
  const candidate = path.resolve(distDirectory, relativePath);
  return candidate === distDirectory || candidate.startsWith(`${distDirectory}${path.sep}`) ? candidate : null;
}

async function exists(file) {
  try {
    await access(file, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function destinationExists(href, sourceRoute) {
  let url;
  try {
    url = new URL(href, `${SITE_ORIGIN}${sourceRoute}`);
  } catch {
    return false;
  }
  if (url.origin !== SITE_ORIGIN) return true;

  const pathname = decodeURIComponent(url.pathname);
  const relative = pathname.replace(/^\/+/, "");
  const direct = safePath(relative);
  if (!direct) return false;
  if (await exists(direct)) return true;
  if (pathname.endsWith("/")) return exists(safePath(path.join(relative, "index.html")) ?? "");
  if (!path.extname(relative)) return exists(safePath(path.join(relative, "index.html")) ?? "");
  return false;
}

function report(rule, failures) {
  if (failures.length === 0) {
    console.log(`${rule}: OK`);
    return 0;
  }
  console.log(`${rule}: FALLO — ${failures.join(" | ")}`);
  return failures.length;
}

function schemaEntities(value, prohibited, location) {
  if (Array.isArray(value)) {
    value.forEach(item => schemaEntities(item, prohibited, location));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, nested] of Object.entries(value)) {
    if (["aggregateRating", "review", "ratingValue", "reviewCount"].includes(key)) prohibited.push(`${location}: ${key}`);
    schemaEntities(nested, prohibited, location);
  }
}

function countSchemaEntities(value, counts) {
  const entries = Array.isArray(value) ? value : Array.isArray(value?.["@graph"]) ? value["@graph"] : [value];
  for (const entry of entries) {
    const types = Array.isArray(entry?.["@type"]) ? entry["@type"] : [entry?.["@type"]];
    for (const type of types) if (typeof type === "string" && Object.hasOwn(counts, type)) counts[type] += 1;
  }
}

function parsePrice(value) {
  const digits = value.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : null;
}

let files;
try {
  files = await listFiles(distDirectory);
} catch (error) {
  console.error(`No se pudo leer dist (${distDirectory}): ${error.message}`);
  process.exit(1);
}

// Search Console verification files are intentionally static exceptions: Google owns their
// exact contents, so public/google*.html must not be required to carry site SEO metadata.
const htmlFiles = files.filter(file => file.endsWith(".html") && !/^google.*\.html$/i.test(path.basename(file)));
const contents = new Map(await Promise.all(htmlFiles.map(async file => [file, await readFile(file, "utf8")] )));
const failures = {
  "HTML auditado": [],
  "Título": [],
  "Meta description": [],
  "Canonical": [],
  "H1": [],
  "Imágenes": [],
  "Enlaces internos": [],
  "JSON-LD": [],
  "Cifras prohibidas": [],
  "Promesas retiradas": [],
  "Precios de catálogo": [],
  "Fuentes remotas": [],
  "Sello de build": [],
  "Estructura accesible": [],
  "Sitemap coherente": [],
};

if (htmlFiles.length === 0) failures["HTML auditado"].push("no se encontraron HTML auditables");

const catalogPrices = [];
for (const [file, html] of contents) {
  const route = routeForFile(file);
  const label = route;
  const htmlElement = html.match(/<html\b[^>]*>/i)?.[0] ?? "";
  const mainCount = [...html.matchAll(/<main\b[^>]*>/gi)].length;
  const mainTarget = /<main\b[^>]*\bid=(?:"contenido-principal"|'contenido-principal')[^>]*>/i.test(html);
  if (getAttribute(htmlElement, "lang") !== "es-MX" || (getAttribute(htmlElement, "dir") && getAttribute(htmlElement, "dir") !== "ltr") || mainCount !== 1 || !mainTarget) {
    failures["Estructura accesible"].push(`${label} (lang=${getAttribute(htmlElement, "lang") ?? "—"}, dir=${getAttribute(htmlElement, "dir") ?? "implícito"}, main=${mainCount}, destino skip=${mainTarget ? "OK" : "ausente"})`);
  }
  const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(match => textContent(match[1]));
  if (titles.length !== 1 || !titles[0] || titles[0].length > 60) failures.Título.push(`${label} (${titles.length} title, ${titles[0]?.length ?? 0} caracteres)`);

  const descriptions = [...html.matchAll(/<meta\b[^>]*>/gi)].filter(match => getAttribute(match[0], "name")?.toLowerCase() === "description").map(match => getAttribute(match[0], "content") ?? "");
  if (descriptions.length !== 1 || !descriptions[0] || descriptions[0].length > 155) failures["Meta description"].push(`${label} (${descriptions.length} description, ${descriptions[0]?.length ?? 0} caracteres)`);

  const canonicals = [...html.matchAll(/<link\b[^>]*>/gi)].filter(match => (getAttribute(match[0], "rel") ?? "").split(/\s+/).map(value => value.toLowerCase()).includes("canonical")).map(match => getAttribute(match[0], "href") ?? "");
  const expectedCanonical = new URL(route, SITE_ORIGIN).href;
  if (canonicals.length !== 1 || canonicals[0] !== expectedCanonical) failures.Canonical.push(`${label} (esperado ${expectedCanonical}; recibido ${canonicals.join(", ") || "ninguno"})`);

  const h1Count = [...html.matchAll(/<h1\b[^>]*>/gi)].length;
  if (h1Count !== 1) failures.H1.push(`${label} (${h1Count} h1)`);

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const src = getAttribute(tag, "src");
    const width = getAttribute(tag, "width");
    const height = getAttribute(tag, "height");
    const alt = getAttribute(tag, "alt");
    if (!width || !height || !alt?.trim()) {
      failures.Imágenes.push(`${label}: ${src ?? "sin src"} (width=${width ?? "—"}, height=${height ?? "—"}, alt=${alt ? "OK" : "vacío"})`);
      continue;
    }
    if (src && src.startsWith("/")) {
      const assetPath = safePath(decodeURIComponent(src.split(/[?#]/, 1)[0].replace(/^\/+/, "")));
      if (!assetPath || !(await exists(assetPath))) failures.Imágenes.push(`${label}: archivo inexistente ${src}`);
    }
  }

  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = getAttribute(match[0], "href");
    if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:|data:)/i.test(href)) continue;
    if (href.startsWith("//")) continue;
    if (!(await destinationExists(href, route))) failures["Enlaces internos"].push(`${label}: ${href}`);
  }

  const entityCounts = { LocalBusiness: 0, Organization: 0, WebSite: 0 };
  const prohibited = [];
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (getAttribute(match[1], "type")?.toLowerCase() !== "application/ld+json") continue;
    try {
      const schema = JSON.parse(match[2]);
      schemaEntities(schema, prohibited, label);
      countSchemaEntities(schema, entityCounts);
    } catch (error) {
      failures["JSON-LD"].push(`${label}: JSON inválido (${error.message})`);
    }
  }
  for (const [type, count] of Object.entries(entityCounts)) {
    if (count !== 1) failures["JSON-LD"].push(`${label}: ${type}=${count}`);
  }
  failures["JSON-LD"].push(...prohibited);

  const forbiddenMatches = html.match(FORBIDDEN_MARKER) ?? [];
  if (forbiddenMatches.length) failures["Cifras prohibidas"].push(`${label}: ${[...new Set(forbiddenMatches.map(value => value.toLowerCase()))].join(", ")}`);
  const normalizedHtml = html.toLowerCase();
  const promiseMatches = RETIRED_PROMISES.filter(value => normalizedHtml.includes(value));
  if (promiseMatches.length) failures["Promesas retiradas"].push(`${label}: ${promiseMatches.join(", ")}`);

  for (const match of html.matchAll(/<span\b([^>]*)>([\s\S]*?)<\/span>/gi)) {
    if (!getAttribute(match[1], "class")?.split(/\s+/).includes("idetail__price")) continue;
    const price = parsePrice(textContent(match[2]));
    if (price !== null) catalogPrices.push(price);
  }
}

if (catalogPrices.length !== EXPECTED_PRICES.length || catalogPrices.sort((a, b) => a - b).some((price, index) => price !== EXPECTED_PRICES[index])) {
  failures["Precios de catálogo"].push(`esperados ${EXPECTED_PRICES.map(price => `$${price.toLocaleString("en-US")}`).join(", ")}; recibidos ${catalogPrices.sort((a, b) => a - b).map(price => `$${price.toLocaleString("en-US")}`).join(", ") || "ninguno"}`);
}

for (const file of files.filter(file => /\.(?:html|css)$/i.test(file))) {
  const content = await readFile(file, "utf8");
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(content)) failures["Fuentes remotas"].push(path.relative(distDirectory, file));
}

// Una pagina con noindex no puede anunciarse en el sitemap: es una senal
// contradictoria para el buscador. La categoria sin fichas publicadas se sirve
// con noindex, asi que debe quedar fuera del XML.
const sitemapPath = path.join(distDirectory, "sitemap-0.xml");
if (await exists(sitemapPath)) {
  const sitemapXml = await readFile(sitemapPath, "utf8");
  const sitemapRoutes = new Set([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname));
  for (const [file, html] of contents) {
    const robots = html.match(/<meta\b[^>]*name=["']robots["'][^>]*>/i)?.[0] ?? "";
    if (!/noindex/i.test(getAttribute(robots, "content") ?? "")) continue;
    const route = routeForFile(file);
    if (sitemapRoutes.has(route)) failures["Sitemap coherente"].push(`${route} va con noindex pero esta en el sitemap`);
  }
} else {
  failures["Sitemap coherente"].push("falta sitemap-0.xml");
}

const buildIdPath = path.join(distDirectory, "build-id.txt");
if (!(await exists(buildIdPath))) {
  failures["Sello de build"].push("falta build-id.txt");
} else {
  const buildId = await readFile(buildIdPath, "utf8");
  if (!/^[a-f0-9]{40}\r?\n/m.test(buildId)) failures["Sello de build"].push("build-id.txt no contiene un SHA de 40 hex");
}

let totalFailures = 0;
for (const [rule, details] of Object.entries(failures)) totalFailures += report(rule, details);
console.log(`Resumen: ${totalFailures === 0 ? "OK" : "FALLO"} — ${htmlFiles.length} HTML auditados${totalFailures ? `, ${totalFailures} incumplimientos` : ""}.`);
process.exitCode = totalFailures === 0 ? 0 : 1;

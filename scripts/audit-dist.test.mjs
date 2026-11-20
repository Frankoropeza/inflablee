import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const validHtml = `<!doctype html>
<html lang="es-MX"><head>
  <title>Renta de inflables para fiestas en CDMX | INFLABLEE</title>
  <meta name="description" content="Renta de inflables para fiestas en CDMX. Consulta el catálogo y cotiza tu evento por WhatsApp.">
  <link rel="canonical" href="https://inflablee.com/">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"INFLABLEE"}</script>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"LocalBusiness","name":"INFLABLEE"}</script>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","name":"INFLABLEE"}</script>
</head><body><main id="contenido-principal"><h1>Inflables</h1><img src="/img/test.jpg" width="100" height="100" alt="Inflable de prueba"><a href="/contacto/">Contacto</a><span class="idetail__price">1,400 MXN</span><span class="idetail__price">1,600 MXN</span><span class="idetail__price">1,600 MXN</span><span class="idetail__price">1,600 MXN</span><span class="idetail__price">1,800 MXN</span><span class="idetail__price">2,300 MXN</span><span class="idetail__price">2,500 MXN</span><span class="idetail__price">2,600 MXN</span></main></body></html>`;

async function createDist(html) {
  const directory = await mkdtemp(join(tmpdir(), "inflablee-audit-"));
  await mkdir(join(directory, "img"), { recursive: true });
  await mkdir(join(directory, "contacto"), { recursive: true });
  await writeFile(join(directory, "index.html"), html);
  const contactHtml = validHtml
    .replace(/<span class="idetail__price">.*?<\/span>/g, "")
    .replace('href="https://inflablee.com/"', 'href="https://inflablee.com/contacto/"');
  await writeFile(join(directory, "contacto", "index.html"), contactHtml);
  await writeFile(join(directory, "img", "test.jpg"), "fixture");
  await writeFile(join(directory, "build-id.txt"), "0123456789abcdef0123456789abcdef01234567\n2026-11-19T00:00:00.000Z\n");
  return directory;
}

function audit(directory) {
  return spawnSync(process.execPath, ["scripts/audit-dist.mjs", directory], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
}

test("acepta un dist mínimo que cumple los gates", async () => {
  const directory = await createDist(validHtml);
  const result = audit(directory);

  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /Título: OK/);
});

test("detecta título largo e imagen sin texto alternativo", async () => {
  const invalidHtml = validHtml
    .replace("Renta de inflables para fiestas en CDMX | INFLABLEE", "Título deliberadamente muy largo para verificar que la auditoría de producción realmente falle ahora")
    .replace('alt="Inflable de prueba"', 'alt=""');
  const directory = await createDist(invalidHtml);
  const result = audit(directory);

  assert.notEqual(result.status, 0);
  assert.match(result.stdout, /Título: FALLO/);
  assert.match(result.stdout, /Imágenes: FALLO/);
});

// jsonld.ts — JSON-LD seguro para <script type="application/ld+json" set:html>.
// JSON.stringify NO protege el contexto HTML: un dato con "</script>" cerraría la
// etiqueta e inyectaría marcado. Se escapan < > & U+2028 U+2029 como \uXXXX: el JSON
// es idéntico para cualquier parser. Origen: plantilla EJEMPLOS v1.4.0 (check jsonld-esc).
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/[<>&\u2028\u2029]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`);
}

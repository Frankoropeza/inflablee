/**
 * Fuente única de verdad de las categorías de inflables.
 * `key` es el valor que usa el frontmatter de src/content/inflables (y el z.enum del schema).
 * `slug` es la ruta de la página de categoría en /inflables/<slug>.
 */
export const CATEGORIAS = [
  {
    key: "castillos",
    slug: "castillos-inflables",
    label: "Castillos",
    labelSingular: "Castillo Inflable",
    badge: "Castillo",
    emoji: "🏰",
    color: "#FF4B1F",
    gradient: "linear-gradient(135deg, #FF4B1F22 0%, #FFD70022 100%)",
    title: "Castillos inflables en CDMX | INFLABLEE",
    description: "Castillos inflables para niñas y niños en CDMX y Edomex. Instalación incluida.",
  },
  {
    key: "toboganes",
    slug: "toboganes-acuaticos",
    label: "Toboganes acuáticos",
    labelSingular: "Tobogán",
    badge: "Tobogán",
    emoji: "🌊",
    color: "#0077CC",
    gradient: "linear-gradient(135deg, #1A1A2E22 0%, #0077CC22 100%)",
    title: "Toboganes acuáticos en CDMX | INFLABLEE",
    description: "Toboganes acuáticos inflables para fiestas en CDMX y Edomex. Instalación incluida.",
  },
  {
    key: "pistas",
    slug: "pistas-obstaculos",
    label: "Pistas de obstáculos",
    labelSingular: "Pista de Obstáculos",
    badge: "Pista",
    emoji: "🏃",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED22 0%, #FF4B1F22 100%)",
    title: "Pistas de obstáculos inflables CDMX | INFLABLEE",
    description: "Pistas de obstáculos para kermeses y eventos en CDMX. Supervisor incluido.",
  },
  {
    key: "interactivos",
    slug: "juegos-interactivos",
    label: "Juegos interactivos",
    labelSingular: "Juego Interactivo",
    badge: "Interactivo",
    emoji: "🥊",
    color: "#D97706",
    gradient: "linear-gradient(135deg, #D9770622 0%, #FFD70022 100%)",
    title: "Juegos interactivos inflables en CDMX | INFLABLEE",
    description: "Juegos interactivos para eventos corporativos y fiestas en CDMX y Edomex.",
  },
] as const;

export type CategoriaKey = (typeof CATEGORIAS)[number]["key"];

export const CATEGORIA_KEYS = CATEGORIAS.map(c => c.key) as unknown as [CategoriaKey, ...CategoriaKey[]];

export const getCategoria = (key: string) => CATEGORIAS.find(c => c.key === key);

export const categoriaLabel = (key: string) => getCategoria(key)?.labelSingular ?? key;
export const categoriaColor = (key: string) => getCategoria(key)?.color ?? "#6B7280";
export const categoriaGradient = (key: string) =>
  getCategoria(key)?.gradient ?? "linear-gradient(135deg, #FF4B1F22 0%, #1A1A2E11 100%)";
export const categoriaHref = (key: string) => {
  const slug = getCategoria(key)?.slug;
  return slug ? `/inflables/${slug}` : "/inflables";
};

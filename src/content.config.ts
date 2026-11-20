import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { CATEGORIA_KEYS } from "./data/categorias";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string().max(155),
    cardDescription: z.string().optional(),
    pubDate: z.date(),
    author: z.string().default("Equipo INFLABLEE"),
    category: z.string().optional(),
    image: image().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }).strict(),
});


const tiposEvento = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/tipos-evento" }),
  schema: z.object({
    icon: z.string().min(1),
    title: z.string(),
    description: z.string().max(155),
    href: z.string().startsWith("/"),
    tags: z.array(z.string()).min(1),
    order: z.number().int().nonnegative(),
  }).strict(),
});

const paquetes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/paquetes" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(155),
    price: z.string(),
    targetAudience: z.string(),
    includes: z.array(z.string()).min(1),
    duration: z.string(),
    note: z.string().optional(),
    placements: z.array(z.object({
      page: z.enum(["servicios", "paquetes", "fiestas", "escolares"]),
      order: z.number().int().nonnegative(),
      variant: z.enum(["standard", "pricing"]).default("pricing"),
      price: z.string().optional(),
      description: z.string().max(155).optional(),
      includes: z.array(z.string()).min(1).optional(),
      duration: z.string().optional(),
      note: z.string().optional(),
      featured: z.boolean().default(false),
      badge: z.string().optional(),
    }).strict()).min(1),
  }).strict(),
});

const inflables = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/inflables" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    categoria: z.enum(CATEGORIA_KEYS),
    precio_desde: z.number().positive(),
    tamano: z.enum(["chico", "mediano", "grande"]),
    capacidad: z.string(),
    medidas: z.string(),
    edades: z.string(),
    tiempo_instalacion: z.string(),
    altura_libre: z.string(),
    interiores: z.boolean(),
    descripcion: z.string(),
    imagen: image().optional(),
    imagenes: z.array(image()).default([]),
    disponible: z.boolean().default(true),
    featured: z.boolean().default(false),
    order: z.number().int().nonnegative().default(99),
  }).strict(),
});

const paginas = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/paginas" }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
  }).strict(),
});

const categorias = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/categorias" }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
    eyebrow: z.string(),
    heroTitle: z.string(),
    heroDescription: z.string(),
    quoteLabel: z.string(),
    catalogTitle: z.string(),
    catalogDescription: z.string(),
    primaryCta: z.string(),
    ctaEyebrow: z.string().optional(),
    ctaTitle: z.string(),
    ctaDescription: z.string(),
    heroStats: z.array(z.object({ value: z.string(), label: z.string() }).strict()).optional(),
    faq: z.enum(["castillos"]).optional(),
  }).strict(),
});

const zonasSeo = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/zonas" }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
    eyebrow: z.string(),
    heroTitle: z.string(),
    heroDescription: z.string(),
    sectionTitle: z.string(),
    sectionDescription: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string(),
    secondaryHref: z.string().startsWith("/"),
    ctaSecondaryCta: z.string(),
    ctaSecondaryHref: z.string().startsWith("/"),
    heroStats: z.array(z.object({ value: z.string(), label: z.string() }).strict()).optional(),
    ctaTitle: z.string(),
    ctaDescription: z.string(),
  }).strict(),
});

export const collections = { blog, tiposEvento, paquetes, inflables, paginas, categorias, zonasSeo };

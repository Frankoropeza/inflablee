import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { CATEGORIA_KEYS } from "./data/categorias";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string().max(160),
    pubDate: z.date(),
    author: z.string().default("Equipo INFLABLEE"),
    category: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }).strict(),
});

const servicios = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/servicios" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    icon: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }).strict(),
});

const paquetes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/paquetes" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    price: z.string().optional(),
    featured: z.boolean().default(false),
    includes: z.array(z.string()).default([]),
    order: z.number().default(99),
  }).strict(),
});

const inflables = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/inflables" }),
  schema: z.object({
    title: z.string(),
    categoria: z.enum(CATEGORIA_KEYS),
    precio_desde: z.number(),
    capacidad: z.string(),
    medidas: z.string(),
    tiempo_instalacion: z.string(),
    descripcion: z.string(),
    imagen: z.string().optional(),
    imagenes: z.array(z.string()).default([]),
    disponible: z.boolean().default(true),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }).strict(),
});

export const collections = { blog, servicios, paquetes, inflables };

import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.date(),
    author: z.string().default("Equipo INFLABLEE"),
    category: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const servicios = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    icon: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const paquetes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    price: z.string().optional(),
    featured: z.boolean().default(false),
    includes: z.array(z.string()).default([]),
    order: z.number().default(99),
  }),
});

const inflables = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    categoria: z.string(),
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
  }),
});

export const collections = { blog, servicios, paquetes, inflables };

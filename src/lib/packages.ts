import { getCollection } from "astro:content";

export type PackagePage = "servicios" | "paquetes" | "fiestas" | "escolares";

export async function getPackageCards(page: PackagePage) {
  const paquetes = await getCollection("paquetes");

  return paquetes.flatMap((paquete) => paquete.data.placements
    .filter((placement) => placement.page === page)
    .map((placement) => ({
      title: paquete.data.title,
      price: placement.price ?? paquete.data.price,
      targetAudience: paquete.data.targetAudience,
      description: placement.description ?? paquete.data.description,
      includes: placement.includes ?? paquete.data.includes,
      duration: placement.duration ?? paquete.data.duration,
      note: placement.note ?? paquete.data.note,
      featured: placement.featured,
      badge: placement.badge,
      order: placement.order,
      variant: placement.variant,
    })))
    .sort((a, b) => a.order - b.order);
}

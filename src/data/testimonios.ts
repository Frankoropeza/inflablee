/**
 * Testimonios reales de clientes. Fuente única: la home los pinta desde aquí y
 * el JSON-LD de Review se genera desde aquí mismo — antes el layout declaraba
 * solo 2 reseñas y la home mostraba 4 distintas.
 *
 * `fuente` es trazabilidad interna (de dónde vino la reseña). Déjala vacía si
 * no la tienes a la mano; solo se publica cuando existe.
 * `fecha` en formato ISO (YYYY-MM-DD); solo se emite en el schema si existe.
 */
export interface Testimonio {
  name: string;
  inicial: string;
  color: string;
  text: string;
  event: string;
  stars: number;
  fecha?: string;
  fuente?: "google" | "facebook" | "instagram" | "whatsapp" | "directo";
}

export const TESTIMONIOS: Testimonio[] = [
  {
    name: "Laura Martínez",
    inicial: "L",
    color: "#FF4B1F",
    text: "El castillo inflable llegó puntual, limpio y los niños la pasaron increíble. Totalmente recomendados. El supervisor fue super atento con los niños todo el tiempo.",
    event: "Cumpleaños infantil · Coyoacán",
    stars: 5,
    fecha: "2026-01-15",
  },
  {
    name: "Carlos Ramírez",
    inicial: "C",
    color: "#0077CC",
    text: "Rentamos el barco pirata para el cumpleaños de mi hijo. Instalación rapidísima, personal muy amable y el inflable en perfectas condiciones. Ya los contratamos por tercera vez.",
    event: "Fiesta temática pirata · Naucalpan",
    stars: 5,
    fecha: "2026-02-20",
  },
  {
    name: "Ana García",
    inicial: "A",
    color: "#7C3AED",
    text: "Contratamos la pista extremo para el día del niño en la empresa. Los niños felices, los papás tranquilos y el personal muy profesional. Los recomendaría 100%.",
    event: "Evento corporativo · Santa Fe",
    stars: 5,
  },
  {
    name: "Roberto Sánchez",
    inicial: "R",
    color: "#059669",
    text: "La pista de obstáculos fue el hit de la kermés escolar. 200 niños la disfrutaron todo el día sin ningún problema. Precio justo y servicio de primera.",
    event: "Kermés escolar · Iztapalapa",
    stars: 5,
  },
];

/** Reseñas en formato schema.org, generadas desde los testimonios reales. */
export const testimoniosSchema = () =>
  TESTIMONIOS.map(t => ({
    "@type": "Review",
    "reviewRating": { "@type": "Rating", "ratingValue": String(t.stars), "bestRating": "5", "worstRating": "1" },
    "author": { "@type": "Person", "name": t.name },
    ...(t.fecha ? { "datePublished": t.fecha } : {}),
    "reviewBody": t.text,
  }));

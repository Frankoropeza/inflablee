import { SITE } from "@/data/site";

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

/**
 * FAQPage de schema.org a partir de las preguntas que la página ya muestra.
 * Google exige que la respuesta marcada sea la misma que ve el visitante,
 * así que siempre se construye desde el mismo array que pinta el acordeón.
 */
export const faqSchema = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({
    "@type": "Question",
    "name": f.question,
    "acceptedAnswer": {
      "@type": "Answer",
      // El acordeón admite HTML en la respuesta; el schema la quiere en texto.
      "text": f.answer.replace(/<[^>]*>/g, "").trim(),
    },
  })),
});

/** Preguntas generales (las que ya muestra la portada). */
export const FAQS_GENERALES: Faq[] = [
  { id: "f1", question: "¿Cuánto cuesta rentar un brincalín en CDMX?", answer: "El precio de renta de un brincalín en CDMX va de $800 a $3,000 MXN dependiendo del modelo y tamaño — con entrega, instalación, supervisor y retiro incluidos, sin costos ocultos. Mini castillo (2×2 m): desde $800 MXN. Castillo estándar (3×3 m): desde $1,200 MXN. Barco Pirata (5×4 m): desde $2,500 MXN. Pista de obstáculos (8×3 m): desde $3,000 MXN. Todos los precios incluyen IVA." },
  { id: "f2", question: "¿Qué incluye la renta de inflables?", answer: "La renta incluye el inflable, soplador eléctrico, lonas de anclaje, lona de piso protectora, supervisión durante el evento, sanitización previa y retiro al finalizar. El requerimiento eléctrico depende del modelo: revisa la ficha de cada inflable antes de cotizar para confirmar lo que necesitas en el área de instalación." },
  { id: "f3", question: "¿Los inflables son seguros para los niños?", answer: "Cada inflable debe instalarse de acuerdo con sus especificaciones y con supervisión durante el evento. Revisa las medidas, la capacidad y los requisitos de cada ficha antes de reservar para elegir una opción adecuada para tu espacio." },
  { id: "f4", question: "¿Cuánto espacio necesito para un castillo inflable?", answer: "Un mini castillo (2×2 m) necesita un área libre de 3×3 m. Un castillo estándar (3×3 m) necesita 4.2×4.2 m. El Barco Pirata (5×4 m) requiere 6.6×5.6 m. La Pista Extremo (8×3 m) necesita 10×5 m. En todos los casos necesitas al menos 60 cm de perímetro de seguridad libre de obstáculos en todos los lados. Te asesoramos con medidas exactas al cotizar." },
  { id: "f5", question: "¿Qué pasa si llueve el día de mi evento?", answer: "Si llueve el día de tu evento y las condiciones no permiten el uso seguro del inflable, puedes reagendar sin costo o recibir el reembolso total del anticipo. La decisión la tomamos juntos basándonos en el pronóstico del SMN (Servicio Meteorológico Nacional). Si la lluvia es ligera y el área está techada, el servicio puede continuar con precauciones adicionales." },
  { id: "f6", question: "¿Con cuánta anticipación debo reservar el inflable?", answer: "En temporada alta (abril, mayo, julio, agosto y diciembre), los fines de semana se reservan hasta con 3 semanas de anticipación. En temporada normal, 5 a 7 días son suficientes. Los sábados desde las 12 PM y los domingos completos son las franjas más solicitadas. Si tu evento es de último momento, escríbenos — a veces tenemos cancelaciones que liberan fechas." },
  { id: "f7", question: "¿Aceptan pago con tarjeta o transferencia?", answer: `Sí. Aceptamos efectivo, transferencia SPEI, tarjeta de débito Visa/Mastercard y tarjeta de crédito. Para reservar se requiere un anticipo del ${SITE.comercial.anticipoPct}% del total; el resto se liquida el día del evento, antes de la instalación. No cobramos comisión por pago con tarjeta.` },
  { id: "f8", question: "¿Hacen entregas en toda la CDMX y Estado de México?", answer: "Cubrimos las alcaldías de la Ciudad de México y la zona metropolitana del Valle de México. ¿Tu colonia no aparece? Escríbenos por WhatsApp y verificamos cobertura." },
];

/** Preguntas específicas de castillos inflables (las de /inflables/castillos-inflables). */
export const FAQS_CASTILLOS: Faq[] = [
  { id: "c1", question: "¿Cuánto cuesta rentar un castillo inflable en CDMX?", answer: "El precio de renta de un castillo inflable en CDMX va de $800 a $2,800 MXN según el modelo y tamaño, con entrega, instalación, supervisor y retiro incluidos sin costo adicional. Mini castillo (2×2 m): desde $800 MXN. Castillo de Princesas o Dragones (3×3 m): desde $1,200 MXN. Castillo Blanco Premium (5×5 m): desde $2,800 MXN. Todos los precios incluyen IVA." },
  { id: "c2", question: "¿Qué tamaño de espacio necesito para un castillo inflable?", answer: "Un mini castillo (2×2 m) necesita un área libre de 3×3 m. Un castillo estándar (3×3 m) necesita 4.2×4.2 m con 60 cm de perímetro de seguridad en todos los lados. El Castillo Blanco Premium (5×5 m) necesita 6.6×6.6 m. Te medimos el espacio por fotos o video de WhatsApp antes de confirmar la reserva." },
  { id: "c3", question: "¿Los castillos inflables son seguros para niños pequeños?", answer: "Sí. Todos los castillos cuentan con mallas de seguridad en los laterales para evitar caídas. Verificamos presión de operación (máx. 3.5 PSI, dentro del estándar ASTM F2374), resistencia de costuras y anclaje antes de cada evento. Un supervisor certificado está presente durante toda la renta. Para niños menores de 2 años siempre recomendamos supervisión directa de un adulto dentro del área." },
  { id: "c4", question: "¿Cuánto tiempo tarda la instalación de un castillo inflable?", answer: "Los castillos de 3×3 m se instalan en 15–20 minutos desde que bajamos del vehículo. El Mini Castillo (2×2 m) en 12–15 minutos. El Castillo Blanco Premium (5×5 m) en 25–30 minutos. Llegamos 60 minutos antes del inicio del evento para que todo esté listo antes de que llegue el primer invitado." },
  { id: "c5", question: "¿Puedo combinar un castillo inflable con un tobogán acuático?", answer: "Sí. Muchos de nuestros eventos incluyen un castillo inflable para los niños más pequeños y un tobogán acuático para los más grandes. Ofrecemos descuentos en paquetes de 2 o más inflables para el mismo evento. Pregunta por disponibilidad y precio del paquete al cotizar." },
];

/** Todas, para la página /preguntas-frecuentes. */
export const FAQS_TODAS: Faq[] = [...FAQS_GENERALES, ...FAQS_CASTILLOS];

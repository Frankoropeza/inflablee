import { SITE } from "@/data/site";

export interface Faq { id: string; question: string; answer: string; }

export const faqSchema = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer.trim() },
  })),
});

export const FAQS_GENERALES: Faq[] = [
  { id: "f1", question: "¿Cuánto cuesta rentar un inflable en CDMX?", answer: "El catálogo va de $1,400 a $2,600 MXN por evento, según el modelo. Consulta la tabla de precios para comparar medidas, edades, altura libre e instalación." },
  { id: "f2", question: "¿Qué incluye el precio?", answer: SITE.comercial.incluye.join(" ") },
  { id: "f3", question: "¿Qué necesito en el lugar del evento?", answer: SITE.comercial.requisitos.join(" ") },
  { id: "f4", question: "¿El envío está incluido?", answer: `${SITE.comercial.envio.sinCosto} ${SITE.comercial.envio.cdmx} ${SITE.comercial.envio.edomex}` },
  { id: "f5", question: "¿Los precios incluyen IVA?", answer: SITE.comercial.iva },
  { id: "f6", question: "¿Cómo aparto la fecha?", answer: SITE.comercial.anticipo },
  { id: "f7", question: "¿La renta incluye supervisor?", answer: SITE.comercial.supervisor },
];

export const FAQS_CASTILLOS: Faq[] = [
  { id: "c1", question: "¿Qué castillo es adecuado para bebés?", answer: "Castillo Baby está recomendado para edades de 1 a 3 años. Mide 2.5 × 2 × 2 m, requiere 3.2 m de altura libre y puede instalarse en interiores si las condiciones del lugar lo permiten." },
  { id: "c2", question: "¿Cómo sé si un inflable cabe bajo techo?", answer: "Revisa la altura libre de cada ficha. Dragones Rojos requiere 4.5 m, Castillo de Princesas 4.2 m y Castillo Blanco 4.7 m; los modelos marcados para interiores son Castillo Baby y Gusanitos, cuya altura libre se confirma al cotizar." },
  { id: "c3", question: "¿Cuánta capacidad tiene cada inflable?", answer: "La capacidad se confirma al cotizar porque depende del peso y la edad de las niñas y niños." },
  { id: "c4", question: "¿Cuánto tarda la instalación?", answer: "El tiempo indicado por modelo va de 15 a 30 minutos. Consulta la ficha del inflable que te interesa." },
];

export const FAQS_TODAS: Faq[] = [...FAQS_GENERALES, ...FAQS_CASTILLOS];

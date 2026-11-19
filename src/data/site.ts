export const SITE = {
  name: "INFLABLEE",
  shortName: "Inflablee",
  url: "https://inflablee.com",
  description: "Renta de inflables, juegos inflables, brincalines y castillos inflables para fiestas y eventos en México.",
  whatsapp: "525539048634",
  tel: "55 3904 8634",
  telHref: "+525539048634",
  email: "contacto@inflablee.com",
  address: "CDMX y Estado de México",
  coords: { lat: 19.4326, lng: -99.1332 },

  /**
   * Cifras reales de operación. Fuente única: si un número aparece en copy o en
   * JSON-LD, sale de aquí. Antes la home declaraba 127 reseñas y el layout 312
   * en el mismo HTML; confirmado por Frank el 2026-11-19: la cifra real es 312.
   */
  trayectoria: {
    eventos: 523,
    desde: 2021,
    hasta: 2025,
    accidentes: 0,
  },
  resenas: {
    rating: 4.9,
    count: 312,
  },
  social: {
    facebook: "",
    instagram: "",
  },
};

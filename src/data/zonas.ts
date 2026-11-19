/**
 * Cobertura real de entrega. Las páginas /zonas/cdmx y /zonas/estado-de-mexico
 * pintan el detalle (colonias); aquí vive lo que necesita el menú y el footer.
 */
export const ALCALDIAS_DESTACADAS = [
  "Benito Juárez",
  "Coyoacán",
  "Cuauhtémoc",
  "Gustavo A. Madero",
  "Iztapalapa",
  "Miguel Hidalgo",
] as const;

export const MUNICIPIOS_DESTACADOS = [
  "Ecatepec de Morelos",
  "Nezahualcóyotl",
  "Naucalpan de Juárez",
  "Tlalnepantla de Baz",
] as const;

export const ZONAS_PRINCIPALES = [
  { href: "/zonas/cdmx", label: "Ciudad de México", desc: "Las 16 alcaldías" },
  { href: "/zonas/estado-de-mexico", label: "Estado de México", desc: "12 municipios de la ZMVM" },
] as const;

/**
 * Qué alcaldías y municipios cubre cada ruta de entrega. Las páginas
 * /zonas/zona-* eran idénticas entre sí y no las enlazaba nadie; con esto
 * cada una dice de verdad a dónde llega.
 */
export const ZONAS_GEO = [
  {
    slug: "zona-norte",
    nombre: "Zona Norte",
    alcaldias: ["Gustavo A. Madero", "Azcapotzalco", "Cuauhtémoc"],
    municipios: ["Tlalnepantla de Baz", "Ecatepec de Morelos", "Coacalco de Berriozábal", "Cuautitlán Izcalli", "Tecámac"],
  },
  {
    slug: "zona-sur",
    nombre: "Zona Sur",
    alcaldias: ["Benito Juárez", "Coyoacán", "Tlalpan", "Xochimilco", "Magdalena Contreras", "Milpa Alta"],
    municipios: [],
  },
  {
    slug: "zona-oriente",
    nombre: "Zona Oriente",
    alcaldias: ["Iztapalapa", "Iztacalco", "Venustiano Carranza", "Tláhuac"],
    municipios: ["Nezahualcóyotl", "Chimalhuacán", "La Paz", "Ixtapaluca"],
  },
  {
    slug: "zona-poniente",
    nombre: "Zona Poniente",
    alcaldias: ["Álvaro Obregón", "Cuajimalpa", "Miguel Hidalgo"],
    municipios: ["Naucalpan de Juárez", "Atizapán de Zaragoza"],
  },
] as const;

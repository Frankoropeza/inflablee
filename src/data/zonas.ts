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
  { href: "/zonas/cdmx/", label: "Ciudad de México", desc: "Consulta la cobertura en la ciudad" },
  { href: "/zonas/estado-de-mexico/", label: "Estado de México", desc: "Consulta la cobertura metropolitana" },
] as const;

/**
 * Qué alcaldías y municipios cubre cada ruta de entrega. Las páginas
 * /zonas/zona-* eran idénticas entre sí y no las enlazaba nadie; con esto
 * cada una dice de verdad a dónde llega.
 */
export const ZONAS_GEO = [
  {
    slug: "cdmx",
    nombre: "Ciudad de México",
    title: "Renta de inflables en CDMX | INFLABLEE",
    description: "INFLABLEE entrega inflables en las alcaldías de la Ciudad de México. Consulta la cobertura al cotizar.",
    eyebrow: "Ciudad de México",
    hero: "Renta de inflables en\n<span>Ciudad de México</span>",
    heroDesc: "Cubrimos las alcaldías de la Ciudad de México. Consulta la cobertura, entrega e instalación al cotizar.",
    sectionTitle: "Alcaldías con cobertura",
    sectionSubtitle: "Servicio en las alcaldías de la Ciudad de México. Consulta la cobertura de tu zona.",
    places: [
      { nombre: "Álvaro Obregón", colonias: ["Santa Fe", "Tetelpan", "Olivar del Conde", "Lomas de Santa Fe", "La Mexicana"], destacada: false },
      { nombre: "Azcapotzalco", colonias: ["Del Gas", "Clavería", "San Álvaro", "Tlatilco", "San Marcos"], destacada: false },
      { nombre: "Benito Juárez", colonias: ["Del Valle", "Narvarte", "Nápoles", "Insurgentes Mixcoac", "Extremadura Insurgentes"], destacada: true },
      { nombre: "Coyoacán", colonias: ["Del Carmen", "Pedregal de Santa Úrsula", "Xotepingo", "Copilco", "Barrio de Santa Catarina"], destacada: true },
      { nombre: "Cuajimalpa", colonias: ["Santa Fe", "La Mexicana", "Palo Alto", "Xochitepec"], destacada: false },
      { nombre: "Cuauhtémoc", colonias: ["Centro Histórico", "Doctores", "Santa María la Ribera", "Guerrero", "Tepito"], destacada: true },
      { nombre: "Gustavo A. Madero", colonias: ["Lindavista", "Tepeyac Insurgentes", "Nueva Atzacoalco", "Cuautepec", "La Raza"], destacada: true },
      { nombre: "Iztacalco", colonias: ["Agrícola Oriental", "Pantitlán", "Jardín Balbuena", "El Pañuelito"], destacada: false },
      { nombre: "Iztapalapa", colonias: ["Jardín Balbuena", "Cuatro Árboles", "Santa Cruz Meyehualco", "Pueblo de Los Reyes", "Unidad Habitacional"], destacada: true },
      { nombre: "Magdalena Contreras", colonias: ["San Ángel", "Pedregal", "Barranca Seca", "La Otra Banda"], destacada: false },
      { nombre: "Miguel Hidalgo", colonias: ["Polanco", "Lomas de Chapultepec", "Irrigación", "Argentina", "Popotla"], destacada: true },
      { nombre: "Milpa Alta", colonias: ["Villa Milpa Alta", "San Pablo Oztotepec", "San Pedro Atocpan"], destacada: false },
      { nombre: "Tláhuac", colonias: ["El Llano", "La Turba", "Zapotitla", "Selene"], destacada: false },
      { nombre: "Tlalpan", colonias: ["Pedregal de San Ángel", "Isidro Fabela", "Ajusco", "Xochimilco", "Toriello Guerra"], destacada: false },
      { nombre: "Venustiano Carranza", colonias: ["Jardín Balbuena", "Moctezuma", "Aeronáutica Militar", "Morelos"], destacada: false },
      { nombre: "Xochimilco", colonias: ["La Nativitas", "San Gregorio Atlapulco", "Santa Cruz Xochitepec", "Tulyehualco"], destacada: false },
    ],
    alcaldias: [], municipios: [],
  },
  {
    slug: "estado-de-mexico",
    nombre: "Estado de México",
    title: "Renta de inflables Estado de México | INFLABLEE",
    description: "INFLABLEE lleva inflables a la zona metropolitana del Valle de México. Consulta la cobertura al cotizar.",
    eyebrow: "Estado de México",
    hero: "Renta de inflables en\n<span>Estado de México</span>",
    heroDesc: "Consulta la cobertura disponible en la zona metropolitana del Valle de México antes de reservar.",
    sectionTitle: "Municipios con cobertura en Edomex",
    sectionSubtitle: "Los destacados tienen atención prioritaria y entrega sin costo adicional.",
    places: [
      { nombre: "Ecatepec de Morelos", colonias: ["Las Américas", "Ciudad Azteca", "Jardines de Morelos", "Xalostoc", "Hank González"], destacada: true },
      { nombre: "Nezahualcóyotl", colonias: ["Ciudad Lago", "Jardines", "Metropolitana", "Benito Juárez", "Reforma"], destacada: true },
      { nombre: "Naucalpan de Juárez", colonias: ["Satélite", "Lomas Verdes", "San Bartolo", "Industrial Vallejo", "Hacienda la Florida"], destacada: true },
      { nombre: "Tlalnepantla de Baz", colonias: ["San Andrés Atenco", "La Romana", "Tequesquináhuac", "Industrial", "Buenavista"], destacada: true },
      { nombre: "Chimalhuacán", colonias: ["La Guadalupana", "Ejido de Chimalhuacán", "Los Laureles", "San Pablo"], destacada: false },
      { nombre: "Ixtapaluca", colonias: ["San Buenaventura", "Las Canteras", "El Tejocote", "Galaxias", "Los Héroes"], destacada: false },
      { nombre: "Toluca de Lerdo", colonias: ["Las Torres", "San Buenaventura", "Universidad", "Pilares", "Oxtotitlán"], destacada: false },
      { nombre: "Atizapán de Zaragoza", colonias: ["Ciudad Adolfo López Mateos", "Lomas de San Ángel", "Ojo de Agua"], destacada: false },
      { nombre: "Coacalco de Berriozábal", colonias: ["Los Olivos", "Las Hadas", "San Francisco", "Lázaro Cárdenas"], destacada: false },
      { nombre: "Cuautitlán Izcalli", colonias: ["Jardines", "Arcos del Alba", "Hacienda la Puerta", "Ojo de Agua"], destacada: false },
      { nombre: "La Paz", colonias: ["Los Reyes", "Magdalena Atlipac", "Ixtapaluca", "Esperanza"], destacada: false },
      { nombre: "Tecámac", colonias: ["Santa Cruz", "San Marcos", "San Jerónimo", "Fuentes del Valle"], destacada: false },
    ],
    alcaldias: [], municipios: [],
  },
  {
    slug: "zona-norte",
    nombre: "Zona Norte",
    alcaldias: ["Gustavo A. Madero", "Azcapotzalco", "Cuauhtémoc"],
    municipios: ["Tlalnepantla de Baz", "Ecatepec de Morelos", "Coacalco de Berriozábal", "Cuautitlán Izcalli", "Tecámac"],
    places: [],
  },
  {
    slug: "zona-sur",
    nombre: "Zona Sur",
    alcaldias: ["Benito Juárez", "Coyoacán", "Tlalpan", "Xochimilco", "Magdalena Contreras", "Milpa Alta"],
    municipios: [],
    places: [],
  },
  {
    slug: "zona-oriente",
    nombre: "Zona Oriente",
    alcaldias: ["Iztapalapa", "Iztacalco", "Venustiano Carranza", "Tláhuac"],
    municipios: ["Nezahualcóyotl", "Chimalhuacán", "La Paz", "Ixtapaluca"],
    places: [],
  },
  {
    slug: "zona-poniente",
    nombre: "Zona Poniente",
    alcaldias: ["Álvaro Obregón", "Cuajimalpa", "Miguel Hidalgo"],
    municipios: ["Naucalpan de Juárez", "Atizapán de Zaragoza"],
    places: [],
  },
] as const;

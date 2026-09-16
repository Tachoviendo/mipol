/**
 * `src/data/oferta.ts`: datos mock de la oferta educativa.
 *
 * La taxonomía de tipo de oferta está documentada en
 * `docs/oferta-taxonomia.md` (OE-01).
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type TipoOferta = "terciaria" | "interna";

export type ProgramaOferta = {
  id: string;
  nombre: string;
  tipo: TipoOferta;
  descripcion: string;
  duracion: string; // "2 años" | "4 meses"
  requisitos: string; // requisitos de ingreso/participación
  cupos: number; // 0 = cupos ilimitados
  contactoInscripcion: string; // teléfono/email/secretaría para inscribirse
};

// ─── Datos mock ──────────────────────────────────────────────────────────────

export const programasOferta: ProgramaOferta[] = [
  {
    id: "oe-01",
    nombre: "Tecnicatura en Redes Informáticas",
    tipo: "terciaria",
    descripcion:
      "Tecnicatura de nivel terciario orientada a instalación, configuración y mantenimiento de redes y servicios de comunicación.",
    duracion: "2 años",
    requisitos: "Bachillerato aprobado (o cursando último año).",
    cupos: 30,
    contactoInscripcion: "Secretaría del liceo · tel. 4732 1000 · inscripciones@liceo.edu.uy",
  },
  {
    id: "oe-02",
    nombre: "Curso de Operador de PC y herramientas ofimáticas",
    tipo: "terciaria",
    descripcion:
      "Curso de formación laboral en manejo de computadora, planillas de cálculo y procesadores de texto.",
    duracion: "6 meses",
    requisitos: "Ciclo básico aprobado.",
    cupos: 25,
    contactoInscripcion: "Coordinación de cursos · curso.ofimatica@liceo.edu.uy",
  },
  {
    id: "oe-03",
    nombre: "Taller de Teatro",
    tipo: "interna",
    descripcion:
      "Taller extracurricular de expresión teatral que cierra con una muestra anual abierta a la comunidad.",
    duracion: "1 año lectivo",
    requisitos: "Ser estudiante del liceo.",
    cupos: 20,
    contactoInscripcion: "Prof. de Teatro · sala de profesores o mensajería del liceo",
  },
  {
    id: "oe-04",
    nombre: "Club de Robótica",
    tipo: "interna",
    descripcion:
      "Espacio extracurricular para armar y programar robots, preparación para competencias de robótica.",
    duracion: "Taller semanal · todo el año",
    requisitos: "Ser estudiante del liceo. No se requiere experiencia previa.",
    cupos: 0,
    contactoInscripcion: "Prof. de Informática · aula de robótica (lunes y miércoles 17:00)",
  },
];
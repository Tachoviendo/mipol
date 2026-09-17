/**
 * `src/data/oferta.ts`: datos mock de la oferta educativa.
 *
 * La taxonomía de tipo de oferta está documentada en
 * `docs/oferta-taxonomia.md` (OE-01).
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type TipoOferta = "terciaria" | "interna";

export type AreaOferta =
  | "informatica"
  | "formacion-laboral"
  | "arte"
  | "ciencia-tecnologia";

export type ModalidadOferta = "presencial" | "virtual" | "hibrida";

export type TurnoOferta = "matutino" | "vespertino" | "nocturno";

export type ProgramaOferta = {
  id: string;
  nombre: string;
  tipo: TipoOferta;
  descripcion: string;
  duracion: string; // "2 años" | "4 meses"
  requisitos: string; // requisitos de ingreso/participación
  cupos: number; // 0 = cupos ilimitados
  contactoInscripcion: string; // teléfono/email/secretaría para inscribirse
  area: AreaOferta;
  modalidad: ModalidadOferta;
  turno: TurnoOferta;
  /** Fecha límite de inscripción (ISO). Si falta, la inscripción está abierta. */
  fechaLimiteInscripcion?: string;
  /** Comunicado oficial vinculado (`anuncios.id`). */
  comunicadoId?: string;
};

export type EstadoInscripcion = "abierta" | "cierra-pronto" | "cerrada";

/** Días antes de la fecha límite para considerar que "cierra pronto". */
export const DIAS_CIERRA_PRONTO = 14;

// ─── Etiquetas para la UI (OE-05) ─────────────────────────────────────────────

export const ETIQUETAS_AREA: Record<AreaOferta, string> = {
  informatica: "Informática",
  "formacion-laboral": "Formación laboral",
  arte: "Arte y cultura",
  "ciencia-tecnologia": "Ciencia y tecnología",
};

export const ETIQUETAS_MODALIDAD: Record<ModalidadOferta, string> = {
  presencial: "Presencial",
  virtual: "Virtual",
  hibrida: "Híbrida",
};

export const ETIQUETAS_TURNO: Record<TurnoOferta, string> = {
  matutino: "Matutino",
  vespertino: "Vespertino",
  nocturno: "Nocturno",
};

export const areasOferta: AreaOferta[] = [
  "informatica",
  "formacion-laboral",
  "arte",
  "ciencia-tecnologia",
];

export const modalidadesOferta: ModalidadOferta[] = [
  "presencial",
  "virtual",
  "hibrida",
];

export const turnosOferta: TurnoOferta[] = [
  "matutino",
  "vespertino",
  "nocturno",
];

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
    area: "informatica",
    modalidad: "presencial",
    turno: "nocturno",
    fechaLimiteInscripcion: "2026-10-15",
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
    area: "formacion-laboral",
    modalidad: "hibrida",
    turno: "vespertino",
    fechaLimiteInscripcion: "2026-09-20",
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
    area: "arte",
    modalidad: "presencial",
    turno: "vespertino",
    fechaLimiteInscripcion: "2026-08-30",
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
    area: "ciencia-tecnologia",
    modalidad: "presencial",
    turno: "matutino",
  },
  {
    id: "oe-05",
    nombre: "Taller de Ajedrez",
    tipo: "interna",
    descripcion:
      "Taller extracurricular de ajedrez para estudiantes, con encuentros semanales y participación en torneos interliceales.",
    duracion: "Taller semanal · todo el año",
    requisitos: "Ser estudiante del liceo.",
    cupos: 0,
    contactoInscripcion: "Prof. de Matemática · salón 201 (jueves 18:00)",
    area: "ciencia-tecnologia",
    modalidad: "presencial",
    turno: "vespertino",
  },
  {
    id: "oe-06",
    nombre: "Tecnicatura en Análisis y Programación",
    tipo: "terciaria",
    descripcion:
      "Tecnicatura de nivel terciario para formar programadores capaces de analizar, diseñar y construir aplicaciones.",
    duracion: "3 años",
    requisitos: "Bachillerato aprobado.",
    cupos: 20,
    contactoInscripcion: "Secretaría del liceo · tel. 4732 1000 · inscripciones@liceo.edu.uy",
    area: "informatica",
    modalidad: "virtual",
    turno: "nocturno",
  },
];

// ─── Búsqueda y filtros (OE-05) ──────────────────────────────────────────────

export function buscarProgramas(
  opciones: {
    texto?: string;
    area?: AreaOferta;
    modalidad?: ModalidadOferta;
    turno?: TurnoOferta;
  },
  fuente: ProgramaOferta[] = programasOferta,
): ProgramaOferta[] {
  const texto = opciones.texto?.trim().toLowerCase();

  return fuente.filter((programa) => {
    if (opciones.area && programa.area !== opciones.area) return false;
    if (opciones.modalidad && programa.modalidad !== opciones.modalidad) return false;
    if (opciones.turno && programa.turno !== opciones.turno) return false;

    if (!texto) return true;

    const coincideNombre = programa.nombre.toLowerCase().includes(texto);
    const coincideDescripcion = programa.descripcion.toLowerCase().includes(texto);
    const coincideArea = ETIQUETAS_AREA[programa.area].toLowerCase().includes(texto);
    const coincideModalidad = ETIQUETAS_MODALIDAD[programa.modalidad].toLowerCase().includes(texto);
    const coincideTurno = ETIQUETAS_TURNO[programa.turno].toLowerCase().includes(texto);

    return (
      coincideNombre ||
      coincideDescripcion ||
      coincideArea ||
      coincideModalidad ||
      coincideTurno
    );
  });
}

// ─── Estado de inscripción (OE-08) ───────────────────────────────────────────

export function estadoInscripcion(
  programa: ProgramaOferta,
  hoy: Date = new Date()
): EstadoInscripcion {
  if (!programa.fechaLimiteInscripcion) return "abierta";

  const limiteMs = new Date(programa.fechaLimiteInscripcion + "T23:59:59").getTime();
  const hoyMs = hoy.getTime();

  if (limiteMs < hoyMs) return "cerrada";
  if (limiteMs - hoyMs <= DIAS_CIERRA_PRONTO * 24 * 60 * 60 * 1000) {
    return "cierra-pronto";
  }
  return "abierta";
}

// ─── Alta / edición (OE-07) ──────────────────────────────────────────────────

export function crearPrograma(
  datos: Omit<ProgramaOferta, "id">
): ProgramaOferta {
  const programa: ProgramaOferta = {
    ...datos,
    id: `oe-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
  };
  programasOferta.push(programa);
  return programa;
}

export function actualizarPrograma(programa: ProgramaOferta): void {
  const indice = programasOferta.findIndex((p) => p.id === programa.id);
  if (indice !== -1) {
    programasOferta[indice] = programa;
  }
}
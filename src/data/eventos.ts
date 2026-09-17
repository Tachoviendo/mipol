/**
 * `src/data/eventos.ts`: datos mock del calendario de eventos del liceo.
 *
 * Contiene dos modelos:
 * - `Evento`: resumen simple de eventos para la home (`ResumenHome`), con
 *   control de roles.
 * - `EventoCalendario`: modelo completo del calendario (tipo, visibilidad,
 *   duración, ubicación) usado por `src/app/calendario`.
 */
import type { Rol } from "@/lib/roles";

// ─── Modelo simple (resumen de eventos para home) ─────────────────────────────

export type Evento = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string; // ISO 8601
  ubicacion?: string;
  /** Roles que pueden ver el evento. */
  roles: Rol[];
};

export const eventos: Evento[] = [
  {
    id: "ev1",
    titulo: "Feria educativa 2026",
    descripcion:
      "Muestra de proyectos de todas las asignaturas, abierta a estudiantes, familias y comunidad.",
    fecha: "2026-09-18T10:00:00-03:00",
    ubicacion: "Patio central del liceo",
    roles: ["estudiante", "docente", "administracion", "publico"],
  },
  {
    id: "ev2",
    titulo: "Parcial de Matemática - 3°A",
    descripcion:
      "Evaluación parcial de Matemática para el grupo 3°A. Llevar calculadora.",
    fecha: "2026-09-15T09:00:00-03:00",
    ubicacion: "Salón 204",
    roles: ["estudiante", "docente"],
  },
  {
    id: "ev3",
    titulo: "Reunión de delegados",
    descripcion:
      "Reunión mensual de delegados de curso para coordinar actividades liceales.",
    fecha: "2026-09-24T16:30:00-03:00",
    ubicacion: "Sala de profesores",
    roles: ["estudiante", "docente", "administracion"],
  },
  {
    id: "ev4",
    titulo: "Consejo docente",
    descripcion:
      "Consejo docente para tratar asuntos académicos y administrativos internos.",
    fecha: "2026-09-29T18:00:00-03:00",
    roles: ["docente", "administracion"],
  },
  {
    id: "ev5",
    titulo: "Entrega de boletines",
    descripcion:
      "Entrega de boletines del primer semestre a familias. Coordinar con adscriptos.",
    fecha: "2026-10-05T17:00:00-03:00",
    ubicacion: "Secretaría",
    roles: ["estudiante", "docente", "administracion", "publico"],
  },
];

export const PROXIMOS_EVENTOS_LIMITE = 4;

export function proximosEventosParaRol(rol: Rol, limite = PROXIMOS_EVENTOS_LIMITE): Evento[] {
  const hoy = Date.now();
  return eventos
    .filter((evento) => evento.roles.includes(rol))
    .filter((evento) => new Date(evento.fecha).getTime() >= hoy)
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .slice(0, limite);
}

// ─── Modelo del calendario ────────────────────────────────────────────────────

export type TipoEvento =
  | "clase"
  | "examen"
  | "reunion"
  | "actividad"
  | "feriado"
  | "otro";

export type VisibilidadEvento = "publico" | "curso" | "privado";

export type EventoCalendario = {
  id: string;
  titulo: string;
  fechaInicio: string; // ISO 8601
  duracionMinutos: number;
  tipo: TipoEvento;
  cursoGrupo?: string; // Ej: "5° A", "3° B", "Docentes"
  visibilidad: VisibilidadEvento;
  descripcion?: string;
  ubicacion?: string;
  todoElDia: boolean;
};

export const eventosCalendario: EventoCalendario[] = [
  {
    id: "ec1",
    titulo: "Clase de Matemática",
    fechaInicio: "2026-09-10T08:00:00-03:00",
    duracionMinutos: 45,
    tipo: "clase",
    cursoGrupo: "5° A",
    visibilidad: "curso",
    descripcion: "Derivadas y aplicaciones",
    ubicacion: "Aula 204",
    todoElDia: false,
  },
  {
    id: "ec2",
    titulo: "Parcial de Física",
    fechaInicio: "2026-09-12T10:00:00-03:00",
    duracionMinutos: 90,
    tipo: "examen",
    cursoGrupo: "5° A",
    visibilidad: "curso",
    descripcion: "Movimiento rectilíneo uniformemente acelerado",
    ubicacion: "Aula 101",
    todoElDia: false,
  },
  {
    id: "ec3",
    titulo: "Reunión de Delegados",
    fechaInicio: "2026-09-15T14:00:00-03:00",
    duracionMinutos: 60,
    tipo: "reunion",
    visibilidad: "publico",
    descripcion: "Planificación de actividades del mes",
    ubicacion: "Sala de Profesores",
    todoElDia: false,
  },
  {
    id: "ec4",
    titulo: "Feria Educativa",
    fechaInicio: "2026-09-18T09:00:00-03:00",
    duracionMinutos: 240,
    tipo: "actividad",
    visibilidad: "publico",
    descripcion: "Exposición de proyectos estudiantiles",
    ubicacion: "Patio central",
    todoElDia: false,
  },
  {
    id: "ec5",
    titulo: "Día del Estudiante",
    fechaInicio: "2026-09-21T00:00:00-03:00",
    duracionMinutos: 1440,
    tipo: "feriado",
    visibilidad: "publico",
    todoElDia: true,
  },
  {
    id: "ec6",
    titulo: "Clase de Historia",
    fechaInicio: "2026-09-10T10:00:00-03:00",
    duracionMinutos: 45,
    tipo: "clase",
    cursoGrupo: "3° B",
    visibilidad: "curso",
    ubicacion: "Aula 305",
    todoElDia: false,
  },
  {
    id: "ec7",
    titulo: "Consejo de Profesores",
    fechaInicio: "2026-09-16T15:30:00-03:00",
    duracionMinutos: 90,
    tipo: "reunion",
    cursoGrupo: "Docentes",
    visibilidad: "privado",
    descripcion: "Evaluación del primer trimestre",
    ubicacion: "Sala de Conferencias",
    todoElDia: false,
  },
  {
    id: "ec8",
    titulo: "Entrega de Calificaciones",
    fechaInicio: "2026-09-25T00:00:00-03:00",
    duracionMinutos: 1440,
    tipo: "otro",
    visibilidad: "publico",
    todoElDia: true,
  },
  {
    id: "ec9",
    titulo: "Clase de Inglés",
    fechaInicio: "2026-09-11T08:00:00-03:00",
    duracionMinutos: 45,
    tipo: "clase",
    cursoGrupo: "5° A",
    visibilidad: "curso",
    ubicacion: "Aula 210",
    todoElDia: false,
  },
  {
    id: "ec10",
    titulo: "Taller de Programación",
    fechaInicio: "2026-09-19T13:00:00-03:00",
    duracionMinutos: 120,
    tipo: "actividad",
    cursoGrupo: "5° A",
    visibilidad: "curso",
    descripcion: "Introducción a TypeScript y React",
    ubicacion: "Laboratorio de Informática",
    todoElDia: false,
  },
];

export function obtenerEventosPorFecha(fecha: string): EventoCalendario[] {
  const dia = fecha.slice(0, 10); // YYYY-MM-DD
  return eventosCalendario.filter((ev) => ev.fechaInicio.startsWith(dia));
}

export function obtenerEventosPorCurso(curso: string): EventoCalendario[] {
  return eventosCalendario.filter(
    (ev) => ev.cursoGrupo === curso || ev.visibilidad === "publico",
  );
}

export function obtenerEventosPorRango(
  inicio: string,
  fin: string,
): EventoCalendario[] {
  const fechaInicio = new Date(inicio).getTime();
  const fechaFin = new Date(fin).getTime();
  return eventosCalendario.filter((ev) => {
    const t = new Date(ev.fechaInicio).getTime();
    return t >= fechaInicio && t <= fechaFin;
  });
}

export function formatearDuracion(minutos: number): string {
  if (minutos < 60) return `${minutos} min`;
  const horas = Math.floor(minutos / 60);
  const minRestantes = minutos % 60;
  return minRestantes > 0 ? `${horas}h ${minRestantes}min` : `${horas}h`;
}

export function colorPorTipo(tipo: TipoEvento): string {
  const colores: Record<TipoEvento, string> = {
    clase: "#3b82f6",
    examen: "#ef4444",
    reunion: "#8b5cf6",
    actividad: "#10b981",
    feriado: "#f59e0b",
    otro: "#6b7280",
  };
  return colores[tipo];
}

export function proximosEventos(cantidad: number = 5): EventoCalendario[] {
  const ahora = new Date().getTime();
  return eventosCalendario
    .filter((ev) => new Date(ev.fechaInicio).getTime() >= ahora)
    .sort(
      (a, b) =>
        new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime(),
    )
    .slice(0, cantidad);
}

export function eventoPorId(id: string): EventoCalendario | undefined {
  return eventosCalendario.find((ev) => ev.id === id);
}
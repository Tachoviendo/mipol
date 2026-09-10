/**
 * `src/data/eventos.ts`: datos mock de eventos del calendario
 * para construir las vistas de calendario sin backend real.
 */

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
    id: "ev1",
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
    id: "ev2",
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
    id: "ev3",
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
    id: "ev4",
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
    id: "ev5",
    titulo: "Día del Estudiante",
    fechaInicio: "2026-09-21T00:00:00-03:00",
    duracionMinutos: 1440,
    tipo: "feriado",
    visibilidad: "publico",
    todoElDia: true,
  },
  {
    id: "ev6",
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
    id: "ev7",
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
    id: "ev8",
    titulo: "Entrega de Calificaciones",
    fechaInicio: "2026-09-25T00:00:00-03:00",
    duracionMinutos: 1440,
    tipo: "otro",
    visibilidad: "publico",
    todoElDia: true,
  },
  {
    id: "ev9",
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
    id: "ev10",
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

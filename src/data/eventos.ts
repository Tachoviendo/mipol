/**
 * `src/data/eventos.ts`: datos mock del calendario de eventos del liceo.
 * Cada evento declara qué roles pueden verlo (`roles`).
 */
import type { Rol } from "@/lib/roles";

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

/** Filtra los eventos que un rol puede ver y los ordena por proximidad. */
export function proximosEventosParaRol(rol: Rol, limite = PROXIMOS_EVENTOS_LIMITE): Evento[] {
  const hoy = Date.now();
  return eventos
    .filter((evento) => evento.roles.includes(rol))
    .filter((evento) => new Date(evento.fecha).getTime() >= hoy)
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .slice(0, limite);
}
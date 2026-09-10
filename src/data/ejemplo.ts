/**
 * `src/data/ejemplo.ts`: datos mock/estáticos consumidos por páginas y componentes,
 * hasta que existan APIs o una base de datos real.
 */
import type { Rol } from "@/lib/roles";

export type Anuncio = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string; // ISO 8601
  /** Roles que pueden ver el comunicado. Si falta, es visible para todos. */
  roles?: Rol[];
  /** Marca el comunicado como destacado para el resumen de la home. */
  destacado?: boolean;
};

export const anuncios: Anuncio[] = [
  {
    id: "1",
    titulo: "Bienvenida al proyecto",
    descripcion: "Arranca el desarrollo colaborativo con el Liceo 1° de Salto.",
    fecha: "2026-03-02",
  },
  {
    id: "2",
    titulo: "Estructura de carpetas definida",
    descripcion: "El equipo ya cuenta con una convención clara para ubicar cada archivo.",
    fecha: "2026-03-03",
  },
  {
    id: "3",
    titulo: "Inscripciones a talleres 2026",
    descripcion:
      "Abiertas las inscripciones a los talleres extracurriculares del segundo semestre. Ver formulario en secretaría.",
    fecha: "2026-09-08",
    roles: ["estudiante", "docente", "administracion", "publico"],
    destacado: true,
  },
  {
    id: "4",
    titulo: "Pautas para la feria educativa",
    descripcion:
      "Docentes: se recuerdan las pautas de participación en la feria educativa del 18 de setiembre.",
    fecha: "2026-09-09",
    roles: ["docente", "administracion"],
    destacado: true,
  },
  {
    id: "5",
    titulo: "Cronograma de parciales - turno mañana",
    descripcion:
      "Se publica el cronograma actualizado de parciales de la primera etapa para todo el turno mañana.",
    fecha: "2026-09-05",
    roles: ["estudiante", "docente"],
    destacado: true,
  },
];

/** Últimos comunicados destacados para un rol, ordenados por fecha descendente. */
export function comunicadosDestacadosParaRol(
  rol: Rol,
  limite = 3
): Anuncio[] {
  return anuncios
    .filter((a) => !a.roles || a.roles.includes(rol))
    .filter((a) => a.destacado)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, limite);
}
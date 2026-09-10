/**
 * `src/data/novedades.ts`: datos mock de novedades de transporte
 * para informar a la comunidad sobre demoras o cambios.
 */
import type { Rol } from "@/lib/roles";

export type NovedadTransporte = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string; // ISO 8601
  tipo: "demora" | "cambio_ruta" | "suspension" | "otro";
  lineaId?: string; // Opcional: línea afectada
  prioridad: "baja" | "media" | "alta";
  /** Roles que pueden ver el aviso. Si falta, es visible para todos. */
  roles?: Rol[];
};

export const novedadesTransporte: NovedadTransporte[] = [
  {
    id: "nt1",
    titulo: "Demora en Línea 1 - Centro",
    descripcion:
      "Debido a obras en Av. 19 de Abril, la Línea 1 presenta demoras de aproximadamente 15 minutos en ambos sentidos.",
    fecha: "2026-09-07T08:30:00",
    tipo: "demora",
    lineaId: "l1",
    prioridad: "alta",
  },
  {
    id: "nt2",
    titulo: "Cambio de ruta temporal Línea 2",
    descripcion:
      "Por evento en Plaza Libertad, la Línea 2 - Liceo modifica su recorrido evitando la plaza. Parada alternativa en Av. Varela.",
    fecha: "2026-09-06T14:00:00",
    tipo: "cambio_ruta",
    lineaId: "l2",
    prioridad: "media",
  },
  {
    id: "nt3",
    titulo: "Suspensión parcial por paro de docentes",
    descripcion:
      "El servicio de Línea 3 se suspende entre las 12:00 y las 15:00 por movilización frente a la intendencia.",
    fecha: "2026-09-09T10:00:00",
    tipo: "suspension",
    lineaId: "l3",
    prioridad: "alta",
  },
  {
    id: "nt4",
    titulo: "Refuerzos para la feria educativa",
    descripcion:
      "Se agregan servicios de refuerzo en Línea 2 el 18 de setiembre para facilitar la llegada al liceo.",
    fecha: "2026-09-08T09:00:00",
    tipo: "otro",
    lineaId: "l2",
    prioridad: "baja",
  },
];

/** Últimos avisos visibles para un rol, ordenados por fecha descendente. */
export function avisosParaRol(rol: Rol, limite = 3): NovedadTransporte[] {
  return novedadesTransporte
    .filter((n) => !n.roles || n.roles.includes(rol))
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, limite);
}

// Función helper para agregar novedades (simula persistencia en memoria)
export function agregarNovedad(
  novedad: Omit<NovedadTransporte, "id">
): NovedadTransporte {
  const nuevaNovedad: NovedadTransporte = {
    ...novedad,
    id: `nt${Date.now()}`,
  };
  novedadesTransporte.unshift(nuevaNovedad);
  return nuevaNovedad;
}
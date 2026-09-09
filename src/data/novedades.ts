/**
 * `src/data/novedades.ts`: datos mock de novedades de transporte
 * para informar a la comunidad sobre demoras o cambios.
 */
export type NovedadTransporte = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string; // ISO 8601
  tipo: "demora" | "cambio_ruta" | "suspension" | "otro";
  lineaId?: string; // Opcional: línea afectada
  prioridad: "baja" | "media" | "alta";
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
];

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
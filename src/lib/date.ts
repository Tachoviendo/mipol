/**
 * `src/lib`: funciones utilitarias reutilizables, sin JSX, independientes de la UI.
 */
export function formatearFecha(fechaISO: string): string {
  return new Date(fechaISO).toLocaleDateString("es-UY", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatearHora(fechaISO: string): string {
  return new Date(fechaISO).toLocaleTimeString("es-UY", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatearFechaHora(fechaISO: string): string {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleString("es-UY", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

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

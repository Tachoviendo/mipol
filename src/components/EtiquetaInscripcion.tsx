import { estadoInscripcion } from "@/data/oferta";
import type { EstadoInscripcion, ProgramaOferta } from "@/data/oferta";
import { formatearFecha } from "@/lib/date";

const ESTILOS: Record<EstadoInscripcion, { etiqueta: string; clases: string }> = {
  abierta: {
    etiqueta: "Inscripción abierta",
    clases:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  "cierra-pronto": {
    etiqueta: "Cierra pronto",
    clases: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200",
  },
  cerrada: {
    etiqueta: "Inscripción cerrada",
    clases: "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
  },
};

/**
 * `src/components/EtiquetaInscripcion.tsx`: badge visual del estado de
 * inscripción de un programa (OE-08). "Abierta"/"cierra pronto" se derivan de
 * `fechaLimiteInscripcion` (ver `estadoInscripcion` en `src/data/oferta.ts`).
 */
export function EtiquetaInscripcion({
  programa,
  mostrarFecha = false,
}: {
  programa: ProgramaOferta;
  mostrarFecha?: boolean;
}) {
  const estado = estadoInscripcion(programa);
  const { etiqueta, clases } = ESTILOS[estado];
  const fecha = programa.fechaLimiteInscripcion;

  return (
    <span
      className={`inline-flex flex-shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium ${clases}`}
    >
      {etiqueta}
      {mostrarFecha && fecha && estado !== "cerrada" && (
        <span className="ml-1 font-normal opacity-80">
          · hasta el {formatearFecha(fecha)}
        </span>
      )}
    </span>
  );
}

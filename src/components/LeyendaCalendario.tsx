"use client";

import { type TipoEvento, colorPorTipo } from "@/data/eventos";

const ETIQUETAS: Record<TipoEvento, string> = {
  clase: "Clase",
  examen: "Examen",
  reunion: "Reunión",
  actividad: "Actividad",
  feriado: "Feriado",
  otro: "Otro",
};

const ORDEN: TipoEvento[] = [
  "clase",
  "examen",
  "reunion",
  "actividad",
  "feriado",
  "otro",
];

export function LeyendaCalendario() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400">
      <span className="font-medium">Leyenda:</span>
      {ORDEN.map((tipo) => (
        <span key={tipo} className="inline-flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: colorPorTipo(tipo) }}
            aria-hidden="true"
          />
          {ETIQUETAS[tipo]}
        </span>
      ))}
    </div>
  );
}

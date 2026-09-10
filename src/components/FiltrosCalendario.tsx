"use client";

import { type TipoEvento, colorPorTipo } from "@/data/eventos";

const ETIQUETAS: Record<TipoEvento, string> = {
  clase: "Clases",
  examen: "Exámenes",
  reunion: "Reuniones",
  actividad: "Actividades",
  feriado: "Feriados",
  otro: "Otros",
};

const ORDEN_FILTROS: TipoEvento[] = [
  "clase",
  "examen",
  "reunion",
  "actividad",
  "feriado",
  "otro",
];

type FiltrosCalendarioProps = {
  filtros: TipoEvento[];
  onChange: (filtros: TipoEvento[]) => void;
};

export function FiltrosCalendario({ filtros, onChange }: FiltrosCalendarioProps) {
  const toggleFiltro = (tipo: TipoEvento) => {
    if (filtros.includes(tipo)) {
      onChange(filtros.filter((f) => f !== tipo));
    } else {
      onChange([...filtros, tipo]);
    }
  };

  const limpiarFiltros = () => onChange([]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Filtrar:
      </span>
      {ORDEN_FILTROS.map((tipo) => {
        const activo = filtros.includes(tipo);
        const color = colorPorTipo(tipo);
        return (
          <button
            key={tipo}
            onClick={() => toggleFiltro(tipo)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activo
                ? "border-transparent text-white"
                : "border-black/[.08] bg-white text-zinc-600 hover:bg-zinc-100 dark:border-white/[.145] dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
            style={activo ? { backgroundColor: color } : undefined}
          >
            <span
              className={`h-2 w-2 rounded-full ${activo ? "bg-white/60" : ""}`}
              style={!activo ? { backgroundColor: color } : undefined}
              aria-hidden="true"
            />
            {ETIQUETAS[tipo]}
          </button>
        );
      })}
      {filtros.length > 0 && (
        <button
          onClick={limpiarFiltros}
          className="text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          Limpiar
        </button>
      )}
    </div>
  );
}

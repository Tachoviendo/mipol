import Link from "next/link";

import type { HiloForo } from "@/data/foros";
import { formatearFecha } from "@/lib/date";

export function HiloForoRow({
  hilo,
  categoriaNombre,
}: {
  hilo: HiloForo;
  categoriaNombre?: string;
}) {
  return (
    <Link
      href={`/foros/${hilo.categoriaId}/${hilo.id}`}
      className="grid gap-4 border-b border-zinc-200 px-5 py-5 transition hover:bg-emerald-50/60 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:grid-cols-[1fr_auto] sm:items-center"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          {categoriaNombre && (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
              {categoriaNombre}
            </span>
          )}
          {hilo.fijado && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
              Fijado
            </span>
          )}
          {hilo.cerrado && (
            <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-semibold text-zinc-700">
              Cerrado
            </span>
          )}
          <h2 className="font-semibold text-zinc-950">{hilo.titulo}</h2>
        </div>
        <p className="mt-2 text-sm text-zinc-600">
          Por {hilo.autor} · {hilo.cantidadRespuestas} {hilo.cantidadRespuestas === 1 ? "respuesta" : "respuestas"}
        </p>
      </div>
      <time
        dateTime={hilo.ultimaActividad}
        className="text-sm text-zinc-500 sm:text-right"
      >
        {formatearFecha(hilo.ultimaActividad)}
      </time>
    </Link>
  );
}
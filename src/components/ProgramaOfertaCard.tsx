import Link from "next/link";
import {
  ETIQUETAS_AREA,
  ETIQUETAS_MODALIDAD,
  ETIQUETAS_TURNO,
} from "@/data/oferta";
import type { ProgramaOferta } from "@/data/oferta";

/**
 * `src/components/ProgramaOfertaCard.tsx`: tarjeta de un programa/cursos
 * del catálogo de oferta educativa.
 */
export function ProgramaOfertaCard({ programa }: { programa: ProgramaOferta }) {
  const esTerciaria = programa.tipo === "terciaria";

  return (
    <article className="flex flex-col rounded-lg border border-black/[.08] bg-white p-5 shadow-sm transition-colors hover:bg-zinc-50 dark:border-white/[.145] dark:bg-white/[.04] dark:hover:bg-white/[.03]">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold leading-snug text-zinc-950 dark:text-zinc-50">
          {programa.nombre}
        </h2>
        <span
          className={`flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            esTerciaria
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          }`}
        >
          {esTerciaria ? "Oferta terciaria" : "Oferta interna"}
        </span>
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {programa.descripcion}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-medium text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300">
          {ETIQUETAS_AREA[programa.area]}
        </span>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-medium text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300">
          {ETIQUETAS_MODALIDAD[programa.modalidad]}
        </span>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-medium text-zinc-600 dark:bg-white/[.08] dark:text-zinc-300">
          {ETIQUETAS_TURNO[programa.turno]}
        </span>
      </div>

      <dl className="mt-4 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
        <div className="flex items-center justify-between gap-2">
          <dt className="text-zinc-500 dark:text-zinc-400">Duración</dt>
          <dd>{programa.duracion}</dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-zinc-500 dark:text-zinc-400">Cupos</dt>
          <dd>{programa.cupos > 0 ? programa.cupos : "Ilimitados"}</dd>
        </div>
      </dl>

      <Link
        href={`/oferta/${programa.id}`}
        className="mt-5 inline-flex items-center justify-center rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500"
      >
        Ver programa
      </Link>
    </article>
  );
}

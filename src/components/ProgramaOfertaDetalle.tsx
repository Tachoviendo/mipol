import Link from "next/link";

import {
  ETIQUETAS_AREA,
  ETIQUETAS_MODALIDAD,
  ETIQUETAS_TURNO,
} from "@/data/oferta";
import type { ProgramaOferta } from "@/data/oferta";
import { anuncios } from "@/data/ejemplo";
import { EtiquetaInscripcion } from "@/components/EtiquetaInscripcion";
import { formatearFecha } from "@/lib/date";

/**
 * `src/components/ProgramaOfertaDetalle.tsx`: detalle completo de un
 * programa/curso de la oferta educativa.
 */
export function ProgramaOfertaDetalle({
  programa,
}: {
  programa: ProgramaOferta;
}) {
  const esTerciaria = programa.tipo === "terciaria";
  const comunicado = programa.comunicadoId
    ? anuncios.find((a) => a.id === programa.comunicadoId)
    : undefined;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              esTerciaria
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            }`}
          >
            {esTerciaria ? "Oferta terciaria" : "Oferta interna"}
          </span>
          <EtiquetaInscripcion programa={programa} mostrarFecha />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          {programa.nombre}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          {programa.descripcion}
        </p>

        <div className="flex flex-wrap gap-1.5 text-xs">
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
      </div>

      <dl className="flex flex-col gap-4">
        <div className="rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 p-4">
          <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Duración
          </dt>
          <dd className="mt-1 text-black dark:text-zinc-50">
            {programa.duracion}
          </dd>
        </div>

        <div className="rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 p-4">
          <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Modalidad
          </dt>
          <dd className="mt-1 text-black dark:text-zinc-50">
            {ETIQUETAS_MODALIDAD[programa.modalidad]}
          </dd>
        </div>

        <div className="rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 p-4">
          <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Turno
          </dt>
          <dd className="mt-1 text-black dark:text-zinc-50">
            {ETIQUETAS_TURNO[programa.turno]}
          </dd>
        </div>

        <div className="rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 p-4">
          <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Cupos
          </dt>
          <dd className="mt-1 text-black dark:text-zinc-50">
            {programa.cupos > 0 ? programa.cupos : "Ilimitados"}
          </dd>
        </div>

        {programa.fechaLimiteInscripcion && (
          <div className="rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 p-4">
            <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Cierre de inscripción
            </dt>
            <dd className="mt-1 text-black dark:text-zinc-50">
              {formatearFecha(programa.fechaLimiteInscripcion)}
            </dd>
          </div>
        )}

        <div className="rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 p-4">
          <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Requisitos
          </dt>
          <dd className="mt-1 text-black dark:text-zinc-50">
            {programa.requisitos}
          </dd>
        </div>

        <section className="rounded-xl border border-brand-200 bg-brand-50 p-5 dark:border-brand-800 dark:bg-brand-950/30">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-800 dark:text-brand-300">
            ¿Cómo inscribirme?
          </h2>
          <p className="mt-2 text-black dark:text-zinc-50">
            {programa.contactoInscripcion}
          </p>
        </section>
      </dl>

      {comunicado && (
        <section className="rounded-xl border border-black/[.08] bg-white p-5 dark:border-white/[.145] dark:bg-white/[.04]">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Comunicado oficial
          </h2>
          <h3 className="mt-2 text-lg font-semibold text-black dark:text-zinc-50">
            {comunicado.titulo}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {comunicado.descripcion}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <time dateTime={comunicado.fecha}>
              {formatearFecha(comunicado.fecha)}
            </time>
            <Link
              href="/anuncios"
              className="text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
            >
              Ver todos los comunicados →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
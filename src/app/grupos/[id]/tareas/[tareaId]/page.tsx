import Link from "next/link";
import { notFound } from "next/navigation";

import { entregarTareaAction } from "@/app/grupos/actions";
import {
  etiquetaEstadoTarea,
  esMiembroDe,
  obtenerGrupo,
  obtenerTarea,
  usuarioSimuladoDeRol,
  type EstadoTarea,
} from "@/data/grupos";
import { formatearFecha, formatearFechaHora } from "@/lib/date";
import { obtenerRolActual } from "@/lib/rol-actual";
import { puedeEntregarTareas, puedeVerGrupos } from "@/lib/roles";

const ESTILO_ESTADO: Record<EstadoTarea, string> = {
  pendiente:
    "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-600/50 dark:bg-amber-900/30 dark:text-amber-200",
  entregada:
    "border-sky-300 bg-sky-50 text-sky-800 dark:border-sky-600/50 dark:bg-sky-900/30 dark:text-sky-200",
  calificada:
    "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-600/50 dark:bg-emerald-900/30 dark:text-emerald-200",
};

function leerEstadoFaltante(fechaEntrega: string, estado: EstadoTarea): string | null {
  if (estado !== "pendiente") return null;
  const ms = new Date(fechaEntrega).getTime() - Date.now();
  if (ms < 0) return "Vencida";
  const dias = Math.ceil(ms / 86_400_000);
  return dias === 0 ? "Vence hoy" : dias === 1 ? "Vence mañana" : `Faltan ${dias} días`;
}

export default async function TareaDetallePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; tareaId: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id, tareaId } = await params;
  const { error } = await searchParams;
  const grupo = obtenerGrupo(id);
  const tarea = obtenerTarea(tareaId);
  if (!grupo || !tarea || tarea.grupoId !== id) notFound();

  const rolActual = await obtenerRolActual();
  if (!puedeVerGrupos(rolActual)) notFound();

  const necesidad = leerEstadoFaltante(tarea.fechaEntrega, tarea.estado);
  const puedeEntregar = puedeEntregarTareas(rolActual) && tarea.estado === "pendiente";
  const esMiembro = esMiembroDe(grupo.id, usuarioSimuladoDeRol(rolActual));

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black sm:px-10 sm:py-16">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <header>
          <Link
            href={`/grupos/${grupo.id}/tareas`}
            className="text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
          >
            ← Volver a las tareas
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
            {grupo.materia} · {grupo.curso}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {tarea.titulo}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-sm font-semibold ${ESTILO_ESTADO[tarea.estado]}`}
            >
              {etiquetaEstadoTarea(tarea.estado)}
            </span>
            {tarea.estado === "calificada" && typeof tarea.nota === "number" && (
              <span
                className={`rounded-full border px-3 py-1 text-sm font-semibold ${
                  tarea.nota >= 7
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-600/50 dark:bg-emerald-900/30 dark:text-emerald-200"
                    : "border-red-300 bg-red-50 text-red-800 dark:border-red-600/50 dark:bg-red-900/30 dark:text-red-200"
                }`}
              >
                Nota: {tarea.nota}
              </span>
            )}
            {necesidad && (
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                {necesidad}
              </span>
            )}
          </div>
        </header>

        {error && (
          <p
            role="status"
            className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            No se pudo completar la acción: revisá los datos e intentá de nuevo.
          </p>
        )}

        <section aria-labelledby="datos-heading" className="grid gap-4 sm:grid-cols-3">
          <h2 id="datos-heading" className="sr-only">
            Datos de la tarea
          </h2>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Fecha límite
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {formatearFechaHora(tarea.fechaEntrega)}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Publicada
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {formatearFecha(tarea.fechaCreacion)}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Estado
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {etiquetaEstadoTarea(tarea.estado)}
              {tarea.entregadaEn && ` · ${formatearFecha(tarea.entregadaEn)}`}
            </p>
          </div>
        </section>

        <section aria-labelledby="consigna-heading" className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]">
          <h2 id="consigna-heading" className="text-lg font-semibold">
            Consigna
          </h2>
          <div className="mt-4 whitespace-pre-line text-sm leading-7 text-zinc-700 dark:text-zinc-300">
            {tarea.consigna}
          </div>
        </section>

        {tarea.estado === "pendiente" && !esMiembro && (
          <p className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 dark:border-white/[.145] dark:bg-white/[.04]">
            No sos miembro de este grupo; podés ver la consigna en modo de solo
            lectura.
          </p>
        )}

        {tarea.estado === "pendiente" && esMiembro && !puedeEntregar && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]">
            <p>Solo estudiantes pueden marcar una tarea como entregada.</p>
          </div>
        )}

        {puedeEntregar && esMiembro && (
          <section aria-labelledby="entrega-heading" className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]">
            <h2 id="entrega-heading" className="text-lg font-semibold">
              Entregar tarea
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              ¿Terminaste tu trabajo? Confirmá la entrega para que el docente
              pueda corregirlo. Podés hacerlo una sola vez.
            </p>
            <form action={entregarTareaAction} className="mt-4">
              <input type="hidden" name="grupoId" value={grupo.id} />
              <input type="hidden" name="tareaId" value={tarea.id} />
              <button
                type="submit"
                className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Marcar como entregada
              </button>
            </form>
          </section>
        )}

        {tarea.estado !== "pendiente" && (
          <section
            aria-labelledby="entregado-heading"
            className="rounded-2xl border border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-600/50 dark:bg-emerald-900/30"
          >
            <h2 id="entregado-heading" className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
              Entrega confirmada
            </h2>
            <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-200">
              Esta tarea está{" "}
              {tarea.estado === "entregada" ? "entregada" : "calificada"}
              {tarea.entregadaEn
                ? ` desde el ${formatearFecha(tarea.entregadaEn)}`
                : ""}
              {tarea.estado === "calificada" && typeof tarea.nota === "number"
                ? ` con una nota de ${tarea.nota}.`
                : "."}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
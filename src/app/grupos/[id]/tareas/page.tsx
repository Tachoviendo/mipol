import Link from "next/link";
import { notFound } from "next/navigation";

import {
  etiquetaEstadoTarea,
  obtenerGrupo,
  obtenerTareasDeGrupo,
  type EstadoTarea,
} from "@/data/grupos";
import { formatearFechaHora } from "@/lib/date";
import { obtenerRolActual } from "@/lib/rol-actual";
import { puedeVerGrupos } from "@/lib/roles";

const ESTILO_ESTADO: Record<EstadoTarea, string> = {
  pendiente:
    "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-600/50 dark:bg-amber-900/30 dark:text-amber-200",
  entregada:
    "border-sky-300 bg-sky-50 text-sky-800 dark:border-sky-600/50 dark:bg-sky-900/30 dark:text-sky-200",
  calificada:
    "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-600/50 dark:bg-emerald-900/30 dark:text-emerald-200",
};

export default async function GrupoTareasPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const grupo = obtenerGrupo(id);
  if (!grupo) notFound();

  const rolActual = await obtenerRolActual();
  if (!puedeVerGrupos(rolActual)) notFound();

  const tareas = obtenerTareasDeGrupo(grupo.id);
  const tareasPendientes = tareas.filter((t) => t.estado === "pendiente").length;

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black sm:px-10 sm:py-16">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <header>
          <Link
            href={`/grupos/${grupo.id}`}
            className="text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
          >
            ← Volver al muro del grupo
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
            {grupo.materia} · {grupo.curso}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Tareas
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Elegí una tarea para leer la consigna completa y marcar tu entrega.
          </p>

          <nav aria-label="Secciones del grupo" className="mt-6 flex flex-wrap gap-2">
            <Link
              href={`/grupos/${grupo.id}`}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-white/[.2] dark:text-zinc-200 dark:hover:bg-white/[.06]"
            >
              Muro
            </Link>
            <Link
              href={`/grupos/${grupo.id}/materiales`}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-white/[.2] dark:text-zinc-200 dark:hover:bg-white/[.06]"
            >
              Materiales
            </Link>
            <span className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white">
              Tareas ({tareasPendientes} pendientes)
            </span>
          </nav>
        </header>

        {error && (
          <p
            role="status"
            className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            No se pudo completar la acción: revisá los datos e intentá de nuevo.
          </p>
        )}

        <section aria-labelledby="tareas-heading">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <h2 id="tareas-heading" className="text-lg font-semibold">
              Todas las tareas
            </h2>
            <p className="text-sm text-zinc-500">
              Ordenadas por próxima fecha de entrega
            </p>
          </div>

          {tareas.length === 0 ? (
            <p className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 dark:border-white/[.145] dark:bg-white/[.04]">
              Todavía no hay tareas en este grupo.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {tareas.map((tarea) => (
                <li key={tarea.id}>
                  <Link
                    href={`/grupos/${grupo.id}/tareas/${tarea.id}`}
                    className="group block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md dark:border-white/[.145] dark:bg-white/[.04] dark:hover:border-brand-700"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold group-hover:text-brand-800 dark:group-hover:text-brand-200">
                            {tarea.titulo}
                          </h3>
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${ESTILO_ESTADO[tarea.estado]}`}
                          >
                            {etiquetaEstadoTarea(tarea.estado)}
                          </span>
                          {tarea.estado === "calificada" &&
                            typeof tarea.nota === "number" && (
                              <span className="rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:border-emerald-600/50 dark:bg-emerald-900/30 dark:text-emerald-200">
                                Nota: {tarea.nota}
                              </span>
                            )}
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                          {tarea.consigna}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm text-zinc-500 sm:w-40">
                        <span className="block font-medium text-zinc-700 dark:text-zinc-300">
                          Entrega:{" "}
                        </span>
                        {formatearFechaHora(tarea.fechaEntrega)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
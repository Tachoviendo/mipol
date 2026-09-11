import Link from "next/link";
import { notFound } from "next/navigation";

import { entregarTareaAction } from "@/app/grupos/actions";
import {
  ESTADOS_TAREA,
  etiquetaEstadoTarea,
  obtenerGrupo,
  obtenerTareasDeGrupo,
  nombreDeUsuario,
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

function leerEstadoFaltante(tarea: { estado: EstadoTarea; fechaEntrega: string }): string | null {
  if (tarea.estado !== "pendiente") return null;
  const ms = new Date(tarea.fechaEntrega).getTime() - Date.now();
  if (ms < 0) return "Vencida";
  const dias = Math.ceil(ms / 86_400_000);
  return dias === 0 ? "Vence hoy" : dias === 1 ? "Vence mañana" : `Faltan ${dias} días`;
}

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
  const puedeEntregar = puedeEntregarTareas(rolActual);
  const usuarioId = usuarioSimuladoDeRol(rolActual);

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
            Conocé las tareas del grupo, sus fechas de entrega y el estado de
            cada una para organizarte y no perder plazos.
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
              {tareas.map((tarea) => {
                const estadoFaltante = leerEstadoFaltante(tarea);
                const esDocente = tarea.docenteId === usuarioId;
                return (
                  <li
                    key={tarea.id}
                    className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                            {tarea.titulo}
                          </h3>
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${ESTILO_ESTADO[tarea.estado]}`}
                          >
                            {etiquetaEstadoTarea(tarea.estado)}
                          </span>
                          {tarea.estado === "calificada" &&
                            typeof tarea.nota === "number" && (
                              <span
                                className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                                  tarea.nota >= 7
                                    ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-600/50 dark:bg-emerald-900/30 dark:text-emerald-200"
                                    : "border-red-300 bg-red-50 text-red-800 dark:border-red-600/50 dark:bg-red-900/30 dark:text-red-200"
                                }`}
                              >
                                Nota: {tarea.nota}
                              </span>
                            )}
                        </div>
                        {tarea.descripcion && (
                          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                            {tarea.descripcion}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 sm:w-44">
                        <p className="text-sm text-zinc-500">
                          <span className="block font-medium text-zinc-700 dark:text-zinc-300">
                            Entrega:{""}
                          </span>
                          <span className="block">{formatearFechaHora(tarea.fechaEntrega)}</span>
                        </p>
                        {estadoFaltante && (
                          <p className="mt-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                            {estadoFaltante}
                          </p>
                        )}
                        {tarea.estado !== "pendiente" && tarea.entregadaEn && (
                          <p className="mt-1 text-xs text-zinc-500">
                            Entregada el {formatearFecha(tarea.entregadaEn)}
                          </p>
                        )}
                      </div>
                    </div>

                    {tarea.estado === "pendiente" && puedeEntregar && (
                      <form action={entregarTareaAction} className="mt-4 border-t border-zinc-100 pt-4 dark:border-white/[.08]">
                        <input type="hidden" name="grupoId" value={grupo.id} />
                        <input type="hidden" name="tareaId" value={tarea.id} />
                        <button
                          type="submit"
                          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                        >
                          Marcar como entregada
                        </button>
                      </form>
                    )}

                    {esDocente && (
                      <p className="mt-3 text-xs text-zinc-500">
                        Evaluador: {nombreDeUsuario(tarea.docenteId)}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section aria-labelledby="estados-heading">
          <h2 id="estados-heading" className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Estados de una tarea
          </h2>
          <ul className="flex flex-wrap gap-2">
            {ESTADOS_TAREA.map((estado) => (
              <li key={estado.valor} className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/[.2] dark:bg-white/[.04] dark:text-zinc-300">
                {estado.etiqueta}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
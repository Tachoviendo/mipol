import Link from "next/link";
import { notFound } from "next/navigation";

import { comentarPublicacionAction, publicarEnGrupoAction } from "@/app/grupos/actions";
import {
  esMiembroDe,
  obtenerComentariosDePublicacion,
  obtenerGrupo,
  obtenerMaterialesDeGrupo,
  obtenerMiembros,
  obtenerPublicacionesDeGrupo,
  obtenerTareasDeGrupo,
  nombreDeUsuario,
  usuarioPorId,
  usuarioSimuladoDeRol,
} from "@/data/grupos";
import { formatearFechaHora } from "@/lib/date";
import { obtenerRolActual } from "@/lib/rol-actual";
import { puedeComentarEnGrupos, puedeCrearGrupos } from "@/lib/roles";

export default async function GrupoMuroPage({
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
  const usuarioId = usuarioSimuladoDeRol(rolActual);
  const esMiembro = esMiembroDe(grupo.id, usuarioId);
  const puedePublicar = puedeCrearGrupos(rolActual) && esMiembro;
  const puedeComentar = puedeComentarEnGrupos(rolActual) && esMiembro;

  const publicaciones = obtenerPublicacionesDeGrupo(grupo.id);
  const miembros = obtenerMiembros(grupo.id);
  const cantidadMateriales = obtenerMaterialesDeGrupo(grupo.id).length;
  const tareas = obtenerTareasDeGrupo(grupo.id);
  const tareasPendientes = tareas.filter((t) => t.estado === "pendiente").length;

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black sm:px-10 sm:py-16">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <header>
          <Link
            href="/grupos"
            className="text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
          >
            ← Volver a los grupos
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
            {grupo.materia} · {grupo.curso}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {grupo.nombre}
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {grupo.descripcion}
          </p>
          <p className="mt-3 text-sm text-zinc-500">
            Docente:{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {nombreDeUsuario(grupo.docenteId)}
            </span>{" "}
            · {miembros.length} estudiantes
          </p>

          <nav aria-label="Secciones del grupo" className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white">
              Muro
            </span>
            <Link
              href={`/grupos/${grupo.id}/materiales`}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-white/[.2] dark:text-zinc-200 dark:hover:bg-white/[.06]"
            >
              Materiales ({cantidadMateriales})
            </Link>
            <Link
              href={`/grupos/${grupo.id}/tareas`}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-white/[.2] dark:text-zinc-200 dark:hover:bg-white/[.06]"
            >
              Tareas ({tareasPendientes} pendientes)
            </Link>
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

        {puedePublicar && (
          <section
            aria-labelledby="publicar-heading"
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <h2 id="publicar-heading" className="text-lg font-semibold">
              Publicar en el muro
            </h2>
            <form action={publicarEnGrupoAction} className="mt-4 flex flex-col gap-3">
              <input type="hidden" name="grupoId" value={grupo.id} />
              <label htmlFor="contenido-publicar" className="sr-only">
                Contenido de la publicación
              </label>
              <textarea
                id="contenido-publicar"
                name="contenido"
                required
                maxLength={4000}
                rows={3}
                placeholder="Escribí una novedad para el curso..."
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
              />
              <button
                type="submit"
                className="self-end rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Publicar
              </button>
            </form>
          </section>
        )}

        {!esMiembro && (
          <p className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 dark:border-white/[.145] dark:bg-white/[.04]">
            Sos miembro de esta comunidad educativa pero todavía no participás de
            este grupo; podés verlo en modo de solo lectura.
          </p>
        )}

        <section aria-labelledby="muro-heading">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 id="muro-heading" className="text-lg font-semibold">
              Muro del grupo
            </h2>
            <span className="text-sm text-zinc-500">
              {publicaciones.length}{" "}
              {publicaciones.length === 1 ? "publicación" : "publicaciones"}
            </span>
          </div>

          {publicaciones.length === 0 ? (
            <p className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 dark:border-white/[.145] dark:bg-white/[.04]">
              Todavía no hay publicaciones en este grupo.
            </p>
          ) : (
            <ul className="flex flex-col gap-6">
              {publicaciones.map((publicacion) => {
                const comentarios = obtenerComentariosDePublicacion(publicacion.id);
                const esDelUsuario = publicacion.autorId === usuarioId;
                return (
                  <li
                    key={publicacion.id}
                    className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/[.145] dark:bg-white/[.04]"
                  >
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                          {esDelUsuario ? "Vos" : nombreDeUsuario(publicacion.autorId)}
                          <span className="ml-2 text-xs font-normal text-zinc-400">
                            {usuarioPorId(publicacion.autorId)?.rol ?? ""}
                          </span>
                        </p>
                        <time
                          dateTime={publicacion.fecha}
                          className="shrink-0 text-xs text-zinc-400"
                        >
                          {formatearFechaHora(publicacion.fecha)}
                        </time>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                        {publicacion.contenido}
                      </p>
                    </div>

                    {comentarios.length > 0 && (
                      <div className="border-t border-zinc-100 bg-zinc-50/70 px-5 py-4 dark:border-white/[.08] dark:bg-white/[.02]">
                        <ul className="flex flex-col gap-3">
                          {comentarios.map((comentario) => {
                            const esComentarioDelUsuario =
                              comentario.autorId === usuarioId;
                            return (
                              <li key={comentario.id} className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                    {esComentarioDelUsuario
                                      ? "Vos"
                                      : nombreDeUsuario(comentario.autorId)}
                                  </span>
                                  <time
                                    dateTime={comentario.fecha}
                                    className="text-xs text-zinc-400"
                                  >
                                    {formatearFechaHora(comentario.fecha)}
                                  </time>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                  {comentario.contenido}
                                </p>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    {puedeComentar && (
                      <div className="border-t border-zinc-100 px-5 py-4 dark:border-white/[.08]">
                        <form
                          action={comentarPublicacionAction}
                          className="flex items-center gap-2"
                        >
                          <input type="hidden" name="grupoId" value={grupo.id} />
                          <input
                            type="hidden"
                            name="publicacionId"
                            value={publicacion.id}
                          />
                          <label htmlFor={`comentario-${publicacion.id}`} className="sr-only">
                            Comentar esta publicación
                          </label>
                          <input
                            id={`comentario-${publicacion.id}`}
                            name="contenido"
                            required
                            maxLength={4000}
                            placeholder="Agregá un comentario..."
                            className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                          />
                          <button
                            type="submit"
                            className="shrink-0 rounded-lg border border-brand-600 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-900/30"
                          >
                            Comentar
                          </button>
                        </form>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
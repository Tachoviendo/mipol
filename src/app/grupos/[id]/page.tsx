import Link from "next/link";

import {
  comentarPublicacionAction,
  LIMITE_CONTENIDO,
  publicarEnGrupoAction,
} from "@/app/grupos/actions";
import {
  nombreDeUsuario,
  obtenerComentariosDePublicacion,
  obtenerGrupo,
  obtenerPublicacionesDeGrupo,
  obtenerTareasDeGrupo,
  usuarioPorId,
} from "@/data/grupos";
import { formatearFechaHora } from "@/lib/date";
import { obtenerRolActual } from "@/lib/rol-actual";
import { puedeCrearGrupos, puedeVerGrupos } from "@/lib/roles";

export default async function GrupoDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id: grupoId } = await params;
  const { error } = await searchParams;
  const rolActual = await obtenerRolActual();

  if (!puedeVerGrupos(rolActual)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6 py-12">
        <p className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
          Acceso restringido.
        </p>
      </div>
    );
  }

  const grupo = obtenerGrupo(grupoId);
  if (!grupo) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6 py-12">
        <div className="max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center">
          <h1 className="text-xl font-semibold">Grupo no encontrado</h1>
          <p className="mt-2 text-sm text-zinc-600">No existe un grupo con ese identificador.</p>
          <Link
            href="/grupos"
            className="mt-6 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Volver a Grupos
          </Link>
        </div>
      </div>
    );
  }

  const publicaciones = obtenerPublicacionesDeGrupo(grupoId);
  const tareas = obtenerTareasDeGrupo(grupoId);
  const pendientes = tareas.filter(
    (tarea) => tarea.entregas.some((e) => e.estado === "pendiente"),
  ).length;

  const tabs = [
    { href: `/grupos/${grupoId}`, etiqueta: "Muro", activa: true },
    {
      href: `/grupos/${grupoId}/tareas`,
      etiqueta: `Tareas (${pendientes})`,
      activa: false,
    },
    {
      href: `/grupos/${grupoId}/materiales`,
      etiqueta: "Materiales",
      activa: false,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black sm:px-10 sm:py-16">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header>
          <Link
            href="/grupos"
            className="text-sm font-medium text-brand-700 hover:underline"
          >
            ← Volver a Grupos
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
            {grupo.materia} · {grupo.curso}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {grupo.nombre}
          </h1>
          {grupo.descripcion && (
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
              {grupo.descripcion}
            </p>
          )}
        </header>

        <nav aria-label="Secciones del grupo" className="flex gap-2 border-b border-zinc-200 pb-4">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={tab.activa ? "page" : undefined}
              className={
                tab.activa
                  ? "rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
                  : "rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:border-white/[.145] dark:text-zinc-400 dark:hover:bg-white/[.06]"
              }
            >
              {tab.etiqueta}
            </Link>
          ))}
        </nav>

        {error && (
          <p
            role="status"
            className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            No se pudo completar la acción: revisá los datos e intentá de nuevo.
          </p>
        )}

        {puedeCrearGrupos(rolActual) && (
          <section
            aria-labelledby="publicar-heading"
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]"
          >
            <h2 id="publicar-heading" className="text-lg font-semibold">
              Publicar novedad
            </h2>
            <form action={publicarEnGrupoAction} className="mt-4 flex flex-col gap-3">
              <input type="hidden" name="grupoId" value={grupo.id} />
              <textarea
                name="contenido"
                required
                maxLength={LIMITE_CONTENIDO}
                rows={3}
                placeholder="Escribí una novedad para el grupo…"
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

        <section aria-labelledby="muro-heading">
          <h2 id="muro-heading" className="mb-4 text-lg font-semibold">
            Muro
          </h2>
          {publicaciones.length === 0 ? (
            <p className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 dark:border-white/[.145] dark:bg-white/[.04]">
              Todavía no hay publicaciones en este grupo.
            </p>
          ) : (
            <ul className="flex flex-col gap-5">
              {publicaciones.map((publicacion) => {
                const autor = usuarioPorId(publicacion.autorId);
                const comentarios = obtenerComentariosDePublicacion(publicacion.id);
                return (
                  <li
                    key={publicacion.id}
                    className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]"
                  >
                    <div className="flex items-start gap-3">
                      {autor?.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={autor.avatar}
                          alt=""
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
                          {nombreDeUsuario(publicacion.autorId).charAt(0)}
                        </span>
                      )}
                      <div>
                        <p className="text-sm font-semibold">
                          {nombreDeUsuario(publicacion.autorId)}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {formatearFechaHora(publicacion.fecha)}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 whitespace-pre-line text-sm leading-6 text-zinc-800 dark:text-zinc-200">
                      {publicacion.contenido}
                    </p>

                    {comentarios.length > 0 && (
                      <ul className="mt-4 flex flex-col gap-3 rounded-xl bg-zinc-50 p-4 dark:bg-white/[.03]">
                        {comentarios.map((comentario) => (
                          <li key={comentario.id}>
                            <p className="text-sm">
                              <span className="font-semibold">
                                {nombreDeUsuario(comentario.autorId)}
                              </span>
                              <span className="text-xs text-zinc-500">
                                {" "}· {formatearFechaHora(comentario.fecha)}
                              </span>
                            </p>
                            <p className="mt-1 whitespace-pre-line text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                              {comentario.contenido}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}

                    <form action={comentarPublicacionAction} className="mt-4 flex gap-2">
                      <input type="hidden" name="grupoId" value={grupo.id} />
                      <input type="hidden" name="publicacionId" value={publicacion.id} />
                      <input
                        type="text"
                        name="contenido"
                        required
                        maxLength={LIMITE_CONTENIDO}
                        placeholder="Escribí un comentario…"
                        className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                      />
                      <button
                        type="submit"
                        className="rounded-lg border border-brand-600 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                      >
                        Comentar
                      </button>
                    </form>
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
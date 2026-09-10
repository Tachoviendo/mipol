import Link from "next/link";
import { notFound } from "next/navigation";

import {
  calificarEntregaAction,
  crearTareaAction,
  entregarTareaAction,
  publicarEnGrupoAction,
  unirseAGrupoAction,
} from "@/app/grupos/actions";
import {
  esDocenteDe,
  esMiembroDe,
  obtenerEntregasDeTarea,
  obtenerGrupo,
  obtenerMaterialesDeGrupo,
  obtenerMiembros,
  obtenerPublicacionesDeGrupo,
  obtenerTareasDeGrupo,
  nombreDeUsuario,
  usuarioSimuladoDeRol,
} from "@/data/grupos";
import { formatearFecha } from "@/lib/date";
import { obtenerRolActual } from "@/lib/rol-actual";
import { puedeParticiparEnGrupos } from "@/lib/roles";

const ETIQUETA_TIPO_MATERIAL: Record<string, string> = {
  guia: "Guía",
  apunte: "Apunte",
  presentacion: "Presentación",
  video: "Video",
  ejercicios: "Ejercicios",
};

const ETIQUETA_ESTADO: Record<string, string> = {
  pendiente: "Pendiente",
  entregada: "Entregada",
  calificada: "Calificada",
};

const COLOR_ESTADO: Record<string, string> = {
  pendiente: "bg-zinc-100 text-zinc-600",
  entregada: "bg-amber-100 text-amber-800",
  calificada: "bg-green-100 text-green-800",
};

export default async function GrupoDetallePage({
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
  const puedeParticipar = puedeParticiparEnGrupos(rolActual) && esMiembro;

  const publicaciones = obtenerPublicacionesDeGrupo(grupo.id);
  const tareas = obtenerTareasDeGrupo(grupo.id);
  const materiales = obtenerMaterialesDeGrupo(grupo.id);
  const miembros = obtenerMiembros(grupo.id);
  const esDocenteDelGrupo = esDocenteDe(grupo.id, usuarioId);

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black sm:px-10 sm:py-16">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-10">
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
        </header>

        {error && (
          <p
            role="status"
            className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            No se pudo completar la acción: revisá los datos e intentá de nuevo.
          </p>
        )}

        {!esMiembro && rolActual === "estudiante" && (
          <section className="rounded-2xl border border-brand-200 bg-brand-50 p-6 dark:border-brand-900/30 dark:bg-brand-900/20">
            <h2 className="text-lg font-semibold text-brand-800 dark:text-brand-200">
              ¿Querés participar de este grupo?
            </h2>
            <p className="mt-1 text-sm text-brand-700 dark:text-brand-300">
              Unite para ver materiales, tareas y publicaciones.
            </p>
            <form action={unirseAGrupoAction} className="mt-3">
              <input type="hidden" name="grupoId" value={grupo.id} />
              <button
                type="submit"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Unirme al grupo
              </button>
            </form>
          </section>
        )}

        {!puedeParticipar && rolActual !== "estudiante" && (
          <p className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
            Estás viendo este grupo en modo de solo lectura.
          </p>
        )}

        {puedeParticipar && (
          <section
            aria-labelledby="publicar-heading"
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <h2 id="publicar-heading" className="text-lg font-semibold">
              Publicar en el grupo
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
                placeholder="Escribí un mensaje para el grupo..."
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

        {esDocenteDelGrupo && (
          <section
            aria-labelledby="nueva-tarea-heading"
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <h2 id="nueva-tarea-heading" className="text-lg font-semibold">
              Crear una tarea
            </h2>
            <form action={crearTareaAction} className="mt-4 grid gap-3">
              <input type="hidden" name="grupoId" value={grupo.id} />
              <label className="flex flex-col gap-1 text-sm text-zinc-600">
                Título
                <input
                  name="titulo"
                  required
                  maxLength={100}
                  placeholder="Práctica: funciones lineales"
                  className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-zinc-600">
                Descripción
                <textarea
                  name="descripcion"
                  maxLength={1000}
                  rows={2}
                  placeholder="Qué incluye la tarea..."
                  className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-zinc-600">
                Fecha de entrega
                <input
                  name="fechaEntrega"
                  type="datetime-local"
                  required
                  className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                />
              </label>
              <button
                type="submit"
                className="justify-self-end rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Crear tarea
              </button>
            </form>
          </section>
        )}

        <section aria-labelledby="publicaciones-heading">
          <h2 id="publicaciones-heading" className="mb-4 text-lg font-semibold">
            Publicaciones
          </h2>
          {publicaciones.length === 0 ? (
            <p className="text-sm text-zinc-500">Todavía no hay publicaciones.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {publicaciones.map((publicacion) => (
                <li
                  key={publicacion.id}
                  className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]"
                >
                  <p className="text-sm leading-6 text-zinc-800 dark:text-zinc-200">
                    {publicacion.contenido}
                  </p>
                  <p className="mt-3 text-xs text-zinc-500">
                    {publicacion.autorId === usuarioId
                      ? "Vos"
                      : nombreDeUsuario(publicacion.autorId)}{" "}
                    · <time dateTime={publicacion.fecha}>{formatearFecha(publicacion.fecha)}</time>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="tareas-heading">
          <h2 id="tareas-heading" className="mb-4 text-lg font-semibold">
            Tareas
          </h2>
          {tareas.length === 0 ? (
            <p className="text-sm text-zinc-500">No hay tareas en este grupo.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {tareas.map((tarea) => {
                const entrega =
                  rolActual === "estudiante"
                    ? obtenerEntregasDeTarea(tarea.id).find(
                        (e) => e.estudianteId === usuarioId,
                      )
                    : undefined;
                const entregas =
                  rolActual !== "estudiante"
                    ? obtenerEntregasDeTarea(tarea.id)
                    : [];
                return (
                  <li
                    key={tarea.id}
                    className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]"
                  >
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                        {tarea.titulo}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {tarea.descripcion}
                      </p>
                      <p className="text-xs text-zinc-500">
                        Entrega:{" "}
                        <time dateTime={tarea.fechaEntrega}>
                          {formatearFecha(tarea.fechaEntrega)}
                        </time>
                      </p>
                    </div>

                    {rolActual === "estudiante" && puedeParticipar && (
                      <div className="flex flex-wrap items-center gap-3">
                        {entrega ? (
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${COLOR_ESTADO[entrega.estado]}`}
                          >
                            {ETIQUETA_ESTADO[entrega.estado]}
                            {entrega.nota !== undefined && ` · Nota: ${entrega.nota}`}
                          </span>
                        ) : (
                          <form action={entregarTareaAction}>
                            <input type="hidden" name="tareaId" value={tarea.id} />
                            <button
                              type="submit"
                              className="rounded-lg border border-brand-600 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                            >
                              Entregar tarea
                            </button>
                          </form>
                        )}
                      </div>
                    )}

                    {(esDocenteDelGrupo || rolActual === "administracion") &&
                      entregas.length > 0 && (
                        <div className="rounded-lg bg-zinc-50 p-3">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            Entregas ({entregas.length})
                          </p>
                          <ul className="flex flex-col gap-2">
                            {entregas.map((itemEntrega) => (
                              <li
                                key={itemEntrega.id}
                                className="flex flex-wrap items-center gap-2 text-sm text-zinc-700"
                              >
                                <span className="font-medium">
                                  {nombreDeUsuario(itemEntrega.estudianteId)}
                                </span>
                                <span
                                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${COLOR_ESTADO[itemEntrega.estado]}`}
                                >
                                  {ETIQUETA_ESTADO[itemEntrega.estado]}
                                </span>
                                {itemEntrega.nota !== undefined && (
                                  <span className="text-xs text-zinc-500">
                                    Nota: {itemEntrega.nota}
                                  </span>
                                )}
                                {itemEntrega.estado !== "calificada" && (
                                  <form
                                    action={calificarEntregaAction}
                                    className="ml-auto flex items-center gap-2"
                                  >
                                    <input type="hidden" name="grupoId" value={grupo.id} />
                                    <input type="hidden" name="entregaId" value={itemEntrega.id} />
                                    <label className="sr-only" htmlFor={`nota-${itemEntrega.id}`}>
                                      Nota de {nombreDeUsuario(itemEntrega.estudianteId)}
                                    </label>
                                    <input
                                      id={`nota-${itemEntrega.id}`}
                                      name="nota"
                                      type="number"
                                      min={1}
                                      max={10}
                                      step={0.5}
                                      required
                                      placeholder="Nota"
                                      className="w-20 rounded-lg border border-zinc-300 px-2 py-1 text-sm"
                                    />
                                    <label className="sr-only" htmlFor={`comentario-${itemEntrega.id}`}>
                                      Comentario para {nombreDeUsuario(itemEntrega.estudianteId)}
                                    </label>
                                    <input
                                      id={`comentario-${itemEntrega.id}`}
                                      name="comentario"
                                      maxLength={1000}
                                      placeholder="Comentario (opcional)"
                                      className="hidden w-40 rounded-lg border border-zinc-300 px-2 py-1 text-sm sm:block"
                                    />
                                    <button
                                      type="submit"
                                      className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"
                                    >
                                      Calificar
                                    </button>
                                  </form>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section aria-labelledby="materiales-heading">
          <h2 id="materiales-heading" className="mb-4 text-lg font-semibold">
            Materiales
          </h2>
          {materiales.length === 0 ? (
            <p className="text-sm text-zinc-500">No hay materiales en este grupo.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {materiales.map((material) => (
                <li
                  key={material.id}
                  className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]"
                >
                  <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-800 dark:bg-brand-900/30 dark:text-brand-300">
                    {ETIQUETA_TIPO_MATERIAL[material.tipo] ?? material.tipo}
                  </span>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                      {material.titulo}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {nombreDeUsuario(material.publicadoPorId)} ·{" "}
                      <time dateTime={material.fecha}>{formatearFecha(material.fecha)}</time>
                    </span>
                  </div>
                  {material.url && (
                    <a
                      href={material.url}
                      className="shrink-0 rounded-lg bg-brand-100 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 dark:bg-brand-900/30 dark:text-brand-300 dark:hover:bg-brand-900/50"
                    >
                      Descargar
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {miembros.length > 0 && (
          <section aria-labelledby="miembros-heading">
            <h2 id="miembros-heading" className="mb-4 text-lg font-semibold">
              Estudiantes ({miembros.length})
            </h2>
            <ul className="flex flex-wrap gap-2">
              {miembros.map((miembro) => (
                <li
                  key={miembro.id}
                  className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 dark:border-white/[.145] dark:bg-white/[.04] dark:text-zinc-300"
                >
                  {miembro.nombre}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
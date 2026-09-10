import Link from "next/link";
import { notFound } from "next/navigation";

import {
  obtenerGrupo,
  obtenerMaterialesDeGrupo,
  obtenerMiembros,
  obtenerPublicacionesDeGrupo,
  obtenerTareasDeGrupo,
} from "@/data/grupos";
import { nombreDeUsuario } from "@/data/grupos";
import { formatearFecha } from "@/lib/date";

const ETIQUETA_TIPO_MATERIAL: Record<string, string> = {
  guia: "Guía",
  apunte: "Apunte",
  presentacion: "Presentación",
  video: "Video",
  ejercicios: "Ejercicios",
};

export default async function GruposDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const grupo = obtenerGrupo(id);
  if (!grupo) notFound();

  const publicaciones = obtenerPublicacionesDeGrupo(grupo.id);
  const materiales = obtenerMaterialesDeGrupo(grupo.id);
  const tareas = obtenerTareasDeGrupo(grupo.id);
  const miembros = obtenerMiembros(grupo.id);
  const docente = nombreDeUsuario(grupo.docenteId);

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black sm:px-10 sm:py-16">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <header>
          <Link
            href="/grupos"
            className="text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
          >
            ← Volver a mis grupos
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
            Docente a cargo:{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {docente}
            </span>
          </p>
        </header>

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
                    {nombreDeUsuario(publicacion.autorId)} ·{" "}
                    <time dateTime={publicacion.fecha}>
                      {formatearFecha(publicacion.fecha)}
                    </time>
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
            <ul className="flex flex-col gap-3">
              {tareas.map((tarea) => (
                <li
                  key={tarea.id}
                  className="flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]"
                >
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {tarea.titulo}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {tarea.descripcion}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Entrega: <time dateTime={tarea.fechaEntrega}>{formatearFecha(tarea.fechaEntrega)}</time>
                  </p>
                </li>
              ))}
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
                  <a
                    href={material.url}
                    className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-900/30"
                  >
                    Descargar
                  </a>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                      {material.titulo}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {nombreDeUsuario(material.publicadoPorId)} ·{" "}
                      <time dateTime={material.fecha}>{formatearFecha(material.fecha)}</time>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="miembros-heading">
          <h2 id="miembros-heading" className="mb-4 text-lg font-semibold">
            Miembros ({miembros.length})
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
      </main>
    </div>
  );
}
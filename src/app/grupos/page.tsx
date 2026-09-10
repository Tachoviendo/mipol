import Link from "next/link";

import { crearGrupoAction } from "@/app/grupos/actions";
import {
  obtenerGruposParaRol,
  obtenerMiembros,
  USUARIO_POR_ROL,
} from "@/data/grupos";
import { obtenerRolActual } from "@/lib/rol-actual";
import {
  puedeAdministrarGrupos,
  puedeCrearGrupos,
  puedeVerGrupos,
  ROLES,
} from "@/lib/roles";

export default async function GruposPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const rolActual = await obtenerRolActual();

  if (!puedeVerGrupos(rolActual)) {
    return (
      <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black sm:px-10 sm:py-16">
        <main className="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-white/[.145] dark:bg-white/[.04]">
          <span className="flex size-12 items-center justify-center rounded-full bg-zinc-100 text-2xl dark:bg-white/[.08]">
            🔒
          </span>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Acceso restringido
          </h1>
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Los espacios de trabajo son privados de la comunidad educativa. El
            rol <span className="font-medium text-zinc-900 dark:text-zinc-50">Público</span>{" "}
            no tiene acceso a los grupos.
          </p>
          <Link
            href="/"
            className="mt-1 rounded-lg px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-900/30"
          >
            Volver al inicio
          </Link>
        </main>
      </div>
    );
  }

  const grupos = obtenerGruposParaRol(rolActual);
  const etiquetaRol = ROLES.find((rol) => rol.valor === rolActual)?.etiqueta;
  const esAdmin = rolActual === "administracion";
  const puedeCrear = puedeCrearGrupos(rolActual);
  const puedeAdministrar = puedeAdministrarGrupos(rolActual);

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black sm:px-10 sm:py-16">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
            Espacios de trabajo
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Grupos
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
            {esAdmin
              ? "Visibilidad global: administración ve todos los grupos del liceo."
              : `Los grupos a los que pertenecés como ${etiquetaRol}. Entrá para ver tareas, materiales y entregas.`}
          </p>
        </header>

        {error && (
          <p
            role="status"
            className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            No se pudo realizar la operación: revisá los datos e intentá de nuevo.
          </p>
        )}

        {puedeCrear && (
          <section
            aria-labelledby="nuevo-grupo-heading"
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <h2 id="nuevo-grupo-heading" className="text-lg font-semibold">
              Crear un grupo
            </h2>
            <form action={crearGrupoAction} className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-sm text-zinc-600">
                Nombre del grupo
                <input
                  name="nombre"
                  required
                  maxLength={60}
                  placeholder="Matemática 3° A"
                  className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-zinc-600">
                Materia
                <input
                  name="materia"
                  required
                  placeholder="Matemática"
                  className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm text-zinc-600">
                Curso
                <input
                  name="curso"
                  required
                  placeholder="3° A"
                  className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                />
              </label>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Crear grupo
                </button>
              </div>
              <label className="flex flex-col gap-1 text-sm text-zinc-600 sm:col-span-2">
                Descripción (opcional)
                <textarea
                  name="descripcion"
                  maxLength={300}
                  rows={2}
                  placeholder="Qué se va a trabajar en este grupo..."
                  className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                />
              </label>
            </form>
          </section>
        )}

        {puedeAdministrar && (
          <p className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800 dark:border-brand-900/30 dark:bg-brand-900/20 dark:text-brand-200">
            Podés administrar los grupos: crear tareas, moderar publicaciones y
            calificar entregas.
          </p>
        )}

        {grupos.length === 0 ? (
          <section
            aria-labelledby="grupos-vacio"
            className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-white/[.145] dark:bg-white/[.04]"
          >
            <h2 id="grupos-vacio" className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              No participás en ningún grupo todavía
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
              Cuando el equipo docente te sume a un grupo, aparecerá acá para
              acceder rápido a sus materiales y tareas.
            </p>
          </section>
        ) : (
          <section aria-labelledby="grupos-heading">
            <div className="mb-4 flex items-end justify-between gap-4">
              <h2 id="grupos-heading" className="text-lg font-semibold">
                {esAdmin ? "Todos los grupos" : "Tus grupos"}
              </h2>
              <span className="text-sm text-zinc-500">
                {grupos.length} {grupos.length === 1 ? "grupo" : "grupos"}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {grupos.map((grupo) => {
                const usuarioId = USUARIO_POR_ROL[rolActual];
                const esMiembro = grupo.miembroIds.includes(usuarioId) || grupo.docenteId === usuarioId;
                return (
                  <Link
                    key={grupo.id}
                    href={`/grupos/${grupo.id}`}
                    className="group flex flex-col justify-between gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                  >
                    <div>
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <span className="flex size-11 items-center justify-center rounded-xl bg-brand-100 text-lg font-semibold text-brand-700">
                          {grupo.nombre.charAt(0)}
                        </span>
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                          {grupo.curso}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-zinc-950 group-hover:text-brand-800">
                        {grupo.nombre}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        {grupo.materia} · {grupo.descripcion}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-zinc-500">
                      <span>
                        {obtenerMiembros(grupo.id).length} estudiantes
                      </span>
                      <span className="font-semibold text-brand-700">
                        {grupo.docenteId === usuarioId ? "Vos (docente)" : "Ver grupo"}
                      </span>
                    </div>
                    {!esMiembro && rolActual === "estudiante" && (
                      <span className="text-xs font-medium text-amber-600">
                        Todavía no sos miembro
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
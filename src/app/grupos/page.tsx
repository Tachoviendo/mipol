import { GrupoCard } from "@/components/GrupoCard";
import { obtenerGruposParaRol } from "@/data/grupos";
import { obtenerMiembros } from "@/data/grupos";
import { obtenerRolActual } from "@/lib/rol-actual";
import { ROLES } from "@/lib/roles";
import Link from "next/link";

export default async function GruposPage() {
  const rolActual = await obtenerRolActual();
  const grupos = obtenerGruposParaRol(rolActual);
  const etiquetaRol = ROLES.find((rol) => rol.valor === rolActual)?.etiqueta;

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black sm:px-10 sm:py-16">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
            Mis espacios
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Grupos
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Los grupos a los que pertenecés como{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-50">
              {etiquetaRol}
            </span>
            . Tocá uno para ver sus tareas, materiales y publicaciones.
          </p>
        </header>

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
            <Link
              href="/"
              className="mt-5 inline-block rounded-lg px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 hover:text-brand-800 dark:text-brand-300 dark:hover:bg-brand-900/30 dark:hover:text-brand-200"
            >
              Volver al inicio
            </Link>
          </section>
        ) : (
          <section aria-labelledby="grupos-heading">
            <div className="mb-4 flex items-end justify-between gap-4">
              <h2 id="grupos-heading" className="text-lg font-semibold">
                Tus grupos
              </h2>
              <span className="text-sm text-zinc-500">
                {grupos.length} {grupos.length === 1 ? "grupo" : "grupos"}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {grupos.map((grupo) => (
                <GrupoCard
                  key={grupo.id}
                  grupo={grupo}
                  cantidadMiembros={obtenerMiembros(grupo.id).length}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
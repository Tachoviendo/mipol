import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EstadoVacio } from "@/components/EstadoVacio";
import { HiloForoRow } from "@/components/HiloForoRow";
import {
  obtenerCategoriaForo,
  obtenerHilosForo,
  ordenarHilos,
} from "@/data/foros";
import { obtenerRolActual } from "@/lib/rol-actual";
import { puedeParticiparEnForos } from "@/lib/roles";

type CategoriaPageProps = {
  params: Promise<{ categoriaId: string }>;
  searchParams: Promise<{ orden?: string; error?: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoriaId: string }>;
}): Promise<Metadata> {
  const { categoriaId } = await params;
  const categoria = obtenerCategoriaForo(categoriaId);
  return { title: categoria?.nombre ?? "Categoría no encontrada" };
}

export default async function CategoriaPage({
  params,
  searchParams,
}: CategoriaPageProps) {
  const { categoriaId } = await params;
  const { orden, error } = await searchParams;
  const categoria = obtenerCategoriaForo(categoriaId);

  if (!categoria) notFound();

  const rolActual = await obtenerRolActual();
  const puedeCrearHilo = puedeParticiparEnForos(rolActual);

  const hilos = ordenarHilos(
    obtenerHilosForo(categoriaId),
    orden === "respuestas" ? "respuestas" : "actividad",
  );

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 sm:px-10 sm:py-16">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <Link href="/foros" className="text-sm font-semibold text-brand-700">
          Volver a categorías
        </Link>

        {error && (
          <p
            role="status"
            className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            {error === "rol"
              ? "Tu rol actual no tiene permiso para crear hilos."
              : error === "longitud"
                ? "El título o el mensaje superan el largo máximo permitido."
                : "Revisá el formulario: falta completar algún campo."}
          </p>
        )}

        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Categoría
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">{categoria.nombre}</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
              {categoria.descripcion}
            </p>
          </div>
          {puedeCrearHilo && (
            <Link
              href={`/foros/${categoria.id}/nuevo`}
              className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Nuevo hilo
            </Link>
          )}
        </header>

        <section aria-labelledby="hilos-heading" className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-zinc-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="hilos-heading" className="font-semibold">Hilos de conversación</h2>
              <p className="mt-1 text-sm text-zinc-500">{hilos.length} disponibles</p>
            </div>
            <div className="inline-flex rounded-lg border border-zinc-200 bg-zinc-50 p-1 text-sm">
              <Link
                href={`/foros/${categoria.id}?orden=actividad`}
                className={
                  orden !== "respuestas"
                    ? "rounded-md bg-white px-3 py-1.5 font-semibold text-brand-900 shadow-sm"
                    : "rounded-md px-3 py-1.5 text-zinc-600 hover:text-zinc-900"
                }
              >
                Actividad reciente
              </Link>
              <Link
                href={`/foros/${categoria.id}?orden=respuestas`}
                className={
                  orden === "respuestas"
                    ? "rounded-md bg-white px-3 py-1.5 font-semibold text-brand-900 shadow-sm"
                    : "rounded-md px-3 py-1.5 text-zinc-600 hover:text-zinc-900"
                }
              >
                Más respondidos
              </Link>
            </div>
          </div>
          {hilos.length > 0 ? (
            hilos.map((hilo) => <HiloForoRow key={hilo.id} hilo={hilo} />)
          ) : (
            <EstadoVacio
              titulo="Todavía no hay hilos en esta categoría"
              descripcion="Sé el primero en publicar un tema para empezar la conversación."
              accion={
                puedeCrearHilo
                  ? { href: `/foros/${categoria.id}/nuevo`, etiqueta: "Crear primer hilo" }
                  : undefined
              }
            />
          )}
        </section>
      </main>
    </div>
  );
}
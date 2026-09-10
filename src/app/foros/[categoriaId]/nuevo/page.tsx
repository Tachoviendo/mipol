import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { crearHiloAction } from "@/app/foros/actions";
import { LIMITE_MENSAJE, LIMITE_TITULO, categoriasForo, obtenerCategoriaForo } from "@/data/foros";
import { obtenerRolActual } from "@/lib/rol-actual";
import { puedeParticiparEnForos } from "@/lib/roles";

type NuevoHiloPageProps = {
  params: Promise<{ categoriaId: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoriaId: string }>;
}): Promise<Metadata> {
  const { categoriaId } = await params;
  const categoria = obtenerCategoriaForo(categoriaId);
  return { title: categoria ? `Nuevo hilo · ${categoria.nombre}` : "Nuevo hilo" };
}

export default async function NuevoHiloPage({ params }: NuevoHiloPageProps) {
  const { categoriaId } = await params;
  const categoria = obtenerCategoriaForo(categoriaId);
  if (!categoria) notFound();

  const rolActual = await obtenerRolActual();
  if (!puedeParticiparEnForos(rolActual)) {
    redirect(`/foros/${categoriaId}?error=rol`);
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 sm:px-10 sm:py-16">
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <Link href={`/foros/${categoria.id}`} className="text-sm font-semibold text-brand-700">
          Volver a {categoria.nombre}
        </Link>
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">
            Nuevo hilo en {categoria.nombre}
          </h1>
        </header>
        <form
          action={crearHiloAction}
          className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
            Categoría
            <select
              name="categoriaId"
              defaultValue={categoria.id}
              className="rounded-lg border border-zinc-300 px-3 py-2 text-base font-normal"
            >
              {categoriasForo.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
            Título
            <input
              name="titulo"
              required
              maxLength={LIMITE_TITULO}
              className="rounded-lg border border-zinc-300 px-3 py-2 text-base font-normal"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
            Mensaje inicial
            <textarea
              name="mensajeInicial"
              required
              maxLength={LIMITE_MENSAJE}
              rows={6}
              className="rounded-lg border border-zinc-300 px-3 py-2 text-base font-normal"
            />
          </label>
          <button
            type="submit"
            className="self-start rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Publicar hilo
          </button>
        </form>
      </main>
    </div>
  );
}

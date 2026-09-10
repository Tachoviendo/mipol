import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  alternarCerradoAction,
  alternarFijadoAction,
  eliminarHiloAction,
  responderHiloAction,
} from "@/app/foros/actions";
import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton";
import { MensajeItem } from "@/components/MensajeItem";
import {
  LIMITE_MENSAJE,
  mensajesForo,
  obtenerCategoriaForo,
  obtenerHiloForo,
} from "@/data/foros";
import { obtenerRolActual } from "@/lib/rol-actual";
import {
  puedeModerarForos,
  puedeParticiparEnForos,
} from "@/lib/roles";

type HiloPageProps = {
  params: Promise<{ categoriaId: string; hiloId: string }>;
  searchParams: Promise<{ error?: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoriaId: string; hiloId: string }>;
}): Promise<Metadata> {
  const { hiloId } = await params;
  const hilo = obtenerHiloForo(hiloId);
  return { title: hilo?.titulo ?? "Hilo no encontrado" };
}

export default async function HiloPage({ params, searchParams }: HiloPageProps) {
  const { categoriaId, hiloId } = await params;
  const { error } = await searchParams;
  const categoria = obtenerCategoriaForo(categoriaId);
  const hilo = obtenerHiloForo(hiloId);

  if (!categoria || !hilo || hilo.categoriaId !== categoriaId) notFound();

  const rolActual = await obtenerRolActual();
  const esModerador = puedeModerarForos(rolActual);
  const puedeResponder = puedeParticiparEnForos(rolActual) && !hilo.cerrado;

  const mensajes = mensajesForo
    .filter((mensaje) => mensaje.hiloId === hilo.id)
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 sm:px-10 sm:py-16">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <Link href={`/foros/${categoria.id}`} className="text-sm font-semibold text-emerald-800">
          Volver a {categoria.nombre}
        </Link>
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            {categoria.nombre}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {hilo.fijado && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                Fijado
              </span>
            )}
            {hilo.cerrado && (
              <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-semibold text-zinc-700">
                Cerrado
              </span>
            )}
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{hilo.titulo}</h1>
          <p className="mt-3 text-sm text-zinc-500">{hilo.cantidadRespuestas} respuestas</p>
        </header>

        {esModerador && (
          <section
            aria-label="Moderación"
            className="flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 text-sm shadow-sm"
          >
            <span className="font-semibold text-zinc-700">Moderación:</span>
            <form action={alternarFijadoAction}>
              <input type="hidden" name="categoriaId" value={categoria.id} />
              <input type="hidden" name="hiloId" value={hilo.id} />
              <button type="submit" className="rounded-lg border border-zinc-300 px-3 py-1.5 font-medium hover:bg-zinc-50">
                {hilo.fijado ? "Desfijar" : "Fijar"}
              </button>
            </form>
            <form action={alternarCerradoAction}>
              <input type="hidden" name="categoriaId" value={categoria.id} />
              <input type="hidden" name="hiloId" value={hilo.id} />
              <button type="submit" className="rounded-lg border border-zinc-300 px-3 py-1.5 font-medium hover:bg-zinc-50">
                {hilo.cerrado ? "Reabrir" : "Cerrar"}
              </button>
            </form>
            <form action={eliminarHiloAction}>
              <input type="hidden" name="categoriaId" value={categoria.id} />
              <input type="hidden" name="hiloId" value={hilo.id} />
              <ConfirmSubmitButton
                mensajeConfirmacion="¿Eliminar este hilo y todas sus respuestas?"
                className="rounded-lg border border-red-300 px-3 py-1.5 font-medium text-red-700 hover:bg-red-50"
              >
                Eliminar hilo
              </ConfirmSubmitButton>
            </form>
          </section>
        )}

        <section aria-label="Mensajes del hilo" className="rounded-2xl border border-zinc-200 bg-white px-5 shadow-sm sm:px-7">
          {mensajes.map((mensaje) => (
            <MensajeItem
              key={mensaje.id}
              mensaje={mensaje}
              categoriaId={categoria.id}
              puedeEliminar={esModerador}
            />
          ))}
        </section>

        <section aria-label="Responder" className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          {error && (
            <p
              role="status"
              className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800"
            >
              {error === "longitud"
                ? "Tu respuesta supera el largo máximo permitido."
                : error === "rol"
                  ? "Tu rol actual no tiene permiso para responder."
                  : error === "cerrado"
                    ? "Este hilo se cerró justo antes de enviar tu respuesta."
                    : "Escribí una respuesta antes de enviar."}
            </p>
          )}
          {puedeResponder ? (
            <form action={responderHiloAction} className="flex flex-col gap-3">
              <input type="hidden" name="categoriaId" value={categoria.id} />
              <input type="hidden" name="hiloId" value={hilo.id} />
              <label htmlFor="contenido" className="text-sm font-medium text-zinc-700">
                Tu respuesta
              </label>
              <textarea
                id="contenido"
                name="contenido"
                required
                maxLength={LIMITE_MENSAJE}
                rows={4}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-base"
              />
              <button
                type="submit"
                className="self-start rounded-lg bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Responder
              </button>
            </form>
          ) : (
            <p className="text-sm text-zinc-500">
              {hilo.cerrado
                ? "Este hilo está cerrado y no admite nuevas respuestas."
                : "Tu rol actual no puede responder en los foros."}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
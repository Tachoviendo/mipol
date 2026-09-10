"use client";

import { useState } from "react";
import { AnuncioCard } from "@/components/AnuncioCard";
import { SelectorDestinatario, type DestinatarioSeleccionado } from "@/components/SelectorDestinatario";
import { anuncios } from "@/data/ejemplo";

export default function AnunciosPage() {
  const [destinatarios, setDestinatarios] = useState<DestinatarioSeleccionado[]>([]);

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col gap-4">
        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
          Anuncios
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Página de ejemplo que sigue la convención de carpetas del proyecto.
        </p>

        <section className="rounded-lg border border-black/[.08] p-4 dark:border-white/[.145]">
          <h2 className="mb-3 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            Nuevo aviso
          </h2>
          <SelectorDestinatario onSeleccionar={setDestinatarios} />
          {destinatarios.length > 0 && (
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Enviando a:{" "}
              {destinatarios
                .map((d) =>
                  d.tipo === "persona"
                    ? d.data.nombre
                    : d.tipo === "curso"
                      ? `Curso ${d.data.nombre}`
                      : d.data.nombre
                )
                .join(", ")}
            </p>
          )}
        </section>

        <div className="flex flex-col gap-3">
          {anuncios.map((anuncio) => (
            <AnuncioCard key={anuncio.id} {...anuncio} />
          ))}
        </div>
      </main>
    </div>
  );
}

"use client";

import { AnuncioCard } from "@/components/AnuncioCard";
import { anuncios } from "@/data/ejemplo";
import { DestinatarioSelector } from "@/components/DestinatarioSelector";
import type { DestinatarioSeleccionado } from "@/data/destinatarios";
import { useState } from "react";

/**
 * `src/app`: rutas del App Router. Cada carpeta es un segmento de URL
 * y `page.tsx` es el punto de entrada de esa ruta (ver /anuncios).
 */
export default function AnunciosPage() {
  const [destinatario, setDestinatario] = useState<DestinatarioSeleccionado>({
    tipo: "persona",
    items: [],
  });

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
            Anuncios
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Página de ejemplo que sigue la convención de carpetas del proyecto.
          </p>
        </div>

        <section className="w-full">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-4">
            Nuevo Aviso - Seleccionar Destinatario(s)
          </h2>
          <DestinatarioSelector
            onChange={setDestinatario}
            placeholder="Buscar persona, curso o departamento..."
          />
          <pre className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs text-zinc-600 dark:text-zinc-300 overflow-auto">
            {JSON.stringify(destinatario, null, 2)}
          </pre>
        </section>

        <section className="w-full">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-4">
            Anuncios Existentes
          </h2>
          <div className="flex flex-col gap-3">
            {anuncios.map((anuncio) => (
              <AnuncioCard key={anuncio.id} {...anuncio} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

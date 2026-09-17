"use client";

import { useState } from "react";

import { ProgramaOfertaCard } from "@/components/ProgramaOfertaCard";
import { programasOferta } from "@/data/oferta";
import type { TipoOferta } from "@/data/oferta";

type FiltroOferta = "todas" | TipoOferta;

const FILTROS: { valor: FiltroOferta; etiqueta: string }[] = [
  { valor: "todas", etiqueta: "Todas" },
  { valor: "terciaria", etiqueta: "Oferta terciaria" },
  { valor: "interna", etiqueta: "Oferta interna" },
];

export default function OfertaPage() {
  const [filtro, setFiltro] = useState<FiltroOferta>("todas");

  const programas =
    filtro === "todas"
      ? programasOferta
      : programasOferta.filter((p) => p.tipo === filtro);

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col w-full max-w-3xl gap-6 py-12 px-6">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
            Oferta educativa
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Programas y cursos
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Explorá la oferta terciaria e interna del liceo.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Filtrar por tipo de oferta"
          className="flex flex-wrap gap-2"
        >
          {FILTROS.map(({ valor, etiqueta }) => {
            const activo = filtro === valor;
            const cantidad =
              valor === "todas"
                ? programasOferta.length
                : programasOferta.filter((p) => p.tipo === valor).length;

            return (
              <button
                key={valor}
                role="tab"
                aria-selected={activo}
                onClick={() => setFiltro(valor)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  activo
                    ? "border-transparent bg-brand-700 text-white dark:bg-brand-500"
                    : "border-black/[.08] bg-white text-zinc-600 hover:bg-zinc-100 dark:border-white/[.145] dark:bg-white/[.04] dark:text-zinc-400 dark:hover:bg-white/[.08]"
                }`}
              >
                {etiqueta}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                    activo
                      ? "bg-white/20 text-white"
                      : "bg-zinc-100 text-zinc-500 dark:bg-white/[.08] dark:text-zinc-400"
                  }`}
                >
                  {cantidad}
                </span>
              </button>
            );
          })}
        </div>

        {programas.length === 0 ? (
          <p className="rounded-xl border border-black/[.08] bg-white p-8 text-center text-sm text-zinc-500 dark:border-white/[.145] dark:bg-white/[.04]">
            No hay programas de este tipo por el momento.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {programas.map((programa) => (
              <ProgramaOfertaCard key={programa.id} programa={programa} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
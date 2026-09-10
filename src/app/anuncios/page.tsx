"use client";

import { useState } from "react";
import { AnuncioCard } from "@/components/AnuncioCard";
import { SelectorDestinatario, type DestinatarioSeleccionado } from "@/components/SelectorDestinatario";
import { anuncios } from "@/data/ejemplo";
import { novedadesTransporte } from "@/data/novedades";
import { formatearFecha } from "@/lib/date";
import Link from "next/link";
import { lineas } from "@/data/transporte";

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
          {todosLosAnuncios.length === 0 ? (
            <p className="text-center text-zinc-600 dark:text-zinc-400 py-8">
              No hay anuncios ni novedades disponibles
            </p>
          ) : (
            todosLosAnuncios.map((item) => {
              const isNovedad = item.tipo === "novedad";
              const linea = item.lineaId ? lineas.find((l) => l.id === item.lineaId) : null;

              return (
                <article
                  key={item.id}
                  className={`rounded-lg border border-black/[.08] p-5 dark:border-white/[.145] ${
                    isNovedad ? getPrioridadColor(item.prioridad) : ""
                  }`}
                >
                  <div className="flex flex-wrap items-start gap-2">
                    <h2 className="flex-1 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                      {item.titulo}
                    </h2>
                    {isNovedad && (
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTipoBadge(
                          item.novedadTipo
                        ).className}`}
                      >
                        {getTipoBadge(item.novedadTipo).label}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {item.descripcion}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                    <time dateTime={item.fecha}>
                      {formatearFecha(item.fecha)}
                    </time>
                    {linea && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5"
                        style={{ backgroundColor: `${linea.color}20`, color: linea.color }}
                      >
                        {linea.nombre}
                      </span>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
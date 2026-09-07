"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { paradas, lineas } from "@/data/transporte";

export function BuscadorParadas() {
  const [busqueda, setBusqueda] = useState("");

  const resultados = useMemo(() => {
    if (!busqueda.trim()) return [];

    const termino = busqueda.toLowerCase().trim();

    const paradasFiltradas = paradas.filter(
      (p) =>
        p.nombre.toLowerCase().includes(termino) ||
        p.zona.toLowerCase().includes(termino) ||
        p.direccion.toLowerCase().includes(termino)
    );

    return paradasFiltradas.map((parada) => {
      const lineasQuePasen = lineas.filter((linea) =>
        linea.paradas.some((p) => p.id === parada.id)
      );
      return { parada, lineas: lineasQuePasen };
    });
  }, [busqueda]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por parada o zona..."
          className="w-full rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 px-5 py-4 text-lg text-black dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {busqueda && (
          <button
            onClick={() => setBusqueda("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
          >
            ✕
          </button>
        )}
      </div>

      {busqueda.trim() && resultados.length === 0 && (
        <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">
          No se encontraron paradas o zonas con &quot;{busqueda}&quot;
        </p>
      )}

      {resultados.length > 0 && (
        <ul className="flex flex-col gap-3">
          {resultados.map(({ parada, lineas: lineasParada }) => (
            <li
              key={parada.id}
              className="rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 p-5"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-black dark:text-zinc-50">
                      {parada.nombre}
                    </span>
                    <span className="rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 text-xs font-medium">
                      {parada.zona}
                    </span>
                  </div>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {parada.direccion}
                  </span>
                </div>

                {lineasParada.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                      Líneas que pasan por aquí
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {lineasParada.map((linea) => (
                        <Link
                          key={linea.id}
                          href={`/lineas/${linea.id}`}
                          className="flex items-center gap-2 rounded-lg border border-black/[.08] dark:border-white/[.145] px-3 py-2 transition-colors hover:border-transparent hover:bg-black/[.04] dark:hover:bg-[#1a1a1a]"
                        >
                          <span
                            className="h-3 w-3 shrink-0 rounded-full"
                            style={{ backgroundColor: linea.color }}
                          />
                          <span className="text-sm font-medium text-black dark:text-zinc-50">
                            {linea.nombre}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

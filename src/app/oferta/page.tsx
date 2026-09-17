"use client";

import { useMemo, useState } from "react";

import { ProgramaOfertaCard } from "@/components/ProgramaOfertaCard";
import {
  ETIQUETAS_AREA,
  ETIQUETAS_MODALIDAD,
  ETIQUETAS_TURNO,
  areasOferta,
  buscarProgramas,
  modalidadesOferta,
  programasOferta,
  turnosOferta,
} from "@/data/oferta";
import type {
  AreaOferta,
  ModalidadOferta,
  TipoOferta,
  TurnoOferta,
} from "@/data/oferta";

type FiltroTipo = "todas" | TipoOferta;

const FILTROS_TIPO: { valor: FiltroTipo; etiqueta: string }[] = [
  { valor: "todas", etiqueta: "Todas" },
  { valor: "terciaria", etiqueta: "Oferta terciaria" },
  { valor: "interna", etiqueta: "Oferta interna" },
];

const SIN_FILTRO = "";
type FiltroArea = AreaOferta | typeof SIN_FILTRO;
type FiltroModalidad = ModalidadOferta | typeof SIN_FILTRO;
type FiltroTurno = TurnoOferta | typeof SIN_FILTRO;

export default function OfertaPage() {
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>("todas");
  const [texto, setTexto] = useState("");
  const [area, setArea] = useState<FiltroArea>(SIN_FILTRO);
  const [modalidad, setModalidad] = useState<FiltroModalidad>(SIN_FILTRO);
  const [turno, setTurno] = useState<FiltroTurno>(SIN_FILTRO);

  const programas = useMemo(() => {
    const filtrados = buscarProgramas({
      texto,
      area: area || undefined,
      modalidad: modalidad || undefined,
      turno: turno || undefined,
    });
    return filtroTipo === "todas"
      ? filtrados
      : filtrados.filter((p) => p.tipo === filtroTipo);
  }, [texto, area, modalidad, turno, filtroTipo]);

  const hayFiltros =
    texto.trim().length > 0 || Boolean(area || modalidad || turno);

  const limpiarFiltros = () => {
    setTexto("");
    setArea(SIN_FILTRO);
    setModalidad(SIN_FILTRO);
    setTurno(SIN_FILTRO);
  };

  const selectClases =
    "rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm text-zinc-700 dark:border-white/[.145] dark:bg-zinc-900 dark:text-zinc-300";

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
            Buscá y filtrá la oferta terciaria e interna del liceo.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Filtrar por tipo de oferta"
          className="flex flex-wrap gap-2"
        >
          {FILTROS_TIPO.map(({ valor, etiqueta }) => {
            const activo = filtroTipo === valor;
            const cantidad =
              valor === "todas"
                ? programasOferta.length
                : programasOferta.filter((p) => p.tipo === valor).length;

            return (
              <button
                key={valor}
                role="tab"
                aria-selected={activo}
                onClick={() => setFiltroTipo(valor)}
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

        <form
          className="flex flex-col gap-3 rounded-xl border border-black/[.08] bg-white p-4 dark:border-white/[.145] dark:bg-white/[.04]"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="buscar-oferta" className="sr-only">
            Buscar programas y cursos
          </label>
          <input
            id="buscar-oferta"
            type="search"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Buscar por nombre, área, modalidad o turno..."
            className="rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm text-zinc-700 dark:border-white/[.145] dark:bg-zinc-900 dark:text-zinc-300"
          />

          <div className="grid gap-3 sm:grid-cols-3">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Área temática
              </span>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value as FiltroArea)}
                className={selectClases}
              >
                <option value={SIN_FILTRO}>Todas</option>
                {areasOferta.map((a) => (
                  <option key={a} value={a}>
                    {ETIQUETAS_AREA[a]}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Modalidad
              </span>
              <select
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value as FiltroModalidad)}
                className={selectClases}
              >
                <option value={SIN_FILTRO}>Todas</option>
                {modalidadesOferta.map((m) => (
                  <option key={m} value={m}>
                    {ETIQUETAS_MODALIDAD[m]}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Turno
              </span>
              <select
                value={turno}
                onChange={(e) => setTurno(e.target.value as FiltroTurno)}
                className={selectClases}
              >
                <option value={SIN_FILTRO}>Todos</option>
                {turnosOferta.map((t) => (
                  <option key={t} value={t}>
                    {ETIQUETAS_TURNO[t]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {hayFiltros && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">
                {programas.length} {programas.length === 1 ? "resultado" : "resultados"}
              </span>
              <button
                type="button"
                onClick={limpiarFiltros}
                className="text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </form>

        {programas.length === 0 ? (
          <p className="rounded-xl border border-black/[.08] bg-white p-8 text-center text-sm text-zinc-500 dark:border-white/[.145] dark:bg-white/[.04]">
            No hay programas que coincidan con tu búsqueda. Probá con otros
            criterios.
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
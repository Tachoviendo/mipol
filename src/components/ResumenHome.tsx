import Link from "next/link";

import { AnuncioCard } from "@/components/AnuncioCard";
import { comunicadosDestacadosParaRol } from "@/data/ejemplo";
import { proximosEventosParaRol } from "@/data/eventos";
import { avisosParaRol } from "@/data/novedades";
import { lineas } from "@/data/transporte";
import { formatearFecha } from "@/lib/date";
import type { Rol } from "@/lib/roles";

const LIMITE_COMUNICADOS = 2;
const LIMITE_EVENTOS = 3;
const LIMITE_AVISOS = 2;

type ResumenHomeProps = {
  rol: Rol;
};

const COLOR_PRIORIDAD: Record<string, string> = {
  alta: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  media: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  baja: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
};

export function ResumenHome({ rol }: ResumenHomeProps) {
  const comunicados = comunicadosDestacadosParaRol(rol, LIMITE_COMUNICADOS);
  const eventos = proximosEventosParaRol(rol, LIMITE_EVENTOS);
  const avisos = avisosParaRol(rol, LIMITE_AVISOS);

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black sm:px-10 sm:py-16">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Liceo 1° de Salto
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Resumen de novedades
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Lo último de cada módulo, adaptado a tu rol actual
            ({` `}
            <span className="font-medium text-primary">{rol}</span>).
          </p>
        </header>

        <section aria-labelledby="comunicados-heading">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 id="comunicados-heading" className="text-lg font-semibold">
                Comunicados destacados
              </h2>
              <p className="text-sm text-zinc-500">Últimas novedades de la comunidad.</p>
            </div>
            <Link
              href="/anuncios"
              className="text-sm font-semibold text-primary hover:text-primary-dark"
            >
              Ver todos →
            </Link>
          </div>
          {comunicados.length === 0 ? (
            <p className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
              Todavía no hay comunicados destacados para tu rol.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {comunicados.map((comunicado) => (
                <AnuncioCard key={comunicado.id} {...comunicado} />
              ))}
            </div>
          )}
        </section>

        <section aria-labelledby="eventos-heading">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 id="eventos-heading" className="text-lg font-semibold">
                Próximos eventos
              </h2>
              <p className="text-sm text-zinc-500">Lo que viene en el calendario del liceo.</p>
            </div>
          </div>
          {eventos.length === 0 ? (
            <p className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 dark:border-white/[.145] dark:bg-white/[.04]">
              No hay eventos próximos visibles para tu rol.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {eventos.map((evento) => (
                <li
                  key={evento.id}
                  className="flex flex-col gap-1 rounded-xl border border-zinc-200 bg-white p-5 sm:flex-row sm:items-center sm:gap-5 dark:border-white/[.145] dark:bg-white/[.04]"
                >
                  <div className="flex shrink-0 items-baseline gap-2 sm:w-40 sm:flex-col sm:gap-0">
                    <span className="text-2xl font-semibold text-primary">
                      {new Date(evento.fecha).getDate()}
                    </span>
                    <span className="text-sm capitalize text-zinc-500">
                      {new Date(evento.fecha).toLocaleDateString("es-UY", {
                        month: "long",
                        weekday: "long",
                      })}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {evento.titulo}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {evento.descripcion}
                    </p>
                    {evento.ubicacion && (
                      <span className="text-xs uppercase tracking-wide text-secondary-dark">
                        {evento.ubicacion}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="avisos-heading">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 id="avisos-heading" className="text-lg font-semibold">
                Avisos de transporte
              </h2>
              <p className="text-sm text-zinc-500">Demoras y cambios en el servicio actualizados.</p>
            </div>
            <Link
              href="/anuncios"
              className="text-sm font-semibold text-primary hover:text-primary-dark"
            >
              Ver todos →
            </Link>
          </div>
          {avisos.length === 0 ? (
            <p className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 dark:border-white/[.145] dark:bg-white/[.04]">
              No hay avisos de transporte para tu rol en este momento.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {avisos.map((aviso) => {
                const linea = aviso.lineaId
                  ? lineas.find((l) => l.id === aviso.lineaId)
                  : null;
                return (
                  <li
                    key={aviso.id}
                    className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-white/[.145] dark:bg-white/[.04]"
                  >
                    <div className="flex flex-wrap items-start gap-2">
                      <span
                        className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${COLOR_PRIORIDAD[aviso.prioridad]}`}
                      >
                        {aviso.prioridad}
                      </span>
                      <h3 className="flex-1 font-semibold text-zinc-900 dark:text-zinc-50">
                        {aviso.titulo}
                      </h3>
                      {linea && (
                        <span
                          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{ backgroundColor: `${linea.color}20`, color: linea.color }}
                        >
                          {linea.nombre}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {aviso.descripcion}
                    </p>
                    <time dateTime={aviso.fecha} className="mt-2 block text-xs text-zinc-500">
                      {formatearFecha(aviso.fecha)}
                    </time>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
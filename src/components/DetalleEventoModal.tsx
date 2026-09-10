"use client";

import {
  type EventoCalendario,
  colorPorTipo,
  formatearDuracion,
} from "@/data/eventos";

const ETIQUETAS_TIPO: Record<string, string> = {
  clase: "Clase",
  examen: "Examen",
  reunion: "Reunión",
  actividad: "Actividad",
  feriado: "Feriado",
  otro: "Otro",
};

type DetalleEventoModalProps = {
  evento: EventoCalendario;
  onClose: () => void;
};

export function DetalleEventoModal({ evento, onClose }: DetalleEventoModalProps) {
  const fechaInicio = new Date(evento.fechaInicio);
  const fechaFin = new Date(fechaInicio.getTime() + evento.duracionMinutos * 60000);

  const formatoHora = (fecha: Date) =>
    fecha.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit", hour12: false });

  const formatoFecha = (fecha: Date) =>
    fecha.toLocaleDateString("es-UY", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle de ${evento.titulo}`}
    >
      <div
        className="w-full max-w-md rounded-xl border border-black/[.08] bg-white p-6 shadow-lg dark:border-white/[.145] dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: colorPorTipo(evento.tipo) }}
              aria-hidden="true"
            />
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
              {evento.titulo}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1 text-zinc-400 hover:bg-black/[.04] hover:text-zinc-600 dark:hover:bg-white/[.06] dark:hover:text-zinc-300"
            aria-label="Cerrar"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="mt-5 flex flex-col gap-4 text-sm">
          {/* Fecha y hora */}
          <div className="flex items-start gap-3">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                {formatoFecha(fechaInicio)}
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                {evento.todoElDia
                  ? "Todo el día"
                  : `${formatoHora(fechaInicio)} – ${formatoHora(fechaFin)}`}
              </p>
            </div>
          </div>

          {/* Duración */}
          {!evento.todoElDia && (
            <div className="flex items-center gap-3">
              <svg className="h-4 w-4 shrink-0 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-zinc-600 dark:text-zinc-400">
                {formatearDuracion(evento.duracionMinutos)}
              </span>
            </div>
          )}

          {/* Tipo */}
          <div className="flex items-center gap-3">
            <svg className="h-4 w-4 shrink-0 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
              style={{ backgroundColor: colorPorTipo(evento.tipo) }}
            >
              {ETIQUETAS_TIPO[evento.tipo] || evento.tipo}
            </span>
          </div>

          {/* Curso/Grupo */}
          {evento.cursoGrupo && (
            <div className="flex items-center gap-3">
              <svg className="h-4 w-4 shrink-0 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-zinc-600 dark:text-zinc-400">
                {evento.cursoGrupo}
              </span>
            </div>
          )}

          {/* Ubicación */}
          {evento.ubicacion && (
            <div className="flex items-center gap-3">
              <svg className="h-4 w-4 shrink-0 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-zinc-600 dark:text-zinc-400">
                {evento.ubicacion}
              </span>
            </div>
          )}

          {/* Descripción */}
          {evento.descripcion && (
            <div className="mt-2 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
              <p className="text-zinc-700 dark:text-zinc-300">
                {evento.descripcion}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

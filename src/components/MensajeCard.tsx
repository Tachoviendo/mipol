"use client";

import { useMensajes } from "@/contexts/MensajesContext";
import { formatearFecha } from "@/lib/date";
import type { Mensaje } from "@/data/mensajes";

export function MensajeCard({ mensaje }: { mensaje: Mensaje }) {
  const { marcarComoLeido } = useMensajes();

  return (
    <article
      className={`rounded-lg border p-4 transition-colors ${
        mensaje.leido
          ? "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
          : "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {!mensaje.leido && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600" />
            )}
            <h3
              className={`text-sm ${
                mensaje.leido
                  ? "font-normal text-zinc-700 dark:text-zinc-300"
                  : "font-semibold text-zinc-950 dark:text-zinc-50"
              }`}
            >
              {mensaje.asunto}
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {mensaje.remitente}
          </p>
          <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
            {mensaje.cuerpo}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <time className="text-xs text-zinc-400 dark:text-zinc-500">
            {formatearFecha(mensaje.fecha)}
          </time>
          {!mensaje.leido && (
            <button
              onClick={() => marcarComoLeido(mensaje.id)}
              className="rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Marcar leído
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

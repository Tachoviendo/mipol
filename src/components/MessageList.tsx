"use client";

import { formatearFecha } from "@/lib/date";
import type { Mensaje } from "@/data/mensajes";

interface MessageListProps {
  mensajes: Mensaje[];
  usuarioActualId: string;
}

export function MessageList({ mensajes, usuarioActualId }: MessageListProps) {
  return (
    <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1">
      {mensajes.map((mensaje) => {
        const esPropio = mensaje.autorId === usuarioActualId;
        return (
          <div
            key={mensaje.id}
            className={`flex gap-3 ${esPropio ? "flex-row-reverse" : ""}`}
          >
            {!esPropio && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {mensaje.autorNombre.charAt(0).toUpperCase()}
              </div>
            )}
            <div
              className={`max-w-[70%] ${
                esPropio ? "text-right" : "text-left"
              }`}
            >
              {!esPropio && (
                <p className="text-xs text-zinc-500 mb-1">
                  {mensaje.autorNombre}
                </p>
              )}
              <div
                className={`inline-block px-4 py-2 rounded-2xl text-sm ${
                  esPropio
                    ? "bg-blue-600 text-white rounded-tr-sm"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-sm"
                }`}
              >
                {mensaje.contenido}
              </div>
              <time
                dateTime={mensaje.fecha}
                className={`mt-1 block text-xs text-zinc-500 ${
                  esPropio ? "text-right" : "text-left"
                }`}
              >
                {formatearFecha(mensaje.fecha)}
              </time>
            </div>
            {esPropio && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-medium text-white">
                {mensaje.autorNombre.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        );
      })}
      {mensajes.length === 0 && (
        <p className="text-center text-zinc-500 mt-8">
          No hay mensajes aún. ¡Inicia la conversación!
        </p>
      )}
    </div>
  );
}
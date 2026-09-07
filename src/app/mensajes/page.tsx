"use client";

import { useState } from "react";
import Link from "next/link";
import { useMensajeria } from "@/lib/mensajeria-context";
import type { Conversacion, Mensaje } from "@/data/mensajeria";
import { conversacionesMock, mensajesMock } from "@/data/mensajeria";
import { formatearFecha } from "@/lib/date";

export default function MensajesPage() {
  const { conversaciones, totalNoLeidos, marcarComoLeida } = useMensajeria();
  const [conversacionSeleccionada, setConversacionSeleccionada] = useState<Conversacion | null>(null);

  const mensajesDeConversacion = (conversacionId: string): Mensaje[] => {
    return mensajesMock
      .filter((m) => m.conversacionId === conversacionId)
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  };

  const handleMarcarLeida = (conversacionId: string) => {
    marcarComoLeida(conversacionId);
    if (conversacionSeleccionada?.id === conversacionId) {
      setConversacionSeleccionada(conversaciones.find((c) => c.id === conversacionId) || null);
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 py-6">
        <div className="flex w-full gap-6">
          <aside className="w-full max-w-xs flex flex-col gap-4 border border-black/[.08] bg-white rounded-xl p-4 dark:border-white/[.145] dark:bg-zinc-900">
            <h2 className="flex items-center justify-between text-lg font-semibold text-black dark:text-zinc-50">
              Conversaciones
              {totalNoLeidos > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                  {totalNoLeidos}
                </span>
              )}
            </h2>
            <div className="flex-1 overflow-y-auto flex flex-col gap-2">
              {conversaciones.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setConversacionSeleccionada(conv)}
                  className={`flex items-start gap-3 rounded-lg p-3 text-left transition-colors ${
                    conv.noLeidos > 0
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-200 flex items-center justify-center dark:bg-zinc-700">
                    {conv.tipo === "1:1" ? (
                      <svg className="h-5 w-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-4.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : conv.tipo === "grupal" ? (
                      <svg className="h-5 w-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`font-medium truncate ${conv.noLeidos > 0 ? "font-semibold text-black dark:text-white" : "text-zinc-700 dark:text-zinc-300"}`}>
                        {conv.nombre || conv.participantes.map((p) => p.nombre).join(", ")}
                      </h3>
                      {conv.noLeidos > 0 && (
                        <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white">
                          {conv.noLeidos}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 truncate text-sm text-zinc-500 dark:text-zinc-400">
                      {conv.ultimoMensaje?.contenido || "Sin mensajes"}
                    </p>
                    <time className="block mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                      {conv.ultimoMensaje ? formatearFecha(conv.ultimoMensaje.fecha) : ""}
                    </time>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <section className="flex-1 flex flex-col">
            {conversacionSeleccionada ? (
              <>
                <div className="flex items-center justify-between border-b border-black/[.08] pb-4 mb-4 dark:border-white/[.145]">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-zinc-200 flex items-center justify-center dark:bg-zinc-700">
                      {conversacionSeleccionada.tipo === "1:1" ? (
                        <svg className="h-6 w-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-4.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      ) : conversacionSeleccionada.tipo === "grupal" ? (
                        <svg className="h-6 w-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      ) : (
                        <svg className="h-6 w-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-black dark:text-zinc-500">
                        {conversacionSeleccionada.nombre || conversacionSeleccionada.participantes.map((p) => p.nombre).join(", ")}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 capitalize">
                        {conversacionSeleccionada.tipo === "1:1" && "Chat privado"}
                        {conversacionSeleccionada.tipo === "grupal" && "Grupo"}
                        {conversacionSeleccionada.tipo === "aviso_curso" && "Aviso de curso"}
                      </p>
                    </div>
                  </div>
                  {conversacionSeleccionada.noLeidos > 0 && (
                    <button
                      onClick={() => handleMarcarLeida(conversacionSeleccionada.id)}
                      className="rounded-lg bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
                    >
                      Marcar como leída
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto space-y-4">
                  {mensajesDeConversacion(conversacionSeleccionada.id).map((msg) => {
                    const remitente = conversacionSeleccionada.participantes.find((p) => p.id === msg.remitenteId);
                    const esPropio = msg.remitenteId === "u2";
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${esPropio ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          className={`flex-1 max-w-[70%] ${esPropio ? "text-right" : ""}`}
                        >
                          {!esPropio && (
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                              {remitente?.nombre}
                            </p>
                          )}
                          <div
                            className={`inline-block rounded-2xl px-4 py-2 text-sm ${
                              esPropio
                                ? "bg-blue-600 text-white rounded-tr-sm"
                                : "bg-white dark:bg-zinc-800 rounded-tl-sm border border-black/[.08] dark:border-white/[.145]"
                            }`}
                          >
                            {msg.contenido}
                          </div>
                          <time className="block mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                            {formatearFecha(msg.fecha)}
                          </time>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 border-t border-black/[.08] pt-4 dark:border-white/[.145]">
                  <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      placeholder="Escribe un mensaje..."
                      className="flex-1 rounded-lg border border-black/[.08] bg-white px-4 py-2 dark:border-white/[.145] dark:bg-zinc-800"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Enviar
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                <p>Selecciona una conversación para ver los mensajes</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
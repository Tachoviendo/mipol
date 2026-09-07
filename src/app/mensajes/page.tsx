"use client";

import { useState, useEffect, useRef } from "react";
import { MessageList } from "@/components/MessageList";
import { MessageComposer } from "@/components/MessageComposer";
import type { Mensaje } from "@/data/mensajes";
import { mensajesMock } from "@/data/mensajes";

const USUARIO_ACTUAL_ID = "1";

export default function MensajesPage() {
  const [mensajes, setMensajes] = useState<Mensaje[]>(mensajesMock);
  const [enviando, setEnviando] = useState(false);
  const contenedorRef = useRef<HTMLDivElement>(null);

  const scrollAlFinal = () => {
    contenedorRef.current?.scrollTo({
      top: contenedorRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollAlFinal();
  }, [mensajes]);

  const manejarEnviar = (contenido: string) => {
    setEnviando(true);
    // Simular envío asíncrono
    setTimeout(() => {
      const nuevoMensaje: Mensaje = {
        id: Date.now().toString(),
        contenido,
        autorId: USUARIO_ACTUAL_ID,
        autorNombre: "Tú",
        fecha: new Date().toISOString(),
      };
      setMensajes((prev) => [...prev, nuevoMensaje]);
      setEnviando(false);
    }, 300);
  };

  return (
    <div className="flex flex-col h-full max-h-screen bg-white dark:bg-zinc-900">
      <header className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          Conversación
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          María García &bull; Docente
        </p>
      </header>

      <div
        ref={contenedorRef}
        className="flex-1 overflow-hidden"
      >
        <MessageList
          mensajes={mensajes}
          usuarioActualId={USUARIO_ACTUAL_ID}
        />
      </div>

      <MessageComposer
        onEnviar={manejarEnviar}
        deshabilitado={enviando}
      />
    </div>
  );
}
"use client";

import { useMensajes } from "@/contexts/MensajesContext";
import { MensajeCard } from "@/components/MensajeCard";

export default function MensajesPage() {
  const { mensajes, noLeidos } = useMensajes();

  const ordenados = [...mensajes].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
            Mensajes
          </h1>
          {noLeidos > 0 && (
            <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-bold text-white">
              {noLeidos} sin leer
            </span>
          )}
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Tus mensajes recibidos. Marca como leídos los que ya revisaste.
        </p>
        <div className="flex flex-col gap-3">
          {ordenados.map((mensaje) => (
            <MensajeCard key={mensaje.id} mensaje={mensaje} />
          ))}
        </div>
      </main>
    </div>
  );
}

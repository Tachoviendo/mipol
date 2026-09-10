import Link from "next/link";
import { conversaciones, participantesConversacion } from "@/data/mensajes";
import { formatearFecha } from "@/lib/date";

/**
 * `src/app/conversaciones/page.tsx`: listado de conversaciones disponibles.
 * Permite navegar al historial completo de cada una.
 */
export default function ConversacionesPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col gap-4">
        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
          Conversaciones
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Seleccioná una conversación para ver el historial completo.
        </p>
        <div className="flex flex-col gap-3">
          {conversaciones.map((conversacion) => {
            const participantes = participantesConversacion(
              conversacion.participantes,
            );
            return (
              <Link
                key={conversacion.id}
                href={`/conversaciones/${conversacion.id}`}
                className="rounded-lg border border-black/[.08] p-5 transition-colors hover:bg-zinc-100 dark:border-white/[.145] dark:hover:bg-zinc-800"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                      {conversacion.titulo}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                      {conversacion.esGrupal && (
                        <span className="rounded-full bg-zinc-200 px-2 py-0.5 dark:bg-zinc-700">
                          Grupal
                        </span>
                      )}
                      {conversacion.curso && (
                        <span className="rounded-full bg-zinc-200 px-2 py-0.5 dark:bg-zinc-700">
                          {conversacion.curso}
                        </span>
                      )}
                      <span>
                        {participantes.map((p) => p.nombre).join(", ")}
                      </span>
                    </div>
                  </div>
                  <time
                    dateTime={conversacion.fechaCreacion}
                    className="whitespace-nowrap text-xs text-zinc-400"
                  >
                    {formatearFecha(conversacion.fechaCreacion)}
                  </time>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

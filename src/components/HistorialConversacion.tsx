import { MensajeItem } from "@/components/MensajeItem";
import {
  type Mensaje,
  type Conversacion,
  obtenerUsuario,
  participantesConversacion,
} from "@/data/mensajes";

/**
 * `src/components/HistorialConversacion.tsx`: muestra el historial completo
 * de una conversación con mensajes en orden cronológico,
 * indicando autor y fecha de cada mensaje.
 */
export function HistorialConversacion({
  conversacion,
  mensajes,
  usuarioActualId,
}: {
  conversacion: Conversacion;
  mensajes: Mensaje[];
  usuarioActualId: string;
}) {
  const participantes = participantesConversacion(conversacion.participantes);

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-2">
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
      </header>

      <div className="flex flex-col gap-4">
        {mensajes.map((mensaje) => {
          const autor = obtenerUsuario(mensaje.autorId);
          if (!autor) return null;

          return (
            <MensajeItem
              key={mensaje.id}
              mensaje={mensaje}
              autor={autor}
              esPropio={mensaje.autorId === usuarioActualId}
            />
          );
        })}
      </div>
    </div>
  );
}

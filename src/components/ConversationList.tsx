import type { Conversacion } from "@/data/ejemplo";
import { ConversationCard } from "./ConversationCard";

export function ConversationList({ conversaciones }: { conversaciones: Conversacion[] }) {
  const ordenadas = [...conversaciones].sort(
    (a, b) => new Date(b.ultimoMensaje.fecha).getTime() - new Date(a.ultimoMensaje.fecha).getTime()
  );

  return (
    <section aria-label="Lista de conversaciones">
      <ul className="flex flex-col gap-3" role="list">
        {ordenadas.map((conversacion) => (
          <li key={conversacion.id}>
            <ConversationCard conversacion={conversacion} />
          </li>
        ))}
      </ul>
    </section>
  );
}
import { ConversationList } from "@/components/ConversationList";
import { conversaciones } from "@/data/ejemplo";

export const metadata = {
  title: "Mensajes",
  description: "Tus conversaciones ordenadas por actividad reciente",
};

export default function MensajesPage() {
  return (
    <div className="flex flex-col flex-1 w-full max-w-3xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
          Mensajes
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Tus conversaciones ordenadas por actividad reciente
        </p>
      </header>

      <ConversationList conversaciones={conversaciones} />
    </div>
  );
}
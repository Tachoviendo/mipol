import { formatearFecha, formatearHora } from "@/lib/date";
import type { Mensaje, Usuario } from "@/data/mensajes";

/**
 * `src/components/MensajeItem.tsx`: muestra un mensaje individual
 * con autor, contenido, fecha y hora.
 */
export function MensajeItem({
  mensaje,
  autor,
  esPropio,
}: {
  mensaje: Mensaje;
  autor: Usuario;
  esPropio: boolean;
}) {
  return (
    <article
      className={
        mensaje.esInicial
          ? "border-l-4 border-teal-500 bg-teal-50 p-6"
          : "border-t border-zinc-200 py-6"
      }
    >
      <div
        className={`flex flex-col gap-1 ${
          esPropio ? "items-end" : "items-start"
        }`}
      >
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">
          {autor.nombre}
        </span>
        <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] uppercase text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400">
          {autor.rol}
        </span>
        <time dateTime={mensaje.fecha} className="text-zinc-400">
          {formatearFecha(mensaje.fecha)} {formatearHora(mensaje.fecha)}
        </time>
      </div>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
          esPropio
            ? "bg-blue-600 text-white dark:bg-blue-500"
            : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
        }`}
      >
        {mensaje.contenido}
      </div>
      </div>
    </article>
  );
}

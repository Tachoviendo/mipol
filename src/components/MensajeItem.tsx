import { formatearFecha, formatearHora } from "@/lib/date";
import type { Mensaje, Usuario } from "@/data/mensajes";

/**
 * `src/components/MensajeItem.tsx`: muestra un mensaje de la bandeja
 * de entrada con autor, fecha y hora, alineado a la derecha si es propio.
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
    <article className="flex flex-col gap-1 py-4">
      <div
        className={`flex items-center gap-2 text-xs text-zinc-500 ${
          esPropio ? "justify-end" : ""
        }`}
      >
        <span className="font-medium text-zinc-700 dark:text-zinc-300">
          {autor.nombre}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
            esPropio
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400"
          }`}
        >
          {autor.rol}
        </span>
        <time dateTime={mensaje.fecha} className="text-zinc-400">
          {formatearFecha(mensaje.fecha)} {formatearHora(mensaje.fecha)}
        </time>
      </div>
      <div
        className={`max-w-[75%] rounded-lg px-4 py-2 text-sm whitespace-pre-wrap break-words ${
          esPropio
            ? "ml-auto bg-blue-600 text-white dark:bg-blue-500"
            : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
        }`}
      >
        {mensaje.contenido}
      </div>
    </article>
  );
}
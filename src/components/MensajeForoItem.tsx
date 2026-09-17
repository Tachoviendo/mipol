import { eliminarMensajeAction } from "@/app/foros/actions";
import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton";
import { formatearFecha, formatearHora } from "@/lib/date";
import type { MensajeForo } from "@/data/foros";

/**
 * `src/components/MensajeForoItem.tsx`: muestra un mensaje dentro de un
 * hilo de foro, resaltando el mensaje inicial y ofreciendo borrado
 * para moderadores.
 */
export function MensajeForoItem({
  mensaje,
  categoriaId,
  puedeEliminar,
}: {
  mensaje: MensajeForo;
  categoriaId: string;
  puedeEliminar: boolean;
}) {
  const esInicial = mensaje.esInicial ?? false;

  return (
    <article
      className={
        esInicial
          ? "border-l-4 border-teal-500 bg-teal-50 px-6 py-5 sm:px-7"
          : "border-t border-zinc-100 px-6 py-5 sm:px-7"
      }
    >
      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
        <span className="font-medium text-zinc-700">{mensaje.autor}</span>
        {esInicial && (
          <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-teal-700">
            Inicio del hilo
          </span>
        )}
        <time dateTime={mensaje.fecha} className="text-zinc-400">
          {formatearFecha(mensaje.fecha)} {formatearHora(mensaje.fecha)}
        </time>
        {puedeEliminar && !esInicial && (
          <form action={eliminarMensajeAction} className="ml-auto">
            <input type="hidden" name="categoriaId" value={categoriaId} />
            <input type="hidden" name="hiloId" value={mensaje.hiloId} />
            <input type="hidden" name="mensajeId" value={mensaje.id} />
            <ConfirmSubmitButton
              mensajeConfirmacion="¿Eliminar este mensaje?"
              className="rounded-md border border-zinc-300 px-2 py-1 text-[11px] font-medium text-zinc-600 hover:bg-zinc-50"
            >
              Eliminar
            </ConfirmSubmitButton>
          </form>
        )}
      </div>
      <p className="mt-1.5 text-sm whitespace-pre-wrap break-words text-zinc-800">
        {mensaje.contenido}
      </p>
    </article>
  );
}
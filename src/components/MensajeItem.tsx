import { eliminarMensajeAction } from "@/app/foros/actions";
import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton";
import type { MensajeForo as MensajeForoData } from "@/data/foros";
import { formatearFecha } from "@/lib/date";

export function MensajeItem({
  mensaje,
  categoriaId,
  puedeEliminar = false,
}: {
  mensaje: MensajeForoData;
  categoriaId: string;
  puedeEliminar?: boolean;
}) {
  return (
    <article
      className={
        mensaje.esInicial
          ? "border-l-4 border-teal-500 bg-teal-50 p-6"
          : "border-t border-zinc-200 py-6"
      }
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-semibold text-zinc-950">{mensaje.autor}</p>
        <time dateTime={mensaje.fecha} className="text-sm text-zinc-500">
          {formatearFecha(mensaje.fecha)}
        </time>
      </div>
      <p className="mt-3 whitespace-pre-line text-base leading-7 text-zinc-700">
        {mensaje.contenido}
      </p>
      {puedeEliminar && mensaje.esInicial && (
        <p className="mt-3 text-xs text-zinc-400">
          Para eliminar el mensaje inicial, eliminá el hilo completo.
        </p>
      )}
      {puedeEliminar && !mensaje.esInicial && (
        <form action={eliminarMensajeAction} className="mt-3">
          <input type="hidden" name="categoriaId" value={categoriaId} />
          <input type="hidden" name="hiloId" value={mensaje.hiloId} />
          <input type="hidden" name="mensajeId" value={mensaje.id} />
          <ConfirmSubmitButton
            mensajeConfirmacion="¿Eliminar esta respuesta?"
            className="text-xs font-semibold text-red-700 hover:underline"
          >
            Eliminar
          </ConfirmSubmitButton>
        </form>
      )}
    </article>
  );
}
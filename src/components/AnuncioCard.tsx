import { formatearFecha } from "@/lib/date";
import type { Anuncio } from "@/data/ejemplo";

/**
 * `src/components`: componentes de UI reutilizables entre páginas.
 */
export function AnuncioCard({ titulo, descripcion, fecha }: Anuncio) {
  return (
    <article className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
      <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
        {titulo}
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {descripcion}
      </p>
      <time
        dateTime={fecha}
        className="mt-3 block text-xs uppercase tracking-wide text-zinc-500"
      >
        {formatearFecha(fecha)}
      </time>
    </article>
  );
}

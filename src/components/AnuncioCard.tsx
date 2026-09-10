import { formatearFecha } from "@/lib/date";
import type { Anuncio } from "@/data/ejemplo";

/**
 * `src/components`: componentes de UI reutilizables entre páginas.
 */
export function AnuncioCard({ titulo, descripcion, fecha }: Anuncio) {
  return (
    <article className="rounded-lg border border-primary-light bg-white p-5 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]">
      <h2 className="text-lg font-semibold text-primary dark:text-secondary-light">
        {titulo}
      </h2>
      <p className="mt-1 text-sm text-foreground/70">
        {descripcion}
      </p>
      <time
        dateTime={fecha}
        className="mt-3 block text-xs uppercase tracking-wide text-secondary-dark"
      >
        {formatearFecha(fecha)}
      </time>
    </article>
  );
}

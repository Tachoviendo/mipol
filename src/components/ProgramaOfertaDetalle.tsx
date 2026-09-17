import type { ProgramaOferta } from "@/data/oferta";

/**
 * `src/components/ProgramaOfertaDetalle.tsx`: detalle completo de un
 * programa/curso de la oferta educativa.
 */
export function ProgramaOfertaDetalle({
  programa,
}: {
  programa: ProgramaOferta;
}) {
  const esTerciaria = programa.tipo === "terciaria";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <span
          className={`self-start rounded-full px-2.5 py-1 text-xs font-medium ${
            esTerciaria
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          }`}
        >
          {esTerciaria ? "Oferta terciaria" : "Oferta interna"}
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          {programa.nombre}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          {programa.descripcion}
        </p>
      </div>

      <dl className="flex flex-col gap-4">
        <div className="rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 p-4">
          <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Duración
          </dt>
          <dd className="mt-1 text-black dark:text-zinc-50">
            {programa.duracion}
          </dd>
        </div>

        <div className="rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 p-4">
          <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Cupos
          </dt>
          <dd className="mt-1 text-black dark:text-zinc-50">
            {programa.cupos > 0 ? programa.cupos : "Ilimitados"}
          </dd>
        </div>

        <div className="rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 p-4">
          <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Requisitos
          </dt>
          <dd className="mt-1 text-black dark:text-zinc-50">
            {programa.requisitos}
          </dd>
        </div>

        <section className="rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 p-4">
          <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Contacto e inscripción
          </h2>
          <p className="mt-1 text-black dark:text-zinc-50">
            {programa.contactoInscripcion}
          </p>
        </section>
      </dl>
    </div>
  );
}
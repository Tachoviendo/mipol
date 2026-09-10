import Link from "next/link";

import type { CategoriaForo } from "@/data/foros";

type CategoriaForoCardProps = CategoriaForo & { cantidadHilos: number };

export function CategoriaForoCard({
  id,
  nombre,
  descripcion,
  cantidadHilos,
}: CategoriaForoCardProps) {
  return (
    <Link
      href={`/foros/${id}`}
      className="group flex flex-col justify-between gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
    >
      <div>
        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-lg font-semibold text-emerald-800">
            {nombre.charAt(0)}
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
            {cantidadHilos} {cantidadHilos === 1 ? "hilo" : "hilos"}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-zinc-950 group-hover:text-emerald-800">
          {nombre}
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{descripcion}</p>
      </div>
      <span className="text-sm font-semibold text-emerald-800">Ver hilos</span>
    </Link>
  );
}
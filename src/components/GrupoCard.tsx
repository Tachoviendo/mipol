import Link from "next/link";

import type { Grupo } from "@/data/grupos";
import { nombreDeUsuario } from "@/data/grupos";

type GrupoCardProps = {
  grupo: Grupo;
  cantidadMiembros: number;
};

export function GrupoCard({ grupo, cantidadMiembros }: GrupoCardProps) {
  return (
    <Link
      href={`/grupos/${grupo.id}`}
      className="group flex flex-col justify-between gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
    >
      <div>
        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="flex size-11 items-center justify-center rounded-xl bg-brand-100 text-lg font-semibold text-brand-700">
            {grupo.nombre.charAt(0)}
          </span>
          <span
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600"
            title="Curso"
          >
            {grupo.curso}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-zinc-950 group-hover:text-brand-800">
          {grupo.nombre}
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{grupo.materia}</p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-zinc-500">
          <svg
            className="size-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          {grupo.descripcion ?? "Docente a cargo"}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">
          {cantidadMiembros} {cantidadMiembros === 1 ? "miembro" : "miembros"}
        </span>
        <span className="text-sm font-semibold text-brand-700">
          {nombreDeUsuario(grupo.docenteId)}
        </span>
      </div>
    </Link>
  );
}
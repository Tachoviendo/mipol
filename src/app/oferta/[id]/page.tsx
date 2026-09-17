"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { programasOferta } from "@/data/oferta";
import { ProgramaOfertaDetalle } from "@/components/ProgramaOfertaDetalle";

export default function ProgramaPage() {
  const { id } = useParams<{ id: string }>();
  const programa = programasOferta.find((p) => p.id === id);

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col w-full max-w-3xl gap-6 py-12 px-6">
        <Link
          href="/oferta"
          className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50"
        >
          &larr; Volver a la oferta educativa
        </Link>

        {programa ? (
          <ProgramaOfertaDetalle programa={programa} />
        ) : (
          <p className="rounded-xl border border-black/[.08] bg-white p-8 text-center text-sm text-zinc-500 dark:border-white/[.145] dark:bg-white/[.04]">
            No encontramos ese programa de la oferta educativa.
          </p>
        )}
      </main>
    </div>
  );
}
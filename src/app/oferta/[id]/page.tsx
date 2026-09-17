import { notFound } from "next/navigation";
import Link from "next/link";

import { programasOferta } from "@/data/oferta";
import { ProgramaOfertaDetalle } from "@/components/ProgramaOfertaDetalle";

export function generateStaticParams() {
  return programasOferta.map((programa) => ({ id: programa.id }));
}

export default async function ProgramaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const programa = programasOferta.find((p) => p.id === id);

  if (!programa) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col w-full max-w-3xl gap-6 py-12 px-6">
        <Link
          href="/oferta"
          className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50"
        >
          &larr; Volver a la oferta educativa
        </Link>
        <ProgramaOfertaDetalle programa={programa} />
      </main>
    </div>
  );
}
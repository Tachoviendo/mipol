import { notFound } from "next/navigation";
import Link from "next/link";
import { lineas } from "@/data/transporte";
import { LineaDetalle } from "@/components/LineaDetalle";

export function generateStaticParams() {
  return lineas.map((linea) => ({ id: linea.id }));
}

export default async function LineaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const linea = lineas.find((l) => l.id === id);

  if (!linea) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col w-full max-w-3xl gap-6 py-12 px-6">
        <Link
          href="/lineas"
          className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50"
        >
          &larr; Volver a líneas
        </Link>
        <LineaDetalle linea={linea} />
      </main>
    </div>
  );
}
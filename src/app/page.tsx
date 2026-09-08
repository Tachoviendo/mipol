import Link from "next/link";
import { BuscadorParadas } from "@/components/BuscadorParadas";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col w-full max-w-3xl gap-8 py-12 px-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Transporte Público de Salto
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Encontrá qué líneas pasan por tu zona
          </p>
        </div>

        <BuscadorParadas />

        <div className="flex justify-center pt-4">
          <Link
            href="/lineas"
            className="rounded-full bg-black/[.06] dark:bg-white/[.08] px-6 py-3 text-sm font-medium text-black dark:text-zinc-50 transition-colors hover:bg-black/[.1] dark:hover:bg-white/[.12]"
          >
            Ver todas las líneas
          </Link>
        </div>
      </main>
    </div>
  );
}

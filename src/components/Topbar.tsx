"use client";

import Link from "next/link";
import { useMensajes } from "@/contexts/MensajesContext";

export function Topbar() {
  const { noLeidos } = useMensajes();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-3 dark:border-zinc-800 dark:bg-zinc-950">
      <Link href="/" className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
        mipol
      </Link>

      <nav className="flex items-center gap-4">
        <Link
          href="/lineas"
          className="text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Líneas
        </Link>
        <Link
          href="/anuncios"
          className="text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Anuncios
        </Link>
        <Link
          href="/mensajes"
          className="relative text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Mensajes
          {noLeidos > 0 && (
            <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
              {noLeidos}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

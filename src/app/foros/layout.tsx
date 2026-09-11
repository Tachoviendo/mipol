import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RolSwitcher } from "@/components/RolSwitcher";
import { obtenerNombreMostrado, obtenerRolActual } from "@/lib/rol-actual";

export const metadata: Metadata = {
  title: {
    template: "%s · Foros · mipol",
    default: "Foros · mipol",
  },
};

export default async function ForosLayout({ children }: { children: ReactNode }) {
  const [rolActual, nombreActual] = await Promise.all([
    obtenerRolActual(),
    obtenerNombreMostrado(),
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-zinc-200 bg-white px-6 py-3 sm:px-10">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-2">
          <span className="text-xs uppercase tracking-wide text-zinc-400">
            Selector temporal, hasta que exista autenticación real
          </span>
          <RolSwitcher rolActual={rolActual} nombreActual={nombreActual} />
        </div>
      </div>
      {children}
    </div>
  );
}

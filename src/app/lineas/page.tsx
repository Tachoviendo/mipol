import { lineas } from "@/data/transporte";

export default function LineasPage() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col w-full max-w-3xl gap-6 py-12 px-6">
        <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Líneas de transporte
        </h1>
        <ul className="flex flex-col gap-4">
          {lineas.map((linea) => (
            <li
              key={linea.id}
              className="flex items-start gap-4 rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 p-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:hover:bg-[#1a1a1a]"
            >
              <span
                className="mt-1 block h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: linea.color }}
              />
              <div className="flex flex-col gap-1">
                <span className="font-medium text-black dark:text-zinc-50">
                  {linea.nombre}
                </span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {linea.descripcion}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

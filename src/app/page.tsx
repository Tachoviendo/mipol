import Link from "next/link";

const MODULOS = [
  {
    href: "/lineas",
    titulo: "Transporte",
    descripcion: "Líneas, paradas y novedades del transporte urbano.",
  },
  {
    href: "/anuncios",
    titulo: "Anuncios",
    descripcion: "Avisos del liceo y novedades por curso.",
  },
  {
    href: "/calendario",
    titulo: "Calendario",
    descripcion: "Eventos y fechas importantes del año lectivo.",
  },
  {
    href: "/mensajes",
    titulo: "Mensajes",
    descripcion: "Chats 1:1, grupales y avisos por curso.",
  },
  {
    href: "/foros",
    titulo: "Foros",
    descripcion: "Discusiones por categorías y comisiones.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col gap-8 px-6 py-12">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-brand-800 dark:text-brand-200">
            Liceo 1° de Salto
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            MiPol — Plataforma para la comunidad educativa.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {MODULOS.map((modulo) => (
            <Link
              key={modulo.href}
              href={modulo.href}
              className="group flex flex-col gap-1 rounded-xl border border-black/[.08] bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md dark:border-white/[.145] dark:bg-zinc-900"
            >
              <h2 className="text-lg font-semibold text-zinc-950 group-hover:text-brand-800 dark:text-zinc-50 dark:group-hover:text-brand-200">
                {modulo.titulo}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {modulo.descripcion}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
 21-f-08-iconografía-y-estados-vacíos
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-primary-light font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-primary dark:text-secondary-light">
            Liceo 1° de Salto
          </h1>
          <p className="max-w-md text-lg leading-8 text-foreground/70">
            Proyecto colaborativo: Bienvenida a la plataforma del liceo.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 text-white transition-colors hover:bg-secondary-dark md:w-[200px]"
            href="/anuncios"
          >
            Ver anuncios
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-primary px-5 text-primary transition-colors hover:bg-primary-light md:w-[200px]"
            href="/anuncios"
          >
            Explorar
          </a>

 22-f-09-paleta-y-look-feel-spike
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

import { ResumenHome } from "@/components/ResumenHome";
import { RolSwitcher } from "@/components/RolSwitcher";
import { obtenerNombreMostrado, obtenerRolActual } from "@/lib/rol-actual";

export default async function Home() {
  const [rol, nombre] = await Promise.all([
    obtenerRolActual(),
    obtenerNombreMostrado(),
  ]);
 main

  return (
 22-f-09-paleta-y-look-feel-spike
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

    <div className="flex flex-1 flex-col">
      <div className="border-b border-zinc-200 bg-white px-6 py-3 sm:px-10">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-2">
          <span className="text-xs uppercase tracking-wide text-zinc-400">
            Selector temporal, hasta que exista autenticación real
          </span>
          <RolSwitcher rolActual={rol} nombreActual={nombre} />
 main
 main
        </div>
      </div>
      <ResumenHome rol={rol} />
    </div>
  );
}
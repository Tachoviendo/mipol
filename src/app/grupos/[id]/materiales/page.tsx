import Link from "next/link";
import { notFound } from "next/navigation";

import {
  etiquetaTipoMaterial,
  obtenerMaterialesDeGrupo,
  obtenerGrupo,
  obtenerMaterialesPorTipo,
  nombreDeUsuario,
  TIPOS_MATERIAL,
  type TipoMaterial,
} from "@/data/grupos";
import { formatearFecha } from "@/lib/date";
import { obtenerRolActual } from "@/lib/rol-actual";
import { puedeVerGrupos } from "@/lib/roles";

function formatoTamano(tamanoKb?: number): string | undefined {
  if (!tamanoKb) return undefined;
  if (tamanoKb >= 1024) return `${(tamanoKb / 1024).toFixed(1)} MB`;
  return `${Math.round(tamanoKb)} KB`;
}

export default async function GrupoMaterialesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tipo?: string }>;
}) {
  const { id } = await params;
  const { tipo } = await searchParams;
  const grupo = obtenerGrupo(id);
  if (!grupo) notFound();

  const rolActual = await obtenerRolActual();
  if (!puedeVerGrupos(rolActual)) notFound();

  const tipoValido: TipoMaterial | undefined = TIPOS_MATERIAL.some(
    (t) => t.valor === tipo,
  )
    ? (tipo as TipoMaterial)
    : undefined;

  const materiales =
    tipoValido === undefined
      ? obtenerMaterialesDeGrupo(grupo.id)
      : obtenerMaterialesPorTipo(grupo.id, tipoValido);

  const gruposMateriales =
    tipoValido === undefined
      ? TIPOS_MATERIAL.map((tipoDef) => ({
          tipo: tipoDef,
          materiales: obtenerMaterialesPorTipo(grupo.id, tipoDef.valor),
        })).filter((grupoMat) => grupoMat.materiales.length > 0)
      : [];

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black sm:px-10 sm:py-16">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <header>
          <Link
            href={`/grupos/${grupo.id}`}
            className="text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
          >
            ← Volver al muro del grupo
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
            {grupo.materia} · {grupo.curso}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Materiales
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Recursos compartidos por el docente para que puedas estudiar y
            repasar los contenidos del curso.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href={`/grupos/${grupo.id}`}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-white/[.2] dark:text-zinc-200 dark:hover:bg-white/[.06]"
            >
              Muro
            </Link>
            <span className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white">
              Materiales ({materiales.length})
            </span>
          </div>
        </header>

        <nav aria-label="Filtrar materiales por tipo">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-zinc-500">Filtrar:</span>
            <Link
              href={`/grupos/${grupo.id}/materiales`}
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                tipoValido === undefined
                  ? "bg-brand-600 text-white"
                  : "border border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:border-white/[.2] dark:text-zinc-300 dark:hover:bg-white/[.06]"
              }`}
            >
              Todos
            </Link>
            {TIPOS_MATERIAL.map((tipoDef) => (
              <Link
                key={tipoDef.valor}
                href={`/grupos/${grupo.id}/materiales?tipo=${tipoDef.valor}`}
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  tipoValido === tipoDef.valor
                    ? "bg-brand-600 text-white"
                    : "border border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:border-white/[.2] dark:text-zinc-300 dark:hover:bg-white/[.06]"
                }`}
              >
                {tipoDef.etiqueta}
              </Link>
            ))}
          </div>
        </nav>

        {materiales.length === 0 ? (
          <p className="rounded-xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 dark:border-white/[.145] dark:bg-white/[.04]">
            {tipoValido
              ? "Todavía no hay materiales de este tipo en el grupo."
              : "Todavía no hay materiales en este grupo."}
          </p>
        ) : tipoValido === undefined ? (
          <div className="flex flex-col gap-8">
            {gruposMateriales.map((grupoMat) => (
              <section key={grupoMat.tipo.valor} aria-labelledby={`tipo-${grupoMat.tipo.valor}`}>
                <h2
                  id={`tipo-${grupoMat.tipo.valor}`}
                  className="mb-3 flex items-center gap-2 text-lg font-semibold"
                >
                  <span aria-hidden="true">
                    <IconoTipo tipo={grupoMat.tipo.valor} />
                  </span>
                  {grupoMat.tipo.etiqueta}
                  <span className="text-sm font-normal text-zinc-400">
                    {grupoMat.materiales.length}
                  </span>
                </h2>
                <ul className="flex flex-col gap-3">
                  {grupoMat.materiales.map((material) => (
                    <MaterialCard
                      key={material.id}
                      materialUrl={material.url}
                      titulo={material.titulo}
                      tipoEtiqueta={grupoMat.tipo.etiqueta}
                      autor={nombreDeUsuario(material.publicadoPorId)}
                      fecha={`${formatearFecha(material.fecha)}`}
                      tamano={formatoTamano(material.tamanoKb)}
                    />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {materiales.map((material) => (
              <MaterialCard
                key={material.id}
                materialUrl={material.url}
                titulo={material.titulo}
                tipoEtiqueta={etiquetaTipoMaterial(material.tipo)}
                autor={nombreDeUsuario(material.publicadoPorId)}
                fecha={`${formatearFecha(material.fecha)}`}
                tamano={formatoTamano(material.tamanoKb)}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

function MaterialCard({
  materialUrl,
  titulo,
  tipoEtiqueta,
  autor,
  fecha,
  tamano,
}: {
  materialUrl?: string;
  titulo: string;
  tipoEtiqueta: string;
  autor: string;
  fecha: string;
  tamano?: string;
}) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/[.145] dark:bg-white/[.04]">
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/40">
          <IconoTipo
            tipo={
              tipoEtiqueta === "Guía"
                ? "guia"
                : tipoEtiqueta === "Apunte"
                  ? "apunte"
                  : tipoEtiqueta === "Presentación"
                    ? "presentacion"
                    : tipoEtiqueta === "Video"
                      ? "video"
                      : tipoEtiqueta === "Ejercicios"
                        ? "ejercicios"
                        : "enlace"
            }
          />
        </span>
        <div>
          <h3 className="text-base font-semibold leading-6 text-zinc-900 dark:text-zinc-50">
            {titulo}
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            <span className="font-medium text-brand-700 dark:text-brand-300">
              {tipoEtiqueta}
            </span>
            {" · "}
            {autor}
            {" · "}
            {fecha}
            {tamano ? ` · ${tamano}` : ""}
          </p>
        </div>
      </div>
      <Link
        href={materialUrl ?? "#"}
        target={materialUrl?.startsWith("http") ? "_blank" : undefined}
        className="shrink-0 rounded-lg border border-brand-600 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-900/30"
      >
        Abrir
      </Link>
    </li>
  );
}

function IconoTipo({ tipo }: { tipo: TipoMaterial }) {
  const clases = "h-5 w-5 text-brand-700 dark:text-brand-300";
  switch (tipo) {
    case "guia":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={clases} aria-hidden="true">
          <path d="M4 5h6a3 3 0 0 1 3 3v11a2 2 0 0 0-2-2H4z" strokeLinejoin="round" />
          <path d="M20 5h-6a3 3 0 0 0-3 3v11a2 2 0 0 1 2-2h7z" strokeLinejoin="round" />
        </svg>
      );
    case "presentacion":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={clases} aria-hidden="true">
          <rect x="3" y="3" width="18" height="12" rx="2" strokeLinejoin="round" />
          <path d="M8 21l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 15v6" strokeLinecap="round" />
        </svg>
      );
    case "video":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={clases} aria-hidden="true">
          <rect x="3" y="6" width="13" height="12" rx="2" strokeLinejoin="round" />
          <path d="M16 10l5-3v10l-5-3" strokeLinejoin="round" />
        </svg>
      );
    case "ejercicios":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={clases} aria-hidden="true">
          <path d="M12 3l8 5v8l-8 5-8-5V8z" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "enlace":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={clases} aria-hidden="true">
          <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={clases} aria-hidden="true">
          <path d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" strokeLinejoin="round" />
          <path d="M14 3v4h4" strokeLinejoin="round" />
          <path d="M9 12h6M9 16h4" strokeLinecap="round" />
        </svg>
      );
  }
}
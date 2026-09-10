import { AnuncioCard } from "@/components/AnuncioCard";
import { EstadoVacio } from "@/components/EstadoVacio";
import { NovedadTransporteForm } from "@/components/NovedadTransporteForm";
import { AdminLogin } from "@/components/AdminLogin";
import { anuncios } from "@/data/ejemplo";
import { novedadesTransporte } from "@/data/novedades";
import { formatearFecha } from "@/lib/date";
import Link from "next/link";
import { lineas } from "@/data/transporte";
import { DestinatarioSelector } from "@/components/DestinatarioSelector";
import type { DestinatarioSeleccionado } from "@/data/destinatarios";
import { useState } from "react";

/**
 * `src/app/anuncios`: listado de anuncios y novedades de transporte.
 * Incluye formulario de publicación para administradores.
 */
export default function AnunciosPage() {
  // Combinar anuncios y novedades, ordenar por fecha descendente
  const todosLosAnuncios = [
    ...anuncios.map((a) => ({ ...a, tipo: "anuncio" as const })),
    ...novedadesTransporte.map((n) => ({
      id: n.id,
      titulo: n.titulo,
      descripcion: n.descripcion,
      fecha: n.fecha,
      tipo: "novedad" as const,
      novedadTipo: n.tipo,
      prioridad: n.prioridad,
      lineaId: n.lineaId,
    })),
  ].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case "alta":
        return "border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20";
      case "media":
        return "border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20";
      case "baja":
        return "border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20";
      default:
        return "";
    }
  };

  const getTipoBadge = (tipo: string) => {
    const badges: Record<string, { label: string; className: string }> = {
      demora: { label: "Demora", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
      cambio_ruta: { label: "Cambio ruta", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
      suspension: { label: "Suspensión", className: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400" },
      otro: { label: "Otro", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
    };
    return badges[tipo] || { label: tipo, className: "bg-zinc-100 text-zinc-800" };
  };

  return (
    <div className="flex flex-1 flex-col items-center bg-primary-light px-6 py-16 dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col gap-4">
 3-f-02-configuración-de-tailwind
        <h1 className="text-2xl font-semibold text-primary dark:text-secondary-light">
          Anuncios
        </h1>
        <p className="text-sm text-foreground/70">
          Página de ejemplo que sigue la convención de carpetas del proyecto.
        </p>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
            Anuncios y novedades
          </h1>
          <div className="flex items-center gap-4">
            <AdminLogin />
            <Link
              href="/lineas"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Ver líneas →
            </Link>
          </div>
        </div>

        {/* Formulario de publicación (solo admin) */}
        <NovedadTransporteForm />

 <div className="flex flex-col gap-3">
          {todosLosAnuncios.length === 0 ? (
            <EstadoVacio
              icono="mensaje"
              titulo="Todavía no hay anuncios"
              descripcion="Cuando la comunidad publique novedades, las verás acá."
            />
          ) : (
            todosLosAnuncios.map((item) => {
              const isNovedad = item.tipo === "novedad";
              const linea = item.lineaId ? lineas.find((l) => l.id === item.lineaId) : null;

              return (
                <article
                  key={item.id}
                  className={`rounded-lg border border-black/[.08] p-5 dark:border-white/[.145] ${
                    isNovedad ? getPrioridadColor(item.prioridad) : ""
                  }`}
                >
                  <div className="flex flex-wrap items-start gap-2">
                    <h2 className="flex-1 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                      {item.titulo}
                    </h2>
                    {isNovedad && (
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTipoBadge(
                          item.novedadTipo
                        ).className}`}
                      >
                        {getTipoBadge(item.novedadTipo).label}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {item.descripcion}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                    <time dateTime={item.fecha}>
                      {formatearFecha(item.fecha)}
                    </time>
                    {linea && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5"
                        style={{ backgroundColor: `${linea.color}20`, color: linea.color }}
                      >
                        {linea.nombre}
                      </span>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>

        <section className="w-full">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-4">
            Nuevo Aviso - Seleccionar Destinatario(s)
          </h2>
          <DestinatarioSelector
            onChange={setDestinatario}
            placeholder="Buscar persona, curso o departamento..."
          />
          <pre className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs text-zinc-600 dark:text-zinc-300 overflow-auto">
            {JSON.stringify(destinatario, null, 2)}
          </pre>
        </section>

        <section className="w-full">
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-4">
            Anuncios Existentes
          </h2>
          <div className="flex flex-col gap-3">
            {anuncios.map((anuncio) => (
              <AnuncioCard key={anuncio.id} {...anuncio} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

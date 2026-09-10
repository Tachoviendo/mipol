"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { lineas } from "@/data/transporte";
import { agregarNovedad, type NovedadTransporte } from "@/data/novedades";

export function NovedadTransporteForm() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return null;
  }

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState<NovedadTransporte["tipo"]>("demora");
  const [lineaId, setLineaId] = useState("");
  const [prioridad, setPrioridad] = useState<NovedadTransporte["prioridad"]>("media");
  const [mensaje, setMensaje] = useState<{ tipo: "exito" | "error"; texto: string } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!titulo.trim() || !descripcion.trim()) {
      setMensaje({ tipo: "error", texto: "Título y descripción son obligatorios" });
      return;
    }

    try {
      agregarNovedad({
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        fecha: new Date().toISOString(),
        tipo,
        lineaId: lineaId || undefined,
        prioridad,
      });

      setTitulo("");
      setDescripcion("");
      setTipo("demora");
      setLineaId("");
      setPrioridad("media");
      setMensaje({ tipo: "exito", texto: "Novedad publicada correctamente" });
    } catch {
      setMensaje({ tipo: "error", texto: "Error al publicar la novedad" });
    }
  };

  const prioridadLabels: Record<NovedadTransporte["prioridad"], string> = {
    baja: "Baja",
    media: "Media",
    alta: "Alta",
  };

  const tipoLabels: Record<NovedadTransporte["tipo"], string> = {
    demora: "Demora",
    cambio_ruta: "Cambio de ruta",
    suspension: "Suspensión",
    otro: "Otro",
  };

  return (
    <section className="rounded-xl border border-black/[.08] bg-white p-5 dark:border-white/[.145] dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
        Publicar novedad de transporte
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Solo visible para administradores
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <div>
          <label
            htmlFor="titulo"
            className="block text-sm font-medium text-zinc-950 dark:text-zinc-50"
          >
            Título *
          </label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-950 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500"
            placeholder="Ej: Demora en Línea 1 - Centro"
            required
          />
        </div>

        <div>
          <label
            htmlFor="descripcion"
            className="block text-sm font-medium text-zinc-950 dark:text-zinc-50"
          >
            Descripción *
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-950 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500"
            placeholder="Describa la novedad, demora o cambio..."
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="tipo"
              className="block text-sm font-medium text-zinc-950 dark:text-zinc-50"
            >
              Tipo de novedad
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as NovedadTransporte["tipo"])}
              className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
            >
              {Object.entries(tipoLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="prioridad"
              className="block text-sm font-medium text-zinc-950 dark:text-zinc-50"
            >
              Prioridad
            </label>
            <select
              id="prioridad"
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value as NovedadTransporte["prioridad"])}
              className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
            >
              {Object.entries(prioridadLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="lineaId"
            className="block text-sm font-medium text-zinc-950 dark:text-zinc-50"
          >
            Línea afectada (opcional)
          </label>
          <select
            id="lineaId"
            value={lineaId}
            onChange={(e) => setLineaId(e.target.value)}
            className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
          >
            <option value="">Ninguna (general)</option>
            {lineas.map((linea) => (
              <option key={linea.id} value={linea.id}>
                {linea.nombre}
              </option>
            ))}
          </select>
        </div>

        {mensaje && (
          <div
            className={`rounded-md p-3 text-sm ${
              mensaje.tipo === "exito"
                ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {mensaje.texto}
          </div>
        )}

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Publicar novedad
        </button>
      </form>
    </section>
  );
}
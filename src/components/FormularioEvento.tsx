"use client";

import { useState } from "react";
import {
  type EventoCalendario,
  type TipoEvento,
  type VisibilidadEvento,
  eventosCalendario,
} from "@/data/eventos";

const TIPOS: { value: TipoEvento; label: string }[] = [
  { value: "clase", label: "Clase" },
  { value: "examen", label: "Examen" },
  { value: "reunion", label: "Reunión" },
  { value: "actividad", label: "Actividad" },
  { value: "feriado", label: "Feriado" },
  { value: "otro", label: "Otro" },
];

const VISIBILIDADES: { value: VisibilidadEvento; label: string }[] = [
  { value: "publico", label: "Público" },
  { value: "curso", label: "Por curso" },
  { value: "privado", label: "Privado" },
];

type FormularioEventoProps = {
  evento?: EventoCalendario;
  onGuardar: (evento: EventoCalendario) => void;
  onCancelar: () => void;
};

export function FormularioEvento({
  evento,
  onGuardar,
  onCancelar,
}: FormularioEventoProps) {
  const [titulo, setTitulo] = useState(evento?.titulo ?? "");
  const [fecha, setFecha] = useState(
    evento?.fechaInicio.slice(0, 10) ?? new Date().toISOString().slice(0, 10)
  );
  const [hora, setHora] = useState(
    evento?.fechaInicio.slice(11, 16) ?? "08:00"
  );
  const [duracion, setDuracion] = useState(evento?.duracionMinutos ?? 60);
  const [tipo, setTipo] = useState<TipoEvento>(evento?.tipo ?? "clase");
  const [cursoGrupo, setCursoGrupo] = useState(evento?.cursoGrupo ?? "");
  const [visibilidad, setVisibilidad] = useState<VisibilidadEvento>(
    evento?.visibilidad ?? "publico"
  );
  const [descripcion, setDescripcion] = useState(evento?.descripcion ?? "");
  const [ubicacion, setUbicacion] = useState(evento?.ubicacion ?? "");
  const [todoElDia, setTodoElDia] = useState(evento?.todoElDia ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fechaInicio = todoElDia
      ? `${fecha}T00:00:00-03:00`
      : `${fecha}T${hora}:00-03:00`;

    const nuevoEvento: EventoCalendario = {
      id: evento?.id ?? `ev-${Date.now()}`,
      titulo,
      fechaInicio,
      duracionMinutos: todoElDia ? 1440 : duracion,
      tipo,
      cursoGrupo: cursoGrupo || undefined,
      visibilidad,
      descripcion: descripcion || undefined,
      ubicacion: ubicacion || undefined,
      todoElDia,
    };

    if (evento) {
      const idx = eventosCalendario.findIndex((ev) => ev.id === evento.id);
      if (idx !== -1) eventosCalendario[idx] = nuevoEvento;
    } else {
      eventosCalendario.push(nuevoEvento);
    }

    onGuardar(nuevoEvento);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancelar}
      role="dialog"
      aria-modal="true"
      aria-label={evento ? "Editar evento" : "Crear evento"}
    >
      <form
        className="w-full max-w-lg rounded-xl border border-black/[.08] bg-white p-6 shadow-lg dark:border-white/[.145] dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          {evento ? "Editar evento" : "Crear evento"}
        </h2>

        <div className="mt-5 flex flex-col gap-4">
          {/* Título */}
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Título *
            </label>
            <input
              id="titulo"
              type="text"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-white/[.145] dark:bg-zinc-800 dark:text-zinc-100"
              placeholder="Ej: Clase de Matemática"
            />
          </div>

          {/* Todo el día */}
          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={todoElDia}
              onChange={(e) => setTodoElDia(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300 text-brand-600 focus:ring-brand-500"
            />
            Todo el día
          </label>

          {/* Fecha y hora */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="fecha" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Fecha *
              </label>
              <input
                id="fecha"
                type="date"
                required
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm text-zinc-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-white/[.145] dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>
            {!todoElDia && (
              <div>
                <label htmlFor="hora" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Hora *
                </label>
                <input
                  id="hora"
                  type="time"
                  required
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm text-zinc-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-white/[.145] dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
            )}
          </div>

          {/* Duración */}
          {!todoElDia && (
            <div>
              <label htmlFor="duracion" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Duración (minutos)
              </label>
              <input
                id="duracion"
                type="number"
                min={5}
                step={5}
                value={duracion}
                onChange={(e) => setDuracion(Number(e.target.value))}
                className="mt-1 block w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm text-zinc-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-white/[.145] dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>
          )}

          {/* Tipo */}
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Tipo *
            </label>
            <select
              id="tipo"
              required
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoEvento)}
              className="mt-1 block w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm text-zinc-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-white/[.145] dark:bg-zinc-800 dark:text-zinc-100"
            >
              {TIPOS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Curso/Grupo */}
          <div>
            <label htmlFor="cursoGrupo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Curso / Grupo
            </label>
            <input
              id="cursoGrupo"
              type="text"
              value={cursoGrupo}
              onChange={(e) => setCursoGrupo(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-white/[.145] dark:bg-zinc-800 dark:text-zinc-100"
              placeholder="Ej: 5° A, Docentes"
            />
          </div>

          {/* Visibilidad */}
          <div>
            <label htmlFor="visibilidad" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Visibilidad *
            </label>
            <select
              id="visibilidad"
              required
              value={visibilidad}
              onChange={(e) => setVisibilidad(e.target.value as VisibilidadEvento)}
              className="mt-1 block w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm text-zinc-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-white/[.145] dark:bg-zinc-800 dark:text-zinc-100"
            >
              {VISIBILIDADES.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          {/* Ubicación */}
          <div>
            <label htmlFor="ubicacion" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Ubicación
            </label>
            <input
              id="ubicacion"
              type="text"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-white/[.145] dark:bg-zinc-800 dark:text-zinc-100"
              placeholder="Ej: Aula 204"
            />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Descripción
            </label>
            <textarea
              id="descripcion"
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-white/[.145] dark:bg-zinc-800 dark:text-zinc-100"
              placeholder="Descripción opcional del evento"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            {evento ? "Guardar cambios" : "Crear evento"}
          </button>
        </div>
      </form>
    </div>
  );
}

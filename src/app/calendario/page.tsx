"use client";

import { useState } from "react";
import { CalendarioGrilla } from "@/components/CalendarioGrilla";
import { DetalleEventoModal } from "@/components/DetalleEventoModal";
import { FiltrosCalendario } from "@/components/FiltrosCalendario";
import { FormularioEvento } from "@/components/FormularioEvento";
import { type EventoCalendario, type TipoEvento } from "@/data/eventos";

export default function CalendarioPage() {
  const [eventoSeleccionado, setEventoSeleccionado] = useState<EventoCalendario | null>(null);
  const [filtros, setFiltros] = useState<TipoEvento[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [eventoEditando, setEventoEditando] = useState<EventoCalendario | null>(null);

  const handleCrearEvento = () => {
    setEventoEditando(null);
    setMostrarFormulario(true);
  };

  const handleGuardarEvento = (evento: EventoCalendario) => {
    setMostrarFormulario(false);
    setEventoEditando(null);
  };

  const handleCancelarFormulario = () => {
    setMostrarFormulario(false);
    setEventoEditando(null);
  };

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-8 dark:bg-black sm:px-6">
      <main className="flex w-full max-w-4xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
            Calendario
          </h1>
          <button
            onClick={handleCrearEvento}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            + Nuevo evento
          </button>
        </div>

        <FiltrosCalendario filtros={filtros} onChange={setFiltros} />

        <CalendarioGrilla
          filtros={filtros}
          onEventoClick={setEventoSeleccionado}
        />

        {eventoSeleccionado && (
          <DetalleEventoModal
            evento={eventoSeleccionado}
            onClose={() => setEventoSeleccionado(null)}
          />
        )}

        {mostrarFormulario && (
          <FormularioEvento
            evento={eventoEditando ?? undefined}
            onGuardar={handleGuardarEvento}
            onCancelar={handleCancelarFormulario}
          />
        )}
      </main>
    </div>
  );
}

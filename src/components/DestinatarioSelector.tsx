"use client";

import { useState, useMemo } from "react";
import type {
  TipoDestinatario,
  Persona,
  Curso,
  Departamento,
  DestinatarioSeleccionado,
} from "@/data/destinatarios";
import {
  buscarPersonas,
  buscarCursos,
  buscarDepartamentos,
  personas,
  cursos,
  departamentos,
} from "@/data/destinatarios";

interface DestinatarioSelectorProps {
  onChange?: (destinatario: DestinatarioSeleccionado) => void;
  placeholder?: string;
}

const OPCIONES_TIPO: { value: TipoDestinatario; label: string; icon: string }[] = [
  { value: "persona", label: "Persona", icon: "👤" },
  { value: "curso", label: "Curso", icon: "📚" },
  { value: "departamento", label: "Departamento", icon: "🏢" },
];

function formatearPersona(p: Persona): string {
  return `${p.nombre} ${p.apellido} (${p.rol})`;
}

function formatearCurso(c: Curso): string {
  return `${c.nombre} (${c.codigo})`;
}

function formatearDepartamento(d: Departamento): string {
  return d.nombre;
}

export function DestinatarioSelector({ onChange, placeholder = "Buscar..." }: DestinatarioSelectorProps) {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<TipoDestinatario>("persona");
  const [busqueda, setBusqueda] = useState("");
  const [seleccionados, setSeleccionados] = useState<DestinatarioSeleccionado>({
    tipo: "persona",
    items: [],
  });
  const [dropdownAbierto, setDropdownAbierto] = useState(false);

  const resultados = useMemo(() => {
    switch (tipoSeleccionado) {
      case "persona":
        return buscarPersonas(busqueda);
      case "curso":
        return buscarCursos(busqueda);
      case "departamento":
        return buscarDepartamentos(busqueda);
    }
  }, [tipoSeleccionado, busqueda]);

  const seleccionadosActuales = seleccionados.items;

  const toggleSeleccion = (item: Persona | Curso | Departamento) => {
    const yaSeleccionado = seleccionadosActuales.some(
      (s) => "id" in s && "id" in item && s.id === item.id
    );

    let nuevosItems: (Persona | Curso | Departamento)[];
    if (yaSeleccionado) {
      nuevosItems = seleccionadosActuales.filter(
        (s) => !("id" in s && "id" in item && s.id === item.id)
      );
    } else {
      nuevosItems = [...seleccionadosActuales, item];
    }

    const nuevoSeleccionado: DestinatarioSeleccionado = {
      tipo: tipoSeleccionado,
      items: nuevosItems,
    };

    setSeleccionados(nuevoSeleccionado);
    onChange?.(nuevoSeleccionado);
  };

  const estaSeleccionado = (item: Persona | Curso | Departamento) => {
    return seleccionadosActuales.some(
      (s) => "id" in s && "id" in item && s.id === item.id
    );
  };

  const handleTipoChange = (nuevoTipo: TipoDestinatario) => {
    setTipoSeleccionado(nuevoTipo);
    setBusqueda("");
    setDropdownAbierto(false);
    const nuevoSeleccionado: DestinatarioSeleccionado = {
      tipo: nuevoTipo,
      items: [],
    };
    setSeleccionados(nuevoSeleccionado);
    onChange?.(nuevoSeleccionado);
  };

  const getItemLabel = (item: Persona | Curso | Departamento): string => {
    if ("rol" in item) return formatearPersona(item);
    if ("codigo" in item) return formatearCurso(item);
    return formatearDepartamento(item);
  };

  const getItemSubLabel = (item: Persona | Curso | Departamento): string => {
    if ("rol" in item) return item.email;
    if ("codigo" in item) return `${item.anio}° Año - ${item.docenteId}`;
    return item.descripcion;
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex gap-2 mb-4">
        {OPCIONES_TIPO.map((opcion) => (
          <button
            key={opcion.value}
            type="button"
            onClick={() => handleTipoChange(opcion.value)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
              tipoSeleccionado === opcion.value
                ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-600 dark:hover:bg-zinc-700"
            }`}
          >
            <span>{opcion.icon}</span>
            <span>{opcion.label}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onFocus={() => setDropdownAbierto(true)}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 border border-zinc-300 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
          {busqueda && (
            <button
              type="button"
              onClick={() => setBusqueda("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        {dropdownAbierto && resultados.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10 dark:bg-zinc-800 dark:border-zinc-600">
            {resultados.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleSeleccion(item)}
                className={`w-full px-4 py-2.5 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
                  estaSeleccionado(item) ? "bg-zinc-100 dark:bg-zinc-700" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {getItemLabel(item)}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {getItemSubLabel(item)}
                    </p>
                  </div>
                  {estaSeleccionado(item) && (
                    <svg
                      className="w-5 h-5 text-zinc-600 dark:text-zinc-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {dropdownAbierto && resultados.length === 0 && busqueda && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-300 rounded-lg shadow-lg p-4 text-center z-10 dark:bg-zinc-800 dark:border-zinc-600">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No se encontraron {tipoSeleccionado === "persona" ? "personas" : tipoSeleccionado === "curso" ? "cursos" : "departamentos"} con "{busqueda}"
            </p>
          </div>
        )}
      </div>

      {seleccionadosActuales.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Seleccionados ({seleccionadosActuales.length}):
          </h4>
          <div className="flex flex-wrap gap-2">
            {seleccionadosActuales.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full text-sm text-zinc-700 dark:text-zinc-200"
              >
                {getItemLabel(item)}
                <button
                  type="button"
                  onClick={() => toggleSeleccion(item)}
                  className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  aria-label={`Quitar ${getItemLabel(item)}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
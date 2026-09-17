"use client";

import { useState } from "react";

import {
  ETIQUETAS_AREA,
  ETIQUETAS_MODALIDAD,
  ETIQUETAS_TURNO,
  areasOferta,
  modalidadesOferta,
  turnosOferta,
} from "@/data/oferta";
import type {
  AreaOferta,
  ModalidadOferta,
  ProgramaOferta,
  TipoOferta,
  TurnoOferta,
} from "@/data/oferta";
import { anuncios, crearAnuncio } from "@/data/ejemplo";

const OPCION_NUEVO_COMUNICADO = "__nuevo__";

type FormularioProgramaOfertaProps = {
  programa?: ProgramaOferta;
  onGuardar: (programa: ProgramaOferta) => void;
  onCancelar: () => void;
};

export function FormularioProgramaOferta({
  programa,
  onGuardar,
  onCancelar,
}: FormularioProgramaOfertaProps) {
  const [nombre, setNombre] = useState(programa?.nombre ?? "");
  const [tipo, setTipo] = useState<TipoOferta>(programa?.tipo ?? "terciaria");
  const [descripcion, setDescripcion] = useState(programa?.descripcion ?? "");
  const [duracion, setDuracion] = useState(programa?.duracion ?? "");
  const [requisitos, setRequisitos] = useState(programa?.requisitos ?? "");
  const [cupos, setCupos] = useState(programa?.cupos ?? 0);
  const [contactoInscripcion, setContactoInscripcion] = useState(
    programa?.contactoInscripcion ?? ""
  );
  const [area, setArea] = useState<AreaOferta>(programa?.area ?? "informatica");
  const [modalidad, setModalidad] = useState<ModalidadOferta>(
    programa?.modalidad ?? "presencial"
  );
  const [turno, setTurno] = useState<TurnoOferta>(programa?.turno ?? "matutino");
  const [fechaLimiteInscripcion, setFechaLimiteInscripcion] = useState(
    programa?.fechaLimiteInscripcion ?? ""
  );
  const [comunicadoId, setComunicadoId] = useState(programa?.comunicadoId ?? "");
  const [comunicadoTitulo, setComunicadoTitulo] = useState("");
  const [comunicadoDescripcion, setComunicadoDescripcion] = useState("");

  const [error, setError] = useState<string | null>(null);

  const campoClases =
    "mt-1 block w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-white/[.145] dark:bg-zinc-800 dark:text-zinc-100";
  const etiquetaClases =
    "block text-sm font-medium text-zinc-700 dark:text-zinc-300";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !descripcion.trim() || !duracion.trim()) {
      setError("Completá nombre, descripción y duración.");
      return;
    }

    let comunicadoFinalId = comunicadoId;
    if (comunicadoId === OPCION_NUEVO_COMUNICADO) {
      if (!comunicadoTitulo.trim()) {
        setError("Escribí un título para el comunicado oficial.");
        return;
      }
      const nuevoComunicado = crearAnuncio({
        titulo: comunicadoTitulo.trim(),
        descripcion:
          comunicadoDescripcion.trim() ||
          `Nueva inscripción abierta: ${nombre.trim()}.`,
        fecha: new Date().toISOString().slice(0, 10),
        destacado: true,
      });
      comunicadoFinalId = nuevoComunicado.id;
    }

    const nuevoPrograma: ProgramaOferta = {
      id: programa?.id ?? "",
      nombre: nombre.trim(),
      tipo,
      descripcion: descripcion.trim(),
      duracion: duracion.trim(),
      requisitos: requisitos.trim(),
      cupos,
      contactoInscripcion: contactoInscripcion.trim(),
      area,
      modalidad,
      turno,
      fechaLimiteInscripcion: fechaLimiteInscripcion || undefined,
      comunicadoId: comunicadoFinalId || undefined,
    };

    onGuardar(nuevoPrograma);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancelar}
      role="dialog"
      aria-modal="true"
      aria-label={programa ? "Editar programa" : "Publicar programa"}
    >
      <form
        className="w-full max-w-lg rounded-xl border border-black/[.08] bg-white p-6 shadow-lg dark:border-white/[.145] dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          {programa ? "Editar programa" : "Publicar programa"}
        </h2>

        {error && (
          <p
            role="status"
            className="mt-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            {error}
          </p>
        )}

        <div className="mt-5 flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
          <div>
            <label htmlFor="nombre" className={etiquetaClases}>
              Nombre *
            </label>
            <input
              id="nombre"
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={campoClases}
              placeholder="Ej: Tecnicatura en Redes"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="tipo" className={etiquetaClases}>
                Tipo *
              </label>
              <select
                id="tipo"
                required
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoOferta)}
                className={campoClases}
              >
                <option value="terciaria">Oferta terciaria</option>
                <option value="interna">Oferta interna</option>
              </select>
            </div>

            <div>
              <label htmlFor="area" className={etiquetaClases}>
                Área temática *
              </label>
              <select
                id="area"
                required
                value={area}
                onChange={(e) => setArea(e.target.value as AreaOferta)}
                className={campoClases}
              >
                {areasOferta.map((a) => (
                  <option key={a} value={a}>
                    {ETIQUETAS_AREA[a]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="modalidad" className={etiquetaClases}>
                Modalidad *
              </label>
              <select
                id="modalidad"
                required
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value as ModalidadOferta)}
                className={campoClases}
              >
                {modalidadesOferta.map((m) => (
                  <option key={m} value={m}>
                    {ETIQUETAS_MODALIDAD[m]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="turno" className={etiquetaClases}>
                Turno *
              </label>
              <select
                id="turno"
                required
                value={turno}
                onChange={(e) => setTurno(e.target.value as TurnoOferta)}
                className={campoClases}
              >
                {turnosOferta.map((t) => (
                  <option key={t} value={t}>
                    {ETIQUETAS_TURNO[t]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="descripcion" className={etiquetaClases}>
              Descripción *
            </label>
            <textarea
              id="descripcion"
              rows={3}
              required
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className={campoClases}
              placeholder="Descripción del programa"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="duracion" className={etiquetaClases}>
                Duración *
              </label>
              <input
                id="duracion"
                type="text"
                required
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                className={campoClases}
                placeholder="Ej: 2 años, 6 meses"
              />
            </div>

            <div>
              <label htmlFor="cupos" className={etiquetaClases}>
                Cupos (0 = ilimitados)
              </label>
              <input
                id="cupos"
                type="number"
                min={0}
                value={cupos}
                onChange={(e) => setCupos(Number(e.target.value))}
                className={campoClases}
              />
            </div>
          </div>

          <div>
            <label htmlFor="requisitos" className={etiquetaClases}>
              Requisitos
            </label>
            <input
              id="requisitos"
              type="text"
              value={requisitos}
              onChange={(e) => setRequisitos(e.target.value)}
              className={campoClases}
              placeholder="Ej: Bachillerato aprobado"
            />
          </div>

          <div>
            <label htmlFor="contactoInscripcion" className={etiquetaClases}>
              Contacto / inscripción
            </label>
            <input
              id="contactoInscripcion"
              type="text"
              value={contactoInscripcion}
              onChange={(e) => setContactoInscripcion(e.target.value)}
              className={campoClases}
              placeholder="Ej: Secretaría del liceo · tel. 4732 1000"
            />
          </div>

          <div>
            <label htmlFor="fechaLimiteInscripcion" className={etiquetaClases}>
              Fecha límite de inscripción
            </label>
            <input
              id="fechaLimiteInscripcion"
              type="date"
              value={fechaLimiteInscripcion}
              onChange={(e) => setFechaLimiteInscripcion(e.target.value)}
              className={campoClases}
            />
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Si no la definís, el programa figura como inscripción abierta.
            </p>
          </div>

          <div>
            <label htmlFor="comunicado" className={etiquetaClases}>
              Comunicado oficial
            </label>
            <select
              id="comunicado"
              value={comunicadoId}
              onChange={(e) => setComunicadoId(e.target.value)}
              className={campoClases}
            >
              <option value="">Sin comunicado vinculado</option>
              {anuncios.map((anuncio) => (
                <option key={anuncio.id} value={anuncio.id}>
                  {anuncio.titulo}
                </option>
              ))}
              <option value={OPCION_NUEVO_COMUNICADO}>
                + Crear comunicado nuevo
              </option>
            </select>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Difundí la apertura de inscripción al resto de la comunidad.
            </p>
          </div>

          {comunicadoId === OPCION_NUEVO_COMUNICADO && (
            <div className="flex flex-col gap-4 rounded-lg border border-brand-200 bg-brand-50 p-4 dark:border-brand-800 dark:bg-brand-950/30">
              <div>
                <label htmlFor="comunicadoTitulo" className={etiquetaClases}>
                  Título del comunicado *
                </label>
                <input
                  id="comunicadoTitulo"
                  type="text"
                  value={comunicadoTitulo}
                  onChange={(e) => setComunicadoTitulo(e.target.value)}
                  className={campoClases}
                  placeholder="Ej: Inscripciones abiertas 2026"
                />
              </div>

              <div>
                <label
                  htmlFor="comunicadoDescripcion"
                  className={etiquetaClases}
                >
                  Descripción del comunicado
                </label>
                <textarea
                  id="comunicadoDescripcion"
                  rows={2}
                  value={comunicadoDescripcion}
                  onChange={(e) => setComunicadoDescripcion(e.target.value)}
                  className={campoClases}
                  placeholder="Detalle de la novedad para la comunidad"
                />
              </div>
            </div>
          )}
        </div>

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
            {programa ? "Guardar cambios" : "Publicar programa"}
          </button>
        </div>
      </form>
    </div>
  );
}
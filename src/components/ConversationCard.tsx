import { formatearFecha } from "@/lib/date";
import type { Conversacion, Usuario } from "@/data/ejemplo";

function obtenerOtroParticipante(conversacion: Conversacion): Usuario | null {
  return conversacion.participantes.find((p) => p.id !== "current") ?? null;
}

function obtenerIniciales(nombre: string): string {
  return nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function obtenerColorRol(rol: Usuario["rol"]): string {
  switch (rol) {
    case "docente":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    case "estudiante":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case "administracion":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
  }
}

export function ConversationCard({ conversacion }: { conversacion: Conversacion }) {
  const otroParticipante = obtenerOtroParticipante(conversacion);
  const esGrupo = conversacion.tipo === "grupal";
  const nombre = esGrupo ? conversacion.nombre ?? "Grupo" : otroParticipante?.nombre ?? "Desconocido";
  const rol = esGrupo ? "estudiante" : otroParticipante?.rol ?? "estudiante";
  const preview = conversacion.ultimoMensaje.contenido;
  const fecha = conversacion.ultimoMensaje.fecha;
  const noLeidos = conversacion.noLeidos;

  return (
    <article
      className={`relative flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:hover:bg-white/[.03] ${
        noLeidos > 0 ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30" : "border-black/[.08] dark:border-white/[.145]"
      }`}
    >
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold ${obtenerColorRol(rol)}`}
        aria-hidden="true"
      >
        {esGrupo ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
            />
          </svg>
        ) : (
          obtenerIniciales(nombre)
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-zinc-950 dark:text-zinc-50 truncate">{nombre}</h3>
          <time
            dateTime={fecha}
            className="flex-shrink-0 text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap"
          >
            {formatearFecha(fecha)}
          </time>
        </div>

        <p className="mt-1 truncate text-sm text-zinc-600 dark:text-zinc-400">
          {preview}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${obtenerColorRol(rol)}`}
          >
            {conversacion.tipo === "uno_a_uno" && "Privado"}
            {conversacion.tipo === "grupal" && "Grupal"}
            {conversacion.tipo === "aviso_curso" && "Aviso"}
          </span>

          {noLeidos > 0 && (
            <span
              className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-medium text-white"
              aria-label={`${noLeidos} mensajes no leídos`}
            >
              {noLeidos > 9 ? "9+" : noLeidos}
            </span>
          )}

          {!conversacion.ultimoMensaje.leido && noLeidos === 0 && (
            <span
              className="flex h-2 w-2 rounded-full bg-blue-600"
              aria-label="Mensaje no leído"
            />
          )}
        </div>
      </div>
    </article>
  );
}
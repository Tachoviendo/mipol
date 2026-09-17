import { formatearFecha } from "@/lib/date";
import type { Conversacion, Participante } from "@/data/mensajeria";

function otroParticipante(conversacion: Conversacion): Participante | null {
  if (conversacion.tipo === "1:1") {
    return conversacion.participantes[1] ?? conversacion.participantes[0] ?? null;
  }
  return null;
}

function obtenerIniciales(nombre: string): string {
  return nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function obtenerColorRol(rol: Participante["rol"]): string {
  switch (rol) {
    case "docente":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    case "estudiante":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case "admin":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
  }
}

function obtenerColorRolGrupo(): string {
  return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
}

export function ConversationCard({ conversacion }: { conversacion: Conversacion }) {
  const esGrupo = conversacion.tipo !== "1:1";
  const otro = otroParticipante(conversacion);
  const nombre = esGrupo ? (conversacion.nombre ?? "Grupo") : (otro?.nombre ?? "Desconocido");
  const rol = esGrupo ? null : (otro?.rol ?? "estudiante");
  const preview = conversacion.ultimoMensaje?.contenido ?? "";
  const fecha = conversacion.ultimoMensaje?.fecha ?? conversacion.actualizadoEn;
  const noLeidos = conversacion.noLeidos;

  return (
    <article
      className={`relative flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-zinc-50 dark:hover:bg-white/[.03] ${
        noLeidos > 0
          ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30"
          : "border-black/[.08] dark:border-white/[.145]"
      }`}
    >
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
          esGrupo ? obtenerColorRolGrupo() : obtenerColorRol(rol ?? "estudiante")
        }`}
        aria-hidden="true"
      >
        {esGrupo ? (
          <svg
            className="h-6 w-6"
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

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate font-medium text-zinc-950 dark:text-zinc-50">{nombre}</h3>
          <time
            dateTime={fecha}
            className="flex-shrink-0 whitespace-nowrap text-xs text-zinc-500 dark:text-zinc-400"
          >
            {formatearFecha(fecha)}
          </time>
        </div>

        <p className="mt-1 truncate text-sm text-zinc-600 dark:text-zinc-400">{preview}</p>

        <div className="mt-2 flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              esGrupo ? obtenerColorRolGrupo() : obtenerColorRol(rol ?? "estudiante")
            }`}
          >
            {conversacion.tipo === "1:1" && "Privado"}
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

          {conversacion.ultimoMensaje && !conversacion.ultimoMensaje.leido && noLeidos === 0 && (
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

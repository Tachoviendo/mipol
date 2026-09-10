/**
 * `src/data/grupos.ts`: datos mock del módulo de espacios de trabajo por
 * curso/materia (similar a CREA o Google Classroom), enfocado en el muro del
 * grupo: publicaciones (del docente y participantes) con sus comentarios.
 *
 * Roles:
 * - Docentes crean y administran grupos y publican en el muro.
 * - Estudiantes participan comentando las publicaciones.
 * - Administración tiene visibilidad global.
 * - Público no tiene acceso.
 *
 * Los arreglos son mutables en memoria (como en `foros.ts`) para que las
 * Server Actions puedan crear/actualizar sin backend real.
 */

import { usuarios, type Usuario } from "@/data/usuarios";
import type { Rol } from "@/lib/roles";

export type Grupo = {
  id: string;
  nombre: string;
  materia: string;
  docenteId: string;
  curso: string;
  miembroIds: string[];
  descripcion?: string;
};

export type Publicacion = {
  id: string;
  grupoId: string;
  autorId: string;
  contenido: string;
  fecha: string;
};

export type Comentario = {
  id: string;
  publicacionId: string;
  autorId: string;
  contenido: string;
  fecha: string;
};

export const gruposMock: Grupo[] = [
  {
    id: "g-mate-3a",
    nombre: "Matemática 3° A",
    materia: "Matemática",
    docenteId: "u2",
    curso: "3° A",
    miembroIds: ["u1", "u5"],
    descripcion: "Funciones, sistemas de ecuaciones y geometría para 3° A.",
  },
  {
    id: "g-fisica-3b",
    nombre: "Física 3° B",
    materia: "Física",
    docenteId: "u12",
    curso: "3° B",
    miembroIds: ["u6"],
    descripcion: "Cinemática, movimiento rectilíneo y sus gráficas.",
  },
  {
    id: "g-literatura-4b",
    nombre: "Taller de Literatura 4° B",
    materia: "Literatura",
    docenteId: "u13",
    curso: "4° B",
    miembroIds: ["u7", "u8"],
    descripcion: "Lectura y análisis de cuentos: Quiroga, Benedetti y otros.",
  },
  {
    id: "g-historia-5c",
    nombre: "Historia 5° C",
    materia: "Historia",
    docenteId: "u14",
    curso: "5° C",
    miembroIds: ["u9", "u10"],
    descripcion: "Historia contemporánea: las guerras mundiales y el mundo bipolar.",
  },
];

export const publicacionesMock: Publicacion[] = [
  {
    id: "p-mate-3a-1",
    grupoId: "g-mate-3a",
    autorId: "u2",
    contenido:
      "¡Bienvenidos al grupo de Matemática 3° A! Acá van a estar las novedades, tareas y materiales del curso.",
    fecha: "2026-08-03T09:00:00-03:00",
  },
  {
    id: "p-mate-3a-2",
    grupoId: "g-mate-3a",
    autorId: "u2",
    contenido:
      "Recuerden que mañana es el parcial de funciones lineales. Repasen con la guía de Materiales.",
    fecha: "2026-09-09T08:15:00-03:00",
  },
  {
    id: "p-fisica-3b-1",
    grupoId: "g-fisica-3b",
    autorId: "u12",
    contenido:
      "El práctico de cinemática se entrega el viernes. Recuerden incluir unidades en todos los cálculos.",
    fecha: "2026-09-05T12:00:00-03:00",
  },
  {
    id: "p-literatura-4b-1",
    grupoId: "g-literatura-4b",
    autorId: "u13",
    contenido:
      "Mañana analizamos 'El almohadón de plumas'. Traigan el texto leído.",
    fecha: "2026-08-28T16:00:00-03:00",
  },
  {
    id: "p-literatura-4b-2",
    grupoId: "g-literatura-4b",
    autorId: "u13",
    contenido:
      "Dejé el texto en Materiales por si alguien lo perdió. Suban sus dudas acá.",
    fecha: "2026-08-29T09:30:00-03:00",
  },
  {
    id: "p-historia-5c-1",
    grupoId: "g-historia-5c",
    autorId: "u14",
    contenido:
      "La consigna del ensayo quedó publicada en Tareas. La fecha límite es el 25/09.",
    fecha: "2026-09-07T10:30:00-03:00",
  },
];

export const comentariosMock: Comentario[] = [
  {
    id: "c-mate-3a-2-1",
    publicacionId: "p-mate-3a-2",
    autorId: "u1",
    contenido:
      "Profe, ¿el parcial incluye sistemas de ecuaciones o solo funciones lineales?",
    fecha: "2026-09-09T18:30:00-03:00",
  },
  {
    id: "c-mate-3a-2-2",
    publicacionId: "p-mate-3a-2",
    autorId: "u2",
    contenido:
      "Incluye las dos cosas: funciones lineales y sistemas por igualación y sustitución.",
    fecha: "2026-09-09T19:00:00-03:00",
  },
  {
    id: "c-mate-3a-1-1",
    publicacionId: "p-mate-3a-1",
    autorId: "u5",
    contenido: "¡Gracias profe! ¿Cuándo comparte el material del primer tema?",
    fecha: "2026-08-03T10:15:00-03:00",
  },
  {
    id: "c-fisica-3b-1-1",
    publicacionId: "p-fisica-3b-1",
    autorId: "u6",
    contenido: "Okay, ¿hay algún ejemplo resuelto en los materiales?",
    fecha: "2026-09-05T13:00:00-03:00",
  },
  {
    id: "c-fisica-3b-1-2",
    publicacionId: "p-fisica-3b-1",
    autorId: "u12",
    contenido: "Sí, en el apunte vienen dos ejercicios resueltos paso a paso.",
    fecha: "2026-09-05T13:20:00-03:00",
  },
  {
    id: "c-literatura-4b-2-1",
    publicacionId: "p-literatura-4b-2",
    autorId: "u7",
    contenido: "¿El análisis se hace individual o en parejas?",
    fecha: "2026-08-29T10:00:00-03:00",
  },
  {
    id: "c-historia-5c-1-1",
    publicacionId: "p-historia-5c-1",
    autorId: "u9",
    contenido: "¿Podemos elegir el tema del ensayo o hay que seguir la consigna?",
    fecha: "2026-09-07T11:05:00-03:00",
  },
];

/** Mapeo del rol simulado activo (cookie `mipol_rol`) a un usuario concreto. */
export const USUARIO_POR_ROL: Record<Rol, string> = {
  estudiante: "u1",
  docente: "u2",
  administracion: "u3",
  publico: "u4",
};

export function usuarioSimuladoDeRol(rol: Rol): string {
  return USUARIO_POR_ROL[rol];
}

/* ------------------------- Consultas ------------------------- */

export function obtenerGrupo(grupoId: string): Grupo | undefined {
  return gruposMock.find((grupo) => grupo.id === grupoId);
}

export function obtenerGruposDeUsuario(usuarioId: string): Grupo[] {
  return gruposMock.filter(
    (grupo) =>
      grupo.miembroIds.includes(usuarioId) || grupo.docenteId === usuarioId,
  );
}

export function obtenerGruposParaRol(rol: Rol): Grupo[] {
  if (rol === "publico") return [];
  if (rol === "administracion") return [...gruposMock];
  return obtenerGruposDeUsuario(usuarioSimuladoDeRol(rol));
}

export function esMiembroDe(grupoId: string, usuarioId: string): boolean {
  const grupo = obtenerGrupo(grupoId);
  if (!grupo) return false;
  return grupo.miembroIds.includes(usuarioId) || grupo.docenteId === usuarioId;
}

/** Publicaciones del muro, ordenadas por fecha de más reciente a más antigua. */
export function obtenerPublicacionesDeGrupo(grupoId: string): Publicacion[] {
  return publicacionesMock
    .filter((publicacion) => publicacion.grupoId === grupoId)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
}

export function obtenerPublicacion(publicacionId: string): Publicacion | undefined {
  return publicacionesMock.find((publicacion) => publicacion.id === publicacionId);
}

/** Comentarios de una publicación, ordenados por fecha de más antiguo a más reciente. */
export function obtenerComentariosDePublicacion(
  publicacionId: string,
): Comentario[] {
  return comentariosMock
    .filter((comentario) => comentario.publicacionId === publicacionId)
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
}

export function nombreDeUsuario(usuarioId: string): string {
  return usuarios.find((usuario) => usuario.id === usuarioId)?.nombre ?? usuarioId;
}

export function usuarioPorId(usuarioId: string): Usuario | undefined {
  return usuarios.find((usuario) => usuario.id === usuarioId);
}

export function obtenerMiembros(grupoId: string): Usuario[] {
  const grupo = obtenerGrupo(grupoId);
  if (!grupo) return [];
  return grupo.miembroIds
    .map((id) => usuarioPorId(id))
    .filter((usuario): usuario is Usuario => usuario !== undefined);
}

/* ------------------------- Mutaciones (Server Actions) ------------------------- */

function generarId(prefijo: string): string {
  const sufijo = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  return `${prefijo}-${sufijo}`;
}

export function crearGrupo(datos: {
  nombre: string;
  materia: string;
  curso: string;
  descripcion?: string;
  docenteId: string;
}): Grupo {
  const grupo: Grupo = {
    id: generarId("g"),
    nombre: datos.nombre,
    materia: datos.materia,
    curso: datos.curso,
    docenteId: datos.docenteId,
    miembroIds: [],
    descripcion: datos.descripcion,
  };
  gruposMock.push(grupo);
  return grupo;
}

export function agregarPublicacion(datos: {
  grupoId: string;
  autorId: string;
  contenido: string;
}): Publicacion {
  const publicacion: Publicacion = {
    id: generarId("p"),
    grupoId: datos.grupoId,
    autorId: datos.autorId,
    contenido: datos.contenido,
    fecha: new Date().toISOString(),
  };
  publicacionesMock.push(publicacion);
  return publicacion;
}

export function agregarComentario(datos: {
  publicacionId: string;
  autorId: string;
  contenido: string;
}): Comentario | undefined {
  if (!publicacionesMock.some((p) => p.id === datos.publicacionId)) return undefined;
  const comentario: Comentario = {
    id: generarId("c"),
    publicacionId: datos.publicacionId,
    autorId: datos.autorId,
    contenido: datos.contenido,
    fecha: new Date().toISOString(),
  };
  comentariosMock.push(comentario);
  return comentario;
}
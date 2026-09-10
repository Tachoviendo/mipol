/**
 * `src/data/grupos.ts`: datos mock del módulo de espacios de trabajo por
 * curso/materia (similar a CREA o Google Classroom).
 *
 * Roles:
 * - Docentes crean y administran grupos.
 * - Estudiantes se unen y participan (publican, entregan tareas).
 * - Administración tiene visibilidad global de todos los grupos.
 * - Público no tiene acceso.
 *
 * Los arreglos son mutables en memoria (como en `foros.ts`) para que las
 * Server Actions puedan crear/actualizar sin backend real.
 */

import { usuarios, type Usuario } from "@/data/usuarios";
import type { Rol } from "@/lib/roles";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                       */
/* -------------------------------------------------------------------------- */

export type Grupo = {
  id: string;
  nombre: string;
  materia: string;
  // Un grupo puede tener más de un docente a cargo; el principal es `docenteId`.
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

export type TipoMaterial =
  | "guia"
  | "apunte"
  | "presentacion"
  | "video"
  | "ejercicios";

export type Material = {
  id: string;
  grupoId: string;
  titulo: string;
  tipo: TipoMaterial;
  url?: string;
  publicadoPorId: string;
  fecha: string;
  tamanoKb?: number;
};

export type Tarea = {
  id: string;
  grupoId: string;
  titulo: string;
  descripcion: string;
  fechaPublicacion: string;
  fechaEntrega: string;
  publicadoPorId: string;
};

export type EstadoEntrega = "pendiente" | "entregada" | "calificada";

export type Entrega = {
  id: string;
  tareaId: string;
  estudianteId: string;
  estado: EstadoEntrega;
  fechaEntrega?: string;
  nota?: number;
  comentario?: string;
};

/* -------------------------------------------------------------------------- */
/* Datos mock                                                                  */
/* -------------------------------------------------------------------------- */

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
    miembroIds: ["u6", "u2"],
    descripcion: "Cinemática, movimiento rectilíneo y sus gráficas.",
  },
  {
    id: "g-mate-4b",
    nombre: "Matemática 4° B",
    materia: "Matemática",
    docenteId: "u2",
    curso: "4° B",
    miembroIds: ["u7", "u8"],
    descripcion: "Funciones cuadráticas y análisis de datos para 4° B.",
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
      "¡Bienvenidos al grupo de Matemática 3° A! Acá van a encontrar tareas, materiales y anuncios del curso.",
    fecha: "2026-08-03T09:00:00-03:00",
  },
  {
    id: "p-mate-3a-2",
    grupoId: "g-mate-3a",
    autorId: "u1",
    contenido:
      "Profe, ¿el parcial del jueves incluye funciones lineales? Para saber qué repasar.",
    fecha: "2026-09-08T18:30:00-03:00",
  },
  {
    id: "p-mate-3a-3",
    grupoId: "g-mate-3a",
    autorId: "u2",
    contenido:
      "Incluye funciones lineales y sistemas de ecuaciones. Dejé una guía en Materiales.",
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
    id: "p-mate-4b-1",
    grupoId: "g-mate-4b",
    autorId: "u2",
    contenido:
      "Subí la presentación de funciones cuadráticas. La revisamos el próximo encuentro.",
    fecha: "2026-09-01T10:00:00-03:00",
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
    id: "p-historia-5c-1",
    grupoId: "g-historia-5c",
    autorId: "u14",
    contenido:
      "La consigna del ensayo quedó publicada en Tareas. La fecha límite es el 25/09.",
    fecha: "2026-09-07T10:30:00-03:00",
  },
];

export const materialesMock: Material[] = [
  {
    id: "m-mate-3a-guia",
    grupoId: "g-mate-3a",
    titulo: "Guía: funciones lineales y sistemas",
    tipo: "guia",
    url: "/materiales/mate-funciones-lineales.pdf",
    publicadoPorId: "u2",
    fecha: "2026-09-02T08:20:00-03:00",
    tamanoKb: 420,
  },
  {
    id: "m-mate-3a-ej",
    grupoId: "g-mate-3a",
    titulo: "Ejercicios adicionales (con claves)",
    tipo: "ejercicios",
    url: "/materiales/mate-ejercicios-extra.pdf",
    publicadoPorId: "u2",
    fecha: "2026-09-03T14:00:00-03:00",
    tamanoKb: 310,
  },
  {
    id: "m-fisica-3b-apunte",
    grupoId: "g-fisica-3b",
    titulo: "Apunte de cinemática",
    tipo: "apunte",
    url: "/materiales/fisica-cinematica.pdf",
    publicadoPorId: "u12",
    fecha: "2026-08-25T11:00:00-03:00",
    tamanoKb: 890,
  },
  {
    id: "m-mate-4b-presentacion",
    grupoId: "g-mate-4b",
    titulo: "Presentación: funciones cuadráticas",
    tipo: "presentacion",
    url: "/materiales/mate-cuadraticas.pdf",
    publicadoPorId: "u2",
    fecha: "2026-09-01T10:05:00-03:00",
    tamanoKb: 760,
  },
  {
    id: "m-literatura-quiroga",
    grupoId: "g-literatura-4b",
    titulo: "El almohadón de plumas (Quiroga)",
    tipo: "apunte",
    url: "/materiales/almohadon-quiroga.pdf",
    publicadoPorId: "u13",
    fecha: "2026-08-26T15:45:00-03:00",
    tamanoKb: 180,
  },
  {
    id: "m-historia-linea",
    grupoId: "g-historia-5c",
    titulo: "Línea de tiempo: las guerras mundiales",
    tipo: "presentacion",
    url: "/materiales/historia-linea-tiempo.pdf",
    publicadoPorId: "u14",
    fecha: "2026-09-06T17:00:00-03:00",
    tamanoKb: 640,
  },
];

export const tareasMock: Tarea[] = [
  {
    id: "t-mate-3a-funciones",
    grupoId: "g-mate-3a",
    titulo: "Práctica: funciones lineales",
    descripcion:
      "Completar los ejercicios 1 a 8 de la guía publicada en Materiales. Entregar por acá.",
    fechaPublicacion: "2026-09-02T08:25:00-03:00",
    fechaEntrega: "2026-09-10T23:59:00-03:00",
    publicadoPorId: "u2",
  },
  {
    id: "t-mate-3a-sistemas",
    grupoId: "g-mate-3a",
    titulo: "Sistema de ecuaciones: mini-informe",
    descripcion:
      "Resolver un sistema por los tres métodos y explicar los pasos en un párrafo.",
    fechaPublicacion: "2026-09-05T10:00:00-03:00",
    fechaEntrega: "2026-09-17T23:59:00-03:00",
    publicadoPorId: "u2",
  },
  {
    id: "t-fisica-practico",
    grupoId: "g-fisica-3b",
    titulo: "Práctico de cinemática",
    descripcion:
      "Ejercicios 1 a 5 del práctico. Presentar cálculos con unidades.",
    fechaPublicacion: "2026-09-01T12:00:00-03:00",
    fechaEntrega: "2026-09-11T23:59:00-03:00",
    publicadoPorId: "u12",
  },
  {
    id: "t-mate-4b-cuadraticas",
    grupoId: "g-mate-4b",
    titulo: "Gráficas de funciones cuadráticas",
    descripcion: "Graficar 4 funciones cuadráticas e indicar vértice y raíces.",
    fechaPublicacion: "2026-09-03T09:00:00-03:00",
    fechaEntrega: "2026-09-15T23:59:00-03:00",
    publicadoPorId: "u2",
  },
  {
    id: "t-literatura-analisis",
    grupoId: "g-literatura-4b",
    titulo: "Análisis del cuento de Quiroga",
    descripcion:
      "Análisis de personajes y ambiente en 'El almohadón de plumas'. Máximo una carilla.",
    fechaPublicacion: "2026-08-28T16:10:00-03:00",
    fechaEntrega: "2026-09-14T23:59:00-03:00",
    publicadoPorId: "u13",
  },
  {
    id: "t-historia-ensayo",
    grupoId: "g-historia-5c",
    titulo: "Ensayo: consecuencias de la 2° Guerra Mundial",
    descripcion:
      "Ensayo argumentativo de 2 a 3 carillas con al menos dos fuentes citadas.",
    fechaPublicacion: "2026-09-07T10:35:00-03:00",
    fechaEntrega: "2026-09-25T23:59:00-03:00",
    publicadoPorId: "u14",
  },
];

export const entregasMock: Entrega[] = [
  {
    id: "e-t-mate-3a-funciones-u1",
    tareaId: "t-mate-3a-funciones",
    estudianteId: "u1",
    estado: "calificada",
    fechaEntrega: "2026-09-09T20:15:00-03:00",
    nota: 8,
    comentario: "Muy buen trabajo. Revisá el ejercicio 5.",
  },
  {
    id: "e-t-mate-3a-funciones-u5",
    tareaId: "t-mate-3a-funciones",
    estudianteId: "u5",
    estado: "entregada",
    fechaEntrega: "2026-09-10T09:00:00-03:00",
  },
  {
    id: "e-t-fisica-practico-u6",
    tareaId: "t-fisica-practico",
    estudianteId: "u6",
    estado: "entregada",
    fechaEntrega: "2026-09-10T11:30:00-03:00",
  },
  {
    id: "e-t-literatura-u7",
    tareaId: "t-literatura-analisis",
    estudianteId: "u7",
    estado: "calificada",
    fechaEntrega: "2026-09-12T18:45:00-03:00",
    nota: 9,
    comentario: "Excelente análisis del ambiente.",
  },
  {
    id: "e-t-mate-4b-u7",
    tareaId: "t-mate-4b-cuadraticas",
    estudianteId: "u7",
    estado: "pendiente",
  },
];

/* -------------------------------------------------------------------------- */
/* Permisos y usuario simulado                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Mapea el rol simulado activo (cookie `mipol_rol`) a un usuario concreto de
 * `usuarios.ts` para simular la sesión.
 */
export const USUARIO_POR_ROL: Record<Rol, string> = {
  estudiante: "u1",
  docente: "u2",
  administracion: "u3",
  publico: "u4",
};

export function usuarioSimuladoDeRol(rol: Rol): string {
  return USUARIO_POR_ROL[rol];
}

/* -------------------------------------------------------------------------- */
/* Consultas                                                                   */
/* -------------------------------------------------------------------------- */

export function obtenerGrupo(grupoId: string): Grupo | undefined {
  return gruposMock.find((grupo) => grupo.id === grupoId);
}

export function obtenerGruposDeUsuario(usuarioId: string): Grupo[] {
  return gruposMock.filter((grupo) =>
    grupo.miembroIds.includes(usuarioId) || grupo.docenteId === usuarioId,
  );
}

/** Todos los grupos visibles para un rol. Administración tiene visibilidad global. */
export function obtenerGruposParaRol(rol: Rol): Grupo[] {
  if (rol === "publico") return [];
  if (rol === "administracion") return [...gruposMock];
  return obtenerGruposDeUsuario(usuarioSimuladoDeRol(rol));
}

export function esMiembroDe(grupoId: string, usuarioId: string): boolean {
  const grupo = obtenerGrupo(grupoId);
  if (!grupo) return false;
  return (
    grupo.miembroIds.includes(usuarioId) || grupo.docenteId === usuarioId
  );
}

export function esDocenteDe(grupoId: string, usuarioId: string): boolean {
  const grupo = obtenerGrupo(grupoId);
  return Boolean(grupo) && grupo.docenteId === usuarioId;
}

export function obtenerPublicacionesDeGrupo(grupoId: string): Publicacion[] {
  return publicacionesMock
    .filter((publicacion) => publicacion.grupoId === grupoId)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
}

export function obtenerMaterialesDeGrupo(grupoId: string): Material[] {
  return materialesMock
    .filter((material) => material.grupoId === grupoId)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
}

export function obtenerTareasDeGrupo(grupoId: string): Tarea[] {
  return tareasMock
    .filter((tarea) => tarea.grupoId === grupoId)
    .sort((a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime());
}

export function obtenerTarea(tareaId: string): Tarea | undefined {
  return tareasMock.find((tarea) => tarea.id === tareaId);
}

export function obtenerEntregasDeTarea(tareaId: string): Entrega[] {
  return entregasMock.filter((entrega) => entrega.tareaId === tareaId);
}

export function obtenerEntregaDeEstudiante(
  tareaId: string,
  estudianteId: string,
): Entrega | undefined {
  return entregasMock.find(
    (entrega) => entrega.tareaId === tareaId && entrega.estudianteId === estudianteId,
  );
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
    .filter((u): u is Usuario => u !== undefined);
}

/* -------------------------------------------------------------------------- */
/* Mutaciones en memoria (para Server Actions)                                 */
/* -------------------------------------------------------------------------- */

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
    descripcion: datos.descripcion,
    docenteId: datos.docenteId,
    miembroIds: [],
  };
  gruposMock.push(grupo);
  return grupo;
}

export function crearTarea(datos: {
  grupoId: string;
  titulo: string;
  descripcion: string;
  fechaEntrega: string;
  publicadoPorId: string;
}): Tarea {
  const tarea: Tarea = {
    id: generarId("t"),
    grupoId: datos.grupoId,
    titulo: datos.titulo,
    descripcion: datos.descripcion,
    fechaPublicacion: new Date().toISOString(),
    fechaEntrega: datos.fechaEntrega,
    publicadoPorId: datos.publicadoPorId,
  };
  tareasMock.push(tarea);
  return tarea;
}

export function agregarPublicacion(datos: {
  grupoId: string;
  autorId: string;
  contenido: string;
}): Publicacion | undefined {
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

export function entregarTarea(datos: {
  tareaId: string;
  estudianteId: string;
}): Entrega {
  const existente = obtenerEntregaDeEstudiante(datos.tareaId, datos.estudianteId);
  if (existente) {
    existente.estado = "entregada";
    existente.fechaEntrega = new Date().toISOString();
    return existente;
  }
  const entrega: Entrega = {
    id: generarId("e"),
    tareaId: datos.tareaId,
    estudianteId: datos.estudianteId,
    estado: "entregada",
    fechaEntrega: new Date().toISOString(),
  };
  entregasMock.push(entrega);
  return entrega;
}

export function calificarEntrega(datos: {
  entregaId: string;
  nota?: number;
  comentario?: string;
}): Entrega | undefined {
  const entrega = entregasMock.find((e) => e.id === datos.entregaId);
  if (!entrega) return undefined;
  entrega.estado = "calificada";
  entrega.nota = datos.nota;
  entrega.comentario = datos.comentario?.trim() || entrega.comentario;
  return entrega;
}

export function unirseAGrupo(grupoId: string, estudianteId: string): boolean {
  const grupo = obtenerGrupo(grupoId);
  if (!grupo || grupo.miembroIds.includes(estudianteId)) return false;
  grupo.miembroIds.push(estudianteId);
  return true;
}
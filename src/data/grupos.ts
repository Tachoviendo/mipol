/**
 * `src/data/grupos.ts`: datos mock del módulo de grupos para construir la UI
 * sin backend real.
 *
 * Cada grupo pertenece a una materia y un curso, tiene un docente a cargo
 * (`docenteId` referenciando `usuarios.ts`) y una lista de miembros
 * (estudiantes y/o docentes). Las tareas y materiales están asociadas a un
 * grupo concreto; las entregas, a una tarea.
 */

import { usuarios, type Usuario } from "@/data/usuarios";
import type { Rol } from "@/lib/roles";

/** Grupo de trabajo o clase: nombre, materia, docente a cargo, curso y miembros. */
export type Grupo = {
  id: string;
  nombre: string;
  materia: string;
  docenteId: string; // id en `usuarios.ts`
  curso: string;
  miembroIds: string[]; // ids en `usuarios.ts` (estudiantes y docentes)
  descripcion?: string;
};

export type Publicacion = {
  id: string;
  grupoId: string;
  autorId: string;
  contenido: string;
  fecha: string;
  adjuntos?: string[];
};

export type TipoMaterial = "guia" | "apunte" | "presentacion" | "video" | "ejercicios";

export type Material = {
  id: string;
  grupoId: string;
  titulo: string;
  tipo: TipoMaterial;
  url: string;
  publicadoPorId: string;
  fecha: string;
  tamanoKb?: number;
};

export type EstadoTarea = "pendiente" | "entregada" | "calificada";

export type Tarea = {
  id: string;
  grupoId: string;
  titulo: string;
  descripcion: string;
  fechaPublicacion: string;
  fechaEntrega: string;
  publicadoPorId: string;
};

export type Entrega = {
  id: string;
  tareaId: string;
  estudianteId: string;
  estado: EstadoTarea;
  fechaEntrega?: string;
  nota?: number;
  comentario?: string;
  archivo?: string;
};

export const gruposMock: Grupo[] = [
  {
    id: "g-mate-3a",
    nombre: "Matemática 3° A",
    materia: "Matemática",
    docenteId: "u2",
    curso: "3° A",
    miembroIds: ["u1", "u2", "u5"],
    descripcion: "Grupo de matemática para el curso 3° A.",
  },
  {
    id: "g-fisica-3b",
    nombre: "Física 3° B",
    materia: "Física",
    docenteId: "u12",
    curso: "3° B",
    miembroIds: ["u2", "u6", "u12"],
    descripcion: "Grupo de física para el curso 3° B.",
  },
  {
    id: "g-literatura-4b",
    nombre: "Literatura 4° B",
    materia: "Literatura",
    docenteId: "u13",
    curso: "4° B",
    miembroIds: ["u7", "u8", "u13"],
    descripcion: "Lectura y producción de textos para 4° B.",
  },
  {
    id: "g-historia-5c",
    nombre: "Historia 5° C",
    materia: "Historia",
    docenteId: "u14",
    curso: "5° C",
    miembroIds: ["u9", "u10", "u14"],
    descripcion: "Historia contemporánea, curso 5° C.",
  },
];

export const publicacionesMock: Publicacion[] = [
  {
    id: "p-mate-1",
    grupoId: "g-mate-3a",
    autorId: "u2",
    contenido:
      "¡Bienvenidos al grupo de Matemática! Acá iremos publicando tareas y materiales del curso.",
    fecha: "2026-08-03T09:00:00-03:00",
  },
  {
    id: "p-mate-2",
    grupoId: "g-mate-3a",
    autorId: "u1",
    contenido:
      "Profe, ¿el parcial del jueves incluye funciones lineales? Quiero confirmar para repasar.",
    fecha: "2026-09-01T18:30:00-03:00",
  },
  {
    id: "p-mate-3",
    grupoId: "g-mate-3a",
    autorId: "u2",
    contenido:
      "Incluye funciones lineales y sistemas de ecuaciones. Dejé una guía de ejercicios en Materiales.",
    fecha: "2026-09-02T08:15:00-03:00",
  },
  {
    id: "p-fisica-1",
    grupoId: "g-fisica-3b",
    autorId: "u12",
    contenido:
      "Para el práctico de mañana traigan el apunte de cinemática y su calculadora.",
    fecha: "2026-09-05T12:00:00-03:00",
  },
  {
    id: "p-literatura-1",
    grupoId: "g-literatura-4b",
    autorId: "u13",
    contenido:
      "Mañana conversamos sobre el cuento 'El almohadón de plumas'. Quienes quieran pueden subir sus anotaciones.",
    fecha: "2026-08-28T16:00:00-03:00",
  },
  {
    id: "p-historia-1",
    grupoId: "g-historia-5c",
    autorId: "u14",
    contenido:
      "Publicaré la consigna del ensayo el lunes. Revisen la línea de tiempo compartida.",
    fecha: "2026-09-07T10:30:00-03:00",
  },
];

export const materialesMock: Material[] = [
  {
    id: "m-mate-guia",
    grupoId: "g-mate-3a",
    titulo: "Guía: funciones lineales y sistemas",
    tipo: "guia",
    url: "/materiales/mate-funciones-lineales.pdf",
    publicadoPorId: "u2",
    fecha: "2026-09-02T08:20:00-03:00",
    tamanoKb: 420,
  },
  {
    id: "m-mate-ejercicios",
    grupoId: "g-mate-3a",
    titulo: "Ejercicios adicionales (con claves)",
    tipo: "ejercicios",
    url: "/materiales/mate-ejercicios-extra.pdf",
    publicadoPorId: "u2",
    fecha: "2026-09-03T14:00:00-03:00",
    tamanoKb: 310,
  },
  {
    id: "m-fisica-cinematica",
    grupoId: "g-fisica-3b",
    titulo: "Apunte de cinemática",
    tipo: "apunte",
    url: "/materiales/fisica-cinematica.pdf",
    publicadoPorId: "u12",
    fecha: "2026-08-25T11:00:00-03:00",
    tamanoKb: 890,
  },
  {
    id: "m-fisica-presentacion",
    grupoId: "g-fisica-3b",
    titulo: "Presentación: MRU y MRUV",
    tipo: "presentacion",
    url: "/materiales/fisica-mru-mruv.pdf",
    publicadoPorId: "u12",
    fecha: "2026-08-30T09:30:00-03:00",
    tamanoKb: 1250,
  },
  {
    id: "m-literatura-quiroga",
    grupoId: "g-literatura-4b",
    titulo: "Cuento: 'El almohadón de plumas'",
    tipo: "apunte",
    url: "/materiales/literatura-almohadon.pdf",
    publicadoPorId: "u13",
    fecha: "2026-08-26T15:45:00-03:00",
    tamanoKb: 180,
  },
  {
    id: "m-historia-linea",
    grupoId: "g-historia-5c",
    titulo: "Línea de tiempo: siglo XX",
    tipo: "presentacion",
    url: "/materiales/historia-linea-tiempo.pdf",
    publicadoPorId: "u14",
    fecha: "2026-09-06T17:00:00-03:00",
    tamanoKb: 760,
  },
];

export const tareasMock: Tarea[] = [
  {
    id: "t-mate-funciones",
    grupoId: "g-mate-3a",
    titulo: "Práctica: funciones lineales",
    descripcion:
      "Completar los ejercicios 1 a 8 de la guía publicada en Materiales. Se corrige en clases.",
    fechaPublicacion: "2026-09-02T08:25:00-03:00",
    fechaEntrega: "2026-09-10T23:59:00-03:00",
    publicadoPorId: "u2",
  },
  {
    id: "t-mate-sistemas",
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
      "Ejercicios 1 a 5 del práctico de cinemática. Presentar los cálculos con unidades.",
    fechaPublicacion: "2026-09-01T12:00:00-03:00",
    fechaEntrega: "2026-09-11T23:59:00-03:00",
    publicadoPorId: "u12",
  },
  {
    id: "t-literatura-cuento",
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
    titulo: "Ensayo: consecuencias de la Segunda Guerra Mundial",
    descripcion:
      "Ensayo argumentativo de 2 a 3 carillas con al menos dos fuentes citadas.",
    fechaPublicacion: "2026-09-07T10:35:00-03:00",
    fechaEntrega: "2026-09-25T23:59:00-03:00",
    publicadoPorId: "u14",
  },
];

export const entregasMock: Entrega[] = [
  {
    id: "e-mate-funciones-u1",
    tareaId: "t-mate-funciones",
    estudianteId: "u1",
    estado: "calificada",
    fechaEntrega: "2026-09-09T20:15:00-03:00",
    nota: 8,
    comentario: "Muy buen trabajo. Revisá el procedimiento del ejercicio 5.",
    archivo: "/entregas/mate-funciones-u1.pdf",
  },
  {
    id: "e-mate-funciones-u5",
    tareaId: "t-mate-funciones",
    estudianteId: "u5",
    estado: "entregada",
    fechaEntrega: "2026-09-10T09:00:00-03:00",
    archivo: "/entregas/mate-funciones-u5.pdf",
  },
  {
    id: "e-fisica-practico-u6",
    tareaId: "t-fisica-practico",
    estudianteId: "u6",
    estado: "entregada",
    fechaEntrega: "2026-09-10T11:30:00-03:00",
    archivo: "/entregas/fisica-practico-u6.pdf",
  },
  {
    id: "e-literatura-u7",
    tareaId: "t-literatura-cuento",
    estudianteId: "u7",
    estado: "calificada",
    fechaEntrega: "2026-09-12T18:45:00-03:00",
    nota: 9,
    comentario: "Excelente análisis del ambiente. Me gustó mucho la lectura final.",
    archivo: "/entregas/literatura-u7.pdf",
  },
  {
    id: "e-historia-u9",
    tareaId: "t-historia-ensayo",
    estudianteId: "u9",
    estado: "pendiente",
  },
];

/* -------------------------------------------------------------------------- */
/* Helpers de acceso, siguiendo la convención del resto de `src/data`.         */
/* -------------------------------------------------------------------------- */

/**
 * Mapea el rol simulado activo (cookie `mipol_rol`) a un usuario de
 * `usuarios.ts` para poder filtrar los grupos de la persona simulada.
 */
export const USUARIO_POR_ROL: Record<Rol, string> = {
  estudiante: "u1",
  docente: "u2",
  administracion: "u3",
  publico: "u4",
};

export function obtenerGrupo(grupoId: string): Grupo | undefined {
  return gruposMock.find((grupo) => grupo.id === grupoId);
}

export function obtenerGruposDeUsuario(usuarioId: string): Grupo[] {
  return gruposMock.filter((grupo) => grupo.miembroIds.includes(usuarioId));
}

export function obtenerGruposParaRol(rol: Rol): Grupo[] {
  return obtenerGruposDeUsuario(USUARIO_POR_ROL[rol]);
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
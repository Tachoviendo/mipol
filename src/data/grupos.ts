/**
 * `src/data/grupos.ts`: datos mock del módulo de espacios de trabajo por
 * curso/materia (similar a CREA o Google Classroom).
 *
 * Roles:
 * - Docentes crean y administran grupos y comparten materiales.
 * - Estudiantes participan y acceden a los recursos del grupo.
 * - Administración tiene visibilidad global.
 * - Público no tiene acceso.
 *
 * Los arreglos son mutables en memoria (como `foros.ts`) para que las Server
 * Actions puedan mutarlos sin backend real.
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

export type TipoMaterial =
  | "guia"
  | "apunte"
  | "presentacion"
  | "video"
  | "ejercicios"
  | "enlace";

/** Archivo o recurso compartido por el docente en un grupo. */
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

export const TIPOS_MATERIAL: { valor: TipoMaterial; etiqueta: string }[] = [
  { valor: "guia", etiqueta: "Guía" },
  { valor: "apunte", etiqueta: "Apunte" },
  { valor: "presentacion", etiqueta: "Presentación" },
  { valor: "video", etiqueta: "Video" },
  { valor: "ejercicios", etiqueta: "Ejercicios" },
  { valor: "enlace", etiqueta: "Enlace" },
];

export function etiquetaTipoMaterial(tipo: TipoMaterial): string {
  return TIPOS_MATERIAL.find((t) => t.valor === tipo)?.etiqueta ?? tipo;
}

export const gruposMock: Grupo[] = [
  {
    id: "g-mate-3a",
    nombre: "Matemática 3° A",
    materia: "Matemática",
    docenteId: "u2",
    curso: "3° A",
    miembroIds: ["u1", "u5", "u15", "u16"],
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
      "¡Bienvenidos al grupo de Matemática 3° A! Acá van a estar las novedades, materiales y tareas del curso.",
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
      "Incluye las dos: funciones lineales y sistemas por igualación y sustitución.",
    fecha: "2026-09-09T19:00:00-03:00",
  },
  {
    id: "c-literatura-4b-1-1",
    publicacionId: "p-literatura-4b-1",
    autorId: "u7",
    contenido: "¿El texto está en Materiales?",
    fecha: "2026-08-28T16:20:00-03:03",
  },
];

export const materialesMock: Material[] = [
  // Matemática 3° A — varios para probar agrupación/filtros
  {
    id: "m-mate-guia-funciones",
    grupoId: "g-mate-3a",
    titulo: "Guía: funciones lineales y sistemas",
    tipo: "guia",
    url: "/materiales/mate-funciones-lineales.pdf",
    publicadoPorId: "u2",
    fecha: "2026-09-02T08:20:00-03:00",
    tamanoKb: 420,
  },
  {
    id: "m-mate-ejercicios-extra",
    grupoId: "g-mate-3a",
    titulo: "Ejercicios adicionales (con claves)",
    tipo: "ejercicios",
    url: "/materiales/mate-ejercicios-extra.pdf",
    publicadoPorId: "u2",
    fecha: "2026-09-03T14:00:00-03:00",
    tamanoKb: 310,
  },
  {
    id: "m-mate-apunte-parcial",
    grupoId: "g-mate-3a",
    titulo: "Apunte de repaso para el parcial",
    tipo: "apunte",
    url: "/materiales/mate-repaso-parcial.pdf",
    publicadoPorId: "u2",
    fecha: "2026-09-08T11:00:00-03:00",
    tamanoKb: 580,
  },
  {
    id: "m-mate-presentacion-sistemas",
    grupoId: "g-mate-3a",
    titulo: "Presentación: sistemas de ecuaciones",
    tipo: "presentacion",
    url: "/materiales/mate-sistemas.ppt.pdf",
    publicadoPorId: "u2",
    fecha: "2026-09-04T09:30:00-03:00",
    tamanoKb: 1250,
  },
  {
    id: "m-mate-video-vértice",
    grupoId: "g-mate-3a",
    titulo: "Video: cómo graficar una función lineal",
    tipo: "video",
    url: "https://www.youtube.com/watch?v=funcionlineal",
    publicadoPorId: "u2",
    fecha: "2026-09-06T16:00:00-03:00",
  },
  {
    id: "m-mate-enlace-khan",
    grupoId: "g-mate-3a",
    titulo: "Recurso: práctica interactiva en Khan Academy",
    tipo: "enlace",
    url: "https://es.khanacademy.org/math/linear-functions",
    publicadoPorId: "u2",
    fecha: "2026-09-05T10:00:00-03:00",
  },
  {
    id: "m-mate-guia-geometria",
    grupoId: "g-mate-3a",
    titulo: "Guía: geometría del triángulo",
    tipo: "guia",
    url: "/materiales/mate-geometria-triangulo.pdf",
    publicadoPorId: "u2",
    fecha: "2026-08-20T08:00:00-03:00",
    tamanoKb: 350,
  },
  {
    id: "m-mate-apunte-numeros",
    grupoId: "g-mate-3a",
    titulo: "Apunte: conjuntos numéricos",
    tipo: "apunte",
    url: "/materiales/mate-conjuntos.pdf",
    publicadoPorId: "u2",
    fecha: "2026-08-18T09:00:00-03:00",
    tamanoKb: 440,
  },
  // Física 3° B
  {
    id: "m-fisica-apunte-cinematica",
    grupoId: "g-fisica-3b",
    titulo: "Apunte de cinemática",
    tipo: "apunte",
    url: "/materiales/fisica-cinematica.pdf",
    publicadoPorId: "u12",
    fecha: "2026-08-25T11:00:00-03:00",
    tamanoKb: 890,
  },
  {
    id: "m-fisica-presentacion-mru",
    grupoId: "g-fisica-3b",
    titulo: "Presentación: MRU y MRUV",
    tipo: "presentacion",
    url: "/materiales/fisica-mru-mruv.pdf",
    publicadoPorId: "u12",
    fecha: "2026-08-30T09:30:00-03:00",
    tamanoKb: 1100,
  },
  {
    id: "m-fisica-ejercicios",
    grupoId: "g-fisica-3b",
    titulo: "Ejercicios: gráficas de posición",
    tipo: "ejercicios",
    url: "/materiales/fisica-graficas.pdf",
    publicadoPorId: "u12",
    fecha: "2026-09-01T12:00:00-03:00",
    tamanoKb: 210,
  },
  // Literatura 4° B
  {
    id: "m-lit-quiroga",
    grupoId: "g-literatura-4b",
    titulo: "El almohadón de plumas (Quiroga)",
    tipo: "apunte",
    url: "/materiales/almohadon-quiroga.pdf",
    publicadoPorId: "u13",
    fecha: "2026-08-26T15:45:00-03:00",
    tamanoKb: 180,
  },
  {
    id: "m-lit-presentacion-cuentos",
    grupoId: "g-literatura-4b",
    titulo: "Presentación: el cuento rioplatense",
    tipo: "presentacion",
    url: "/materiales/literatura-cuento.pdf",
    publicadoPorId: "u13",
    fecha: "2026-08-27T10:00:00-03:00",
    tamanoKb: 640,
  },
  // Historia 5° C
  {
    id: "m-historia-linea",
    grupoId: "g-historia-5c",
    titulo: "Línea de tiempo: las guerras mundiales",
    tipo: "presentacion",
    url: "/materiales/historia-linea.pdf",
    publicadoPorId: "u14",
    fecha: "2026-09-06T17:00:00-03:00",
    tamanoKb: 760,
  },
  {
    id: "m-historia-enlace",
    grupoId: "g-historia-5c",
    titulo: "Archivo: fuentes sobre la 2° Guerra Mundial",
    tipo: "enlace",
    url: "https://www.archivo.uy/fuentes-ww2",
    publicadoPorId: "u14",
    fecha: "2026-09-07T09:00:00-03:00",
  },
];

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

export function obtenerPublicacionesDeGrupo(grupoId: string): Publicacion[] {
  return publicacionesMock
    .filter((publicacion) => publicacion.grupoId === grupoId)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
}

export function obtenerPublicacion(publicacionId: string): Publicacion | undefined {
  return publicacionesMock.find((publicacion) => publicacion.id === publicacionId);
}

export function obtenerComentariosDePublicacion(
  publicacionId: string,
): Comentario[] {
  return comentariosMock
    .filter((comentario) => comentario.publicacionId === publicacionId)
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
}

/** Materiales de un grupo, ordenados por fecha de más reciente a más antigua. */
export function obtenerMaterialesDeGrupo(grupoId: string): Material[] {
  return materialesMock
    .filter((material) => material.grupoId === grupoId)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
}

export function obtenerMaterialesPorTipo(
  grupoId: string,
  tipo?: TipoMaterial,
): Material[] {
  const materiales = obtenerMaterialesDeGrupo(grupoId);
  if (!tipo) return materiales;
  return materiales.filter((material) => material.tipo === tipo);
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
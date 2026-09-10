/**
 * `src/data/mensajes.ts`: tipos y datos mock del sistema de mensajería.
 * Define usuarios, conversaciones y mensajes para la funcionalidad
 * de historial de conversaciones.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type RolUsuario = "estudiante" | "docente" | "admin";

export type Usuario = {
  id: string;
  nombre: string;
  rol: RolUsuario;
  avatar?: string; // URL o iniciales
};

export type Mensaje = {
  id: string;
  conversacionId: string;
  autorId: string;
  contenido: string;
  fecha: string; // ISO 8601
  leido: boolean;
};

export type Conversacion = {
  id: string;
  titulo: string;
  participantes: string[]; // IDs de usuarios
  esGrupal: boolean;
  curso?: string;
  fechaCreacion: string; // ISO 8601
};

// ─── Datos mock ──────────────────────────────────────────────────────────────

export const usuarios: Usuario[] = [
  { id: "u1", nombre: "Ana García", rol: "estudiante" },
  { id: "u2", nombre: "Carlos Pérez", rol: "docente" },
  { id: "u3", nombre: "María López", rol: "estudiante" },
  { id: "u4", nombre: "Juan Rodríguez", rol: "admin" },
  { id: "u5", nombre: "Laura Martínez", rol: "estudiante" },
  { id: "u6", nombre: "Pedro Sánchez", rol: "docente" },
];

export const conversaciones: Conversacion[] = [
  {
    id: "c1",
    titulo: "Consulta sobre tarea de matemática",
    participantes: ["u1", "u2"],
    esGrupal: false,
    fechaCreacion: "2026-09-01T10:00:00Z",
  },
  {
    id: "c2",
    titulo: "Grupo de estudio - Ciencias",
    participantes: ["u1", "u3", "u5", "u6"],
    esGrupal: true,
    curso: "3° A",
    fechaCreacion: "2026-09-02T08:30:00Z",
  },
  {
    id: "c3",
    titulo: "Aviso: Examen de Historia",
    participantes: ["u1", "u2", "u3", "u4", "u5", "u6"],
    esGrupal: true,
    curso: "3° A",
    fechaCreacion: "2026-09-03T14:00:00Z",
  },
];

export const mensajes: Mensaje[] = [
  // Conversación 1: Consulta tarea matemática (1:1)
  {
    id: "m1",
    conversacionId: "c1",
    autorId: "u1",
    contenido: "Hola profesor, tengo una duda con el ejercicio 3 de la tarea.",
    fecha: "2026-09-01T10:05:00Z",
    leido: true,
  },
  {
    id: "m2",
    conversacionId: "c1",
    autorId: "u2",
    contenido:
      "Hola Ana, ¿cuál es la duda? ¿Necesitás que te explique la fórmula?",
    fecha: "2026-09-01T10:12:00Z",
    leido: true,
  },
  {
    id: "m3",
    conversacionId: "c1",
    autorId: "u1",
    contenido:
      "No entiendo cómo aplicar la fórmula general cuando el coeficiente principal es negativo.",
    fecha: "2026-09-01T10:15:00Z",
    leido: true,
  },
  {
    id: "m4",
    conversacionId: "c1",
    autorId: "u2",
    contenido:
      "Buen punto. Cuando a es negativo, primero multiplicá toda la ecuación por -1 para que a quede positivo. Después aplicás la fórmula normalmente.",
    fecha: "2026-09-01T10:20:00Z",
    leido: true,
  },
  {
    id: "m5",
    conversacionId: "c1",
    autorId: "u1",
    contenido: "¡Ah, claro! Muchas gracias profesor, ahora lo intento.",
    fecha: "2026-09-01T10:22:00Z",
    leido: true,
  },
  {
    id: "m6",
    conversacionId: "c1",
    autorId: "u2",
    contenido: "De nada, cualquier cosa avisame. ¡Éxitos!",
    fecha: "2026-09-01T10:23:00Z",
    leido: true,
  },

  // Conversación 2: Grupo de estudio Ciencias (grupal)
  {
    id: "m7",
    conversacionId: "c2",
    autorId: "u6",
    contenido:
      "Hola a todos, el viernes vamos a hacer una revisión grupal para el examen de ciencias.",
    fecha: "2026-09-02T08:35:00Z",
    leido: true,
  },
  {
    id: "m8",
    conversacionId: "c2",
    autorId: "u1",
    contenido: "Perfecto profesor, ¿a qué hora?",
    fecha: "2026-09-02T08:40:00Z",
    leido: true,
  },
  {
    id: "m9",
    conversacionId: "c2",
    autorId: "u6",
    contenido: "A las 15:00 en el aula 3. Traigan sus apuntes.",
    fecha: "2026-09-02T08:42:00Z",
    leido: true,
  },
  {
    id: "m10",
    conversacionId: "c2",
    autorId: "u3",
    contenido: "Yo voy, pero llego 10 min tarde porque tengo otra clase.",
    fecha: "2026-09-02T09:00:00Z",
    leido: true,
  },
  {
    id: "m11",
    conversacionId: "c2",
    autorId: "u5",
    contenido: "¿Se puede llevar el libro de texto? O solo los apuntes.",
    fecha: "2026-09-02T09:15:00Z",
    leido: true,
  },
  {
    id: "m12",
    conversacionId: "c2",
    autorId: "u6",
    contenido: "Sí, traigan todo lo que tengan. Mientras más material mejor.",
    fecha: "2026-09-02T09:18:00Z",
    leido: true,
  },

  // Conversación 3: Aviso examen (broadcast)
  {
    id: "m13",
    conversacionId: "c3",
    autorId: "u4",
    contenido:
      "Aviso importante: El examen de Historia será el lunes 15 de septiembre a las 10:00.",
    fecha: "2026-09-03T14:05:00Z",
    leido: true,
  },
  {
    id: "m14",
    conversacionId: "c3",
    autorId: "u4",
    contenido:
      "El tema abarca desde la independencia hasta la guerra del Chaco. Estudien el capítulo 5 y 6.",
    fecha: "2026-09-03T14:06:00Z",
    leido: true,
  },
  {
    id: "m15",
    conversacionId: "c3",
    autorId: "u2",
    contenido:
      "Recordatororio: las clases de repaso serán el jueves y viernes de esta semana.",
    fecha: "2026-09-03T14:10:00Z",
    leido: true,
  },
  {
    id: "m16",
    conversacionId: "c3",
    autorId: "u1",
    contenido: "Profesor, ¿el examen es de desarrollo o multiple choice?",
    fecha: "2026-09-03T14:15:00Z",
    leido: true,
  },
  {
    id: "m17",
    conversacionId: "c3",
    autorId: "u2",
    contenido:
      "Será de desarrollo, pero con 3 puntos multiple choice para repasar fechas.",
    fecha: "2026-09-03T14:18:00Z",
    leido: true,
  },
  {
    id: "m18",
    conversacionId: "c3",
    autorId: "u5",
    contenido: "¿Se puede llevar algo para consultar?",
    fecha: "2026-09-03T14:20:00Z",
    leido: false,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function obtenerUsuario(id: string): Usuario | undefined {
  return usuarios.find((u) => u.id === id);
}

export function obtenerConversacion(
  id: string,
): Conversacion | undefined {
  return conversaciones.find((c) => c.id === id);
}

export function obtenerMensajesConversacion(conversacionId: string): Mensaje[] {
  return mensajes
    .filter((m) => m.conversacionId === conversacionId)
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
}

export function participantesConversacion(
  participantes: string[],
): Usuario[] {
  return participantes
    .map((id) => obtenerUsuario(id))
    .filter((u): u is Usuario => u !== undefined);
}

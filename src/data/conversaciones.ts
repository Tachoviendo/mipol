/**
 * `src/data`: datos mock/estáticos para la bandeja de entrada,
 * hasta que existan APIs o una base de datos real.
 */

export type Participante = {
  id: string;
  nombre: string;
  avatar?: string;
  rol?: "estudiante" | "profesor" | "admin";
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
  tipo: "directa" | "grupo" | "curso";
  nombre?: string; // para grupos/cursos
  participantes: Participante[];
  ultimoMensaje?: Mensaje;
  noLeidos: number;
  actualizadoEn: string; // ISO 8601
};

// Participantes mock
export const participantes: Participante[] = [
  { id: "u1", nombre: "María González", avatar: "/avatars/maria.jpg", rol: "profesor" },
  { id: "u2", nombre: "Juan Pérez", avatar: "/avatars/juan.jpg", rol: "estudiante" },
  { id: "u3", nombre: "Ana Martínez", avatar: "/avatars/ana.jpg", rol: "estudiante" },
  { id: "u4", nombre: "Carlos López", avatar: "/avatars/carlos.jpg", rol: "estudiante" },
  { id: "u5", nombre: "Laura Fernández", avatar: "/avatars/laura.jpg", rol: "profesor" },
  { id: "u6", nombre: "Pedro Ruiz", avatar: "/avatars/pedro.jpg", rol: "estudiante" },
  { id: "u7", nombre: "Sofía Torres", avatar: "/avatars/sofia.jpg", rol: "estudiante" },
  { id: "u8", nombre: "Miguel Ángel", avatar: "/avatars/miguel.jpg", rol: "admin" },
];

// Mensajes mock
export const mensajes: Mensaje[] = [
  // Conversación 1: Directa (u1 - u2)
  { id: "m1", conversacionId: "c1", autorId: "u1", contenido: "Hola Juan, ¿cómo va el proyecto?", fecha: "2026-03-10T09:15:00Z", leido: true },
  { id: "m2", conversacionId: "c1", autorId: "u2", contenido: "Bien, profesora. Ya terminé la primera parte.", fecha: "2026-03-10T09:20:00Z", leido: true },
  { id: "m3", conversacionId: "c1", autorId: "u1", contenido: "Perfecto, mándamelo cuando puedas.", fecha: "2026-03-10T09:22:00Z", leido: false },

  // Conversación 2: Directa (u1 - u3)
  { id: "m4", conversacionId: "c2", autorId: "u3", contenido: "Tengo duda en el ejercicio 3", fecha: "2026-03-10T10:00:00Z", leido: true },
  { id: "m5", conversacionId: "c2", autorId: "u1", contenido: "Claro, ¿qué parte no entiendes?", fecha: "2026-03-10T10:05:00Z", leido: true },
  { id: "m6", conversacionId: "c2", autorId: "u3", contenido: "La fórmula del teorema", fecha: "2026-03-10T10:07:00Z", leido: false },

  // Conversación 3: Grupo "Proyecto Final"
  { id: "m7", conversacionId: "c3", autorId: "u2", contenido: "Equipo, ¿nos reunimos mañana?", fecha: "2026-03-10T14:00:00Z", leido: true },
  { id: "m8", conversacionId: "c3", autorId: "u4", contenido: "Yo puedo a las 16:00", fecha: "2026-03-10T14:05:00Z", leido: true },
  { id: "m9", conversacionId: "c3", autorId: "u6", contenido: "A mí me va bien", fecha: "2026-03-10T14:10:00Z", leido: true },
  { id: "m10", conversacionId: "c3", autorId: "u7", contenido: "Confirmado a las 16:00", fecha: "2026-03-10T14:15:00Z", leido: false },

  // Conversación 4: Curso "Matemáticas 5to"
  { id: "m11", conversacionId: "c4", autorId: "u5", contenido: "Recordatorio: examen el viernes", fecha: "2026-03-10T08:00:00Z", leido: true },
  { id: "m12", conversacionId: "c4", autorId: "u2", contenido: "¿Qué temas entran?", fecha: "2026-03-10T08:10:00Z", leido: true },
  { id: "m13", conversacionId: "c4", autorId: "u5", contenido: "Capítulos 1 a 5", fecha: "2026-03-10T08:12:00Z", leido: true },
  { id: "m14", conversacionId: "c4", autorId: "u3", contenido: "Gracias profesora", fecha: "2026-03-10T08:15:00Z", leido: false },
  { id: "m15", conversacionId: "c4", autorId: "u4", contenido: "Entendido", fecha: "2026-03-10T08:16:00Z", leido: false },

  // Conversación 5: Directa (u5 - u6)
  { id: "m16", conversacionId: "c5", autorId: "u6", contenido: "Profe, ¿puedo entregar el lunes?", fecha: "2026-03-10T11:00:00Z", leido: true },
  { id: "m17", conversacionId: "c5", autorId: "u5", contenido: "Sin problema, avísame", fecha: "2026-03-10T11:05:00Z", leido: false },

  // Conversación 6: Grupo "Delegados"
  { id: "m18", conversacionId: "c6", autorId: "u8", contenido: "Reunión de delegados el miércoles", fecha: "2026-03-10T12:00:00Z", leido: true },
  { id: "m19", conversacionId: "c6", autorId: "u2", contenido: "Confirmo asistencia", fecha: "2026-03-10T12:10:00Z", leido: true },
  { id: "m20", conversacionId: "c6", autorId: "u3", contenido: "Yo también voy", fecha: "2026-03-10T12:12:00Z", leido: false },
];

// Conversaciones mock
export const conversaciones: Conversacion[] = [
  {
    id: "c1",
    tipo: "directa",
    participantes: [participantes[0], participantes[1]], // María - Juan
    ultimoMensaje: mensajes[2],
    noLeidos: 1,
    actualizadoEn: "2026-03-10T09:22:00Z",
  },
  {
    id: "c2",
    tipo: "directa",
    participantes: [participantes[0], participantes[2]], // María - Ana
    ultimoMensaje: mensajes[5],
    noLeidos: 1,
    actualizadoEn: "2026-03-10T10:07:00Z",
  },
  {
    id: "c3",
    tipo: "grupo",
    nombre: "Proyecto Final",
    participantes: [participantes[1], participantes[3], participantes[5], participantes[6]], // Juan, Carlos, Pedro, Sofía
    ultimoMensaje: mensajes[9],
    noLeidos: 1,
    actualizadoEn: "2026-03-10T14:15:00Z",
  },
  {
    id: "c4",
    tipo: "curso",
    nombre: "Matemáticas 5to",
    participantes: [participantes[4], participantes[1], participantes[2], participantes[3], participantes[5], participantes[6]], // Laura + 5 estudiantes
    ultimoMensaje: mensajes[14],
    noLeidos: 2,
    actualizadoEn: "2026-03-10T08:16:00Z",
  },
  {
    id: "c5",
    tipo: "directa",
    participantes: [participantes[4], participantes[5]], // Laura - Pedro
    ultimoMensaje: mensajes[16],
    noLeidos: 1,
    actualizadoEn: "2026-03-10T11:05:00Z",
  },
  {
    id: "c6",
    tipo: "grupo",
    nombre: "Delegados",
    participantes: [participantes[7], participantes[1], participantes[2]], // Miguel, Juan, Ana
    ultimoMensaje: mensajes[19],
    noLeidos: 1,
    actualizadoEn: "2026-03-10T12:12:00Z",
  },
];

// Helpers
export function getConversacionById(id: string): Conversacion | undefined {
  return conversaciones.find((c) => c.id === id);
}

export function getMensajesByConversacion(conversacionId: string): Mensaje[] {
  return mensajes
    .filter((m) => m.conversacionId === conversacionId)
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
}

export function getParticipanteById(id: string): Participante | undefined {
  return participantes.find((p) => p.id === id);
}

export function getConversacionesByParticipante(participanteId: string): Conversacion[] {
  return conversaciones.filter((c) => c.participantes.some((p) => p.id === participanteId));
}

export function marcarComoLeido(conversacionId: string, participanteId: string): void {
  const msgs = getMensajesByConversacion(conversacionId);
  msgs.forEach((m) => {
    if (m.autorId !== participanteId) {
      m.leido = true;
    }
  });
  const conv = getConversacionById(conversacionId);
  if (conv) {
    conv.noLeidos = 0;
  }
}
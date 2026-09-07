/**
 * `src/data`: datos mock/estáticos consumidos por páginas y componentes,
 * hasta que existan APIs o una base de datos real.
 */
export type Anuncio = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string; // ISO 8601
};

export const anuncios: Anuncio[] = [
  {
    id: "1",
    titulo: "Bienvenida al proyecto",
    descripcion: "Arranca el desarrollo colaborativo con el Liceo 1° de Salto.",
    fecha: "2026-03-02",
  },
  {
    id: "2",
    titulo: "Estructura de carpetas definida",
    descripcion: "El equipo ya cuenta con una convención clara para ubicar cada archivo.",
    fecha: "2026-03-03",
  },
];

export type Usuario = {
  id: string;
  nombre: string;
  avatar?: string;
  rol: "estudiante" | "docente" | "administracion";
};

export type Mensaje = {
  id: string;
  conversacionId: string;
  remitenteId: string;
  contenido: string;
  fecha: string; // ISO 8601
  leido: boolean;
};

export type Conversacion = {
  id: string;
  tipo: "uno_a_uno" | "grupal" | "aviso_curso";
  nombre?: string; // para grupos y avisos
  participantes: Usuario[]; // incluye al usuario actual
  ultimoMensaje: Mensaje;
  noLeidos: number;
};

export const usuarios: Usuario[] = [
  { id: "u1", nombre: "Ana García", rol: "docente" },
  { id: "u2", nombre: "Carlos López", rol: "estudiante" },
  { id: "u3", nombre: "María Fernández", rol: "estudiante" },
  { id: "u4", nombre: "Prof. Rodríguez", rol: "docente" },
  { id: "u5", nombre: "Administración", rol: "administracion" },
];

export const mensajes: Mensaje[] = [
  {
    id: "m1",
    conversacionId: "c1",
    remitenteId: "u1",
    contenido: "Hola, ¿tienes dudas sobre la tarea?",
    fecha: "2026-09-07T10:30:00Z",
    leido: false,
  },
  {
    id: "m2",
    conversacionId: "c2",
    remitenteId: "u2",
    contenido: "Nos vemos en la biblioteca a las 14:00",
    fecha: "2026-09-07T09:15:00Z",
    leido: true,
  },
  {
    id: "m3",
    conversacionId: "c3",
    remitenteId: "u4",
    contenido: "Recordatorio: examen el viernes próximo",
    fecha: "2026-09-06T16:45:00Z",
    leido: false,
  },
  {
    id: "m4",
    conversacionId: "c4",
    remitenteId: "u5",
    contenido: "Nueva circular disponible en el portal",
    fecha: "2026-09-05T11:00:00Z",
    leido: true,
  },
  {
    id: "m5",
    conversacionId: "c1",
    remitenteId: "u2",
    contenido: "Sí, no entendí el ejercicio 3",
    fecha: "2026-09-07T10:32:00Z",
    leido: true,
  },
];

export const conversaciones: Conversacion[] = [
  {
    id: "c1",
    tipo: "uno_a_uno",
    participantes: [
      { id: "u1", nombre: "Ana García", rol: "docente" },
      { id: "current", nombre: "Tú", rol: "estudiante" },
    ],
    ultimoMensaje: mensajes[4],
    noLeidos: 1,
  },
  {
    id: "c2",
    tipo: "grupal",
    nombre: "Grupo de Estudio - Matemáticas",
    participantes: [
      { id: "u2", nombre: "Carlos López", rol: "estudiante" },
      { id: "u3", nombre: "María Fernández", rol: "estudiante" },
      { id: "current", nombre: "Tú", rol: "estudiante" },
    ],
    ultimoMensaje: mensajes[1],
    noLeidos: 0,
  },
  {
    id: "c3",
    tipo: "uno_a_uno",
    participantes: [
      { id: "u4", nombre: "Prof. Rodríguez", rol: "docente" },
      { id: "current", nombre: "Tú", rol: "estudiante" },
    ],
    ultimoMensaje: mensajes[2],
    noLeidos: 2,
  },
  {
    id: "c4",
    tipo: "aviso_curso",
    nombre: "Avisos - 5to Año A",
    participantes: [
      { id: "u5", nombre: "Administración", rol: "administracion" },
      { id: "current", nombre: "Tú", rol: "estudiante" },
    ],
    ultimoMensaje: mensajes[3],
    noLeidos: 0,
  },
];

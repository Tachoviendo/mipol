/**
 * `src/data/transporte.ts`: datos mock de transporte urbano
 * para pantallas de visualización de líneas, paradas y horarios.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type Parada = {
  id: string;
  nombre: string;
  direccion: string;
  latitud: number;
  longitud: number;
  orden: number;
};

export type Horario = {
  id: string;
  horaSalida: string; // HH:mm
  horaLlegada: string; // HH:mm
  activo: boolean;
};

export type DiaCirculacion = {
  id: string;
  nombre: string;
  activo: boolean;
};

export type Linea = {
  id: string;
  nombre: string;
  descripcion: string;
  color: string;
  paradas: Parada[];
  horarios: Horario[];
  diasCirculacion: DiaCirculacion[];
};

// ─── Datos mock ──────────────────────────────────────────────────────────────

export const paradas: Parada[] = [
  {
    id: "p1",
    nombre: "Terminal Salto",
    direccion: "Av. 19 de Abril esq. Gral. Artigas",
    latitud: -31.3833,
    longitud: -57.9667,
    orden: 1,
  },
  {
    id: "p2",
    nombre: "Plaza Libertad",
    direccion: "Plaza Libertad, centro",
    latitud: -31.385,
    longitud: -57.965,
    orden: 2,
  },
  {
    id: "p3",
    nombre: "Hospital Departamental",
    direccion: "Av. Varela esq.engel",
    latitud: -31.387,
    longitud: -57.962,
    orden: 3,
  },
  {
    id: "p4",
    nombre: "Liceo 1° de Salto",
    direccion: "Cno. Miguelete s/n",
    latitud: -31.389,
    longitud: -57.958,
    orden: 4,
  },
  {
    id: "p5",
    nombre: "Barrio Obrero",
    direccion: "Cno. Barrio Obrero",
    latitud: -31.392,
    longitud: -57.955,
    orden: 5,
  },
  {
    id: "p6",
    nombre: "Estadio Atilio Paiva Olivera",
    direccion: "Parque Harriague",
    latitud: -31.395,
    longitud: -57.952,
    orden: 6,
  },
  {
    id: "p7",
    nombre: "Parada Av. España",
    direccion: "Av. de España esq. 18 de Julio",
    latitud: -31.388,
    longitud: -57.963,
    orden: 7,
  },
  {
    id: "p8",
    nombre: "Complejo Juvenil",
    direccion: "Cno. Complejo Juvenil",
    latitud: -31.391,
    longitud: -57.96,
    orden: 8,
  },
];

export const horarios: Horario[] = [
  { id: "h1", horaSalida: "06:00", horaLlegada: "06:30", activo: true },
  { id: "h2", horaSalida: "06:30", horaLlegada: "07:00", activo: true },
  { id: "h3", horaSalida: "07:00", horaLlegada: "07:30", activo: true },
  { id: "h4", horaSalida: "07:30", horaLlegada: "08:00", activo: true },
  { id: "h5", horaSalida: "08:00", horaLlegada: "08:30", activo: true },
  { id: "h6", horaSalida: "08:30", horaLlegada: "09:00", activo: true },
  { id: "h7", horaSalida: "12:00", horaLlegada: "12:30", activo: true },
  { id: "h8", horaSalida: "12:30", horaLlegada: "13:00", activo: true },
  { id: "h9", horaSalida: "17:00", horaLlegada: "17:30", activo: true },
  { id: "h10", horaSalida: "17:30", horaLlegada: "18:00", activo: true },
  { id: "h11", horaSalida: "18:00", horaLlegada: "18:30", activo: true },
  { id: "h12", horaSalida: "22:00", horaLlegada: "22:30", activo: true },
];

export const diasCirculacion: DiaCirculacion[] = [
  { id: "d1", nombre: "Lunes", activo: true },
  { id: "d2", nombre: "Martes", activo: true },
  { id: "d3", nombre: "Miércoles", activo: true },
  { id: "d4", nombre: "Jueves", activo: true },
  { id: "d5", nombre: "Viernes", activo: true },
  { id: "d6", nombre: "Sábado", activo: true },
  { id: "d7", nombre: "Domingo", activo: false },
];

export const lineas: Linea[] = [
  {
    id: "l1",
    nombre: "Línea 1 - Centro",
    descripcion: "Recorre el centro de la ciudad conectando la Terminal con el Barrio Obrero.",
    color: "#3B82F6",
    paradas: [
      { ...paradas[0], orden: 1 },
      { ...paradas[1], orden: 2 },
      { ...paradas[2], orden: 3 },
      { ...paradas[4], orden: 4 },
    ],
    horarios: [
      horarios[0],
      horarios[2],
      horarios[4],
      horarios[6],
      horarios[8],
      horarios[10],
    ],
    diasCirculacion: [
      diasCirculacion[0],
      diasCirculacion[1],
      diasCirculacion[2],
      diasCirculacion[3],
      diasCirculacion[4],
      diasCirculacion[5],
    ],
  },
  {
    id: "l2",
    nombre: "Línea 2 - Liceo",
    descripcion: "Conecta la Terminal con el Liceo 1° de Salto pasando por el Hospital.",
    color: "#10B981",
    paradas: [
      { ...paradas[0], orden: 1 },
      { ...paradas[2], orden: 2 },
      { ...paradas[3], orden: 3 },
      { ...paradas[7], orden: 4 },
    ],
    horarios: [
      horarios[1],
      horarios[3],
      horarios[5],
      horarios[7],
      horarios[9],
      horarios[11],
    ],
    diasCirculacion: [
      diasCirculacion[0],
      diasCirculacion[1],
      diasCirculacion[2],
      diasCirculacion[3],
      diasCirculacion[4],
      diasCirculacion[5],
    ],
  },
  {
    id: "l3",
    nombre: "Línea 3 - Estadio",
    descripcion: "Servicio especial los días de evento en el Estadio Atilio Paiva Olivera.",
    color: "#F59E0B",
    paradas: [
      { ...paradas[0], orden: 1 },
      { ...paradas[6], orden: 2 },
      { ...paradas[1], orden: 3 },
      { ...paradas[5], orden: 4 },
    ],
    horarios: [
      horarios[8],
      horarios[9],
      horarios[10],
    ],
    diasCirculacion: [
      diasCirculacion[5],
      diasCirculacion[6],
    ],
  },
  {
    id: "l4",
    nombre: "Línea 4 - Circuito Completo",
    descripcion: "Recorrido completo por todos los puntos principales de la ciudad.",
    color: "#8B5CF6",
    paradas: paradas.map((p, i) => ({ ...p, orden: i + 1 })),
    horarios: [
      horarios[0],
      horarios[1],
      horarios[2],
      horarios[3],
      horarios[4],
      horarios[5],
      horarios[6],
      horarios[7],
      horarios[8],
      horarios[9],
      horarios[10],
      horarios[11],
    ],
    diasCirculacion: [
      diasCirculacion[0],
      diasCirculacion[1],
      diasCirculacion[2],
      diasCirculacion[3],
      diasCirculacion[4],
      diasCirculacion[5],
      diasCirculacion[6],
    ],
  },
];

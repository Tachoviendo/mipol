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

export type HorarioParada = {
  paradaId: string;
  hora: string; // HH:mm - momento en que pasa por esa parada
};

export type Horario = {
  id: string;
  horaSalida: string; // HH:mm
  horaLlegada: string; // HH:mm
  activo: boolean;
  paradas: HorarioParada[];
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
  // ── Línea 1 - Centro: Terminal → Plaza → Hospital → Barrio Obrero ──
  {
    id: "h1",
    horaSalida: "06:00",
    horaLlegada: "06:30",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "06:00" },
      { paradaId: "p2", hora: "06:08" },
      { paradaId: "p3", hora: "06:16" },
      { paradaId: "p5", hora: "06:30" },
    ],
  },
  {
    id: "h2",
    horaSalida: "07:00",
    horaLlegada: "07:30",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "07:00" },
      { paradaId: "p2", hora: "07:08" },
      { paradaId: "p3", hora: "07:16" },
      { paradaId: "p5", hora: "07:30" },
    ],
  },
  {
    id: "h3",
    horaSalida: "08:00",
    horaLlegada: "08:30",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "08:00" },
      { paradaId: "p2", hora: "08:08" },
      { paradaId: "p3", hora: "08:16" },
      { paradaId: "p5", hora: "08:30" },
    ],
  },
  {
    id: "h4",
    horaSalida: "12:00",
    horaLlegada: "12:30",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "12:00" },
      { paradaId: "p2", hora: "12:08" },
      { paradaId: "p3", hora: "12:16" },
      { paradaId: "p5", hora: "12:30" },
    ],
  },
  {
    id: "h5",
    horaSalida: "17:00",
    horaLlegada: "17:30",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "17:00" },
      { paradaId: "p2", hora: "17:08" },
      { paradaId: "p3", hora: "17:16" },
      { paradaId: "p5", hora: "17:30" },
    ],
  },
  {
    id: "h6",
    horaSalida: "22:00",
    horaLlegada: "22:30",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "22:00" },
      { paradaId: "p2", hora: "22:08" },
      { paradaId: "p3", hora: "22:16" },
      { paradaId: "p5", hora: "22:30" },
    ],
  },

  // ── Línea 2 - Liceo: Terminal → Hospital → Liceo → Complejo Juvenil ──
  {
    id: "h7",
    horaSalida: "06:30",
    horaLlegada: "07:00",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "06:30" },
      { paradaId: "p3", hora: "06:40" },
      { paradaId: "p4", hora: "06:50" },
      { paradaId: "p8", hora: "07:00" },
    ],
  },
  {
    id: "h8",
    horaSalida: "07:30",
    horaLlegada: "08:00",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "07:30" },
      { paradaId: "p3", hora: "07:40" },
      { paradaId: "p4", hora: "07:50" },
      { paradaId: "p8", hora: "08:00" },
    ],
  },
  {
    id: "h9",
    horaSalida: "08:30",
    horaLlegada: "09:00",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "08:30" },
      { paradaId: "p3", hora: "08:40" },
      { paradaId: "p4", hora: "08:50" },
      { paradaId: "p8", hora: "09:00" },
    ],
  },
  {
    id: "h10",
    horaSalida: "12:30",
    horaLlegada: "13:00",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "12:30" },
      { paradaId: "p3", hora: "12:40" },
      { paradaId: "p4", hora: "12:50" },
      { paradaId: "p8", hora: "13:00" },
    ],
  },
  {
    id: "h11",
    horaSalida: "17:30",
    horaLlegada: "18:00",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "17:30" },
      { paradaId: "p3", hora: "17:40" },
      { paradaId: "p4", hora: "17:50" },
      { paradaId: "p8", hora: "18:00" },
    ],
  },
  {
    id: "h12",
    horaSalida: "22:30",
    horaLlegada: "23:00",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "22:30" },
      { paradaId: "p3", hora: "22:40" },
      { paradaId: "p4", hora: "22:50" },
      { paradaId: "p8", hora: "23:00" },
    ],
  },

  // ── Línea 3 - Estadio: Terminal → Av. España → Plaza → Estadio ──
  {
    id: "h13",
    horaSalida: "17:00",
    horaLlegada: "17:30",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "17:00" },
      { paradaId: "p7", hora: "17:10" },
      { paradaId: "p2", hora: "17:20" },
      { paradaId: "p6", hora: "17:30" },
    ],
  },
  {
    id: "h14",
    horaSalida: "18:00",
    horaLlegada: "18:30",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "18:00" },
      { paradaId: "p7", hora: "18:10" },
      { paradaId: "p2", hora: "18:20" },
      { paradaId: "p6", hora: "18:30" },
    ],
  },
  {
    id: "h15",
    horaSalida: "21:00",
    horaLlegada: "21:30",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "21:00" },
      { paradaId: "p7", hora: "21:10" },
      { paradaId: "p2", hora: "21:20" },
      { paradaId: "p6", hora: "21:30" },
    ],
  },

  // ── Línea 4 - Circuito Completo: todas las paradas ──
  {
    id: "h16",
    horaSalida: "06:00",
    horaLlegada: "06:50",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "06:00" },
      { paradaId: "p2", hora: "06:07" },
      { paradaId: "p3", hora: "06:13" },
      { paradaId: "p4", hora: "06:20" },
      { paradaId: "p5", hora: "06:27" },
      { paradaId: "p6", hora: "06:34" },
      { paradaId: "p7", hora: "06:42" },
      { paradaId: "p8", hora: "06:50" },
    ],
  },
  {
    id: "h17",
    horaSalida: "08:00",
    horaLlegada: "08:50",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "08:00" },
      { paradaId: "p2", hora: "08:07" },
      { paradaId: "p3", hora: "08:13" },
      { paradaId: "p4", hora: "08:20" },
      { paradaId: "p5", hora: "08:27" },
      { paradaId: "p6", hora: "08:34" },
      { paradaId: "p7", hora: "08:42" },
      { paradaId: "p8", hora: "08:50" },
    ],
  },
  {
    id: "h18",
    horaSalida: "12:00",
    horaLlegada: "12:50",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "12:00" },
      { paradaId: "p2", hora: "12:07" },
      { paradaId: "p3", hora: "12:13" },
      { paradaId: "p4", hora: "12:20" },
      { paradaId: "p5", hora: "12:27" },
      { paradaId: "p6", hora: "12:34" },
      { paradaId: "p7", hora: "12:42" },
      { paradaId: "p8", hora: "12:50" },
    ],
  },
  {
    id: "h19",
    horaSalida: "17:00",
    horaLlegada: "17:50",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "17:00" },
      { paradaId: "p2", hora: "17:07" },
      { paradaId: "p3", hora: "17:13" },
      { paradaId: "p4", hora: "17:20" },
      { paradaId: "p5", hora: "17:27" },
      { paradaId: "p6", hora: "17:34" },
      { paradaId: "p7", hora: "17:42" },
      { paradaId: "p8", hora: "17:50" },
    ],
  },
  {
    id: "h20",
    horaSalida: "22:00",
    horaLlegada: "22:50",
    activo: true,
    paradas: [
      { paradaId: "p1", hora: "22:00" },
      { paradaId: "p2", hora: "22:07" },
      { paradaId: "p3", hora: "22:13" },
      { paradaId: "p4", hora: "22:20" },
      { paradaId: "p5", hora: "22:27" },
      { paradaId: "p6", hora: "22:34" },
      { paradaId: "p7", hora: "22:42" },
      { paradaId: "p8", hora: "22:50" },
    ],
  },
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
      horarios[1],
      horarios[2],
      horarios[3],
      horarios[4],
      horarios[5],
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
      horarios[12],
      horarios[13],
      horarios[14],
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
      horarios[15],
      horarios[16],
      horarios[17],
      horarios[18],
      horarios[19],
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

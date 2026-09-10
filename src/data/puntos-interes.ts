/**
 * `src/data/puntos-interes.ts`: modelo de datos de los puntos de interés (POI)
 * del mapa interactivo del liceo.
 *
 * Cada POI se ubica en un piso con coordenadas en el espacio del plano SVG
 * (viewBox, 1px ≈ 0,4 m). El campo `tipo` permite filtrar y darle estilos
 * consistentes a cada categoría en el mapa.
 */

export const TIPOS_PUNTO_INTERES = [
  "aula",
  "biblioteca",
  "laboratorio",
  "direccion",
  "banos",
  "entrada",
  "escalera",
  "comedor",
  "patio",
] as const;

export type TipoPuntoInteres = (typeof TIPOS_PUNTO_INTERES)[number];

export const PISOS = ["planta-baja", "primer-piso", "segundo-piso"] as const;

export type Piso = (typeof PISOS)[number];

export type PuntoInteres = {
  id: string;
  nombre: string;
  tipo: TipoPuntoInteres;
  /** Coordenadas en px dentro del viewBox del plano del piso. */
  coordenadas: { x: number; y: number };
  piso: Piso;
  descripcion: string;
};

const punto = (
  id: string,
  nombre: string,
  tipo: TipoPuntoInteres,
  coordenadas: { x: number; y: number },
  piso: Piso,
  descripcion: string,
): PuntoInteres => ({ id, nombre, tipo, coordenadas, piso, descripcion });

/** Un punto de interés por cada tipo, como tablero de referencia del formato. */
export const puntosDeInteresMock: PuntoInteres[] = [
  punto(
    "poi-aula-1",
    "Aula 1",
    "aula",
    { x: 192, y: 180 },
    "planta-baja",
    "Aula de primero de ciclo básico.",
  ),
  punto(
    "poi-biblioteca",
    "Biblioteca",
    "biblioteca",
    { x: 628, y: 452 },
    "planta-baja",
    "Préstamo de libros y sala de lectura silenciosa.",
  ),
  punto(
    "poi-laboratorio",
    "Laboratorio de Física",
    "laboratorio",
    { x: 628, y: 316 },
    "planta-baja",
    "Laboratorio equipado para prácticas de Física y Química.",
  ),
  punto(
    "poi-direccion",
    "Dirección",
    "direccion",
    { x: 628, y: 570 },
    "planta-baja",
    "Oficina de dirección, secretaría y adscripción.",
  ),
  punto(
    "poi-banos",
    "Baños",
    "banos",
    { x: 192, y: 570 },
    "planta-baja",
    "Baños de estudiantes y docentes.",
  ),
  punto(
    "poi-entrada",
    "Entrada principal",
    "entrada",
    { x: 410, y: 608 },
    "planta-baja",
    "Acceso principal al liceo desde la calle.",
  ),
  punto(
    "poi-escalera",
    "Escaleras",
    "escalera",
    { x: 410, y: 164 },
    "planta-baja",
    "Acceso a primer y segundo piso.",
  ),
  punto(
    "poi-comedor",
    "Comedor escolar",
    "comedor",
    { x: 192, y: 452 },
    "planta-baja",
    "Servicio de comedor en horario de almuerzo.",
  ),
  punto(
    "poi-patio",
    "Patio central",
    "patio",
    { x: 410, y: 300 },
    "primer-piso",
    "Patio de recreo y encuentro entre turnos.",
  ),
];

/** Devuelve un punto de interés por id, o undefined si no existe. */
export function puntoPorId(id: string): PuntoInteres | undefined {
  return puntosDeInteresMock.find((p) => p.id === id);
}

/** Filtra los puntos de interés por tipo. */
export function puntosPorTipo(tipo: TipoPuntoInteres): PuntoInteres[] {
  return puntosDeInteresMock.filter((p) => p.tipo === tipo);
}

/** Filtra los puntos de interés por piso. */
export function puntosPorPiso(piso: Piso): PuntoInteres[] {
  return puntosDeInteresMock.filter((p) => p.piso === piso);
}
/**
 * `src/data/planos.ts`: metadatos del plano base del liceo.
 *
 * El asset visual vive en `public/planos/planta-baja.svg` (SVG vectorial,
 * editable y escalable). Este módulo describe cada zona con sus coordenadas
 * en el espacio del SVG (viewBox 820 x 688) para que el mapa interactivo
 * pueda superponer hotspots, rótulos o estados por encima del plano.
 *
 * Escala aproximada: 1px ≈ 0,4 m.
 */

export type CategoriaZona =
  | "aula"
  | "biblioteca"
  | "laboratorio"
  | "direccion"
  | "banos"
  | "servicios"
  | "entrada";

export type ZonaPlano = {
  id: string; // Coincide con el atributo `id` en el SVG
  nombre: string;
  categoria: CategoriaZona;
  /** Rectángulo de la zona en coordenadas del viewBox del SVG. */
  x: number;
  y: number;
  anchoPx: number;
  altoPx: number;
};

export type Planta = {
  id: string;
  nombre: string;
  /** Ruta pública del asset SVG. */
  assetPath: string;
  /** Dimensiones del viewBox del SVG. */
  viewBox: { anchoPx: number; altoPx: number };
  /** Escala aproximada (metros por píxel). */
  metrosPorPx: number;
  zonas: ZonaPlano[];
};

const viewBox = { anchoPx: 820, altoPx: 688 };

export const plantaBaja: Planta = {
  id: "planta-baja",
  nombre: "Planta Baja",
  assetPath: "/planos/planta-baja.svg",
  viewBox,
  metrosPorPx: 0.4,
  zonas: [
    {
      id: "pb-aula-1",
      nombre: "Aula 1",
      categoria: "aula",
      x: 28,
      y: 116,
      anchoPx: 328,
      altoPx: 128,
    },
    {
      id: "pb-aula-2",
      nombre: "Aula 2",
      categoria: "aula",
      x: 28,
      y: 252,
      anchoPx: 328,
      altoPx: 128,
    },
    {
      id: "pb-aula-3",
      nombre: "Aula 3",
      categoria: "aula",
      x: 28,
      y: 388,
      anchoPx: 328,
      altoPx: 128,
    },
    {
      id: "pb-banos",
      nombre: "Baños",
      categoria: "banos",
      x: 28,
      y: 524,
      anchoPx: 328,
      altoPx: 92,
    },
    {
      id: "pb-aula-4",
      nombre: "Aula 4",
      categoria: "aula",
      x: 464,
      y: 116,
      anchoPx: 328,
      altoPx: 128,
    },
    {
      id: "pb-laboratorio",
      nombre: "Laboratorio",
      categoria: "laboratorio",
      x: 464,
      y: 252,
      anchoPx: 328,
      altoPx: 128,
    },
    {
      id: "pb-biblioteca",
      nombre: "Biblioteca",
      categoria: "biblioteca",
      x: 464,
      y: 388,
      anchoPx: 328,
      altoPx: 128,
    },
    {
      id: "pb-direccion",
      nombre: "Dirección",
      categoria: "direccion",
      x: 464,
      y: 524,
      anchoPx: 328,
      altoPx: 92,
    },
    {
      id: "pb-escalera",
      nombre: "Escaleras",
      categoria: "servicios",
      x: 360,
      y: 100,
      anchoPx: 100,
      altoPx: 128,
    },
    {
      id: "pb-pasillo",
      nombre: "Pasillo central",
      categoria: "servicios",
      x: 360,
      y: 240,
      anchoPx: 100,
      altoPx: 352,
    },
    {
      id: "pb-entrada",
      nombre: "Entrada principal",
      categoria: "entrada",
      x: 360,
      y: 592,
      anchoPx: 100,
      altoPx: 32,
    },
  ],
};

/** Todas las plantas disponibles. Por ahora solo la planta baja. */
export const plantas: Planta[] = [plantaBaja];

/** Devuelve una planta por id, o la planta baja por defecto. */
export function obtenerPlanta(id?: string): Planta {
  return plantas.find((p) => p.id === id) ?? plantaBaja;
}

/** Devuelve una zona de una planta por su id. */
export function zonaPorId(planta: Planta, zonaId: string): ZonaPlano | undefined {
  return planta.zonas.find((z) => z.id === zonaId);
}
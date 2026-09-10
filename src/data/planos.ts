/**
 * `src/data/planos.ts`: metadatos del plano base del liceo.
 *
 * El asset visual vive en `public/planos/planta-baja.svg` (SVG vectorial).
 * Este módulo describe cada zona con sus coordenadas en el viewBox del SVG
 * (820 x 688) para que el mapa interactivo superponga los puntos de interés.
 *
 * Escala aproximada: 1px ≈ 0,4 m.
 */

export type CategoriaZona =
  | "aula"
  | "biblioteca"
  | "laboratorio"
  | "direccion"
  | "comedor"
  | "banos"
  | "servicios"
  | "entrada"
  | "patio";

export type ZonaPlano = {
  id: string; // Coincide con el atributo `id` en el SVG
  nombre: string;
  categoria: CategoriaZona;
  x: number;
  y: number;
  anchoPx: number;
  altoPx: number;
};

export type Planta = {
  id: string;
  nombre: string;
  assetPath: string;
  viewBox: { anchoPx: number; altoPx: number };
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
    { id: "pb-aula-1", nombre: "Aula 1", categoria: "aula", x: 28, y: 116, anchoPx: 328, altoPx: 100 },
    { id: "pb-aula-2", nombre: "Aula 2", categoria: "aula", x: 28, y: 216, anchoPx: 328, altoPx: 100 },
    { id: "pb-aula-3", nombre: "Aula 3", categoria: "aula", x: 28, y: 316, anchoPx: 328, altoPx: 100 },
    { id: "pb-comedor", nombre: "Comedor escolar", categoria: "comedor", x: 28, y: 416, anchoPx: 328, altoPx: 100 },
    { id: "pb-banos", nombre: "Baños", categoria: "banos", x: 28, y: 516, anchoPx: 328, altoPx: 100 },
    { id: "pb-aula-4", nombre: "Aula 4", categoria: "aula", x: 464, y: 116, anchoPx: 328, altoPx: 125 },
    { id: "pb-laboratorio", nombre: "Laboratorio", categoria: "laboratorio", x: 464, y: 241, anchoPx: 328, altoPx: 125 },
    { id: "pb-biblioteca", nombre: "Biblioteca", categoria: "biblioteca", x: 464, y: 366, anchoPx: 328, altoPx: 125 },
    { id: "pb-direccion", nombre: "Dirección", categoria: "direccion", x: 464, y: 491, anchoPx: 328, altoPx: 125 },
    { id: "pb-escalera", nombre: "Escaleras", categoria: "servicios", x: 360, y: 100, anchoPx: 100, altoPx: 128 },
    { id: "pb-pasillo", nombre: "Pasillo central", categoria: "servicios", x: 360, y: 228, anchoPx: 100, altoPx: 364 },
    { id: "pb-entrada", nombre: "Entrada principal", categoria: "entrada", x: 360, y: 592, anchoPx: 100, altoPx: 32 },
    { id: "pb-patio", nombre: "Patio central", categoria: "patio", x: 24, y: 632, anchoPx: 772, altoPx: 42 },
  ],
};

export const plantas: Planta[] = [plantaBaja];

export function obtenerPlanta(id?: string): Planta {
  return plantas.find((p) => p.id === id) ?? plantaBaja;
}

export function zonaPorId(planta: Planta, zonaId: string): ZonaPlano | undefined {
  return planta.zonas.find((z) => z.id === zonaId);
}
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

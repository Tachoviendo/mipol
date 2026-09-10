/**
 * `src/data`: datos mock/estáticos consumidos por páginas y componentes,
 * hasta que existan APIs o una base de datos real.
 */
export type Mensaje = {
  id: string;
  contenido: string;
  autorId: string;
  autorNombre: string;
  fecha: string; // ISO 8601
};

export const mensajesMock: Mensaje[] = [
  {
    id: "1",
    contenido: "Hola, ¿cómo va el proyecto?",
    autorId: "2",
    autorNombre: "María García",
    fecha: "2026-03-05T10:30:00Z",
  },
  {
    id: "2",
    contenido: "Todo bien, estamos avanzando con la estructura.",
    autorId: "1",
    autorNombre: "Juan Pérez",
    fecha: "2026-03-05T10:32:00Z",
  },
  {
    id: "3",
    contenido: "Perfecto, avísenme si necesitan ayuda.",
    autorId: "2",
    autorNombre: "María García",
    fecha: "2026-03-05T10:35:00Z",
  },
];
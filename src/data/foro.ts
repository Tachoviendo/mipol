/**
 * `src/data`: datos mock/estáticos del foro,
 * hasta que existan APIs o una base de datos real.
 */

// ── Tipos ──────────────────────────────────────────────

export type Categoria = {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  color: string; // hex
};

export type Hilo = {
  id: string;
  titulo: string;
  categoriaId: string;
  autorId: string;
  fechaCreacion: string; // ISO 8601
  vistas: number;
  cantidadRespuestas: number;
  cerrado: boolean;
};

export type Post = {
  id: string;
  hiloId: string;
  autorId: string;
  contenido: string;
  fecha: string; // ISO 8601
  editado: boolean;
  esRespuesta: boolean;
  postPadreId?: string;
};

// ── Categorías ─────────────────────────────────────────

export const categorias: Categoria[] = [
  {
    id: "cat-1",
    nombre: "General",
    descripcion: "Charla libre sobre cualquier tema",
    icono: "💬",
    color: "#3b82f6",
  },
  {
    id: "cat-2",
    nombre: "Ayuda y Soporte",
    descripcion: "Resolvé tus dudas sobre el proyecto",
    icono: "🛠️",
    color: "#f59e0b",
  },
  {
    id: "cat-3",
    nombre: "Ideas y Sugerencias",
    descripcion: "Proponé mejoras para la plataforma",
    icono: "💡",
    color: "#10b981",
  },
  {
    id: "cat-4",
    nombre: "Off-Topic",
    descripcion: "Hablá de lo que quieras fuera del tema del proyecto",
    icono: "🎮",
    color: "#8b5cf6",
  },
];

// ── Hilos ──────────────────────────────────────────────

export const hilos: Hilo[] = [
  {
    id: "hilo-1",
    titulo: "Bienvenidos al foro del Liceo 1° de Salto",
    categoriaId: "cat-1",
    autorId: "user-1",
    fechaCreacion: "2026-03-02T10:00:00Z",
    vistas: 342,
    cantidadRespuestas: 12,
    cerrado: false,
  },
  {
    id: "hilo-2",
    titulo: "¿Cómo instalar el entorno de desarrollo?",
    categoriaId: "cat-2",
    autorId: "user-3",
    fechaCreacion: "2026-03-05T14:30:00Z",
    vistas: 189,
    cantidadRespuestas: 8,
    cerrado: false,
  },
  {
    id: "hilo-3",
    titulo: "Propuesta: modo oscuro para la plataforma",
    categoriaId: "cat-3",
    autorId: "user-2",
    fechaCreacion: "2026-03-07T09:15:00Z",
    vistas: 256,
    cantidadRespuestas: 15,
    cerrado: false,
  },
  {
    id: "hilo-4",
    titulo: "¿Cuál es tu juego favorito?",
    categoriaId: "cat-4",
    autorId: "user-4",
    fechaCreacion: "2026-03-08T18:45:00Z",
    vistas: 97,
    cantidadRespuestas: 23,
    cerrado: false,
  },
  {
    id: "hilo-5",
    titulo: "Problema con Node.js v22 en Windows",
    categoriaId: "cat-2",
    autorId: "user-5",
    fechaCreacion: "2026-03-09T11:20:00Z",
    vistas: 64,
    cantidadRespuestas: 4,
    cerrado: false,
  },
  {
    id: "hilo-6",
    titulo: "Integrantes del equipo: presentación",
    categoriaId: "cat-1",
    autorId: "user-1",
    fechaCreacion: "2026-03-03T08:00:00Z",
    vistas: 410,
    cantidadRespuestas: 31,
    cerrado: true,
  },
];

// ── Posts / Respuestas ─────────────────────────────────

export const posts: Post[] = [
  // ── Hilo 1: Bienvenidos ──
  {
    id: "post-1",
    hiloId: "hilo-1",
    autorId: "user-1",
    contenido:
      "¡Hola a todos! Bienvenidos al foro oficial del Liceo 1° de Salto. Acá podemos charlar, compartir ideas y ayudarnos mutuamente.",
    fecha: "2026-03-02T10:00:00Z",
    editado: false,
    esRespuesta: false,
  },
  {
    id: "post-2",
    hiloId: "hilo-1",
    autorId: "user-2",
    contenido: "¡Genial! ¡Qué bueno que arrancamos con esto! 🎉",
    fecha: "2026-03-02T10:25:00Z",
    editado: false,
    esRespuesta: true,
    postPadreId: "post-1",
  },
  {
    id: "post-3",
    hiloId: "hilo-1",
    autorId: "user-3",
    contenido: "Gracias por abrir el espacio. Ya estoy con ganas de aportar.",
    fecha: "2026-03-02T11:10:00Z",
    editado: true,
    esRespuesta: true,
    postPadreId: "post-1",
  },

  // ── Hilo 2: Instalar entorno ──
  {
    id: "post-4",
    hiloId: "hilo-2",
    autorId: "user-3",
    contenido:
      "Estoy tratando de configurar el entorno en mi PC con Windows pero me tira errores con npm. ¿Alguien puede guíarme?",
    fecha: "2026-03-05T14:30:00Z",
    editado: false,
    esRespuesta: false,
  },
  {
    id: "post-5",
    hiloId: "hilo-2",
    autorId: "user-1",
    contenido:
      "Primero verificá que tengas Node.js instalado. Abrí una terminal y escribí `node -v`. ¿Qué versión te muestra?",
    fecha: "2026-03-05T14:45:00Z",
    editado: false,
    esRespuesta: true,
    postPadreId: "post-4",
  },
  {
    id: "post-6",
    hiloId: "hilo-2",
    autorId: "user-3",
    contenido: "Me muestra `v22.12.0`. ¿Eso está bien?",
    fecha: "2026-03-05T15:02:00Z",
    editado: false,
    esRespuesta: true,
    postPadreId: "post-5",
  },

  // ── Hilo 3: Modo oscuro ──
  {
    id: "post-7",
    hiloId: "hilo-3",
    autorId: "user-2",
    contenido:
      "Propongo agregar un modo oscuro a la plataforma. Ya tenemos soporte en Tailwind con `prefers-color-scheme`, solo falta la lógica.",
    fecha: "2026-03-07T09:15:00Z",
    editado: false,
    esRespuesta: false,
  },
  {
    id: "post-8",
    hiloId: "hilo-3",
    autorId: "user-4",
    contenido: "¡Buena idea! Yo siempre uso modo oscuro en todo. ¿Alguien ya trabajó con eso en Next.js?",
    fecha: "2026-03-07T09:40:00Z",
    editado: false,
    esRespuesta: true,
    postPadreId: "post-7",
  },
  {
    id: "post-9",
    hiloId: "hilo-3",
    autorId: "user-1",
    contenido:
      "Sí, se puede hacer con una cookie o localStorage para persistir la preferencia. Yo lo implementé en otro proyecto.",
    fecha: "2026-03-07T10:05:00Z",
    editado: true,
    esRespuesta: true,
    postPadreId: "post-8",
  },

  // ── Hilo 4: Juegos favoritos ──
  {
    id: "post-10",
    hiloId: "hilo-4",
    autorId: "user-4",
    contenido: "¿Cuál es su juego favorito? El mío es Hollow Knight. 🎮",
    fecha: "2026-03-08T18:45:00Z",
    editado: false,
    esRespuesta: false,
  },
  {
    id: "post-11",
    hiloId: "hilo-4",
    autorId: "user-5",
    contenido: "Minecraft, sin dudas. Lo juego desde que era chico.",
    fecha: "2026-03-08T19:00:00Z",
    editado: false,
    esRespuesta: true,
    postPadreId: "post-10",
  },
  {
    id: "post-12",
    hiloId: "hilo-4",
    autorId: "user-2",
    contenido: "The Legend of Zelda: Tears of the Kingdom. Una obra maestra.",
    fecha: "2026-03-08T19:15:00Z",
    editado: false,
    esRespuesta: true,
    postPadreId: "post-10",
  },

  // ── Hilo 5: Problema Node.js ──
  {
    id: "post-13",
    hiloId: "hilo-5",
    autorId: "user-5",
    contenido:
      "Cuando intento correr `pnpm dev` me sale un error de permisos en Windows. ¿Alguien le pasó?",
    fecha: "2026-03-09T11:20:00Z",
    editado: false,
    esRespuesta: false,
  },
  {
    id: "post-14",
    hiloId: "hilo-5",
    autorId: "user-1",
    contenido:
      "Probá ejecutar la terminal como administrador, o mejor aún, desactivá la política de ejecución: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.",
    fecha: "2026-03-09T11:35:00Z",
    editado: false,
    esRespuesta: true,
    postPadreId: "post-13",
  },

  // ── Hilo 6: Presentaciones ──
  {
    id: "post-15",
    hiloId: "hilo-6",
    autorId: "user-1",
    contenido:
      "¡Hola! Soy Juan, estudiante de 5° año. Me gusta el desarrollo web y estoy ayudando con el frontend.",
    fecha: "2026-03-03T08:00:00Z",
    editado: false,
    esRespuesta: false,
  },
  {
    id: "post-16",
    hiloId: "hilo-6",
    autorId: "user-2",
    contenido: "Soy María, también de 5°. Me encargo del diseño UI/UX.",
    fecha: "2026-03-03T08:15:00Z",
    editado: false,
    esRespuesta: true,
    postPadreId: "post-15",
  },
  {
    id: "post-17",
    hiloId: "hilo-6",
    autorId: "user-3",
    contenido: "Pedro acá, 4° año. Soy nuevo en programación pero quiero aprender mucho.",
    fecha: "2026-03-03T08:30:00Z",
    editado: true,
    esRespuesta: true,
    postPadreId: "post-15",
  },
];

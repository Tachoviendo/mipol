export type CategoriaForo = {
  id: string;
  nombre: string;
  descripcion: string;
};

export type HiloForo = {
  id: string;
  categoriaId: string;
  titulo: string;
  autor: string;
  cantidadRespuestas: number;
  ultimaActividad: string;
  fijado: boolean;
  cerrado: boolean;
};

export type MensajeForo = {
  id: string;
  hiloId: string;
  autor: string;
  contenido: string;
  fecha: string;
  esInicial?: boolean;
};

export type OrdenHilos = "actividad" | "respuestas";

export const LIMITE_TITULO = 140;
export const LIMITE_MENSAJE = 4000;

export const categoriasForo: CategoriaForo[] = [
  {
    id: "materias",
    nombre: "Materias",
    descripcion: "Consultas, apuntes y conversaciones sobre las asignaturas.",
  },
  {
    id: "cursos",
    nombre: "Cursos",
    descripcion: "Información y conversaciones propias de cada curso.",
  },
  {
    id: "vida-liceal",
    nombre: "Vida liceal",
    descripcion: "Actividades, propuestas y temas generales del liceo.",
  },
  {
    id: "comunidad",
    nombre: "Comunidad",
    descripcion: "Espacio para compartir ideas y fortalecer la comunidad educativa.",
  },
];

export const hilosForo: HiloForo[] = [
  {
    id: "organizar-estudio",
    categoriaId: "materias",
    titulo: "¿Cómo organizamos el estudio para los parciales?",
    autor: "Martina Silva",
    cantidadRespuestas: 8,
    ultimaActividad: "2026-08-28T16:30:00-03:00",
    fijado: false,
    cerrado: false,
  },
  {
    id: "materiales-fisica",
    categoriaId: "materias",
    titulo: "Materiales recomendados para Física",
    autor: "Agustín Pereira",
    cantidadRespuestas: 3,
    ultimaActividad: "2026-08-25T10:15:00-03:00",
    fijado: false,
    cerrado: true,
  },
  {
    id: "reunion-delegados",
    categoriaId: "cursos",
    titulo: "Propuesta para la próxima reunión de delegados",
    autor: "Camila Rodríguez",
    cantidadRespuestas: 5,
    ultimaActividad: "2026-08-29T12:00:00-03:00",
    fijado: false,
    cerrado: false,
  },
  {
    id: "viaje-fin-de-curso",
    categoriaId: "cursos",
    titulo: "Ideas para el viaje de fin de curso",
    autor: "Bruno Suárez",
    cantidadRespuestas: 4,
    ultimaActividad: "2026-08-20T09:45:00-03:00",
    fijado: false,
    cerrado: false,
  },
  {
    id: "feria-educativa",
    categoriaId: "vida-liceal",
    titulo: "Feria educativa: propuestas y voluntariado",
    autor: "Lucía Fernández",
    cantidadRespuestas: 11,
    ultimaActividad: "2026-08-30T14:20:00-03:00",
    fijado: false,
    cerrado: false,
  },
  {
    id: "talleres-del-liceo",
    categoriaId: "vida-liceal",
    titulo: "¿Qué talleres nos gustaría tener este año?",
    autor: "Nicolás Acosta",
    cantidadRespuestas: 6,
    ultimaActividad: "2026-08-22T18:10:00-03:00",
    fijado: false,
    cerrado: false,
  },
  {
    id: "bienvenida-comunidad",
    categoriaId: "comunidad",
    titulo: "Presentaciones y bienvenida a la comunidad",
    autor: "Sofía Cabrera",
    cantidadRespuestas: 9,
    ultimaActividad: "2026-08-31T08:30:00-03:00",
    fijado: true,
    cerrado: false,
  },
];

export const mensajesForo: MensajeForo[] = [
  {
    id: "organizar-estudio-1",
    hiloId: "organizar-estudio",
    autor: "Martina Silva",
    contenido:
      "¿Qué métodos les están sirviendo para organizar las materias y llegar mejor preparados a los parciales?",
    fecha: "2026-08-26T11:00:00-03:00",
    esInicial: true,
  },
  {
    id: "organizar-estudio-2",
    hiloId: "organizar-estudio",
    autor: "Agustín Pereira",
    contenido:
      "A mí me ayuda separar los temas por día y dejar una tarde para repasar lo anterior.",
    fecha: "2026-08-27T15:45:00-03:00",
  },
  {
    id: "organizar-estudio-3",
    hiloId: "organizar-estudio",
    autor: "Martina Silva",
    contenido:
      "Está buena la idea del repaso. También podemos compartir preguntas en este hilo.",
    fecha: "2026-08-28T16:30:00-03:00",
  },
  {
    id: "feria-educativa-1",
    hiloId: "feria-educativa",
    autor: "Lucía Fernández",
    contenido:
      "La feria educativa se acerca. ¿Qué actividades podemos preparar entre todos?",
    fecha: "2026-08-29T09:20:00-03:00",
    esInicial: true,
  },
  {
    id: "feria-educativa-2",
    hiloId: "feria-educativa",
    autor: "Nicolás Acosta",
    contenido:
      "Podríamos armar una muestra de proyectos y dejar un espacio para que participen las familias.",
    fecha: "2026-08-30T14:20:00-03:00",
  },
  {
    id: "bienvenida-comunidad-1",
    hiloId: "bienvenida-comunidad",
    autor: "Sofía Cabrera",
    contenido:
      "¡Bienvenidos al foro de la comunidad! Este espacio queda abierto para presentarnos y compartir ideas.",
    fecha: "2026-08-30T10:00:00-03:00",
    esInicial: true,
  },
  {
    id: "bienvenida-comunidad-2",
    hiloId: "bienvenida-comunidad",
    autor: "Camila Rodríguez",
    contenido: "Gracias por abrirlo. Soy Camila, estudiante de quinto año.",
    fecha: "2026-08-31T08:30:00-03:00",
  },
];

export function obtenerCategoriaForo(categoriaId: string) {
  return categoriasForo.find((categoria) => categoria.id === categoriaId);
}

export function obtenerHilosForo(categoriaId: string) {
  return hilosForo.filter((hilo) => hilo.categoriaId === categoriaId);
}

export function obtenerHiloForo(hiloId: string) {
  return hilosForo.find((hilo) => hilo.id === hiloId);
}

export function contarHilosPorCategoria(categoriaId: string): number {
  return obtenerHilosForo(categoriaId).length;
}

export function ordenarHilos(hilos: HiloForo[], orden?: OrdenHilos): HiloForo[] {
  return [...hilos].sort((a, b) => {
    if (a.fijado !== b.fijado) return a.fijado ? -1 : 1;
    return orden === "respuestas"
      ? b.cantidadRespuestas - a.cantidadRespuestas
      : new Date(b.ultimaActividad).getTime() -
          new Date(a.ultimaActividad).getTime();
  });
}

export function buscarHilos(opciones: {
  texto?: string;
  categoriaId?: string;
}): HiloForo[] {
  const texto = opciones.texto?.trim().toLowerCase();
  const resultado = hilosForo.filter((hilo) => {
    const coincideCategoria =
      !opciones.categoriaId || hilo.categoriaId === opciones.categoriaId;
    if (!coincideCategoria) return false;
    if (!texto) return true;

    const coincideTitulo = hilo.titulo.toLowerCase().includes(texto);
    const coincideContenido = mensajesForo.some(
      (mensaje) =>
        mensaje.hiloId === hilo.id &&
        mensaje.contenido.toLowerCase().includes(texto),
    );
    return coincideTitulo || coincideContenido;
  });

  return ordenarHilos(resultado);
}

function generarIdHilo(titulo: string): string {
  const slug = titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const sufijo = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  return `${slug || "hilo"}-${sufijo}`;
}

export function crearHilo(datos: {
  categoriaId: string;
  titulo: string;
  autor: string;
  mensajeInicial: string;
}): HiloForo {
  const ahora = new Date().toISOString();
  const hilo: HiloForo = {
    id: generarIdHilo(datos.titulo),
    categoriaId: datos.categoriaId,
    titulo: datos.titulo,
    autor: datos.autor,
    cantidadRespuestas: 0,
    ultimaActividad: ahora,
    fijado: false,
    cerrado: false,
  };

  hilosForo.push(hilo);
  mensajesForo.push({
    id: `${hilo.id}-1`,
    hiloId: hilo.id,
    autor: datos.autor,
    contenido: datos.mensajeInicial,
    fecha: ahora,
    esInicial: true,
  });

  return hilo;
}

export function agregarMensaje(datos: {
  hiloId: string;
  autor: string;
  contenido: string;
}): MensajeForo | undefined {
  const hilo = obtenerHiloForo(datos.hiloId);
  if (!hilo || hilo.cerrado) return undefined;

  const ahora = new Date().toISOString();
  const sufijo = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  const mensaje: MensajeForo = {
    id: `${hilo.id}-${sufijo}`,
    hiloId: hilo.id,
    autor: datos.autor,
    contenido: datos.contenido,
    fecha: ahora,
  };

  mensajesForo.push(mensaje);
  hilo.cantidadRespuestas += 1;
  hilo.ultimaActividad = ahora;

  return mensaje;
}

export function alternarFijado(hiloId: string): void {
  const hilo = obtenerHiloForo(hiloId);
  if (hilo) hilo.fijado = !hilo.fijado;
}

export function alternarCerrado(hiloId: string): void {
  const hilo = obtenerHiloForo(hiloId);
  if (hilo) hilo.cerrado = !hilo.cerrado;
}

export function eliminarHilo(hiloId: string): void {
  const indice = hilosForo.findIndex((hilo) => hilo.id === hiloId);
  if (indice !== -1) hilosForo.splice(indice, 1);

  for (let i = mensajesForo.length - 1; i >= 0; i -= 1) {
    if (mensajesForo[i].hiloId === hiloId) mensajesForo.splice(i, 1);
  }
}

export function eliminarMensaje(mensajeId: string): void {
  const indice = mensajesForo.findIndex((mensaje) => mensaje.id === mensajeId);
  if (indice === -1) return;

  const [eliminado] = mensajesForo.splice(indice, 1);
  if (eliminado.esInicial) return;

  const hilo = obtenerHiloForo(eliminado.hiloId);
  if (hilo) hilo.cantidadRespuestas = Math.max(0, hilo.cantidadRespuestas - 1);
}
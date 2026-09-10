/**
 * `src/data`: datos mock/estáticos consumidos por páginas y componentes,
 * hasta que existan APIs o una base de datos real.
 */
export type Mensaje = {
  id: string;
  remitente: string;
  asunto: string;
  cuerpo: string;
  fecha: string; // ISO 8601
  leido: boolean;
};

export const mensajes: Mensaje[] = [
  {
    id: "1",
    remitente: "Prof. Carlos Pérez",
    asunto: "Reunión de padres",
    cuerpo: "Estimados padres, se recuerda la reunión del viernes a las 18h.",
    fecha: "2026-09-08T10:00:00Z",
    leido: false,
  },
  {
    id: "2",
    remitente: "Sec. General",
    asunto: "Suspensión de clases",
    cuerpo: "Se comunica que el lunes 14 de septiembre no habrá clases por feriado.",
    fecha: "2026-09-09T08:30:00Z",
    leido: false,
  },
  {
    id: "3",
    remitente: "Prof. Ana Martínez",
    asunto: "Entrega de calificaciones",
    cuerpo: "Las calificaciones del primer trimestre ya están disponibles en el portal.",
    fecha: "2026-09-07T14:15:00Z",
    leido: true,
  },
  {
    id: "4",
    remitente: "Dir. Roberto Gómez",
    asunto: "Protocolo de emergencia",
    cuerpo: "Se realizará un simulacro de evacuación el miércoles a las 11h.",
    fecha: "2026-09-10T09:00:00Z",
    leido: false,
  },
  {
    id: "5",
    remitente: "Prof. Laura Sánchez",
    asunto: "Material de estudio",
    cuerpo: "Se subió el material complementario de matemática al aula virtual.",
    fecha: "2026-09-06T16:45:00Z",
    leido: true,
  },
];

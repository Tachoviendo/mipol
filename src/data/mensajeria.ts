export type TipoConversacion = "1:1" | "grupal" | "aviso_curso";

export type Participante = {
  id: string;
  nombre: string;
  avatar?: string;
  rol: "estudiante" | "docente" | "admin";
};

export type Mensaje = {
  id: string;
  conversacionId: string;
  remitenteId: string;
  contenido: string;
  fecha: string;
  leido: boolean;
};

export type Conversacion = {
  id: string;
  tipo: TipoConversacion;
  nombre?: string;
  participantes: Participante[];
  ultimoMensaje?: Mensaje;
  noLeidos: number;
  actualizadoEn: string;
};

export const participantesMock: Participante[] = [
  { id: "u1", nombre: "Ana García", rol: "docente" },
  { id: "u2", nombre: "Carlos López", rol: "estudiante" },
  { id: "u3", nombre: "María Fernández", rol: "estudiante" },
  { id: "u4", nombre: "Prof. Rodríguez", rol: "docente" },
  { id: "u5", nombre: "Admin Sistema", rol: "admin" },
  { id: "u6", nombre: "Juan Pérez", rol: "estudiante" },
  { id: "u7", nombre: "Laura Martínez", rol: "estudiante" },
];

export const mensajesMock: Mensaje[] = [
  {
    id: "m1",
    conversacionId: "c1",
    remitenteId: "u1",
    contenido: "Hola, ¿tienes dudas sobre el TP?",
    fecha: "2026-09-07T10:00:00Z",
    leido: false,
  },
  {
    id: "m2",
    conversacionId: "c1",
    remitenteId: "u2",
    contenido: "Sí, no entiendo el ejercicio 3",
    fecha: "2026-09-07T10:05:00Z",
    leido: true,
  },
  {
    id: "m3",
    conversacionId: "c2",
    remitenteId: "u4",
    contenido: "Recuerden entregar el proyecto el viernes",
    fecha: "2026-09-07T09:00:00Z",
    leido: false,
  },
  {
    id: "m4",
    conversacionId: "c3",
    remitenteId: "u5",
    contenido: "Mantenimiento programado el domingo",
    fecha: "2026-09-06T15:00:00Z",
    leido: false,
  },
  {
    id: "m5",
    conversacionId: "c3",
    remitenteId: "u5",
    contenido: "El sistema estará disponible desde las 14:00",
    fecha: "2026-09-06T15:05:00Z",
    leido: true,
  },
];

export const conversacionesMock: Conversacion[] = [
  {
    id: "c1",
    tipo: "1:1",
    participantes: [participantesMock[0], participantesMock[1]],
    ultimoMensaje: mensajesMock[0],
    noLeidos: 1,
    actualizadoEn: "2026-09-07T10:00:00Z",
  },
  {
    id: "c2",
    tipo: "grupal",
    nombre: "Grupo Trabajo Práctico",
    participantes: [participantesMock[1], participantesMock[2], participantesMock[5], participantesMock[6]],
    ultimoMensaje: mensajesMock[2],
    noLeidos: 1,
    actualizadoEn: "2026-09-07T09:00:00Z",
  },
  {
    id: "c3",
    tipo: "aviso_curso",
    nombre: "Avisos - Programación I",
    participantes: participantesMock.filter((p) => p.rol === "estudiante"),
    ultimoMensaje: mensajesMock[3],
    noLeidos: 2,
    actualizadoEn: "2026-09-06T15:05:00Z",
  },
];

export function getTotalNoLeidos(): number {
  return conversacionesMock.reduce((acc, c) => acc + c.noLeidos, 0);
}

export function marcarConversacionComoLeida(conversacionId: string): void {
  const conversacion = conversacionesMock.find((c) => c.id === conversacionId);
  if (conversacion) {
    conversacion.noLeidos = 0;
    conversacion.ultimoMensaje = {
      ...conversacion.ultimoMensaje!,
      leido: true,
    };
    mensajesMock
      .filter((m) => m.conversacionId === conversacionId)
      .forEach((m) => {
        m.leido = true;
      });
  }
}
/**
 * Usuarios de ejemplo para simular sesiones y permisos sin backend.
 *
 * - Cada usuario tiene un `rol` que determina qué puede hacer en la app.
 * - `curso` se usa para estudiantes; `departamento` para docentes y administración.
 * - `avatar` es una URL pública (placeholder con iniciales).
 */

export type Rol = "estudiante" | "docente" | "admin" | "publico";

export type Usuario = {
  id: string;
  nombre: string;
  rol: Rol;
  avatar: string;
  curso?: string;
  departamento?: string;
};

export const usuarios: Usuario[] = [
  {
    id: "u1",
    nombre: "María Pérez",
    rol: "estudiante",
    avatar: "https://ui-avatars.com/api/?name=María+Pérez&background=2ca6e0&color=fff",
    curso: "3° A",
  },
  {
    id: "u2",
    nombre: "Carlos Rodríguez",
    rol: "docente",
    avatar: "https://ui-avatars.com/api/?name=Carlos+Rodríguez&background=0f4c81&color=fff",
    departamento: "Matemáticas",
  },
  {
    id: "u3",
    nombre: "Laura Martínez",
    rol: "admin",
    avatar: "https://ui-avatars.com/api/?name=Laura+Martínez&background=f5a623&color=fff",
    departamento: "Dirección",
  },
  {
    id: "u4",
    nombre: "Juan González",
    rol: "publico",
    avatar: "https://ui-avatars.com/api/?name=Juan+González&background=94a3b8&color=fff",
  },
  {
    id: "u5",
    nombre: "Valentina Suárez",
    rol: "estudiante",
    avatar: "https://ui-avatars.com/api/?name=Valentina+Suárez&background=2ca6e0&color=fff",
    curso: "3° A",
  },
  {
    id: "u6",
    nombre: "Joaquín Fernández",
    rol: "estudiante",
    avatar: "https://ui-avatars.com/api/?name=Joaquín+Fernández&background=2ca6e0&color=fff",
    curso: "3° B",
  },
  {
    id: "u7",
    nombre: "Martina Silva",
    rol: "estudiante",
    avatar: "https://ui-avatars.com/api/?name=Martina+Silva&background=2ca6e0&color=fff",
    curso: "4° B",
  },
  {
    id: "u8",
    nombre: "Bruno Suárez",
    rol: "estudiante",
    avatar: "https://ui-avatars.com/api/?name=Bruno+Suárez&background=2ca6e0&color=fff",
    curso: "4° B",
  },
  {
    id: "u9",
    nombre: "Lucía Fernández",
    rol: "estudiante",
    avatar: "https://ui-avatars.com/api/?name=Lucía+Fernández&background=2ca6e0&color=fff",
    curso: "5° C",
  },
  {
    id: "u10",
    nombre: "Nicolás Acosta",
    rol: "estudiante",
    avatar: "https://ui-avatars.com/api/?name=Nicolás+Acosta&background=2ca6e0&color=fff",
    curso: "5° C",
  },
  {
    id: "u12",
    nombre: "Ricardo Gómez",
    rol: "docente",
    avatar: "https://ui-avatars.com/api/?name=Ricardo+Gómez&background=0f4c81&color=fff",
    departamento: "Física",
  },
  {
    id: "u13",
    nombre: "Ana Robles",
    rol: "docente",
    avatar: "https://ui-avatars.com/api/?name=Ana+Robles&background=0f4c81&color=fff",
    departamento: "Literatura",
  },
  {
    id: "u14",
    nombre: "Elena Sosa",
    rol: "docente",
    avatar: "https://ui-avatars.com/api/?name=Elena+Sosa&background=0f4c81&color=fff",
    departamento: "Historia",
  },
  {
    id: "u15",
    nombre: "Pablo Ferreira",
    rol: "estudiante",
    avatar: "https://ui-avatars.com/api/?name=Pablo+Ferreira&background=2ca6e0&color=fff",
    curso: "3° A",
  },
  {
    id: "u16",
    nombre: "Sofía Cabrera",
    rol: "estudiante",
    avatar: "https://ui-avatars.com/api/?name=Sofía+Cabrera&background=2ca6e0&color=fff",
    curso: "3° A",
  },
];

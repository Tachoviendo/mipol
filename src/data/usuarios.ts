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
];

/**
 * `src/data`: datos mock/estáticos para destinatarios,
 * hasta que existan APIs o una base de datos real.
 */

export type TipoDestinatario = "persona" | "curso" | "departamento";

export interface Persona {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: "docente" | "alumno" | "administrativo";
}

export interface Curso {
  id: string;
  nombre: string;
  codigo: string;
  docenteId: string;
  anio: number;
}

export interface Departamento {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface DestinatarioSeleccionado {
  tipo: TipoDestinatario;
  items: (Persona | Curso | Departamento)[];
}

export const personas: Persona[] = [
  { id: "p1", nombre: "María", apellido: "González", email: "maria.gonzalez@liceo.edu.uy", rol: "docente" },
  { id: "p2", nombre: "Juan", apellido: "Pérez", email: "juan.perez@liceo.edu.uy", rol: "docente" },
  { id: "p3", nombre: "Ana", apellido: "Rodríguez", email: "ana.rodriguez@liceo.edu.uy", rol: "alumno" },
  { id: "p4", nombre: "Carlos", apellido: "López", email: "carlos.lopez@liceo.edu.uy", rol: "alumno" },
  { id: "p5", nombre: "Laura", apellido: "Martínez", email: "laura.martinez@liceo.edu.uy", rol: "administrativo" },
  { id: "p6", nombre: "Pedro", apellido: "Sánchez", email: "pedro.sanchez@liceo.edu.uy", rol: "docente" },
  { id: "p7", nombre: "Sofía", apellido: "García", email: "sofia.garcia@liceo.edu.uy", rol: "alumno" },
  { id: "p8", nombre: "Miguel", apellido: "Fernández", email: "miguel.fernandez@liceo.edu.uy", rol: "administrativo" },
];

export const cursos: Curso[] = [
  { id: "c1", nombre: "Matemática 1° Año", codigo: "MAT101", docenteId: "p1", anio: 1 },
  { id: "c2", nombre: "Física 2° Año", codigo: "FIS201", docenteId: "p2", anio: 2 },
  { id: "c3", nombre: "Química 3° Año", codigo: "QUI301", docenteId: "p1", anio: 3 },
  { id: "c4", nombre: "Biología 1° Año", codigo: "BIO101", docenteId: "p6", anio: 1 },
  { id: "c5", nombre: "Historia 2° Año", codigo: "HIS201", docenteId: "p2", anio: 2 },
  { id: "c6", nombre: "Literatura 3° Año", codigo: "LIT301", docenteId: "p6", anio: 3 },
];

export const departamentos: Departamento[] = [
  { id: "d1", nombre: "Matemáticas", descripcion: "Departamento de Matemáticas y Estadística" },
  { id: "d2", nombre: "Física", descripcion: "Departamento de Física" },
  { id: "d3", nombre: "Química", descripcion: "Departamento de Química" },
  { id: "d4", nombre: "Biología", descripcion: "Departamento de Biología" },
  { id: "d5", nombre: "Humanidades", descripcion: "Departamento de Historia y Literatura" },
  { id: "d6", nombre: "Administración", descripcion: "Departamento Administrativo" },
];

export function buscarPersonas(query: string): Persona[] {
  const q = query.toLowerCase().trim();
  if (!q) return personas;
  return personas.filter(
    (p) =>
      p.nombre.toLowerCase().includes(q) ||
      p.apellido.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q)
  );
}

export function buscarCursos(query: string): Curso[] {
  const q = query.toLowerCase().trim();
  if (!q) return cursos;
  return cursos.filter(
    (c) =>
      c.nombre.toLowerCase().includes(q) ||
      c.codigo.toLowerCase().includes(q)
  );
}

export function buscarDepartamentos(query: string): Departamento[] {
  const q = query.toLowerCase().trim();
  if (!q) return departamentos;
  return departamentos.filter(
    (d) =>
      d.nombre.toLowerCase().includes(q) ||
      d.descripcion.toLowerCase().includes(q)
  );
}
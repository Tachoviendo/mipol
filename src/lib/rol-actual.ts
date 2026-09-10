import { cookies } from "next/headers";

import {
  NOMBRE_COOKIE,
  NOMBRE_MAX_LENGTH,
  ROL_COOKIE,
  ROL_POR_DEFECTO,
  esRolValido,
  type Rol,
} from "@/lib/roles";

// Aparte de `roles.ts` porque usa `next/headers` (solo Server Components/Actions).
export async function obtenerRolActual(): Promise<Rol> {
  const store = await cookies();
  const valor = store.get(ROL_COOKIE)?.value;
  return esRolValido(valor) ? valor : ROL_POR_DEFECTO;
}

// Nombre opcional para distinguir autores que comparten el mismo rol simulado.
export async function obtenerNombreMostrado(): Promise<string | undefined> {
  const store = await cookies();
  const valor = store.get(NOMBRE_COOKIE)?.value?.trim();
  return valor ? valor.slice(0, NOMBRE_MAX_LENGTH) : undefined;
}

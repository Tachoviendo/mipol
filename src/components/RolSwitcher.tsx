"use client";

import { useEffect, useRef } from "react";

import { establecerRolAction } from "@/app/foros/actions";
import { useAuth } from "@/lib/auth";
import { NOMBRE_MAX_LENGTH, ROLES, type Rol } from "@/lib/roles";

/**
 * Selector de rol simulado del prototipo.
 *
 * - El rol elegido se guarda en `useAuth` (persistido en localStorage, ver
 *   `src/lib/auth.tsx`), por lo que se recuerda entre visitas.
 * - Al cambiar también se envía el rol a `establecerRolAction` (cookie) para
 *   que las pantallas que leen el rol desde el servidor (ej. foros) usen el
 *   mismo rol seleccionado.
 */
export function RolSwitcher() {
  const { userRole, setUserRole } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);

  // Reenviar el rol actual a la cookie del servidor al montar y al cambiar,
  // para mantener sincronizados los dos mecanismos (client context y cookie).
  useEffect(() => {
    const formData = new FormData();
    formData.set("rol", userRole);
    void establecerRolAction(formData);
  }, [userRole]);

  return (
    <form
      ref={formRef}
      action={establecerRolAction}
      className="flex flex-wrap items-center gap-2"
    >
      <label htmlFor="rol" className="text-xs text-zinc-500">
        Rol de prueba
      </label>
      <select
        id="rol"
        name="rol"
        value={userRole}
        onChange={(e) => setUserRole(e.target.value as Rol)}
        className="rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-800"
      >
        {ROLES.map((rol) => (
          <option key={rol.valor} value={rol.valor}>
            {rol.etiqueta}
          </option>
        ))}
      </select>
      <label htmlFor="nombre" className="text-xs text-zinc-500">
        Nombre para mostrar
      </label>
      <input
        id="nombre"
        name="nombre"
        type="text"
        maxLength={NOMBRE_MAX_LENGTH}
        defaultValue={""}
        placeholder="(usa el rol por defecto)"
        className="w-40 rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-800"
      />
    </form>
  );
}
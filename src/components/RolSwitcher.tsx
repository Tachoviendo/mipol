"use client";

import { useRef } from "react";

import { establecerRolAction } from "@/app/foros/actions";
import { NOMBRE_MAX_LENGTH, ROLES, type Rol } from "@/lib/roles";

export function RolSwitcher({
  rolActual,
  nombreActual,
}: {
  rolActual: Rol;
  nombreActual?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

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
        defaultValue={rolActual}
        onChange={() => formRef.current?.requestSubmit()}
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
        defaultValue={nombreActual ?? ""}
        placeholder="(usa el rol por defecto)"
        onBlur={() => formRef.current?.requestSubmit()}
        className="w-40 rounded-lg border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-800"
      />
    </form>
  );
}

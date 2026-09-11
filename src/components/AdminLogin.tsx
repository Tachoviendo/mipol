"use client";

import { useAuth } from "@/lib/auth";
import { ROLES } from "@/lib/roles";

export function AdminLogin() {
  const { userRole, setUserRole, isAdmin } = useAuth();

  if (isAdmin) {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-green-50 px-3 py-2 dark:bg-green-900/30">
        <span className="text-sm font-medium text-green-800 dark:text-green-400">
          Modo administración activo
        </span>
        <button
          onClick={() => setUserRole("estudiante")}
          className="rounded-md border border-green-300 px-2 py-1 text-xs font-medium text-green-800 hover:bg-green-100 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/30"
        >
          Cambiar rol
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {ROLES.map((rol) => (
        <button
          key={rol.valor}
          onClick={() => setUserRole(rol.valor)}
          aria-pressed={userRole === rol.valor}
          className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
            userRole === rol.valor
              ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300"
              : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          }`}
        >
          {rol.etiqueta}
        </button>
      ))}
    </div>
  );
}
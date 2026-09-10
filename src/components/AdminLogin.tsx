"use client";

import { useAuth } from "@/lib/auth";

export function AdminLogin() {
  const { userRole, setUserRole, isAdmin } = useAuth();

  if (isAdmin) {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-green-50 px-3 py-2 dark:bg-green-900/30">
        <span className="text-sm font-medium text-green-800 dark:text-green-400">
          Modo administrador activo
        </span>
        <button
          onClick={() => setUserRole(null)}
          className="rounded-md border border-green-300 px-2 py-1 text-xs font-medium text-green-800 hover:bg-green-100 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/30"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setUserRole("admin")}
        className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        Entrar como admin
      </button>
      <button
        onClick={() => setUserRole("user")}
        className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        Entrar como usuario
      </button>
    </div>
  );
}
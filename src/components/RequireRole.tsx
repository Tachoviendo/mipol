"use client";

import type { ReactNode } from "react";

import { useAuth } from "@/lib/auth";
import type { Rol } from "@/lib/roles";

/**
 * Control de acceso por rol para mostrar/ocultar acciones según el rol activo.
 *
 * Uso:
 * ```tsx
 * <RequireRole roles={["administracion", "docente"]}>
 *   <button>Crear evento</button>
 * </RequireRole>
 * ```
 *
 * `fallback` (opcional) se muestra cuando el rol actual NO está permitido.
 */
export function RequireRole({
  roles,
  children,
  fallback = null,
}: {
  roles: Rol[];
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const { hasRole } = useAuth();

  return hasRole(roles) ? <>{children}</> : <>{fallback}</>;
}
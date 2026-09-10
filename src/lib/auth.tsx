"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import {
  ROL_POR_DEFECTO,
  type Rol,
} from "@/lib/roles";

interface AuthContextType {
  /** Rol simulado activo del usuario (sin backend real todavía). */
  userRole: Rol;
  setUserRole: (role: Rol) => void;
  /** True si el rol actual está incluido en `roles`. */
  hasRole: (roles: Rol[]) => boolean;
  /** Atajo para el rol Administración. */
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<Rol>(ROL_POR_DEFECTO);

  return (
    <AuthContext.Provider
      value={{
        userRole,
        setUserRole,
        hasRole: (roles) => roles.includes(userRole),
        isAdmin: userRole === "administracion",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
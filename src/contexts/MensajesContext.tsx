"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { mensajes as mensajesIniciales, type Mensaje } from "@/data/mensajes";

type MensajesContextType = {
  mensajes: Mensaje[];
  noLeidos: number;
  marcarComoLeido: (id: string) => void;
};

const MensajesContext = createContext<MensajesContextType | null>(null);

export function MensajesProvider({ children }: { children: ReactNode }) {
  const [mensajes, setMensajes] = useState<Mensaje[]>(mensajesIniciales);

  const noLeidos = mensajes.filter((m) => !m.leido).length;

  const marcarComoLeido = useCallback((id: string) => {
    setMensajes((prev) =>
      prev.map((m) => (m.id === id ? { ...m, leido: true } : m))
    );
  }, []);

  return (
    <MensajesContext.Provider value={{ mensajes, noLeidos, marcarComoLeido }}>
      {children}
    </MensajesContext.Provider>
  );
}

export function useMensajes() {
  const ctx = useContext(MensajesContext);
  if (!ctx) throw new Error("useMensajes debe usarse dentro de MensajesProvider");
  return ctx;
}

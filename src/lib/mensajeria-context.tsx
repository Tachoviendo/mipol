"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import type { Conversacion } from "@/data/mensajeria";
import { conversacionesMock, getTotalNoLeidos, marcarConversacionComoLeida } from "@/data/mensajeria";

type MensajeriaContextType = {
  conversaciones: Conversacion[];
  totalNoLeidos: number;
  marcarComoLeida: (conversacionId: string) => void;
  actualizarConteo: () => void;
};

const MensajeriaContext = createContext<MensajeriaContextType | undefined>(undefined);

export function MensajeriaProvider({ children }: { children: ReactNode }) {
  const [conversaciones, setConversaciones] = useState<Conversacion[]>(conversacionesMock);
  const [totalNoLeidos, setTotalNoLeidos] = useState<number>(getTotalNoLeidos());

  const actualizarConteo = useCallback(() => {
    const total = conversaciones.reduce((acc, c) => acc + c.noLeidos, 0);
    setTotalNoLeidos(total);
  }, [conversaciones]);

  const marcarComoLeida = useCallback((conversacionId: string) => {
    marcarConversacionComoLeida(conversacionId);
    setConversaciones([...conversacionesMock]);
    actualizarConteo();
  }, [actualizarConteo]);

  return (
    <MensajeriaContext.Provider value={{ conversaciones, totalNoLeidos, marcarComoLeida, actualizarConteo }}>
      {children}
    </MensajeriaContext.Provider>
  );
}

export function useMensajeria() {
  const context = useContext(MensajeriaContext);
  if (!context) {
    throw new Error("useMensajeria debe usarse dentro de un MensajeriaProvider");
  }
  return context;
}
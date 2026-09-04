"use client";

import type { ReactNode } from "react";

export function ConfirmSubmitButton({
  children,
  mensajeConfirmacion,
  className,
}: {
  children: ReactNode;
  mensajeConfirmacion: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(evento) => {
        if (!window.confirm(mensajeConfirmacion)) {
          evento.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}

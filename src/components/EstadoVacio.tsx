import Link from "next/link";

// Pensado para consolidarse con el componente de estado vacío de F-08.
export function EstadoVacio({
  titulo,
  descripcion,
  accion,
}: {
  titulo: string;
  descripcion: string;
  accion?: { href: string; etiqueta: string };
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-5 py-14 text-center">
      <p className="text-base font-semibold text-zinc-800">{titulo}</p>
      <p className="max-w-sm text-sm text-zinc-500">{descripcion}</p>
      {accion && (
        <Link
          href={accion.href}
          className="mt-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
        >
          {accion.etiqueta}
        </Link>
      )}
    </div>
  );
}

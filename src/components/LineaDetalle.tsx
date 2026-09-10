import type { Linea } from "@/data/transporte";

export function LineaDetalle({ linea }: { linea: Linea }) {
  const paradasOrdenadas = [...linea.paradas].sort((a, b) => a.orden - b.orden);
  const horariosActivos = linea.horarios.filter((h) => h.activo);
  const diasActivos = linea.diasCirculacion.filter((d) => d.activo);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start gap-4">
        <span
          className="mt-1 block h-4 w-4 shrink-0 rounded-full"
          style={{ backgroundColor: linea.color }}
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            {linea.nombre}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {linea.descripcion}
          </p>
        </div>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium text-black dark:text-zinc-50">
          Recorrido y horarios por parada
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-black/10 dark:border-white/20 bg-black/[.04] dark:bg-white/[.06] px-4 py-3 text-left font-medium text-black dark:text-zinc-50">
                  Parada
                </th>
                {horariosActivos.map((h) => (
                  <th
                    key={h.id}
                    className="border border-black/10 dark:border-white/20 bg-black/[.04] dark:bg-white/[.06] px-4 py-3 text-center font-medium text-black dark:text-zinc-50"
                  >
                    {h.horaSalida}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paradasOrdenadas.map((parada, index) => (
                <tr key={parada.id}>
                  <td className="border border-black/10 dark:border-white/20 bg-white dark:bg-zinc-900 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: linea.color }}
                      >
                        {index + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-medium text-black dark:text-zinc-50">
                          {parada.nombre}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {parada.direccion}
                        </span>
                      </div>
                    </div>
                  </td>
                  {horariosActivos.map((h) => {
                    const paradaTiempo = h.paradas.find(
                      (p) => p.paradaId === parada.id
                    );
                    return (
                      <td
                        key={h.id}
                        className="border border-black/10 dark:border-white/20 bg-white dark:bg-zinc-900 px-4 py-3 text-center text-black dark:text-zinc-50"
                      >
                        {paradaTiempo ? paradaTiempo.hora : "-"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium text-black dark:text-zinc-50">
          Días de circulación
        </h2>
        <div className="flex flex-wrap gap-2">
          {diasActivos.map((dia) => (
            <span
              key={dia.id}
              className="rounded-full bg-black/[.06] dark:bg-white/[.08] px-3 py-1 text-sm text-black dark:text-zinc-50"
            >
              {dia.nombre}
            </span>
          ))}
        </div>
      </section>

      {linea.contacto && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium text-black dark:text-zinc-50">
            Contacto del operador
          </h2>
          <div className="rounded-xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-zinc-900 p-4 flex flex-col gap-2">
            <p className="font-medium text-black dark:text-zinc-50">
              {linea.contacto.empresa}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Teléfono: {linea.contacto.telefono}
            </p>
            {linea.contacto.email && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Email: {linea.contacto.email}
              </p>
            )}
            {linea.contacto.horarioAtencion && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Horario: {linea.contacto.horarioAtencion}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
# TR-03 — Información de contacto de empresa de transporte en detalle de línea

## Decisión

**Sí se muestra información de contacto de la empresa de transporte en el detalle de línea.**

La información de contacto (teléfono, email, horario de atención) se incluye en la sección de detalle de cada línea (`/lineas/[id]`), debajo de los días de circulación.

## Justificación

- Los usuarios necesitan poder contactar al operador para reportar incidentes, consultas sobre servicios especiales o objetos perdidos.
- El sistema ya cuenta con novedades de transporte (demoras, cambios de recorrido, suspensiones) — la información de contacto complementa este flujo.
- Es una práctica estándar en apps de transporte público.

## Alcance de la información a mostrar

| Campo | Ejemplo | Obligatorio |
|---|---|---|
| Nombre de la empresa | "Transportes Salto S.A." | Sí |
| Teléfono | "099 123 456" | Sí |
| Email | "info@transsalto.com.uy" | No |
| Horario de atención | "Lunes a viernes 06:00 - 22:00" | No |

## Cambios en el modelo de datos

```typescript
// Nuevo tipo
export type ContactoTransporte = {
  empresa: string;
  telefono: string;
  email?: string;
  horarioAtencion?: string;
};

// Se agrega campo opcional a Linea
export type Linea = {
  // ... campos existentes
  contacto?: ContactoTransporte;
};
```

El campo es **opcional** (`?`) para no forzar a que todas las líneas tengan contacto definido (servicios especiales como la Línea 3 podrían no tenerlo).

## Cambios en la interfaz

Se agrega una nueva sección en `LineaDetalle.tsx` después de "Días de circulación":

```tsx
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
```

## Impacto

- **CI-02 (Modelo de datos):** Se agrega tipo `ContactoTransporte` y campo opcional en `Linea`
- **TR-04 (Detalle de línea):** Se agrega sección de contacto en `LineaDetalle.tsx`
- **Datos mock:** Se agrega información de contacto en `transporte.ts` para las líneas que correspondan

## Estado

| Fase | Estado |
|---|---|
| Decisión | Aprobada |
| Modelo de datos | Implementado |
| Componente UI | Implementado |
| Datos mock | Implementado |

# OE-01 — Taxonomía de oferta educativa

## Decisión

**El catálogo distingue dos tipos de oferta:**

| Tipo | `TipoOferta` | Definición | Ejemplos |
|---|---|---|---|
| Oferta terciaria | `"terciaria"` | Propuestas educativas **post-liceo** vinculadas al liceo: carreras, tecnicaturas y cursos de nivel terciario. | Tecnicatura en Redes Informáticas, Curso de Operador de PC, Tecnicatura en Análisis y Programación |
| Oferta interna | `"interna"` | Actividades del **propio liceo**, que complementan la currícula: talleres, clubes y actividades extracurriculares. | Taller de Teatro, Club de Robótica, Taller de Ajedrez |

## Justificación

- La épica de oferta educativa mezcla "carreras post-liceo" con "talleres del
  liceo"; sin diferenciarlas, el catálogo y sus filtros (OE-03, OE-05) no
  tienen criterio de agrupación.
- Cada tipo tiene flujos distintos (inscripción externa vs. interna, actores
  responsables, cupos), aunque comparten campos comunes para mostrarse en el
  mismo listado.
- La etiqueta "terciaria" no implica dependencia administrativa con otro
  organismo; indica que es formación **de nivel terciario** (post-bachillerato).
- La oferta interna siempre se realiza **dentro del liceo**, dirigida a
  estudiantes de la institución.

## Alcance

Esta taxonomía cubre únicamente el **tipo de oferta** usado por el catálogo.

**Queda fuera de esta taxonomía** (se modelará por separado si surge):
roles de acceso (ya resuelto por `src/lib/roles.ts`), estado de
inscripción/cierre (alto/edición es de Administración/Docentes) y la
organización geográfica (liceo/sede).

## Cambios en el modelo de datos (OE-02)

```typescript
// `src/data/oferta.ts`
export type TipoOferta = "terciaria" | "interna";

export type ProgramaOferta = {
  id: string;
  nombre: string;
  tipo: TipoOferta;
  descripcion: string;
  duracion: string;       // "2 años" | "4 meses"
  requisitos: string;     // requisitos de ingreso/participación
  cupos: number;          // 0 = cupos ilimitados
  contactoInscripcion: string; // teléfono/email/secretaría para inscribirse
};
```

- `tipo` es un union type (no un string libre) para que los filtros y la UI
  solo manejen los dos valores definidos.
- Los datos mock incluyen **al menos un programa terciario y uno interno** con
  todos los campos.

## Cambios en la interfaz (OE-03, OE-05)

- El listado muestra un indicador visual del tipo (etiqueta/color).
- Los filtros usan exactamente los valores `"terciaria" | "interna"`.

## Impacto

- **OE-02 (Datos mock):** se crea `src/data/oferta.ts` con `ProgramaOferta` y
  los mock de ambos tipos.
- **OE-03 (Listado con filtro por tipo):** filtra por `tipo`.
- **OE-05 (Buscador y filtros):** combina búsqueda de texto + filtro por tipo.

## Estado

| Fase | Estado |
|---|---|
| Decisión | Aprobada |
| Modelo de datos | Implementado |
| Datos mock | Implementado |
| Componente UI | Pendiente (OE-03) |
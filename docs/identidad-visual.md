# Identidad Visual — MiPol

Rectoría y tokens de estilo para todos los módulos. Aprobado por el equipo de
desarrollo antes de maquetar funcionalidades.

## Referencia institucional

Paleta derivada de las imágenes de referencia del Liceo N.° 1 de Salto (IPOLL)
en esta carpeta (`WhatsApp Image 2026-09-03 ...`). Los colores de acento se
extrajeron de las imágenes originales.

Colores oficiales aprobados:

- **Primario — Azul institucional (índigo):** base `#5656F0`, oscuro (marino) `#323297`
- **Secundario — Teal (acento):** `#20A0A0`

## Paleta

### Primario — Azul índigo (`brand`)

| Token | Hex | Uso |
|---|---|---|
| `brand-50` | `#F1F1FE` | Fondos de zona activa / hover suave |
| `brand-100` | `#E5E3FD` | Bordes sutiles, fondos de badges |
| `brand-200` | `#CFC9FB` | Iconos decorativos |
| `brand-300` | `#ACA4F6` | Iconos decorativos |
| `brand-400` | `#8A78F0` | Estados hover de botones primarios |
| `brand-500` | `#5656F0` | `primary` — botones, links, elementos clave |
| `brand-600` | `#4740D6` | Hover de `brand-500` |
| `brand-700` | `#3A36A8` | Texto en light, iconos |
| `brand-800` | `#323297` | `primary-dark` — marino, texto en dark |
| `brand-900` | `#26266E` | Fondos oscuros, headers |
| `brand-950` | `#1A1A4A` | Profundidad máxima |

### Acento — Teal (`teal`)

| Token | Hex | Uso |
|---|---|---|
| `teal-50` | `#EEF8F8` | Fondos suaves de acento |
| `teal-100` | `#D6F0F0` | Bordes de elementos de acento |
| `teal-500` | `#20A0A0` | `secondary` / `accent` — CTAs secundarios, etiquetas |
| `teal-600` | `#1B8686` | Hover de `teal-500` |
| `teal-700` | `#146B6B` | `secondary-dark` — texto/iconos de acento |

### Neutros

- Escala `zinc` de Tailwind (light/dark) para fondos, bordes y texto secundario.
- `background` / `foreground` de `src/app/globals.css` para el fondo general
  (blanco en light, `#0a0a0a` en dark).

## Mapeo de tokens (clases utilitarias)

| Alias | Valor | Clases generadas |
|---|---|---|
| `primary` | `#5656F0` | `bg-primary`, `text-primary`, `border-primary` |
| `primary-light` | `#F1F1FE` | `bg-primary-light`, ... |
| `primary-dark` | `#323297` | `bg-primary-dark`, ... |
| `secondary` | `#20A0A0` | `bg-secondary`, `text-secondary`, ... |
| `secondary-light` | `#D6F0F0` | `bg-secondary-light`, ... |
| `secondary-dark` | `#146B6B` | `bg-secondary-dark`, ... |
| `accent` | `#20A0A0` | `bg-accent`, `text-accent`, ... |

## Reglas de uso

1. Usar siempre estos tokens (`bg-brand-500`, `text-brand-800`, `teal-500`,
   etc.) en lugar de hex sueltos, para mantener consistencia.
2. **Botones primarios:** `bg-brand-500`, hover `bg-brand-600`, texto blanco.
3. **Botones secundarios:** `bg-teal-500`, hover `bg-teal-600`.
4. **Elemento activo (nav):** fondo `brand-50` (light) / `brand-900/40` (dark),
   texto `brand-700` (light) / `brand-200` (dark).
5. **Textos:** títulos y elementos clave en `brand-800` (light) /
   `brand-200` (dark); texto secundario en gris (`zinc-600` / `zinc-400`).
6. **Dark mode:** siempre definir la variante `dark:` usando la misma familia
   de tokens (ver regla 4).

## Tipografía

- **Geist Sans** (variable `--font-sans`) para toda la UI, cargada en
  `src/app/layout.tsx`.
- Encabezados: semibold/bold; cuerpo: regular. El resto usa la jerarquía
  por defecto de Tailwind.

## Dónde viven los tokens

- Definición: `src/app/globals.css` (bloque `@theme inline`).
- Documentación de arquitectura: `README.md`.
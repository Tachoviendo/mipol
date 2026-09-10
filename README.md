# mipol

Proyecto en conjunto con estudiantes del Liceo 1° de Salto.

## Empezar

```bash
pnpm install
pnpm dev
```

Abrí [http://localhost:3000](http://localhost:3000) para ver el resultado. La
página de ejemplo está en [http://localhost:3000/anuncios](http://localhost:3000/anuncios).

## Estructura de carpetas

Proyecto Next.js con App Router. Todo el código de la aplicación vive dentro
de `src/`:

```
src/
├── app/          # Rutas (App Router). Cada carpeta = un segmento de URL,
│                 # page.tsx = la ruta, layout.tsx = layout compartido.
├── components/   # Componentes de UI reutilizables entre páginas.
├── lib/          # Funciones utilitarias, sin JSX (helpers, formateo, etc).
└── data/         # Datos mock/estáticos, hasta que existan APIs reales.
```

Convenciones:

- **`src/app`**: solo archivos de ruta (`page.tsx`, `layout.tsx`, `loading.tsx`,
  etc.). No poner componentes reutilizables ni lógica de negocio acá.
- **`src/components`**: un componente por archivo, nombrado en PascalCase
  (ej. `AnuncioCard.tsx`). Si un componente solo lo usa una ruta específica,
  puede vivir junto a esa ruta dentro de `src/app`.
- **`src/lib`**: funciones puras y utilidades (formateo de fechas, helpers de
  cálculo, clientes de datos). No debe importar React ni contener JSX.
- **`src/data`**: mocks y datos estáticos tipados, para desarrollar sin
  depender de un backend.

### Ejemplo

La ruta `/anuncios` (`src/app/anuncios/page.tsx`) muestra la convención en
práctica: importa datos de `src/data/ejemplo.ts`, un helper de
`src/lib/date.ts`, y renderiza el componente `src/components/AnuncioCard.tsx`.

## Tema (Tailwind)

El tema institucional del liceo (colores, tipografías y breakpoints) se define
**en un solo lugar**: `src/app/globals.css` (bloque `@theme inline`).

Para ajustarlo, editar ahí:

- **Colores institucionales**: tokens `--color-primary*`, `--color-secondary*`
  y `--color-accent`. Tienen una paleta tentativa (azul oscuro + celeste) que
  debe reemplazarse por los códigos hex oficiales.
- **Tipografías**: `--font-sans` y `--font-mono`, enlazadas a las fuentes
  Geist cargadas en `src/app/layout.tsx`.
- **Breakpoints**: se usa la escala por defecto de Tailwind
  (`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px). Para
  personalizarlos, definir `--breakpoint-*` en el mismo bloque.

Usar siempre estos tokens en clases (`bg-primary`, `text-secondary`, etc.) en
vez de colores sueltos, para mantener un estilo consistente.

## Más información

- [Documentación de Next.js](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)

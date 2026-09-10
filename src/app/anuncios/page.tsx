import { AnuncioCard } from "@/components/AnuncioCard";
import { anuncios } from "@/data/ejemplo";

/**
 * `src/app`: rutas del App Router. Cada carpeta es un segmento de URL
 * y `page.tsx` es el punto de entrada de esa ruta (ver /anuncios).
 */
export default function AnunciosPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-primary-light px-6 py-16 dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col gap-4">
        <h1 className="text-2xl font-semibold text-primary dark:text-secondary-light">
          Anuncios
        </h1>
        <p className="text-sm text-foreground/70">
          Página de ejemplo que sigue la convención de carpetas del proyecto.
        </p>
        <div className="flex flex-col gap-3">
          {anuncios.map((anuncio) => (
            <AnuncioCard key={anuncio.id} {...anuncio} />
          ))}
        </div>
      </main>
    </div>
  );
}

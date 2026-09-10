export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-primary-light font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-primary dark:text-secondary-light">
            Liceo 1° de Salto
          </h1>
          <p className="max-w-md text-lg leading-8 text-foreground/70">
            Proyecto colaborativo: Bienvenida a la plataforma del liceo.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 text-white transition-colors hover:bg-secondary-dark md:w-[200px]"
            href="/anuncios"
          >
            Ver anuncios
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-primary px-5 text-primary transition-colors hover:bg-primary-light md:w-[200px]"
            href="/anuncios"
          >
            Explorar
          </a>
        </div>
      </main>
    </div>
  );
}

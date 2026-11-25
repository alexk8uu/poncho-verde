import type { ReactNode } from "react";
import { Emblema } from "./Emblema";

/* Marco de las páginas de texto (privacidad, créditos): encabezado corto, una columna de lectura y el pie legal. */
export default function PaginaSimple({ titulo, bajada, children }: { titulo: string; bajada: string; children: ReactNode }) {
  return (
    <>
      <header className="border-b border-bosque/10">
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 md:px-10">
          <a href="/" className="flex min-h-11 items-center gap-3" aria-label="Poncho Verde, inicio">
            <Emblema className="h-8 w-8" />
            <span className="flex flex-col leading-none">
              <span className="text-[13px] font-medium uppercase tracking-[0.18em] [font-stretch:125%]">Poncho Verde</span>
              <span className="script -mt-0.5 text-[19px]">Fundación</span>
            </span>
          </a>
          <a href="/" className="etiqueta enlace">
            Volver al inicio
          </a>
        </div>
      </header>
      <main id="contenido" className="px-6 pb-28 pt-20 md:pt-28">
        <article className="mx-auto max-w-[680px]">
          <h1 className="ancho text-[clamp(2rem,1.5rem+2vw,3rem)]">{titulo}</h1>
          <p className="mt-6 text-[18px] leading-relaxed text-tinta-suave">{bajada}</p>
          <div className="texto-legal mt-12">{children}</div>
        </article>
      </main>
    </>
  );
}

import type { ReactNode } from "react";
import { Logotipo } from "./Marca";

/* Marco de las páginas de texto (privacidad, créditos): encabezado corto, una columna de lectura y el pie legal. */
export default function PaginaSimple({ titulo, bajada, children }: { titulo: string; bajada: string; children: ReactNode }) {
  return (
    <>
      <header className="border-b border-bosque/10">
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 md:px-10">
          <a href="/" className="flex min-h-11 items-center gap-3" aria-label="Poncho Verde, inicio">
            <Logotipo />
          </a>
          <a href="/" className="etiqueta enlace">
            Volver al inicio
          </a>
        </div>
      </header>
      <main id="contenido" className="px-6 pb-28 pt-20 md:pt-28">
        <article className="mx-auto max-w-[680px]">
          <h1 className="romana text-[clamp(2rem,1.5rem+2vw,3rem)]">{titulo}</h1>
          <p className="mt-6 text-[18px] leading-relaxed text-tinta-suave">{bajada}</p>
          <div className="texto-legal mt-12">{children}</div>
        </article>
      </main>
    </>
  );
}

"use client";

import { useCallback, useRef, useState } from "react";
import type { Foto } from "@/content/fotos";
import { Emblema } from "./Emblema";

type Diapositiva = { foto: Foto; lema: string };

/*
 * "La vida en la fundación": una foto a pantalla completa por lema, como la sección de cultura de la referencia.
 * No avanza solo: cada lema de abajo (o las flechas, o deslizar en el celular) cambia la foto.
 * Solo se descargan las fotos que se muestran, más la siguiente.
 */
export default function Carrusel({
  diapositivas,
  banda,
  titulo,
  script,
  intro,
}: {
  diapositivas: Diapositiva[];
  banda: string[];
  titulo: string;
  script: string;
  intro: string;
}) {
  const [actual, setActual] = useState(0);
  const [cargadas, setCargadas] = useState<Set<number>>(() => new Set([0, 1]));
  const toque = useRef<number | null>(null);
  const total = diapositivas.length;

  const ir = useCallback(
    (i: number) => {
      const n = (i + total) % total;
      setActual(n);
      setCargadas((prev) => new Set([...prev, n, (n + 1) % total]));
    },
    [total],
  );

  return (
    <section
      id="la-fundacion"
      aria-roledescription="carrusel"
      aria-labelledby="carrusel-h"
      className="relative flex min-h-[640px] flex-col overflow-hidden bg-bosque text-crema h-[100svh]"
      onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (toque.current === null) return;
        const dx = e.changedTouches[0].clientX - toque.current;
        if (Math.abs(dx) > 48) ir(actual + (dx < 0 ? 1 : -1));
        toque.current = null;
      }}
    >
      <div className="absolute inset-0">
        {diapositivas.map((d, i) => (
          <div
            key={d.foto.id}
            className={`pelicula absolute inset-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none ${
              i === actual ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== actual}
          >
            {cargadas.has(i) && (
              <img
                src={d.foto.src}
                srcSet={d.foto.srcSet}
                sizes="(orientation: portrait) 150vh, 100vw"
                width={d.foto.width}
                height={d.foto.height}
                alt={i === actual ? d.foto.alt : ""}
                loading="lazy"
                decoding="async"
                data-source={d.foto.fuente}
                data-subject={d.foto.tema}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/60 via-black/25 to-black/60" />
      </div>

      {/* banda de datos */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] items-center justify-between gap-4 px-6 pt-24 md:px-10">
        {banda.map((b, i) =>
          b === "emblema" ? (
            <Emblema key={i} className="h-7 w-7 shrink-0" />
          ) : (
            <span key={i} className={`etiqueta ${i === 0 || i === banda.length - 1 ? "" : "hidden sm:inline"}`}>
              {b}
            </span>
          ),
        )}
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h2 id="carrusel-h" className="ancho titulo-2">
          {titulo}
        </h2>
        <p className="script mt-3 text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] text-crema/90">{script}</p>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 pb-10 md:px-10">
        <p className="mb-4 text-center text-[13px] text-crema/85">{intro}</p>

        {/* pantallas grandes: los cuatro lemas en fila, separados por ◆ */}
        <div className="hidden items-center justify-between gap-4 lg:flex" role="group" aria-label="Elegir foto">
          {diapositivas.map((d, i) => (
            <div key={d.lema} className="contents">
              {i > 0 && (
                <span aria-hidden="true" className="text-[10px] text-dorado">
                  ◆
                </span>
              )}
              <button
                type="button"
                aria-pressed={i === actual}
                onClick={() => ir(i)}
                className={`etiqueta min-h-11 px-2 transition-colors ${
                  i === actual ? "text-crema underline decoration-naranja decoration-2 underline-offset-8" : "text-crema/70 hover:text-crema"
                }`}
              >
                {d.lema}
              </button>
            </div>
          ))}
        </div>

        {/* tablet y celular: flechas y el lema actual */}
        <div className="flex items-center justify-between gap-4 lg:hidden">
          <button
            type="button"
            onClick={() => ir(actual - 1)}
            aria-label="Foto anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-crema/50 hover:border-crema"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="etiqueta text-center">
            {diapositivas[actual].lema}
            <span className="ml-2 text-crema/60">
              {actual + 1}/{total}
            </span>
          </p>
          <button
            type="button"
            onClick={() => ir(actual + 1)}
            aria-label="Foto siguiente"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-crema/50 hover:border-crema"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          Foto {actual + 1} de {total}: {diapositivas[actual].lema}
        </p>
      </div>
    </section>
  );
}

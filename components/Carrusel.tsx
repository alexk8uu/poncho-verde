"use client";

import { useCallback, useRef, useState } from "react";
import type { Foto } from "@/content/fotos";
import { Sol } from "./Sol";

type Diapositiva = { foto: Foto; etiqueta: string };

/*
 * "La fundación y su tierra": una foto a pantalla completa, como la sección de cultura de la referencia.
 * No avanza solo: cada nombre de abajo (o las flechas, o deslizar en el celular) cambia la foto.
 * Solo se descargan las fotos que se muestran, más la siguiente.
 */
export default function Carrusel({
  diapositivas,
  banda,
  titulo,
  script,
}: {
  diapositivas: Diapositiva[];
  banda: string[];
  titulo: string;
  script: string;
}) {
  const [actual, setActual] = useState(0);
  const [cargadas, setCargadas] = useState<Set<number>>(() => new Set([0, 1]));
  const toque = useRef<{ x: number; y: number } | null>(null);
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
      className="relative flex h-[82svh] min-h-[560px] flex-col overflow-hidden bg-bosque text-crema md:h-[100svh] md:min-h-[640px]"
      onTouchStart={(e) => (toque.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchCancel={() => (toque.current = null)}
      onTouchEnd={(e) => {
        if (toque.current === null) return;
        const dx = e.changedTouches[0].clientX - toque.current.x;
        const dy = e.changedTouches[0].clientY - toque.current.y;
        // solo un deslizamiento claramente horizontal cambia la foto: el scroll vertical (aunque vaya en diagonal) no
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) ir(actual + (dx < 0 ? 1 : -1));
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
      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] items-center justify-center gap-5 px-6 pt-24 sm:justify-between sm:gap-4 md:px-10">
        {banda.map((b, i) =>
          b === "emblema" ? (
            <Sol key={i} className="h-9 w-9 shrink-0" />
          ) : (
            <span key={i} className={`etiqueta ${i === 0 || i === banda.length - 1 ? "hidden sm:inline" : ""}`}>
              {b}
            </span>
          ),
        )}
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h2 id="carrusel-h" className="romana titulo-2">
          {titulo}
        </h2>
        <p className="script mt-3 text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] text-crema/90">{script}</p>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 pb-10 md:px-10">
        {/* pantallas grandes: los cuatro nombres en fila, separados por ◆ */}
        <div className="hidden items-center justify-between gap-4 lg:flex" role="group" aria-label="Elegir foto">
          {diapositivas.map((d, i) => (
            <div key={d.etiqueta} className="contents">
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
                {d.etiqueta}
              </button>
            </div>
          ))}
        </div>

        {/* tablet y celular: flechas y el nombre de la foto actual */}
        <div className="flex items-center justify-between gap-4 lg:hidden">
          <button
            type="button"
            onClick={() => ir(actual - 1)}
            aria-label="Foto anterior"
            className="flecha-carrusel flex h-11 w-11 items-center justify-center rounded-full border border-crema/50 hover:border-crema"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="etiqueta text-center">
            {diapositivas[actual].etiqueta}
            <span className="ml-2 text-crema/75">
              {actual + 1}/{total}
            </span>
          </p>
          <button
            type="button"
            onClick={() => ir(actual + 1)}
            aria-label="Foto siguiente"
            className="flecha-carrusel flex h-11 w-11 items-center justify-center rounded-full border border-crema/50 hover:border-crema"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          Foto {actual + 1} de {total}: {diapositivas[actual].etiqueta}
        </p>
      </div>
    </section>
  );
}

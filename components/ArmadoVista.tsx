"use client";

import { useEffect, useRef, useState } from "react";
import { animarArmado, DURACION, ESCENAS, REPOSO } from "@/lib/armado";
import { Armado } from "./Armado";

/* Vista de prueba del armado: las dos versiones (sobre crema y sobre verde) con la misma línea de tiempo. */
export function ArmadoVista() {
  const claro = useRef<SVGSVGElement>(null);
  const oscuro = useRef<SVGSVGElement>(null);
  const animaciones = useRef<Animation[]>([]);
  const [t, setT] = useState(REPOSO);
  const [andando, setAndando] = useState(false);

  useEffect(() => {
    const todas = [claro.current, oscuro.current].flatMap((svg) => (svg ? animarArmado(svg) : []));
    animaciones.current = todas;
    const pedido = new URLSearchParams(location.search).get("t");
    const desde = pedido === null ? REPOSO : Number(pedido) || 0;
    todas.forEach((a) => {
      a.pause();
      a.currentTime = desde * 1000;
    });
    setT(desde);
    if (pedido === null && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      todas.forEach((a) => a.play());
      setAndando(true);
    }
    return () => todas.forEach((a) => a.cancel());
  }, []);

  useEffect(() => {
    if (!andando) return;
    let id = 0;
    const leer = () => {
      setT((Number(animaciones.current[0]?.currentTime ?? 0) / 1000) % DURACION);
      id = requestAnimationFrame(leer);
    };
    id = requestAnimationFrame(leer);
    return () => cancelAnimationFrame(id);
  }, [andando]);

  const ir = (s: number) => {
    animaciones.current.forEach((a) => (a.currentTime = s * 1000));
    setT(s);
  };
  const alternar = () => {
    animaciones.current.forEach((a) => (andando ? a.pause() : a.play()));
    setAndando(!andando);
  };

  const escena = [...ESCENAS].reverse().find(([s]) => t >= s)?.[1];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-sm bg-crema text-bosque ring-1 ring-bosque/15 [--papel:var(--color-crema)]">
          <Armado ref={claro} className="block h-auto w-full" />
        </div>
        <div className="rounded-sm bg-bosque text-crema [--papel:var(--color-bosque)]">
          <Armado ref={oscuro} className="block h-auto w-full" />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="boton boton--bosque min-w-28" onClick={alternar}>
          {andando ? "Pausa" : "Reproducir"}
        </button>
        <input
          type="range"
          min={0}
          max={DURACION}
          step={1 / 24}
          value={t}
          onChange={(e) => ir(Number(e.target.value))}
          aria-label="Posición en la animación"
          className="min-w-0 flex-1 accent-bosque"
        />
        <span className="w-28 text-right text-sm tabular-nums text-tinta-suave">
          {t.toFixed(1).replace(".", ",")} / {String(DURACION).replace(".", ",")} s · {escena}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {ESCENAS.map(([s, nombre]) => (
          <button
            key={nombre}
            type="button"
            onClick={() => ir(s + 0.01)}
            className={`rounded-full border px-3 py-1 text-sm ${escena === nombre ? "border-bosque bg-bosque text-crema" : "border-bosque/25"}`}
          >
            {nombre} <span className="tabular-nums opacity-70">{String(s).replace(".", ",")} s</span>
          </button>
        ))}
      </div>
    </div>
  );
}

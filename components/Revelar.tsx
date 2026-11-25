"use client";

import { useEffect } from "react";

/*
 * Entradas de sección sutiles: marca con data-visible cada [data-revelar] cuando entra en pantalla.
 * Nada se oculta hasta que el observador respondió por primera vez: en esa misma respuesta se marca lo que ya está
 * en pantalla y recién ahí se agrega la clase js-revelar (que oculta lo que falta). Sin JS, con un error antes de
 * ese punto o con movimiento reducido, la página se ve completa.
 */
export default function Revelar() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const raiz = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-revelar]"));
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            e.target.setAttribute("data-visible", "");
            io.unobserve(e.target);
          }
        }
        raiz.classList.add("js-revelar");
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

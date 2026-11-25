"use client";

import { useEffect } from "react";

/*
 * Desplazamiento suave solo para los enlaces internos (#servicios, #asociate…). No va en el CSS (scroll-behavior)
 * porque así también se suavizaría el salto que hace el navegador al mover el foco con Tab, y el foco quedaría un
 * momento fuera de la pantalla. Al llegar, el foco pasa a la sección, para quien navega con teclado o lector.
 */
export default function Anclas() {
  useEffect(() => {
    const alClic = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = decodeURIComponent(a.hash.slice(1));
      const destino = id ? document.getElementById(id) : null;
      if (!destino) return;
      e.preventDefault();
      const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      destino.scrollIntoView({ behavior: reducir ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", `#${id}`);
      if (!destino.hasAttribute("tabindex")) destino.setAttribute("tabindex", "-1");
      destino.focus({ preventScroll: true });
    };
    document.addEventListener("click", alClic);
    return () => document.removeEventListener("click", alClic);
  }, []);
  return null;
}

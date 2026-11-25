"use client";

import { useEffect, useRef, useState } from "react";
import { accionPrincipal, nav } from "@/content/sitio";
import { Emblema } from "./Emblema";

/*
 * El encabezado de la referencia: el emblema y el nombre a la izquierda, sobre la foto del hero y en crema;
 * al dejar el hero pasa a fondo crema con tinta verde. En pantallas chicas, las dos líneas abren un menú
 * a pantalla completa (Escape lo cierra y el foco vuelve al botón). En el celular, al dejar el hero aparece un botón
 * corto "Asociarme" junto al menú, para que la acción principal esté siempre a mano; se oculta sobre el formulario.
 */
export default function Encabezado() {
  const [solido, setSolido] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [enFormulario, setEnFormulario] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) {
      setSolido(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setSolido(!e.isIntersecting), { rootMargin: "-72px 0px 0px 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const seccion = document.getElementById("asociate");
    if (!seccion) return;
    const io = new IntersectionObserver(([e]) => setEnFormulario(e.isIntersecting), { threshold: 0.15 });
    io.observe(seccion);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
      }
    };
    document.addEventListener("keydown", alTeclear);
    return () => {
      document.body.style.overflow = previo;
      document.removeEventListener("keydown", alTeclear);
    };
  }, [abierto]);

  const claro = !solido || abierto;
  const cerrar = () => setAbierto(false);
  const accionMovil = solido && !abierto && !enFormulario;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ease-suave ${abierto ? "duration-[220ms]" : "duration-150"} ${
        claro ? "text-crema" : "border-b border-bosque/10 bg-crema text-bosque"
      } ${abierto ? "bg-bosque" : ""}`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 md:px-10">
        <a href="#inicio" className="flex min-h-11 items-center gap-3" onClick={cerrar} aria-label="Poncho Verde, inicio">
          <Emblema className="h-8 w-8" />
          <span className="flex flex-col leading-none">
            <span className="text-[13px] font-medium tracking-[0.18em] uppercase [font-stretch:125%]">Poncho Verde</span>
            <span className="script -mt-0.5 text-[19px]">Fundación</span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <a key={item.destino} href={item.destino} className="etiqueta enlace">
              {item.texto}
            </a>
          ))}
          <a href={accionPrincipal.destino} className="boton boton--borde">
            {accionPrincipal.texto}
          </a>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
        <a
          href={accionPrincipal.destino}
          tabIndex={accionMovil ? undefined : -1}
          aria-hidden={accionMovil ? undefined : true}
          className={`boton boton--bosque min-h-11 px-4 text-[11px] tracking-[0.14em] transition-[opacity,transform,background-color] ease-suave motion-reduce:transition-none ${abierto ? "duration-[220ms]" : "duration-150"} ${
            accionMovil ? "opacity-100" : "pointer-events-none translate-y-1 opacity-0"
          }`}
        >
          {accionPrincipal.corto}
        </a>
        <button
          ref={boton}
          type="button"
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[7px]"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setAbierto((v) => !v)}
        >
          <span
            className={`block h-px w-7 bg-current transition-transform ease-suave motion-reduce:transition-none ${abierto ? "translate-y-[4px] rotate-45 duration-[220ms]" : "duration-150"}`}
          />
          <span
            className={`block h-px w-7 bg-current transition-transform ease-suave motion-reduce:transition-none ${abierto ? "-translate-y-[4px] -rotate-45 duration-[220ms]" : "duration-150"}`}
          />
        </button>
        </div>
      </div>

      {/* cerrado: invisible e inerte (fuera del foco y de los lectores de pantalla); la clase anima la entrada y la salida */}
      <div
        id="menu-movil"
        data-abierto={abierto || undefined}
        inert={!abierto}
        className="menu-movil fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-bosque text-crema lg:hidden"
      >
        <div className="menu-movil__contenido px-6 pb-10 pt-8">
        <nav aria-label="Menú" className="flex flex-col">
          {nav.map((item) => (
            <a
              key={item.destino}
              href={item.destino}
              onClick={cerrar}
              className="ancho flex min-h-16 items-center border-b border-crema/15 text-[26px]"
            >
              {item.texto}
            </a>
          ))}
        </nav>
        <a href={accionPrincipal.destino} onClick={cerrar} className="boton boton--crema mt-10 w-full">
          {accionPrincipal.texto}
        </a>
        <Emblema className="mx-auto mt-14 h-10 w-10 opacity-60" />
        </div>
      </div>
    </header>
  );
}

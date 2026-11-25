"use client";

import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { enviarSolicitud, type EstadoSolicitud } from "@/app/acciones";
import { asociate } from "@/content/sitio";

type Clave = "nombre" | "email" | "telefono" | "mayorDeEdad" | "consentimiento";
const c = asociate.campos;

/** Lo mismo que valida el servidor (lib/asociacion/validar.ts), para avisar antes de enviar. */
function validar(f: HTMLFormElement): Partial<Record<Clave, string>> {
  const d = new FormData(f);
  const t = (k: string) => String(d.get(k) ?? "").trim();
  const e: Partial<Record<Clave, string>> = {};
  if (t("nombre").length < 3) e.nombre = c.nombre.error;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t("email"))) e.email = c.email.error;
  const dig = t("telefono").replace(/\D/g, "");
  if (dig.length < 8 || dig.length > 15) e.telefono = c.telefono.error;
  if (d.get("mayor_de_edad") !== "si") e.mayorDeEdad = c.mayorDeEdad.error;
  if (d.get("consentimiento") !== "si") e.consentimiento = c.consentimiento.error;
  return e;
}

const ID: Record<Clave, string> = {
  nombre: "f-nombre",
  email: "f-email",
  telefono: "f-telefono",
  mayorDeEdad: "f-edad",
  consentimiento: "f-consentimiento",
};

function MensajeError({ id, texto }: { id: string; texto?: string }) {
  return (
    <p id={id} className={`mt-2 flex items-start gap-2 text-[14px] leading-snug text-crema ${texto ? "" : "hidden"}`}>
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-dorado text-[11px] font-bold text-bordo"
      >
        !
      </span>
      {texto}
    </p>
  );
}

export default function FormularioAsociacion() {
  const [estado, accion, enviando] = useActionState<EstadoSolicitud, FormData>(enviarSolicitud, { estado: "inicial" });
  const [erroresLocales, setErroresLocales] = useState<Partial<Record<Clave, string>>>({});
  const listo = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);

  const errores = { ...(estado.estado === "invalido" ? estado.errores : {}), ...erroresLocales };

  useEffect(() => {
    if (estado.estado === "enviado") listo.current?.focus();
    if (estado.estado === "invalido" && estado.errores) {
      const primero = (Object.keys(estado.errores) as Clave[])[0];
      if (primero) document.getElementById(ID[primero])?.focus();
    }
  }, [estado]);

  if (estado.estado === "enviado") {
    return (
      <div ref={listo} tabIndex={-1} role="status" className="rounded-[2px] border border-crema/40 p-6 outline-none">
        <p className="script text-[30px]">¡Gracias!</p>
        <p className="mt-2 text-[17px] leading-relaxed">{asociate.enviado}</p>
      </div>
    );
  }

  const campo = (k: "nombre" | "email" | "telefono", tipo: string, auto: string, extra: object = {}) => (
    <div className="campo">
      <label htmlFor={ID[k]} className="etiqueta block text-crema/85">
        {c[k].etiqueta}
      </label>
      <input
        id={ID[k]}
        name={k}
        type={tipo}
        autoComplete={auto}
        required
        defaultValue={estado.valores?.[k] ?? ""}
        aria-invalid={errores[k] ? true : undefined}
        aria-describedby={`${ID[k]}-err`}
        onInput={() => errores[k] && setErroresLocales(({ [k]: _, ...resto }) => resto)}
        {...extra}
      />
      <MensajeError id={`${ID[k]}-err`} texto={errores[k]} />
    </div>
  );

  const casilla = (k: "mayorDeEdad" | "consentimiento", nombre: string, contenido: ReactNode) => (
    <div>
      <label htmlFor={ID[k]} className="casilla flex min-h-11 cursor-pointer items-start gap-3 py-2.5 text-[15px] leading-snug">
        <input
          id={ID[k]}
          name={nombre}
          type="checkbox"
          value="si"
          required
          aria-invalid={errores[k] ? true : undefined}
          aria-describedby={`${ID[k]}-err`}
          onChange={() => errores[k] && setErroresLocales(({ [k]: _, ...resto }) => resto)}
        />
        <span>{contenido}</span>
      </label>
      <MensajeError id={`${ID[k]}-err`} texto={errores[k]} />
    </div>
  );

  return (
    <form
      ref={form}
      action={accion}
      noValidate
      className="grid gap-6"
      onSubmit={(e) => {
        const e2 = validar(e.currentTarget);
        setErroresLocales(e2);
        const primero = (Object.keys(e2) as Clave[])[0];
        if (primero) {
          e.preventDefault();
          document.getElementById(ID[primero])?.focus();
        }
      }}
    >
      {campo("nombre", "text", "name", { minLength: 3, maxLength: 120 })}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {campo("email", "email", "email", { inputMode: "email", maxLength: 200 })}
        {campo("telefono", "tel", "tel", { inputMode: "tel" })}
      </div>
      <div className="grid gap-1">
        {casilla("mayorDeEdad", "mayor_de_edad", c.mayorDeEdad.etiqueta)}
        {casilla(
          "consentimiento",
          "consentimiento",
          <>
            {c.consentimiento.etiqueta}{" "}
            <a href="/privacidad" className="underline underline-offset-4">
              {c.consentimiento.enlace}
            </a>
          </>,
        )}
      </div>
      {/* campo trampa contra envíos automáticos: oculto para las personas */}
      <input type="text" name="empresa" tabIndex={-1} autoComplete="off" hidden aria-hidden="true" />
      <div className="flex flex-col items-start gap-4">
        <button type="submit" className="boton boton--crema text-bordo" disabled={enviando} aria-disabled={enviando}>
          {enviando ? asociate.enviando : "Solicitar asociación"}
        </button>
        <p role="status" className="min-h-[1.5em] text-[14px]">
          {estado.estado === "error" ? asociate.fallo : Object.keys(errores).length ? asociate.corregir : ""}
        </p>
      </div>
    </form>
  );
}

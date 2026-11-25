import type { Solicitud } from "./tipos";

export type ResultadoValidacion =
  | { ok: true; solicitud: Solicitud }
  | { ok: false; errores: Partial<Record<keyof Solicitud | "general", string>> };

const texto = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");

/** Valida en el servidor lo mismo que el formulario valida en el navegador. */
export function validarSolicitud(datos: FormData): ResultadoValidacion {
  // campo trampa: una persona nunca lo ve ni lo completa
  if (texto(datos.get("empresa"))) return { ok: false, errores: { general: "Solicitud rechazada." } };

  const nombre = texto(datos.get("nombre"));
  const email = texto(datos.get("email"));
  const telefono = texto(datos.get("telefono"));
  const mayorDeEdad = datos.get("mayor_de_edad") === "si";
  const consentimiento = datos.get("consentimiento") === "si";

  const errores: Partial<Record<keyof Solicitud, string>> = {};
  if (nombre.length < 3 || nombre.length > 120) errores.nombre = "Falta el nombre y apellido.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) errores.email = "El email no es válido.";
  const digitos = telefono.replace(/\D/g, "");
  if (digitos.length < 8 || digitos.length > 15) errores.telefono = "El teléfono no es válido.";
  if (!mayorDeEdad) errores.mayorDeEdad = "Falta confirmar la mayoría de edad.";
  if (!consentimiento) errores.consentimiento = "Falta el consentimiento.";

  if (Object.keys(errores).length) return { ok: false, errores };
  return {
    ok: true,
    solicitud: { nombre, email, telefono, mayorDeEdad: true, consentimiento: true, recibida: new Date().toISOString() },
  };
}

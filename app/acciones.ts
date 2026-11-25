"use server";

import { adaptadorActivo } from "@/lib/asociacion/adaptadores";
import { validarSolicitud } from "@/lib/asociacion/validar";
import { asociate } from "@/content/sitio";

export type EstadoSolicitud = {
  estado: "inicial" | "enviado" | "invalido" | "error";
  errores?: Partial<Record<"nombre" | "email" | "telefono" | "mayorDeEdad" | "consentimiento", string>>;
  // lo que la persona ya cargó, para devolvérselo intacto si algo falla (casillas incluidas)
  valores?: { nombre: string; email: string; telefono: string; mayorDeEdad: boolean; consentimiento: boolean };
};

/*
 * Recibe la solicitud de asociación (server action del formulario). Valida lo mismo que el navegador y la
 * entrega al adaptador elegido con ASOCIACION_ADAPTADOR (email por defecto, supabase o webhook de n8n).
 * El mensaje de recibido sale solo cuando el adaptador confirmó el envío.
 */
export async function enviarSolicitud(_previo: EstadoSolicitud, datos: FormData): Promise<EstadoSolicitud> {
  const valores = {
    nombre: String(datos.get("nombre") ?? ""),
    email: String(datos.get("email") ?? ""),
    telefono: String(datos.get("telefono") ?? ""),
    mayorDeEdad: datos.get("mayor_de_edad") === "si",
    consentimiento: datos.get("consentimiento") === "si",
  };
  const resultado = validarSolicitud(datos);
  if (!resultado.ok) {
    if ("general" in resultado.errores) return { estado: "error", valores };
    // los mismos textos que muestra el navegador
    const errores: EstadoSolicitud["errores"] = {};
    for (const k of ["nombre", "email", "telefono", "mayorDeEdad", "consentimiento"] as const) {
      if (resultado.errores[k]) errores[k] = asociate.campos[k].error;
    }
    return { estado: "invalido", errores, valores };
  }
  try {
    await adaptadorActivo().enviar(resultado.solicitud);
    return { estado: "enviado" };
  } catch (error) {
    console.error("[asociacion]", error instanceof Error ? error.message : error);
    return { estado: "error", valores };
  }
}

import { ErrorDeConfiguracion, ErrorDeEnvio, type AdaptadorAsociacion, type Solicitud } from "./tipos";

const requerida = (nombre: string) => {
  const valor = process.env[nombre];
  if (!valor) throw new ErrorDeConfiguracion(`Falta la variable de entorno ${nombre}.`);
  return valor;
};

const escapar = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Email (por defecto), con la API HTTP de Resend: https://resend.com/docs/api-reference/emails/send-email
 * Variables: RESEND_API_KEY, ASOCIACION_EMAIL_PARA (quién recibe), ASOCIACION_EMAIL_DE (remitente verificado).
 */
export const adaptadorEmail: AdaptadorAsociacion = {
  nombre: "email",
  async enviar(s: Solicitud) {
    const clave = requerida("RESEND_API_KEY");
    const para = requerida("ASOCIACION_EMAIL_PARA");
    const de = requerida("ASOCIACION_EMAIL_DE");
    const filas = [
      ["Nombre y apellido", s.nombre],
      ["Email", s.email],
      ["Teléfono o WhatsApp", s.telefono],
      ["Mayor de 18", "Sí"],
      ["Consentimiento Ley 25.326", "Sí"],
      ["Recibida", s.recibida],
    ];
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: de,
        to: para.split(",").map((x) => x.trim()),
        reply_to: s.email,
        subject: `Nueva solicitud de asociación: ${s.nombre}`,
        text: filas.map(([k, v]) => `${k}: ${v}`).join("\n"),
        html: `<table>${filas.map(([k, v]) => `<tr><th align="left">${escapar(k)}</th><td>${escapar(v)}</td></tr>`).join("")}</table>`,
      }),
    });
    if (!res.ok) throw new ErrorDeEnvio(`Resend respondió ${res.status}`);
  },
};

/**
 * Supabase: inserta la solicitud en una tabla por la API REST (PostgREST).
 * Variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY y, opcional, SUPABASE_TABLA (por defecto "solicitudes_asociacion").
 * Columnas esperadas: nombre, email, telefono, mayor_de_edad, consentimiento, recibida.
 */
export const adaptadorSupabase: AdaptadorAsociacion = {
  nombre: "supabase",
  async enviar(s: Solicitud) {
    const url = requerida("SUPABASE_URL").replace(/\/$/, "");
    const clave = requerida("SUPABASE_SERVICE_ROLE_KEY");
    const tabla = process.env.SUPABASE_TABLA || "solicitudes_asociacion";
    const res = await fetch(`${url}/rest/v1/${encodeURIComponent(tabla)}`, {
      method: "POST",
      headers: {
        apikey: clave,
        Authorization: `Bearer ${clave}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        nombre: s.nombre,
        email: s.email,
        telefono: s.telefono,
        mayor_de_edad: s.mayorDeEdad,
        consentimiento: s.consentimiento,
        recibida: s.recibida,
      }),
    });
    if (!res.ok) throw new ErrorDeEnvio(`Supabase respondió ${res.status}`);
  },
};

/**
 * Webhook (por ejemplo un flujo de n8n): POST con la solicitud en JSON.
 * Variables: ASOCIACION_WEBHOOK_URL y, opcional, ASOCIACION_WEBHOOK_SECRETO (va en el encabezado X-Webhook-Secret).
 */
export const adaptadorWebhook: AdaptadorAsociacion = {
  nombre: "webhook",
  async enviar(s: Solicitud) {
    const url = requerida("ASOCIACION_WEBHOOK_URL");
    const secreto = process.env.ASOCIACION_WEBHOOK_SECRETO;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(secreto ? { "X-Webhook-Secret": secreto } : {}) },
      body: JSON.stringify(s),
    });
    if (!res.ok) throw new ErrorDeEnvio(`El webhook respondió ${res.status}`);
  },
};

const adaptadores = { email: adaptadorEmail, supabase: adaptadorSupabase, webhook: adaptadorWebhook } as const;

/** Elige el adaptador con ASOCIACION_ADAPTADOR (email | supabase | webhook). Por defecto, email. */
export function adaptadorActivo(): AdaptadorAsociacion {
  const elegido = (process.env.ASOCIACION_ADAPTADOR || "email").toLowerCase() as keyof typeof adaptadores;
  const adaptador = adaptadores[elegido];
  if (!adaptador) throw new ErrorDeConfiguracion(`ASOCIACION_ADAPTADOR="${elegido}" no existe: usá email, supabase o webhook.`);
  return adaptador;
}

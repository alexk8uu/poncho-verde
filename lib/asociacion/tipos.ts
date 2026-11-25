export type Solicitud = {
  nombre: string;
  email: string;
  telefono: string;
  mayorDeEdad: true;
  consentimiento: true;
  recibida: string; // ISO 8601
};

/** Un destino para las solicitudes de asociación: email, Supabase o un webhook (n8n). */
export interface AdaptadorAsociacion {
  nombre: string;
  enviar(solicitud: Solicitud): Promise<void>;
}

export class ErrorDeEnvio extends Error {}
export class ErrorDeConfiguracion extends Error {}

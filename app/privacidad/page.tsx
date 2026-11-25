import type { Metadata } from "next";
import PaginaSimple from "@/components/PaginaSimple";
import { contacto } from "@/config/contacto";
import { marca, sede } from "@/content/sitio";

/*
 * Política de privacidad: texto base según la Ley 25.326 de Protección de los Datos Personales.
 * VALIDAR con la fundación (y su asesoría legal) antes de publicar.
 */

export const metadata: Metadata = {
  title: "Política de privacidad: Poncho Verde",
  description: "Cómo Poncho Verde trata los datos de la solicitud de asociación, según la Ley 25.326.",
  robots: { index: false },
};

export default function Privacidad() {
  return (
    <PaginaSimple
      titulo="Política de privacidad"
      bajada={`Esta política explica qué datos pide ${marca.nombre} en la solicitud de asociación, para qué los usa y cómo podés ejercer tus derechos, según la Ley 25.326 de Protección de los Datos Personales.`}
    >
      <h2>Qué datos pedimos</h2>
      <p>Tu nombre y apellido, tu email, tu teléfono o WhatsApp, y tu confirmación de que tenés 18 años o más.</p>

      <h2>Para qué los usamos</h2>
      <p>
        Solo para contactarte por tu solicitud de asociación. No los vendemos ni los compartimos con terceros para
        fines comerciales.
      </p>

      <h2>Quién es responsable</h2>
      <p>
        {marca.nombreCompleto}, con sede en {sede.calle}, {sede.ciudad}.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Podés pedir acceso, rectificación, actualización o supresión de tus datos en cualquier momento
        {contacto.email ? (
          <>
            , escribiendo a <a href={`mailto:${contacto.email}`}>{contacto.email}</a>
          </>
        ) : (
          <>, en nuestra sede</>
        )}
        . El derecho de acceso se ejerce en forma gratuita a intervalos no inferiores a seis meses, salvo un interés
        legítimo (artículo 14, inciso 3, de la Ley 25.326).
      </p>
      <p>
        La Agencia de Acceso a la Información Pública, como órgano de control de la Ley 25.326, atiende las denuncias
        y reclamos por incumplimiento de las normas de protección de datos personales.
      </p>
    </PaginaSimple>
  );
}

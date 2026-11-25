/*
 * Contactos públicos de la fundación. Completá cada valor cuando lo tengas: mientras esté vacío,
 * la página no lo muestra (nada de direcciones o usuarios inventados).
 *
 *   instagram: usuario sin @, por ejemplo "ponchoverde.salta"
 *   whatsapp:  número completo con código de país y de área, solo dígitos, por ejemplo "5493870000000"
 *   email:     dirección pública de contacto
 */
export const contacto = {
  instagram: "",
  whatsapp: "",
  email: "",
};

export const redes = [
  contacto.instagram && {
    nombre: "Instagram",
    url: `https://www.instagram.com/${contacto.instagram}/`,
  },
  contacto.whatsapp && {
    nombre: "WhatsApp",
    url: `https://wa.me/${contacto.whatsapp}`,
  },
  contacto.email && {
    nombre: "Email",
    url: `mailto:${contacto.email}`,
  },
].filter(Boolean) as { nombre: string; url: string }[];

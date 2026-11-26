/*
 * Contenido de la landing de Poncho Verde. Todo el texto de la página sale de acá.
 * Fuente: brief/BRIEF.md. Lo marcado `validar` es copy base: la fundación tiene que revisarlo antes de publicar.
 * Una pregunta con `respuesta: null` queda cargada pero no se muestra hasta que tenga respuesta.
 */

export const marca = {
  nombre: "Poncho Verde",
  nombreCompleto: "Poncho Verde — Fundación de Cannabis Medicinal",
  desde: 2026,
};

export const sede = {
  calle: "25 de Mayo 880",
  ciudad: "Salta Capital",
  // búsqueda en OpenStreetMap por la calle, sin coordenadas
  mapa: "https://www.openstreetmap.org/search?query=Calle%2025%20de%20Mayo%20880%2C%20Salta%2C%20Argentina",
  comoLlegar: "Cómo llegar a la sede",
};

// `corto`: la misma acción en el header del celular, donde no entra el texto completo
export const accionPrincipal = { texto: "Solicitar asociación", corto: "Asociarme", destino: "#asociate" };

export const meta = {
  titulo: "Poncho Verde: fundación de cannabis medicinal en Salta",
  descripcion:
    "Orientación sobre REPROCANN, acompañamiento, talleres y comunidad para pacientes y personas adultas, en nuestra sede de Salta Capital.",
};

export const nav = [
  { texto: "Servicios", destino: "#servicios" },
  { texto: "Quiénes somos", destino: "#quienes-somos" },
  { texto: "Preguntas", destino: "#preguntas" },
];

/* Lemas del brief (validar): la cinta y el carrusel */
export const lemas = ["Cultivar salud", "Más allá del estigma", "Desde Salta", "Información que cuida"];

/* El hero, minimalista: el nombre, debajo la bajada en caligráfica y el botón de la acción principal. */
export const hero = {
  titulo: "Poncho Verde",
  bajada: "Fundación de Cannabis Medicinal",
};

export const manifiesto = {
  validar: true,
  texto:
    "Poncho Verde nació para acompañar a pacientes y personas adultas en el uso responsable del cannabis medicinal, con información seria, comunidad y raíces en el norte argentino.",
  // datos confirmados en el brief (§1): van debajo del manifiesto, la primera prueba de confianza de la página
  datos: ["Sede en 25 de Mayo 880, Salta", "Más de 100 socios y pacientes", "Desde 2026"],
};

export const servicios = {
  titulo: "Cómo te acompaña la fundación",
  bajada: "Cuatro servicios para pacientes, socios y curiosos, en nuestra sede de Salta Capital.",
  validar: true,
  lista: [
    {
      clave: "reprocann",
      nombre: "Asesoramiento REPROCANN",
      descripcion: "Orientación para inscribirte en el registro nacional de pacientes con indicación médica.",
      paraQuien: "Pacientes",
    },
    {
      clave: "acompanamiento",
      nombre: "Acompañamiento",
      descripcion: "Seguimiento y contacto con profesionales para un uso responsable.",
      paraQuien: "Pacientes y socios",
    },
    {
      clave: "talleres",
      nombre: "Talleres y educación",
      descripcion: "Encuentros sobre cultivo, uso medicinal y marco legal.",
      paraQuien: "Socios y curiosos",
    },
    {
      clave: "comunidad",
      nombre: "Comunidad",
      descripcion: "Espacio de encuentro e intercambio en la sede.",
      paraQuien: "Socios",
    },
  ] as const,
};

export const quienesSomos = {
  titulo: "Creemos que el cannabis medicinal es salud, comunidad e información.",
  validar: true,
  // la sede y los socios ya están debajo del manifiesto: el marco de la foto lleva solo el lema
  marco: { script: "Desde Salta, desde 2026" },
};

export const carrusel = {
  banda: ["Poncho Verde", "Desde", "emblema", "2026", "Fundación"],
  titulo: "La fundación y su tierra",
  script: "Raíces en el norte argentino",
  // el nombre de lo que muestra cada foto (cambiar junto con las fotos cuando lleguen las de la fundación)
  etiquetas: ["Cultivo al aire libre", "Quebrada de las Conchas", "Camino a Cafayate", "Los Cardones"],
};

export const preguntas = {
  titulo: "Preguntas frecuentes",
  bajada: "Lo que más nos consultan antes de asociarse.",
  lista: [
    {
      pregunta: "¿Qué es Poncho Verde?",
      respuesta:
        "Una fundación de cannabis medicinal con sede en Salta Capital que acompaña a pacientes y socios con información y comunidad.",
    },
    {
      pregunta: "¿Quién puede asociarse?",
      respuesta: "Personas mayores de 18 años interesadas en el uso medicinal del cannabis.",
    },
    {
      pregunta: "¿Qué es el REPROCANN?",
      respuesta:
        "El registro del Ministerio de Salud de la Nación que, en el marco de la Ley 27.350, habilita a pacientes con indicación médica a acceder al cannabis. Te orientamos en el proceso.",
    },
    // Respuestas a definir por la fundación: se muestran cuando dejan de ser null.
    // `propuesta` es un borrador para que la fundación lo valide; no se publica: copiarlo a `respuesta` cuando esté confirmado.
    {
      pregunta: "¿Necesito REPROCANN para asociarme?",
      respuesta: null,
      propuesta:
        "No hace falta tenerlo para asociarte. Si todavía no lo tramitaste, te orientamos para inscribirte en el registro.",
    },
    {
      pregunta: "¿Tiene costo asociarse?",
      respuesta: null,
      propuesta: "Te contamos el costo y qué incluye cuando te contactamos, antes de que decidas asociarte.",
    },
    { pregunta: "¿Dónde están?", respuesta: "En 25 de Mayo 880, Salta Capital." },
  ] as { pregunta: string; respuesta: string | null; propuesta?: string }[],
};

export const asociate = {
  titulo: "Asociate a Poncho Verde",
  script: "Te esperamos en Salta",
  bajada: "Completá tus datos y te contactamos por WhatsApp o email en los próximos días. Para mayores de 18 años.",
  enviado: "Recibimos tu solicitud. Te vamos a contactar por WhatsApp o email en los próximos días.",
  // validar: la línea de compromiso junto al botón la tiene que confirmar la fundación
  compromiso: "Solicitar no te compromete: te contactamos para contarte cómo sigue y vos decidís.",
  boton: "Solicitar asociación",
  enviando: "Enviando…",
  fallo: {
    titulo: "No pudimos enviar la solicitud.",
    texto: "Tus datos siguen cargados: probá de nuevo en unos minutos.",
    alternativa: "Si sigue sin funcionar, acercate a la sede en 25 de Mayo 880, Salta Capital.",
  },
  corregir: "Revisá los campos marcados.",
  campos: {
    nombre: { etiqueta: "Nombre y apellido", error: "Escribí tu nombre y apellido." },
    email: { etiqueta: "Email", error: "Escribí un email válido, como nombre@correo.com." },
    telefono: {
      etiqueta: "Teléfono o WhatsApp",
      ayuda: "Con código de área, sin el 0 ni el 15.",
      error: "Escribí un teléfono con código de área, sin el 0 ni el 15.",
    },
    mayorDeEdad: { etiqueta: "Tengo 18 años o más", error: "Para asociarte tenés que tener 18 años o más." },
    consentimiento: {
      etiqueta: "Acepto que Poncho Verde guarde estos datos solo para contactarme, según la Ley 25.326.",
      enlace: "Política de privacidad",
      nuevaPestana: "(se abre en otra pestaña)",
      error: "Sin tu consentimiento no podemos guardar la solicitud.",
    },
  },
};

export const pie = {
  frase: "Salud, comunidad e información, desde el norte argentino.",
  columnas: [
    {
      titulo: "La fundación",
      enlaces: [
        { texto: "Servicios", destino: "#servicios" },
        { texto: "Quiénes somos", destino: "#quienes-somos" },
        { texto: "Preguntas frecuentes", destino: "#preguntas" },
      ],
    },
    {
      titulo: "Asociarse",
      enlaces: [
        { texto: "Solicitar asociación", destino: "#asociate" },
        { texto: "Política de privacidad", destino: "/privacidad" },
      ],
    },
  ],
};

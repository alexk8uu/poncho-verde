/*
 * Fotografías de la landing. TODAS son fotos temporales de Wikimedia Commons (licencias libres con uso comercial),
 * hasta que la fundación tenga fotos propias. Para reemplazar una: subí el archivo a public/assets/img, cambiá
 * `archivos` y las medidas, reescribí el `alt`, poné `fuente: "client"` y el crédito deja de mostrarse solo.
 */

export type Foto = {
  id: string;
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  tema: string;
  fuente: "stand-in" | "client";
  credito: { autor: string; licencia: string; licenciaUrl: string; pagina: string; titulo: string };
};

const dir = "/assets/img/";

/** Arma src y srcSet a partir de [ancho, archivo]; el src es el más grande. */
function archivos(lista: [number, string][]) {
  const orden = [...lista].sort((a, b) => a[0] - b[0]);
  return {
    src: dir + orden[orden.length - 1][1],
    srcSet: orden.map(([w, f]) => `${dir}${f} ${w}w`).join(", "),
  };
}
const serie = (id: string, anchos: number[]) => archivos(anchos.map((w) => [w, `photo-${id}-${w}.webp`]));

const CC_BY_2 = "https://creativecommons.org/licenses/by/2.0/deed.es";
const CC_BY_SA_2 = "https://creativecommons.org/licenses/by-sa/2.0/deed.es";
const CC_BY_SA_3 = "https://creativecommons.org/licenses/by-sa/3.0/deed.es";
const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/deed.es";
const PD = "https://creativecommons.org/publicdomain/mark/1.0/deed.es";

export const fotos = {
  hero: {
    id: "f41910525",
    ...serie("f41910525", [640, 960, 1280, 1920]),
    width: 1920,
    height: 1440,
    alt: "Planta de cannabis en flor al aire libre, con luz cálida de la tarde",
    tema: "planta de cannabis en flor",
    fuente: "stand-in",
    credito: { autor: "Rob Duval", licencia: "CC0", licenciaUrl: CC0, pagina: "https://commons.wikimedia.org/wiki/File:Cannabis_bloom.JPG", titulo: "Cannabis bloom" },
  },
  reprocann: {
    id: "f96200049",
    // recorte del original: el gotero y el frasco, sin la etiqueta comercial
    ...archivos([[480, "photo-f96200049-crop-480.webp"], [720, "photo-f96200049-crop-720.webp"]]),
    width: 720,
    height: 540,
    alt: "Un gotero que carga aceite de cannabis desde un frasco de vidrio ámbar",
    tema: "aceite de cannabis en gotero",
    fuente: "stand-in",
    credito: { autor: "elsaolofsson", licencia: "CC BY 2.0", licenciaUrl: CC_BY_2, pagina: "https://commons.wikimedia.org/wiki/File:Cannabis_oil_dropper.jpg", titulo: "Cannabis oil dropper" },
  },
  acompanamiento: {
    id: "f96200015",
    ...archivos([[500, "photo-f96200015-500.webp"], [960, "photo-f96200015-960.webp"], [1280, "photo-f96200015.webp"]]),
    width: 1280,
    height: 853,
    alt: "Hojas de una planta de cannabis de cerca, con un jardín desenfocado detrás",
    tema: "hoja de cannabis",
    fuente: "stand-in",
    credito: { autor: "elsaolofsson", licencia: "CC BY 2.0", licenciaUrl: CC_BY_2, pagina: "https://commons.wikimedia.org/wiki/File:Cannabis_plant_leaf.jpg", titulo: "Cannabis plant leaf" },
  },
  talleres: {
    id: "f39320123",
    ...archivos([[500, "photo-f39320123-500.webp"], [960, "photo-f39320123-960.webp"]]),
    width: 960,
    height: 638,
    alt: "Manos plantando un plantín en tierra suelta",
    tema: "manos plantando",
    fuente: "stand-in",
    credito: { autor: "USFS Region 5", licencia: "Dominio público", licenciaUrl: PD, pagina: "https://commons.wikimedia.org/wiki/File:Seedling_planting.jpg", titulo: "Seedling planting" },
  },
  comunidad: {
    id: "f3379762",
    ...archivos([[500, "photo-f3379762-500.webp"], [960, "photo-f3379762-960.webp"]]),
    width: 960,
    height: 720,
    alt: "Mate de metal con bombilla, apoyado sobre una piedra al aire libre",
    tema: "mate",
    fuente: "stand-in",
    credito: { autor: "Gonzalo Rivero Gorivero", licencia: "CC BY-SA 3.0", licenciaUrl: CC_BY_SA_3, pagina: "https://commons.wikimedia.org/wiki/File:Mate_plateado.jpg", titulo: "Mate plateado" },
  },
  filosofia: {
    id: "f97652147",
    ...serie("f97652147", [500, 960, 1280, 1600]),
    width: 1600,
    height: 822,
    alt: "Vista de la ciudad de Salta desde el cerro San Bernardo, con los cerros al fondo",
    tema: "ciudad de Salta",
    fuente: "stand-in",
    credito: { autor: "ViajeroExtraviado", licencia: "CC0", licenciaUrl: CC0, pagina: "https://commons.wikimedia.org/wiki/File:Ciudad_Salta_ARG.jpg", titulo: "Ciudad Salta ARG" },
  },
  cultivoSol: {
    id: "f57419160",
    ...serie("f57419160", [640, 960, 1280, 1920]),
    width: 1920,
    height: 1277,
    alt: "Plantas de cannabis creciendo al aire libre, entre árboles",
    tema: "cultivo de cannabis al aire libre",
    fuente: "stand-in",
    credito: { autor: "Cannabis Pictures", licencia: "CC BY 2.0", licenciaUrl: CC_BY_2, pagina: "https://commons.wikimedia.org/wiki/File:Cannabis_Ganja_Farm_(18460493035).jpg", titulo: "Cannabis Ganja Farm" },
  },
  asociate: {
    id: "f21152739",
    ...serie("f21152739", [640, 960, 1280, 1920]),
    width: 1920,
    height: 1280,
    alt: "Plantas de cannabis en flor bajo luz cálida, en macetas",
    tema: "cultivo de cannabis bajo techo",
    fuente: "stand-in",
    credito: { autor: "Cannabis Training University", licencia: "CC BY-SA 3.0", licenciaUrl: CC_BY_SA_3, pagina: "https://commons.wikimedia.org/wiki/File:Flowering_Cannabis_Plants.JPG", titulo: "Flowering Cannabis Plants" },
  },
  quebrada: {
    id: "f21885006",
    ...serie("f21885006", [640, 960, 1280, 1920]),
    width: 1920,
    height: 1280,
    alt: "Cerros rojizos de la Quebrada de las Conchas, en Salta, con el río al pie",
    tema: "Quebrada de las Conchas",
    fuente: "stand-in",
    credito: { autor: "Bachelot Pierre J-P", licencia: "CC BY-SA 3.0", licenciaUrl: CC_BY_SA_3, pagina: "https://commons.wikimedia.org/wiki/File:Quebrada_de_las_Conchas,_Province_de_Salta,_Argentine..JPG", titulo: "Quebrada de las Conchas" },
  },
  cafayate: {
    id: "f24779251",
    ...serie("f24779251", [640, 960, 1280, 1920]),
    width: 1920,
    height: 1280,
    alt: "Paredones de roca rojiza y estratificada en la Quebrada de las Conchas, camino a Cafayate",
    tema: "Quebrada de Cafayate",
    fuente: "stand-in",
    credito: { autor: "travelwayoflife", licencia: "CC BY-SA 2.0", licenciaUrl: CC_BY_SA_2, pagina: "https://commons.wikimedia.org/wiki/File:Quebrada_de_Cafayate_o_quebrada_de_las_conchas,_Argentina.jpg", titulo: "Quebrada de Cafayate o quebrada de las conchas" },
  },
  cardones: {
    id: "f22434948",
    ...serie("f22434948", [640, 960, 1280, 1920]),
    width: 1920,
    height: 1169,
    alt: "Cardones y guanacos en el Parque Nacional Los Cardones, Salta, con los cerros detrás",
    tema: "cardones en Salta",
    fuente: "stand-in",
    credito: { autor: "chispita_666", licencia: "CC BY 2.0", licenciaUrl: CC_BY_2, pagina: "https://commons.wikimedia.org/wiki/File:Los_Cardones_National_Park._Salta-Argentina..jpg", titulo: "Los Cardones National Park" },
  },
  pie: {
    id: "f4290849",
    ...serie("f4290849", [640, 960, 1280, 1920]),
    width: 1920,
    height: 1280,
    alt: "Ruta entre los cerros de la Quebrada de las Conchas, en Salta",
    tema: "cerros de Salta",
    fuente: "stand-in",
    credito: { autor: "GerthMichael", licencia: "CC BY-SA 3.0", licenciaUrl: CC_BY_SA_3, pagina: "https://commons.wikimedia.org/wiki/File:RN68_Quebrada_de_las_Conchas.jpg", titulo: "RN68 Quebrada de las Conchas" },
  },
} satisfies Record<string, Foto>;

export const creditos = Object.values(fotos)
  .filter((f) => f.fuente === "stand-in")
  .map((f) => f.credito);

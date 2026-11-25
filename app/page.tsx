import Anclas from "@/components/Anclas";
import Carrusel from "@/components/Carrusel";
import Encabezado from "@/components/Encabezado";
import Pie from "@/components/Pie";
import Revelar from "@/components/Revelar";
import { Asociate, Cinta, Hero, Manifiesto, Preguntas, QuienesSomos, Servicios } from "@/components/Secciones";
import { fotos } from "@/content/fotos";
import { carrusel, lemas } from "@/content/sitio";

/*
 * La landing, en el orden del brief y con los recursos de la referencia:
 * hero centrado sobre foto → manifiesto con el emblema → cinta → servicios en postales → quiénes somos con foto
 * enmarcada → carrusel de la fundación → preguntas → asociate (formulario) → pie en dos partes.
 */
export default function Inicio() {
  const diapositivas = [fotos.cultivoSol, fotos.quebrada, fotos.cafayate, fotos.cardones].map((foto, i) => ({
    foto,
    lema: lemas[i],
  }));

  return (
    <>
      <Encabezado />
      <main id="contenido">
        <Hero />
        <Manifiesto />
        <Cinta giro="abajo" />
        <Servicios />
        <Cinta giro="arriba" sentido="derecha" />
        <QuienesSomos />
        <Carrusel diapositivas={diapositivas} {...carrusel} />
        <Preguntas />
        <Asociate />
      </main>
      <Pie />
      <Revelar />
      <Anclas />
    </>
  );
}

import type { CSSProperties } from "react";
import { fotos, type Foto } from "@/content/fotos";
import {
  accionPrincipal,
  asociate,
  hero,
  lemas,
  manifiesto,
  preguntas,
  quienesSomos,
  sede,
  servicios,
} from "@/content/sitio";
import { Emblema, Estampilla, Sello } from "./Emblema";
import FormularioAsociacion from "./FormularioAsociacion";
import { Franja, Sol } from "./Marca";

/** Una foto con los datos que pide el checker (data-source, data-subject). */
function Imagen({
  foto,
  sizes,
  className = "",
  prioridad,
  posicion,
}: {
  foto: Foto;
  sizes: string;
  className?: string;
  prioridad?: boolean;
  posicion?: string;
}) {
  return (
    <img
      src={foto.src}
      srcSet={foto.srcSet}
      sizes={sizes}
      width={foto.width}
      height={foto.height}
      alt={foto.alt}
      loading={prioridad ? "eager" : "lazy"}
      fetchPriority={prioridad ? "high" : undefined}
      decoding="async"
      data-source={foto.fuente}
      data-subject={foto.tema}
      className={`h-full w-full object-cover ${className}`}
      style={posicion ? { objectPosition: posicion } : undefined}
    />
  );
}

const Flecha = () => (
  <svg className="flecha" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* 1 · Hero: foto de cultivo a pantalla completa con tono de película; el nombre, la bajada en caligráfica y el botón */
export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-h" className="relative flex h-[100svh] min-h-[600px] flex-col overflow-hidden bg-bosque text-crema">
      <div className="pelicula absolute inset-0">
        <Imagen foto={fotos.hero} sizes="(orientation: portrait) 134vh, 100vw" prioridad posicion="50% 45%" className="entrada-foto" />
      </div>
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,rgb(15_25_18/0.58),rgb(15_25_18/0.3)_75%)]" />
      <div className="absolute inset-x-0 top-0 z-[2] h-44 bg-gradient-to-b from-black/60 to-transparent" />

      {/* el bloque de texto del logo: el nombre, un filete, la bajada en versales espaciadas y la franja del sol */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 id="hero-h" className="flex w-fit max-w-full flex-col items-center [text-shadow:0_2px_30px_rgb(0_0_0/0.4)]">
          <span className="romana entrada text-[clamp(2.35rem,1.2rem+5vw,5.5rem)] font-extrabold leading-[0.95] tracking-[0.01em] [--retraso:100ms] [--dura:700ms] [--sube:14px]">
            {hero.titulo}
          </span>{" "}
          {/* el espacio separa las dos líneas para buscadores y lectores de pantalla */}
          <span aria-hidden="true" className="extender mt-3 block h-[2px] w-full bg-crema/80 md:mt-4 [--retraso:160ms]" />
          <span className="romana entrada mt-3 text-[clamp(0.85rem,0.68rem+0.7vw,1.3rem)] font-semibold uppercase leading-[1.35] tracking-[0.15em] text-crema/95 sm:tracking-[0.2em] md:mt-4 [--retraso:220ms] [--dura:600ms] [--sube:10px]">
            {hero.bajada}
          </span>
        </h1>
        <Franja entrada cara className="mt-5 text-crema [--s:40px] md:mt-6 md:[--s:54px]" />
        <a href={accionPrincipal.destino} className="boton boton--crema entrada mt-10 [--retraso:460ms] [--dura:600ms] [--sube:8px]">
          {accionPrincipal.texto}
          <Flecha />
        </a>
      </div>
    </section>
  );
}

/* 2 · Manifiesto: el emblema y la misión en un párrafo grande centrado */
export function Manifiesto() {
  return (
    <section aria-label="Nuestra misión" className="px-6 py-28 md:px-10 md:py-40">
      <div data-revelar className="mx-auto flex max-w-[860px] flex-col items-center text-center">
        <Emblema className="h-10 w-10 text-bosque" />
        <p className="ancho mt-8 text-[clamp(1.35rem,1rem+1.3vw,2.1rem)] leading-[1.35]">{manifiesto.texto}</p>
        {/* los datos confirmados, legibles: la primera prueba de confianza después del hero */}
        <ul className="mt-12 flex flex-col items-center gap-x-5 gap-y-2 text-[16px] font-medium text-bosque sm:flex-row sm:flex-wrap sm:justify-center">
          {manifiesto.datos.map((d, i) => (
            <li key={d} className="flex items-center gap-5">
              {i > 0 && (
                <span aria-hidden="true" className="hidden text-[9px] text-bordo sm:inline">
                  ◆
                </span>
              )}
              {d}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/*
 * 3 · Cinta: la línea verde con el emblema y los lemas que separa una sección de la otra. Corre en loop lento,
 * apenas inclinada (giro "abajo": baja hacia la derecha; "arriba": sube) y se pausa con el puntero encima.
 * La pista lleva dos copias iguales y se desplaza la mitad de su ancho, así el loop no tiene salto.
 */
export function Cinta({ giro, sentido = "izquierda" }: { giro: "abajo" | "arriba"; sentido?: "izquierda" | "derecha" }) {
  // cuatro vueltas de lemas por copia: alcanzan para cubrir pantallas de hasta ~2700px sin hueco en el loop
  const tanda = [...lemas, ...lemas, ...lemas, ...lemas];
  // entre lema y lema, la hoja y el sol del logo, alternados
  const copia = (n: number) =>
    tanda.map((l, i) => (
      <span key={`${n}-${i}`} className="flex items-center gap-6 pr-6">
        {i % 2 ? <Sol className="h-[22px] w-[22px]" /> : <Emblema className="h-[18px] w-[18px]" />}
        <span className="script text-[20px] leading-none">{l}</span>
      </span>
    ));
  return (
    <div aria-hidden="true" className="cinta relative z-10 h-11 overflow-x-clip">
      <div
        className={`absolute inset-y-0 -left-[5%] flex w-[110%] items-center overflow-hidden bg-bosque text-crema shadow-[0_10px_24px_-14px_rgb(20_30_22/0.6)] ${
          giro === "abajo" ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"
        }`}
      >
        <div className={`cinta__pista flex w-max shrink-0 items-center whitespace-nowrap ${sentido === "derecha" ? "cinta__pista--derecha" : ""}`}>
          {copia(0)}
          {copia(1)}
        </div>
      </div>
    </div>
  );
}

/* 4 · Servicios: título centrado y cuatro postales rotadas y superpuestas, cada una con su foto */
const ROT = ["-3deg", "2.5deg", "-1.5deg", "3deg"];
/* la ola de las postales: la primera lidera (más recorrido), las demás la siguen con saltos que se achican */
const RETRASO = ["0ms", "70ms", "120ms", "150ms"];
const SUBE = ["32px", "24px", "20px", "18px"];
const FOTO_SERVICIO: Record<string, Foto> = {
  reprocann: fotos.reprocann,
  acompanamiento: fotos.acompanamiento,
  talleres: fotos.talleres,
  comunidad: fotos.comunidad,
};
const POS_SERVICIO: Record<string, string> = { acompanamiento: "50% 40%" };

export function Servicios() {
  return (
    <section id="servicios" aria-labelledby="servicios-h" className="overflow-hidden px-6 pb-28 pt-28 md:px-10 md:pb-40 md:pt-36">
      <div data-revelar className="mx-auto max-w-[640px] text-center">
        <h2 id="servicios-h" className="romana titulo-2">
          {servicios.titulo}
        </h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-[15px] text-tinta-suave">{servicios.bajada}</p>
      </div>

      <ul className="mx-auto mt-16 grid max-w-[1240px] grid-cols-1 gap-7 sm:grid-cols-2 sm:justify-items-center sm:gap-10 lg:flex lg:justify-center lg:gap-0">
        {servicios.lista.map((s, i) => (
          <li
            key={s.clave}
            data-revelar
            className={`postal flex w-full max-w-[300px] flex-col sm:max-w-[330px] ${i % 2 ? "justify-self-end" : "justify-self-start"} sm:justify-self-center p-4 pb-5 text-crema lg:w-[236px] lg:max-w-none xl:w-[292px] ${
              i % 2 ? "bg-bordo lg:mt-8" : "bg-bosque"
            } ${i > 0 ? "lg:-ml-4" : ""} ${i < servicios.lista.length - 1 ? "lg:pr-8" : ""}`}
            style={{ "--rot": ROT[i], "--retraso": RETRASO[i], "--sube": SUBE[i] } as CSSProperties}
          >
            <h3 className="ancho text-[19px] leading-tight">{s.nombre}</h3>
            <p className="mt-2 min-h-[4.1em] text-[14px] leading-snug text-crema/90">{s.descripcion}</p>
            <div className="pelicula zoom mt-4 aspect-[4/3]">
              <Imagen foto={FOTO_SERVICIO[s.clave]} sizes="(max-width: 639px) 300px, 300px" posicion={POS_SERVICIO[s.clave]} />
            </div>
            <p className="etiqueta mt-4 text-crema/90">
              <span className="text-crema/80">Para </span>
              {s.paraQuien}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* 5 · Quiénes somos: la frase de filosofía y una foto enmarcada con estampilla y sello */
export function QuienesSomos() {
  return (
    <section id="quienes-somos" aria-labelledby="quienes-h" className="overflow-x-clip px-6 py-28 md:px-10 md:py-36">
      <div data-revelar className="mx-auto max-w-[760px] text-center">
        <h2 id="quienes-h" className="romana titulo-2">
          {quienesSomos.titulo}
        </h2>
      </div>

      <figure data-revelar className="relative mx-auto mt-14 max-w-[944px] bg-bosque p-3 text-crema md:p-4">
        <div className="pelicula zoom aspect-[16/10] md:aspect-[16/9]">
          <Imagen foto={fotos.filosofia} sizes="(max-width: 960px) 100vw, 900px" posicion="50% 55%" />
        </div>
        <figcaption className="px-1 pb-1 pr-24 pt-4">
          <span className="script text-[26px] leading-none md:text-[30px]">{quienesSomos.marco.script}</span>
        </figcaption>

        <Estampilla
          id="estampilla-quienes"
          className="absolute -left-3 -top-6 h-[76px] w-[64px] -rotate-[8deg] text-bosque lg:-left-7 lg:-top-8"
        />
        <Sello
          id="sello-quienes"
          texto="PONCHO VERDE ◆ SALTA ◆ DESDE 2026 ◆ "
          centro="sol"
          className="absolute -bottom-9 -right-3 h-[92px] w-[92px] rotate-[12deg] text-bosque md:h-[104px] md:w-[104px] lg:-right-9"
        />
      </figure>
    </section>
  );
}

/* 7 · Preguntas: acordeón centrado */
export function Preguntas() {
  const visibles = preguntas.lista.filter((p) => p.respuesta);
  return (
    <section id="preguntas" aria-labelledby="preguntas-h" className="px-6 py-28 md:px-10 md:py-36">
      <div data-revelar className="mx-auto max-w-[720px]">
        <div className="text-center">
          <Franja tam={30} className="text-bosque" />
          <h2 id="preguntas-h" className="romana titulo-2 mt-7">
            {preguntas.titulo}
          </h2>
          <p className="mt-3 text-[15px] text-tinta-suave">{preguntas.bajada}</p>
        </div>
        <div className="mt-12 border-t border-bosque/20">
          {visibles.map((p, i) => (
            <details key={p.pregunta} className="pregunta border-b border-bosque/20" open={i === 0}>
              <summary className="flex min-h-16 items-center justify-between gap-6 py-4">
                <h3 className="ancho text-[17px] leading-snug md:text-[19px]">{p.pregunta}</h3>
                <span aria-hidden="true" className="signo flex h-8 w-8 flex-none items-center justify-center rounded-full border border-bosque/30 text-[18px] leading-none">
                  +
                </span>
              </summary>
              <p className="max-w-[60ch] pb-6 pr-14 text-[15px] leading-relaxed text-tinta-suave">{p.respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 8 · Asociate: texto y formulario sobre bordó, foto al lado y el sello en la unión */
export function Asociate() {
  return (
    <section id="asociate" aria-labelledby="asociate-h" className="pb-16 sm:px-6 sm:pb-28 md:px-10 md:pb-36">
      <div data-revelar className="relative mx-auto grid max-w-[1240px] overflow-visible lg:grid-cols-2">
        <div className="pelicula order-first h-64 sm:h-80 lg:order-last lg:h-auto">
          {/* en pantallas grandes la foto llena una columna alta: se recorta a lo ancho, por eso pide más ancho */}
          <Imagen foto={fotos.asociate} sizes="(max-width: 1023px) 100vw, 1650px" posicion="55% 100%" className="origin-bottom scale-[1.2]" />
        </div>
        <div className="bg-bordo px-6 py-12 text-crema sm:px-10 md:px-14 md:py-16">
          <h2 id="asociate-h" className="romana titulo-2">
            {asociate.titulo}
          </h2>
          <p className="script mt-2 text-[30px] text-crema/90">{asociate.script}</p>
          <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-crema">{asociate.bajada}</p>
          <div className="mt-10">
            <FormularioAsociacion />
          </div>
          <p className="etiqueta mt-10 border-t border-crema/25 pt-6 text-crema/80">
            Sede: <span className="normal-case tracking-normal text-[14px] text-crema">{sede.calle}, {sede.ciudad}</span>
          </p>
        </div>
        <Sello
          id="sello-asociate"
          texto="ASOCIATE ◆ PONCHO VERDE ◆ SALTA ◆ "
          className="pointer-events-none absolute right-6 top-64 h-[96px] w-[96px] -translate-y-1/2 -rotate-[10deg] text-bordo sm:top-80 lg:left-1/2 lg:right-auto lg:top-24 lg:-translate-x-1/2"
        />
      </div>
    </section>
  );
}

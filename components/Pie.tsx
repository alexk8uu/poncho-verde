import { redes } from "@/config/contacto";
import { creditos, fotos } from "@/content/fotos";
import { marca, pie, sede } from "@/content/sitio";

/*
 * El pie en dos partes, como la referencia: un bloque verde con la frase y los enlaces, y un cierre sobre una
 * foto de los cerros salteños con el logo completo grande (la ilustración circular del brief), "Desde" y "2026"
 * a los lados, una línea punteada y la fila legal.
 */
export default function Pie() {
  const anio = new Date().getFullYear();
  return (
    <footer className="text-crema">
      <div className="bg-bosque px-6 pb-20 pt-20 md:px-10 md:pt-24">
        <div className="mx-auto grid max-w-[1240px] gap-14 xl:grid-cols-12">
          <p className="ancho text-[clamp(1.5rem,1.2rem+1.2vw,2.2rem)] leading-[1.25] xl:col-span-5">{pie.frase}</p>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 xl:col-span-6 xl:col-start-7">
            {pie.columnas.map((col) => (
              <div key={col.titulo}>
                <p className="etiqueta text-crema/70">{col.titulo}</p>
                <ul className="mt-4 grid gap-1 text-[14px]">
                  {col.enlaces.map((e) => (
                    <li key={e.destino}>
                      <a href={e.destino} className="enlace inline-flex min-h-11 items-center">
                        {e.texto}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-1">
              <p className="etiqueta text-crema/70">Sede</p>
              <address className="mt-4 text-[14px] not-italic leading-relaxed">
                {sede.calle}
                <br />
                {sede.ciudad}
              </address>
              <a href={sede.mapa} className="enlace mt-1 inline-flex min-h-11 items-center text-[14px]">
                {sede.comoLlegar}
              </a>
              {redes.length > 0 && (
                <ul className="mt-3 grid gap-1 text-[14px]">
                  {redes.map((r) => (
                    <li key={r.nombre}>
                      <a href={r.url} className="enlace inline-flex min-h-11 items-center">
                        {r.nombre}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pelicula relative flex min-h-[440px] flex-col bg-bosque md:min-h-[520px]">
        <img
          src={fotos.pie.src}
          srcSet={fotos.pie.srcSet}
          sizes="(max-width: 767px) 700px, 100vw"
          width={fotos.pie.width}
          height={fotos.pie.height}
          alt=""
          loading="lazy"
          decoding="async"
          data-source={fotos.pie.fuente}
          data-subject={fotos.pie.tema}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "50% 60%" }}
        />
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/55 via-black/50 to-black/70" />

        <div className="relative z-10 flex flex-1 items-center justify-center gap-6 px-6 pt-12 md:gap-10">
          <span className="etiqueta pill bg-black/40 text-crema">Desde</span>
          <img
            src="/assets/logo/poncho-verde-320.webp"
            width={320}
            height={320}
            alt="Logo de Poncho Verde: un gaucho con poncho verde frente a los cerros salteños al atardecer"
            loading="lazy"
            className="h-36 w-36 rounded-full shadow-[0_20px_60px_-20px_rgb(0_0_0/0.7)] md:h-44 md:w-44"
          />
          <span className="etiqueta pill bg-black/40 text-crema">{marca.desde}</span>
        </div>

        <div className="relative z-10 px-6 pb-8 md:px-10">
          <div className="mx-auto max-w-[1240px]">
          <div className="border-t border-dashed border-crema/45" />
          <div className="flex flex-col gap-3 pt-5 text-[13px] text-crema/90 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {anio} {marca.nombreCompleto}
            </p>
            {/* la política de privacidad ya está en la columna "Asociarse": acá solo los créditos de las fotos */}
            {creditos.length > 0 && (
              <a href="/creditos" className="enlace inline-flex min-h-11 items-center self-start sm:self-auto">
                Fotos vía Wikimedia Commons
              </a>
            )}
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

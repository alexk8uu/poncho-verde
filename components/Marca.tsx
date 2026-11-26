import type { CSSProperties } from "react";
import { Emblema } from "./Emblema";
import { Sol } from "./Sol";

export { Sol };

/*
 * Piezas tomadas del logo (brief/refs/ref-logo.jpeg), que el cliente pidió llevar a la web:
 * - el Sol de Mayo, con sus rayos rectos y ondulados alternados;
 * - la franja que cierra el logo: línea · barra bordó · sol · barra celeste · línea (Salta y la Argentina);
 * - el logotipo escrito como en el logo: romanas en versalitas (Cinzel; las minúsculas salen como versalitas).
 */

/*
 * La franja del logo. `--s` fija el tamaño del sol; las líneas, las barras y los huecos salen en proporción
 * (medidas tomadas del logo). Las líneas van en el color del texto; las barras, en bordó y celeste.
 * `entrada`: en el hero, el sol aparece y las barras y las líneas se extienden hacia afuera desde él.
 */
export function Franja({
  tam,
  cara = false,
  entrada = false,
  className = "",
}: {
  /** diámetro del sol en px; sin él, lo fija la clase (`[--s:40px] md:[--s:56px]`) */
  tam?: number;
  cara?: boolean;
  entrada?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`franja ${entrada ? "franja--entrada" : ""} ${className}`}
      style={tam ? ({ "--s": `${tam}px` } as CSSProperties) : undefined}
    >
      <span className="franja__linea franja__izq" />
      <span className="franja__barra franja__izq bg-bordo" />
      <Sol className="franja__sol" cara={cara} />
      <span className="franja__barra franja__der bg-celeste" />
      <span className="franja__linea franja__der" />
    </div>
  );
}

/*
 * El logotipo del encabezado: la hoja y "Poncho Verde" en la romana del logo, con "Fundación" debajo en versales
 * espaciadas, como la bajada del logo.
 */
export function Logotipo() {
  return (
    <>
      <Emblema className="h-8 w-8" />
      <span className="flex flex-col leading-none">
        <span className="romana whitespace-nowrap text-[19px] font-bold tracking-[0.03em]">Poncho Verde</span>
        <span className="romana mt-1 text-[9.5px] font-semibold uppercase tracking-[0.34em]">Fundación</span>
      </span>
    </>
  );
}

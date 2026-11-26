import { useId } from "react";
import { COGOLLO_VIEWBOX, CogolloMascara } from "./Cogollo";
import { SolTrazos } from "./Sol";

/*
 * El emblema de la marca, de un color (toma el color del texto). Se usa en el encabezado, el menú, el manifiesto,
 * la cinta, la estampilla y el sello. El logo completo (la ilustración circular) se usa solo grande, en el pie.
 *
 * Cada marca es una máscara: lo blanco se ve y lo negro queda hueco, así los dibujos con líneas internas recortadas
 * funcionan sobre la foto, sobre crema y sobre verde. La marca vigente se elige en MARCA.
 */
export const HOJA =
  "M0,0C3.96,-9 4.62,-27.5 0,-50C-4.62,-27.5 -3.96,-9 0,0ZM0,0C6.59,-5.73 13.78,-20.36 17.9,-40.2C5.91,-23.86 -0.15,-8.74 0,0ZM0,0C0.15,-8.74 -5.91,-23.86 -17.9,-40.2C-13.78,-20.36 -6.59,-5.73 0,0ZM0,0C6.71,-1.52 16.69,-9.2 26.05,-21.85C11.96,-14.84 2.66,-6.35 0,0ZM0,0C-2.66,-6.35 -11.96,-14.84 -26.05,-21.85C-16.69,-9.2 -6.71,-1.52 0,0ZM0,0C4.34,1.79 12.43,0.79 21.67,-3.82C11.41,-5 3.46,-3.17 0,0ZM0,0C-3.46,-3.17 -11.41,-5 -21.67,-3.82C-12.43,0.79 -4.34,1.79 0,0ZM0.9,-1L-0.9,-1L-1.3,16Q0,17.4 1.3,16Z";

const MARCAS = {
  hoja: { viewBox: "-34 -52 68 70", Mascara: () => <path d={HOJA} fill="#fff" /> },
  cogollo: { viewBox: COGOLLO_VIEWBOX, Mascara: CogolloMascara },
};
const MARCA = MARCAS.cogollo;

/** La marca dentro de un SVG: un rectángulo del color del texto recortado por la máscara del dibujo. */
function MarcaTrazos({ id }: { id: string }) {
  const [x, y, w, h] = MARCA.viewBox.split(" ").map(Number);
  return (
    <>
      <mask id={id} maskUnits="userSpaceOnUse" x={x} y={y} width={w} height={h}>
        <MARCA.Mascara />
      </mask>
      <rect x={x} y={y} width={w} height={h} fill="currentColor" mask={`url(#${id})`} />
    </>
  );
}

export function Emblema({ className = "", titulo }: { className?: string; titulo?: string }) {
  const id = `marca${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg
      className={className}
      viewBox={MARCA.viewBox}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
    >
      <MarcaTrazos id={id} />
    </svg>
  );
}

/**
 * Sello circular: un texto alrededor, en la romana del logo, y al centro la marca o el sol del logo.
 * `id` tiene que ser único en la página.
 */
export function Sello({
  id,
  texto,
  centro = "marca",
  className = "",
}: {
  id: string;
  texto: string;
  centro?: "marca" | "sol";
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="48" fill="var(--color-crema)" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="29" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <defs>
        <path id={id} d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
      </defs>
      <text fill="currentColor" fontSize="7.8" fontWeight="700" letterSpacing="1.2" fontFamily="var(--font-romana)">
        <textPath href={`#${id}`} textLength="228" lengthAdjust="spacing">
          {texto}
        </textPath>
      </text>
      {centro === "sol" ? (
        <svg x="27" y="27" width="46" height="46" viewBox="-50 -50 100 100">
          <SolTrazos />
        </svg>
      ) : (
        <svg x="35" y="33" width="30" height="34" viewBox={MARCA.viewBox}>
          <MarcaTrazos id={`${id}-marca`} />
        </svg>
      )}
    </svg>
  );
}

/*
 * Estampilla: un rectángulo de papel crema con el borde troquelado (medios círculos parejos en los cuatro lados),
 * un filete interior y el emblema. Las medidas son múltiplos del paso del troquel, así las esquinas cierran justas.
 * `id` tiene que ser único en la página.
 */
export function Estampilla({ id, className = "" }: { id: string; className?: string }) {
  const W = 60;
  const H = 72;
  const PASO = 6;
  const R = 2.1;
  const agujeros: [number, number][] = [];
  for (let x = 0; x <= W; x += PASO) agujeros.push([x, 0], [x, H]);
  for (let y = PASO; y < H; y += PASO) agujeros.push([0, y], [W, y]);
  return (
    <svg className={`estampilla ${className}`} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
      <defs>
        <mask id={id}>
          <rect width={W} height={H} fill="#fff" />
          {agujeros.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={R} fill="#000" />
          ))}
        </mask>
      </defs>
      <rect width={W} height={H} fill="var(--color-crema)" mask={`url(#${id})`} />
      <rect x="6.5" y="6.5" width={W - 13} height={H - 13} fill="none" stroke="currentColor" strokeWidth="0.9" />
      <svg x="15" y="19" width="30" height="34" viewBox={MARCA.viewBox}>
        <MarcaTrazos id={`${id}-marca`} />
      </svg>
    </svg>
  );
}

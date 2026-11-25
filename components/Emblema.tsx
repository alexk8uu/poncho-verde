/*
 * El emblema de la marca: una hoja de cannabis minimalista, de un color (toma el color del texto).
 * Se usa como sello, en la cinta, en el encabezado y en los separadores. El logo completo (la ilustración
 * circular) se usa solo grande, en el cierre del pie.
 */
export const HOJA =
  "M0,0C3.96,-9 4.62,-27.5 0,-50C-4.62,-27.5 -3.96,-9 0,0ZM0,0C6.59,-5.73 13.78,-20.36 17.9,-40.2C5.91,-23.86 -0.15,-8.74 0,0ZM0,0C0.15,-8.74 -5.91,-23.86 -17.9,-40.2C-13.78,-20.36 -6.59,-5.73 0,0ZM0,0C6.71,-1.52 16.69,-9.2 26.05,-21.85C11.96,-14.84 2.66,-6.35 0,0ZM0,0C-2.66,-6.35 -11.96,-14.84 -26.05,-21.85C-16.69,-9.2 -6.71,-1.52 0,0ZM0,0C4.34,1.79 12.43,0.79 21.67,-3.82C11.41,-5 3.46,-3.17 0,0ZM0,0C-3.46,-3.17 -11.41,-5 -21.67,-3.82C-12.43,0.79 -4.34,1.79 0,0ZM0.9,-1L-0.9,-1L-1.3,16Q0,17.4 1.3,16Z";

export function Emblema({ className = "", titulo }: { className?: string; titulo?: string }) {
  return (
    <svg
      className={className}
      viewBox="-34 -52 68 70"
      fill="currentColor"
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
    >
      <path d={HOJA} />
    </svg>
  );
}

/** Sello circular: el emblema al centro y un texto alrededor. `id` tiene que ser único en la página. */
export function Sello({ id, texto, className = "" }: { id: string; texto: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="48" fill="var(--color-crema)" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="29" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <defs>
        <path id={id} d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
      </defs>
      <text fill="currentColor" fontSize="7.6" fontWeight="500" letterSpacing="1.4" fontFamily="var(--font-sans)">
        <textPath href={`#${id}`} textLength="228" lengthAdjust="spacing">
          {texto}
        </textPath>
      </text>
      <g transform="translate(50 56) scale(0.42)" fill="currentColor">
        <path d={HOJA} />
      </g>
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
      <svg x="15" y="20" width="30" height="31" viewBox="-34 -52 68 70" fill="currentColor">
        <path d={HOJA} />
      </svg>
    </svg>
  );
}

/*
 * El Sol de Mayo del logo (brief/refs/ref-logo.jpeg): rayos rectos y ondulados alternados alrededor del disco,
 * en los dorados del logo. Lo usan la franja (components/Marca.tsx), la cinta, el sello y la banda del carrusel.
 */

/* Rayos: 16 rectos y 16 ondulados, alternados, alrededor de un disco de radio 19 (viewBox -50 -50 100 100). */
const RAYO_RECTO = "M-3.1,-18 L0,-48 L3.1,-18Z";

function rayoOndulado() {
  const pasos = 16;
  const izq: string[] = [];
  const der: string[] = [];
  for (let i = 0; i <= pasos; i++) {
    const t = i / pasos;
    const y = -(18 + t * 25);
    const centro = 2.3 * Math.sin(t * Math.PI * 2.6);
    const ancho = 2.5 * (1 - t) + 0.15;
    izq.push(`${(centro - ancho).toFixed(2)},${y.toFixed(2)}`);
    der.push(`${(centro + ancho).toFixed(2)},${y.toFixed(2)}`);
  }
  return `M${izq.join(" L")} L${der.reverse().join(" L")}Z`;
}
const RAYO_ONDULADO = rayoOndulado();
const ANGULOS = Array.from({ length: 16 }, (_, i) => i * 22.5);

/** Los trazos del sol, en coordenadas -50..50: para dibujarlo dentro de otro SVG (el sello). */
export function SolTrazos({ cara = false }: { cara?: boolean }) {
  return (
    <>
      <g stroke="#a8601a" strokeWidth="0.9" strokeLinejoin="round">
        {ANGULOS.map((a) => (
          <path key={`r${a}`} d={RAYO_RECTO} fill="#ec9a2b" transform={`rotate(${a})`} />
        ))}
        {ANGULOS.map((a) => (
          <path key={`o${a}`} d={RAYO_ONDULADO} fill="#f5bd45" transform={`rotate(${a + 11.25})`} />
        ))}
        <circle r="19.5" fill="#f4b33f" strokeWidth="1.1" />
      </g>
      {cara && (
        <g fill="none" stroke="#8f4f12" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-10.5,-7.5 Q-6.5,-10.5 -2.5,-7.8 M10.5,-7.5 Q6.5,-10.5 2.5,-7.8" />
          <path d="M-9.5,-3.2 Q-6.5,-5.6 -3.5,-3.2 Q-6.5,-1.8 -9.5,-3.2Z M9.5,-3.2 Q6.5,-5.6 3.5,-3.2 Q6.5,-1.8 9.5,-3.2Z" fill="#8f4f12" />
          <path d="M0.6,-6 Q-0.8,0 -1.8,3.6 Q-0.2,5 2,3.8" />
          <path d="M-5,9 Q0,11.6 5,9 M-2.6,12.2 Q0,13.2 2.6,12.2" />
        </g>
      )}
    </>
  );
}

/** El Sol de Mayo del logo, en sus dorados. `cara`: dibuja el rostro (solo para tamaños desde ~48px). */
export function Sol({ className = "", cara = false, titulo }: { className?: string; cara?: boolean; titulo?: string }) {
  return (
    <svg
      className={className}
      viewBox="-50 -50 100 100"
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
    >
      <SolTrazos cara={cara} />
    </svg>
  );
}

"use client";

import { useEffect, useId, useRef, useState, type ReactNode, type Ref } from "react";
import { animarArmado, CANTIDAD_CAIDAS, poseEn, REPOSO } from "@/lib/armado";
import { COGOLLO_VIEWBOX, CogolloMascara } from "./Cogollo";

/*
 * El armado, en grabado. Empieza y termina en el cogollo de la marca: se eleva, cae en el grinder, dos manos muelen,
 * cargan, rolan y sellan un joint, lo sueltan y se van (sin encender), y el joint vuelve a ser el cogollo.
 *
 * Dos tintas, como un linóleo impreso: la tinta es el color del texto (currentColor) y el papel es --papel, que tiene
 * que ser el color del fondo donde se apoya (crema por defecto). Las masas (manos, grinder, hierba, cogollo) van en
 * tinta con pocas líneas talladas en papel; las cosas de papel (el papel, el joint) van en papel con contorno de tinta.
 * Cada pieza lleva un halo de papel para despegarse de lo que tiene detrás.
 *
 * Los movimientos están en lib/armado.ts. Sin JS se ve el cuadro quieto: el cogollo solo. En la web va como
 * CogolloArmado: el cogollo se mece cada tanto para invitar a tocarlo y, al presionarlo, corre el armado una vez.
 */

const TINTA = "currentColor";
const PAPEL = "var(--papel, var(--color-crema))";

const n = (v: number) => Math.round(v * 10) / 10;

function azar(semilla: number) {
  let s = semilla;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/** Un trazo de gubia: una cuña que se afina de un extremo al otro. */
function cuna(x1: number, y1: number, x2: number, y2: number, a1 = 2.2, a2 = 0.5) {
  const l = Math.hypot(x2 - x1, y2 - y1);
  const nx = (-(y2 - y1) / l) * 0.5;
  const ny = ((x2 - x1) / l) * 0.5;
  return `M${n(x1 + nx * a1)},${n(y1 + ny * a1)}L${n(x2 + nx * a2)},${n(y2 + ny * a2)}L${n(x2 - nx * a2)},${n(y2 - ny * a2)}L${n(x1 - nx * a1)},${n(y1 - ny * a1)}Z`;
}

function Pieza({ nombre, children }: { nombre: string; children: ReactNode }) {
  const { transform, opacity } = poseEn(nombre, REPOSO);
  return (
    <g data-pieza={nombre} style={{ transform, opacity, transformBox: "view-box", transformOrigin: "0 0" }}>
      {children}
    </g>
  );
}

/* ---------- el cogollo de la marca, centrado en su origen ---------- */

function Cogollo({ id, alto = 120 }: { id: string; alto?: number }) {
  const [x, y, w, h] = COGOLLO_VIEWBOX.split(" ").map(Number);
  const ancho = (alto * w) / h;
  return (
    <svg x={n(-ancho / 2)} y={-alto / 2} width={n(ancho)} height={alto} viewBox={COGOLLO_VIEWBOX} overflow="visible">
      <mask id={id} maskUnits="userSpaceOnUse" x={x} y={y} width={w} height={h}>
        <CogolloMascara />
      </mask>
      <rect x={x} y={y} width={w} height={h} fill={TINTA} mask={`url(#${id})`} />
    </svg>
  );
}

/* ---------- la mano: la derecha vista desde arriba, el origen en la base de los dedos ---------- */

const DEDOS = [
  { x: -18.5, w: 12.5, h: 42, g: -7 }, // índice
  { x: -6, w: 13, h: 48, g: -2 },
  { x: 6.5, w: 12.5, h: 45, g: 3 },
  { x: 18, w: 11, h: 34, g: 9 }, // meñique
];
const PULGAR = { x: -24, y: 30, w: 15, h: 32, g: -48 };
const PALMA = "M-26,4C-28,22 -25,44 -19,66L19,66C24,46 28,24 26,4C19,-1 -19,-1 -26,4Z";
// la manga se abre hacia el codo, que queda más cerca de la cámara
const MANGA = "M-29,58C-31,92 -39,150 -47,270L-56,640L56,640L47,270C39,150 31,92 29,58Q0,53 -29,58Z";

/** Un dedo afinado hacia la yema, con la base escondida bajo la palma. */
function dedo(w: number, h: number) {
  const a = w / 2;
  const b = n(a * 0.82);
  return `M${-a},8L${-b},${n(-h + b)}Q${-b},${-h} 0,${-h}Q${b},${-h} ${b},${n(-h + b)}L${a},8Z`;
}

function Dedos({ halo }: { halo: boolean }) {
  const pintura = halo
    ? { fill: PAPEL, stroke: PAPEL, strokeWidth: 7, strokeLinejoin: "round" as const }
    : { fill: TINTA, stroke: PAPEL, strokeWidth: 2.2, strokeLinejoin: "round" as const };
  return (
    <>
      <path d={dedo(PULGAR.w, PULGAR.h)} transform={`translate(${PULGAR.x} ${PULGAR.y}) rotate(${PULGAR.g})`} {...pintura} />
      {DEDOS.map(({ x, w, h, g }) => (
        <path key={x} d={dedo(w, h)} transform={`translate(${x} 4) rotate(${g})`} {...pintura} />
      ))}
    </>
  );
}

function Mano({ izquierda = false, children }: { izquierda?: boolean; children?: ReactNode }) {
  return (
    <g transform={`scale(${izquierda ? -1.1 : 1.1} 1.1)`}>
      {/* halo: la silueta en papel, apenas más gorda */}
      <g fill={PAPEL} stroke={PAPEL} strokeWidth={7} strokeLinejoin="round">
        <path d={MANGA} />
        <path d={PALMA} />
      </g>
      <Dedos halo />

      {/* tinta, y lo único tallado: el puño y un pliegue de la manga */}
      <Dedos halo={false} />
      <path d={PALMA} fill={TINTA} />
      <path d={MANGA} fill={TINTA} stroke={PAPEL} strokeWidth={2.6} strokeLinejoin="round" />
      <path d="M-31.5,75Q0,70 31.5,75" fill="none" stroke={PAPEL} strokeWidth={2.2} strokeLinecap="round" />
      <path d={cuna(24, 150, 33, 340, 2, 0.4)} fill={PAPEL} />
      {children}
    </g>
  );
}

/* ---------- hierba ---------- */

const r = azar(11);
const MONTON = Array.from({ length: 20 }, () => {
  const a = r() * Math.PI * 2;
  const d = Math.sqrt(r());
  return { x: n(Math.cos(a) * d * 25), y: n(Math.sin(a) * d * 11), rx: n(3.4 + r() * 2.2), ry: n(2.4 + r() * 1.4), g: n(r() * 180) };
});

function Pizca({ bits }: { bits: { x: number; y: number; rx: number; ry: number; g: number }[] }) {
  return (
    <>
      {bits.map((b, i) => (
        <ellipse
          key={i}
          rx={b.rx}
          ry={b.ry}
          transform={`translate(${b.x} ${b.y}) rotate(${b.g})`}
          fill={TINTA}
          stroke={PAPEL}
          strokeWidth={1.5}
        />
      ))}
    </>
  );
}

const PIZCA = [
  { x: 0, y: 0, rx: 3.4, ry: 2.6, g: 20 },
  { x: 4, y: -2.5, rx: 2.8, ry: 2.2, g: 70 },
  { x: -3.5, y: -3, rx: 2.4, ry: 2, g: 130 },
];
const CAIDA = [
  { x: 0, y: 0, rx: 3.6, ry: 2.6, g: 0 },
  { x: 3.5, y: 3, rx: 2.2, ry: 1.8, g: 50 },
];

/* ---------- el grinder: la base abierta (con los dientes a la vista) y la tapa aparte ---------- */

const DIENTES = [
  ...Array.from({ length: 6 }, (_, i) => [11, (i / 6) * Math.PI * 2 + 0.3]),
  ...Array.from({ length: 10 }, (_, i) => [21, (i / 10) * Math.PI * 2]),
].map(([rad, a]) => [n(Math.cos(a) * rad), n(Math.sin(a) * rad)]);

/* ---------- el joint ---------- */

function Boquilla({ x = 0 }: { x?: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x={-12} y={-7.5} width={24} height={15} rx={2.5} fill={TINTA} stroke={PAPEL} strokeWidth={2} />
      <path d="M-6,-4.5V4.5M0,-4.5V4.5M6,-4.5V4.5" stroke={PAPEL} strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}

const CUERPO = "M-68,-8L88,-10.5Q92,-10.5 92,-7L92,7Q92,10.5 88,10.5L-68,8Z";
const SOMBRA_PORRO = Array.from({ length: 19 }, (_, i) => {
  const x = -60 + i * 8;
  const borde = 8 + ((x + 68) / 160) * 2.5;
  return `M${x},${n(borde - 4.2)}L${x + 3},${n(borde - 0.9)}`;
}).join("");

/* ---------- la escena ---------- */

export function Armado({ ref, className = "" }: { ref?: Ref<SVGSVGElement>; className?: string }) {
  const id = `armado${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg ref={ref} className={className} viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <Pieza nombre="pila">
        <ellipse rx={28} ry={12.5} fill={TINTA} stroke={PAPEL} strokeWidth={3} />
        <Pizca bits={MONTON} />
      </Pieza>
      {Array.from({ length: CANTIDAD_CAIDAS }, (_, i) => (
        <Pieza key={i} nombre={`caida${i}`}>
          <Pizca bits={i % 2 ? CAIDA : CAIDA.slice(0, 1)} />
        </Pieza>
      ))}

      <Pieza nombre="papel">
        <rect
          x={-95}
          y={-30}
          width={190}
          height={60}
          rx={2}
          fill={PAPEL}
          stroke={TINTA}
          strokeWidth={2.4}
          vectorEffect="non-scaling-stroke"
        />
        <g stroke={TINTA} strokeLinecap="round">
          <path d="M-92,-22H92" strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
          <path
            d={Array.from({ length: 26 }, (_, i) => `M${-90 + i * 7},-28L${-86 + i * 7},-23.5`).join("")}
            strokeWidth={1.1}
            vectorEffect="non-scaling-stroke"
          />
        </g>
        {[0, 1, 2].map((i) => (
          <Pieza key={i} nombre={`carga${i}`}>
            <g fill={TINTA}>
              {[4, 11, 18, 25, 32, 39, 46].map((x, j) => (
                <ellipse key={x} cx={x} cy={j % 2 ? 6 : 2.5} rx={5.6} ry={5} />
              ))}
            </g>
            <g fill={PAPEL}>
              {[
                [8, 1],
                [19, 6],
                [31, 2],
                [42, 6.5],
              ].map(([x, y]) => (
                <circle key={x} cx={x} cy={y} r={1.3} />
              ))}
            </g>
          </Pieza>
        ))}
      </Pieza>
      <Pieza nombre="boquilla">
        <Boquilla />
      </Pieza>

      <Pieza nombre="porro">
        <g fill={PAPEL} stroke={PAPEL} strokeWidth={6} strokeLinejoin="round">
          <path d={CUERPO} />
          <rect x={-92} y={-7.5} width={24} height={15} rx={2.5} />
        </g>
        <Boquilla x={-80} />
        <path d={CUERPO} fill={PAPEL} stroke={TINTA} strokeWidth={2.4} strokeLinejoin="round" />
        <g stroke={TINTA} strokeWidth={1.2} strokeLinecap="round" fill="none">
          <path d="M-62,-2.5L86,-3.6" />
          <path d={SOMBRA_PORRO} />
        </g>
        <g transform="translate(92 0)">
          <Pieza nombre="punta">
            <path
              d="M0,-7C5,-6.5 9,-3.5 13,-1L16,0L13,1C9,3.5 5,6.5 0,7Z"
              fill={PAPEL}
              stroke={TINTA}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <path d="M3,-5L8,2M7,-3L11,1" stroke={TINTA} strokeWidth={1.2} strokeLinecap="round" />
          </Pieza>
        </g>
      </Pieza>

      <Pieza nombre="grinder">
        <circle r={44} fill={PAPEL} />
        <circle r={40} fill={TINTA} />
        <g stroke={PAPEL} strokeWidth={1.8} strokeLinecap="round">
          {Array.from({ length: 32 }, (_, i) => {
            const a = (i / 32) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={n(Math.cos(a) * 35.5)}
                y1={n(Math.sin(a) * 35.5)}
                x2={n(Math.cos(a) * 39)}
                y2={n(Math.sin(a) * 39)}
              />
            );
          })}
        </g>
        <circle r={30} fill={PAPEL} />
        <g fill={TINTA}>
          {DIENTES.map(([x, y]) => (
            <circle key={`${x},${y}`} cx={x} cy={y} r={2.3} />
          ))}
          <circle r={2.8} />
        </g>
      </Pieza>

      <Pieza nombre="cogollo">
        <g className="armado__vaiven">
          <Cogollo id={`${id}-cogollo`} />
        </g>
      </Pieza>

      <Pieza nombre="tapa">
        <circle r={33.5} fill={TINTA} stroke={PAPEL} strokeWidth={2} />
        <g fill="none" stroke={PAPEL} strokeLinecap="round">
          {[0, 1, 2, 3, 4].map((k) => {
            const a = (k * 72 * Math.PI) / 180;
            const p = (rad: number, ang: number) => `${n(Math.cos(a + ang) * rad)},${n(Math.sin(a + ang) * rad)}`;
            return <path key={k} d={`M${p(8, 0)}Q${p(20, 0.35)} ${p(26, 0.87)}`} strokeWidth={2.2} />;
          })}
          <circle r={6} strokeWidth={2} />
        </g>
        <circle r={2} fill={PAPEL} />
      </Pieza>

      <Pieza nombre="manoIzq">
        <Mano izquierda />
      </Pieza>
      <Pieza nombre="manoDer">
        <Mano>
          <g transform="translate(-24 -36)">
            <Pieza nombre="pizca">
              <Pizca bits={PIZCA} />
            </Pieza>
          </g>
        </Mano>
      </Pieza>
    </svg>
  );
}

/**
 * El cogollo que se presiona: quieto se mece cada tanto (globals.css, .armado__vaiven) y al tocarlo corre el armado
 * una vez y vuelve a quedar como estaba. Mientras corre no se puede volver a lanzar.
 */
export function CogolloArmado({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const enCurso = useRef<Animation[]>([]);
  const [andando, setAndando] = useState(false);

  useEffect(() => () => enCurso.current.forEach((a) => a.cancel()), []);

  const armar = async () => {
    const svg = ref.current;
    if (enCurso.current.length || !svg || typeof svg.animate !== "function") return;
    const animaciones = animarArmado(svg, { vueltas: 1 });
    enCurso.current = animaciones;
    setAndando(true);
    try {
      await Promise.all(animaciones.map((a) => a.finished));
    } catch {
      return; // se canceló al desmontar
    }
    animaciones.forEach((a) => a.cancel()); // terminó en el cuadro quieto: vuelve a mandar el estilo del servidor
    enCurso.current = [];
    setAndando(false);
  };

  return (
    <div className={`armado relative ${className}`} data-estado={andando ? "andando" : "quieto"}>
      <Armado ref={ref} className="armado__escena pointer-events-none absolute inset-0 h-full w-full" />
      <button
        type="button"
        onClick={armar}
        aria-disabled={andando || undefined}
        aria-label="Ver cómo el cogollo se vuelve un armado"
        className="armado__boton absolute left-[32%] top-[56%] h-[36%] w-[36%] cursor-pointer rounded-full aria-disabled:cursor-default"
      />
    </div>
  );
}

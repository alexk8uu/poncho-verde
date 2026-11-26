/*
 * Línea de tiempo de la animación del armado (components/Armado.tsx). Empieza y termina en el cogollo de la marca:
 * el cogollo, solo, se eleva y cae en el grinder abierto; una mano trae la tapa y muele, se la lleva, la otra vuelca la
 * hierba; después cargan y rolan, sellan con el dedo, retuercen la punta, sueltan el joint y se van; el joint se
 * desvanece y vuelve el cogollo.
 * Sin encender, sin humo.
 *
 * Cada pieza es un <g data-pieza="…"> dibujado alrededor de su origen; acá se describe su pose en el tiempo (en segundos)
 * y se convierte en una animación WAAPI de transform + opacity. La curva de cada cuadro es la del tramo que LLEGA a él.
 * Las coordenadas son las del viewBox (400 × 400); el papel y el joint viven centrados en (200, 200).
 */

export const DURACION = 16.1;
/**
 * El cuadro quieto: el cogollo solo, apoyado abajo en el cuadro (así el lugar que necesita la animación queda arriba).
 * Es lo que se ve sin JS, antes de presionarlo y al terminar.
 */
export const REPOSO = 0;

export const ESCENAS: [number, string][] = [
  [0, "Cogollo"],
  [1.25, "Moler"],
  [4.15, "Volcar"],
  [5.75, "Papel"],
  [7.3, "Cargar"],
  [10.1, "Rolar"],
  [12.85, "Sellar"],
  [13.84, "Soltar"],
  [15.1, "Cerrar"],
];

/* curvas: la de la web para llegar, y las de easings.net para mover en cuadro, caer y rebotar */
const CURVAS = {
  llega: "cubic-bezier(0.16, 1, 0.3, 1)", // --ease-suave de la web
  mueve: "cubic-bezier(0.65, 0, 0.35, 1)", // easeInOutCubic: de un punto a otro dentro del cuadro
  cae: "cubic-bezier(0.11, 0, 0.5, 0)", // easeInQuad: la gravedad
  rebota: "cubic-bezier(0.34, 1.56, 0.64, 1)", // easeOutBack: el papel que se abre, el joint que se cierra
  seca: "linear",
} as const;
type Curva = keyof typeof CURVAS;

type Pose = { x: number; y: number; r: number; sx: number; sy: number; o: number };
type Cuadro = [t: number, cambio: Partial<Pose>, curva?: Curva];

const BASE: Pose = { x: 0, y: 0, r: 0, sx: 1, sy: 1, o: 1 };

/* ---- el cogollo: se eleva, flota y cae en el grinder; al final vuelve donde estaba ---- */
const COGOLLO: Cuadro[] = [
  [0, { x: 200, y: 294 }],
  [0.9, { y: 118, sx: 0.9, sy: 0.9 }],
  [1.1, { y: 114 }],
  [1.25, { y: 116 }],
  [1.65, { y: 212, sx: 0.3, sy: 0.3, o: 0 }, "cae"], // cae en el grinder, que llegó justo abajo
  [15.1, { y: 274, sx: 0.85, sy: 0.85 }, "seca"],
  [15.75, { y: 294, sx: 1, sy: 1, o: 1 }, "llega"], // el joint baja y se vuelve cogollo
];

/* ---- poses de las manos: [x, y, giro] de la base de los dedos ---- */
type P3 = [number, number, number];
const mano = (t: number, [x, y, r]: P3, curva?: Curva): Cuadro => [t, { x, y, r }, curva];

// el rolado: las dos manos, el papel y la boquilla suben y bajan juntos, cada vez un poco menos
const ROLADO: [number, number][] = [
  [10.75, -9], [11, 6], [11.25, -9], [11.5, 6], [11.75, -8], [12, 4], [12.15, 0],
];

// los tres pellizcos: a la pila (333, 360) y a cada tramo del papel, cada uno un poco más rápido que el anterior
const PILA_R: P3 = [333, 360, -6];
function pellizco(ida: number, toma: number, sube: number, deja: number, x: number): Cuadro[] {
  return [
    mano(ida, PILA_R),
    mano(toma, [333, 364, -6]),
    mano(sube, [333, 358, -6], "llega"),
    mano(deja, [x, 238, -10]),
    mano(deja + 0.06, [x, 242, -10]),
    mano(deja + 0.13, [x, 238, -10], "llega"),
  ];
}

const DERECHA: Cuadro[] = [
  mano(0, [300, 540, -10]),
  mano(1.55, [300, 540, -10]),
  mano(2.1, [246, 252, -22], "llega"), // trae la tapa y la pone, cuando el cogollo ya cayó
  // moler: tres vueltas de muñeca
  mano(2.5, [250, 248, -11]), mano(2.8, [246, 252, -24]),
  mano(3.1, [250, 248, -11]), mano(3.4, [246, 252, -24]),
  mano(3.7, [250, 248, -11]), mano(4, [246, 252, -22]),
  mano(4.15, [246, 252, -22]),
  mano(4.3, [256, 240, -18]), // levanta la tapa
  mano(4.8, [380, 560, -8], "llega"), // y se la lleva
  mano(5.75, [330, 540, -20], "seca"),
  mano(6.25, [262, 244, -20], "llega"), // vuelve con el papel
  mano(7.3, [262, 244, -20]),
  ...pellizco(7.65, 7.77, 7.85, 8.2, 196),
  ...pellizco(8.65, 8.75, 8.82, 9.12, 246),
  ...pellizco(9.52, 9.61, 9.67, 9.95, 296),
  mano(10.45, [240, 232, -15]),
  ...ROLADO.map(([t, dy]) => mano(t, [240, 232 + dy, -15])),
  mano(12.85, [240, 232, -15]),
  mano(13.1, [150, 240, -22]), // va a la boquilla
  mano(13.5, [286, 240, -22]), // sella: repasa el borde con el dedo
  mano(13.6, [302, 252, -32]), // retuerce la punta
  mano(13.66, [302, 252, -14]), mano(13.72, [302, 252, -32]), mano(13.78, [302, 252, -16]),
  mano(13.84, [302, 252, -24]),
  mano(14.35, [372, 540, -10], "llega"),
];

const IZQUIERDA: Cuadro[] = [
  mano(0, [100, 540, 10]),
  mano(0.45, [100, 540, 10]),
  mano(1.25, [154, 252, 22], "llega"), // trae el grinder abierto, justo debajo del cogollo
  mano(4.3, [154, 252, 22]),
  mano(4.7, [214, 300, 30]), // lo inclina sobre la pila
  mano(5.35, [214, 300, 30]),
  mano(5.8, [70, 540, 18], "llega"),
  mano(6.55, [70, 540, 18]),
  mano(6.95, [86, 234, 30], "llega"), // trae la boquilla
  mano(7.15, [86, 234, 30]),
  mano(7.4, [112, 248, 24]), // sostiene el papel por la punta, lejos de la que carga
  mano(10.1, [112, 248, 24]),
  mano(10.45, [160, 232, 15]),
  ...ROLADO.map(([t, dy]) => mano(t, [160, 232 + dy, 15])),
  mano(12.85, [160, 232, 15]),
  mano(13.1, [118, 262, 25]), // sujeta la boquilla mientras la derecha repasa
  mano(13.84, [118, 262, 25]),
  mano(14.35, [80, 540, 10], "llega"),
];

const GRINDER: Cuadro[] = [
  [0, { x: 146, y: 500 }],
  [0.45, {}],
  [1.25, { x: 200, y: 212 }, "llega"], // entre las yemas: los dedos lo agarran por abajo
  [4.3, {}],
  [4.7, { x: 268, y: 250, r: -32, sx: 0.84, sy: 0.62 }], // se inclina sobre la pila
  [5.35, {}],
  [5.8, { x: 124, y: 492, r: -10, sx: 1, sy: 1 }, "llega"],
];
const TAPA: Cuadro[] = [
  [0, { x: 254, y: 500 }],
  [1.55, {}],
  [2.1, { x: 200, y: 212 }, "llega"],
  [2.2, {}],
  [2.8, { r: 360 }],
  [3.4, { r: 720 }],
  [4, { r: 1080 }],
  [4.15, {}],
  [4.3, { x: 210, y: 200 }],
  [4.8, { x: 334, y: 520 }, "llega"],
];

// la hierba que cae del grinder a la pila: salidas desparejas, como cae de verdad
const CAIDAS = [0, 0.05, 0.11, 0.14, 0.2, 0.24, 0.3, 0.33].map((d, i): Cuadro[] => {
  const s = 4.7 + d;
  const destino = [[-20, -4], [14, -8], [-6, -12], [22, -2], [2, -4], [-14, -10], [10, -14], [-24, 0]][i];
  const sale = [[0, 0], [5, -2], [-4, 2], [8, 1], [2, -3], [-6, 0], [4, 3], [-2, -1]][i];
  return [
    [0, { x: 294 + sale[0], y: 272 + sale[1], r: i * 40, o: 0 }],
    [s, {}],
    [s + 0.01, { o: 1 }, "seca"],
    [s + 0.33, { x: 308 + destino[0], y: 318 + destino[1], r: i * 40 + 120 }, "cae"],
    [s + 0.35, { o: 0 }, "seca"],
  ];
});

const PILA: Cuadro[] = [
  [0, { x: 308, y: 322, sx: 0.4, sy: 0.4, o: 0 }],
  [4.85, {}],
  [5.4, { sx: 1, sy: 1, o: 1 }, "llega"], // crece mientras cae la hierba
  [7.77, {}],
  [7.82, { sx: 0.8, sy: 0.8 }, "llega"], // cada pellizco se lleva un poco
  [8.75, {}],
  [8.8, { sx: 0.58, sy: 0.58 }, "llega"],
  [9.61, {}],
  [9.68, { sx: 0.3, sy: 0.3, o: 0 }, "llega"],
];

// la pizca entre los dedos de la mano derecha: aparece en la pila y desaparece sobre el papel
const PIZCA: Cuadro[] = [
  [0, { o: 0 }],
  [7.77, {}], [7.78, { o: 1 }, "seca"], [8.24, {}], [8.25, { o: 0 }, "seca"],
  [8.75, {}], [8.76, { o: 1 }, "seca"], [9.17, {}], [9.18, { o: 0 }, "seca"],
  [9.61, {}], [9.62, { o: 1 }, "seca"], [10, {}], [10.01, { o: 0 }, "seca"],
];

// el papel abierto sube y baja con las manos mientras se va cerrando: [t, y, alto]
const ROLADO_PAPEL: [number, number, number][] = [
  [10.75, 191, 0.82], [11, 206, 0.7], [11.25, 191, 0.58], [11.5, 206, 0.5], [11.75, 192, 0.42], [12, 204, 0.36],
  [12.15, 200, 0.34],
];
const PAPEL: Cuadro[] = [
  [0, { x: 240, y: 430, sx: 0.3, sy: 0.7 }],
  [5.8, {}],
  [6.25, { x: 214, y: 205 }, "llega"], // llega doblado en la mano
  [6.35, {}],
  [6.65, { x: 200, y: 200, sx: 1, sy: 1 }, "rebota"], // se abre
  [10.45, {}],
  ...ROLADO_PAPEL.map(([t, y, sy]): Cuadro => [t, { y, sy }]),
  [12.35, { o: 0 }], // se funde en el joint
];
const BOQUILLA: Cuadro[] = [
  [0, { x: 97, y: 502, o: 0 }],
  [6.55, {}],
  [6.56, { o: 1 }, "seca"],
  [6.95, { x: 120, y: 200 }, "llega"], // la trae la mano izquierda
  [10.45, {}],
  ...ROLADO_PAPEL.map(([t, y]): Cuadro => [t, { y }]),
  [12.35, { o: 0 }], // el joint trae la suya
];
// la carga en tres tramos, cada uno cuando cae su pizca (dentro del papel: se aplasta y se va con él)
const CARGAS = [
  { x: -62, t: 8.25 },
  { x: -12, t: 9.18 },
  { x: 38, t: 10.01 },
].map(({ x, t }): Cuadro[] => [
  [0, { x, sx: 0.15, o: 0 }],
  [t, {}],
  [t + 0.01, { o: 1 }, "seca"],
  [t + 0.2, { sx: 1 }, "llega"],
]);

const PORRO: Cuadro[] = [
  [0, { x: 200, y: 200, sy: 0.55, o: 0 }],
  [12.15, {}],
  [12.35, { o: 1 }],
  [12.55, { sy: 1 }, "rebota"], // se cierra el cilindro
  [13.84, {}],
  [14.04, { y: 204 }], // lo sueltan: baja apenas y se acomoda
  [14.5, { y: 200 }, "llega"],
  [15.1, {}],
  [15.6, { y: 262, o: 0 }, "llega"], // baja mientras vuelve el cogollo
];
const PUNTA: Cuadro[] = [
  [0, { sx: 0.2, sy: 0.2, o: 0 }],
  [13.6, {}],
  [13.61, { o: 1 }, "seca"],
  [13.82, { sx: 1, sy: 1 }, "rebota"],
];

export const PISTAS: Record<string, Cuadro[]> = {
  cogollo: COGOLLO,
  manoDer: DERECHA,
  manoIzq: IZQUIERDA,
  grinder: GRINDER,
  tapa: TAPA,
  pila: PILA,
  pizca: PIZCA,
  papel: PAPEL,
  boquilla: BOQUILLA,
  porro: PORRO,
  punta: PUNTA,
  ...Object.fromEntries(CAIDAS.map((c, i) => [`caida${i}`, c])),
  ...Object.fromEntries(CARGAS.map((c, i) => [`carga${i}`, c])),
};
export const CANTIDAD_CAIDAS = CAIDAS.length;

/* ---- de cuadros a poses ---- */

/** Las poses completas de una pista, cada cuadro heredando lo que no cambia, con la primera en t = 0. */
function completar(pista: Cuadro[]): { t: number; pose: Pose; curva: Curva }[] {
  let actual = { ...BASE };
  const out = pista.map(([t, cambio, curva]) => {
    actual = { ...actual, ...cambio };
    return { t, pose: { ...actual }, curva: curva ?? "mueve" };
  });
  if (out[0].t > 0) out.unshift({ ...out[0], t: 0 });
  return out;
}

const transformar = (p: Pose) => `translate(${p.x}px, ${p.y}px) rotate(${p.r}deg) scale(${p.sx}, ${p.sy})`;

/** La pose de una pieza en un segundo en que está quieta (para el cuadro de REPOSO, que se pinta en el servidor). */
export function poseEn(pieza: string, t: number): { transform: string; opacity: number } {
  const cuadros = completar(PISTAS[pieza]);
  let p = cuadros[0].pose;
  for (const c of cuadros) if (c.t <= t) p = c.pose;
  return { transform: transformar(p), opacity: p.o };
}

/** Los cuadros WAAPI de una pieza: offset en la línea de tiempo y la curva del tramo que sale de cada uno. */
export function cuadrosWaapi(pieza: string): Keyframe[] {
  const cuadros = completar(PISTAS[pieza]);
  const ultimo = cuadros[cuadros.length - 1];
  if (ultimo.t < DURACION) cuadros.push({ ...ultimo, t: DURACION });
  return cuadros.map((c, i) => ({
    offset: c.t / DURACION,
    transform: transformar(c.pose),
    opacity: c.pose.o,
    easing: CURVAS[cuadros[i + 1]?.curva ?? "seca"],
  }));
}

/**
 * Arranca todas las piezas de un SVG del armado, sincronizadas, desde el cuadro quieto. `vueltas` 1 la corre una vez
 * y termina en el mismo cuadro en que empezó; `espera` (ms) demora solo el arranque.
 */
export function animarArmado(raiz: Element, { espera = 0, vueltas = Infinity } = {}): Animation[] {
  const animaciones: Animation[] = [];
  raiz.querySelectorAll<SVGGElement>("[data-pieza]").forEach((el) => {
    const pieza = el.dataset.pieza!;
    if (!PISTAS[pieza]) return;
    animaciones.push(el.animate(cuadrosWaapi(pieza), { duration: DURACION * 1000, delay: espera, iterations: vueltas }));
  });
  animaciones.forEach((a) => (a.currentTime = REPOSO * 1000));
  return animaciones;
}

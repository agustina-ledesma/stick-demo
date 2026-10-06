// Motor de la escena de "Cada momento del día": tablas y funciones puras, sin DOM.
// Portado tal cual del banco (proto/_ref/escena/index.html). Si se cambia algo acá, cambiarlo también allá.

// ---- Utilidades ----
export const limita = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
// smoothstep
export const suave = (a: number, b: number, x: number) => {
  const k = limita((x - a) / (b - a));
  return k * k * (3 - 2 * k);
};
type Rgb = [number, number, number];
const hex = (h: string): Rgb => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as Rgb;
const mezcla = (a: Rgb, b: Rgb, k: number): Rgb => a.map((v, i) => Math.round(v + (b[i] - v) * k)) as Rgb;
export const rgb = (c: Rgb) => `rgb(${c.join(",")})`;

// ---- Lienzo: las capas y la UI de adentro se dibujan en 1672 x 941 ----
export const ANCHO = 1672;
export const ALTO = 941;

// Encuadre tipo object-fit: cover, centrado en x 836 (el stick). En pantallas muy anchas sube el recorte
// para que el borde inferior del selector (y 827) quede siempre 16 px arriba del borde.
// `piso` (px de pantalla): lo que está arriba en pantalla (título y, en mobile, la ficha) llega hasta ahí y la
// punta del stick (y 285) no tiene que quedar por encima. Si hace falta, primero baja el lienzo y, si no
// alcanza, lo agranda (sigue cubriendo) mientras el selector siga entrando. Sin piso es la cuenta de la spec.
const PUNTA_STICK = 285;
const BORDE_SELECTOR = 827;
export function encuadre(ancho: number, alto: number, piso = 0) {
  let k = Math.max(ancho / ANCHO, alto / ALTO);
  let oy = limita(Math.min((alto - ALTO * k) / 2, alto - 16 - 870 * k), alto - ALTO * k, 0);
  if (PUNTA_STICK * k + oy < piso) {
    oy = Math.max(oy, Math.min(0, alto - 16 - 870 * k, piso - PUNTA_STICK * k));
    if (PUNTA_STICK * k + oy < piso) {
      const kPiso = Math.min(piso / PUNTA_STICK, (alto - 16) / BORDE_SELECTOR);
      if (kPiso > k) {
        k = kPiso;
        oy = 0;
      }
    }
  }
  const ox = (ancho - ANCHO * k) / 2;
  return { k, ox, oy };
}

// ---- Estados de luz: cada capa se dibuja una vez y se instancia con la paleta de cada estado ----
export const ESTADOS = [
  { id: "amanecer", t: 0 },
  { id: "mediodia", t: 0.5 },
  { id: "atardecer", t: 0.76 },
  { id: "noche", t: 1 },
] as const;
export type IdEstado = (typeof ESTADOS)[number]["id"];

// Fondo: detrás de los astros. Frente: delante, en este orden.
export const CAPAS_FONDO = ["cielo"] as const;
export const CAPAS_FRENTE = ["ciudad", "ventana", "escritorio", "planta", "cuaderno", "taza", "laptop"] as const;

// Fundido entre dos estados vecinos: el i va con opacidad 1 - f, el i + 1 con f (sumado con plus-lighter)
export function tramoEstados(t: number) {
  let i = 0;
  while (i < ESTADOS.length - 2 && t > ESTADOS[i + 1].t) i++;
  const f = limita((t - ESTADOS[i].t) / (ESTADOS[i + 1].t - ESTADOS[i].t));
  return { i, f };
}

// Ventanas que se prenden de a una al caer la noche: umbrales con semilla fija, en el orden del DOM
export function umbralesLuces(cantidad: number) {
  let semilla = 11;
  const azar = () => (semilla = (semilla * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: cantidad }, () => 0.82 + azar() * 0.15);
}

// ---- Astros y brillo del stick: lo único que se mueve de forma continua ----
const T = [0, 0.1, 0.2, 0.5, 0.64, 0.76, 0.86, 1];
export function muestra(vals: readonly number[], t: number): number;
export function muestra(vals: readonly string[], t: number): Rgb;
export function muestra(vals: readonly (number | string)[], t: number): number | Rgb {
  let i = 0;
  while (i < T.length - 2 && t > T[i + 1]) i++;
  const f = limita((t - T[i]) / (T[i + 1] - T[i]));
  const a = vals[i],
    b = vals[i + 1];
  return typeof a === "number" ? a + ((b as number) - a) * f : mezcla(hex(a), hex(b as string), f);
}
export const DISCO = ["#FFF6D8", "#FFF8E0", "#FFFBEA", "#FFFFFF", "#FFF7DC", "#FFE3B0", "#FFC08A", "#FFC08A"];
export const GLOW = ["#FFB54A", "#FFD27A", "#FFE9B8", "#FFFFFF", "#FFE2A0", "#FF8A3C", "#E0605A", "#E0605A"];
export const GLOW_OP = [0.95, 0.8, 0.6, 0.55, 0.65, 0.95, 0.25, 0];
export const LAVADO_OP = [0.55, 0.4, 0.22, 0.12, 0.28, 0.6, 0.22, 0];
export const RADIO = [32, 30, 28, 30, 28, 32, 32, 32];
export const BRILLO = [0.95, 0.97, 1, 1, 1, 0.95, 1.02, 1.08];
export const BLUR = [1.4, 1.6, 3, 7, 3, 1.4, 1.4, 1.4];
export const HALO = [96, 100, 120, 150, 120, 96, 96, 96];

// Recorrido del sol: dos parábolas que pasan por puntos con hora. Amanecer y mediodía están medidos en las
// referencias; al atardecer el sol queda sobre la cresta de las montañas, en el hueco entre las dos torres de
// la derecha (x 1334 a 1395), y después se pone.
const TRAMOS = [
  [
    [0, 418, 368],
    [0.25, 735, 232],
    [0.5, 1022, 205],
  ],
  [
    [0.5, 1022, 205],
    [0.76, 1365, 415],
    [0.86, 1405, 540],
  ],
];
export function sol(t: number): [number, number] {
  const [a, b, c] = TRAMOS[t <= 0.5 ? 0 : 1];
  const la = ((t - b[0]) * (t - c[0])) / ((a[0] - b[0]) * (a[0] - c[0]));
  const lb = ((t - a[0]) * (t - c[0])) / ((b[0] - a[0]) * (b[0] - c[0]));
  const lc = ((t - a[0]) * (t - b[0])) / ((c[0] - a[0]) * (c[0] - b[0]));
  return [la * a[1] + lb * b[1] + lc * c[1], la * a[2] + lb * b[2] + lc * c[2]];
}

// La luna sube mientras cae la noche
export function luna(t: number) {
  const sube = suave(0.82, 1, t);
  return { x: 1250 - 80 * sube, y: 470 - 252 * sube, opacidad: suave(0.84, 0.95, t) };
}

// ---- Momentos y scroll ----
// t de cada momento (SHARP, HYDRATE, RESET) y centro de su meseta en el scroll de la sección fija
export const T_MOMENTO = [0, 0.5, 1] as const;
export const P_MOMENTO = [0.06, 0.5, 0.94] as const;

// Producto activo según la hora
export const productoDeT = (t: number) => (t < 0.25 ? 0 : t < 0.75 ? 1 : 2);

// Scroll de la sección (0 a 1) a hora (0 a 1), con mesetas en cada momento
export const tDeP = (p: number) => 0.5 * suave(0.12, 0.44, p) + 0.5 * suave(0.56, 0.88, p);

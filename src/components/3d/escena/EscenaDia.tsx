"use client";

// Escena vectorial de "Cada momento del día" (capas en public/escena/capas, formato en proto/_ref/escena/contrato.md).
// Trae cada capa, la instancia una vez por estado de luz y expone `pinta(t)` para dibujar una hora (0 a 1).
// Todo lo que va adentro (`children`) vive en coordenadas del lienzo de 1672 x 941, que se escala para cubrir
// el contenedor como object-fit: cover. Se actualiza por refs: nada de render de React por cuadro.

import { animate, type AnimationPlaybackControls } from "motion/react";
import { useEffect, useImperativeHandle, useRef, type CSSProperties, type ReactNode, type Ref } from "react";
import * as M from "./motor";

export type EscenaApi = {
  // Dibuja la escena en la hora t (0 amanecer, 0.5 mediodía, 0.76 atardecer, 1 noche)
  pinta: (t: number) => void;
  // Fundido corto a negro: en el punto más oscuro llama a `cambio` (para saltar de hora sin recorrido del sol)
  funde: (cambio: () => void) => void;
  // Corta un fundido en curso sin llamar a su `cambio` (para que no pise lo que arrancó después)
  cancela: () => void;
};

const NS = "http://www.w3.org/2000/svg";
const BASE = "/escena/capas";
const ID_ESTILO = "escena-capas";
const POSTER = "/escena/poster-amanecer.jpg";

// Reglas propias del motor (además del CSS de cada capa). Con la escena fuera de pantalla la baliza se pausa.
const CSS_MOTOR = `
.e-noche .luz { transition: opacity .6s; }
.baliza { animation: baliza 1.6s steps(1) infinite; }
@keyframes baliza { 50% { opacity: .15; } }
[data-escena-fuera] .baliza { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .baliza { animation: none; } }
`;

// Encuadre sin JS (y hasta que mide el ResizeObserver): la misma cuenta que motor.encuadre, en CSS.
// tan(atan2(a, b)) da a / b sin unidades; las unidades cq* son del contenedor (container-type: size).
const K = "max(tan(atan2(100cqw, 1672px)), tan(atan2(100cqh, 941px)))";
const ENCUADRE_CSS = {
  "--k": K,
  transform:
    "translate(calc((100cqw - 1672px * var(--k)) / 2), clamp(calc(100cqh - 941px * var(--k)), min(calc((100cqh - 941px * var(--k)) / 2), calc(100cqh - 16px - 870px * var(--k))), 0px)) scale(var(--k))",
} as CSSProperties;

type Nodos = {
  estados: { n: SVGSVGElement; k: number }[];
  luces: { n: SVGElement; umbral: number; on: boolean }[];
  sol: SVGGElement;
  disco: SVGCircleElement;
  halo: SVGCircleElement;
  glow: SVGCircleElement;
  lavado: SVGCircleElement;
  luna: SVGGElement;
  gls: NodeListOf<SVGStopElement>;
};

type Capa = { nombre: string; svg: string | null; css: string | null };

const trae = (url: string) =>
  fetch(url)
    .then((r) => (r.ok ? r.text() : null))
    .catch(() => null);

async function cargaCapa(nombre: string): Promise<Capa> {
  const [svg, css] = await Promise.all([trae(`${BASE}/${nombre}.svg`), trae(`${BASE}/${nombre}.css`)]);
  return { nombre, svg, css };
}

// Sin su .svg o su .css la capa se dibuja mal (negra, porque sus var(--x) no existen)
const faltaCapa = (c: Capa) => c.svg == null || c.css == null;

// Un solo pedido por carga de página: al volver a la home no se vuelven a traer. Si faltó alguna, se reintenta.
let pedido: Promise<Capa[]> | null = null;
function traeCapas() {
  if (!pedido) {
    const p = Promise.all([...M.CAPAS_FONDO, ...M.CAPAS_FRENTE].map(cargaCapa));
    pedido = p;
    p.then((cs) => {
      if (cs.some(faltaCapa) && pedido === p) pedido = null;
    });
  }
  return pedido;
}

// Cede el hilo entre tramos de trabajo largos (instanciar capas), para no armar una sola tarea enorme
const cede = () => new Promise<void>((r) => setTimeout(r, 0));

// Escribe un atributo sólo si cambió (en un scroll lento los valores redondeados se repiten)
const pon = (n: Element, a: string, v: string) => {
  if (n.getAttribute(a) !== v) n.setAttribute(a, v);
};

// Una copia de la capa para un estado: __E en ids y referencias pasa a -<estado>, así cada copia tiene sus
// propios degradés; data-solo="amanecer noche" deja el elemento sólo en esos estados.
function instancia(svg: string, estado: M.IdEstado) {
  const g = document.createElementNS(NS, "g");
  g.setAttribute("class", `e-${estado}`);
  g.innerHTML = svg.replaceAll("__E", `-${estado}`);
  g.querySelectorAll<SVGElement>("[data-solo]").forEach((n) => {
    if (!(n.dataset.solo ?? "").split(/\s+/).includes(estado)) n.remove();
  });
  return g;
}

function pintaEscena(n: Nodos, t: number) {
  // Fundido exacto entre dos estados: el de abajo en (1 - f), el de arriba en f sumado.
  // Los que no participan van con visibility: hidden y no display: none, para que conserven estilo y layout
  // y al entrar no haya que rearmar miles de elementos justo en el primer cuadro de scroll.
  const { i, f } = M.tramoEstados(t);
  for (const { n: svg, k } of n.estados) {
    const o = k === i ? 1 - f : k === i + 1 ? f : 0;
    const visible = o > 0 ? "" : "hidden";
    if (svg.style.visibility !== visible) svg.style.visibility = visible;
    svg.style.opacity = String(o);
    const mezcla = k === i + 1 ? "plus-lighter" : "";
    if (svg.style.mixBlendMode !== mezcla) svg.style.mixBlendMode = mezcla;
  }

  const [sx, sy] = M.sol(t);
  pon(n.sol, "transform", `translate(${sx.toFixed(1)} ${sy.toFixed(1)})`);
  pon(n.disco, "r", M.muestra(M.RADIO, t).toFixed(2));
  pon(n.disco, "fill", M.rgb(M.muestra(M.DISCO, t)));
  // A mediodía el sol es un resplandor blando, sin disco duro, como en la referencia
  const blur = `blur(${M.muestra(M.BLUR, t).toFixed(1)}px)`;
  if (n.disco.style.filter !== blur) n.disco.style.filter = blur;
  pon(n.halo, "r", M.muestra(M.HALO, t).toFixed(2));
  const glow = M.rgb(M.muestra(M.GLOW, t));
  if (n.gls[0]?.getAttribute("stop-color") !== glow) n.gls.forEach((s) => s.setAttribute("stop-color", glow));
  const glowOp = M.muestra(M.GLOW_OP, t).toFixed(3);
  pon(n.glow, "opacity", glowOp);
  pon(n.halo, "opacity", glowOp);
  pon(n.lavado, "opacity", M.muestra(M.LAVADO_OP, t).toFixed(3));

  // La luna no se dibuja mientras es transparente (hasta t 0.84)
  const l = M.luna(t);
  const lunaVisible = l.opacidad > 0 ? "" : "none";
  if (n.luna.style.display !== lunaVisible) n.luna.style.display = lunaVisible;
  if (l.opacidad > 0) {
    pon(n.luna, "transform", `translate(${l.x.toFixed(1)} ${l.y.toFixed(1)})`);
    pon(n.luna, "opacity", l.opacidad.toFixed(3));
  }

  for (const luz of n.luces) {
    const on = t > luz.umbral;
    if (on !== luz.on) {
      luz.on = on;
      luz.n.style.opacity = on ? "" : "0";
    }
  }
}

export function EscenaDia({
  ref,
  piso = 0,
  children,
}: {
  ref?: Ref<EscenaApi>;
  // Px de pantalla hasta donde llega lo que va arriba (título y ficha de mobile): ver motor.encuadre
  piso?: number;
  children?: ReactNode;
}) {
  const marco = useRef<HTMLDivElement>(null);
  const caja = useRef<HTMLDivElement>(null);
  const capas = useRef<HTMLDivElement>(null);
  const astros = useRef<SVGSVGElement>(null);
  const fondos = useRef<(SVGSVGElement | null)[]>([]);
  const frentes = useRef<(SVGSVGElement | null)[]>([]);
  const nodos = useRef<Nodos | null>(null);
  const ultimoT = useRef(0);
  const fundido = useRef<{ anim?: AnimationPlaybackControls; vez: number }>({ vez: 0 });

  useImperativeHandle(
    ref,
    () => ({
      pinta: (t) => {
        ultimoT.current = t;
        if (nodos.current) pintaEscena(nodos.current, t);
      },
      funde: (cambio) => {
        const el = capas.current;
        if (!el || !nodos.current) return cambio();
        const vez = ++fundido.current.vez;
        fundido.current.anim?.stop();
        const baja = animate(el, { opacity: 0 }, { duration: 0.2, ease: "easeIn" });
        fundido.current.anim = baja;
        baja.then(() => {
          if (vez !== fundido.current.vez) return;
          cambio();
          fundido.current.anim = animate(el, { opacity: 1 }, { duration: 0.3, ease: "easeOut" });
        });
      },
      cancela: () => {
        fundido.current.vez++;
        fundido.current.anim?.stop();
        fundido.current.anim = undefined;
        // Sin opacidad propia vuelve a mandar la clase (data-listo), con su transición
        if (capas.current) capas.current.style.opacity = "";
      },
    }),
    [],
  );

  // Al desmontar, un fundido en curso no sigue corriendo ni llama a su `cambio`
  useEffect(() => {
    const f = fundido.current;
    return () => {
      f.vez++;
      f.anim?.stop();
    };
  }, []);

  // Encuadre: la caja de 1672 x 941 cubre el contenedor. El póster se alinea con la caja, para que no quede
  // corrido respecto del stick y el selector cuando el encuadre sube el recorte (pantallas muy anchas).
  useEffect(() => {
    const m = marco.current;
    const c = caja.current;
    if (!m || !c) return;
    const ro = new ResizeObserver(([e]) => {
      const { k, ox, oy } = M.encuadre(e.contentRect.width, e.contentRect.height, piso);
      c.style.transform = `translate(${ox}px, ${oy}px) scale(${k})`;
      m.style.backgroundSize = `${M.ANCHO * k}px ${M.ALTO * k}px`;
      m.style.backgroundPosition = `${ox}px ${oy}px`;
    });
    ro.observe(m);
    return () => ro.disconnect();
  }, [piso]);

  // Fuera de pantalla se pausan las animaciones CSS de las capas (baliza)
  useEffect(() => {
    const m = marco.current;
    if (!m) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) delete m.dataset.escenaFuera;
      else m.dataset.escenaFuera = "";
    });
    io.observe(m);
    return () => io.disconnect();
  }, []);

  // Carga e instancia las capas (una vez por estado de luz). Arranca cuando la escena está a menos de una
  // pantalla y media, y arma de a un svg por tarea. Si falta alguna capa no se arma nada y queda el póster.
  useEffect(() => {
    const m = marco.current;
    if (!m) return;
    let vivo = true;
    let quitaPoster: ReturnType<typeof setTimeout> | undefined;

    async function arranca() {
      const cargadas = await traeCapas();
      const svgAstros = astros.current;
      if (!vivo || !svgAstros || !capas.current) return;
      const faltan = cargadas.filter(faltaCapa).map((c) => c.nombre);
      if (faltan.length) {
        console.error(`Escena: no cargaron las capas ${faltan.join(", ")}; queda el póster.`);
        return;
      }
      const svgDe = new Map(cargadas.map((c) => [c.nombre, c.svg ?? ""]));

      // El CSS de las capas se inyecta una sola vez (y sólo con todas cargadas)
      if (!document.getElementById(ID_ESTILO)) {
        const estilo = document.createElement("style");
        estilo.id = ID_ESTILO;
        estilo.textContent = CSS_MOTOR + cargadas.map((c) => `\n/* ${c.nombre} */\n${c.css}`).join("");
        document.head.appendChild(estilo);
      }

      const estados: Nodos["estados"] = [];
      for (const [k, e] of M.ESTADOS.entries()) {
        const partes = [
          [fondos.current[k], M.CAPAS_FONDO],
          [frentes.current[k], M.CAPAS_FRENTE],
        ] as const;
        for (const [svg, nombres] of partes) {
          if (!svg) continue;
          svg.replaceChildren(...nombres.map((nombre) => instancia(svgDe.get(nombre) ?? "", e.id)));
          estados.push({ n: svg, k });
          await cede();
          if (!vivo) return;
        }
      }

      // Ventanas que se prenden de a una al caer la noche (clase "luz" dentro del estado noche)
      const nodosLuz = [...(frentes.current[M.ESTADOS.length - 1]?.querySelectorAll<SVGElement>(".luz") ?? [])];
      const umbrales = M.umbralesLuces(nodosLuz.length);
      const pide = <E extends Element>(s: string) => svgAstros.querySelector<E>(s)!;
      if (!capas.current) return;

      nodos.current = {
        estados,
        luces: nodosLuz.map((n, j) => ({ n, umbral: umbrales[j], on: true })),
        sol: pide("[data-astro=sol]"),
        disco: pide("[data-astro=disco]"),
        halo: pide("[data-astro=halo]"),
        glow: pide("[data-astro=glow]"),
        lavado: pide("[data-astro=lavado]"),
        luna: pide("[data-astro=luna]"),
        gls: svgAstros.querySelectorAll<SVGStopElement>(".gl"),
      };
      pintaEscena(nodos.current, ultimoT.current);
      capas.current.dataset.listo = "";
      // Cuando la escena ya tapó el póster, se saca: el fundido a negro no tiene que dejarlo ver
      quitaPoster = setTimeout(() => {
        if (marco.current) marco.current.style.backgroundImage = "none";
      }, 1000);
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        void arranca();
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(m);
    return () => {
      vivo = false;
      io.disconnect();
      clearTimeout(quitaPoster);
    };
  }, []);

  const svgEstado = "absolute inset-0 size-full will-change-[opacity]";

  return (
    <div
      ref={marco}
      className="absolute inset-0 overflow-hidden bg-black bg-cover bg-center [container-type:size]"
      style={{ backgroundImage: `url(${POSTER})` }}
    >
      <div ref={caja} className="absolute top-0 left-0 h-[941px] w-[1672px] origin-top-left" style={ENCUADRE_CSS}>
        <div
          ref={capas}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 data-listo:opacity-100"
        >
          {/* Fondo: el cielo, una copia por estado */}
          <div className="absolute inset-0 isolate">
            {M.ESTADOS.map((e, k) => (
              <svg
                key={e.id}
                ref={(n) => {
                  fondos.current[k] = n;
                }}
                viewBox="0 0 1672 941"
                className={svgEstado}
                style={{ visibility: "hidden" }}
              />
            ))}
          </div>

          {/* Astros: los mueve el motor, van detrás de la ciudad */}
          <svg ref={astros} viewBox="0 0 1672 941" className="absolute inset-0 size-full">
            <defs>
              <radialGradient id="escena-glow">
                <stop className="gl" offset="0" stopOpacity="1" />
                <stop className="gl" offset=".22" stopOpacity=".42" />
                <stop className="gl" offset="1" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="escena-lavado">
                <stop className="gl" offset="0" stopOpacity=".6" />
                <stop className="gl" offset=".4" stopOpacity=".22" />
                <stop className="gl" offset="1" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="escena-halo">
                <stop offset="0" stopColor="#fff" stopOpacity=".95" />
                <stop offset=".35" stopColor="#fff" stopOpacity=".45" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="escena-luna-glow">
                <stop offset="0" stopColor="#cfd8ff" stopOpacity=".5" />
                <stop offset=".3" stopColor="#cfd8ff" stopOpacity=".16" />
                <stop offset="1" stopColor="#cfd8ff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="escena-luna" cx=".4" cy=".38" r=".75">
                <stop offset="0" stopColor="#fffaf0" />
                <stop offset=".7" stopColor="#f1e6cc" />
                <stop offset="1" stopColor="#d9c9a6" />
              </radialGradient>
            </defs>
            <g data-astro="sol">
              <circle data-astro="lavado" r="1000" fill="url(#escena-lavado)" />
              <circle data-astro="glow" r="260" fill="url(#escena-glow)" />
              {/* El banco lleva mix-blend-mode: screen; con un halo blanco da lo mismo que normal y se ahorra
                  aislar el svg en cada cuadro */}
              <circle data-astro="halo" r="96" fill="url(#escena-halo)" />
              <circle data-astro="disco" r="30" style={{ filter: "blur(1.4px)" }} />
            </g>
            <g data-astro="luna" opacity="0">
              <circle r="170" fill="url(#escena-luna-glow)" />
              <circle r="27" fill="url(#escena-luna)" />
              <g fill="#bfae8a" fillOpacity=".45">
                <circle cx="-9" cy="-7" r="6" />
                <circle cx="7" cy="-11" r="3.5" />
                <circle cx="9" cy="6" r="7" />
                <circle cx="-6" cy="11" r="4" />
                <circle cx="-15" cy="4" r="2.5" />
                <circle cx="1" cy="-1" r="2.5" />
              </g>
            </g>
          </svg>

          {/* Frente: ciudad, ventana, escritorio, planta, cuaderno, taza y laptop, una copia por estado */}
          <div className="absolute inset-0 isolate">
            {M.ESTADOS.map((e, k) => (
              <svg
                key={e.id}
                ref={(n) => {
                  frentes.current[k] = n;
                }}
                viewBox="0 0 1672 941"
                className={svgEstado}
                style={{ visibility: "hidden" }}
              />
            ))}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useInView,
} from "framer-motion";

const H = 40;
const R = H / 2;
const GAP = 4;
const NECK = 9;
const PAD = 16;

const HOVER_QUERY = "(min-width: 768px) and (hover: hover)";

function buildPath(p, L) {
  const a = ((90 - 45 * p) * Math.PI) / 180;
  const cs = Math.cos(a);
  const sn = Math.sin(a);
  const k = NECK * p;
  const c2 = R + (R + GAP + R) * p;
  const c3 = c2 + L * p;

  const p1t = [R + R * cs, R - R * sn];
  const p1b = [R + R * cs, R + R * sn];
  const p2t = [c2 - R * cs, R - R * sn];
  const p2b = [c2 - R * cs, R + R * sn];

  return [
    `M ${p1t[0]} ${p1t[1]}`,
    `C ${p1t[0] + k * sn} ${p1t[1] + k * cs} ${p2t[0] - k * sn} ${p2t[1] + k * cs} ${p2t[0]} ${p2t[1]}`,
    `A ${R} ${R} 0 0 1 ${c2} 0`,
    `L ${c3} 0`,
    `A ${R} ${R} 0 0 1 ${c3} ${H}`,
    `L ${c2} ${H}`,
    `A ${R} ${R} 0 0 1 ${p2b[0]} ${p2b[1]}`,
    `C ${p2b[0] - k * sn} ${p2b[1] - k * cs} ${p1b[0] + k * sn} ${p1b[1] - k * cs} ${p1b[0]} ${p1b[1]}`,
    `A ${R} ${R} 0 0 1 ${R} ${H}`,
    `A ${R} ${R} 0 0 1 ${R} 0`,
    `A ${R} ${R} 0 0 1 ${p1t[0]} ${p1t[1]}`,
    "Z",
  ].join(" ");
}

export default function GlassPill({
  icon: Icon,
  text = "",
  delay = 450,
  className = "",
  variant = "light",
  defaultOpen = false,
}) {
  const [textW, setTextW] = useState(0);
  const [canHover, setCanHover] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(HOVER_QUERY).matches
      : false,
  );

  const measureRef = useRef(null);
  const pillRef = useRef(null);
  const Lref = useRef(0);
  const ctrl = useRef(null);
  const timer = useRef(null);
  const hasAnimated = useRef(false);

  const p = useMotionValue(defaultOpen ? 1 : 0);
  const isInView = useInView(pillRef, { once: true, amount: 0.2 });
  const isDark = variant === "dark";

  useEffect(() => {
    const mq = window.matchMedia(HOVER_QUERY);
    const update = () => setCanHover(mq.matches);

    update();
    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (measureRef.current) {
      setTextW(measureRef.current.offsetWidth);
    }
  }, [text]);

  const L = Math.max(0, textW + PAD * 2 - H);
  Lref.current = L;

  const open = () => {
    clearTimeout(timer.current);
    ctrl.current?.stop();

    ctrl.current = animate(p, 1, {
      type: "spring",
      stiffness: 120,
      damping: 17,
      mass: 0.9,
    });
  };

  const close = () => {
    clearTimeout(timer.current);
    ctrl.current?.stop();

    ctrl.current = animate(p, 0, {
      type: "spring",
      stiffness: 200,
      damping: 30,
    });
  };

  // Animación inicial al entrar en pantalla, salvo que deba abrirse por defecto.
  useEffect(() => {
    if (!textW || !isInView || hasAnimated.current) return;

    hasAnimated.current = true;

    if (defaultOpen) {
      ctrl.current?.stop();
      p.set(1);
      return;
    }

    timer.current = setTimeout(open, delay);

    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textW, isInView, delay, defaultOpen]);

  // Si cambia defaultOpen desde el componente padre, actualiza la pill.
  useEffect(() => {
    if (!defaultOpen || !textW) return;

    clearTimeout(timer.current);
    ctrl.current?.stop();
    p.set(1);
  }, [defaultOpen, textW, p]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
      ctrl.current?.stop();
    };
  }, []);

  const d = useTransform(p, (v) => buildPath(v, Lref.current));
  const clip = useTransform(d, (v) => `path('${v}')`);
  const width = useTransform(p, (v) => H + (H + GAP + Lref.current) * v);
  const textOpacity = useTransform(p, [0.55, 1], [0, 1]);

  return (
    <motion.div
      ref={pillRef}
      className={`relative inline-block text-white ${className}`}
      style={{ height: H, width }}
      /*  onHoverStart={canHover ? open : undefined}
      onHoverEnd={canHover ? close : undefined} */
      onHoverStart={canHover && !defaultOpen ? open : undefined}
      onHoverEnd={canHover && !defaultOpen ? close : undefined}
    >
      {/* Glass */}
      <motion.div
        className="absolute left-0 top-0 backdrop-blur-xl backdrop-saturate-150"
        style={{
          height: H,
          width,
          clipPath: clip,
          background: isDark
            ? "linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.10) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 55%, rgba(255,255,255,0.06) 100%)",
          boxShadow: isDark
            ? "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(255,255,255,0.04)"
            : "inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(255,255,255,0.10)",
        }}
      />

      {/* Borde */}
      <motion.svg
        className="pointer-events-none absolute left-0 top-0 overflow-visible"
        height={H}
        style={{ width }}
      >
        <defs>
          <linearGradient
            id={isDark ? "pill-stroke-dark" : "pill-stroke-light"}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.30)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.14)" />
          </linearGradient>
        </defs>

        <motion.path
          d={d}
          fill="none"
          stroke={`url(#${isDark ? "pill-stroke-dark" : "pill-stroke-light"})`}
          strokeWidth="0.75"
        />
      </motion.svg>

      {/* Icono */}
      <span
        className="absolute left-0 top-0 flex items-center justify-center"
        style={{
          width: H,
          height: H,
          color: isDark ? "#9CA3AF" : "#FFFFFF",
        }}
      >
        <Icon
          size={16}
          strokeWidth={2}
          color={isDark ? "#4B5563" : "#FFFFFF"}
        />
      </span>

      {/* Texto */}
      <motion.span
        className="absolute top-0 flex items-center whitespace-nowrap text-[10px] font-medium uppercase tracking-widest"
        style={{
          left: H + GAP + PAD,
          height: H,
          opacity: textOpacity,
          color: isDark ? "#4B5563" : "#FFFFFF",
        }}
      >
        {text}
      </motion.span>

      {/* Medidor invisible */}
      <span
        ref={measureRef}
        aria-hidden
        className="invisible absolute whitespace-nowrap text-[10px] font-medium uppercase tracking-widest"
      >
        {text}
      </span>
    </motion.div>
  );
}

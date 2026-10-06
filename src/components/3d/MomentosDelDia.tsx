
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  type AnimationPlaybackControls,
} from "motion/react";
import { Link } from "react-router-dom";
import { Sun, Droplet, Moon , Brain } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { useLenis } from "./ScrollSuave";
import { Chip } from "./Chip";
import { TextoRevelado } from "./TextoRevelado";
import { EscenaDia, type EscenaApi } from "./escena/EscenaDia";
import {
  BRILLO,
  muestra,
  P_MOMENTO,
  productoDeT,
  T_MOMENTO,
  tDeP,
} from "./escena/motor";

const EASE = [0.22, 1, 0.36, 1] as const;
const DURACION = 6500;

const momentos = [
  {
    id: "sharp",
    nombre: "SHARP",
    bajada: "Para cuando necesitás sentarte y concentrarte",
    claim: "Foco sostenido",
    momento: "Mañana",
    info: "Acompaña la atención y la energía mental durante la mañana, la media mañana o antes de una tarea exigente.",
    activos:
      "Cafeína natural, L-teanina, L-tirosina, citicolina, acetil-L-carnitina, taurina, coenzima Q10, extracto de té verde, vitaminas B3 y B6, y Panax ginseng.",
    icono: Sun,
    href: "/product/sharp",
  },
  {
    id: "hydrate",
    nombre: "HYDRATE",
    bajada: "Hidratación para sostener el día",
    claim: "Hidratación efectiva",
    momento: "Mediodía",
    info: "Acompaña la hidratación durante el día, especialmente cuando tomás poca agua o te cuesta sostener ese hábito.",
    activos:
      "Sodio, potasio, citrato de calcio, bisglicinato de magnesio, zinc, taurina, vitamina C, extracto de semilla de uva y L-glutamina.",
    icono: Droplet,
    href: "/product/hydrate",
  },
  {
    id: "reset",
    nombre: "RESET",
    bajada: "Para bajar el ritmo antes de dormir",
    claim: "Descanso reparador",
    momento: "Noche",
    info: "Acompaña el momento de bajar la actividad y preparar el cuerpo para descansar.",
    activos:
      "Glicina, L-teanina, bisglicinato de magnesio, taurina, extractos de lúpulo, pasiflora, melisa y manzanilla, vitamina B6 y 5-HTP.",
    icono: Moon,
    href: "/product/reset",
  },
] as const;

type Momento = (typeof momentos)[number];

const MEDIA_FIJA =
  "(min-width: 64rem) and (prefers-reduced-motion: no-preference)";
const MEDIA_REDUCIDO = "(prefers-reduced-motion: reduce)";

const suscribe = (consulta: string) => (avisa: () => void) => {
  const m = window.matchMedia(consulta);
  m.addEventListener("change", avisa);
  return () => m.removeEventListener("change", avisa);
};

const suscribeFija = suscribe(MEDIA_FIJA);
const suscribeReducido = suscribe(MEDIA_REDUCIDO);

const useFija = () =>
  useSyncExternalStore(
    suscribeFija,
    () => window.matchMedia(MEDIA_FIJA).matches,
    () => false,
  );

const useReducido = () =>
  useSyncExternalStore(
    suscribeReducido,
    () => window.matchMedia(MEDIA_REDUCIDO).matches,
    () => false,
  );

const FOCO =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-casi-negro focus-visible:ring-2 focus-visible:ring-white";

const CAMBIO = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.35, ease: EASE },
};

function Ficha({
  m,
  id,
  pestana,
  grande = false,
}: {
  m: Momento;
  id: string;
  pestana: string;
  grande?: boolean;
}) {
  return (
    <div
      id={id}
      role="tabpanel"
      aria-labelledby={pestana}
      className={`flex flex-col text-white ${
        grande ? "w-[341px] items-start gap-6" : "items-center"
      }`}
    >
      <div
        className={`flex flex-col [text-shadow:0_1px_14px_rgba(0,0,0,.45)] ${
          grande
            ? "items-start gap-4"
            : "items-center gap-2 text-center"
        }`}
      >
        <Link
          to={m.href}
          className={`recorte font-display leading-none hover:opacity-80 ${FOCO} ${
            grande ? "text-[32px]" : "text-[28px]"
          }`}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span key={m.id} className="block" {...CAMBIO}>
              <span className="font-bristone text-md py-4 md:text-4xl">{m.nombre}</span>
              
            </motion.span>
          </AnimatePresence>
        </Link>

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={m.id}
            {...CAMBIO}
            className={`flex flex-col ${
              grande
                ? "items-start gap-4"
                : "items-center gap-2"
            }`}
          >
            <p
              className={`leading-[1.25] font-medium text-semibold uppercase ${
                grande ? "text-[16px]" : "text-[13px]"
              }`}
            >
              {m.bajada}
            </p>

            <div
              className={`flex items-center gap-2.5 ${
                grande ? "text-[16px]" : "text-[14px]"
              }`}
            >
              <span className="recorte font-semibold uppercase hidden md:block">
                {m.claim}
              </span>

              <span
                aria-hidden
                className="h-3 w-px bg-white/70 hidden md:block"
              />

              <span className="recorte font-semibold uppercase hidden md:block">
                {m.momento}
              </span>

             {/*  <Chip className="h-6 [text-shadow:none]">
                00 mg
              </Chip> */}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {grande && (
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={m.id}
            {...CAMBIO}
            className="flex w-full flex-col items-center gap-[18px] rounded-[8px] bg-white/15 p-4 backdrop-blur-[2px]"
          >
            <div className="flex w-full items-start gap-2">
              {/* <img
                src="/img/comun/icon-brain.svg"
                alt=""
                width={16}
                height={16}
                className="size-4 shrink-0"
              /> */}
              <Brain size={20} />
              

              <p className="recorte text-[14px] leading-[1.25]">
                {m.info}
              </p>
            </div>

            <div
              aria-hidden
              className="h-px w-full bg-white/30"
            />

            <p className="recorte w-full text-sm leading-[1.25] font-extralight italic">
              {m.activos}
            </p>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export function MomentosDelDia() {
  const seccion = useRef<HTMLElement>(null);
  const escena = useRef<EscenaApi>(null);
  const stick = useRef<HTMLDivElement>(null);
  const animacion =
    useRef<AnimationPlaybackControls | null>(null);
  const arriba = useRef<HTMLDivElement>(null);
  const pestanas =
    useRef<(HTMLButtonElement | null)[]>([]);
  const productoActual = useRef(0);

  const [producto, setProducto] = useState(0);
  const [punteroDentro, setPunteroDentro] = useState(false);
  const [focoDentro, setFocoDentro] = useState(false);

  const enPantalla = useInView(seccion);
  const [piso, setPiso] = useState(0);

  const base = useId();

  const idPestana = (i: number) =>
    `${base}-pestana-${i}`;

  const idFichaGrande = `${base}-ficha-grande`;
  const idFichaChica = `${base}-ficha-chica`;

  const fija = useFija();
  const reducido = useReducido();
  const lenis = useLenis();

  const t = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: seccion,
    offset: ["start start", "end end"],
  });

  const pinta = useCallback((v: number) => {
    escena.current?.pinta(v);

    if (stick.current) {
      stick.current.style.filter = `brightness(${muestra(
        BRILLO,
        v,
      ).toFixed(3)})`;
    }

    const i = productoDeT(v);

    if (i !== productoActual.current) {
      productoActual.current = i;
      setProducto(i);
    }
  }, []);

  useMotionValueEvent(t, "change", pinta);

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (p) => {
      if (fija) t.set(tDeP(p));
    },
  );

  useEffect(() => {
    animacion.current?.stop();
    escena.current?.cancela();

    if (fija) {
      t.set(tDeP(scrollYProgress.get()));
    } else {
      t.set(T_MOMENTO[productoActual.current]);
    }

    pinta(t.get());
  }, [
    fija,
    t,
    scrollYProgress,
    pinta,
  ]);

  const irA = useCallback(
    (i: number, vuelta = false) => {
      if (fija) {
        const s = seccion.current;

        if (!s) return;

        const arriba =
          s.getBoundingClientRect().top +
          window.scrollY;

        const y =
          arriba +
          P_MOMENTO[i] *
            (s.offsetHeight - window.innerHeight);

        if (lenis) {
          lenis.scrollTo(y);
        } else {
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }

        return;
      }

      animacion.current?.stop();

      if (reducido || vuelta) {
        const destino = T_MOMENTO[i];

        if (escena.current) {
          escena.current.funde(() =>
            t.set(destino),
          );
        } else {
          t.set(destino);
        }

        return;
      }

      escena.current?.cancela();

      animacion.current = animate(
        t,
        T_MOMENTO[i],
        {
          duration: 1.6,
          ease: EASE,
        },
      );
    },
    [fija, reducido, lenis, t],
  );

  const pausa =
    punteroDentro ||
    focoDentro ||
    !enPantalla;

  useEffect(() => {
    if (fija || reducido || pausa) return;

    const id = setTimeout(() => {
      const siguiente =
        (producto + 1) % momentos.length;

      irA(
        siguiente,
        siguiente === 0,
      );
    }, DURACION);

    return () => clearTimeout(id);
  }, [
    fija,
    reducido,
    pausa,
    producto,
    irA,
  ]);

  useEffect(
    () => () => animacion.current?.stop(),
    [],
  );

  useEffect(() => {
    const a = arriba.current;
    const contenedor = a?.parentElement;

    if (!a || !contenedor) return;

    const ro = new ResizeObserver(() =>
      setPiso(
        Math.ceil(
          a.offsetTop + a.offsetHeight,
        ) + 6,
      ),
    );

    ro.observe(a);
    ro.observe(contenedor);

    return () => ro.disconnect();
  }, []);

  const alEnfocar = (e: FocusEvent) => {
    let deTeclado = true;

    try {
      deTeclado = (
        e.target as Element
      ).matches(":focus-visible");
    } catch {
      deTeclado = true;
    }

    if (deTeclado) {
      setFocoDentro(true);
    }
  };

  const alDesenfocar = (e: FocusEvent) => {
    if (
      !e.currentTarget.contains(
        e.relatedTarget as Node | null,
      )
    ) {
      setFocoDentro(false);
    }
  };

  const alTeclear = (e: KeyboardEvent) => {
    const actual =
      pestanas.current.findIndex(
        (b) => b === document.activeElement,
      );

    if (actual < 0) return;

    const n = momentos.length;

    const destino =
      e.key === "ArrowRight"
        ? (actual + 1) % n
        : e.key === "ArrowLeft"
          ? (actual + n - 1) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : -1;

    if (destino < 0) return;

    e.preventDefault();

    pestanas.current[destino]?.focus();

    irA(destino);
  };

  const m = momentos[producto];

  return (
    <section
      ref={seccion}
      className="relative h-[100svh] min-h-[640px] lg:motion-safe:h-[300vh]"
      onPointerEnter={(e) => {
        if (e.pointerType !== "touch") {
          setPunteroDentro(true);
        }
      }}
      onPointerLeave={() =>
        setPunteroDentro(false)
      }
      onFocus={alEnfocar}
      onBlur={alDesenfocar}
    >
      <noscript
        dangerouslySetInnerHTML={{
          __html:
            "<style>.titulo-momentos span span{transform:none!important}</style>",
        }}
      />

      <div className="relative h-full min-h-[640px] overflow-hidden lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:h-[100vh] lg:motion-safe:min-h-0">
        <div
          ref={arriba}
          className="pointer-events-none absolute inset-x-0 top-[calc(var(--alto-header)+32px)] z-10 flex flex-col items-center gap-2 px-5 lg:top-[calc(var(--alto-header)+48px)]"
        >
          <TextoRevelado
            texto="Cada momento del día tiene su fórmula"
            className="titulo-momentos recorte w-full text-center text-sm md:text-lg  my-10 md:mt-20 leading-[1.25] font-semibold text-white uppercase [text-shadow:0_1px_14px_rgba(0,0,0,.28)] md:text-[32px]"
          />

          <div className="pointer-events-auto lg:[@media(min-aspect-ratio:5/4)]:hidden">
            <Ficha
              m={m}
              id={idFichaChica}
              pestana={idPestana(producto)}
            />
          </div>
        </div>

        <EscenaDia
          ref={escena}
          piso={piso}
        >
          <div
            ref={stick}
            className="absolute top-[285px] left-[761px] h-[433px] w-[150px]"
          >
            <AnimatePresence
              initial={false}
              mode="popLayout"
            >
              <motion.div
                key={m.id}
                className="absolute inset-0 flex justify-center"
                initial={{
                  opacity: 0,
                  y: 40,
                  rotate: -6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -30,
                  rotate: 6,
                }}
                transition={{
                  duration: 0.8,
                  ease: EASE,
                }}
              >
                <img
                  src={`/img-3d/${m.id}.png`}
                  alt={`Stick ${m.nombre}`}
                  className="h-full w-auto"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-[345px] left-[353px] hidden lg:[@media(min-aspect-ratio:5/4)]:block">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-20 -inset-y-16 bg-[radial-gradient(closest-side,rgba(0,0,0,0.42),rgba(0,0,0,0.22)_55%,transparent)]"
            />

            <div className="relative">
              <Ficha
                m={m}
                id={idFichaGrande}
                pestana={idPestana(producto)}
                grande
              />
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Momento del día"
            onKeyDown={alTeclear}
            className="absolute top-[759px] left-[836px] flex -translate-x-1/2 gap-[31px] before:absolute before:inset-x-[34px] before:top-1/2 before:h-px before:bg-white/35 before:content-['']"
          >
            {momentos.map((mo, i) => {
              const Icono = mo.icono;

              return (
                <button
                  key={mo.id}
                  ref={(b) => {
                    pestanas.current[i] = b;
                  }}
                  id={idPestana(i)}
                  type="button"
                  role="tab"
                  aria-selected={i === producto}
                  aria-controls={`${idFichaGrande} ${idFichaChica}`}
                  tabIndex={
                    i === producto ? 0 : -1
                  }
                  aria-label={`${mo.nombre}, ${mo.momento.toLowerCase()}`}
                  onClick={() => irA(i)}
                  className={`relative size-[68px] cursor-pointer rounded-full border border-white/35 backdrop-blur-[6px] transition-colors duration-500 ${FOCO} ${
                    i === producto
                      ? "bg-white text-oxblood-700"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <Icono
                    aria-hidden
                    className="absolute inset-0 m-auto size-6"
                    strokeWidth={1.8}
                  />
                </button>
              );
            })}
          </div>
        </EscenaDia>
      </div>
    </section>
  );
}


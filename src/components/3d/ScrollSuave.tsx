import Lenis from "lenis";
import { useLocation } from "react-router-dom";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export function ScrollSuave({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const raf = useRef<number>(0);
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const instancia = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      anchors: {
        offset: -80,
      },
    });

    setLenis(instancia);
    window.__lenis = instancia;

    const loop = (t: number) => {
      instancia.raf(t);
      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf.current);
      instancia.destroy();
      setLenis(null);
      delete window.__lenis;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector<HTMLElement>(
        window.location.hash
      );

      if (el) {
        const ir = () => {
          if (lenis) {
            lenis.resize();
            lenis.scrollTo(el, {
              offset: -80,
              immediate: true,
            });
          } else {
            window.scrollTo(
              0,
              el.getBoundingClientRect().top +
                window.scrollY -
                80
            );
          }
        };

        const r = requestAnimationFrame(ir);
        const t = setTimeout(ir, 350);

        return () => {
          cancelAnimationFrame(r);
          clearTimeout(t);
        };
      }
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
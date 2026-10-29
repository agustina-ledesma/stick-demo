import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Sun,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import CartButton from "./CartButton";
import CartSidebar from "./CartSidebar";

const navItems = [
  { label: "Ciencia", href: "/ciencia" },
  { label: "Empresas", href: "/empresas" },
  { label: "Vender Stix", href: "/vender" },
  { label: "Es para vos", href: "/es-para-vos" },
  { label: "Contacto", href: "/contacto" },
];

const H = 40;
const R = H / 2;
const GAP = 4;
const NECK = 9;

// Vidrio compartido: igual al pill del carrito (bg-black/30 + backdrop-blur-xl).
// Sobre fondos claros sube apenas; poné el mismo valor en ambos para que nunca cambie.
const GLASS_BG = "rgba(0, 0, 0, 0.30)";
const GLASS_BG_LIGHT = "rgba(0, 0, 0, 0.40)";
const GLASS_BLUR = "blur(12px)"; // = backdrop-blur-xl

/**
 * Silueta de reloj de arena (versión desktop).
 * w1 = ancho de la burbuja del logo
 * w2 = ancho de la burbuja de los links
 * Ambas son píldoras (extremos redondeados) unidas por un cuello cóncavo.
 */
function buildHourglassPath(w1, w2) {
  const a = (45 * Math.PI) / 180;
  const cs = Math.cos(a);
  const sn = Math.sin(a);
  const k = NECK;

  const xa = w1 - R; // centro de la tapa derecha de la burbuja 1
  const xb = w1 + GAP + R; // centro de la tapa izquierda de la burbuja 2
  const xc = w1 + GAP + w2 - R; // centro de la tapa derecha de la burbuja 2

  const p1t = [xa + R * cs, R - R * sn];
  const p1b = [xa + R * cs, R + R * sn];
  const p2t = [xb - R * cs, R - R * sn];
  const p2b = [xb - R * cs, R + R * sn];

  return [
    `M ${p1t[0]} ${p1t[1]}`,
    `C ${p1t[0] + k * sn} ${p1t[1] + k * cs} ${p2t[0] - k * sn} ${p2t[1] + k * cs} ${p2t[0]} ${p2t[1]}`,
    `A ${R} ${R} 0 0 1 ${xb} 0`,
    `L ${xc} 0`,
    `A ${R} ${R} 0 0 1 ${xc} ${H}`,
    `L ${xb} ${H}`,
    `A ${R} ${R} 0 0 1 ${p2b[0]} ${p2b[1]}`,
    `C ${p2b[0] - k * sn} ${p2b[1] - k * cs} ${p1b[0] + k * sn} ${p1b[1] - k * cs} ${p1b[0]} ${p1b[1]}`,
    `A ${R} ${R} 0 0 1 ${xa} ${H}`,
    `L ${R} ${H}`,
    `A ${R} ${R} 0 0 1 ${R} 0`,
    `L ${xa} 0`,
    `A ${R} ${R} 0 0 1 ${p1t[0]} ${p1t[1]}`,
    "Z",
  ].join(" ");
}

/**
 * Fondo de la silueta: capa con blur recortada con la forma del reloj de arena
 * (black/30 + blur 12px, igual al pill del carrito) y borde white/10 dibujado con SVG.
 * Sobre fondos claros la capa pasa a un negro más intenso.
 */
function HourglassShape({ w1, w2, isLight }) {
  const total = w1 + GAP + w2;
  const d = buildHourglassPath(w1, w2);
  const clip = `path('${d}')`;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0"
        style={{
          width: total,
          height: H,
          clipPath: clip,
          WebkitClipPath: clip,
          background: isLight ? GLASS_BG_LIGHT : GLASS_BG,
          backdropFilter: GLASS_BLUR,
          WebkitBackdropFilter: GLASS_BLUR,
          transition: "background-color 300ms ease",
        }}
      />
      <svg
        aria-hidden="true"
        width={total}
        height={H}
        viewBox={`0 0 ${total} ${H}`}
        className="pointer-events-none absolute left-0 top-0 overflow-visible"
      >
        <path
          d={d}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
      </svg>
    </>
  );
}

// Mobile: burbuja 1 = botón de menú (círculo), burbuja 2 = logo
const MOBILE_LOGO_W = 112;

export default function Navbar() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);

  // Medición de las dos burbujas del nav desktop
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const [dims, setDims] = useState({ w1: 110, w2: 440 });

  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setProductsOpen(false);
  }, [location.pathname]);

  useLayoutEffect(() => {
    const logoEl = logoRef.current;
    const linksEl = linksRef.current;
    if (!logoEl || !linksEl) return;

    const update = () => {
      const w1 = logoEl.offsetWidth;
      const w2 = linksEl.offsetWidth;
      // En mobile el bloque desktop está oculto (ancho 0): no actualizamos.
      if (w1 && w2) {
        setDims((prev) =>
          prev.w1 === w1 && prev.w2 === w2 ? prev : { w1, w2 }
        );
      }
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(logoEl);
    ro.observe(linksEl);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const checkBackground = () => {
      const nav = document.querySelector("nav[data-stix-navbar]");
      if (!nav) return;

      const navBottom = nav.getBoundingClientRect().bottom;
      const elements = document.elementsFromPoint(
        window.innerWidth / 2,
        Math.min(navBottom + 12, window.innerHeight - 1)
      );

      const backgroundElement = elements.find(
        (element) =>
          !nav.contains(element) &&
          window.getComputedStyle(element).backgroundColor ===
            "rgb(244, 243, 242)"
      );

      setIsLightBackground(Boolean(backgroundElement));
    };

    checkBackground();

    window.addEventListener("scroll", checkBackground, {
      passive: true,
    });
    window.addEventListener("resize", checkBackground);

    return () => {
      window.removeEventListener("scroll", checkBackground);
      window.removeEventListener("resize", checkBackground);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setProductsOpen(false);
  };

  const glassStyle = {
    background: isLightBackground ? GLASS_BG_LIGHT : GLASS_BG,
    backdropFilter: GLASS_BLUR,
    WebkitBackdropFilter: GLASS_BLUR,
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.14)",
  };

  // h-8: el hover queda como una píldora de 32px dentro de la burbuja de 40px
  const itemClass =
    "relative inline-flex h-8 shrink-0 items-center justify-center rounded-full px-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70";

  const mobileItemClass =
    "flex w-full items-center rounded-2xl px-4 py-3 text-left text-base font-medium text-white transition-colors hover:bg-white/10";

  const productCard = (mobile = false) => (
    <Link
      to="/sharp"
      onClick={() => {
        setProductsOpen(false);
        if (mobile) closeMobileMenu();
      }}
      className={`group flex items-center gap-3 rounded-[18px] p-3 transition-colors hover:bg-white/[0.08] ${
        mobile ? "mx-2 mb-1" : ""
      }`}
    >
      <div
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/[0.06] ${
          mobile ? "h-12 w-12" : "h-[68px] w-[68px]"
        }`}
      >
        <img
          src="/images/nav/1.png"
          alt="SHARP"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="min-w-0">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-white">
            SHARP
          </span>

          <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/90">
            <Sun size={11} />
            Mañana
          </span>
        </div>

        <p className="text-xs leading-relaxed text-white/70">
          Foco sostenido por las mañanas
        </p>
      </div>
    </Link>
  );

  return (
    <>
      <nav
        data-stix-navbar
        className="pointer-events-none fixed left-1/2 top-4 z-50 w-[calc(100%-32px)] max-w-8xl -translate-x-1/2"
      >
        <div className="pointer-events-auto flex h-14 items-center justify-between gap-3">
          {/* DESKTOP: RELOJ DE ARENA → BURBUJA 1 = LOGO, BURBUJA 2 = LINKS */}
          <div className="relative hidden h-10 min-w-0 items-center gap-[4px] md:flex">
            <HourglassShape
              w1={dims.w1}
              w2={dims.w2}
              isLight={isLightBackground}
            />

            {/* BURBUJA 1: LOGO */}
            <Link
              ref={logoRef}
              to="/"
              aria-label="Stix, inicio"
              className="relative z-10 flex h-10 shrink-0 items-center justify-center px-6"
            >
              <img
                src="/logo-stix.svg"
                alt="Stix"
                className="h-4 w-auto"
              />
            </Link>

            {/* BURBUJA 2: LINKS */}
            <div
              ref={linksRef}
              className="relative z-10 flex h-10 items-center gap-1 px-2"
            >
              <button
                type="button"
                onClick={() => setProductsOpen((prev) => !prev)}
                aria-expanded={productsOpen}
                className={itemClass}
              >
                Productos
                {productsOpen ? (
                  <ChevronUp size={15} className="ml-1" />
                ) : (
                  <ChevronDown size={15} className="ml-1" />
                )}
              </button>

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={itemClass}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {productsOpen && (
              <>
                <button
                  type="button"
                  aria-label="Cerrar menú de productos"
                  className="fixed inset-0 -z-10 cursor-default"
                  onClick={() => setProductsOpen(false)}
                />

                <div
                  className="absolute left-0 top-[calc(100%+12px)] z-20 w-[300px] overflow-hidden rounded-[24px] p-2 text-white"
                  style={glassStyle}
                >
                  {productCard()}
                </div>
              </>
            )}
          </div>

          {/* MOBILE: BURBUJA 1 = BOTÓN DE MENÚ, BURBUJA 2 = LOGO */}
          <div className="relative flex h-10 items-center gap-[4px] md:hidden">
            <HourglassShape
              w1={H}
              w2={MOBILE_LOGO_W}
              isLight={isLightBackground}
            />

            {/* BURBUJA 1: BOTÓN DE MENÚ */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center text-white"
            >
              {menuOpen ? (
                <X size={18} strokeWidth={2} />
              ) : (
                <Menu size={18} strokeWidth={2} />
              )}
            </button>

            {/* BURBUJA 2: LOGO */}
            <Link
              to="/"
              aria-label="Stix, inicio"
              onClick={closeMobileMenu}
              style={{ width: MOBILE_LOGO_W }}
              className="relative z-10 flex h-10 shrink-0 items-center justify-center"
            >
              <img
                src="/logo-stix.svg"
                alt="Stix"
                className="h-4 w-auto"
              />
            </Link>
          </div>

          {/* CARRITO */}
          <div className="shrink-0">
            <CartButton
              onCartClick={() => setIsCartOpen((prev) => !prev)}
            />
          </div>
        </div>

        {/* MENÚ MOBILE */}
        <div
          className={`pointer-events-auto absolute left-0 right-0 top-[60px] overflow-hidden rounded-[24px] transition-all duration-300 ease-out md:hidden ${
            menuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
          style={{
            ...glassStyle,
            maxHeight: menuOpen ? "calc(100dvh - 100px)" : "0px",
            overflowY: menuOpen ? "auto" : "hidden",
            pointerEvents: menuOpen ? "auto" : "none",
          }}
          aria-hidden={!menuOpen}
        >
          <div className="flex flex-col gap-1 p-2">
            <button
              type="button"
              onClick={() => setProductsOpen((prev) => !prev)}
              aria-expanded={productsOpen}
              className={`${mobileItemClass} justify-between`}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span>Productos</span>
              {productsOpen ? (
                <ChevronUp size={17} />
              ) : (
                <ChevronDown size={17} />
              )}
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                productsOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                {productCard(true)}
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={closeMobileMenu}
                tabIndex={menuOpen ? 0 : -1}
                className={mobileItemClass}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* SIDEBAR DEL CARRITO */}
      {isCartOpen && (
        <CartSidebar onClose={() => setIsCartOpen(false)} />
      )}
    </>
  );
}

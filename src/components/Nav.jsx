import { useEffect, useState } from "react";

import {
  Sun,
  Droplet,
  Moon,
  ChevronDown,
  ChevronUp,
  UserRound,
  ShoppingCart,
} from "lucide-react";

import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import CartSidebar from "./CartSidebar";

function Navbar() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);

  useEffect(() => {
    const checkBackground = () => {
      const nav = document.querySelector("nav");
      if (!nav) return;

      const rect = nav.getBoundingClientRect();

      const x = rect.left + rect.width / 2;
      const y = Math.min(rect.bottom + 10, window.innerHeight - 1);

      const element = document.elementFromPoint(x, y);

      let current = element;
      let foundLight = false;

      while (current && current !== document.body) {
        const backgroundColor =
          window.getComputedStyle(current).backgroundColor;

        if (backgroundColor === "rgb(244, 243, 242)") {
          foundLight = true;
          break;
        }

        current = current.parentElement;
      }

      setIsLightBackground(foundLight);
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

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setProductsOpen(false);
  };

  return (
    <>
      <nav className="fixed left-1/2 top-4 z-50 w-[calc(100%-32px)] max-w-8xl -translate-x-1/2">
        {/* NAVBAR */}
        <div className="flex h-14 items-center justify-between">
          {/* DESKTOP */}
          <div
            className={`relative hidden h-12 max-w-xl items-center gap-6 rounded-full px-4 backdrop-blur-xl md:flex ${
              isLightBackground
                ? "bg-black/30"
                : "border border-white/10 bg-black/40"
            }`}
          >
            <a href="/" className="shrink-0">
              <img src="/logo-stix.svg" alt="Stix" className="h-4 w-auto" />
            </a>

            {/* PRODUCTOS */}
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="flex items-center gap-1 py-3 text-left text-sm text-white"
            >
              Productos
              {productsOpen ? (
                <ChevronUp size={16} strokeWidth={1.5} />
              ) : (
                <ChevronDown size={16} strokeWidth={1.5} />
              )}
            </button>

            <Link
              to="/ciencia"
              className="text-sm text-white/80 transition hover:text-white"
            >
              Ciencia
            </Link>

            <Link
              to="/empresas"
              className="text-sm text-white/80 transition hover:text-white"
            >
              Empresas
            </Link>

            <Link
              to="/es-para-vos"
              className="text-sm text-white/80 transition hover:text-white"
            >
              Es para vos
            </Link>

            <Link
              to="contacto"
              className="text-sm text-white/80 transition hover:text-white"
            >
              Contacto
            </Link>

            {/* DROPDOWN */}
            <div
              className={`absolute left-0 top-[calc(100%+16px)] w-full rounded-2xl border border-white/8 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.18),inset_0_0_20px_rgba(255,255,255,0.025)] transition-all duration-200 ${
                productsOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              } ${
                isLightBackground
                  ? "bg-black/50 border-transparent"
                  : "bg-black/90"
              }`}
            >
              <Link
                to="/product/sharp"
                className="block rounded-xl px- m-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <div className="flex w-full gap-4 p-2">
                  <div className="h-15 w-15 overflow-hidden rounded-sm">
                    <img
                      src="/images/nav/1.png"
                      alt="sharp"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex w-full flex-col">
                    <div className="flex justify-between">
                      <span className="font-bristone font-semibold text-white">
                        SHARP
                      </span>

                      <div className="inline-flex items-center gap-2 rounded-full border border-white/4 bg-white/5 px-3 py-1 text-xs text-white backdrop-blur-xl">
                        <Sun size={16} strokeWidth={1.5} />
                        <span>MAÑANA</span>
                      </div>
                    </div>

                    <span className="text-md">
                      Foco sostenido por las mañanas
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                to="/product/hydrate"
                className="block rounded-xl px- m-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <div className="flex w-full gap-4 p-2">
                  <div className="h-15 w-15 overflow-hidden rounded-sm">
                    <img
                      src="/images/nav/2.png"
                      alt="sharp"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex w-full flex-col">
                    <div className="flex justify-between">
                      <span className="font-bristone font-semibold text-white">
                        HYDRATE
                      </span>

                      <div className="inline-flex items-center gap-2 rounded-full border border-white/6 bg-white/3 px-3 py-1 text-xs text-white/70 backdrop-blur-xl">
                        <Droplet size={16} strokeWidth={1.5} />
                        <span>MEDIODÍA</span>
                      </div>
                    </div>

                    <span className="text-md">
                      Hidratación para sostener el día
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                to="/product/reset"
                className="block rounded-xl px- m-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <div className="flex w-full gap-4 p-2">
                  <div className="h-15 w-15 overflow-hidden rounded-sm">
                    <img
                      src="/images/nav/3.png"
                      alt="reset"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex w-full flex-col">
                    <div className="flex justify-between">
                      <span className="font-bristone font-semibold text-white">
                        RESET
                      </span>

                      <div className="inline-flex items-center gap-2 rounded-full border border-white/6 bg-white/3 px-3 py-1 text-xs text-white/70 backdrop-blur-xl">
                        <Moon size={16} strokeWidth={1.5} />
                        <span>NOCHE</span>
                      </div>
                    </div>

                    <span className="text-md">
                      Para bajar el ritmo antes de dormir
                    </span>
                  </div>
                </div>
              </Link>

              <Link
                to="/system"
                className="block rounded-xl px- m-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <div className="flex w-full gap-4 p-2">
                  <div className="h-15 w-15 overflow-hidden rounded-sm">
                    <img
                      src="/images/nav/4.jpg"
                      alt="reset"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex w-full flex-col">
                    <div className="flex justify-between">
                      <span className="font-bristone font-semibold text-white">
                        SYSTEM
                      </span>

                      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F89437] px-3 py-1 text-xs font-semibold text-white">
                        <span>AHORRÁ UN 15 %</span>
                      </div>
                    </div>

                    <span className="text-md">Combiná dos fórmulas</span>
                  </div>
                </div>
              </Link>

              <Link
                to="/oasis"
                className="block rounded-xl px- m-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <div className="flex w-full gap-4 p-2">
                  <div className="h-15 w-15 overflow-hidden rounded-sm">
                    <img
                      src="/images/nav/5.png"
                      alt="sharp"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex w-full flex-col">
                    <div className="flex justify-between">
                      <span className="font-bristone font-semibold text-white">
                        OASIS
                      </span>

                      <div className="inline-flex items-center gap-2 rounded-full bg-[#56000F] px-3 py-1 text-xs font-semibold text-white">
                        <span>AHORRA UN 25%</span>
                      </div>
                    </div>

                    <span className="text-md">El protocolo completo</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white"
            >
              {menuOpen ? "×" : "☰"}
            </button>

            <a href="/" className="shrink-0">
              <img src="/logo-stix.svg" alt="Stix" className="h-4 w-auto" />
            </a>
          </div>

          {/* CARRITO */}
          <div className="">
            <CartButton onCartClick={() => setIsCartOpen((prev) => !prev)} />
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`mt-2 max-h-[calc(100vh-100px)] overflow-y-auto overflow-x-hidden rounded-3xl backdrop-blur-xl transition-all duration-300 md:hidden ${
            menuOpen
              ? "h-fit opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          } ${
            isLightBackground
              ? "bg-black/45"
              : "border border-white/10 bg-black/60"
          } [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
        >
          <div className="flex flex-col p-4">
            <div className="py-3">
              <span className="text-sm uppercase text-white/80">Productos</span>

              <div className="mt-4 flex flex-col gap-4">
                {/* SHARP */}
                <Link
                  to="/product/sharp"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl p-2 text-white uppercase transition hover:bg-white/10"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-sm">
                    <img
                      src="/images/nav/1.png"
                      alt="sharp"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
                    <span className="font-bristone font-semibold text-white">
                      SHARP
                    </span>

                    <div className="inline-flex w-fit items-center gap-1 rounded-full border border-white/15 bg-white/10 px-1.5 py-0.5 text-[8px] text-white backdrop-blur-xl">
                      <Sun size={10} strokeWidth={1.5} />
                      <span>MAÑANA</span>
                    </div>
                  </div>
                </Link>

                {/* HYDRATE */}
                <Link
                  to="/product/hydrate"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl p-2 text-white/70 uppercase transition hover:bg-white/10 hover:text-white"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-sm">
                    <img
                      src="/images/nav/2.png"
                      alt="hydrate"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
                    <span className="font-bristone font-semibold text-white">
                      HYDRATE
                    </span>

                    <div className="inline-flex w-fit items-center gap-1 rounded-full border border-white/15 bg-white/10 px-1.5 py-0.5 text-[8px] text-white backdrop-blur-xl">
                      <Droplet size={10} strokeWidth={1.5} />
                      <span>MEDIODÍA</span>
                    </div>
                  </div>
                </Link>

                {/* RESET */}
                <Link
                  to="/product/reset"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl p-2 text-white/70 uppercase transition hover:bg-white/10 hover:text-white"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-sm">
                    <img
                      src="/images/nav/3.png"
                      alt="reset"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
                    <span className="font-bristone font-semibold text-white">
                      RESET
                    </span>

                    <div className="inline-flex w-fit items-center gap-1 rounded-full border border-white/15 bg-white/10 px-1.5 py-0.5 text-[8px] text-white backdrop-blur-xl">
                      <Moon size={10} strokeWidth={1.5} />
                      <span>NOCHE</span>
                    </div>
                  </div>
                </Link>

                {/* SYSTEM */}
                <Link
                  to="/system"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl p-2 text-white/70 uppercase transition hover:bg-white/10 hover:text-white"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-sm">
                    <img
                      src="/images/nav/4.jpg"
                      alt="system"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
                    <span className="font-bristone font-semibold text-white">
                      SYSTEM
                    </span>

                    <div className="inline-flex w-fit items-center rounded-full bg-[#F89437] px-2 py-0.5 text-[8px] font-semibold text-white">
                      AHORRÁ UN 15 %
                    </div>
                  </div>
                </Link>

                {/* OASIS */}
                <Link
                  to="/oasis"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-xl p-2 text-white/70 uppercase transition hover:bg-white/10 hover:text-white"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-sm">
                    <img
                      src="/images/nav/5.png"
                      alt="oasis"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
                    <span className="font-bristone font-semibold text-white">
                      OASIS
                    </span>

                    <div className="inline-flex w-fit items-center rounded-full bg-[#56000F] px-2 py-0.5 text-[8px] font-semibold text-white">
                      AHORRA UN 25%
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <Link
              to="/ciencia"
              onClick={closeMobileMenu}
              className="py-5 text-sm uppercase text-white/80"
            >
              Ciencia
            </Link>

            <Link
              to="/empresas"
              onClick={closeMobileMenu}
              className="py-5 text-sm uppercase text-white/80"
            >
              Empresas
            </Link>

            <Link
              to="/es-para-vos"
              onClick={closeMobileMenu}
              className="py-5 text-sm uppercase text-white/80"
            >
              Es para vos
            </Link>

            <Link
              to="/contacto"
              onClick={closeMobileMenu}
              className="py-5 text-sm uppercase text-white/80"
            >
              Contacto
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {isCartOpen && <CartSidebar onClose={() => setIsCartOpen(false)} />}
    </>
  );
}

export default Navbar;

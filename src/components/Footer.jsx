import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-b from-black to-[#1c1e1d] px-6 pb-10 pt-20 text-white md:px-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-0">
          {/* COLUMNA 1 — LOGO + DISCLAIMER */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="w-fit">
              <img src="/logo-stix.svg" alt="Stix" className="h-6 w-auto" />
            </Link>

            <p className="max-w-xs text-xs leading-relaxed text-white uppercase">
              No suplementa dietas insuficientes. Consulte con su médico y/o
              farmacéutico.
            </p>
          </div>

          {/* COLUMNA 2 */}
          <nav className="flex flex-col gap-4">
            <Link
              to="/empresas"
              className="w-fit text-sm font-medium uppercase transition-opacity hover:opacity-70"
            >
              Empresas
            </Link>

            <Link
              to="/suscription"
              className="w-fit text-sm font-medium  uppercase transition-opacity hover:opacity-70"
            >
              Suscripción
            </Link>
          </nav>

          {/* COLUMNA 3 */}
          <nav className="flex flex-col gap-4">
            <Link
              to="/faqs"
              className="w-fit text-sm font-medium uppercase transition-opacity hover:opacity-70"
            >
              Preguntas frecuentes
            </Link>

            <Link
              to="/contacto"
              className="w-fit text-sm font-medium uppercase transition-opacity hover:opacity-70"
            >
              Contacto
            </Link>
          </nav>

          {/* COLUMNA 4 — REDES */}
          <div className="flex items-start gap-2 lg:justify-end">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full"
            >
              <img
                src="https://s.magecdn.com/social/mw-instagram.svg"
                alt="Instagram"
                className="h-4 w-4"
              />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full"
            >
              <img
                src="https://s.magecdn.com/social/mw-linkedin.svg"
                alt="LinkedIn"
                className="h-4 w-4"
              />
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full "
            >
              <img
                src="https://s.magecdn.com/social/mw-facebook.svg"
                alt="Facebook"
                className="h-4 w-4"
              />
            </a>
          </div>
        </div>
        <div className="border-t border-white/15">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-6 py-6 text-xs text-white/60 md:grid-cols-2 lg:grid-cols-4 lg:px-0">
            <p>
              © {new Date().getFullYear()} Stix. Todos los derechos reservados.
            </p>

            <Link
              to="/terminos-y-condiciones"
              className="transition-colors hover:text-white"
            >
              Términos y condiciones
            </Link>

            <Link
              to="/politica-de-privacidad"
              className="transition-colors hover:text-white"
            >
              Política de privacidad
            </Link>

            <Link
              to="/politica-de-cookies"
              className="transition-colors hover:text-white"
            >
              Política de cookies
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

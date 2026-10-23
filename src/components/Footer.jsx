import { Link } from "react-router-dom";

const columns = [
  {
    title: "Productos",
    links: [
      { label: "SHARP", to: "/productos/sharp" },
      { label: "HYDRATE", to: "/productos/hydrate" },
      { label: "RESET", to: "/productos/reset" },
      { label: "System", to: "/productos/system" },
      { label: "Oasis", to: "/productos/oasis" },
    ],
  },
  {
    title: "Stix",
    links: [
      { label: "Ciencia", to: "/ciencia" },
      { label: "¿Es para vos?", to: "/es-para-vos" },
      { label: "Empresas", to: "/empresas" },
      { label: "Suscripción", to: "/subscription" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Preguntas frecuentes", to: "/faqs" },
      { label: "Envíos y devoluciones", to: "/envios-y-devoluciones" },
      { label: "Contacto", to: "/contacto" },
      { label: "Botón de arrepentimiento", to: "/arrepentimiento" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos y condiciones", to: "/terminos-y-condiciones" },
      { label: "Política de privacidad", to: "/politica-de-privacidad" },
      { label: "Defensa del consumidor", to: "/defensa-del-consumidor" },
    ],
  },
];

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21l1.65-4.9A8.5 8.5 0 1 1 8 19.4L3 21z" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1.2-1.4-2.2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2.2L9 8.5z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="rounded-t-4xl bg-[#72000e] px-6 pb-10 pt-20 text-white md:px-20">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1.4fr] lg:gap-16">
        {/* IZQUIERDA — LOGO + TAGLINE + DISCLAIMER */}
        <div className="flex flex-col gap-10">
          <Link to="/" className="w-fit">
            <img src="/logo-stix.svg" alt="Stix" className="h-6 w-auto" />
          </Link>

          <p className="text-lg lg:text-3xl leading-[1.05] tracking-tight">
            Un producto para
            <br />
            cada momento del día.
          </p>

          <p className="w-fit max-w-full rounded-full border border-white/30 px-6 py-4 text-sm text-white/80">
            Suplementa dietas insuficientes. Consulte a su médico y/o
            farmacéutico.
          </p>
        </div>

        {/* DERECHA — COLUMNAS DE LINKS + REDES */}
        <div className="flex flex-col justify-between gap-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} className="flex flex-col gap-5">
                <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-white/60">
                  {col.title}
                </h3>

                <ul className="flex flex-col gap-4">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm leading-snug transition-opacity hover:opacity-70"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="flex justify-end items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
            >
              <InstagramIcon />
            </a>

            <a
              href="#"
              aria-label="WhatsApp"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
            >
              <WhatsappIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

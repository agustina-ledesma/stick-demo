import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionLabel from "./SectionLabel";

const PROFESSIONALS = [
  {
    name: "Lucía Ferraro",
    role: "Nutricionista",
    quote: "Stix simplifica la incorporación de nutrientes según cada momento.",
    photo: null,
  },
  {
    name: "Martín Bianchi",
    role: "Medicina deportiva",
    quote: "Stix acompaña el rendimiento y la recuperación.",
    photo: null,
  },
  {
    name: "Sofía Mendizábal",
    role: "Bioquímica",
    quote: "Stix combina ingredientes pensados para necesidades concretas.",
    photo: null,
  },
  {
    name: "Tomás Arregui",
    role: "Farmacéutico",
    quote: "Stix hace más simple entender qué estás tomando.",
    photo: null,
  },
  {
    name: "Carolina Varela",
    role: "Rendimiento deportivo",
    quote: "Stix se adapta a distintos momentos de tu día.",
    photo: null,
  },
  {
    name: "Nicolás Ferreyra",
    role: "Tecnología de alimentos",
    quote: "Stix combina funcionalidad, calidad y formulación.",
    photo: null,
  },
];

const initials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("");

export default function CarruselProfesionales({ items = PROFESSIONALS }) {
  const pista = useRef(null);
  const [inicio, setInicio] = useState(true);
  const [fin, setFin] = useState(false);
  const navigate = useNavigate();

  const actualizar = () => {
    const el = pista.current;
    if (!el) return;

    setInicio(el.scrollLeft <= 2);
    setFin(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };

  useEffect(() => {
    const el = pista.current;
    if (!el) return;

    actualizar();

    el.addEventListener("scroll", actualizar);
    window.addEventListener("resize", actualizar);

    return () => {
      el.removeEventListener("scroll", actualizar);
      window.removeEventListener("resize", actualizar);
    };
  }, [items]);

  const mover = (dir) => {
    const el = pista.current;
    if (!el) return;

    const card = el.firstElementChild;
    const gap = 20;
    const paso = card ? card.offsetWidth + gap : el.clientWidth * 0.8;

    el.scrollBy({
      left: dir * paso,
      behavior: "smooth",
    });
  };

  const botonBase =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <section
      className="flex min-h-screen w-full items-center py-12 md:py-14 lg:py-16"
      aria-roledescription="carrusel"
    >
      <div className="grid w-full grid-cols-1 items-start gap-8  lg:grid-cols-[0.65fr_1.35fr] lg:gap-8">
        {/* TEXTO */}
        <div className="flex max-w-sm flex-col gap-3">
          <SectionLabel text="Profesionales" />

          <h2 className="text-3xl text-gray-600 md:text-4xl">
            Conocé a los profesionales que acompañan Stix
          </h2>

          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Profesionales de distintas áreas que aportan su experiencia y su
            mirada al proyecto.
          </p>

          <button
            type="button"
            onClick={() => navigate("/ciencia")}
            className="mt-6 inline-flex h-11 w-fit items-center justify-center rounded-full bg-[#7a0010] px-6 text-sm font-semibold uppercase text-white transition hover:bg-[#98001a]"
          >
            Ver profesionales
          </button>
        </div>

        {/* CARRUSEL */}
        <div className="w-full min-w-0">
          <div
            ref={pista}
            onScroll={actualizar}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((person) => (
              <article
                key={person.name}
                className="w-[240px] min-w-[240px] shrink-0 snap-start sm:w-[250px] sm:min-w-[250px] lg:w-[calc((100%-40px)/3)] lg:min-w-[calc((100%-40px)/3)]"
              >
                {/* IMAGEN / INICIALES */}
                <div className="aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-[#e4dfdf]">
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={`${person.name}, ${person.role.toLowerCase()}`}
                      loading="lazy"
                      draggable="false"
                      className="h-full w-full object-cover grayscale"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center text-5xl font-normal tracking-tight text-[#72000E]/40"
                      aria-hidden="true"
                    >
                      {initials(person.name)}
                    </div>
                  )}
                </div>

                <h3 className="mt-3 text-base font-semibold leading-tight text-[#7a0010]">
                  {person.name}
                </h3>

                <p className="mt-1 text-[11px] font-semibold uppercase leading-snug text-gray-600">
                  {person.role}
                </p>

                <p className="mt-2 text-sm italic leading-snug text-gray-600">
                  “{person.quote}”
                </p>
              </article>
            ))}
          </div>

          {/* CONTROLES DEL CARRUSEL */}
          <div className="mt-5 flex justify-start gap-3">
            <button
              type="button"
              onClick={() => mover(-1)}
              disabled={inicio}
              aria-label="Anterior"
              className={botonBase}
            >
              <ArrowLeft size={18} strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={() => mover(1)}
              disabled={fin}
              aria-label="Siguiente"
              className={botonBase}
            >
              <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

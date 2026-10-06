import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PROFESIONALES = [
  {
    nombre: "Lucía Ferraro",
    rol: "Nutricionista",
    cita: "Stix simplifica la incorporación de nutrientes según cada momento.",
    img: "/images/home/profesionales/1.png",
  },
  {
    nombre: "Martín Bianchi",
    rol: "Medicina deportiva",
    cita: "Stix acompaña el rendimiento y la recuperación.",
     img: "/images/home/profesionales/2.png",
  },
  {
    nombre: "Sofía Mendizábal",
    rol: "Bioquímica",
    cita: "Stix combina ingredientes pensados para necesidades concretas.",
     img: "/images/home/profesionales/3.png",
  },
  {
    nombre: "Tomás Arregui",
    rol: "Farmacéutico",
    cita: "Stix hace más simple entender qué estás tomando.",
    img: "/images/home/profesionales/4.png",
  },
  {
    nombre: "Carolina Varela",
    rol: "Rendimiento deportivo",
    cita: "Stix se adapta a distintos momentos de tu día.",
     img: "/images/home/profesionales/5.png",
  },
  {
    nombre: "Nicolás Ferreyra",
    rol: "Tecnología de alimentos",
    cita: "Stix combina funcionalidad, calidad y formulación.",
     img: "/images/home/profesionales/6.png",
  },
];

export default function CarruselProfesionales({ items = PROFESIONALES }) {
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
    actualizar();

    window.addEventListener("resize", actualizar);

    return () => window.removeEventListener("resize", actualizar);
  }, []);

  const mover = (dir) => {
    const el = pista.current;
    if (!el) return;

    const card = el.firstElementChild;
    const paso = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;

    el.scrollBy({
      left: dir * paso,
      behavior: "smooth",
    });
  };

  const botonBase =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#7a0010] text-white transition hover:bg-[#98001a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7a0010] disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <section
      className="px-6 py-20 md:px-10 lg:px-20 lg:py-28 bg-[#F4F3F2]"
      aria-roledescription="carrusel"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* TEXTO */}
        <div className="max-w-md">
          <h2 className="text-3xl font-semibold uppercase leading-tight text-[#7a0010] md:text-4xl">
            Conocé a los profesionales que acompañan Stix
          </h2>

          <p className="mt-5 text-base leading-relaxed text-neutral-600">
            Personas de distintas áreas que aportan su experiencia y su mirada
            profesional al proyecto.
          </p>

          <button
            type="button"
            onClick={() => navigate("/ciencia")}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#7a0010] px-6 text-sm font-semibold uppercase text-white"
          >
            Ver profesionales
          </button>
        </div>

        {/* CARRUSEL */}
        <div className="min-w-0">
          <div
            ref={pista}
            onScroll={actualizar}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((p) => (
              <article
                key={p.nombre}
                className="w-[270px] min-w-[270px] max-w-[270px] shrink-0 snap-start"
              >
                {/* CARD */}
                <div className="h-[390px] w-[270px] overflow-hidden rounded-2xl bg-neutral-200">
                  <img
                    src={p.img}
                    alt={p.nombre}
                    draggable="false"
                    className="h-full w-full object-cover grayscale"
                  />
                </div>

                <h3 className="mt-3 text-lg font-semibold leading-tight text-[#7a0010]">
                  {p.nombre}
                </h3>

                <p className="text-xs font-bold uppercase text-[#7a0010]">
                  {p.rol}
                </p>

                <p className="mt-2 text-sm italic leading-snug text-neutral-500">
                  “{p.cita}”
                </p>
              </article>
            ))}
          </div>

          {/* BOTONES */}
          <div className="mt-6 flex justify-start gap-3">
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
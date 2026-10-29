
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionLabel from "./SectionLabel";

const unsplash = (id) =>
  `https://unsplash.com/photos/${id}/download?force=true&w=900`;

const professionals = [
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
    name: "Valentina Roldán",
    role: "Endocrinología",
    quote: "Una forma simple de sostener hábitos que cuesta mantener.",
    photo: null,
  },
  {
    name: "Nicolás Peralta",
    role: "Entrenamiento",
    quote: "Stix se adapta a la rutina de quien entrena todos los días.",
    photo: null,
  },
  {
    name: "Camila Ortega",
    role: "Tecnología de alimentos",
    quote: "Cada fórmula se piensa para que sea práctica y fácil de llevar.",
    photo: null,
  },
];

const initials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

export default function Professionals() {
  const carouselRef = useRef(null);
  const [failedPhotos, setFailedPhotos] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const element = carouselRef.current;
    if (!element) return;

    setCanScrollLeft(element.scrollLeft > 2);
    setCanScrollRight(
      element.scrollLeft + element.clientWidth < element.scrollWidth - 2
    );
  };

  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;

    updateScrollButtons();

    element.addEventListener("scroll", updateScrollButtons, {
      passive: true,
    });

    const observer = new ResizeObserver(updateScrollButtons);
    observer.observe(element);

    return () => {
      element.removeEventListener("scroll", updateScrollButtons);
      observer.disconnect();
    };
  }, []);

  const scrollCarousel = (direction) => {
    const element = carouselRef.current;
    if (!element) return;

    const card = element.querySelector("[data-professional-card]");
    const gap = 20;
    const distance = card ? card.getBoundingClientRect().width + gap : 320;

    element.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="profesionales"
      className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2">
            <SectionLabel text="Profesionales" />
            <h2 className="text-2xl lg:text-4xl">
              Conocé a los profesionales que acompañan Stix.
            </h2>
            <p className="text-md text-gray-600">
              Personas de distintas áreas que aportan su experiencia y su
              mirada profesional al proyecto.
            </p>
          </div>
        </header>

        <ul
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0"
        >
          {professionals.map(({ name, role, quote, photo }) => (
            <li
              key={name}
              data-professional-card
              className="flex w-[85%] min-w-[85%] snap-start flex-col rounded-[28px] bg-[#fbfbfb] p-3 sm:w-[calc((100%-20px)/2)] sm:min-w-[calc((100%-20px)/2)] lg:w-auto lg:min-w-0"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-[#e4dfdf]">
                {photo && !failedPhotos.includes(name) ? (
                  <img
                    src={unsplash(photo)}
                    alt={`${name}, ${role.toLowerCase()}`}
                    loading="lazy"
                    onError={() =>
                      setFailedPhotos((prev) =>
                        prev.includes(name) ? prev : [...prev, name]
                      )
                    }
                    className="h-full w-full object-cover grayscale"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-5xl font-normal tracking-tight text-[#72000E]/40"
                    aria-hidden="true"
                  >
                    {initials(name)}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col px-3 pb-5 pt-6">
                <h3 className="text-[28px] font-normal leading-tight tracking-[-0.02em] text-[#2a1215]">
                  {name}
                </h3>
                <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.14em] text-[#6b5558]">
                  {role}
                </p>
                <blockquote className="mt-5 text-lg leading-snug text-[#2a1215]">
                  «{quote}»
                </blockquote>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => scrollCarousel(-1)}
            disabled={!canScrollLeft}
            aria-label="Ver profesionales anteriores"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fbfbfb] text-gray-600 transition-opacity hover:bg-[#262626] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={() => scrollCarousel(1)}
            disabled={!canScrollRight}
            aria-label="Ver siguientes profesionales"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fbfbfb] text-gray-600 transition-opacity hover:bg-[#262626] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowRight size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}

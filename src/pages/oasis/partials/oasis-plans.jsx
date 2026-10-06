import { useRef, useState } from "react";
import { CircleAlert, BadgeCheck } from "lucide-react";

const cards = [
  {
    pill: "Precio regular",
    title: "Individual",
    subtitle: "1 Producto a elección",
    description:
      "Pensado para una necesidad puntual del día. Funciona como una solución aislada para concentración, reposición o preparación del sueño.",
    final: "$10.000",
    icon: <CircleAlert size={14} />,
    span: "Sin descuento",
    variant: "light",
  },
  {
    pill: "Ahorro 15%",
    title: "System",
    subtitle: "2 Productos combinados",
    description:
      "Elegí cualquier par entre SHARP, HYDRATE o RESET para abordar los dos momentos críticos que más impactan en tu rutina diaria",
    final: "$17.000",
    icon: <BadgeCheck size={14} />,
    span: "Descuento del 15 %",
    variant: "light",
  },
  {
    pill: "Ahorro 25%",
    title: "OASIS",
    subtitle: "3 Productos completos",
    description:
      "El ciclo biológico circadiano completo de 24 horas. El mayor ahorro por sobre, asegurando la sinergia integral sin vacíos de micronutrición.",
    final: "$25.000",
    icon: <BadgeCheck size={14} />,
    span: "Mejor precio",
    variant: "red",
  },
];

export default function OasisPlans() {
  const carouselRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;

    const cards = container.children;
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = 16;

    const index = Math.round(container.scrollLeft / (cardWidth + gap));

    setActiveCard(Math.min(index, cards.length - 1));
  };

  const scrollToCard = (index) => {
    const container = carouselRef.current;
    if (!container) return;

    const card = container.children[index];
    if (!card) return;

    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

    setActiveCard(index);
  };

  return (
    <section
      className="relative overflow-hidden h-175 flex items-center py-20 md:py-24
    "
      style={{
        backgroundImage: "url('/images/oasis/background.png')",
      }}
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Cards */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:justify-center md:overflow-visible md:px-0"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {cards.map((card) => {
            const isRed = card.variant === "red";

            return (
              <div
                key={card.title}
                className={`flex h-[395px] w-[350px] shrink-0 snap-center flex-col rounded-2xl p-6 ${
                  isRed ? "bg-[#72000E] text-white" : "bg-[#FCFBFB] text-black"
                }`}
              >
                {/* Contenido */}
                <div>
                  {/* Pill */}
                  <span
                    className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                      isRed
                        ? "border border-white/4 bg-[#D1E8DC] text-[#1E352B]"
                        : "bg-[#F89437] text-white"
                    }`}
                  >
                    <span className="font-semibold uppercase">{card.pill}</span>
                  </span>

                  <div className="mt-4">
                    {/* Título */}
                    <div className="h-[30px]">
                      <h3
                        className={`font-bristone text-2xl font-semibold uppercase leading-none ${
                          isRed ? "text-[#FCFBFB]" : "text-[#72000E]"
                        }`}
                      >
                        {card.title}
                      </h3>
                    </div>

                    {/* Subtítulo */}
                    <div className="h-[22px]">
                      <p className="text-sm font-medium leading-tight">
                        {card.subtitle}
                      </p>
                    </div>

                    {/* Descripción */}
                    <div className="mt-4 h-[78px]">
                      <p
                        className={`text-sm leading-relaxed ${
                          isRed ? "text-white/60" : "text-black/60"
                        }`}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Precios */}
                <div
                  className={`mt-auto grid grid-cols-[1fr_80px] gap-4 rounded-xl p-4 ${
                    isRed ? "bg-white/10" : "bg-black/5"
                  }`}
                >
                  {/* Precio regular + icono */}
                  <div className="flex min-w-0 flex-col gap-2">
                    <span
                      className={`text-xs uppercase ${
                        isRed ? "text-white/50" : "text-black/50"
                      }`}
                    >
                      Precio regular
                    </span>

                    <div className="flex min-w-0 items-center gap-1">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                        {card.icon}
                      </div>

                      <span className="min-w-0 text-sm font-medium">
                        {card.span}
                      </span>
                    </div>
                  </div>

                  {/* Precio final */}
                  <div className="flex min-w-0 flex-col items-start justify-start">
                    <span className="text-xl font-semibold">{card.final}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="mt-5 flex justify-center gap-2 md:hidden">
          {cards.map((card, index) => (
            <button
              key={card.title}
              type="button"
              aria-label={`Ir a ${card.title}`}
              onClick={() => scrollToCard(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCard === index ? "w-5 bg-black" : "w-1.5 bg-black/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

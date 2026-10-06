import { useId, useState } from "react";
import { ChevronUp } from "lucide-react";

const FAQS = [
  {
    pregunta: "¿Qué es Stix?",
    respuesta:
      "Stix es una línea de suplementos funcionales en sobres, pensados para acompañar distintos momentos del día. SHARP acompaña la concentración, HYDRATE la hidratación y RESET la preparación para el descanso.",
  },
  {
    pregunta: "¿Para qué sirve cada producto?",
    respuesta:
      "SHARP está pensado para momentos que requieren foco y atención. HYDRATE acompaña la hidratación durante el día. RESET ayuda a bajar el ritmo y preparar el cuerpo para dormir.",
  },
  {
    pregunta: "¿Tengo que tomar los tres productos?",
    respuesta:
      "No. Podés empezar por uno, combinar dos en un System o elegir el PROTOCOLO completo. Tampoco hace falta tomar los tres todos los días.",
  },
  {
    pregunta: "¿Qué diferencia hay entre el PROTOCOLO y un System?",
    respuesta:
      "El PROTOCOLO reúne SHARP, HYDRATE y RESET en una misma compra. El System te permite combinar cualquier par de productos: SHARP + HYDRATE, HYDRATE + RESET o SHARP + RESET.",
  },
  {
    pregunta: "¿Hay compra única y suscripción?",
    respuesta:
      "Sí. Podés hacer una compra única o elegir una suscripción para que tu pedido vuelva a llegar automáticamente con la frecuencia que elijas.",
  },
];

function Item({ pregunta, respuesta, abierto, onToggle, baseId }) {
  const botonId = `${baseId}-btn`;
  const panelId = `${baseId}-panel`;

  return (
    <div className="rounded-xl border border-black/5 bg-white/40">
      <h3>
        <button
          type="button"
          id={botonId}
          aria-expanded={abierto}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 rounded-xl px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7a0010]"
        >
          <span className="text-sm font-semibold uppercase text-[#7a0010] md:text-base">
            {pregunta}
          </span>

          <ChevronUp
            aria-hidden="true"
            className={`h-4 w-4 shrink-0 text-[#7a0010] transition-transform duration-300 motion-reduce:transition-none ${
              abierto ? "" : "rotate-180"
            }`}
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={botonId}
        className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
          abierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-[15px] leading-relaxed text-neutral-500">
            {respuesta}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqsHome({
  items = FAQS,
  titulo = "Preguntas frecuentes",
  descripcion = "Todo lo que necesitás saber sobre los productos de Stix: para qué sirve cada fórmula, cuándo tomarla y qué opción elegir según tu rutina.",
  abiertosInicial = "todos",
}) {
  const uid = useId();

  const [abiertos, setAbiertos] = useState(() => {
    if (abiertosInicial === "ninguno") return new Set();
    if (abiertosInicial === "primero") return new Set([0]);
    return new Set(items.map((_, i) => i));
  });

  const toggle = (i) =>
    setAbiertos((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <section
      aria-labelledby={`${uid}-titulo`}
      className="px-6 py-16 md:px-20 md:py-20 bg-[#F4F3F2]"
      style={{
        backgroundImage: "url('/images/faqs/bg-faqs.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-24">
        <div className="max-w-sm">
          <h2
            id={`${uid}-titulo`}
            className="text-2xl font-semibold uppercase text-[#7a0010]"
          >
            {titulo}
          </h2>

          <p className="mt-4 leading-relaxed text-neutral-600">
            {descripcion}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <Item
              key={item.pregunta}
              {...item}
              baseId={`${uid}-${i}`}
              abierto={abiertos.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    title: "¿Cuándo tomo SHARP?",
    content: (
      <p>
        Tomalo por la mañana, a media mañana o entre 40 y 60 minutos antes de
        una tarea exigente. Como contiene cafeína, evitá tomarlo cerca de la
        noche.
      </p>
    ),
  },
  {
    title: "Beneficios",
    content: (
      <p>
        Una fórmula diseñada para acompañar el foco, la concentración y la
        energía mental durante el día.
      </p>
    ),
  },
  {
    title: "Ingredientes",
    content: (
      <p>
        Contiene cafeína natural, L-teanina, L-tirosina, citicolina
        (CDP-colina), acetil-L-carnitina (ALCAR), taurina, CoQ10 ubiquinol,
        extracto de té verde descafeinado (50% EGCG), vitamina B3 (niacinamida),
        vitamina B6 (P-5-P) y Panax ginseng (4–7% de ginsenósidos).
      </p>
    ),
  },
  {
    title: "¿Lo puedo combinar con otras fórmulas?",
    content: (
      <p>
        SHARP es la fórmula del PROTOCOLO para acompañar el foco. Sumalo con
        HYDRATE y RESET para tener las tres fórmulas en una misma compra, o
        combiná SHARP con cualquiera de las otras dos en un System.
      </p>
    ),
  },
  {
    title: "¿Hay algo que tenga que saber antes de tomarlo?",
    content: (
      <p>
        Solo para mayores de 18 años. No se recomienda durante el embarazo ni
        antes de una cirugía. SHARP contiene cafeína. Si tenés una condición de
        salud, tomás medicación o tenés dudas, consultá con un profesional.
      </p>
    ),
  },
  {
    title: "¿Cómo viene?",
    content: (
      <p>
       Sabor naranja. Sobres individuales. Cajas de 15 o 30 sobres.
      </p>
    ),
  },
   {
    title: "¿Puedo suscribirme?",
    content: (
      <p>
       Sí. Elegí la suscripción en la columna de compra, con la frecuencia que te sirva. La podés pausar cuando quieras.
      </p>
    ),
  },
];

export default function ProductFAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full divide-y divide-gray-200 border-t border-gray-200">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={faq.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-md text-gray-600 font-light">
                {faq.title}
              </span>

              <ChevronDown
                size={16}
                strokeWidth={1.5}
                className={`shrink-0 text-[#7a0010] transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="pb-4 pr-6 text-md leading-relaxed text-gray-500 font-light">
                {faq.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

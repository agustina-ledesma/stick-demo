import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
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
              <span className="text-xs font-medium uppercase text-gray-600">
                {faq.title}
              </span>

              <ChevronDown
                size={16}
                strokeWidth={1.5}
                className={`shrink-0 text-gray-500 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="pb-4 pr-6 text-sm leading-relaxed text-gray-600">
                {faq.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

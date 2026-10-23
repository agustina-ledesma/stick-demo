import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    title: "¿Hay precio por volumen?",
    content: (
      <p>
        Sí. Te respondemos con una propuesta y un precio por unidad según la
        cantidad de personas y la ocasión.
      </p>
    ),
  },
  {
    title: "¿Se puede pedir System u Oasis?",
    content: (
      <p>
        Sí. Son los mismos sticks y los mismos planes que en la tienda, sin
        fórmulas distintas para empresas, comprados por volumen.
      </p>
    ),
  },
  {
    title: "¿Se puede personalizar el packaging?",
    content: (
      <p>
        Sí. Podemos armar cajas personalizadas, pouches de tela o bundles
        individuales, con el branding de tu empresa si lo querés.
      </p>
    ),
  },
  {
    title: "¿Entregan en todo el país?",
    content: (
      <p>
        Sí. Coordinamos la entrega a oficinas, sucursales o al domicilio de cada
        integrante, para la fecha que necesites.
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
      <p>Sabor naranja. Sobres individuales. Cajas de 15 o 30 sobres.</p>
    ),
  },
  {
    title: "¿Puedo suscribirme?",
    content: (
      <p>
        Sí. Elegí la suscripción en la columna de compra, con la frecuencia que
        te sirva. La podés pausar cuando quieras.
      </p>
    ),
  },
];

export default function EmpresasFAQs() {
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
              <span className="text-md text-gray-500 font-light">
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

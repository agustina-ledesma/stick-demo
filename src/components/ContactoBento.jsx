import {
  Boxes,
  Truck,
  ArrowRight,
  RefreshCw,
  BuildingComplex,
  Headphones,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionLabel from "./SectionLabel";

const contactCards = [
  {
    title: "PEDIDOS",
    description:
      "Consultá el estado de tu compra, modificá datos de entrega o encontrá información sobre el seguimiento.",
    label: "Seguimiento",
    icon: Truck,
    action: null,
  },
  {
    title: "PRODUCTOS",
    description: "Conocé nuestras fórmulas, presentaciones y formas de uso.",
    label: "Ver productos",
    icon: Boxes,
    action: "/ciencia",
  },
  {
    title: "SUSCRIPCIONES",
    description:
      "Consultá cómo modificar, gestionar o cancelar tu pedido recurrente.",
    label: "Gestionar",
    icon: RefreshCw,
    action: "/subscription",
  },
  {
    title: "Devoluciones",
    description:
      "Para pedir cambio o reembolzo según politíca vigente",
    label: "Contactanos",
    icon: Headphones,
    action: "#contacto",
  },
    {
    title: "EMPRESAS",
    description:
      "Soluciones para equipos, eventos, regalos corporativos y acciones de bienestar.",
    label: "Conocer más",
    icon: BuildingComplex,
    action: "/empresas",
  },
  {
    title: "Vender Stix",
    description: "Para locales retail o ecommerce que quieran revender.",
    icon: ArrowRight,
    label: "vender stix",
    action: "/vender",
  },
];

export default function ContactoBento() {
  const navigate = useNavigate();

  return (
    <section className="w-full px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-24 bg-[#f4f3f2]">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* COLUMNA 1 — TEXTO */}
        <div className="flex flex-col items-start gap-4  lg:top-24">
          <SectionLabel text="Centro de ayuda" />

          <h2 className="max-w-md text-3xl leading-tight text-gray-600 md:text-4xl">
            Encontrá el canal que necesitás
          </h2>

          <p className="max-w-md text-base leading-relaxed text-gray-600 md:text-lg">
            Elegí una categoría para encontrar información o resolver tu
            consulta. Estamos para ayudarte.
          </p>
        </div>

        {/* COLUMNA 2 — BENTO */}
        <div className="grid grid-cols-1 grid-flow-dense gap-3 sm:grid-cols-2">
          {contactCards.map((card, index) => {
            const Icon = card.icon;
            const wide = index === 0 || index === 5;

            return (
              <article
                key={card.title}
                className={`flex min-h-[170px] flex-col rounded-2xl bg-white p-4 md:min-h-[180px] md:p-5 ${
                  wide ? "sm:col-span-2" : "sm:col-span-1"
                }`}
              >
                <div className="flex items-center justify-start gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3dcda] text-[#72000E]">
                    <Icon size={14} strokeWidth={1.8} />
                  </span>
                  <h3 className="text-md">
                    {card.title}
                  </h3>
                </div>

                <div className="mt-4 flex-1">
                  <p className="mt-2 text-sm text-gray-600">
                    {card.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (card.action === "#contacto") {
                      document.getElementById("contacto")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    } else if (card.action) {
                      navigate(card.action);
                    }
                  }}
                  className="mt-4 flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[#72000E]"
                >
                  {card.label}
                  <ArrowRight size={14} strokeWidth={2} />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

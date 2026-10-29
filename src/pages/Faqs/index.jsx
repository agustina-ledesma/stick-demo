import { useState } from "react";
import {
  Boxes,
  UserRound,
  Compass,
  Truck,
  Repeat,
  BadgeCheck,
  ClipboardCheck,
  ListCheck,
  TriangleAlert,
} from "lucide-react";
import FaqDropdown from "@/components/FaqDropdown";
import SectionLabel from "@/components/SectionLabel";

const NAV_ITEMS = [
  { id: "logistica", label: "Logística", icon: Truck },
  { id: "tracking", label: "Tracking", icon: Compass },
  { id: "gestion", label: "Gestión", icon: Repeat },
  { id: "asistencia", label: "Asistencia", icon: BadgeCheck },
  { id: "devoluciones", label: "Devoluciones", icon: ClipboardCheck },
  { id: "nosotros", label: "Nosotros", icon: UserRound },
  { id: "usos", label: "Usos", icon: ListCheck },
  { id: "productos", label: "Productos", icon: Boxes },
  { id: "precauciones", label: "Precauciones", icon: TriangleAlert },
];

const FAQS = {
  logistica: {
    title: "Recibí tu pedido",
    intro:
      "Conocé las opciones de entrega y qué tener en cuenta al completar tu compra.",
    questions: [
      {
        q: "Recibí tu pedido donde estés",
        a: "El costo y el plazo de entrega se calculan según la dirección de envío y se muestran antes de confirmar la compra. Revisá que los datos estén completos para evitar demoras.",
      },
    ],
  },

  tracking: {
    title: "Seguí tu pedido",
    intro:
      "Encontrá información sobre el seguimiento de tu compra y la entrega.",
    questions: [
      {
        q: "Seguí el estado de tu pedido",
        a: "Cuando el pedido sea despachado, vas a recibir la información de seguimiento disponible para consultar su recorrido. Si necesitás actualizar un dato de entrega, escribinos lo antes posible con tu número de pedido.",
      },
    ],
  },

  gestion: {
    title: "Gestioná tu pedido",
    intro:
      "Qué hacer si necesitás corregir un dato o consultar un cambio en tu compra.",
    questions: [
      {
        q: "Si necesitás cambiar algo de tu pedido",
        a: "Si detectás un error en los datos de entrega o necesitás consultar un cambio, contactanos con tu número de pedido y te indicamos los pasos a seguir. Los cambios quedan sujetos al estado del pedido y a las condiciones informadas al momento de la compra.",
      },
    ],
  },

  asistencia: {
    title: "Asistencia",
    intro:
      "Te contamos cómo contactarnos si surge algún inconveniente con tu pedido.",
    questions: [
      {
        q: "Si tu pedido llegó con un problema",
        a: "Escribinos dentro de las 48 horas de recibido el pedido e incluí tu número de compra y fotos del producto o del embalaje. Así podemos revisar el caso y darte una respuesta.",
      },
    ],
  },

  devoluciones: {
    title: "Devoluciones",
    intro:
      "Conocé cómo iniciar una consulta antes de enviar un producto para su devolución.",
    questions: [
      {
        q: "Consultá antes de enviar el producto",
        a: "Si querés solicitar una devolución, contactanos antes de despachar el producto. Te vamos a indicar si el caso aplica y cómo continuar según las condiciones de la compra. No envíes el pedido por tu cuenta sin recibir primero las instrucciones de nuestro equipo.",
      },
    ],
  },

  nosotros: {
    title: "Sobre Stix",
    intro:
      "Conocé Stix, sus fórmulas funcionales y las opciones para elegir el producto que acompaña tu momento.",
    questions: [
      {
        q: "¿Qué es Stix?",
        a: "Stix es una línea de suplementos funcionales en sobres individuales. Sus fórmulas están pensadas para acompañar distintos momentos del día: foco y descanso.",
      },
      {
        q: "¿Qué productos tiene Stix?",
        a: "SHARP acompaña la concentración y la energía mental. RESET acompaña la preparación para el descanso. SYSTEM combina ambos productos.",
      },
      {
        q: "¿Tengo que comprar los dos productos?",
        a: "No. Podés elegir SHARP o RESET por separado, o combinarlos en SYSTEM según tus necesidades.",
      },
    ],
  },

  usos: {
    title: "Productos y uso",
    intro:
      "Encontrá información sobre cuándo tomar SHARP y RESET, cómo preparar los sobres y qué presentaciones hay disponibles.",
    questions: [
      {
        q: "¿Cuándo se toma SHARP?",
        a: "Podés tomarlo por la mañana, a media mañana o entre 40 y 60 minutos antes de una tarea exigente. Evitá usarlo cerca de la noche porque contiene cafeína.",
      },
      {
        q: "¿Cuándo se toma RESET?",
        a: "Tomalo aproximadamente 40 minutos antes de acostarte. El efecto empieza a sentirse entre 40 y 60 minutos después.",
      },
      {
        q: "¿Cómo se preparan los sobres?",
        a: "Disolvé el contenido de un sobre en agua y mezclá bien antes de tomarlo. Revisá la información específica de cada producto.",
      },
      {
        q: "¿En qué presentaciones vienen?",
        a: "Podés elegir cajas de 15 o 30 sobres, según el producto y la presentación disponible.",
      },
    ],
  },

  productos: {
    title: "SHARP, RESET y SYSTEM",
    intro:
      "Conocé las diferencias entre los productos, cómo funciona SYSTEM y qué opciones de compra tenés.",
    questions: [
      {
        q: "¿Qué es SHARP?",
        a: "SHARP es la fórmula pensada para acompañar la concentración y la energía mental.",
      },
      {
        q: "¿Qué es RESET?",
        a: "RESET es la fórmula pensada para acompañar la preparación para el descanso.",
      },
      {
        q: "¿Qué es SYSTEM?",
        a: "SYSTEM combina SHARP y RESET en una misma compra para acompañar ambos momentos del día.",
      },
      {
        q: "¿Puedo hacer una compra única?",
        a: "Sí. También podés elegir una compra recurrente para recibir el mismo pedido con la frecuencia que definas.",
      },
      {
        q: "¿La suscripción es una membresía?",
        a: "No. Es una compra recurrente. Elegís el pedido y la frecuencia, y vuelve a generarse automáticamente.",
      },
    ],
  },

  precauciones: {
    title: "Antes de tomarlo",
    intro:
      "Revisá las indicaciones de cada fórmula y consultá con un profesional si tenés dudas sobre su uso.",
    questions: [
      {
        q: "¿Qué debo tener en cuenta antes de tomarlo?",
        a: "Si tenés una condición de salud, tomás medicación, estás embarazada o tenés dudas sobre algún ingrediente, consultá con un profesional antes de usar el producto. Revisá siempre las indicaciones específicas de cada fórmula.",
      },
      {
        q: "¿Dónde puedo ver los ingredientes?",
        a: "En cada ficha de producto podés consultar la composición completa y la cantidad de cada ingrediente por sobre.",
      },
    ],
  },
};

export default function Faqs() {
  const [activeCategory, setActiveCategory] = useState("logistica");

  const activeItem = NAV_ITEMS.find((item) => item.id === activeCategory);

  const activeFaq = FAQS[activeCategory];


return (
  <section className="min-h-screen flex items-center w-full px-4 py-8 md:px-8 md:py-10 lg:px-12 lg:py-12 xl:px-16">
    <div className="w-full flex flex-col gap-4">
      {/* ENCABEZADO */}
      <div className="mb-8 flex flex-col gap-2">
        <SectionLabel text="Preguntas frecuentes" />

        <h1 className="text-2xl text-gray-600 md:text-3xl lg:text-4xl">
          Preguntas frecuentes
        </h1>

        <p className="max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
          Encontrá respuestas rápidas sobre los productos, las fórmulas, la
          forma de uso y las opciones de compra de Stix.
        </p>
      </div>

      {/* NAV + CONTENIDO */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
        {/* NAV RESPONSIVE */}
        <nav className="flex w-full flex-row gap-2 overflow-x-auto pb-2 md:sticky md:top-24 md:self-start md:flex-col md:overflow-x-visible md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = activeCategory === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveCategory(id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex w-auto shrink-0 items-center gap-2 rounded-full px-3 py-2 text-left text-[10px] font-medium uppercase transition md:w-full md:gap-3 md:px-3 md:py-2.5 md:text-xs lg:px-4 ${
                  isActive
                    ? "bg-[#72000E] text-white"
                    : "border border-gray-200 bg-white text-gray-500 hover:bg-[#F4F3F2] hover:text-[#72000E]"
                }`}
              >
                <Icon size={14} strokeWidth={1.8} className="shrink-0" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* SECCIÓN DINÁMICA */}
        <div className="min-w-0">
          <div className="mb-2 flex flex-col gap-2 border-b border-gray-200 pb-5">
            <h2 className="text-xl  text-gray-700 md:text-2xl lg:text-3xl">
              {activeFaq.title || activeItem?.label}
            </h2>

            {activeFaq.intro && (
              <p className="max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
                {activeFaq.intro}
              </p>
            )}
          </div>

          <div>
            {activeFaq.questions.map(({ q, a }, index) => (
              <FaqDropdown
                key={`${activeCategory}-${index}`}
                question={q}
                answer={a}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

}

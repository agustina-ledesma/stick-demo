import {
  Check,
  Repeat2,
  Box,
  Clock3,
  Truck,
  CircleCheck,
  ShieldCheck,
  ArrowRight,
  Sun,
  Moon,
  Zap,
  Droplet,
} from "lucide-react";
import GlassPill from "@/components/GlassPill";
import SectionLabel from "@/components/SectionLabel";
import FaqDropdown from "@/components/FaqDropdown";
import StixSharp3D from "@/components/product/StixSharp3D";
import ProductCards from "@/components/ProductCards";

const CONTENTS = [
  {
    title: "Elegí qué recibir",
    tag: "Productos",
    description: "Elegí SHARP, RESET o SYSTEM según lo que necesites.",
    icon: Box,
  },
  {
    title: "Configurá la entrega",
    tag: "Logística",
    description: "Seleccioná la presentación y la frecuencia de entrega.",
    icon: Clock3,
  },
  {
    title: "Confirmá tu compra",
    tag: "Compra",
    description: "Revisá tu pedido y confirmá tu compra.",
    icon: CircleCheck,
  },
  {
    title: "Recibí tu pedido",
    tag: "Envío",
    description: "Recibí tu pedido según la frecuencia elegida.",
    icon: Truck,
  },
];

const FAQ_ITEMS = [
  {
    question: "¿Puedo hacer una compra única?",
    answer:
      "Sí. Podés comprar SHARP, RESET o SYSTEM por única vez, sin necesidad de activar una compra recurrente.",
  },
  {
    question: "¿Puedo suscribirme a SYSTEM?",
    answer:
      "Sí. Podés elegir SHARP, RESET o SYSTEM y configurar la frecuencia de entrega según tus necesidades.",
  },
  {
    question: "¿La suscripción es una membresía?",
    answer:
      "No. Es una compra recurrente: elegís el producto y la frecuencia, y el mismo pedido se genera automáticamente.",
  },
  {
    question: "¿Puedo modificar o cancelar mi suscripción?",
    answer:
      "Sí. Podés gestionar tu pedido y la frecuencia de entrega desde tu cuenta, según las condiciones informadas al momento de comprar.",
  },
];

const products = [
  {
    id: "Sharp",
    icon: Sun,
    label: "DÍA",
    title: "SHARP",
    subtitle: "FOCO SOSTENIDO",
    path: "/sharp",
    Render3D: StixSharp3D,
  },
  {
    id: "reset",
    icon: Moon,
    label: "NOCHE",
    title: "RESET",
    subtitle: "Descanso reparador",
    path: "/reset",
    Render3D: StixSharp3D,
  },
  {
    id: "system",
    icon: Zap,
    label: "combinación",
    title: "system",
    subtitle: "El día completo",
    discount: "Ahorrás 15 %",
    path: "/system",
    Render3D: StixSharp3D,
  },
];

export default function Suscription() {
  return (
    <>
      {/* HERO */}

      <section className="flex min-h-screen w-full items-center bg-white px-6 py-16 text-[#1B1D1C] md:px-10 md:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
            {/* COLUMNA 1 — TEXTO */}
            <div className="order-2 flex flex-col items-start lg:order-1">
              <SectionLabel text="Suscripción" />

              <div className="flex flex-col gap-4">
                <h1 className="mt-6 max-w-xl text-2xl font-normal leading-[1.05] tracking-tight text-[#72000E] md:text-4xl">
                  Tu fórmula, siempre a tiempo
                </h1>

                <p className="max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
                  Elegí qué querés recibir, cada cuánto y dejá que Stix se
                  encargue del resto. Una compra recurrente pensada para
                  acompañar tu rutina, sin complicaciones.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <button
                    className="min-h-10 w-fit rounded-full bg-[#72000E] px-6 py-2.5 text-sm font-semibold uppercase text-white transition hover:bg-[#56000F]"
                    onClick={() => {
                      document.getElementById("productos")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    Elegir qué recibir
                  </button>

                  <button
                    className="w-fit py-2.5 text-md text-[#72000E] transition hover:text-[#56000F] flex items-center gap-2"
                    onClick={() => {
                      document.getElementById("como-funciona")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    <span>Cómo funciona</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
                <span className="text-gray-600 text-sm my-3">
                  La compra única sigue siendo la opción por defecto. La
                  suscripción es opcional.
                </span>
              </div>
            </div>

            {/* COLUMNA 2 — IMAGEN */}
            <div className="relative order-1 min-h-[320px] overflow-hidden rounded-3xl sm:min-h-[420px] lg:order-2 lg:min-h-[600px]">
              <img
                src="/images/suscripcion/hero.png"
                alt="Suscripción Stix"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ ES */}
      <section className="grid w-full gap-10 px-5 py-24 md:grid-cols-2 md:items-stretch md:gap-16 md:px-10 md:py-20 lg:px-20">
        <div className="flex h-full flex-col gap-5">
          <SectionLabel text="¿qué es?" />

          <h2 className="text-2xl leading-tight tracking-tight text-gray-600 lg:text-4xl">
            Una compra recurrente, no una membresía
          </h2>

          <p className="text-md leading-relaxed text-gray-600">
            La suscripción es una forma simple de repetir una compra. Elegís qué
            querés recibir, en qué presentación y con qué frecuencia. Después,
            el mismo pedido se genera de manera automática.
          </p>

          <p className="text-md leading-relaxed text-gray-600">
            No es un club, no tiene beneficios escondidos y no necesitás pagar
            una cuota para pertenecer. Es tu compra de siempre, programada para
            que no tengas que acordarte cada vez.
          </p>
        </div>

        {/* BENEFICIOS */}
        <div className="flex h-full items-center justify-center">
          <div className="flex w-full max-w-md flex-col divide-y divide-gray-200">
            <div className="flex items-start gap-5 py-6 first:pt-0">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f3dcda] text-[#72000E]">
                <Check size={21} strokeWidth={1.7} />
              </div>

              <div className="pt-1">
                <h3 className="text-base tracking-tight text-[#72000E]">
                  Cero cuotas ocultas
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Solo abonás el valor exacto de las fórmulas que recibís.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 py-6">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f3dcda] text-[#72000E]">
                <Repeat2 size={21} strokeWidth={1.7} />
              </div>

              <div className="pt-1">
                <h3 className="text-base tracking-tight text-[#72000E]">
                  Autonomía absoluta
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Modificás fechas, pausás o cancelás desde tu panel en
                  segundos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 py-6 last:pb-0">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f3dcda] text-[#72000E]">
                <ShieldCheck size={21} strokeWidth={1.7} />
              </div>

              <div className="pt-1">
                <h3 className="text-base tracking-tight text-[#72000E]">
                  Garantía de stock
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Tu lote mensual queda reservado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="productos" className="w-full px-5 py-20 md:px-10 md:py-20 lg:px-20">
        <div className="flex flex-col gap-2 my-16">
          <SectionLabel text="¿qué podes recibir?" />
          <h2 className="text-2xl text-gray-600 lg:text-4xl">
            Un producto o un System
          </h2>
        </div>
        <ProductCards products={products} />
      </section>
      {/* CÓMO FUNCIONA */}
      <section
        id="como-funciona"
        className="flex h-fit w-full flex-col px-5 py-20 md:px-10 md:pb-20 lg:px-20"
      >
        <div className="flex flex-col gap-2">
          <SectionLabel text="¿cómo funciona?" />
          <h2 className="text-2xl text-gray-600 lg:text-4xl">
            Lo elegís una vez, después llega solo
          </h2>
        </div>

        <div className="mt-8 grid w-full gap-4 sm:grid-cols-2 md:mt-10 lg:flex lg:justify-between">
          {CONTENTS.map(({ title, tag, description, icon: Icon }) => (
            <div
              key={title}
              className="flex h-[300px] w-full flex-col rounded-xl bg-[#f4f3f2] p-6 lg:flex-1"
            >
              <GlassPill icon={Icon} text={tag} variant="dark" />

              <div className="mt-auto">
                <h3 className="mb-3 text-sm font-bold uppercase leading-snug text-[#2a2a2a]">
                  {title}
                </h3>

                <div className="h-[58px]">
                  <p className="text-md leading-snug text-gray-600">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* PREGUNTAS FRECUENTES */}
      <section className="w-full px-5 py-20 md:px-10 md:py-20 lg:px-20">
        <div className="grid w-full gap-10 md:grid-cols-[1fr_1.6fr]">
          <div className="flex flex-col gap-2">
            <SectionLabel text="FAQs" />

            <h2 className="text-lg text-gray-600 md:text-[28px]">
              Preguntas frecuentes
            </h2>

            <p className="mt-4 max-w-xs text-md leading-relaxed text-gray-600">
              Resolvemos las dudas más comunes sobre cómo comprar, suscribirte y
              recibir Stix.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map(({ question, answer }) => (
              <FaqDropdown key={question} question={question} answer={answer} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

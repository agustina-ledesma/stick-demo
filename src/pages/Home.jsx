import Carousel from "@/components/Carousel";
import CarruselProfesionales from "@/components/CarruselProfesionales";
import FaqDropdown from "@/components/FaqDropdown";
import SectionLabel from "@/components/SectionLabel";
import ProductCardsHome from "@/components/ProductCardsHome";
import { ReactLenis } from "lenis/react";

const FAQS = [
  {
    question: "¿Qué es Stix?",
    answer:
      "Stix es una línea de suplementos funcionales en sobres, pensados para acompañar distintos momentos del día. SHARP acompaña la concentración y la energía mental, mientras que RESET ayuda a preparar el cuerpo para el descanso.",
  },
  {
    question: "¿Para qué sirve cada producto?",
    answer:
      "SHARP está pensado para momentos que requieren foco y atención. RESET acompaña la transición hacia el descanso y la rutina nocturna.",
  },
  {
    question: "¿Tengo que tomar los dos productos?",
    answer:
      "No. Podés elegir SHARP o RESET según tus necesidades, o combinarlos en un System. No hace falta tomar ambos todos los días.",
  },
  {
    question: "¿Qué es un System?",
    answer:
      "System combina SHARP y RESET en una misma compra para acompañar distintos momentos del día: la concentración y la energía mental, y la preparación para el descanso.",
  },
  {
    question: "¿Hay compra única y suscripción?",
    answer:
      "Sí. Podés hacer una compra única o elegir una suscripción para recibir tus productos automáticamente con la frecuencia que elijas.",
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <main className="h-screen">
        <Carousel />
      </main>

      {/* PRODUCTOS */}
      <section id="products" className="flex min-h-screen w-full items-start py-8 lg:py-12">
        <div className="flex w-full flex-col gap-8 px-6 md:px-8 lg:flex-row lg:items-start lg:gap-8 lg:px-10">
          <div className="mt-20 flex flex-col gap-3 lg:w-[28%] lg:shrink-0">
            <SectionLabel text="Tu día completo" />

            <h2 className="mt-1 max-w-sm text-2xl leading-tight tracking-tight text-gray-600 lg:text-4xl">
              Dos fórmulas, dos momentos de tu día
            </h2>

            <p className="text-base text-gray-600">
              Dos fórmulas para acompañar distintos momentos de tu día. Elegí
              ambas y ahorrá un 15 %.
            </p>

            <div className="mt-4 flex flex-col justify-center gap-1 rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bristone uppercase text-[#72000E]">
                  SHARP + RESET
                </span>

                <span className="shrink-0 rounded-full bg-[#F5DEDC] px-3 py-1 text-xs font-semibold uppercase text-[#8B0012]">
                  Ahorrá un 15 %
                </span>
              </div>

              <span className="text-sm text-gray-600">
                Tu día de punta a punta
              </span>

              <button
                type="button"
                className="mt-2 w-fit rounded-full bg-[#72000E] px-4 py-2 text-sm font-semibold uppercase text-white transition-colors hover:bg-[#5E0010]"
              >
                VER SYSTEM
              </button>
            </div>
          </div>

          <div className="w-full min-w-0 lg:flex-1">
            <ProductCardsHome />
          </div>
        </div>
      </section>
      <ReactLenis root>
        <main>
          {/* ¿ES PARA VOS? */}
          <section className="sticky top-0 flex min-h-screen w-full items-center bg-[#F4F3F2] px-6 py-12 md:px-8 md:py-16 lg:px-10 lg:py-20">
            <div className="grid w-full grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
              {/* TEXTO */}
              <div className="order-2 flex flex-col justify-center gap-2 lg:order-1">
                <SectionLabel text="¿Es para vos?" />

                <h2 className="text-lg text-gray-600 md:text-[28px] md:leading-tight">
                  ¿Qué momento del día te cuesta más?
                </h2>

                <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-600">
                  Si te cuesta concentrarte durante el día o necesitás preparar
                  el cuerpo para descansar por la noche, Stix tiene dos fórmulas
                  para acompañarte en cada momento.
                </p>

                <p className="mt-2 max-w-lg text-base leading-relaxed text-gray-600">
                  Elegí SHARP, RESET o combiná ambas con SYSTEM y ahorrá un 15
                  %.
                </p>

                <button
                  type="button"
                  className="my-4 w-fit rounded-full bg-[#72000E] px-4 py-2 text-sm font-semibold uppercase text-white transition-colors hover:bg-[#5E0010] xl:py-3"
                >
                  Encontrá tu momento
                </button>
              </div>

              {/* IMAGEN */}
              <div className="order-1 w-full overflow-hidden rounded-2xl lg:order-2">
                <img
                  src="/images/home/cansancio.png"
                  alt="Una persona atravesando un momento de cansancio"
                  className="h-[320px] w-full rounded-2xl object-cover sm:h-[400px] md:h-[500px] lg:h-[580px]"
                />
              </div>
            </div>
          </section>

          {/* PROFESIONALES */}
          <section className="sticky top-0 flex min-h-screen w-full overflow-hidden rounded-t-2xl bg-white p-3 sm:p-4 md:p-5 lg:p-6">
            <div className="w-full px-3 md:px-3 lg:px-4">
              <CarruselProfesionales />
            </div>
          </section>
        </main>
      </ReactLenis>

      {/* PREGUNTAS FRECUENTES */}
      <section className="w-full bg-[#F4F3F2] py-16 md:py-20">
        <div className="grid w-full grid-cols-1 gap-10 px-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-10 md:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-10">
          <div className="flex min-w-0 flex-col gap-2">
            <SectionLabel text="FAQs" />

            <h2 className="text-lg text-gray-600 md:text-[28px]">
              Preguntas frecuentes
            </h2>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-600">
              Todo lo que necesitás saber sobre los productos de Stix: para qué
              sirve cada fórmula, cuándo tomarla y qué opción elegir según tu
              rutina.
            </p>
          </div>

          <div className="w-full min-w-0">
            <div className="w-full space-y-4">
              {FAQS.map(({ question, answer }) => (
                <FaqDropdown
                  key={question}
                  question={question}
                  answer={answer}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

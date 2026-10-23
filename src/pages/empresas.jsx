import { useRef, useState } from "react";
import {
  Atom,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Mail,
  Gift,
  MessageCircle,
  ArrowUpRight,
  ArrowRight,
  Clock3,
  Sun,
  Moon,
} from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { ReactLenis } from "lenis/react";
import EmpresasFAQs from "@/components/FaqsEmpresas";
import { Link } from "react-router-dom";
import FormEmpresas from "@/components/FormEmpresas";
import GlassPill from "@/components/GlassPill";

export default function Empresas() {
  const beneficiosCarouselRef = useRef(null);
  const [activeBenefit, setActiveBenefit] = useState(0);

  const beneficios = [
    {
      id: 1,
      tag: "Onboarding",
      title: "Kit de bienvenida",
      content:
        "Onboarding premium que marca el estándar de cuidado institucional desde el primer día de incorporación.",
    },
    {
      id: 2,
      tag: "Eventos",
      title: "Offsites, Workshops, Eventos",
      content:
        "Foco matutino con SHARP e hidratación celular continua con HYDRATE para sesiones de alto desgaste mental.",
    },
    {
      id: 3,
      tag: "Team",
      title: "Regalos Corporativos",
      content:
        "Un presente funcional y sofisticado que realmente se consume y aporta salud metabólica verificada.",
    },
    {
      id: 4,
      tag: "Bienestar",
      title: "Programas Continuos de bienestar",
      content:
        "Reposición mensual en estaciones de café, áreas de descanso y cocinas para un hábito de vitalidad sostenido.",
    },
  ];

  const contenidos = [
    {
      id: 1,
      tag: "PASO 1",
      title: "Nos contás sobre tu equipo",
      description:
        "Tamaño, ubicación, modalidad (presencial, híbrido, remoto) y qué estás buscando resolver. Con eso diseñamos la propuesta correcta.",
    },
    {
      id: 2,
      tag: "PASO 2",
      title: "Definimos productos y cantidades",
      description:
        "Elegimos juntos los SKUs (Sharp, Reset o ambos), formato (caja 15 o 30 sticks) y frecuencia de entrega. Adaptado al tamaño y ritmo de tu equipo.",
    },
    {
      id: 3,
      tag: "PASO 3",
      title: "Recibís la propuesta final",
      description:
        "Presupuesto claro, con escala por volumen, plazos de entrega y opciones de pago",
    },
    {
      id: 4,
      tag: "PASO 4",
      title: "Coordinamos la entrega",
      description:
        "Entregamos en oficina central, sucursales o directo al domicilio de cada integrante (ideal para equipos remotos o híbridos). Reposición mensual automática si querés suscribir el programa.",
    },
  ];

  const scrollBenefit = (direction) => {
    const container = beneficiosCarouselRef.current;

    if (!container) return;

    const card = container.querySelector("article");

    if (!card) return;

    const gap = 16;
    const scrollAmount = card.offsetWidth + gap;

    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleBenefitScroll = () => {
    const container = beneficiosCarouselRef.current;

    if (!container) return;

    const card = container.querySelector("article");

    if (!card) return;

    const gap = 16;
    const cardWidth = card.offsetWidth + gap;

    const index = Math.round(container.scrollLeft / cardWidth);

    setActiveBenefit(Math.max(0, Math.min(index, beneficios.length - 1)));
  };

  const scrollToBenefit = (index) => {
    const container = beneficiosCarouselRef.current;

    if (!container) return;

    const card = container.children[index];

    if (!card) return;

    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

    setActiveBenefit(index);
  };

  const contenidosCarouselRef = useRef(null);
  const [activeContenido, setActiveContenido] = useState(0);

  const scrollContenido = (direction) => {
    const container = contenidosCarouselRef.current;

    if (!container) return;

    const card = container.querySelector("article");

    if (!card) return;

    const gap = 16;
    const scrollAmount = card.offsetWidth + gap;

    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleContenidoScroll = () => {
    const container = contenidosCarouselRef.current;

    if (!container) return;

    const card = container.querySelector("article");

    if (!card) return;

    const gap = 16;
    const cardWidth = card.offsetWidth + gap;

    const index = Math.round(container.scrollLeft / cardWidth);

    setActiveContenido(Math.max(0, Math.min(index, contenidos.length - 1)));
  };

  const scrollToContenido = (index) => {
    const container = contenidosCarouselRef.current;

    if (!container) return;

    const card = container.children[index];

    if (!card) return;

    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

    setActiveContenido(index);
  };

  return (
    <>
      <main className="min-h-screen bg-[#F4F3F2] text-[#1B1D1C]">
        {/* HERO */}
        <section className="w-full">
          <div
            className="relative flex h-screen w-full items-end bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/empresas/hero.png')",
            }}
          >
            <div className="relative z-10 mx-auto grid w-full max-w-8xl grid-cols-1 gap-8 px-4 pb-10 md:grid-cols-[1.5fr_0.7fr] md:items-center md:px-10 md:pb-12 lg:px-12">
              {/* COLUMNA 1: TEXTO */}
              <div className="max-w-6xl">
                <h1 className="text-2xl font-semibold uppercase leading-tight text-white md:text-4xl">
                  Llevá Stix a tu equipo
                </h1>

                <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
                  Stix es el sistema de suplementación funcional premium que las
                  empresas incorporan para sostener el rendimiento diario de su
                  talento clave. Programas pensados para equipos presenciales,
                  híbridos y remotos.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("b2b")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="mt-6 h-12 rounded-full bg-[#72000E] px-7 text-sm font-semibold uppercase text-white transition hover:bg-[#5d000b]"
                >
                  Quiero una propuesta
                </button>
              </div>

              {/* COLUMNA 2: PILLS */}
              <div className="hidden flex-col gap-4 md:flex md:items-end md:justify-end h-full">
                <GlassPill
                  icon={Sun}
                  text="SHARP - Foco y energía"
                  defaultOpen={true}
                />

                <GlassPill
                  icon={Moon}
                  text="RESET - Sueño reparador"
                  defaultOpen={true}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <section className="w-full py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-0">
          {/* ENCABEZADO */}
          <div className="mx-auto my-8 flex flex-col gap-4">
            <SectionLabel text="4 simples pasos" />

            <h2 className="text-2xl font-normal text-[#72000E] lg:text-4xl">
              Cómo funciona
            </h2>

            <p className="max-w-lg text-md text-gray-600">
              Gestión simple, atención personalizada y entregas a tiempo.
            </p>
          </div>

          {/* LG — 4 CARDS */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-5">
            {contenidos.map((contenido, index) => (
              <article
                key={contenido.id}
                className="flex min-h-[340px] flex-col rounded-2xl bg-[#f4f3f2] p-7 text-left xl:min-h-[370px] xl:p-8"
              >
                {/* PASO ARRIBA */}
                <span className="font-mono text-sm tracking-wide text-[#72000E]">
                  PASO {index + 1}
                </span>

                {/* BLOQUE ABAJO */}
                <div className="mt-6">
                  <div className="mb-1 ">
                    <h3 className="text-lg font-normal leading-snug text-[#1B1D1C] xl:text-xl">
                      {contenido.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-black/60">
                    {contenido.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* MOBILE + MD — SCROLL */}
          <div className="lg:hidden">
            <div
              ref={contenidosCarouselRef}
              onScroll={handleContenidoScroll}
              className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 md:gap-5"
            >
              {contenidos.map((contenido, index) => (
                <article
                  key={contenido.id}
                  className="flex h-[280px] w-[275px] min-w-[275px] snap-center flex-col rounded-2xl bg-[#f4f3f2] p-6 text-left"
                >
                  {/* PASO ARRIBA */}
                  <span className="font-mono text-sm tracking-wide text-[#72000E]">
                    PASO {index + 1}
                  </span>

                  {/* BLOQUE ABAJO */}
                  <div className="mt-6">
                    <div className="mb-1 ">
                      <h3 className="text-base font-normal leading-tight text-[#1B1D1C]">
                        {contenido.title}
                      </h3>
                    </div>

                    <p className="text-xs leading-relaxed text-black/60">
                      {contenido.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* CONTROLES */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => scrollContenido("prev")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#1B1D1C] transition hover:bg-black/5"
                aria-label="Paso anterior"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => scrollContenido("next")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#1B1D1C] transition hover:bg-black/5"
                aria-label="Siguiente paso"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="mx-auto py-4 text-center">
            <button
              type="button"
              onClick={() => {
                document.getElementById("b2b")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="mt-6 h-12 rounded-full bg-[#72000E] px-7 text-sm font-normal text-white transition hover:bg-[#5d000b] uppercase"
            >
              Hablar con Stix
            </button>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f4f3f2] p-4 py-12 md:px-8 md:py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 my-8">
          <SectionLabel text="Contacto" />
          <h2 className="text-2xl lg:text-4xl">Contanos qué necesitás.</h2>
          <p className="text-md text-gray-600">
            Completá el formulario y te respondemos con una propuesta a la
            medida de tu equipo o evento.
          </p>
        </div>

        <div
          id="b2b"
          className="mx-auto grid w-full max-w-8xl grid-cols-1 items-start gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:gap-8"
        >
          {/* FORMULARIO */}
          <FormEmpresas />

          {/* COLUMNA SECUNDARIA */}
          <div className="flex flex-col items-start gap-6">
            {/* WHATSAPP */}
            <div className="flex h-fit w-full flex-col justify-center rounded-2xl bg-white p-6 md:p-8 lg:p-9">
              <div className="mb-6">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3dcda] text-[#72000E]">
                  <MessageCircle size={23} strokeWidth={1.7} />
                </span>

                <h3 className="text-xl text-[#1B1D1C] md:text-2xl">
                  ¿Preferís escribirnos por WhatsApp?
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-500 md:text-base">
                  Elegí el contacto según el tipo de consulta.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/549XXXXXXXXXX"
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#72000E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#56000F]"
                >
                  WhatsApp para oficinas
                </a>

                <a
                  href="https://wa.me/549XXXXXXXXXX"
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-[#1B1D1C] transition hover:border-[#72000E] hover:text-[#72000E]"
                >
                  WhatsApp para eventos
                </a>
              </div>
            </div>

            {/* TIEMPO DE RESPUESTA */}
            <div className="flex h-fit w-full items-start gap-4 rounded-2xl border border-gray-200/80 bg-white/70 p-6 md:p-8">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3dcda] text-[#72000E]">
                <Clock3 size={16} strokeWidth={1.7} />
              </span>

              <div>
                <h3 className="text-base text-[#1B1D1C] md:text-lg">
                  Estamos para ayudarte
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  Te daremos una respuesta en un plazo de 24 horas hábiles para
                  ayudarte a encontrar la mejor opción para tu equipo o evento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex  w-full  bg-white p-3 text-black sm:p-4 md:p-5 lg:p-6">
        <section className="grid w-full flex-1 grid-cols-1 content-center gap-4 overflow-y-auto px-5 py-6 sm:gap-5 sm:px-6 sm:py-8 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-10 lg:py-10">
          {/* Columna 1 */}
          <div className="flex h-fit flex-col items-start gap-2">
            <SectionLabel text="Faqs" />
            <h2 className="text-2xl lg:text-3xl text-gray-600 max-w-lg">
              Preguntas Frecuentes de Empresa
            </h2>
            <p className="text-md text-gray-500">
              {" "}
              Lo que suelen preguntarnos antes de pedir una propuesta.
            </p>
            <Link
              to="/faqs"
              className="inline-flex items-center gap-2 underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Ver todas las preguntas frecuentes
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Columna 2 */}
          <div className="min-w-0">
            <EmpresasFAQs />
          </div>
        </section>
      </section>
    </>
  );
}

import { useRef, useState } from "react";
import {
  Atom,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Mail,
  Gift,
} from "lucide-react";

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
      title: "Contanos qué estás organizando y para quién es",
      description:
        "Compartí con nuestro equipo el tipo de acción, perfil de las personas y fecha estimada de entrega",
    },
    {
      id: 2,
      tag: "PASO 2",
      title: "Definimos productos, cantidades y presentación",
      description:
        "Elegimos juntos las fórmulas óptimas y los formatos que mejor se adapten al volumen requerido.",
    },
    {
      id: 3,
      tag: "PASO 3",
      title:
        "Recibís una propuesta con la opción más conveniente para tu equipo",
      description:
        "Un presupuesto claro, con desglose de escala corporativa, plazos de ejecución y empaque listo.",
    },
    {
      id: 4,
      tag: "PASO 4",
      title: "Coordinamos la entrega",
      description:
        "Garantizamos envío puntual a oficinas centrales, sucursales múltiples o domicilios particulares de cada integrante.",
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
            <div className="relative z-10 w-full max-w-7xl px-6 pb-10 md:px-10 md:pb-12 lg:mx-auto lg:px-0">
              <div className="max-w-6xl">
                <h1 className="text-2xl font-semibold uppercase leading-tight text-white md:text-4xl">
                  Llevá Stix a tu equipo
                </h1>

                <p className="mt-4 max-w-4xl text-base leading-relaxed text-white/85 md:text-lg">
                  Una propuesta simple para acompañar a las personas de tu
                  empresa, equipo o evento. <br /> Elegí las fórmulas que mejor
                  encajan con la ocasión y armemos una propuesta a medida.
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
            </div>
          </div>
        </section>
      </main>

      {/* SECCIÓN BENEFICIOS */}
      <section
        className="flex h-fit w-full items-center py-16 lg:min-h-screen"
        style={{
          backgroundImage: "url('/images/empresas/beneficios.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-0">
          {/* TÍTULO */}
          <div className="max-w-xl my-8 flex flex-col gap-3 text-white">
            <h2 className="text-xl font-semibold uppercase text-white lg:text-3xl">
              Una forma concreta de sumar bienestar
            </h2>
            <p className="text-md">
              Stix puede formar parte de kits de bienvenida, regalos para
              equipos, encuentros, eventos o acciones de bienestar. <br /> Son
              sobres individuales, fáciles de guardar y simples de incorporar a
              la jornada.
            </p>
          </div>

          {/* LG — 2 COLUMNAS / 2 FILAS */}
          <div className="hidden lg:grid lg:grid-cols-[315px_315px] lg:gap-x-5 lg:gap-y-4">
            {beneficios.map((beneficio) => (
              <article
                key={`${beneficio.id}-${beneficio.title}`}
                className="flex h-[135px] w-[315px] flex-col rounded-lg border border-white/20 bg-white/10 p-5 text-left backdrop-blur-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="min-w-0 text-sm font-semibold uppercase leading-tight text-white">
                    {beneficio.title}
                  </h3>

                  <span className="inline-flex shrink-0 items-center rounded-full border border-white/20 bg-white/15 px-2 py-1 text-[9px] font-semibold uppercase leading-none text-white backdrop-blur-md">
                    {beneficio.tag}
                  </span>
                </div>

                <p className="mt-3 text-xs leading-[1.4] text-white">
                  {beneficio.content}
                </p>
              </article>
            ))}
          </div>

          {/* MOBILE + MD — CARRUSEL */}
          <div className="lg:hidden">
            <div
              ref={beneficiosCarouselRef}
              onScroll={handleBenefitScroll}
              className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 md:gap-5"
            >
              {beneficios.map((beneficio) => (
                <article
                  key={`${beneficio.id}-${beneficio.title}`}
                  className="flex h-[135px] w-[315px] min-w-[315px] snap-center flex-col rounded-lg border border-white/20 bg-white/10 p-5 text-left backdrop-blur-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 text-sm font-semibold uppercase leading-tight text-white">
                      {beneficio.title}
                    </h3>

                    <span className="inline-flex shrink-0 items-center rounded-full border border-white/20 bg-white/15 px-2 py-1 text-[9px] font-semibold uppercase leading-none text-white backdrop-blur-md">
                      {beneficio.tag}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-[1.4] text-white/75">
                    {beneficio.content}
                  </p>
                </article>
              ))}
            </div>

            {/* CONTROLES */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => scrollBenefit("prev")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                aria-label="Beneficio anterior"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => scrollBenefit("next")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                aria-label="Siguiente beneficio"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#F4F3F2] px-6 py-20 md:px-10 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          {/* INTRO */}
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold uppercase leading-tight text-[#72000E] lg:text-3xl">
              Elegimos el formato según lo que necesitás.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-secondary">
              Podemos ayudarte a definir qué productos incluir, cuántas unidades
              necesitás y cómo presentarlos. Podés elegir SHARP, HYDRATE, RESET,
              una combinación de dos o el PROTOCOLO completo.
            </p>
          </div>

          {/* BANNER */}
          <div
            className="relative mt-12 flex min-h-[380px] w-full items-center overflow-hidden rounded-2xl bg-[#72000E] p-8 md:p-10 lg:mt-16 lg:bg-cover lg:bg-center lg:bg-no-repeat lg:px-16"
            style={{
              backgroundImage: "url('/images/empresas/banner.png')",
            }}
          >
            {/* EFECTO MOBILE */}
            {/* <div className="absolute inset-0 bg-[#72000E]/80 lg:hidden" /> */}

            {/* CONTENIDO */}
            <div className="relative z-10 max-w-lg text-white">
              <h2 className="text-2xl font-semibold uppercase leading-tight">
                Diseñado para el ciclo de 24 horas del ser humano
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base">
                Desde la agudeza mental matutina sin taquicardia hasta la
                reposición de sales esenciales por la tarde y el descanso
                celular reparador nocturno.
              </p>
            </div>
          </div>

          {/* PACKAGING */}
          <div className="mt-12 grid grid-cols-1 items-center gap-8  p-4 rounded-xl bg-white pt-8 md:grid-cols-2 lg:mt-16 lg:pt-10">
            {/* TEXTO + ICONO */}
            <div className="flex flex-col items-start gap-4 lg:flex-row">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#72000E] text-white">
                <Gift size={18} strokeWidth={1.8} />
              </div>

              <div className="flex max-w-xl flex-col">
                <span className="text-sm font-semibold uppercase leading-tight text-[#72000E]">
                  Presentación y opciones de packaging
                </span>

                <span className="mt-2 text-sm leading-relaxed text-secondary">
                  Cajas personalizadas, pouches de tela o bundles individuales
                  con packaging con tu branding corporativo opcional. Diseños de
                  impacto editorial que reflejan la identidad de tu compañía.
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex md:justify-end">
              <button
                type="button"
                className="h-10 rounded-full bg-[#72000E] px-5 text-xs font-semibold uppercase text-white transition hover:bg-[#5d000b]"
              >
                Branding co-branded disponible
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#F4F3F2] py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-0">
          <div className="flex flex-col gap-4 text-center mx-auto my-8">
            <span className="font-semibold text-[#72000E] text-sm">
              4 SIMPLES PASOS
            </span>
            <h2 className="text-3xl font-semibold text-[#72000E]">
              CÓMO FUNCIONA
            </h2>
            <p className="text-md max-w-lg mx-auto text-secondary">
              Un flujo sin complejidades logísticas diseñado para darte
              agilidad, soporte personalizado y entrega rápida en tu fecha
              prevista.
            </p>
          </div>
          {/* LG — 4 CARDS CENTRADAS */}
          <div className="hidden lg:flex justify-center">
            <div className="grid grid-cols-4 gap-5">
              {contenidos.map((contenido) => (
                <article
                  key={contenido.id}
                  className="flex h-[280px] w-[275px] flex-col rounded-2xl  bg-white p-6 text-left"
                >
                  <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-[#72000E] py-2 px-4 text-xs font-semibold uppercase leading-none text-white">
                    {contenido.tag}
                  </span>

                  <h3 className="mt-5 min-h-[38px] text-base font-semibold uppercase leading-tight text-[#1B1D1C]">
                    {contenido.title}
                  </h3>

                  <p className="mt-4 text-sm text-black/60">
                    {contenido.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* MOBILE + MD — SCROLL */}
          <div className="lg:hidden">
            <div
              ref={contenidosCarouselRef}
              onScroll={handleContenidoScroll}
              className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 md:gap-5"
            >
              {contenidos.map((contenido) => (
                <article
                  key={contenido.id}
                  className="flex h-[280px] w-[275px] min-w-[275px] snap-center flex-col rounded-2xl  bg-white p-6 text-left"
                >
                  <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-[#72000E] px-4 py-2 text-xs font-semibold uppercase leading-none text-white">
                    {contenido.tag}
                  </span>

                  <h3 className="mt-5 min-h-[38px] text-base font-semibold uppercase leading-tight text-[#1B1D1C]">
                    {contenido.title}
                  </h3>

                  <p className="mt-4 text-sm leading-[1.5] text-black/60">
                    {contenido.description}
                  </p>
                </article>
              ))}
            </div>

            {/* CONTROLES */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => scrollContenido("prev")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#1B1D1C] transition hover:bg-black/5"
                aria-label="Contenido anterior"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => scrollContenido("next")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#1B1D1C] transition hover:bg-black/5"
                aria-label="Siguiente contenido"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div className="mx-auto py-4 text-center">
            <button
              type="button"
              onClick={() => {
                document.getElementById("b2b")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="mt-6 h-12 rounded-full bg-[#72000E] px-7 text-sm font-semibold uppercase text-white transition hover:bg-[#5d000b]"
            >
              hablar con stix
            </button>
          </div>
        </div>
      </section>
      <section
        className="flex h-[800px] w-full items-center bg-cover bg-center bg-no-repeat py-12 md:py-16 lg:py-20"
        style={{
          backgroundImage: "url('/images/empresas/bg-form.png')",
        }}
      >
        <div
          id="b2b"
          className="mx-auto flex w-full max-w-7xl items-center justify-center px-6 md:px-10 lg:justify-end lg:px-0"
        >
          <form className="flex w-full max-w-[650px] flex-col rounded-2xl bg-[#56000F] p-6 md:p-8 lg:h-[570px] lg:w-[650px] lg:p-10">
            {/* TÍTULO */}
            <div className="mb-7">
              <h2 className="text-xl font-semibold uppercase leading-tight text-white md:text-2xl">
                CONTACTO B2B
              </h2>

              <p className="mt-2 max-w-md text-sm md:text-md leading-relaxed text-white">
                Completá el formulario y te contactamos en menos de 24 horas con
                una propuesta a la medida de tu equipo o evento.
              </p>
            </div>

            {/* NOMBRE + EMPRESA */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="nombre"
                  className="text-sm font-medium text-white"
                >
                  Nombre
                </label>

                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  className="h-10 w-full rounded-lg border border-white/10 bg-white px-3 text-xs text-[#1B1D1C] outline-none placeholder:text-black/35 focus:border-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="empresa"
                  className="text-sm font-medium text-white"
                >
                  Empresa u organización
                </label>

                <input
                  id="empresa"
                  type="text"
                  name="empresa"
                  placeholder="Nombre de la empresa"
                  className="h-10 w-full rounded-lg border border-white/10 bg-white px-3 text-xs text-[#1B1D1C] outline-none placeholder:text-black/35 focus:border-white"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="mt-4 flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email
              </label>

              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  className="h-10 w-full rounded-lg border border-white/10 bg-white px-3 pr-10 text-xs text-[#1B1D1C] outline-none placeholder:text-black/35 focus:border-white"
                />

                <Mail
                  size={16}
                  strokeWidth={1.8}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40"
                />
              </div>
            </div>

            {/* MENSAJE */}
            <div className="mt-4 flex flex-1 flex-col gap-1.5">
              <label
                htmlFor="mensaje"
                className="text-sm font-medium text-white"
              >
                Mensaje
              </label>

              <textarea
                id="mensaje"
                name="mensaje"
                placeholder="Contanos qué necesitás"
                className="min-h-[120px] flex-1 resize-none rounded-lg border border-white/10 bg-white px-3 py-2.5 text-xs text-[#1B1D1C] outline-none placeholder:text-black/35 focus:border-white"
              />
            </div>

            {/* BOTÓN */}
            <button
              type="button"
              className="mt-6 w-fit px-6 py-3 rounded-full text-sm font-semibold uppercase text-white  bg-[#72000E]"
            >
              enviar consulta
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

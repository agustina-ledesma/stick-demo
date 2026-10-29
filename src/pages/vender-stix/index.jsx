import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Clock3,
  Repeat2,
  ChartNoAxesCombined,
  Handshake,
} from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import FormPuntosVenta from "@/components/FormPuntosdeVenta";
import VenderStixHero from "@/components/VenderStixHero";

export default function VenderStix() {
  const contenidosCarouselRef = useRef(null);

  const contenidos = [
    {
      id: 1,
      title: "Nos contás sobre tu negocio.",
      description: "Tipo de local, ubicación, clientes y volumen estimado.",
    },
    {
      id: 2,
      title: "Definimos pedido inicial y condiciones.",
      description:
        "Elegimos productos, formato, volumen de prueba y condiciones comerciales según tu canal",
    },
    {
      id: 3,
      title: "Recibís propuesta y material comercial",
      description:
        "Precio mayorista, descuento por volumen, condiciones de pago, política de reposición y material POP (displays, folletos, señalética) para potenciar la venta.",
    },
    {
      id: 4,
      title: "Coordinamos envío y seguimiento.",
      description:
        "Entregamos tu primer pedido en 5-7 días hábiles. Después mantenemos contacto para reposiciones, capacitación de tu equipo de ventas y novedades.",
    },
  ];

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

  return (
    <>
      <VenderStixHero />

      {/* CÓMO FUNCIONA */}
      <section className="w-full py-20">
        <div className="mx-auto w-full  px-6 md:px-10">
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
          <div className="hidden px-8 lg:grid lg:grid-cols-4 lg:gap-5">
            {contenidos.map((contenido, index) => (
              <article
                key={contenido.id}
                className="flex min-h-[340px] flex-col rounded-2xl bg-[#f4f3f2] p-7 text-left xl:min-h-[370px] xl:p-8"
              >
                <span className="font-mono text-sm tracking-wide text-[#72000E]">
                  PASO {index + 1}
                </span>

                <div className="mt-6">
                  <div className="mb-1">
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
              className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 md:gap-5"
            >
              {contenidos.map((contenido, index) => (
                <article
                  key={contenido.id}
                  className="flex h-[280px] w-[275px] min-w-[275px] snap-center flex-col rounded-2xl bg-[#f4f3f2] p-6 text-left"
                >
                  <span className="font-mono text-sm tracking-wide text-[#72000E]">
                    PASO {index + 1}
                  </span>

                  <div className="mt-6">
                    <div className="mb-1">
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
              className="mt-6 h-12 rounded-full bg-[#72000E] px-7 text-sm font-normal uppercase text-white transition hover:bg-[#5d000b]"
            >
              CONDICIONES COMERCIALES
            </button>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="min-h-screen w-full bg-[#f4f3f2] py-12 md:py-16 lg:py-20">
        <div className="my-8 flex flex-col gap-4 px-12">
          <SectionLabel text="Contacto" />

          <h2 className="text-2xl lg:text-4xl">
            Convertite en punto de venta Stix
          </h2>

          <p className="text-md text-gray-600">
            Contanos sobre tu negocio y en menos de 24 hs te mandamos las
            condiciones comerciales a medida.
          </p>
        </div>
        <div className="mx-auto w-full max-w-7xl">
          {/* ENCABEZADO */}

          {/* FORMULARIO */}
          <FormPuntosVenta />
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="h-[700px] w-full bg-white py-6 text-black md:py-8 lg:py-10">
        <div className="mx-auto grid w-full grid-cols-1 gap-8 px-6 md:px-10 md:py-2 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12 lg:py-10">
          {/* COLUMNA 1 — PRESENTACIÓN */}
          <div className="flex min-w-0 flex-col items-start">
            <SectionLabel text="Beneficios" />

            <h2 className="mt-3 max-w-md text-2xl text-gray-700 lg:text-3xl">
              Por qué vender Stix
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-500 md:text-base">
              Sumá una categoría en crecimiento, ofrecé productos para distintos
              momentos del día y contá con un equipo que te acompaña para hacer
              crecer tu negocio.
            </p>

          
            
          </div>

          {/* COLUMNA 2 — BENEFICIOS */}
          <div className="flex min-w-0 flex-col gap-3">
            {/* BENEFICIO 1 */}
            <div className="flex items-start gap-4 rounded-2xl border border-gray-200/80 p-4 md:p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3dcda] text-[#72000E]">
                <Repeat2 size={18} strokeWidth={1.7} />
              </span>

              <div className="min-w-0">
                <h3 className="text-base text-[#1B1D1C] md:text-lg">
                  Rotación comprobada
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  Productos pensados para uso recurrente. El cliente que empieza
                  vuelve.
                </p>
              </div>
            </div>

            {/* BENEFICIO 2 */}
            <div className="flex items-start gap-4 rounded-2xl border border-gray-200/80 p-4 md:p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3dcda] text-[#72000E]">
                <ChartNoAxesCombined size={18} strokeWidth={1.7} />
              </span>

              <div className="min-w-0">
                <h3 className="text-base text-[#1B1D1C] md:text-lg">
                  Margen premium
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  Estructura de reventa diseñada para mantener tu rentabilidad.
                </p>
              </div>
            </div>

            {/* BENEFICIO 3 */}
            <div className="flex items-start gap-4 rounded-2xl border border-gray-200/80 p-4 md:p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3dcda] text-[#72000E]">
                <Handshake size={18} strokeWidth={1.7} />
              </span>

              <div className="min-w-0">
                <h3 className="text-base text-[#1B1D1C] md:text-lg">
                  Soporte real
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  Capacitación a tu equipo, materiales POP, atención directa y
                  reposición ágil.
                </p>
              </div>
            </div>
            <div className="w-full rounded-2xl border border-gray-200/80 p-4 md:p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3dcda] text-[#72000E]">
                  <MessageCircle size={20} strokeWidth={1.7} />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base text-[#1B1D1C]">
                    ¿Preferís escribirnos por WhatsApp?
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    Hablemos sobre tu negocio.
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/549XXXXXXXXXX"
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex min-h-10 w-fit items-center justify-center rounded-full bg-[#72000E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#56000F]"
              >
                Escribinos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

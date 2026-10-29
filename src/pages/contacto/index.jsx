import {
  Boxes,
  Truck,
  ArrowRight,
  RefreshCw,
  BuildingComplex,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionLabel from "@/components/SectionLabel";
import FormContacto from "@/components/FormContacto";
import ContactoBento from "@/components/ContactoBento";
import { ReactLenis } from "lenis/react";

export default function Contacto() {
  const navigate = useNavigate();

  return (
    <>
      <section className="flex min-h-screen w-full items-center bg-white px-6 py-16 text-[#1B1D1C] md:px-10 md:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-7xl">
          {/* HERO */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
            {/* COLUMNA 1 — TEXTO */}
            <div className="order-2 flex flex-col items-start lg:order-1">
              {/* CONTENIDO CENTRADO */}
              <div className="my-auto flex flex-col items-start gap-3">
                <SectionLabel text="Contacto" />

                <h1 className="mt-3 max-w-xl text-2xl font-normal leading-[1.05] tracking-tight text-[#72000E] md:text-4xl">
                  Escribinos, te respondemos
                </h1>

                <p className="max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
                  Dudas de producto, pedidos, envíos, suscripciones, propuestas
                  B2B o cualquier otra consulta. Elegí el canal que te sirva.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("contacto")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="mt-6 w-fit rounded-full bg-[#72000E] px-6 py-3 text-sm font-semibold uppercase text-white transition hover:bg-[#5d000b]"
                >
                  contactar a stix
                </button>
              </div>

              {/* PILLS ABAJO */}
              <div className="mt-10 flex flex-wrap items-center gap-2 lg:mt-auto lg:pt-8">
                {[
                  "Atención personalizada",
                  "Respuesta por email",
                  "Estamos para ayudarte",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-200 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wide text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* COLUMNA 2 — ESPACIO PARA IMAGEN */}
            <div className="relative order-1 min-h-[320px] overflow-hidden rounded-3xl bg-[#f4f3f2] sm:min-h-[420px] lg:order-2 lg:min-h-[520px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
                  Imagen de producto
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-20">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-10 lg:gap-16">
            {/* IZQUIERDA — TEXTO */}
            <div className="mb-10 flex w-full flex-col gap-3">
              <SectionLabel text="Canal de comunicación directo" />

              <h2 className="max-w-xl text-2xl leading-tight text-gray-600 lg:text-3xl">
                Contanos qué necesitás
              </h2>

              <p className="text-md font-light">
                Estamos para ayudarte con tu consulta. Completá el formulario y
                te respondemos por email.
              </p>
            </div>

            {/* DERECHA — FORM */}
            <div id="contacto" className="flex w-full items-start justify-end">
              <FormContacto />
            </div>
          </div>
        </div>
      </section>
      <ContactoBento />
    </>
  );
}

import {
  Pill,
  Dumbbell,
  Coffee,
  Hotel,
  ShoppingBag,
  BriefcaseBusiness,
  HeartPulse,
} from "lucide-react";
import SectionLabel from "@/components/SectionLabel";

const tiposNegocio = [
  { label: "Farmacias premium", icon: Pill },
  { label: "Nutrición y wellness", icon: HeartPulse },
  { label: "Gimnasios", icon: Dumbbell },
  { label: "Cafés specialty y bistrós", icon: Coffee },
  { label: "Hoteles boutique", icon: Hotel },
  { label: "E-commerce especializado", icon: ShoppingBag },
  { label: "Coworkings", icon: BriefcaseBusiness },
];

export default function VenderStixHero() {
  return (
    <>
      <section className="w-full flex h-screen items-center bg-white px-6 py-16 text-[#1B1D1C] md:px-10 md:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-7xl">
          {/* HERO */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* COLUMNA 1 — TEXTO */}
            <div className="order-2 flex flex-col items-start lg:order-1">
              <SectionLabel text="Vendé Stix" />

              <div className="flex flex-col gap-3">
                <h1 className="mt-6 max-w-xl text-2xl font-normal leading-[1.05] tracking-tight text-[#72000E] md:text-4xl">
                  La categoría que tus clientes están pidiendo.
                </h1>

                <p className="max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
                  Stix es el sistema de suplementación funcional premium
                  formulado por médicos. Pensado para profesionales. Posicionado
                  como lo que no hay.
                </p>

                <p className="mt-4 max-w-xl font-mono text-sm uppercase leading-relaxed text-gray-500">
                  Rotación comprobada, margen de reventa real y soporte
                  comercial.
                </p>

                <button
                  className="my-4 min-h-10 w-fit rounded-full bg-[#72000E] px-6 py-2.5 text-sm font-semibold uppercase text-white transition hover:bg-[#56000F] sm:w-fit"
                  onClick={() => {
                    document.getElementById("b2b")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  Enviar consulta
                </button>
              </div>
            </div>

            {/* COLUMNA 2 — ESPACIO PARA IMAGEN */}
            <div className="relative order-1 min-h-[320px] overflow-hidden rounded-3xl bg-[#f4f3f2] sm:min-h-[420px] lg:order-2 lg:min-h-[520px]">
              {/* Reemplazá este bloque por la imagen cuando la tengas */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
                  Imagen de producto
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 p-8 pt-8 md:mt-20 md:pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12 lg:p-12">
        {/* COLUMNA 1 — ESPACIO PARA IMAGEN */}
        <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-[#f4f3f2] sm:min-h-[420px] lg:min-h-[520px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
              Imagen de producto
            </span>
          </div>
        </div>

        {/* COLUMNA 2 — CONTENIDO */}
        <div className="min-w-0">
          <div className="mb-6 flex flex-col gap-2">
            <SectionLabel text="Ideal para negocios" />

            <h2 className="mt-2 text-2xl font-normal text-[#1B1D1C] md:text-3xl">
              Una propuesta para distintos espacios.
            </h2>

            <p className="max-w-sm text-md leading-relaxed text-gray-500">
              Sumá Stix a tu negocio y ofrecé una nueva categoría de productos.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tiposNegocio.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex min-h-[76px] flex-1 basis-[130px] flex-col items-start justify-end gap-3 rounded-xl border border-gray-200/80 bg-white p-3  sm:basis-[145px] sm:p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3dcda] text-[#72000E]">
                  <Icon size={17} strokeWidth={1.5} />
                </span>

                <span className="text-xs font-light uppercase leading-snug text-gray-600">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

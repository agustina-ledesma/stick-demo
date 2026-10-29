import { Atom, Boxes, Users } from "lucide-react";

import SectionLabel from "../../components/SectionLabel";
import ProductList from "../../components/ProductList";
import Professionals from "../../components/Professionals";
import IngredientCard from "@/components/IngredientCard";

const navItems = [
  {
    id: "ciencia",
    label: "Ciencia",
    icon: Atom,
  },
  {
    id: "formulas",
    label: "Fórmulas",
    icon: Boxes,
  },
  {
    id: "profesionales",
    label: "Profesionales",
    icon: Users,
  },
];

export default function Ciencia() {
  const scrollToFormulas = () => {
    document.getElementById("formulas")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <main className="min-h-screen">
        {/* HERO */}
        <section className="w-full">
          <div
            className="relative flex h-screen w-full items-end bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/ciencia/hero.png')",
            }}
          >
            <div className="relative z-10 w-full max-w-7xl px-6 pb-8 md:px-10 md:pb-10 lg:mx-auto lg:px-0">
              <div className="max-w-4xl">
                <h1 className="text-2xl font-semibold uppercase leading-tight text-white md:text-4xl">
                  Ciencia detrás de cada sobre
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                  Sharp y Reset están formulados con activos en dosis
                  clínicamente efectivas, respaldados por literatura
                  científica y validados por el Consejo Científico Stix.
                </p>

                <button
                  type="button"
                  onClick={scrollToFormulas}
                  className="mt-6 h-12 rounded-full bg-[#72000E] px-7 text-sm font-semibold uppercase text-white transition hover:bg-[#5d000b]"
                >
                  Ver fórmulas
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* NAV */}
        <div className="z-40 flex flex-wrap items-center justify-center gap-4 px-20 py-3 lg:justify-start lg:gap-6">
          <SectionLabel text="En esta página" />

          <nav className="flex flex-wrap items-center my-8 justify-center gap-2 lg:gap-3">
            {navItems.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-medium uppercase text-gray-500 transition hover:border-gray-300 hover:text-gray-800 lg:gap-2 lg:px-4 lg:py-2.5 lg:text-xs"
              >
                <Icon
                  size={14}
                  strokeWidth={1.8}
                  className="lg:h-4 lg:w-4"
                />
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* SECCIÓN CIENCIA */}
        <section
          id="ciencia"
          className="mx-auto flex w-full max-w-7xl items-center px-6 py-12 md:px-6 md:py-14 lg:px-0 lg:py-16"
        >
          <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8 lg:gap-16">
            {/* TEXTO */}
            <div className="flex max-w-xl flex-col gap-6 text-left">
              <SectionLabel text="Ciencia" />

              <h2 className="text-3xl font-semibold uppercase text-[#72000E]">
                CADA FÓRMULA, UN PROPÓSITO.
              </h2>

              <p className="text-md leading-relaxed text-gray-600">
                Cada fórmula combina activos específicos en dosis clínicas
                para un momento del día distinto y un objetivo específico,
                con activos en dosis clínicamente efectivas.
              </p>

              <ProductList />
            </div>

            {/* IMAGEN */}
            <div className="flex justify-center md:justify-end">
              <img
                src="/images/ciencia/productos.png"
                alt="Stix ciencia"
                className="h-auto w-full max-w-112.5 rounded-2xl object-contain md:max-w-100 lg:max-w-162.5"
              />
            </div>
          </div>
        </section>
      </main>

      <IngredientCard />

      <Professionals />
    </div>
  );
}
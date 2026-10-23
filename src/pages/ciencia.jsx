import { useRef, useState } from "react";
import { Atom, Boxes, UserGroup } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionLabel from "../components/SectionLabel";
import ProductList from "../components/ProductList";
import Professionals from "../components/Professionals";

export default function Ciencia() {
  const navigate = useNavigate();

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
      icon: UserGroup,
    },
  ];

  const formulas = [
    {
      name: "SHARP",
      activos: "11",
      image: "/images/ciencia/sharp.png",
      ingredients: [
        "Cafeína natural",
        "L-teanina",
        "L-tirosina",
        "Citicolina (CDP-colina)",
        "Acetil-L-carnitina (ALCAR)",
        "Taurina",
        "CoQ10 ubiquinol",
        "Extracto de té verde descafeinado, 50% EGCG",
        "Vitamina B3, niacinamida",
        "Vitamina B6, P-5-P",
        "Panax ginseng, 4–7% ginsenósidos",
      ],
    },
   /*  {
      name: "HYDRATE",
      activos: "9",
      image: "/images/ciencia/hydrate.png",
      ingredients: [
        "Sodio",
        "Potasio",
        "Citrato de calcio",
        "Bisglicinato de magnesio",
        "Zinc",
        "Taurina",
        "Vitamina C",
        "Extracto de semilla de uva",
        "L-glutamina",
      ],
    }, */
    {
      name: "RESET",
      activos: "10",
      image: "/images/ciencia/reset.png",
      ingredients: [
        "Glicina",
        "L-teanina",
        "Bisglicinato de magnesio",
        "Taurina",
        "Extracto de lúpulo",
        "Extracto de pasiflora",
        "Extracto de melisa",
        "Extracto de manzanilla, 1,2% apigenina",
        "Vitamina B6",
        "5-HTP",
      ],
    },
  ];

  const professionals = [
    {
      name: "Dr. Julián Sotomayor",
      specialty: "Médico especialista en medicina del sueño",
      quote:
        "El uso de glicina y magnesio previo al descanso reduce la latencia de sueño profundo sin producir somnolencia residual diurna.",
      institution: "Unidad de Trastornos del Ritmo Circadiano",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=160&q=80",
    },
    {
      name: "Dra. Valentina Méndez",
      specialty: "Médica especialista en nutrición",
      quote:
        "Una fórmula efectiva parte de ingredientes seleccionados y de una composición pensada para cada necesidad.",
      institution: "Centro de Nutrición Integral",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=160&q=80",
    },
    {
      name: "Dr. Tomás Herrera",
      specialty: "Médico especialista en medicina deportiva",
      quote:
        "La hidratación adecuada es fundamental para sostener el rendimiento y acompañar la recuperación.",
      institution: "Instituto de Medicina Deportiva",
      image:
        "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=160&q=80",
    },
    {
      name: "Dra. Camila Ríos",
      specialty: "Médica especialista en neurología",
      quote:
        "El enfoque debe estar puesto en entender cómo interactúan los distintos activos dentro de una fórmula.",
      institution: "Centro de Neurociencias Aplicadas",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=160&q=80",
    },
    {
      name: "Dr. Martín Acosta",
      specialty: "Médico especialista en endocrinología",
      quote:
        "Cada momento del día presenta necesidades diferentes que pueden abordarse desde una formulación específica.",
      institution: "Instituto de Endocrinología",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=160&q=80",
    },
    {
      name: "Dra. Sofía Navarro",
      specialty: "Médica especialista en medicina integrativa",
      quote:
        "La calidad de los ingredientes y la transparencia sobre su composición son fundamentales.",
      institution: "Centro de Medicina Integrativa",
      image:
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=160&q=80",
    },
  ];

  const [activeFormula, setActiveFormula] = useState(0);
  const [activeProfessional, setActiveProfessional] = useState(0);

  const formulasCarouselRef = useRef(null);
  const professionalsCarouselRef = useRef(null);

  const scrollToFormula = (index) => {
    const container = formulasCarouselRef.current;

    if (!container) return;

    const card = container.children[index];

    if (!card) return;

    container.scrollTo({
      left: card.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });

    setActiveFormula(index);
  };

  const handleFormulaScroll = () => {
    const container = formulasCarouselRef.current;

    if (!container) return;

    const cards = Array.from(container.children);

    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveFormula(closestIndex);
  };

  const scrollToProfessional = (index) => {
    const container = professionalsCarouselRef.current;

    if (!container) return;

    const card = container.children[index];

    if (!card) return;

    container.scrollTo({
      left: card.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });

    setActiveProfessional(index);
  };

  const handleProfessionalScroll = () => {
    const container = professionalsCarouselRef.current;

    if (!container) return;

    const cards = Array.from(container.children);

    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveProfessional(closestIndex);
  };

  return (
    <>
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
              <div className="relative z-10 w-full max-w-7xl px-6 pb-10 md:px-10 md:pb-12 lg:mx-auto lg:px-0">
                <div className="max-w-4xl">
                  <h1 className="text-2xl font-semibold uppercase leading-tight text-white md:text-4xl">
                    La fórmula completa, sin vueltas
                  </h1>

                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                    Conocé qué tiene cada producto, cuánto incluye cada sobre y
                    qué función cumple cada activo de SHARP, HYDRATE y RESET.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("formulas")?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                    className="mt-6 h-12 rounded-full bg-[#72000E] px-7 text-sm font-semibold uppercase text-white transition hover:bg-[#5d000b]"
                  >
                    Ver fórmulas
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* NAV STICKY */}
          <div className="z-40 px-20 py-8 flex flex-wrap items-center justify-center gap-4 py-4 lg:justify-start lg:gap-6">
            <SectionLabel text="En esta página" />

            <nav className="flex flex-wrap items-center justify-center gap-2 lg:gap-3">
              {navItems.map(({ id, label, icon: Icon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-medium uppercase text-gray-500 transition hover:border-gray-300 hover:text-gray-800 lg:gap-2 lg:px-4 lg:py-2.5 lg:text-xs"
                >
                  <Icon size={14} strokeWidth={1.8} className="lg:h-4 lg:w-4" />
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* SECCIÓN CIENCIA */}
          <section
            id="ciencia"
            className="mx-auto flex w-full max-w-7xl items-center px-6 py-16 md:px-6 md:py-20 lg:px-0 lg:py-24"
          >
            <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-8 lg:gap-16">
              {/* TEXTO */}
              <div className=" flex max-w-xl flex-col gap-6 text-left">
                <SectionLabel text="Ciencia" />

                <h2 className="text-3xl font-semibold uppercase text-[#72000E]">
                  CADA FÓRMULA, UN PROPÓSITO.
                </h2>

                <p className="text-md leading-relaxed text-gray-600">
                  Cada fórmula combina activos específicos en dosis clínicas
                  para un momento del día distinto para un objetivo específico,
                  con activos en dosis clínicamente efectivas.
                </p>
                <ProductList />
              </div>

              {/* IMAGEN */}
              <div className="flex justify-center md:justify-end">
                <img
                  src="/images/ciencia/productos.png"
                  alt="stix ciencia"
                  className="h-auto w-full max-w-112.5 rounded-2xl object-contain md:max-w-100 lg:max-w-162.5"
                />
              </div>
            </div>
          </section>

          {/* SECCIÓN FÓRMULAS */}
          <section
            id="formulas"
            className="scroll-mt-24 bg-[#f4f3f2] px-6 py-20 lg:px-20"
          >
            <div className="mx-auto w-full max-w-7xl">
              <div className="my-8 flex max-w-xl flex-col gap-2">
                <SectionLabel text="fórmulas completas" />

                <h2 className="text-2xl font-semibold uppercase text-[#72000E] md:text-3xl">
                  Todo lo que hay en cada sobre
                </h2>

                <p className="text-gray-600 tetx-md">
                  Revisá la composición completa de cada producto y la cantidad
                  de cada ingrediente por sobre.
                </p>
              </div>

              {/* CARRUSEL */}
              <div
                ref={formulasCarouselRef}
                onScroll={handleFormulaScroll}
                className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:justify-center lg:gap-6 lg:overflow-visible"
              >
                {formulas.map((formula) => (
                  <article
                    key={formula.name}
                    className="flex min-w-[300px] snap-center flex-col gap-6 rounded-2xl bg-white p-5 md:min-w-[340px] lg:min-w-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-[60px] w-[60px] shrink-0 overflow-hidden">
                        <img
                          src={formula.image}
                          alt={formula.name}
                          className="h-full w-full rounded-md object-cover"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <h3 className="font-bristone text-xl font-semibold uppercase text-[#72000E]">
                          {formula.name}
                        </h3>

                       {/*  <div className="inline-flex w-fit items-center gap-2 rounded-full  bg-[#F5DEDC] h-fit font-semibold uppercase px-3 py-1 text-xs  text-[#8B0012]">
                          <span>{formula.activos} activos</span>
                        </div> */}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {formula.ingredients.map((ingredient) => (
                        <div
                          key={ingredient}
                          className="flex min-h-10 items-center rounded-sm bg-[#F4F3F2] px-3 py-2"
                        >
                          <span className="text-sm font-medium text-gray-600">
                            {ingredient}
                          </span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              {/* DOTS */}
              <div className="mt-5 flex justify-center gap-2 lg:hidden">
                {formulas.map((formula, index) => (
                  <button
                    key={formula.name}
                    type="button"
                    aria-label={`Ir a ${formula.name}`}
                    onClick={() => scrollToFormula(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeFormula === index
                        ? "w-5 bg-black"
                        : "w-1.5 bg-black/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* SECCIÓN PROFESIONALES */}
        </main>

        <Professionals />
      </div>
    </>
  );
}

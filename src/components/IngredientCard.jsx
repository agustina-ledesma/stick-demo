import { useState } from "react";
import StixSharp3D from "./product/StixSharp3D";
import SectionLabel from "./SectionLabel";

const INGREDIENTS = {
  sharp: [
    {
      category: "Energía",
      name: "Cafeína natural",
      amount: "00 mg",
      description: "Aporta energía y ayuda a mantener el estado de alerta.",
    },
    {
      category: "Foco",
      name: "L-teanina",
      amount: "00 mg",
      description: "Acompaña el foco y la concentración.",
    },
    {
      category: "Cognición",
      name: "L-tirosina",
      amount: "00 mg",
      description:
        "Aporta un aminoácido involucrado en la producción de neurotransmisores.",
    },
    {
      category: "Cognición",
      name: "Citicolina (CDP-colina)",
      amount: "00 mg",
      description: "Aporta colina, relacionada con la función cognitiva.",
    },
    {
      category: "Energía",
      name: "Acetil-L-carnitina (ALCAR)",
      amount: "00 mg",
      description: "Participa en el metabolismo energético.",
    },
    {
      category: "Equilibrio",
      name: "Taurina",
      amount: "00 mg",
      description: "Participa en distintos procesos celulares.",
    },
    {
      category: "Antioxidante",
      name: "CoQ10 ubiquinol",
      amount: "00 mg",
      description:
        "Participa en la producción de energía celular y aporta acción antioxidante.",
    },
    {
      category: "Antioxidante",
      name: "Extracto de té verde descafeinado",
      amount: "00 mg",
      description: "Aporta antioxidantes, incluido EGCG.",
    },
    {
      category: "Metabolismo",
      name: "Vitamina B3, niacinamida",
      amount: "00 mg",
      description: "Contribuye al metabolismo energético normal.",
    },
    {
      category: "Sistema nervioso",
      name: "Vitamina B6, P-5-P",
      amount: "00 mg",
      description: "Contribuye al funcionamiento normal del sistema nervioso.",
    },
    {
      category: "Vitalidad",
      name: "Panax ginseng",
      amount: "00 mg",
      description: "Tradicionalmente utilizado como apoyo para la vitalidad.",
    },
  ],
  reset: [
    {
      category: "Descanso",
      name: "Glicina",
      amount: "00 mg",
      description:
        "Aporta un aminoácido que participa en distintos procesos del organismo.",
    },
    {
      category: "Calma",
      name: "L-teanina",
      amount: "00 mg",
      description:
        "Acompaña la relajación y ayuda a favorecer un estado de calma.",
    },
    {
      category: "Equilibrio",
      name: "Bisglicinato de magnesio",
      amount: "00 mg",
      description:
        "Contribuye al funcionamiento normal del sistema nervioso y muscular.",
    },
    {
      category: "Balance",
      name: "Taurina",
      amount: "00 mg",
      description: "Participa en distintos procesos celulares del organismo.",
    },
    {
      category: "Relajación",
      name: "Extracto de lúpulo",
      amount: "00 mg",
      description:
        "Tradicionalmente utilizado como apoyo para la relajación y el descanso.",
    },
    {
      category: "Calma",
      name: "Extracto de pasiflora",
      amount: "00 mg",
      description: "Tradicionalmente asociada con la calma y la relajación.",
    },
    {
      category: "Relajación",
      name: "Extracto de melisa",
      amount: "00 mg",
      description: "Tradicionalmente utilizada para acompañar la relajación.",
    },
    {
      category: "Descanso",
      name: "Extracto de manzanilla, 1,2% apigenina",
      amount: "00 mg",
      description: "Aporta compuestos vegetales asociados con la relajación.",
    },
    {
      category: "Sistema nervioso",
      name: "Vitamina B6",
      amount: "00 mg",
      description: "Contribuye al funcionamiento normal del sistema nervioso.",
    },
    {
      category: "Serotonina",
      name: "5-HTP",
      amount: "00 mg",
      description: "Precursor de la serotonina.",
    },
  ],
};

const TABS = [
  { id: "sharp", label: "SHARP" },
  { id: "reset", label: "RESET" },
];

const FORMULA_INFO = {
  sharp: {
    image: "/images/ciencia/ingredientes-sharp.png",
    imageAlt: "Naranja y pomelo",
  },
  reset: {
    image: "/images/ciencia/ingredientes-reset.png",
    imageAlt: "Frutos rojos",
  },
};

function IngredientCard({ ingredient }) {
  return (
    <article className="flex min-h-[200px] flex-col rounded-[28px] bg-white/80 p-6 md:p-7">
      <div className="flex gap-2 items-center">
        <span className="w-fit rounded-full border border-[#D9D0D0] px-3 py-1 text-xs font-medium text-[#776466]">
          {ingredient.category}
        </span>
        <span className="w-fit rounded-full border border-[#D9D0D0] px-3 py-1 text-xs font-medium text-[#776466]">
          {ingredient.amount}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-3">
        <h3 className="text-xl leading-tight tracking-tight text-[#321B1D] md:text-2xl">
          {ingredient.name}
        </h3>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-[#776466] md:text-base">
        {ingredient.description}
      </p>
    </article>
  );
}

export default function Ciencia() {
  const [activeTab, setActiveTab] = useState("sharp");

  const ingredients = INGREDIENTS[activeTab];
  const formula = FORMULA_INFO[activeTab];

  return (
    <section className="w-full bg-[#F5F3F2] px-5 py-10 text-[#321B1D] md:px-8 md:py-12 lg:px-10 lg:py-16">
      <div className="flex flex-col gap-3 my-8 lg:px-8">
        <SectionLabel text="Fórmulas completas" />
        <h2 className="text-2xl max-w-lg text-gray-600 md:text-3xl">
          Todo lo que hay en cada sobre, con dosis clínicas
        </h2>
      </div>
      <div className="mx-auto max-w-7xl">
        {/* Tabs */}
        <div className="mb-7 flex w-full max-w-[530px] rounded-full bg-white p-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 font-bristone rounded-full px-5 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-[#72000E] text-white shadow-sm"
                    : "text-[#72000E] bg-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Ingredientes */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
          {/* Imagen */}
          <div className="relative min-h-[280px] overflow-hidden rounded-[28px] md:min-h-[380px] lg:col-span-2 lg:row-span-2 lg:min-h-[420px]">
            <img
              key={formula.image}
              src={formula.image}
              alt={formula.imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Cards */}
          {ingredients.map((ingredient) => (
            <IngredientCard
              key={`${activeTab}-${ingredient.name}`}
              ingredient={ingredient}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

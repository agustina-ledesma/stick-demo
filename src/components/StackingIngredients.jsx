
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const defaultIngredients = [
  {
    name: "L-tirosina",
    tag: "FOCO",
    description:
      "Un aminoácido que participa en la producción de neurotransmisores involucrados en distintas funciones cognitivas.",
    color: "white",
  },
  {
    name: "Cafeína natural",
    tag: "ENERGÍA",
    description:
      "Ayuda a aumentar el estado de alerta y reducir temporalmente la sensación de cansancio.",
    color: "red",
  },
  {
    name: "L-teanina",
    tag: "EQUILIBRIO",
    description:
      "Un aminoácido presente en el té, estudiado por sus efectos sobre la atención y la relajación.",
    color: "black",
  },
  {
    name: "Citicolina",
    tag: "FUNCIÓN COGNITIVA",
    description:
      "Es una fuente de colina, nutriente que participa en procesos relacionados con el funcionamiento cerebral.",
    color: "white",
  },
  {
    name: "Acetil-L-carnitina",
    tag: "METABOLISMO",
    description:
      "Participa en el transporte de ácidos grasos hacia las mitocondrias, donde pueden utilizarse para producir energía.",
    color: "red",
  },
  {
    name: "Taurina",
    tag: "SOPORTE",
    description:
      "Un compuesto presente de forma natural en el organismo que interviene en diversos procesos fisiológicos.",
    color: "black",
  },
];

const colorStyles = {
  white: {
    card: "bg-white border border-gray-200",
    title: "text-black",
    text: "text-gray-600",
    meta: "text-gray-500",
    tag: "border-gray-300 text-gray-600",
  },
  red: {
    card: "bg-[#72000E]",
    title: "text-white",
    text: "text-white/80",
    meta: "text-white/60",
    tag: "border-white/40 text-white",
  },
  black: {
    card: "bg-[#171717]",
    title: "text-white",
    text: "text-gray-300",
    meta: "text-gray-400",
    tag: "border-white/30 text-white",
  },
};

function IngredientCard({ ingredient, index, total }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1 - (total - index - 1) * 0.025]
  );

  const styles = colorStyles[ingredient.color] || colorStyles.white;

  return (
    <div
      ref={ref}
      className="sticky"
      style={{
        top: `calc(100px + ${index * 14}px)`,
        zIndex: index + 1,
      }}
    >
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        className={`relative mx-auto flex min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl p-6 sm:min-h-[320px] sm:p-9 lg:min-h-[360px] lg:p-12 ${styles.card}`}
      >
        <div className="flex items-center justify-between gap-4">
          <span className={`text-xs uppercase tracking-wider ${styles.meta}`}>
            {String(index + 1).padStart(2, "0")} / INGREDIENTE
          </span>

          <span
            className={`rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-wider ${styles.tag}`}
          >
            {ingredient.tag}
          </span>
        </div>

        <div className="mt-12 max-w-2xl">
          <h3
            className={`text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl ${styles.title}`}
          >
            {ingredient.name}
          </h3>

          <p
            className={`mt-4 max-w-xl text-sm leading-relaxed sm:text-base ${styles.text}`}
          >
            {ingredient.description}
          </p>
        </div>
      </motion.article>
    </div>
  );
}

export default function StackingIngredients({
  ingredients = defaultIngredients,
}) {
  const visibleIngredients = ingredients.slice(0, 12);
  const total = visibleIngredients.length;

  return (
    <section className="h-fit py-12 lg:py-20 bg-white">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-2 lg:items-start">

        {/* CONTENIDO */}
        <div className="px-5 py-10 sm:px-8 sm:py-12 md:py-8 lg:sticky lg:top-12 lg:self-start lg:px-16 lg:py-12">
          <div className="flex flex-col gap-2">
            <span className="py-2 text-xs font-medium uppercase tracking-widest text-gray-500 md:py-1 lg:py-4">
              INGREDIENTES
            </span>

            <h2 className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight md:text-3xl lg:text-4xl">
              Tomalo antes de que lo necesites
            </h2>

            <p className="mt-3 max-w-xl text-base leading-relaxed text-gray-600 md:mt-4 lg:mt-6 lg:text-lg">
              Tomalo por la mañana, a media mañana o entre 40 y 60 minutos
              antes de una tarea exigente. Como contiene cafeína, evitá
              tomarlo cerca de la noche.
            </p>

            <div className="my-3 flex flex-col gap-3 rounded-lg border border-gray-100 bg-neutral-50 p-4 sm:p-6 md:my-2 md:gap-3 md:p-4 lg:my-4 lg:gap-4 lg:p-8">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold uppercase md:text-xs lg:text-base">
                  Antes de tomarlo
                </h3>

                <span className="shrink-0 rounded-full bg-[#F89437] px-2.5 py-1 text-[10px] font-semibold uppercase leading-none text-white sm:text-xs">
                  Advertencia
                </span>
              </div>

              <p className="text-sm leading-relaxed text-gray-600">
                Solo para mayores de 18 años. No se recomienda durante el
                embarazo ni antes de una cirugía. SHARP contiene cafeína.
                Si tenés una condición de salud, tomás medicación o tenés
                dudas, consultá con un profesional.
              </p>
            </div>
          </div>
        </div>

        {/* STICKY CARDS */}
        <div className="min-w-0 px-5 pb-10 sm:px-8 md:px-5 md:py-8 lg:px-12 lg:py-12">
          <div className="relative space-y-4">
            {visibleIngredients.map((ingredient, index) => (
              <IngredientCard
                key={`${ingredient.name}-${index}`}
                ingredient={ingredient}
                index={index}
                total={total}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

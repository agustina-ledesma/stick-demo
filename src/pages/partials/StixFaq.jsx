import { useState, useId } from "react";

/* ---------- Contenido (editá acá) ---------- */
const SECTIONS = [
  {
    id: "nosotros",
    tag: "Nosotros",
    title: "Sobre Stix",
    intro:
      "Resolvemos las dudas más comunes sobre cómo comprar, suscribirte y recibir Stix.",
    layout: "split",
    columns: [
      [
        {
          q: "¿Qué es Stix?",
          a: "Stix es una línea de suplementos funcionales en sobres individuales. Cada fórmula está pensada para acompañar un momento concreto del día: foco, hidratación o descanso.",
        },
        {
          q: "¿Qué productos tiene Stix?",
          a: "SHARP acompaña la concentración y la energía mental. HYDRATE acompaña la hidratación durante el día. RESET acompaña la preparación para el descanso.",
        },
        {
          q: "¿Tengo que tomar los tres productos?",
          a: "No. Podés empezar por un solo producto, combinar dos en un System o elegir el PROTOCOLO completo. No hace falta usar los tres todos los días.",
        },
      ],
    ],
  },
  {
    id: "usos",
    tag: "Usos",
    title: "Productos y uso",
    layout: "columns",
    columns: [
      [
        {
          q: "¿Cuándo se toma SHARP?",
          a: "Podés tomarlo por la mañana, a media mañana o entre 40 y 60 minutos antes de una tarea exigente. Evitá usarlo cerca de la noche porque contiene cafeína.",
        },
        {
          q: "¿Cuándo se toma HYDRATE?",
          a: "Tomalo durante el día, idealmente con el almuerzo. Evitá usarlo después de las 19:00.",
        },
        {
          q: "¿Cuándo se toma RESET?",
          a: "Tomalo aproximadamente 40 minutos antes de acostarte. El efecto empieza a sentirse entre 40 y 60 minutos después.",
        },
      ],
      [
        {
          q: "¿Cómo se preparan los sobres?",
          a: "Disolvé el contenido de un sobre en agua y mezclá bien antes de tomarlo. Revisá la información específica de cada producto.",
        },
        {
          q: "¿En qué presentaciones vienen?",
          a: "Podés elegir cajas de 15 o 30 sobres, según el producto y la presentación disponible.",
        },
      ],
    ],
  },
  {
    id: "productos",
    tag: "Productos",
    title: "Oasis, System y compra",
    layout: "columns",
    columns: [
      [
        {
          q: "¿Qué es el Protocolo?",
          a: "Es la compra que reúne SHARP, HYDRATE y RESET para acompañar el día completo con las tres fórmulas.",
        },
        {
          q: "¿Qué es un System?",
          a: "Es una combinación de dos productos. Podés elegir cualquier par entre SHARP, HYDRATE y RESET.",
        },
      ],
      [
        {
          q: "¿Puedo hacer una compra única?",
          a: "Sí. También podés elegir una compra recurrente para recibir el mismo pedido con la frecuencia que definas.",
        },
        {
          q: "¿La suscripción es una membresía?",
          a: "No. Es una compra recurrente. Elegís el pedido y la frecuencia, y vuelve a generarse automáticamente.",
        },
      ],
    ],
  },
  {
    id: "precauciones",
    tag: "Precauciones",
    title: "Antes de tomarlo",
    layout: "media",
    columns: [
      [
        {
          q: "Antes de tomarlo",
          a: "Si tenés una condición de salud, tomás medicación, estás embarazada o tenés dudas sobre algún ingrediente, consultá con un profesional antes de usar el producto. Revisá siempre las indicaciones específicas de cada fórmula.",
        },
        {
          q: "¿Dónde puedo ver los ingredientes?",
          a: "En cada ficha de producto podés consultar la composición completa y la cantidad de cada ingrediente por sobre.",
        },
      ],
    ],
  },
];

/* ---------- Ítem de acordeón ---------- */
function FaqItem({ q, a, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  const panelId = `${uid}-panel`;

  return (
    <div
      className={`w-full rounded-xl border border-black/5 bg-[#F4F3F2] ${
        open ? "is-open" : ""
      }`}
    >
      <h3 className="m-0">
        <button
          type="button"
          className={`flex w-full min-w-0 cursor-pointer items-center justify-between gap-4 px-[18px] pt-[20px] text-left text-[16px] font-semibold uppercase leading-snug tracking-[-0.01em] text-[#7a0c14] sm:px-[22px] sm:pt-[22px] ${
            !open ? "pb-[20px] sm:pb-[22px]" : ""
          }`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="min-w-0">{q}</span>

          <svg
            className={`h-[14px] w-[14px] flex-none transition-transform duration-250 ease-in-out ${
              open ? "rotate-0" : "rotate-180"
            }`}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 10l5-5 5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        className={`grid transition-[grid-template-rows] duration-250 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        aria-hidden={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="m-0 px-[18px] pb-[22px] pt-[16px] text-[16px] leading-[1.55] text-gray-500 sm:px-[22px] sm:pb-[26px] sm:pt-[18px]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

function Stack({ items, defaultOpen }) {
  return (
    <div className="flex w-full flex-col gap-4">
      {items.map((it) => (
        <FaqItem key={it.q} {...it} defaultOpen={defaultOpen} />
      ))}
    </div>
  );
}

function Heading({ tag, title, intro, id }) {
  return (
    <header id={id}>
      <a
        href={`#${id}`}
        className="inline-block rounded-full bg-[#F89437] px-4 py-2 text-xs font-semibold uppercase leading-none tracking-[0.02em] text-white"
      >
        {tag}
      </a>

      <h2 className="m-0 mt-[8px] text-2xl font-semibold uppercase leading-tight tracking-[-0.03em] text-[#7a0c14]">
        {title}
      </h2>

      {intro && (
        <p className="mt-[14px] max-w-[400px] text-md leading-[1.6] text-gray-500">
          {intro}
        </p>
      )}
    </header>
  );
}

/* ---------- Sección completa ---------- */
export default function StixFaq({
  sections = SECTIONS,
  imageSrc = "/images/stix-sobre-naranja.jpg",
  imageAlt = "Sobre de Stix vertiéndose en un vaso con bebida de naranja",
  defaultOpen = true,
}) {
  return (
    <div className="w-full  font-sans text-[#6b6866]">
      {sections.map((s) => (
        <section
          /*  key={s.id}
          className="mx-auto w-full px-20 py-20 max-[860px]:px-5 max-[860px]:py-14"
          aria-labelledby={`${s.id}-title`} */
          key={s.id}
          id={s.id}
          className={`mx-auto w-full px-20 py-20 max-[860px]:px-5 max-[860px]:py-14 ${
            s.id === "nosotros"
              ? "bg-[url('/images/faqs/bg-faqs.png')] bg-cover bg-center"
              : ""
          }`}
          aria-labelledby={`${s.id}-title`}
        >
          {s.layout === "split" && (
            <div className="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-12 max-[860px]:grid-cols-1 max-[860px]:gap-7">
              <Heading {...s} />
              <Stack items={s.columns[0]} defaultOpen={defaultOpen} />
            </div>
          )}

          {s.layout === "columns" && (
            <>
              <Heading {...s} />

              <div className="mt-8 grid w-full max-w-[880px] grid-cols-2 items-start gap-6 max-[860px]:grid-cols-1 max-[860px]:gap-4">
                {s.columns.map((col, i) => (
                  <Stack key={i} items={col} defaultOpen={defaultOpen} />
                ))}
              </div>
            </>
          )}

          {s.layout === "media" && (
            <>
              <Heading {...s} />

              <div className="mt-8 grid w-full grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] items-start gap-12 max-[860px]:grid-cols-1 max-[860px]:gap-7">
                <Stack items={s.columns[0]} defaultOpen={defaultOpen} />

                <img
                  src="/images/products/stix-jugo.png"
                  alt="stix jugo"
                  loading="lazy"
                  className="block aspect-[4/3] w-full rounded-xl object-cover max-[860px]:order-2"
                />
              </div>
            </>
          )}
        </section>
      ))}
    </div>
  );
}

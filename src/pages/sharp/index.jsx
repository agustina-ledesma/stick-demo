import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import StixSharp3d from "../../components/product/StixSharp3D";
import MomentosNav from "../../components/momentosNav";
import ProductPurchaseOptions from "../../components/ProductPurchaseOptions";
import ProductFAQs from "../../components/FaqsProductos";
import StackingIngredients from "../../components/StackingIngredients";

export default function Sharp() {
  const steps = [
    {
      number: "01",
      title: "Agua",
      description: "Poné agua en un vaso para preparar tu SHARP.",
      video: "/videos/video-1.mp4",
    },
    {
      number: "02",
      title: "SHARP",
      description:
        "Agregá el contenido del sobre al agua y mezclá hasta disolver.",
      video: "/videos/video-2.mp4",
    },
    {
      number: "03",
      title: "Foco",
      description: "Ya estás preparado para encarar tu próxima tarea.",
      video: "/videos/video-3.mp4",
    },
  ];

  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detectar desktop
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  // Progreso de scroll para la transición desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Movimiento del modelo desktop
  const modelX = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7],
    ["0vw", "-10vw", "-24vw"],
  );

  const modelY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7],
    ["0vh", "5vh", "8vh"],
  );

  const modelScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7],
    [1, 0.82, 0.62],
  );

  // Aparición de las secciones desktop
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18, 0.35], [1, 1, 0]);

  const formulaOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.42, 0.65],
    [0, 1, 1],
  );

  // Panel bordó desktop
  const panelWidth = useTransform(scrollYProgress, [0.2, 0.65], ["0%", "100%"]);

  // Contenido de fórmula desktop
  const contentOpacity = useTransform(scrollYProgress, [0.48, 0.68], [0, 1]);

  const contentY = useTransform(scrollYProgress, [0.48, 0.68], [35, 0]);

  return (
    <>
      <main className="w-full">
        {/* ================================================== */}
        {/* MOBILE + TABLET: CONTENIDO EN FLUJO NORMAL */}
        {/* ================================================== */}
        <div className="lg:hidden">
          {/* SECCIÓN FÓRMULA */}
          <section className="flex flex-col bg-white text-gray-600">
            {/* Área del producto: ocupa una pantalla completa */}
            <div className="relative h-screen flex items-center min-h-[100svh] w-full overflow-hidden bg-[linear-gradient(90deg,rgba(20,20,20,1)_0%,rgba(114,0,14,1)_100%)]">
              <StixSharp3d style={{ height: "80%" }} />
            </div>

            {/* Contenido: mínimo una pantalla, puede crecer */}
            <div className="flex h-auto flex-col justify-center gap-5 px-6 py-12">
              <div className="flex flex-col gap-2">
                <h1 className="font-bristone text-4xl uppercase text-[#72000E]">
                  SHARP
                </h1>
                <span className="text-sm font-semibold uppercase tracking-widest py-2">
                  foco sostenido por las mañanas
                </span>
                <p className="w-full text-md leading-relaxed">
                  Hay días en que tenés tiempo, pero no conseguís sentarte a
                  hacer una sola cosa. SHARP acompaña la atención y la energía
                  mental cuando necesitás concentrarte: a la mañana, a media
                  mañana o antes de una tarea exigente.
                </p>
                <span className="text-2xl font-semibold">$00.00</span>
              </div>
              <ProductFAQs />

              <ProductPurchaseOptions />
            </div>
          </section>
        </div>

        {/* ================================================== */}
        {/* DESKTOP: TRANSICIÓN ORIGINAL */}
        {/* ================================================== */}
        <div ref={containerRef} className="relative hidden h-[400vh] lg:block">
          <div className="sticky top-0 h-screen overflow-hidden bg-[linear-gradient(90deg,rgba(20,20,20,1)_0%,rgba(114,0,14,1)_100%)]">
            {/* HERO */}
            <motion.section
              style={{ opacity: heroOpacity }}
              className="absolute inset-0 z-10 flex flex-col overflow-hidden px-12 py-12 text-white lg:grid lg:grid-cols-2 lg:items-end lg:gap-8"
            >
              {/* Texto principal */}
              <div className="pointer-events-auto relative z-10 mt-auto flex flex-col gap-4 lg:col-start-1 lg:row-start-1">
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-medium uppercase tracking-widest text-gray-200">
                    FOCO SOSTENIDO POR LAS MAÑANAS
                  </span>

                  <h1 className="font-bristone text-6xl font-semibold uppercase tracking-tight">
                    SHARP
                  </h1>

                  <p className="max-w-md text-lg leading-relaxed">
                    Hay días en que tenés tiempo, pero no conseguís sentarte a
                    hacer una sola cosa.
                  </p>
                </div>

                <div className="flex w-fit items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full bg-[#72000E] px-8 py-4 text-sm font-semibold uppercase text-white "
                  >
                    descubrí sharp
                  </button>

                  {/*  <button
                  type="button"
                  className="rounded-full border border-white px-6 py-4 text-sm font-semibold uppercase"
                >
                  Ver suscripción
                </button> */}
                </div>
              </div>
              <div className="pointer-events-auto relative z-[60] flex items-center justify-end">
                <MomentosNav />
              </div>
            </motion.section>

            {/* FÓRMULA */}
            <motion.section
              style={{ opacity: formulaOpacity }}
              className="pointer-events-none  absolute inset-0 z-20 grid grid-cols-2 grid-rows-1 overflow-hidden bg-white text-gray-600"
            >
              {/* Columna del producto */}
              <div className="relative flex min-h-0 items-center justify-center overflow-hidden">
                <motion.div
                  style={{ width: panelWidth }}
                  className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,rgba(20,20,20,1)_0%,rgba(114,0,14,1)_100%)]"
                />
              </div>

              {/* Columna de información */}
              <motion.div
                style={{ opacity: contentOpacity, y: contentY }}
                className="pointer-events-auto relative min-h-screen z-10 flex flex-col justify-center items-center gap-4 p-8 mt-4"
              >
                <div className="flex flex-col gap-2">
                  <h1 className="font-bristone text-6xl uppercase text-[#72000E]">
                    SHARP
                  </h1>
                  <span className="text-sm font-semibold uppercase tracking-widest py-2">
                    foco sostenido por las mañanas
                  </span>
                  <p className="w-full text-md leading-relaxed">
                    Hay días en que tenés tiempo, pero no conseguís sentarte a
                    hacer una sola cosa. SHARP acompaña la atención y la energía
                    mental cuando necesitás concentrarte: a la mañana, a media
                    mañana o antes de una tarea exigente.
                  </p>
                  <span className="text-2xl font-semibold">$00.00</span>
                </div>
                <ProductFAQs />

                <ProductPurchaseOptions />
              </motion.div>
            </motion.section>

            {/* Modelo 3D: transición original en desktop */}
            <motion.div
              style={{
                x: modelX,
                y: modelY,
                scale: modelScale,
              }}
              className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden"
            >
              <div className="h-full w-[min(46vw,900px)]">
                <StixSharp3d style={{ height: "100%" }} />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <div className="flex flex-col">
        <section className="">
          <StackingIngredients />
        </section>

        <section className="h-fit bg-white flex justify-center">
          <div className="mx-auto max-w-[1400px] p-8">
            <div className="mb-10 flex flex-col gap-3 sm:mb-14">
              <span className="text-xs font-medium uppercase tracking-widest text-gray-500">
                CÓMO PREPARARLO
              </span>

              <h2 className="mt-3 text-4xl font-medium leading-tight tracking-tight text-black">
                Tres pasos. Un momento para vos.
              </h2>
              <p className="text-lg text-gray-600">
                SHARP está pensado para acompañarte cuando necesitás
                concentrarte, empezar el día con claridad o encarar una tarea
                exigente.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-3 md:gap-4 lg:gap-6">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="mx-auto w-full min-w-0 max-w-[420px] p-2 md:max-w-none md:p-0"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100">
                    <video
                      className="h-full w-full object-cover"
                      src={step.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={`${step.title}: paso ${step.number}`}
                    />
                  </div>

                  <div className="mt-4 lg:mt-5">
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Paso {Number(step.number)}
                    </span>

                    <h3 className="mt-2 text-xl font-medium tracking-tight text-black lg:text-2xl uppercase">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600 lg:text-base">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

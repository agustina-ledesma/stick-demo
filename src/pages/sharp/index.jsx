import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import StixSharp3d from "../../components/product/StixSharp3D";
import MomentosNav from "../../components/momentosNav";
import ProductPurchaseOptions from "../../components/ProductPurchaseOptions";
import ProductFAQs from "../../components/FaqsProductos";
import StackingIngredients from "../../components/StackingIngredients";
import StixSharp3D from "../../components/product/StixSharp3D";
import { Sun, Droplet, Moon } from "lucide-react";
import GlassPill from "../../components/GlassPill";
import SectionLabel from "../../components/SectionLabel";
import ProductCards from "../../components/ProductCards";
import VideoGrid from "../../components/VideoGrid";
import { ReactLenis } from "lenis/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Sharp() {
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

            {/* Área del producto */}
            <div className="relative flex h-[100svh] min-h-[100svh] w-full shrink-0 flex-col overflow-hidden touch-pan-y bg-[linear-gradient(90deg,rgba(20,20,20,1)_0%,rgba(114,0,14,1)_100%)]">
              {/* Producto 3D centrado */}
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                <StixSharp3d style={{ height: "80%", touchAction: "pan-y" }} />
              </div>

              {/* Pill siempre abajo */}
              <div className="relative z-20 mt-auto p-6">
                <GlassPill
                  icon={Sun}
                  text="Foco sostenido por las mañanas"
                  defaultOpen={true}
                />
              </div>
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
                  Hay días en que cuesta concentrarse. SHARP acompaña tu
                  atención y energía mental cuando necesitás enfocarte, desde la
                  mañana hasta antes de una tarea exigente.
                </p>
                <span className="text-2xl font-semibold">$00.00</span>
              </div>

              <ProductPurchaseOptions />
            </div>
          </section>
        </div>
        <div className="relative hidden h-screen w-full overflow-hidden bg-[linear-gradient(90deg,rgba(20,20,20,1)_0%,rgba(114,0,14,1)_100%)] lg:block">
          {/* Producto 3D siempre centrado */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <StixSharp3D />
          </div>

          {/* Columnas alineadas desde arriba */}
          <div className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-2 items-stretch pb-6">
            {/* Columna 1 */}
            <div className="flex min-h-[280px] h-full flex-col  p-10 pb-6 text-white">
              <div className="flex h-full max-w-sm flex-col">
                <div className="mt-auto flex flex-col gap-3 ">
                  <h1 className="font-bristone text-6xl font-semibold uppercase tracking-tight">
                    SHARP
                  </h1>

                  <p className="max-w-md text-lg leading-relaxed">
                    SHARP acompaña tu atención y energía mental cuando necesitás
                    enfocarte, desde la mañana hasta antes de una tarea
                    exigente.
                  </p>
                </div>

                <GlassPill
                  icon={Sun}
                  text="Foco sostenido por las mañanas"
                  className="mt-6"
                  defaultOpen={true}
                />
              </div>
            </div>

            {/* Columna 2 */}
            <div className="flex min-h-[280px] w-full justify-end px-4 text-white">
              <div className="my-3 w-full max-w-[450px] rounded-2xl bg-white px-6 py-4">
                <ProductPurchaseOptions />
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="flex flex-col">
        <section className="">
          <StackingIngredients />
        </section>
        <VideoGrid />
      </div>

      <ReactLenis root>
        <main className="bg-black">
          <div className="wrapper">
            {/*  <section className="relative sticky top-0 flex min-h-screen w-full items-center justify-center bg-white py-8 text-white">
              <div className="w-full px-8">
                <div className="mb-8 flex flex-col gap-3 lg:mb-10">
                  <SectionLabel text="Completá tu día" />

                  <h2 className="mt-1 max-w-3xl text-2xl lg:text-4xl leading-tight tracking-tight text-black">
                    Sumá otra fórmula y el ahorro se aplica solo.
                  </h2>
                </div>

                <ProductCards />
              </div>
            </section> */}
            <section className="relative sticky top-0 flex min-h-screen w-full items-start bg-white py-8 text-white lg:py-12">
              <div className="flex w-full flex-col gap-8 px-6 md:px-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:px-10">
                <div className="flex flex-col gap-3 lg:w-[35%] lg:shrink-0">
                  <SectionLabel text="Completá tu día" />

                  <h2 className="mt-1 max-w-3xl text-2xl leading-tight tracking-tight text-black lg:text-4xl">
                    Sumá otra fórmula y el ahorro se aplica solo.
                  </h2>
                </div>

                <div className="w-full min-w-0 lg:flex-1">
                  <ProductCards />
                </div>
              </div>
            </section>

            <section
              className="sticky top-0 flex h-screen w-full overflow-hidden rounded-t-2xl bg-[#f4f3f2] p-3 text-black sm:p-4 md:p-5 lg:p-6"
              style={{
                backgroundImage: "url('/images/faqs/bg-faqs.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <section className="grid w-full flex-1 grid-cols-1 content-startcle gap-4 overflow-y-auto px-5 py-6 sm:gap-5 sm:px-6 sm:py-8 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-10 lg:py-10">
                {/* Columna 1 */}
                <div className="flex h-fit flex-col items-start gap-2">
                  <SectionLabel text="Faqs" />
                  <h2 className="text-2xl lg:text-4xl">Preguntas frecuentes</h2>
                  <Link
                    to="/faqs"
                    className="inline-flex items-center gap-2 underline underline-offset-4 transition-opacity hover:opacity-70"
                  >
                    Ver todas las preguntas frecuentes
                    <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Columna 2 */}
                <div className="min-w-0">
                  <ProductFAQs />
                </div>
              </section>
            </section>
          </div>
        </main>
      </ReactLenis>
    </>
  );
}

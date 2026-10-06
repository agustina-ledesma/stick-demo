import { useNavigate } from "react-router-dom";
import content from "../../data/content.json";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductContent({ currentProduct }) {
  const navigate = useNavigate();

  const productContent = content[currentProduct];

  if (!productContent) return null;

  const [section1, section2] = productContent.sections;

  return (
    <>
      <main className="bg-[#F4F3F2]">
        {/* MINI BANNER */}
        <section className="py-8">
          <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-0">
            <div
              className="relative h-[200px] w-full overflow-hidden rounded-2xl"
              style={{
                backgroundImage: "url('/images/products/banner-mini.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="relative z-10 flex h-full items-center px-5 md:px-8 lg:px-10">
                <div className="flex flex-col items-start gap-3">
                  <span className="inline-flex items-center rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold uppercase text-white backdrop-blur-md">
                    Protocolo completo
                  </span>

                  <h2 className="text-base font-semibold uppercase text-white sm:text-lg md:text-2xl">
                    Todo tu día en una misma compra
                  </h2>

                  <button
                    type="button"
                    onClick={() => navigate("/oasis")}
                    className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold uppercase text-[#72000E] md:px-6"
                  >
                    Ver Oasis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 1 */}
        <section className="mx-auto flex w-full max-w-7xl items-center px-6 py-16 md:px-6 md:py-20 lg:min-h-screen lg:px-0 lg:py-0">
          <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-8 lg:gap-16">
            {/* TEXTO */}
            <div className="max-w-xl mx-auto text-left">
              <h2 className="text-3xl font-semibold uppercase text-[#72000E]">
                {section1.title}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-secondary text-md">
                {section1.text}
              </p>

              {section1["text-2"] && (
                <p className="mt-4 text-base leading-relaxed text-secondary font-semibold text-md">
                  {section1["text-2"]}
                </p>
              )}
            </div>

            {/* IMAGEN */}
            <div className="flex justify-center md:justify-end">
              <img
                src={section1.image}
                alt={section1.title}
                className="h-auto w-full max-w-112.5 object-contain md:max-w-100 lg:max-w-162.5 rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* SECCIÓN 2 */}
        <section className="mx-auto flex w-full max-w-7xl items-center px-6 py-16 md:px-6 md:py-20 lg:min-h-screen lg:px-0 lg:py-0 justify-center">
          <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8 lg:gap-16">
            {/* IMAGEN */}
            <div className="flex justify-center md:justify-start">
              <img
                src={section2.image}
                alt={section2.title}
                className="h-auto w-full max-w-107.5 object-contain md:max-w-95 lg:max-w-[500px] rounded-2xl"
              />
            </div>

            {/* TEXTO */}
            <div className="max-w-xl mx-auto text-left flex flex-col gap-2">
              <h2 className="text-3xl font-semibold uppercase text-[#72000E]">
                {section2.title}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-secondary text-md">
                {section2.text}
              </p>

              {section2["text-2"] && (
                <p className="mt-4 text-base leading-relaxed text-secondary text-md font-semibold">
                  {section2["text-2"]}
                </p>
              )}

              {section2.advertencia && (
                <div className="bg-white rounded-2xl p-4 mt-8">
                  <div className="flex justify-between items-center pb-2 border-b border-[#E8E6E5]">
                    <h3 className="uppercase font-semibold">advertencia</h3>
                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F89437] px-3 py-1 text-xs font-semibold text-white">
                      <span className="text-secondary text-md font-semibold">
                        Advertencia
                      </span>
                    </div>
                  </div>
                  <p className="mt-6 text-sm leading-relaxed text-secondary text-md">
                    {section2.advertencia}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <section
        className="w-full h-[500px] lg:h-screen flex items-center"
        style={{
          backgroundImage: "url('/images/products/activos-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-0">
          {/* TÍTULO */}
          <div className="mb-10">
            <h2 className=" text-xl lg:text-3xl font-semibold uppercase text-white">
              La que hay en cada sobre
            </h2>
          </div>

          {/* LG — 3 COLUMNAS */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
            {[0, 1, 2].map((column) => (
              <div key={column} className="flex flex-col gap-4">
                {productContent.formulas
                  .slice(column * 4, column * 4 + 4)
                  .map((formula) => (
                    <article
                      key={formula.name}
                      className="flex h-[90px] w-full flex-col justify-center rounded-xl border border-white/20 bg-white/10 px-5 backdrop-blur-md"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="min-w-0 truncate text-sm font-semibold uppercase text-white">
                          {formula.name}
                        </h3>

                        <span className="inline-flex shrink-0 items-center rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase text-white backdrop-blur-md">
                          {formula.tag}
                        </span>
                      </div>

                      <p className="mt-1 text-xs leading-relaxed text-white/80">
                        {formula.description}
                      </p>
                    </article>
                  ))}
              </div>
            ))}
          </div>

          {/* MD + MOBILE — CARRUSEL */}
          
          <div className="lg:hidden">
            <div
              data-formula-carousel
              className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 md:gap-5"
            >
              {Array.from(
                { length: Math.ceil(productContent.formulas.length / 2) },
                (_, index) => (
                  <div
                    key={index}
                    className="flex min-w-[300px] snap-center flex-col gap-4 md:min-w-[340px]"
                  >
                    {productContent.formulas
                      .slice(index * 3, index * 3 + 3)
                      .map((formula) => (
                        <article
                          key={formula.name}
                          className="flex h-[90px] w-full flex-col justify-center rounded-xl border border-white/20 bg-white/10 px-5 backdrop-blur-md md:h-[100px] md:px-6"
                        >
                          {/* NOMBRE + TAG */}
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="min-w-0 truncate text-sm font-semibold uppercase text-white md:text-base">
                              {formula.name}
                            </h3>

                            <span className="inline-flex shrink-0 items-center rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase text-white backdrop-blur-md">
                              {formula.tag}
                            </span>
                          </div>

                          {/* DESCRIPCIÓN */}
                          <p className="mt-1 text-xs leading-relaxed text-white/80 md:text-sm">
                            {formula.description}
                          </p>
                        </article>
                      ))}
                  </div>
                ),
              )}
            </div>

            {/* FLECHAS — IGUAL */}
            <div className="mt-5 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const container = document.querySelector(
                    "[data-formula-carousel]",
                  );

                  container?.scrollBy({
                    left: -320,
                    behavior: "smooth",
                  });
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                aria-label="Fórmula anterior"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => {
                  const container = document.querySelector(
                    "[data-formula-carousel]",
                  );

                  container?.scrollBy({
                    left: 320,
                    behavior: "smooth",
                  });
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                aria-label="Siguiente fórmula"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import GlassPill from "./GlassPill";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ProductCards({ products = [] }) {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const scrollCards = (direction) => {
    const container = sliderRef.current;
    if (!container) return;

    const card = container.querySelector("article");
    if (!card) return;

    container.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 12),
      behavior: "smooth",
    });
  };

  return (
    <div className="mx-auto w-full">
      {/* MOBILE */}
      <div className="relative lg:hidden">
        <div
          ref={sliderRef}
          className="flex justify-center snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => {
            const ProductRender = product.Render3D;

            return (
              <article
                key={product.id}
                className="flex h-fit min-w-0 max-w-[300px] flex-[0_0_100%] snap-center flex-col rounded-2xl bg-[linear-gradient(90deg,rgba(20,20,20,1)_0%,rgba(114,0,14,1)_100%)] p-4"
              >
                <div className="flex shrink-0 items-center justify-between gap-2">
                  <GlassPill icon={product.icon} text={product.label} />

                  {product.discount && (
                    <span className="shrink-0 rounded-full bg-[#F5DEDC] px-3 py-1 text-xs font-medium text-[#8B0012]">
                      {product.discount}
                    </span>
                  )}
                </div>

                <div className="my-1 h-[min(44vh,280px)] w-full shrink-0">
                  <ProductRender
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </div>

                <div className="mt-auto pt-2">
                  <button
                    type="button"
                    onClick={() => navigate(product.path)}
                    className="w-full rounded-full bg-[#72000E] px-4 py-2.5 font-bristone text-sm font-medium text-white transition-colors hover:bg-[#5E0010]"
                  >
                    VER {product.title}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* FLECHAS */}
        {products.length > 1 && (
          <div className="mt-3 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollCards(-1)}
              aria-label="Producto anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-[#72000E]"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => scrollCards(1)}
              aria-label="Producto siguiente"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-[#72000E]"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* DESKTOP */}
      <div className="mx-auto hidden w-full max-w-7xl justify-items-center gap-5  lg:flex lg:gap-8">
        {products.map((product) => {
          const ProductRender = product.Render3D;

          return (
            <article
              key={product.id}
              className="mx-auto flex h-fit w-full max-w-[390px] flex-col rounded-2xl bg-[linear-gradient(90deg,rgba(20,20,20,1)_0%,rgba(114,0,14,1)_100%)] p-5 lg:p-6"
            >
              <div className="flex shrink-0 items-center justify-between gap-2">
                <GlassPill icon={product.icon} text={product.label} />

                {product.discount && (
                  <span className="shrink-0 rounded-full bg-[#F5DEDC] px-3 py-1 text-xs font-medium text-[#8B0012]">
                    {product.discount}
                  </span>
                )}
              </div>

              <div className="my-3 h-[400px] w-full shrink-0">
                <ProductRender
                  style={{
                    height: "400px",
                    width: "100%",
                  }}
                />
              </div>

              <div className="mt-auto pt-3">
                <button
                  type="button"
                  onClick={() => navigate(product.path)}
                  className="w-full rounded-full bg-[#72000E] px-4 py-3 font-bristone text-sm font-medium uppercase text-white transition-colors hover:bg-[#5E0010] lg:px-6 lg:py-3 lg:text-base"
                >
                  VER {product.title}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

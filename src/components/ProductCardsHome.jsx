
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sun, Moon } from "lucide-react";
import GlassPill from "./GlassPill";
import StixSharp3D from "@/components/product/StixSharp3D";

const defaultProducts = [
  {
    id: "sharp",
    icon: Sun,
    label: "DÍA",
    title: "SHARP",
    subtitle: "Foco sostenido",
    path: "/sharp",
    Render3D: StixSharp3D,
    image: "/images/ciencia/ingredientes-sharp.png",
    imageAlt: "Naranja y pomelo",
  },
  {
    id: "reset",
    icon: Moon,
    label: "NOCHE",
    title: "RESET",
    subtitle: "Descanso reparador",
    path: "/reset",
    Render3D: StixSharp3D,
    image: "/images/ciencia/ingredientes-reset.png",
    imageAlt: "Frutos rojos",
  },
];

export default function ProductCardsHome({ products = defaultProducts }) {
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

  const renderCard = (product, index, desktop = false) => {
    const ProductRender = product.Render3D;

    return (
      <article
        key={`${desktop ? "desktop" : "mobile"}-${product.id}`}
        className={`relative flex h-fit flex-col overflow-hidden rounded-2xl ${
          desktop
            ? `w-full border border-white/15 p-5 xl:p-6 ${
                index % 2 === 1 ? "mt-16 xl:mt-24" : "mt-0"
              }`
            : "w-full min-w-0 flex-[0_0_100%] snap-start p-4 sm:p-5"
        }`}
        style={{
          backgroundImage: `url("${product.image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex shrink-0 items-center justify-between gap-2">
          <GlassPill icon={product.icon} text={product.label} variant="dark" />

          {product.discount && (
            <span className="shrink-0 rounded-full bg-[#F5DEDC] px-3 py-1 text-xs font-medium text-[#8B0012]">
              {product.discount}
            </span>
          )}
        </div>

        <div
          className={`my-2 w-full shrink-0 ${
            desktop ? "h-[360px] xl:h-[420px]" : "h-[min(46vh,300px)] sm:h-[min(48vh,320px)]"
          }`}
        >
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
            className="w-full rounded-full bg-[#72000E] px-4 py-2.5 font-bristone text-sm font-medium uppercase text-white transition-colors hover:bg-[#5E0010] xl:py-3"
          >
            VER {product.title}
          </button>
        </div>
      </article>
    );
  };

  return (
    <section className="w-full px-3 py-8 md:px-8 md:py-14 lg:px-12 lg:py-20">
      {/* MOBILE Y TABLET: UNA CARD POR VEZ */}
      <div className="relative md:hidden">
        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product, index) => renderCard(product, index))}
        </div>

        {products.length > 1 && (
          <div className="mt-4 flex justify-start gap-3">
            <button
              type="button"
              onClick={() => scrollCards(-1)}
              aria-label="Producto anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-500"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => scrollCards(1)}
              aria-label="Producto siguiente"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-500"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* DESKTOP: DOS CARDS EN ESCALERA */}
      <div className="mx-auto hidden w-full max-w-6xl grid-cols-2 items-start gap-5 md:grid md:gap-8">
        {products.map((product, index) => renderCard(product, index, true))}
      </div>
    </section>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "./../../../data/products.json";

export default function ProductCard() {
  const navigate = useNavigate();

  const productList = [products.sharp, products.hydrate, products.reset];

  const [sticks, setSticks] = useState(
    Object.fromEntries(productList.map((product) => [product.id, 15])),
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e) => {
    const container = e.currentTarget;
    const cards = [...container.querySelectorAll("[data-product-card]")];

    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollToCard = (index) => {
    const container = document.querySelector("[data-product-carousel]");
    const cards = container?.querySelectorAll("[data-product-card]");

    if (!container || !cards?.[index]) return;

    const card = cards[index];

    const left =
      card.offsetLeft - container.clientWidth / 2 + card.clientWidth / 2;

    container.scrollTo({
      left,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 py-8">
      <div className="my-8 flex flex-col gap-3 text-center">
        <h2 className="text-2xl font-semibold uppercase text-white">
          Cada fórmula, por separado
        </h2>

        <p className="text-white">
          Elegí SHARP, HYDRATE o RESET sin llevar el PROTOCOLO completo.
        </p>
      </div>

      {/* CARDS */}
      <div
        data-product-carousel
        onScroll={handleScroll}
        className="scrollbar-hide flex w-full snap-x snap-mandatory items-center gap-6 overflow-x-auto px-[calc((100vw-300px)/2)] md:gap-8 md:px-8 lg:justify-center lg:gap-10 lg:overflow-visible lg:px-0"
      >
        {productList.map((product) => {
          const selectedSticks = sticks[product.id];

          return (
            <div
              key={product.id}
              data-product-card
              className="w-[320px] min-w-[300px] shrink-0 snap-center"
            >
              {/* IMAGEN */}
              <div className="relative h-[370px] w-[320px] overflow-hidden rounded-2xl">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />

                {/* SELECTOR 15 / 30 */}
                <div className="absolute left-4 top-4 flex h-fit w-fit rounded-full bg-white/90 backdrop-blur-sm">
                  {product.sizes.map((size) => (
                    <button
                      key={size.sticks}
                      type="button"
                      onClick={() =>
                        setSticks((prev) => ({
                          ...prev,
                          [product.id]: size.sticks,
                        }))
                      }
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                        selectedSticks === size.sticks
                          ? "bg-[#72000E] text-white"
                          : "text-[#72000E]"
                      }`}
                    >
                      {size.sticks} sticks
                    </button>
                  ))}
                </div>
              </div>

              {/* BOTÓN */}
              <button
                type="button"
                onClick={() =>
                  navigate(`/product/${product.id}?sticks=${selectedSticks}`)
                }
                className="group mt-3 flex w-full items-center justify-center rounded-full border border-[#72000E] bg-white px-6 py-2 text-sm font-semibold uppercase text-[#72000E] transition-colors hover:bg-[#72000E] hover:text-white"
              >
                <span className="font-bristone font-semibold group-hover:hidden">
                  {product.name}
                </span>

                <span className="font-bristone hidden font-semibold group-hover:inline">
                  VER {product.name}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-2 lg:hidden">
        {productList.map((product, index) => (
          <button
            key={product.id}
            type="button"
            onClick={() => scrollToCard(index)}
            className={`h-2 rounded-full transition-all ${
              activeIndex === index ? "w-5 bg-white" : "w-2 bg-white/70"
            }`}
            aria-label={`Ver ${product.name}`}
          />
        ))}
      </div>
    </div>
  );
}

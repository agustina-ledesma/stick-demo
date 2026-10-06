import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "./../../data/products.json";

export default function HomeTab() {
  const [activeTab, setActiveTab] = useState("oasis");

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
    <section
      className={`relative min-h-screen w-full overflow-hidden ${
        activeTab === "system" ? "bg-[#56000F]" : "bg-transparent"
      }`}
    >
      {/* HEADER COMPARTIDO */}
      <div
        className={`flex w-full flex-col items-center px-6 pt-24 text-center ${
          activeTab === "system" ? "text-white" : "text-white"
        }`}
      >
        <h2 className="text-3xl font-semibold uppercase">
          Elegí cómo querés acompañar tu día
        </h2>

        <p className="mt-3 max-w-2xl">
          Llevá los tres productos en una misma compra o elegí los dos momentos
          que más necesitás.
        </p>

        {/* TAB */}
        <div className="mt-6 flex h-fit items-center rounded-full bg-white/90  backdrop-blur-sm">
          {["oasis", "system"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-6 py-2 text-xs font-semibold uppercase transition ${
                activeTab === tab ? "bg-[#72000E] text-white" : "text-[#72000E]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="w-full px-6 pb-12 pt-12 sm:px-10 lg:px-20">
        {activeTab === "oasis" ? (
          <div className="mx-auto flex w-full max-w-none flex-col-reverse gap-10 lg:flex-row lg:items-start lg:justify-between">
            {/* TEXTO */}
            <div className="w-full flex flex-col gap-4 max-w-sm text-center text-white lg:text-left">
              <h2 className="text-2xl font-semibold uppercase">
                Todo tu día, en una misma compra
              </h2>

              <p className="mt-3">
                SHARP + HYDRATE + RESET para acompañar el foco, la hidratación y
                el descanso.
              </p>
              <button
                type="button"
                onClick={() => navigate("/oasis")}
                className="py-2  w-fit rounded-full bg-white px-6 font-semibold text-[#72000E]"
              >
                COMPRAR
              </button>
            </div>

            {/* IMAGEN */}
            <div className="flex w-full justify-center lg:w-auto lg:justify-end">
              <img
                src="/images/products/stix.png"
                alt="oasis"
                className="h-auto w-full max-w-[830px] rounded-lg lg:rounded-3xl object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4">
            {/* CARDS */}
            <div
              data-product-carousel
              onScroll={handleScroll}
              className="scrollbar-hide flex w-full snap-x snap-mandatory items-center gap-10 overflow-x-auto px-[calc((100vw-320px)/2)] md:justify-center md:gap-20 md:overflow-visible md:px-0"
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
                                ? "bg-[#72000E] text-white font-semibold"
                                : "text-[#72000E] font-semibold"
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
                        navigate(
                          `/product/${product.id}?sticks=${selectedSticks}`,
                        )
                      }
                      className="group mt-3 flex w-full items-center justify-center rounded-full border border-[#72000E] bg-white px-6 py-2 text-sm font-semibold uppercase text-[#72000E] transition-colors hover:bg-[#72000E] hover:text-white"
                    >
                      <span className="group-hover:hidden font-semibold font-bristone">
                        {product.name}
                      </span>

                      <span className="hidden group-hover:inline font-semibold font-bristone">
                        VER {product.name}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* DOTS */}
            <div className="flex justify-center gap-2 md:hidden">
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
        )}
      </div>
    </section>
  );
}

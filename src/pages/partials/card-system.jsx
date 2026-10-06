import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Check } from "lucide-react";
import products from "./../../data/products.json";

export default function SystemCard({ currentProduct }) {
  const navigate = useNavigate();

  const productList = [products.sharp, products.hydrate, products.reset];

  const combinations = Object.values(products).flatMap(
    (product) => product.combinations || [],
  );

  const systemList = products.systems.map((system) => {
    const combination = combinations.find((item) => item.id === system.id);

    return {
      ...system,
      name: combination?.name || system.name,
      title: combination?.title || system.title,
    };
  });

  // El producto de la página siempre empieza seleccionado
  const [selectedProducts, setSelectedProducts] = useState([currentProduct]);

  const [sticks, setSticks] = useState(15);

  const [activeIndex, setActiveIndex] = useState(
    productList.findIndex((product) => product.id === currentProduct),
  );

  const handleToggleProduct = (productId, index) => {
    // El producto actual no se puede deseleccionar
    if (productId === currentProduct) return;

    setSelectedProducts((prev) => {
      // Si ya está seleccionado, lo quitamos
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }

      // Si ya hay dos, reemplaza el producto opcional
      if (prev.length >= 2) {
        return [currentProduct, productId];
      }

      // Si solo está seleccionado el producto actual
      return [...prev, productId];
    });

    setActiveIndex(index);
  };

  const handleScroll = (e) => {
    const container = e.currentTarget;

    const cards = [...container.querySelectorAll("[data-system-card]")];

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
    const container = document.querySelector("[data-system-carousel]");

    const cards = container?.querySelectorAll("[data-system-card]");

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

  const getSelectedSystem = () => {
    return systemList.find((system) => {
      if (system.products.length !== selectedProducts.length) {
        return false;
      }

      return system.products.every((productId) =>
        selectedProducts.includes(productId),
      );
    });
  };

  const selectedSystem = getSelectedSystem();

  const handleChooseSystem = () => {
    if (!selectedSystem) return;

    navigate(`/system?selected=${selectedSystem.id}&sticks=${sticks}`);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8">
      <div className="my-8 flex flex-col px-4 gap-3 text-center">
        <h2 className="text-lg lg:text-2xl font-semibold uppercase text-white">
          elegí los productos que más necesitas
        </h2>

        <p className="text-white text-sm lg:text-md">
          Armá tu System combinando cualquier par entre SHARP + HYDRATE + RESET.
          Elegí Oasis para tener la experiencia completa
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        {/* CARDS */}
        {/*  <div
          data-system-carousel
          onScroll={handleScroll}
          className="scrollbar-hide flex w-full snap-x snap-mandatory items-center gap-10 overflow-x-auto px-[calc((100vw-320px)/2)] md:justify-center md:gap-20 md:overflow-visible md:px-0"
        >
          {productList.map((product, index) => {
            const isSelected = selectedProducts.includes(product.id);

            const isCurrentProduct = product.id === currentProduct;

            return (
              <div
                key={product.id}
                data-system-card
                className="w-[320px] min-w-[300px] shrink-0 snap-center"
              >
                <div className="relative h-[370px] w-[320px] overflow-hidden rounded-2xl">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute left-4 top-4 flex h-fit w-fit rounded-full bg-white/90 backdrop-blur-sm">
                    {[15, 30].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSticks(size)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                          sticks === size
                            ? "bg-[#72000E] text-white"
                            : "text-[#72000E]"
                        }`}
                      >
                        {size} sticks
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex h-12 w-full items-center justify-between">
                  <span className="text-sm font-semibold uppercase text-white font-bristone">
                    {product.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleProduct(product.id, index)}
                    disabled={isCurrentProduct}
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-90 ${
                      isSelected
                        ? "bg-[#72000E] text-white"
                        : "border border-white bg-transparent text-white"
                    }`}
                    aria-label={
                      isSelected
                        ? `Quitar ${product.name}`
                        : `Agregar ${product.name}`
                    }
                  >
                    {isSelected ? (
                      <Check size={18} strokeWidth={2.5} />
                    ) : (
                      <Plus size={18} strokeWidth={2.5} />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div> */}
        {/* CARDS */}
        <div
          data-system-carousel
          onScroll={handleScroll}
          className="scrollbar-hide flex w-full snap-x snap-mandatory items-center gap-6 overflow-x-auto px-[calc((100vw-300px)/2)] md:gap-8 md:px-8 lg:justify-center lg:gap-10 lg:overflow-visible lg:px-0"
        >
          {productList.map((product, index) => {
            const isSelected = selectedProducts.includes(product.id);
            const isCurrentProduct = product.id === currentProduct;

            return (
              <div
                key={product.id}
                data-system-card
                className="w-[320px] min-w-[300px] shrink-0 snap-center"
              >
                <div className="relative h-[370px] w-[320px] overflow-hidden rounded-2xl">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute left-4 top-4 flex h-fit w-fit rounded-full bg-white/90 backdrop-blur-sm">
                    {[15, 30].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSticks(size)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                          sticks === size
                            ? "bg-[#72000E] text-white"
                            : "text-[#72000E]"
                        }`}
                      >
                        {size} sticks
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex h-12 w-full items-center justify-between">
                  <span className="font-bristone text-sm font-semibold uppercase text-white">
                    {product.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleProduct(product.id, index)}
                    disabled={isCurrentProduct}
                    className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-90 ${
                      isSelected
                        ? "bg-[#72000E] text-white"
                        : "border border-white bg-transparent text-white"
                    }`}
                    aria-label={
                      isSelected
                        ? `Quitar ${product.name}`
                        : `Agregar ${product.name}`
                    }
                  >
                    {isSelected ? (
                      <Check size={18} strokeWidth={2.5} />
                    ) : (
                      <Plus size={18} strokeWidth={2.5} />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>


        {/* INDICADORES MOBILE */}
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

        {/* INFO + CTA */}
        <div className="mx-auto mt-4 grid w-full max-w-6xl grid-cols-1 items-center justify-items-center gap-6 px-4 lg:grid-cols-2 lg:items-start lg:justify-items-stretch">
          <div className="flex w-full flex-col items-center gap-1 lg:items-start">
            <div className="flex flex-col items-center gap-2 lg:flex-row lg:items-start lg:gap-4">
              <span className="font-semibold text-white">
                System personalizado:
              </span>

              {selectedSystem && (
                <div className="flex flex-col items-center gap-2 lg:items-start">
                  <span className="text-sm font-bristone font-semibold uppercase text-white">
                    {selectedSystem.name}
                  </span>

                  <span className="text-sm text-white/60">
                    {selectedSystem.title}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex w-full justify-center lg:justify-end">
            <button
              type="button"
              onClick={handleChooseSystem}
              disabled={!selectedSystem}
              className="flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold uppercase text-[#72000E] transition-colors hover:bg-[#72000E] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Elegir system
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

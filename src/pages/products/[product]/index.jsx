import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "../../../data/products.json";
import SystemCard from "../../partials/card-system";
import ProductContent from "../../partials/products-content";

import { Truck, ChevronDown } from "lucide-react";

export default function Product() {
  const { product } = useParams();

  const currentProduct = products[product];

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState("once");
  const [isAdding, setIsAdding] = useState(false);
  const [deliveryFrequency, setDeliveryFrequency] = useState("30");
  const [selectedImage, setSelectedImage] = useState(0);

  /*  useEffect(() => {
    if (currentProduct?.sizes?.length) {
      setSelectedSize(currentProduct.sizes[0]);
    }
  }, [product]); */

  useEffect(() => {
    if (currentProduct?.sizes?.length) {
      const params = new URLSearchParams(window.location.search);
      const sticksFromUrl = Number(params.get("sticks"));

      const sizeFromUrl = currentProduct.sizes.find(
        (size) => size.sticks === sticksFromUrl,
      );

      setSelectedSize(sizeFromUrl || currentProduct.sizes[0]);
    }
  }, [product, currentProduct]);

  if (!currentProduct) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-white">Producto no encontrado</p>
      </div>
    );
  }

  if (!selectedSize) {
    return null;
  }

  const totalPrice = selectedSize.price * quantity;
  const subscriptionPrice = totalPrice * 0.8;

  const addToCart = () => {
    // Solo compra única agrega al carrito
    if (purchaseType !== "once") return;

    const cartItem = {
      type: "product",
      product: currentProduct.id,
      sticks: selectedSize.sticks,
      quantity,
      purchaseType: "once",
      price: totalPrice,
    };

    const storedCart = localStorage.getItem("cart");
    const cart = storedCart ? JSON.parse(storedCart) : [];

    cart.push(cartItem);

    localStorage.setItem("cart", JSON.stringify(cart));

    setIsAdding(true);

    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };

  return (
    <>
      <main className="mx-auto max-w-8xl px-8 py-24">
        <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-2">
          {/* Galería */}
          <div className="min-w-0">
            <div className="flex min-w-0 flex-col gap-4 md:flex-row">
              {/* Miniaturas */}
              <div className="order-2 flex shrink-0 flex-row items-start gap-2 overflow-x-auto md:order-1 md:w-[80px] md:flex-col md:overflow-x-hidden md:overflow-y-auto">
                {currentProduct.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`h-[40px] w-[40px] shrink-0 overflow-hidden rounded-sm border transition md:h-[80px] md:w-[80px] ${
                      selectedImage === index
                        ? "border-white"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${currentProduct.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Imagen grande */}
              <div className="order-1 min-w-0 flex-1 overflow-hidden rounded-lg md:order-2">
                <div className="aspect-square w-full">
                  <img
                    src={currentProduct.images[selectedImage]}
                    alt={currentProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="min-w-0 px-4">
            <div className="flex flex-col gap-6">
              {/* Información del producto */}
              <div className="flex flex-col gap-3 border-b border-[#262A29] pb-6">
                <div className="flex items-center gap-4">
                  <h1 className="font-bristone text-2xl font-semibold text-white md:text-4xl">
                    {currentProduct.name}
                  </h1>

                  <div className="inline-flex items-center gap-2 rounded-full bg-[#72000E] px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl">
                    <span>00 mg</span>
                  </div>
                </div>

                <span className="font-semibold uppercase text-white">
                  foco sostenido por las mañanas
                </span>

                <p className="text-sm text-white">
                  {currentProduct.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {currentProduct.formula?.map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white backdrop-blur-xl"
                    >
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Systems */}
              {currentProduct.combinations?.length > 0 && (
                <section>
                  <div className="mb-3 flex flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase text-white/80">
                      También podés combinarlo, elegí tu system
                    </span>

                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F89437] px-3 py-1 text-xs font-semibold text-white">
                      <span>AHORRÁ UN 15 %</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {currentProduct.combinations.map((combination) => (
                      <Link
                        key={combination.id}
                        to={`/system?selected=${combination.id}`}
                        className="flex min-w-0 items-center gap-3 rounded-lg border border-white/10 p-3 text-left transition hover:bg-white/5"
                      >
                        {/* Imagen */}
                        <div className="h-[45px] w-[45px] shrink-0 overflow-hidden rounded-md">
                          <img
                            src={combination.image}
                            alt={combination.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Información */}
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span className="truncate text-sm font-semibold uppercase text-white">
                            {combination.name}
                          </span>

                          <span className="truncate text-xs text-white/50">
                            {combination.title}
                          </span>
                        </div>

                        {/* Precio */}
                        <span className="shrink-0 text-sm font-semibold text-white">
                          ${combination.price.toFixed(2)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Tamaño + cantidad */}
              <section>
                <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
                  {/* Tamaño */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm uppercase text-white">
                        Unidades por pack:
                      </span>

                      {currentProduct.sizes.map((size) => (
                        <button
                          key={size.sticks}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`h-8 w-8 rounded-sm ${
                            selectedSize.sticks === size.sticks
                              ? "bg-[#72000E] text-white"
                              : "border border-white text-white"
                          }`}
                        >
                          <span className="block text-sm">{size.sticks}</span>
                        </button>
                      ))}
                    </div>

                    <span className="text-sm text-white">
                      Vas a recibir {quantity} pack{quantity > 1 ? "s" : ""} de{" "}
                      <strong>{selectedSize.sticks} sobres</strong>
                    </span>
                  </div>

                  {/* Cantidad */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm uppercase text-white">
                      Cantidad:
                    </span>

                    <div className="flex w-fit items-center gap-3 rounded-full bg-[#72000E] px-2 py-1 text-white">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="flex h-6 w-6 items-center justify-center rounded-full"
                      >
                        −
                      </button>

                      <span>{quantity}</span>

                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Stock + envío */}
              <section>
                <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-1">
                  {/* Stock */}
                  <div className="flex flex-col gap-2">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/4 bg-[#D1E8DC] px-3 py-1 text-xs font-semibold text-[#1E352B]">
                      <span>EN STOCK</span>
                    </div>
                  </div>

                  {/* Envío */}
                  <div className="flex gap-2 text-xs text-white">
                    <Truck size={16} strokeWidth={1.5} className="shrink-0" />

                    <span>
                      Envíos a todo el pais (CABA/AMBA: entre 2 y 3 días
                      hábiles)
                    </span>
                  </div>
                </div>
              </section>

              {/* Tipo de compra */}
              <form className="flex flex-col gap-2 text-white">
                {/* Compra única */}
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-lg bg-[#262A29] p-4 ${
                    purchaseType === "once"
                      ? "border border-white/20"
                      : "border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="purchaseType"
                      value="once"
                      checked={purchaseType === "once"}
                      onChange={() => setPurchaseType("once")}
                      className="h-4 w-4 appearance-none rounded-full border border-white/30 bg-transparent checked:border-white checked:bg-white checked:shadow-[inset_0_0_0_3px_#262A29]"
                    />

                    <span className="font-semibold uppercase text-sm">
                      Compra única
                    </span>
                  </div>

                  <span className="font-semibold uppercase">
                    ${totalPrice.toFixed(2)}
                  </span>
                </label>

                {/* Suscripción */}
                <label
                  className={`flex cursor-pointer flex-col gap-4 rounded-lg bg-[#262A29] p-4 ${
                    purchaseType === "subscription"
                      ? "border border-white/20"
                      : "border border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="purchaseType"
                        value="subscription"
                        checked={purchaseType === "subscription"}
                        onChange={() => setPurchaseType("subscription")}
                        className="h-4 w-4 appearance-none rounded-full border border-white/30 bg-transparent checked:border-white checked:bg-white checked:shadow-[inset_0_0_0_3px_#262A29]"
                      />

                      <span className="font-semibold uppercase">
                        Suscribite y ahorra un 20%
                      </span>
                    </div>

                    <span className="font-semibold uppercase">
                      ${subscriptionPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Frecuencia */}
                  {purchaseType === "subscription" && (
                    <div className="flex flex-col gap-2">
                      <span className="text-xs uppercase text-white/50">
                        Frecuencia de entrega
                      </span>

                      <div className="relative">
                        <select
                          value={deliveryFrequency}
                          onChange={(e) => setDeliveryFrequency(e.target.value)}
                          className="h-10 w-full appearance-none rounded-md border border-white/10 bg-[#1B1D1C] px-3 pr-12 text-sm text-white outline-none"
                        >
                          <option value="30">Mensual · 30 días</option>
                          <option value="45">Cada 45 días</option>
                          <option value="60">Cada 60 días</option>
                          <option value="90">Cada 90 días</option>
                        </select>

                        <ChevronDown
                          size={16}
                          strokeWidth={1.5}
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
                        />
                      </div>
                    </div>
                  )}
                </label>

                {/* Agregar al carrito */}
                <button
                  type="button"
                  onClick={addToCart}
                  disabled={isAdding || purchaseType !== "once"}
                  className="mt-2 flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-[#72000E] px-4 font-semibold uppercase text-white disabled:cursor-wait disabled:opacity-50"
                >
                  {isAdding && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  )}

                  <span>Agregar al carrito</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <ProductContent currentProduct={product} />
      {/* SECCIÓN 1 */}
      <div className="bg-[#F4F3F2] ">
        <section className="mx-auto flex w-full max-w-7xl items-center px-4 py-16 md:px-6 md:py-20 lg:min-h-screen lg:px-0 lg:py-0">
          <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-8 lg:gap-16">
            {/* TEXTO */}
            <div className="max-w-xl mx-auto text-left px-4 md:px-0 flex flex-col gap-3">
              <h2 className="text-3xl font-semibold uppercase text-[#72000E]">
                El producto para empezar con foco
              </h2>

              <p className="mt-4 text-base leading-relaxed text-secondary text-md">
                SHARP es la fórmula del PROTOCOLO para acompañar el foco. Sumalo
                con HYDRATE y RESET para tener las tres fórmulas en una misma
                compra, o combiná SHARP con cualquiera de las otras dos en un
                System.
              </p>
              <button
                type="button"
                onClick={() => navigate("/oasis")}
                className="shrink-0 rounded-full w-fit text-white px-6 py-2 text-sm font-semibold uppercase bg-[#72000E] md:px-6"
              >
                Ver protocolo
              </button>
            </div>

            {/* IMAGEN */}
            {/* IMAGEN */}
            <div className="flex justify-center md:justify-end">
              <img
                src="/images/products/protocolo.png"
                alt="oasis"
                className="h-auto w-full max-w-112.5 rounded-2xl object-contain md:w-[calc(100%-16px)] md:max-w-[520px] lg:w-full lg:max-w-162.5"
              />
            </div>
          </div>
        </section>
      </div>

      <SystemCard currentProduct={product} />
    </>
  );
}

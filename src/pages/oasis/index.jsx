import { useState, useEffect } from "react";
import products from "./../../data/products.json";
import { Link } from "react-router-dom";
import { useRef } from "react";
import OasisPlans from "./partials/oasis-plans";
import SystemRecommendation from "./partials/system-recomendations";
import ProductCard from "./partials/product-card";

import { Truck, ChevronDown, Sun, Droplet, Moon } from "lucide-react";

export default function Oasis() {
  const currentProduct = products.oasis;

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState("once");
  const [isAdding, setIsAdding] = useState(false);
  const [deliveryFrequency, setDeliveryFrequency] = useState("30");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (currentProduct?.sizes?.length) {
      setSelectedSize(currentProduct.sizes[0]);
    }
  }, []);

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
      <div className="flex flex-col gap-6">
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
                  </div>

                  <span className="font-semibold uppercase text-white">
                    {currentProduct.title}
                  </span>

                  <p className="text-sm text-white">
                    {currentProduct.description}
                  </p>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {/* SHARP */}
                    <Link
                      to="/product/sharp"
                      className="group rounded-lg border border-white/10 bg-black/40 p-2 backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white/80 backdrop-blur-xl"
                        >
                          <Sun size={17} strokeWidth={1.5} />
                        </button>

                        <div className="flex min-w-0 flex-col">
                          <span className="font-bristone text-base font-semibold text-white">
                            SHARP
                          </span>
                          <span className="truncate text-[10px] uppercase text-white/50">
                            Enfoque matutino
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* HYDRATE */}
                    <Link
                      to="/product/hydrate"
                      className="group rounded-lg border border-white/10 bg-black/40 p-2 backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white/80 backdrop-blur-xl"
                        >
                          <Droplet size={17} strokeWidth={1.5} />
                        </button>

                        <div className="flex min-w-0 flex-col">
                          <span className="font-bristone text-base font-semibold text-white">
                            HYDRATE
                          </span>
                          <span className="truncate text-[10px] uppercase text-white/50">
                            para sostener
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* RESET */}
                    <Link
                      to="/product/reset"
                      className="group rounded-lg border border-white/10 bg-black/40 p-2 backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white/80 backdrop-blur-xl"
                        >
                          <Moon size={17} strokeWidth={1.5} />
                        </button>

                        <div className="flex min-w-0 flex-col">
                          <span className="font-bristone text-base font-semibold text-white">
                            RESET
                          </span>
                          <span className="truncate text-[10px] uppercase text-white/50">
                            Descanso nocturno
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

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
                        Vas a recibir {quantity} pack{quantity > 1 ? "s" : ""}{" "}
                        de <strong>{selectedSize.sticks} sobres</strong>
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

                      <span className="uppercase font-semibold text-sm">
                        Compra única
                      </span>
                    </div>

                    <span>${totalPrice.toFixed(2)}</span>
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

                        <span className="uppercase font-semibold text-sm">
                          Suscribite y ahorra un 20%
                        </span>
                      </div>

                      <span>${subscriptionPrice.toFixed(2)}</span>
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
                            onChange={(e) =>
                              setDeliveryFrequency(e.target.value)
                            }
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
                    onClick={purchaseType === "once" ? addToCart : undefined}
                    disabled={isAdding}
                    className="flex px-6 py-2 w-fit items-center justify-center gap-2 rounded-full bg-[#72000E] font-semibold uppercase text-white disabled:cursor-wait disabled:opacity-50"
                  >
                    {isAdding && purchaseType === "once" && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    )}

                    <span>
                      {purchaseType === "subscription"
                        ? "Suscribirse"
                        : "Agregar al carrito"}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
        <section className="flex min-h-screen items-center justify-center bg-[#F4F3F2] p-4 md:p-6">
          {/* Configuración + resumen */}
          <section className="min-h-[500px] w-full max-w-5xl rounded-3xl bg-white p-6 text-black md:p-8">
            <div className="grid min-h-[500px] grid-cols-1 gap-8 md:grid-cols-2">
              {/* Columna izquierda */}
              <div className="flex h-full flex-col">
                <div className="flex flex-col gap-4">
                  <h2 className="font-semibold text-2xl uppercase text-[#72000E]">
                    Elegí cómo querés tu recibir tu oasis
                  </h2>

                  <p>
                    Podés hacer una compra única o elegir una compra recurrente.
                    La frecuencia se define al momento de comprar y el pedido
                    vuelve a llegar sin que tengas que armarlo de nuevo.
                  </p>
                </div>

                <div className="mt-auto flex flex-col gap-6 pt-12">
                  {/* Tamaño + cantidad */}
                  <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    {/* Unidades */}
                    <div className="flex flex-col gap-3">
                      <span className="text-sm font-semibold uppercase">
                        Unidades por pack:
                      </span>

                      <div className="flex gap-2">
                        {currentProduct.sizes.map((size) => (
                          <button
                            key={size.sticks}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`h-10 w-10 shrink-0 rounded-sm ${
                              selectedSize.sticks === size.sticks
                                ? "bg-[#72000E] text-white"
                                : "border border-black/20 text-black"
                            }`}
                          >
                            <span className="text-sm">{size.sticks}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cantidad */}
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-sm font-semibold uppercase">
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

                  {/* Tipo de compra */}
                  <form className="flex flex-col gap-2">
                    {/* Compra única */}
                    <label
                      className={`flex cursor-pointer items-center justify-between rounded-lg bg-black/5 p-4 ${
                        purchaseType === "once"
                          ? "border border-black/20"
                          : "border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="oasisPurchaseType"
                          value="once"
                          checked={purchaseType === "once"}
                          onChange={() => setPurchaseType("once")}
                          className="h-4 w-4 appearance-none rounded-full border border-black/30 bg-transparent checked:border-[#72000E] checked:bg-[#72000E] checked:shadow-[inset_0_0_0_3px_white]"
                        />

                        <span className="uppercase font-semibold text-sm">
                          Compra única
                        </span>
                      </div>

                      <span className="uppercase font-semibold">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </label>

                    {/* Suscripción */}
                    <label
                      className={`flex cursor-pointer flex-col gap-4 rounded-lg bg-black/5 p-4 ${
                        purchaseType === "subscription"
                          ? "border border-black/20"
                          : "border border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="oasisPurchaseType"
                            value="subscription"
                            checked={purchaseType === "subscription"}
                            onChange={() => setPurchaseType("subscription")}
                            className="h-4 w-4 appearance-none rounded-full border border-black/30 bg-transparent checked:border-[#72000E] checked:bg-[#72000E] checked:shadow-[inset_0_0_0_3px_white]"
                          />

                          <span className="uppercase font-semibold text-sm">
                            Suscribite y ahorra un 20%
                          </span>
                        </div>

                        <span className="uppercase font-semibold">
                          ${subscriptionPrice.toFixed(2)}
                        </span>
                      </div>

                      {/* Frecuencia siempre visible */}
                      <div className="flex flex-col gap-2">
                        <span className="text-xs uppercase text-black/50">
                          Frecuencia de entrega
                        </span>

                        <div className="relative">
                          <select
                            value={deliveryFrequency}
                            onChange={(e) =>
                              setDeliveryFrequency(e.target.value)
                            }
                            className="h-10 w-full appearance-none rounded-md border border-black/10 bg-white px-3 pr-12 text-sm text-black outline-none"
                          >
                            <option value="30">Mensual · 30 días</option>
                            <option value="45">Cada 45 días</option>
                            <option value="60">Cada 60 días</option>
                            <option value="90">Cada 90 días</option>
                          </select>

                          <ChevronDown
                            size={16}
                            strokeWidth={1.5}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/50"
                          />
                        </div>
                      </div>
                    </label>
                  </form>
                </div>
              </div>

              {/* Columna derecha */}
              <div className="flex flex-col justify-between border-t border-black/10 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/4 bg-[#D1E8DC] px-3 py-1 text-xs font-semibold text-[#1E352B]">
                      <span>PROTOCOLO COMPLETO</span>
                    </div>

                    <h3 className="font-semibold text-sm">
                      RESUMEN DE SUMINISTRO
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-sm">
                        {quantity} caja{quantity > 1 ? "s" : ""} × SHARP
                      </span>

                      <span className="text-sm text-black/50">
                        {selectedSize.sticks} sobres
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-1">
                      <span className="text-sm">
                        {quantity} caja{quantity > 1 ? "s" : ""} × HYDRATE
                      </span>

                      <span className="text-sm text-black/50">
                        {selectedSize.sticks} sobres
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-1">
                      <span className="text-sm">
                        {quantity} caja{quantity > 1 ? "s" : ""} × RESET
                      </span>

                      <span className="text-sm text-black/50">
                        {selectedSize.sticks} sobres
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-semibold">
                      Beneficio suscripción
                    </span>
                    <div className="inline-flex w-fit items-center gap-2 rounded-full uppercase bg-[#F89437] px-3 py-1 text-xs font-semibold text-white">
                      <span>25 % de descuento</span>
                    </div>
                  </div>
                </div>

                {/* Precio + botón */}
                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm uppercase">Precio final</span>
                      <span className="text-sm uppercase">
                        envió bonificado
                      </span>
                    </div>

                    <span className="text-xl font-semibold">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={purchaseType === "once" ? addToCart : undefined}
                    disabled={isAdding}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#72000E] px-4 font-semibold uppercase text-white disabled:cursor-wait disabled:opacity-50"
                  >
                    {isAdding && purchaseType === "once" && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    )}

                    <span>
                      {purchaseType === "subscription"
                        ? "Suscribirse"
                        : "Agregar al carrito"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </section>
        <OasisPlans />
        <SystemRecommendation />
        <ProductCard />
      </div>
    </>
  );
}

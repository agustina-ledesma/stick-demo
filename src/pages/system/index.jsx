import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Truck, ChevronDown } from "lucide-react";
import products from "../../data/products.json";

export default function System() {
  const [searchParams] = useSearchParams();

  const systems = products.systems;
  //const initialSelected = searchParams.get("selected");

  /* const [selectedId, setSelectedId] = useState(
    initialSelected || systems[0]?.id,
  );


  const [selectedSize, setSelectedSize] = useState(null); */

  const initialSelected = searchParams.get("selected");
  const initialSticks = Number(searchParams.get("sticks"));

  const [selectedId, setSelectedId] = useState(
    initialSelected || systems[0]?.id,
  );

  const [selectedSize, setSelectedSize] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState("once");
  const [deliveryFrequency, setDeliveryFrequency] = useState("30");
  const [isAdding, setIsAdding] = useState(false);

  const selectedSystem = systems.find((system) => system.id === selectedId);

  const selectedProducts = selectedSystem
    ? selectedSystem.products
        .map((productId) => products[productId])
        .filter(Boolean)
    : [];

  const selectedProduct = selectedProducts[0] || null;

  // Igual que en Product: toma el primer size disponible
  //const currentSize = selectedSize || selectedProduct?.sizes?.[0] || null;

  const currentSize =
    selectedSize ||
    selectedProduct?.sizes?.find((size) => size.sticks === initialSticks) ||
    selectedProduct?.sizes?.[0] ||
    null;

  if (!systems.length) {
    return null;
  }

  const totalPrice = selectedSystem ? selectedSystem.price * quantity : 0;
  const subscriptionPrice = totalPrice * 0.8;

  const addToCart = () => {
    // Solo compra única agrega al carrito
    if (!selectedSystem || !currentSize || purchaseType !== "once") return;

    const cartItem = {
      type: "system",
      system: selectedSystem.id,
      sticks: currentSize.sticks,
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

  const handleSystemChange = (systemId) => {
    setSelectedId(systemId);
    setSelectedSize(null);
    setQuantity(1);
    setPurchaseType("once");
    setDeliveryFrequency("30");
  };

  const renderProductsText = () => {
    if (!selectedProducts.length || !currentSize) return null;

    return selectedProducts.map((product, index) => {
      const productSize = product.sizes?.find(
        (size) => size.sticks === currentSize.sticks,
      );

      const sticks = productSize?.sticks || currentSize.sticks;

      return (
        <span key={product.id}>
          {index > 0 && " y "}
          <strong>
            {quantity} pack{quantity > 1 ? "s" : ""} de {sticks} sobres de{" "}
            {product.name}
          </strong>
        </span>
      );
    });
  };

  return (
    <main className="mx-auto max-w-8xl px-6 py-24">
      <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-2">
        {/* Galería */}
        <div className="min-w-0">
          <div className="flex min-w-0 flex-col gap-4 md:flex-row">
            {/* Miniaturas */}
            <div className="order-2 flex shrink-0 flex-row items-start gap-2 overflow-x-auto md:order-1 md:w-[80px] md:flex-col md:overflow-x-hidden md:overflow-y-auto">
              {systems.map((system) => {
                const isSelected = selectedId === system.id;

                return (
                  <button
                    key={system.id}
                    type="button"
                    onClick={() => handleSystemChange(system.id)}
                    className={`h-[40px] w-[40px] shrink-0 overflow-hidden rounded-sm border md:h-[80px] md:w-[80px] ${
                      isSelected ? "border-white" : "border-transparent"
                    }`}
                  >
                    <img
                      src={system.image}
                      alt={system.name}
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* Imagen grande */}
            <div className="order-1 min-w-0 flex-1 overflow-hidden rounded-lg md:order-2">
              <div className="aspect-square w-full">
                <img
                  src={selectedSystem?.image}
                  alt={selectedSystem?.name || "System"}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="min-w-0 px-4">
          <div className="flex flex-col gap-6">
            {/* Información */}
            <div className="flex flex-col gap-3 border-b border-[#262A29] pb-6">
              <div className="flex items-center gap-4">
                <h1 className="font-bristone uppercase text-2xl font-semibold text-white md:text-4xl">
                  System
                </h1>
              </div>

              <div className="flex gap-4 items-center">
                <span className="font-semibold uppercase text-white">
                  Combiná dos fórmulas
                </span>
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F89437] px-3 py-1 text-xs font-semibold text-white">
                  <span>AHORRÁ UN 15 %</span>
                </div>
              </div>
            </div>

            {/* Systems */}
            <section>
              <div className="flex flex-col gap-3">
                {systems.map((system) => {
                  const isSelected = selectedId === system.id;

                  return (
                    <button
                      key={system.id}
                      type="button"
                      onClick={() => handleSystemChange(system.id)}
                      className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition ${
                        isSelected
                          ? "border-white bg-white/10"
                          : "border-white/10 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        {/* Radio */}
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            isSelected
                              ? "border-white bg-white"
                              : "border-white/40"
                          }`}
                        >
                          {isSelected && (
                            <div className="h-2 w-2 rounded-full bg-[#72000E]" />
                          )}
                        </div>

                        {/* Imagen */}
                        <div className="h-[45px] w-[45px] shrink-0 overflow-hidden rounded-md">
                          <img
                            src={system.image}
                            alt={system.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Información */}
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <span className="truncate text-sm font-semibold uppercase text-white">
                            {system.name}
                          </span>

                          <span className="truncate text-xs text-white/50">
                            {system.title}
                          </span>
                        </div>
                      </div>

                      {/* Precio */}
                      <span className="ml-3 shrink-0 text-sm font-semibold text-white">
                        ${system.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Configuración */}
            {selectedSystem && currentSize && (
              <>
                {/* Tamaño + cantidad */}
                <section className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
                    {/* Tamaño */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm uppercase text-white">
                          Unidades por pack:
                        </span>

                        {selectedProduct.sizes.map((size) => (
                          <button
                            key={size.sticks}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`h-8 w-8 rounded-sm ${
                              currentSize.sticks === size.sticks
                                ? "bg-[#72000E] text-white"
                                : "border border-white text-white"
                            }`}
                          >
                            <span className="block text-sm">{size.sticks}</span>
                          </button>
                        ))}
                      </div>
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
                  <span className="text-sm text-white">
                    Vas a recibir {renderProductsText()}.
                  </span>
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

                      <span>Compra única</span>
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

                        <span>Suscribite y ahorra un 20%</span>
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
                    onClick={addToCart}
                    disabled={isAdding || purchaseType !== "once"}
                    className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-[#72000E] px-4 font-semibold uppercase text-white disabled:cursor-wait disabled:opacity-50"
                  >
                    {isAdding ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      "Agregar al carrito"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

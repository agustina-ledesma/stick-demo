import { useState } from "react";
import { Minus, Plus, ChevronDown } from "lucide-react";

export default function ProductPurchaseOptions() {
  const [units, setUnits] = useState(15);
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState("once");
  const [frequency, setFrequency] = useState("30");

  return (
    <div className="w-full space-y-5">
      {/* Unidades por pack + cantidad */}
      <div className="flex items-start justify-start gap-8">
        {/* Unidades por pack */}
        <div className="flex flex-col items-start gap-2">
          <label className="whitespace-nowrap text-xs font-medium uppercase leading-5">
            Unidades por pack
          </label>

          <div className="flex h-[42px] items-center rounded-full border-2 border-black bg-white p-1">
            {[15, 30].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setUnits(value)}
                aria-pressed={units === value}
                className={`h-full rounded-full px-5 text-sm font-medium transition-colors ${
                  units === value
                    ? "bg-black text-white"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Cantidad */}
        <div className="flex flex-col items-start gap-2">
          <label className="whitespace-nowrap text-xs font-medium uppercase leading-5">
            Cantidad
          </label>

          <div className="flex h-[42px] items-center gap-4 rounded-full bg-black px-4 text-white">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              disabled={quantity <= 1}
              aria-label="Disminuir cantidad"
              className="flex h-8 w-6 items-center justify-center disabled:opacity-30"
            >
              <Minus size={16} />
            </button>

            <span className="min-w-4 text-center text-sm tabular-nums">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
              aria-label="Aumentar cantidad"
              className="flex h-8 w-6 items-center justify-center"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Opciones de compra */}
      <div className="space-y-3 text-black">
        {/* Compra única */}
        <button
          type="button"
          onClick={() => setPurchaseType("once")}
          aria-pressed={purchaseType === "once"}
          className={`w-full rounded-xl border-2 bg-white p-4 text-left transition-colors ${
            purchaseType === "once"
              ? "border-[#72000E]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex min-h-6 items-center gap-3">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                purchaseType === "once" ? "border-[#72000E]" : "border-gray-300"
              }`}
            >
              {purchaseType === "once" && (
                <span className="h-2.5 w-2.5 rounded-full bg-[#72000E]" />
              )}
            </span>

            <span className="text-sm font-semibold uppercase">
              Compra única
            </span>
          </div>
        </button>

        {/* Suscripción */}
        <div
          className={`rounded-xl border-2 bg-white transition-colors ${
            purchaseType === "subscription"
              ? "border-[#72000E]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <button
            type="button"
            onClick={() => setPurchaseType("subscription")}
            aria-pressed={purchaseType === "subscription"}
            className="flex min-h-[58px] w-full items-center gap-3 p-4 text-left"
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-1 ${
                purchaseType === "subscription"
                  ? " border-[#72000E]"
                  : "border-gray-300"
              }`}
            >
              {purchaseType === "subscription" && (
                <span className="h-2.5 w-2.5 rounded-full bg-[#72000E]" />
              )}
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold uppercase">
                Suscripción
              </span>

              <span className="rounded-full bg-[#F89437] px-2.5 py-1 text-[10px] font-semibold uppercase leading-none text-white sm:text-xs">
                Ahorrá un 20 %
              </span>
            </div>

            <ChevronDown
              size={17}
              className={`ml-auto shrink-0 text-gray-500 transition-transform duration-200 ${
                purchaseType === "subscription" ? "rotate-180" : ""
              }`}
            />
          </button>

          {purchaseType === "subscription" && (
            <div className="px-4 pb-4 pl-12">
              <label
                htmlFor="subscription-frequency"
                className="mb-2 block text-xs font-medium uppercase text-gray-500"
              >
                Frecuencia de entrega
              </label>

              <div className="relative">
                <select
                  id="subscription-frequency"
                  value={frequency}
                  onChange={(event) => setFrequency(event.target.value)}
                  className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-10 text-sm text-black outline-none transition focus:border-[#72000E]"
                >
                  <option value="30">Mensual · cada 30 días</option>
                  <option value="45">Cada 45 días</option>
                  <option value="60">Cada 60 días</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>
          )}
        </div>
        {/* Botón de acción */}
        <div className="mt-4 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              if (purchaseType === "once") {
                // Acción de agregar al carrito
              } else {
                // Acción de suscripción
              }
            }}
            className="inline-flex items-center justify-center rounded-full bg-[#72000E] px-6 py-3 text-sm font-semibold uppercase text-white transition-colors hover:bg-[#56000F] active:scale-[0.98]"
          >
            {purchaseType === "once" ? "Agregar al carrito" : "Suscribite"}
          </button>
          <span className="text-sm font-semibold">Envíos a todo el pais (CABA/AMBA: entre 2 y 3 días hábiles)</span>
        </div>
      </div>
    </div>
  );
}

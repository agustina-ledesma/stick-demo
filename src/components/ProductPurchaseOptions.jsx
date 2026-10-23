import { useState } from "react";
import { Minus, Plus, ChevronDown } from "lucide-react";

export default function ProductPurchaseOptions() {
  const [units, setUnits] = useState(15);
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState("once");
  const [frequency, setFrequency] = useState("30");

  return (
    <div className="w-full space-y-3 lg:space-y-4">
      <div className="flex flex-col items-start gap-1.5 lg:gap-2">
        <label className="whitespace-nowrap  text-gray-500 text-[11px] font-medium uppercase leading-4 lg:text-xs lg:leading-5">
          Unidades por pack
        </label>

        <div className="flex h-10 lg:h-[48px] w-full items-center rounded-full bg-[#eeecec] p-1">
          {[15, 30].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setUnits(value)}
              aria-pressed={units === value}
              className={`h-full w-full rounded-full px-3 lg:px-4 text-xs lg:text-sm font-medium transition-colors ${
                units === value
                  ? "bg-white text-gray-600 shadow-sm"
                  : "bg-[#eeecec] text-gray-600"
              }`}
            >
              {value} sobres
            </button>
          ))}
        </div>
      </div>

      {/* Opciones de compra */}
      <div className="space-y-2.5 lg:space-y-3 text-black">
        {/* Compra única */}
        <button
          type="button"
          onClick={() => setPurchaseType("once")}
          aria-pressed={purchaseType === "once"}
          className={`w-full rounded-xl border bg-white p-3 lg:p-4 text-left transition-colors ${
            purchaseType === "once"
              ? "border-[#72000E]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex min-h-5 lg:min-h-6 items-center gap-2 lg:gap-3">
            <span
              className={`flex h-4 w-4 lg:h-5 lg:w-5 shrink-0 items-center justify-center rounded-full border ${
                purchaseType === "once" ? "border-[#72000E]" : "border-gray-300"
              }`}
            >
              {purchaseType === "once" && (
                <span className="h-2 w-2 lg:h-2.5 lg:w-2.5 rounded-full bg-[#72000E]" />
              )}
            </span>

            <div className="flex w-full flex-col">
              <div className="flex w-full items-center justify-between gap-2">
                <span className="text-xs lg:text-sm font-semibold uppercase">
                  Compra única
                </span>
                <span className="whitespace-nowrap text-xs lg:text-sm font-semibold uppercase">
                  $00.00
                </span>
              </div>

              <span className="text-[11px] lg:text-xs text-gray-400">
                Pagas una sola vez.
              </span>
            </div>
          </div>
        </button>

        {/* Suscripción */}
        <div
          className={`rounded-xl border bg-white transition-colors ${
            purchaseType === "subscription"
              ? "border-[#72000E]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <button
            type="button"
            onClick={() => setPurchaseType("subscription")}
            aria-pressed={purchaseType === "subscription"}
            className="flex min-h-[50px] lg:min-h-[58px] w-full items-center gap-2 lg:gap-3 p-3 lg:p-4 text-left"
          >
            <span
              className={`flex h-4 w-4 lg:h-5 lg:w-5 shrink-0 items-center justify-center rounded-full border ${
                purchaseType === "subscription"
                  ? "border-[#72000E]"
                  : "border-gray-300"
              }`}
            >
              {purchaseType === "subscription" && (
                <span className="h-2 w-2 lg:h-2.5 lg:w-2.5 rounded-full bg-[#72000E]" />
              )}
            </span>

            <div className="flex w-full flex-col gap-1">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5 lg:gap-2">
                  <span className="text-sm font-semibold uppercase">
                    Suscripción
                  </span>

                  <span className="rounded-full bg-[#F89437] px-2 lg:px-2.5 py-1 text-[9px] lg:text-[10px] font-semibold uppercase leading-none text-white sm:text-xs">
                    Ahorrá un 20 %
                  </span>
                </div>

                <span className="whitespace-nowrap text-sm font-semibold uppercase">
                  $00.00
                </span>
              </div>

              <span className="text-sm text-gray-400">
                El producto te llega con la frecuencia que elijas.
              </span>
            </div>
          </button>

          {purchaseType === "subscription" && (
            <div className="px-3 pb-3 pl-3 lg:px-4 lg:pb-4 lg:pl-12">
              <label className="mb-2 block text-sm font-medium  text-gray-500">
                ¿Cada cuánto lo recibís?
              </label>

              <div className="flex w-full flex-col gap-2 rounded-2xl md:rounded-full bg-[#eeecec] p-1 sm:flex-row">
                {[
                  { value: "30", label: "30 días" },
                  { value: "45", label: "45 días" },
                  { value: "60", label: "60 días" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFrequency(option.value)}
                    aria-pressed={frequency === option.value}
                    className={`h-fit w-full flex-1 rounded-full px-3 py-2 text-sm font-medium transition-colors  lg:px-2 lg:py-1 ${
                      frequency === option.value
                        ? "bg-white text-gray-600 shadow-sm"
                        : "bg-[#eeecec] text-gray-600"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Botón de acción */}
        <div className="mt-3 lg:mt-4 flex flex-col gap-2 lg:gap-3">
          <button
            type="button"
            onClick={() => {
              if (purchaseType === "once") {
                // Acción de agregar al carrito
              } else {
                // Acción de suscripción
              }
            }}
            className="inline-flex items-center justify-center rounded-full bg-[#72000E] px-5 lg:px-6 py-2.5 lg:py-3 text-xs lg:text-sm font-semibold uppercase text-white transition-colors hover:bg-[#56000F] active:scale-[0.98]"
          >
            {purchaseType === "once" ? "Agregar al carrito" : "Suscribite"}
          </button>

          {/* <span className="text-sm font-semibold">
        Envíos a todo el pais (CABA/AMBA: entre 2 y 3 días hábiles)
      </span> */}
        </div>
      </div>
    </div>
  );
}

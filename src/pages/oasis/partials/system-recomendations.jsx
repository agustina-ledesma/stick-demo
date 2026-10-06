import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "./../../../data/products.json";
import { Check } from "lucide-react";

export default function SystemRecommendation() {
  const navigate = useNavigate();
  const systems = products.systems;

  const [selectedSystem, setSelectedSystem] = useState(null);

  return (
    <section className="mx-auto flex min-h-screen max-w-8xl items-center px-4 py-16 sm:px-6 md:py-24">
  <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:px-8">
    {/* Título */}
    <div className="flex flex-col gap-4 text-white">
      <h2 className="text-2xl font-semibold uppercase leading-none text-white">
        Elegí los dos productos que más necesitás
      </h2>

      <p>
        Armá tu System combinando cualquier par entre SHARP, HYDRATE y RESET.
      </p>

      <p>
        Si querés llevar la experiencia completa, elegí Oasis con los tres
        productos.
      </p>

      <div className="flex flex-wrap gap-3">
        <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-white px-3 py-1 text-sm font-semibold uppercase leading-none text-white">
          SHARP + HYDRATE (FOCO Y RENDIMIENTO)
        </span>

        <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-white px-3 py-1 text-sm font-semibold uppercase leading-none text-white">
          HYDRATE + RESET (VITALIDAD Y SUEÑO)
        </span>

        <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-white px-3 py-1 text-sm font-semibold uppercase leading-none text-white">
          SHARP + RESET (DÍA Y NOCHE)
        </span>
      </div>
    </div>

    {/* Mini form */}
    <div className="flex h-fit w-full max-w-125 flex-col gap-4 rounded-2xl bg-white p-4 sm:p-6 md:ml-auto">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <span className="inline-flex w-fit items-center rounded-full bg-[#F89437] px-3 py-1 text-[11px] font-semibold uppercase leading-none text-white">
          Ahorrá un 15 %
        </span>

        <h3 className="text-lg font-semibold uppercase leading-tight text-[#72000E] sm:text-xl">
          Elegí tu System
        </h3>
      </div>

      {/* Systems */}
      <div className="flex flex-col gap-4">
        {systems.map((system) => {
          const isSelected = selectedSystem === system.id;

          return (
            <button
              key={system.id}
              type="button"
              onClick={() => setSelectedSystem(system.id)}
              className={`flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-left transition ${
                isSelected
                  ? "border-[#72000E] bg-[#72000E]/5"
                  : "border-black/10"
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md sm:h-12 sm:w-12">
                  <img
                    src={system.image}
                    alt={system.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-col">
                  <span className="font-bristone truncate text-sm font-semibold uppercase leading-tight text-[#72000E] sm:text-base">
                    {system.name}
                  </span>

                  <span className="truncate text-xs leading-tight text-black/50">
                    {system.title}
                  </span>
                </div>
              </div>

              {/* Check */}
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  isSelected
                    ? "border-[#72000E] bg-[#72000E] text-white"
                    : "border-black/20"
                }`}
              >
                {isSelected && <Check size={13} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <button
        type="button"
        disabled={!selectedSystem}
        onClick={() => navigate(`/system?selected=${selectedSystem}`)}
        className="flex h-10 w-fit items-center justify-center rounded-full bg-[#72000E] px-5 text-xs font-semibold uppercase text-white transition disabled:cursor-not-allowed disabled:opacity-30 sm:h-12 sm:px-6 sm:text-sm"
      >
        Elegir System
      </button>
    </div>
  </div>
</section>
  );
}

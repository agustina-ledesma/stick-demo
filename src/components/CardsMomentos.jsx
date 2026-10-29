import GlassPill from "./GlassPill";
import { Sun, Moon } from "lucide-react";
import StixSharp3D from "./product/StixSharp3D";
import { useNavigate } from "react-router-dom";

const moments = [
  {
    name: "SHARP",
    moment: "de día",
    render: <StixSharp3D />,
    description: "Al despertar o antes de una tarea de alta demanda",
    icon: Sun,
    image: "/images/1.png",
    duration: "Duración aproximada: 4–6 horas.",
    warning: "Contiene cafeína pura.",
    path: "/sharp",
  },
  {
    name: "Reset",
    moment: "de noche",
    render: <StixSharp3D />,
    description: "30-45 minutos antes de acostarte.",
    icon: Moon,
    image: "/images/1.png",
    duration: "Facilita el descanso toda la noche.",
    warning: "No conducir después.",
    path: "/reset",
  },
];

export default function CardsMomentos() {
  const navigate = useNavigate();
  return (
    <section className="w-full py-0">
      <div className="mx-auto grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        {moments.map((item, index) => (
          <article
            key={index}
            className="grid grid-cols-1 gap-3 rounded-2xl bg-[#f4f3f2] p-4 md:p-5 md:grid-cols-2 lg:items-center lg:gap-4"
          >
            <div className="relative flex h-[350px] items-center justify-center rounded-xl sm:h-[280px] lg:h-[300px]">
              <div className="absolute left-3 top-3 z-10">
                <GlassPill icon={item.icon} text={item.moment} variant="dark" />
              </div>

              <div className="my-1 h-[min(44vh,300px)] w-full shrink-0">
                <StixSharp3D
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col items-start justify-center py-2">
              <h3 className="font-bristone uppercase text-2xl font-normal tracking-tight md:text-3xl text-[#72000E]">
                {item.name}
              </h3>

              <div className="mt-3 flex flex-col gap-3">
                <div className="flex flex-col gap-2 font-light text-gray-600">
                  <span>{item.description}</span>

                  <span className="text-sm leading-relaxed">
                    {item.duration}
                  </span>

                  <span className="font-semibold">{item.warning}</span>
                </div>
                <div className="mt-auto pt-3">
                  <button
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="w-fit rounded-full bg-[#72000E] uppercase px-4 py-2 font-bristone text-xs  text-white transition-colors hover:bg-[#5E0010]"
                  >
                    VER {item.name}
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

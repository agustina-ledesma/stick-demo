import { Sun, Droplet, Moon } from "lucide-react";
import SectionLabel from "./SectionLabel";
import GlassPill from "./GlassPill";

export default function VideoGrid() {
  const steps = [
    {
      number: "01",
      title: "Agua",
      description: "Poné agua en un vaso para preparar tu SHARP.",
      video: "/videos/video-1.mp4",
      icon: Droplet,
      pill: "paso 1 - Prepará tu vaso",
    },
    {
      number: "02",
      title: "SHARP",
      description:
        "Agregá el contenido del sobre al agua y mezclá hasta disolver.",
      video: "/videos/video-2.mp4",
      icon: Sun,
      pill: "paso 2 - Activá tu fórmula",
    },
    {
      number: "03",
      title: "Foco",
      description: "Ya estás preparado para encarar tu próxima tarea.",
      video: "/videos/video-3.mp4",
      icon: Moon,
      pill: "paso 3- Es momento de enfocarte",
    },
  ];

  return (
    /*  <section className="mx-4 flex h-fit max-w-[1400px] justify-center rounded-2xl bg-[#f4f3f2] p-4 sm:p-6 lg:mx-auto lg:rounded-4xl lg:p-8">
      <div className="mx-auto w-full p-2 sm:p-4 lg:p-8">
        <div className="mb-8 flex flex-col gap-1 sm:mb-10">
          <SectionLabel text="CÓMO PREPARARLO" />

          <h2 className="mt-2 text-4xl leading-tight tracking-tight text-black">
            Tres pasos. Un momento para vos.
          </h2>

          <p className="mt-1 max-w-3xl text-base leading-relaxed text-gray-600 lg:text-lg">
            SHARP está pensado para acompañarte cuando necesitás concentrarte,
            empezar el día con claridad o encarar una tarea exigente.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-3 md:gap-4 lg:gap-6">
          {steps.map((step) => (
            <article
              key={step.number}
              className="mx-auto w-full min-w-0 max-w-[350px] md:max-w-none"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100">
                <video
                  className="h-full w-full object-cover"
                  src={step.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`${step.title}: paso ${step.number}`}
                />

                <div className="absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
                  <GlassPill
                    icon={step.icon}
                    text={step.pill}
                    defaultOpen={true}
                
                  />
                </div>
              </div>

              <div className="mt-3 lg:mt-4">              
                <h3 className="mt-1 text-xl font-semibold uppercase tracking-tight text-gray-600">
                  {step.title}
                </h3>

                <p className="mt-1 text-md leading-relaxed text-gray-500">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section> */
    <section className="mx-auto flex h-fit w-[calc(100%-2rem)] max-w-[1400px] justify-center rounded-2xl bg-[#f4f3f2] p-3 sm:w-[calc(100%-3rem)] sm:p-5 md:p-6 lg:rounded-2xl lg:p-8">
      <div className="w-full min-w-0 p-1 sm:p-2 lg:p-3">
        <div className="flex flex-col gap-2 py-3 sm:py-4">
          <SectionLabel text="CÓMO PREPARARLO" />

          <h2 className="mt-1 text-2xl leading-tight tracking-tight text-black lg:text-3xl">
            Tres pasos. Un momento para vos.
          </h2>

          <p className="max-w-3xl text-sm leading-relaxed text-gray-600 lg:text-base">
            SHARP está pensado para acompañarte cuando necesitás concentrarte,
            empezar el día con claridad o encarar una tarea exigente.
          </p>
        </div>

        <div className="mx-auto grid min-w-0 grid-cols-1 justify-items-center gap-6 sm:gap-5 lg:grid-cols-3 md:gap-4 lg:gap-5">
          {steps.map((step) => (
            <article key={step.number} className="w-full min-w-0 max-w-[370px]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100">
                <video
                  className="h-full w-full object-cover"
                  src={step.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`${step.title}: paso ${step.number}`}
                />

                <div className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3">
                  <GlassPill
                    icon={step.icon}
                    text={step.pill}
                    defaultOpen={true}
                  />
                </div>
              </div>

              <div className="mt-2">
                <h3 className="mt-1 text-lg font-semibold uppercase tracking-tight text-gray-600">
                  {step.title}
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sun, Droplet, Moon } from "lucide-react";

const items = [
  {
    id: "breakfast",
    year: "AL DESPERTAR",
    title: "PRIMERO, EL DESAYUNO",
    description:
      "Desayunás y arrancás el día. SHARP no se toma apenas te despertás: todavía falta un rato.",
  },
  {
    id: "sharp",
    year: "2 HORAS DESPUÉS DEL DESAYUNO",
    title: "SHARP",
    description:
      "Tomalo con la mañana en marcha. No reemplaza el desayuno ni la buena alimentación: los necesita para que sus efectos se noten mejor.",
    icon: Sun,
  },
  {
    id: "lunch",
    year: "AL MEDIODIA",
    title: "Almuerzo y agua",
    description:
      "Comé bien y tené agua a mano. Es la base del día, y Stix se suma a eso.",
  },
  {
    id: "hydrate",
    year: "CUANDO TOMÁS POCA AGUA",
    title: "HYDRATE",
    description:
      "Está pensado para esos días de poco consumo. Pide una buena alimentación durante el día y que lo complementes con agua.",
    icon: Droplet,
  },
  {
    id: "reset",
    year: "HORAS ANTES DE DORMIR",
    title: "RESET",
    description: "Es para bajar los decibeles del día. No induce el sueño.",
    icon: Moon,
  },
  {
    id: "sleep",
    year: "AL ACOSTARTE",
    title: "Apagás la luz",
    description:
      "No tomás nada más. RESET quedó horas atrás, y dormir sigue siendo cosa tuya.",
  },
];

function MobileTimeline({ progress }) {
  const lineScale = useTransform(progress, [0.05, 0.8], [0, 1]);

  return (
    <div className="relative">
      <div className="absolute bottom-0 left-0 top-0 w-px bg-white/10" />

      <motion.div
        style={{ scaleY: lineScale }}
        className="absolute left-0 top-0 h-full w-px origin-top bg-[#BB202B]"
      />

      <div className="space-y-20">
        {items.map((item, index) => {
          const start = 0.05 + index * 0.17;
          const end = index === items.length - 1 ? 1 : start + 0.12;

          const opacity = useTransform(progress, [start, end], [0.25, 1]);

          const x = useTransform(progress, [start, end], [20, 0]);

          const dotScale = useTransform(progress, [start, end], [0, 1]);

          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              style={{ opacity, x }}
              className="relative pl-8"
            >
              <motion.div
                style={{ scale: dotScale }}
                className="absolute left-0 top-0 z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#BB202B]"
              />

              <p className="mb-2 text-xs text-[#BB202B] uppercase font-semibold">
                {item.year}
              </p>

              {Icon ? (
                <div className="flex items-center gap-2">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#BB202B]">
                    <Icon size={14} strokeWidth={2} className="text-white" />
                  </div>

                  <h3 className="font-bristone text-2xl leading-none text-white uppercase">
                    {item.title}
                  </h3>
                </div>
              ) : (
                <h3 className="text-2xl font-medium leading-none text-white uppercase">
                  {item.title}
                </h3>
              )}

              <p className="mt-2 max-w-sm text-xs leading-relaxed text-white uppercase">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  const lineScale = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative h-auto text-white lg:h-[220vh]"
    >
      {/* ================= DESKTOP ================= */}

      <div className="sticky top-0 hidden h-screen items-center overflow-hidden lg:flex">
        <motion.div
          style={{ x }}
          className="flex h-[30vw] w-[240vw] shrink-0 items-center gap-[5vw] px-[5vw]"
        >
          {/* OASIS */}
          <div className="flex flex-col gap-3">
            <div className="mb-16">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#BB202B]">
                Protocolo completo
              </p>

              <h2 className="mt-2 font-bristone text-4xl leading-[0.95]">
                OASIS
              </h2>
            </div>

            <div className="h-[600px] w-[500px] shrink-0 overflow-hidden rounded-[1vw]">
              <img
                src="/images/products/stix-jugo.png"
                alt="Oasis"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* ================= TIMELINE ================= */}

          <div className="relative h-full w-[180vw] shrink-0">
            {/* EJE HORIZONTAL */}

            <div className="pointer-events-none absolute left-0 top-1/2 z-0 flex w-full -translate-y-1/2 items-center">
              <div className="size-[0.8vw] shrink-0 rounded-full bg-[#BB202B]" />

              <motion.div
                style={{ scaleX: lineScale }}
                className="h-px flex-1 origin-left bg-[#BB202B]"
              />

              <div className="size-[0.8vw] shrink-0 rounded-full bg-[#BB202B]" />
            </div>

            {/* ================= ITEMS ================= */}

            <div className="relative flex h-full w-full items-center">
              {items.map((item, index) => {
                const isBottom = index % 2 === 1;
                const Icon = item.icon;

                const start = 0.12 + index * 0.13;
                const end = start + 0.12;

                const opacity = useTransform(
                  scrollYProgress,
                  [start, end],
                  [0, 1],
                );

                const scale = useTransform(
                  scrollYProgress,
                  [start, end],
                  [0.9, 1],
                );

                return (
                  <motion.div
                    key={item.id}
                    style={{
                      opacity,
                      scale,
                    }}
                    className="relative h-full w-[28vw] shrink-0"
                  >
                    {/* ================= TALLO + PUNTO ================= */}

                    {isBottom ? (
                      <>
                        {/* Tallo propio de esta card */}
                        <div className="absolute left-0 top-1/2 h-[7vw] w-px bg-[#BB202B]" />

                        {/* Punto propio sobre el eje */}
                        <div className="absolute left-0 top-1/2 z-20 size-[1vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#BB202B]" />
                      </>
                    ) : (
                      <>
                        {/* Tallo propio de esta card */}
                        <div className="absolute bottom-1/2 left-0 h-[7vw] w-px bg-[#BB202B]" />

                        {/* Punto propio sobre el eje */}
                        <div className="absolute bottom-1/2 left-0 z-20 size-[1vw] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#BB202B]" />
                      </>
                    )}

                    {/* ================= CONTENIDO ================= */}

                    {isBottom ? (
                      <div className="absolute left-[1.8vw] top-[calc(50%+7vw)] w-[23vw]">
                        <p className="mb-[0.7vw] font-mono text-xs text-[#BB202B] uppercase font-semibold">
                          {item.year}
                        </p>

                        {Icon ? (
                          <div className="flex items-center gap-[0.6vw]">
                            <div className="flex size-[1.8vw] shrink-0 items-center justify-center rounded-full bg-[#BB202B]">
                              <Icon
                                size="0.9vw"
                                strokeWidth={2}
                                className="text-white"
                              />
                            </div>

                            <h3 className="font-bristone text-[1.5vw] leading-none text-white uppercase">
                              {item.title}
                            </h3>
                          </div>
                        ) : (
                          <h3 className="text-[1.5vw] font-medium leading-none text-white uppercase">
                            {item.title}
                          </h3>
                        )}

                        <p className="mt-[0.8vw] w-full text-[0.9vw] leading-[1.3] text-white uppercase">
                          {item.description}
                        </p>
                      </div>
                    ) : (
                      <div className="absolute bottom-[calc(50%+7vw)] left-[1.8vw] w-[23vw]">
                        <p className="mb-[0.7vw] font-mono text-xs text-[#BB202B] uppercase font-semibold">
                          {item.year}
                        </p>

                        {Icon ? (
                          <div className="flex items-center gap-[0.6vw]">
                            <div className="flex size-[1.8vw] shrink-0 items-center justify-center rounded-full bg-[#BB202B]">
                              <Icon
                                size="0.9vw"
                                strokeWidth={2}
                                className="text-white"
                              />
                            </div>

                            <h3 className="font-bristone text-[1.5vw] leading-none text-white uppercase">
                              {item.title}
                            </h3>
                          </div>
                        ) : (
                          <h3 className="text-[1.5vw] font-medium leading-none text-white uppercase">
                            {item.title}
                          </h3>
                        )}

                        <p className="mt-[0.8vw] w-full text-[0.9vw] leading-[1.3] text-white uppercase">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================= MOBILE ================= */}

      <div className="px-6 py-24 lg:hidden">
        <div className="mb-5 aspect-square w-full overflow-hidden rounded-2xl">
          <img
            src="/images/products/stix-jugo.png"
            alt="Oasis"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
            Protocolo completo
          </p>

          <h2 className="mt-2 font-bristone text-4xl leading-[0.95]">OASIS</h2>
        </div>

        <MobileTimeline progress={scrollYProgress} />
      </div>
    </section>
  );
}

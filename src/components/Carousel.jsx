import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const items = [
  {
    id: 1,
    url: "/images/hero/hero-1.png",
    title: "un protocolo para acompañar tu día completo",
    button: "Descubrí oasis",
    link: "/oasis",
  },
  {
    id: 2,
    url: "/images/hero/hero-2.png",
    title: "Cuando el día te pide más de lo que podés darle",
    button: "descubrí system",
    link: "/system",
  },
  {
    id: 3,
    url: "/images/hero/hero-3.png",
    title: "La fórmula completa, sin vueltas",
    button: "ver formulas",
    link: "/ciencia",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);
  const x = useMotionValue(0);

  const currentItem = items[index];

  // Movimiento automático
  useEffect(() => {
    if (isDragging) return;

    const autoplay = setInterval(() => {
      setIndex((current) => (current === items.length - 1 ? 0 : current + 1));
    }, 5000);

    return () => clearInterval(autoplay);
  }, [isDragging]);

  // Animación al cambiar de slide
  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;

      animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden"
      >
        {/* Imágenes */}
        <motion.div
          className="flex h-full"
          drag="x"
          dragElastic={0.2}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, info) => {
            setIsDragging(false);

            const containerWidth = containerRef.current?.offsetWidth || 1;

            const offset = info.offset.x;
            const velocity = info.velocity.x;

            let newIndex = index;

            if (Math.abs(velocity) > 500) {
              newIndex = velocity > 0 ? index - 1 : index + 1;
            } else if (Math.abs(offset) > containerWidth * 0.3) {
              newIndex = offset > 0 ? index - 1 : index + 1;
            }

            newIndex = Math.max(0, Math.min(items.length - 1, newIndex));

            setIndex(newIndex);
          }}
          style={{ x }}
        >
          {items.map((item) => (
            <div key={item.id} className="relative h-screen w-full shrink-0">
              <img
                src={item.url}
                alt={item.title}
                className="h-full w-full select-none object-cover"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>

        {/* Contenido inferior */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-16 md:px-10 lg:px-16">
          <div className="grid gap-4 md:gap-8 md:grid-cols-2 md:items-end">
            {/* Columna izquierda */}
            <div className="flex flex-col items-start">
              <motion.h1
                key={currentItem.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl lg:text-4xl uppercase font-semibold leading-none text-white"
              >
                {currentItem.title}
              </motion.h1>

              <motion.a
                key={currentItem.button}
                href={currentItem.link}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="mt-5 inline-flex h-12 items-center gap-3 rounded-full bg-[#72000E] px-6 text-md font-semibold uppercase text-white"
              >
                {currentItem.button}
              </motion.a>
            </div>

            {/* Columna derecha */}
            <div className="max-w-xl md:ml-auto">
              <p className="text-sm leading-relaxed text-white uppercase md:text-base">
                Stix reúne tres suplementos funcionales, Elegí el momento que
                necesitás:
              </p>

              {/*  <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border uppercase font-semibold border-white/20 bg-white/10 px-4 py-2 text-xs text-white backdrop-blur-md">
                  Foco sostenido
                </span>

                <span className="rounded-full border uppercase font-semibold border-white/20 bg-white/10 px-4 py-2 text-xs text-white backdrop-blur-md">
                  Hidratación efectiva
                </span>

                <span className="rounded-full border uppercase font-semibold border-white/20 bg-white/10 px-4 py-2 text-xs text-white backdrop-blur-md">
                  Descanso reparador
                </span>
              </div> */}
              <div className="mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-white backdrop-blur-md sm:px-4 sm:py-2 sm:text-xs">
                  Foco sostenido
                </span>

                <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-white backdrop-blur-md sm:px-4 sm:py-2 sm:text-xs">
                  Hidratación efectiva
                </span>

                <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5 text-[9px] font-semibold uppercase text-white backdrop-blur-md sm:px-4 sm:py-2 sm:text-xs">
                  Descanso reparador
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {items.map((item, i) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

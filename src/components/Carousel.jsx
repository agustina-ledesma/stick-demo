import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";
import GlassPill from "./GlassPill";

const items = [
  {
    id: 1,
    url: "/images/home/hero-1.png",
    title: "UN MOMENTO, UNA FÓRMULA",
    description: null,
    button: "Descubrí stix",
    link: "/#products",
  },
  {
    id: 2,
    url: "/images/home/hero-2.jpg",
    title: "PARA EQUIPOS QUE NO NEGOCIAN SU RENDIMIENTO.",
    description:
      "Formula funcional premium para las personas que invierten en productividad como su mayor activo.",
    button: "stix empresas",
    link: "/empresas",
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
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden bg-black"
      >
        {/* IMÁGENES */}
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
            <div
              key={item.id}
              className="relative h-screen w-full shrink-0 bg-black"
            >
              {item.url && (
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-full w-full select-none object-cover"
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* DEGRADADO INFERIOR */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[75%]"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.25) 85%, transparent 100%)",
          }}
        />

        {/* TEXTO: UN POCO MÁS ABAJO */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end pb-16 lg:pb-24 lg:mb-16 lg:items-end px-6 pt-16 md:px-10 md:pt-20 lg:px-16">
          <div className="w-full max-w-2xl">
            <motion.h1
              key={currentItem.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-semibold uppercase leading-tight text-white md:text-3xl lg:text-4xl"
            >
              {currentItem.title}
            </motion.h1>

            {currentItem.description && (
              <motion.p
                key={`${currentItem.title}-description`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="mt-4 max-w-lg text-base leading-relaxed text-white md:text-lg"
              >
                {currentItem.description}
              </motion.p>
            )}

            {currentItem.button && (
              <motion.a
                key={`${currentItem.title}-button`}
                href={currentItem.link}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="pointer-events-auto mt-5 inline-flex h-11 items-center rounded-full bg-[#72000E] px-6 text-sm font-semibold uppercase text-white transition-colors hover:bg-[#5E0010]"
              >
                {currentItem.button}
              </motion.a>
            )}
          </div>
        </div>

        {/* PILLS GLASS: FIJAS ABAJO A LA IZQUIERDA */}
        <div className="hidden lg:block absolute bottom-14 left-6 z-20 flex flex-wrap items-center gap-3 md:left-10 lg:left-16">
          <GlassPill
            icon={Sun}
            text="Sharp - Foco sostenido"
            defaultOpen={true}
          />

          <GlassPill
            icon={Moon}
            text="Reset - Descanso reparador"
            defaultOpen={true}
          />
        </div>

        {/* DOTS */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {items.map((item, i) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setIndex(i)}
              aria-label={`Ir a la diapositiva ${i + 1}`}
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

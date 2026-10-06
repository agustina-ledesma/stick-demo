"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Título que entra palabra por palabra desde abajo, con máscara (entrada de heros y títulos grandes).
// `alCargar` anima apenas monta; si no, cuando entra en pantalla.
export function TextoRevelado({
  texto,
  as = "h2",
  className = "",
  delay = 0,
  alCargar = false,
}: {
  texto: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  alCargar?: boolean;
}) {
  const Tag = motion[as];
  const palabras = texto.split(" ");
  const disparo = alCargar
    ? { initial: "oculto", animate: "visible" }
    : { initial: "oculto", whileInView: "visible", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag
      className={className}
      {...disparo}
      variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: delay } } }}
      aria-label={texto}
    >
      {palabras.map((p, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-top">
          <motion.span
            className="inline-block"
            variants={{
              oculto: { y: "105%" },
              visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {p}
            {i < palabras.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

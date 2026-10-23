
import { motion } from "framer-motion";

export default function SectionLabel({ text = "", className = "" }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Punto rojo */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#72000E]"
      />

      {/* Texto animado */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{
          duration: 0.5,
          delay: 0.15,
          ease: "easeOut",
        }}
        className="text-xs font-medium uppercase tracking-widest text-gray-500"
      >
        {text}
      </motion.span>
    </div>
  );
}

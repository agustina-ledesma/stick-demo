
import { Sun, Droplet, Moon } from "lucide-react";

const moments = [
  { id: "manana", label: "MAÑANA", icon: Sun },
  { id: "mediodia", label: "MEDIODÍA", icon: Droplet },
  { id: "noche", label: "NOCHE", icon: Moon },
];

export default function MomentosNav({ active = "manana", onSelect }) {
  return (
    <nav
      aria-label="Momentos del día"
      className="group/moments flex flex-col gap-3"
    >
      {moments.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect?.(id)}
            aria-label={label}
            aria-current={isActive ? "true" : undefined}
            className="group/item flex cursor-pointer items-center gap-4 text-left z-30"
          >
            <span
              className={`w-24 shrink-0 text-sm tracking-wide transition-colors duration-300 ${
                isActive
                  ? "font-semibold text-white"
                  : "font-normal text-white/65 group-hover/item:text-white"
              }`}
            >
              {label}
            </span>

            <span
              className={`flex shrink-0 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300 ease-out ${
                isActive
                  ? "h-12 w-12 border-white/40 bg-white/20 text-white shadow-lg shadow-black/10 group-hover/moments:group-hover/item:h-10 group-hover/moments:group-hover/item:w-10"
                  : "h-10 w-10 border-white/20 bg-white/[0.07] text-white/75 group-hover/item:h-12 group-hover/item:w-12 group-hover/item:border-white/40 group-hover/item:bg-white/20 group-hover/item:text-white group-hover/item:shadow-lg group-hover/item:shadow-black/10"
              }`}
            >
              <Icon size={isActive ? 20 : 18} strokeWidth={1.7} />
            </span>
          </button>
        );
      })}
    </nav>
  );
}

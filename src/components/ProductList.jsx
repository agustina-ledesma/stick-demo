import { Sun, Droplet, Moon, ArrowRight } from "lucide-react";

const products = [
  {
    id: "sharp",
    icon: Sun,
    title: "SHARP",
    text: "Enfoque matutino",
    href: "/sharp",
  },
/*   {
    id: "hydrate",
    icon: Droplet,
    title: "HYDRATE",
    text: "Para sostener",
    href: "/hydrate",
  }, */
  {
    id: "reset",
    icon: Moon,
    title: "RESET",
    text: "Para descansar",
    href: "/reset",
  },
];

export default function ProductList() {
  return (
    <ul className="w-full max-w-[780px] border-t border-[#e2dede]/50">
      {products.map(({ id, icon: Icon, title, text, href }) => (
        <li key={id} className="border-b border-[#e2dede]/50">
          <a
            href={href}
            className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-200 hover:bg-[#72000E]/[0.025] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#72000E]"
          >
            <Icon
              className="shrink-0 text-[#72000E]/80"
              strokeWidth={1.4}
              size={14}
              aria-hidden="true"
            />

            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="font-bristone text-sm text-[#72000E]">
                {title}
              </span>
              <span className="text-[10px] uppercase tracking-wide text-gray-500">
                {text}
              </span>
            </div>

            <ArrowRight
              className="h-4 w-4 shrink-0 text-[#2a1215]/60 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
              strokeWidth={1.4}
              aria-hidden="true"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

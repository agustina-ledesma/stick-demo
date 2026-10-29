
import { useState } from "react";
import { Plus , ChevronDown } from "lucide-react";

export default function FaqDropdown({
  question,
  answer,
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="text-sm text-gray-600 md:text-base">
          {question}
        </span>

        <ChevronDown
          size={20}
          strokeWidth={1.8}
          className={`shrink-0 text-gray-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 pr-8 text-sm font-light leading-relaxed text-gray-500 md:text-base">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

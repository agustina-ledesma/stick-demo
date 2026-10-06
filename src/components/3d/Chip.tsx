// Chip del sistema (Figma: chip, 2393:521)
type Props = {
  children: React.ReactNode;
  color?: "primary" | "glass" | "feedback" | "warning" | "white" | "secondary";
  className?: string;
};

const colores = {
  primary: "bg-oxblood-700 text-white font-medium",
  glass: "bg-white/15 text-white font-medium backdrop-blur-sm",
  feedback: "bg-verde-100 text-verde-800 font-semibold",
  warning: "bg-[#f89437] text-white font-medium",
  white: "bg-white text-oxblood-700 font-semibold",
  secondary: "bg-off-white-100 text-casi-negro font-medium",
};

export function Chip({ children, color = "primary", className = "" }: Props) {
  return (
    <span
      className={`inline-flex h-[22px] shrink-0 items-center justify-center rounded-full px-2 text-[12px] whitespace-nowrap ${colores[color]} ${className}`}
    >
      <span className="recorte">{children}</span>
    </span>
  );
}

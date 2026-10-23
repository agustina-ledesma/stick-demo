import MorphSlider from "@/components/MorphSlider";
import StixSharp3D from "./product/StixSharp3D";
import { Sun, Moon } from "lucide-react";

const items = [
  {
    image: "/images/home/escena/fondo-1.jpg",
    render: <StixSharp3D />,
    title: "SHARP",
    icon: <Sun />,
    caption: "Foco y Energia sostenida",
    description:
      "Para los momentos que definen tu día. Foco sostenido, energía mental, sin picos ni caídas.",
    buttonText: "Ver SHARP",
    buttonLink: "/sharp",
  },
  {
    image: "/images/home/escena/fondo-2.jpg",

    render: <StixSharp3D />,
    title: "RESET",
    icon: <Moon />,
    caption: "Sueño reparador.",
    description:
      "Para las noches que definen tu descanso. Sueño profundo, recuperacion real.",
    buttonText: "Ver reset",
    buttonLink: "/sharp",
  },
];

export default function Section3dHome() {
  return (
    <section className="mx-auto w-full">
      <div className="relative w-full h-[700px] lg:h-screen">
        <MorphSlider
          items={items}
          transition="melt"
          intensity={0.55}
          aberration={0.35}
          drift={0.4}
          autoplay={false}
          overlayColor="#05060a"
          duration={1.1}
          ease="power2.inOut"
          scale={2.4}
          autoplayDelay={4}
          loop
          radius={16}
          showCaptions={true}
          showControls
          showIndicators
        />
      </div>
    </section>
  );
}

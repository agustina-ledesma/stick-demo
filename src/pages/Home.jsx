import Carousel from "../components/Carousel";
import Timeline from "../components/Timeline";
import HomeTab from "./partials/home-tab";
import { useNavigate } from "react-router-dom";
import StixEmpresas from "../components/StixEmpresas";
import CarruselProfesionales from "./partials/CarruselProfesionales";
import FaqsHome from "./partials/FaqsHome";
import { MomentosDelDia } from "../components/3d/MomentosDelDia";
import Section3dHome from "@/components/section3d";

const items = [
  {
    image:
      "https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=1600&auto=format&fit=crop",
    caption: "One",
  },
  {
    image:
      "https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=1600&auto=format&fit=crop",
    caption: "Two",
  },
  {
    image:
      "https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=1600&auto=format&fit=crop",
    caption: "Three",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <main className="h-screen">
        {/* contenido */}
        <Carousel />
      </main>
      <Section3dHome />
      

      <StixEmpresas />
      <CarruselProfesionales />
      <FaqsHome />
    </>
  );
}

export default Home;

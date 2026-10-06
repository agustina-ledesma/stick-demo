import Carousel from "../components/Carousel";
import Timeline from "../components/Timeline";
import HomeTab from "./partials/home-tab";
import { useNavigate } from "react-router-dom";
import StixEmpresas from "../components/StixEmpresas";
import CarruselProfesionales from "./partials/CarruselProfesionales";
import FaqsHome from "./partials/FaqsHome";
import { MomentosDelDia } from "../components/3d/MomentosDelDia";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <main className="h-screen">
        {/* contenido */}
        <Carousel />
      </main>
      <MomentosDelDia />
      <HomeTab />

      <section>
        <section className="flex h-125  items-center justify-center px-6 text-center text-white">
          <div className="max-w-2xl flex flex-col gap-2 items-center">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[#BB202B]">
              Product roadmap
            </p>

            <h2 className="text-xl font-semibold uppercase">
              Entre el trabajo, el estrés, te cuesta concentrarte, tomás poca
              agua y llegás a la noche con la cabeza todavía prendida
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm text-zinc-400">
              Stix acompaña esos tres momentos. Elegí uno, combiná dos o llevá
              el PROTOCOLO completo.
            </p>
            <button
              type="button"
              onClick={() => navigate("/system")}
              className="mt-2 flex h-12 w-fit items-center justify-center rounded-full bg-[#72000E] font-semibold uppercase text-white px-4 text-sm"
            >
              ELEGIR MI MOMENTO
            </button>
          </div>
        </section>

        <Timeline />
      </section>
      <StixEmpresas />
      <CarruselProfesionales />
      <FaqsHome />
      <section
        className="flex h-175 w-full items-end bg-cover bg-center bg-no-repeat py-12 md:py-16 lg:py-20"
        style={{
          backgroundImage: "url('/images/es-para-vos/footer.png')",
        }}
      >
        <div className="flex flex-col p-8  gap-2 mx-auto m text-center text-white">
          <h2 className="uppercase font-semibold text-2xl md:text-3xl">
            No hace falta cambiar toda tu rutina
          </h2>
          <p className="text-sm uppercase max-w-2xl  mx-auto text-center">
            Empezá con el producto que más sentido tiene para vos y sumá el
            resto cuando lo necesites
          </p>
          <button
            type="button"
            onClick={() => navigate("/subscription")}
            className="mt-6 w-fit mx-auto  rounded-full bg-white text-[#72000E] px-6 py-3 text-sm font-semibold uppercase"
          >
            ver suscripción
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;

import { useNavigate } from "react-router-dom";

export default function StixEmpresas({
  imagenGrande = "/images/home/empresas.jpg",
  imagenChica = "/images/home/hero.png",
}) {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden  px-6 py-20 text-white md:px-10 md:py-24 lg:min-h-[750px] lg:px-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 md:gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* TEXTO */}
        <div className="max-w-md">
          <p className="text-sm font-semibold tracking-wide">
            STIX PARA EMPRESAS
          </p>

          <h2 className="mt-2 text-3xl font-semibold uppercase leading-tight md:text-4xl">
            Llevá Stix a tu equipo
          </h2>

          <p className="mt-4 text-base leading-relaxed text-white/70">
            Si buscás una propuesta de bienestar para tu empresa, equipo o
            evento, podemos ayudarte a armar una opción con los productos de
            Stix.
          </p>

          <button
            type="button"
            onClick={() => navigate("/empresas")}
            className="mt-8 inline-flex h-12 items-center rounded-full bg-[#7a0010] px-6 text-sm font-semibold uppercase"
          >
            Conocé la propuesta
          </button>
        </div>

        {/* COMPOSICIÓN */}
        <div className="relative mx-auto h-[420px] w-full max-w-[800px] md:h-[600px] lg:h-[650px]">
          {/* GLASS DARK — MOBILE Y DESKTOP */}
          <div className="absolute bottom-8 left-1/2 z-0 h-[75%] w-[75%] -translate-x-1/2 rounded-[28px] border border-white/10 bg-black/30 backdrop-blur-md md:bottom-[8%] md:h-[75%] md:w-[75%]" />

          {/* IMAGEN GRANDE */}
          <div className="absolute bottom-0 left-0 z-10 h-[360px] w-full overflow-hidden rounded-2xl md:left-[330px] md:h-[550px] md:w-[calc(100%-330px)]">
            <img
              src={imagenGrande}
              alt="Equipo trabajando"
              className="h-full w-full object-cover"
            />
          </div>

          {/* IMAGEN CHICA — OCULTA EN MOBILE */}
          <div className="absolute bottom-0 left-0 z-10 hidden h-[250px] w-[300px] overflow-hidden rounded-2xl md:block">
            <img
              src={imagenChica}
              alt="Productos Stix"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import { useNavigate } from "react-router-dom";
import SectionLabel from "@/components/SectionLabel";
import GlassPill from "@/components/GlassPill";
import { Zap } from "lucide-react";
import CardsMomentos from "@/components/CardsMomentos";

const horizontalPadding = "px-6 md:px-10 lg:px-12";

export default function EsParaVos() {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO */}
      <section className="w-full">
        <div
          className="relative flex h-screen w-full items-end bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/es-para-vos/hero.png')",
          }}
        >
          <div
            className={`relative z-10 mx-auto w-full max-w-7xl  pb-10 md:pb-12`}
          >
            <div className="max-w-xl">
              <h1 className="text-2xl font-semibold uppercase leading-tight text-white md:text-4xl">
                ¿STIX ES PARA VOS?
              </h1>

              <p className="mt-4 max-w-4xl text-md leading-relaxed text-white">
                Ejecutivos, founders, consultores, deportistas, profesionales
                creativos. Si tu día exige foco agudo y descanso reparador, Stix
                encaja.
              </p>

              <button
                type="button"
                onClick={() => navigate("/oasis")}
                className="mt-6 h-12 rounded-full bg-[#72000E] px-7 text-sm font-semibold uppercase text-white transition hover:bg-[#5d000b]"
              >
                Descubrí system
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section
        className={`flex w-full items-center ${horizontalPadding} py-16 md:py-20`}
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-8 lg:gap-16">
          <div className="w-full text-left lg:max-w-md">
            <SectionLabel text="¿Por qué probar stix?" />

            <h2 className="mt-4 text-2xl leading-tight text-gray-600 lg:text-3xl">
              No siempre te falta voluntad, a veces te falta tiempo
            </h2>

            <p className="mt-4 text-md leading-relaxed text-gray-600">
              Arrancás con la cabeza en mil cosas. Al mediodía ya no te acordás
              de almorzar. A la tarde seguís enganchado con pendientes. A la
              noche estás reventado, pero tu cabeza no para. Stix te da foco
              cuando lo necesitás y descanso cuando corresponde. Dos protocolos.
              Sin complicaciones.
            </p>
          </div>

          <div className="flex w-full items-start justify-end">
            <img
              src="/images/es-para-vos/intro.png"
              alt="stix"
              className="h-auto w-full max-w-[800px] rounded-2xl object-contain"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className={`w-full ${horizontalPadding} py-20`}>
        <div className="flex flex-col gap-4">
          <SectionLabel text="¿qué tiene cada producto?" />

          <h2 className="max-w-xl text-2xl text-gray-600 lg:text-3xl">
            Usá cada fórmula cuando tiene sentido para tu día
          </h2>
        </div>

        <div className="mt-6">
          <CardsMomentos />
        </div>
      </section>

      {/* TU DÍA COMPLETO */}
      <div className="py-8">
        <section
          className={`mx-6 rounded-4xl bg-[#f4f3f2]  md:mx-10 md:py-20 lg:mx-12`}
        >
          <div className={`mx-auto w-full max-w-7xl ${horizontalPadding}`}>
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-10 lg:gap-16">
              <div className="w-full">
                <div className="flex flex-col gap-4">
                  <SectionLabel text="Tu día completo" />

                  <h2 className="max-w-xl text-2xl leading-tight text-gray-600 lg:text-3xl">
                    Sharp de día, Reset de noche
                  </h2>

                  <p className="max-w-3xl text-md text-gray-600">
                    Cada fórmula tiene su momento. No hace falta tomarlos
                    juntos: funcionan por separado y se complementan si usas
                    ambos.
                  </p>

                  <p className="max-w-3xl text-md text-gray-600">
                    Disolvé el contenido de un sobre en agua y tomalo en el
                    momento que corresponda.
                    <br />
                    Revisá siempre la información de cada producto antes de
                    usarlo.
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/ciencia")}
                    className="h-10 w-fit shrink-0 rounded-full bg-[#72000E] px-6 text-xs font-semibold uppercase text-white transition hover:bg-[#5d000b]"
                  >
                    Ver formulas
                  </button>
                </div>
              </div>

              <div className="flex w-full items-start justify-center md:justify-end">
                <article className="mx-auto w-full min-w-0 max-w-[400px]">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100">
                    <video
                      className="h-full w-full object-cover"
                      src="/videos/video-2.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />

                    <div className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3">
                      <GlassPill
                        icon={Zap}
                        text="Como usarlo"
                        defaultOpen={true}
                      />
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

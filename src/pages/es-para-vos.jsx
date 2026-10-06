import { useRef, useState } from "react";
import { Atom, Boxes, UserGroup } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EsParaVos() {
  const navigate = useNavigate();
  return (
    <>
      <main className="min-h-screen bg-[#F4F3F2] flex flex-col gap-4">
        <section className="w-full">
          <div
            className="relative flex h-screen w-full items-end bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/es-para-vos/hero.png')",
            }}
          >
            <div className="relative z-10 w-full max-w-7xl px-6 pb-10 md:px-10 md:pb-12 lg:mx-auto lg:px-0">
              <div className="max-w-xl">
                <h1 className="text-2xl font-semibold uppercase leading-tight text-white md:text-4xl">
                  Cuando el día te pide más de lo que podés darle
                </h1>

                <p className="mt-4 max-w-4xl text-white text-md leading-relaxed">
                  Trabajás, estudiás, entrenás, resolvés pendientes y muchas
                  veces llegás al final del día sin haber podido cuidar tus
                  propios hábitos. <br/> Stix reúne fórmulas simples para acompañar
                  esos momentos concretos: foco, hidratación y descanso.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/oasis")}
                  className="mt-6 h-12 rounded-full bg-[#72000E] px-7 text-sm font-semibold uppercase text-white transition hover:bg-[#5d000b]"
                >
                  Descubrí oasis
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="flex w-full items-center px-6 py-16 md:px-10 md:py-20 lg:min-h-screen lg:px-20 lg:py-20">
          <div className="mx-auto grid w-full max-w-360 grid-cols-1 items-start gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-8 lg:gap-16">
            {/* TEXTO */}
            <div className="w-full lg:max-w-md text-left md:pt-0">
              <h2 className="text-2xl font-semibold uppercase leading-tight text-[#72000E] lg:text-3xl">
                No siempre te falta voluntad, a veces te falta tiempo
              </h2>

              <p className="mt-4 text-md leading-relaxed text-secondary">
                Arrancás la mañana con la cabeza en mil cosas. Al mediodía te
                das cuenta de que casi no tomaste agua. A la tarde todavía te
                queda trabajo. A la noche estás cansado, pero tu cabeza no baja.{" "}
                <br />
                <strong>
                  Stix está pensado para acompañarte cuando sostener todos los
                  hábitos a la vez se vuelve difícil.
                </strong>
              </p>
            </div>

            {/* IMAGEN */}
            <div className="flex w-full items-start justify-end">
              <img
                src="/images/es-para-vos/intro.png"
                alt="stix"
                className="h-auto w-full max-w-[800px] rounded-2xl object-contain"
              />
            </div>
          </div>
        </section>
        <section className="w-full bg-[#F4F3F2] px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-20">
          <div className="mx-auto w-full max-w-7xl">
            {/* CONTENIDO PRINCIPAL */}
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              {/* IZQUIERDA */}
              <div className="w-full">
                <h2 className="max-w-xl text-2xl font-semibold uppercase leading-tight text-[#72000E] lg:text-3xl">
                  Usá cada fórmula cuando tiene sentido para tu día
                </h2>

                {/* CARDS */}
                <div className="mt-8 flex flex-col gap-3 md:mt-10 md:gap-4">
                  {/* SHARP */}
                  <article className="rounded-lg bg-white px-4 py-4 md:px-5 md:py-4">
                    <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-2">
                      <h3 className="text-lg font-bristone font-semibold uppercase leading-none text-[#72000E] md:text-xl">
                        SHARP
                      </h3>

                      <span className="shrink-0 rounded-full bg-[#72000E] px-2.5 py-1 text-[9px] font-medium uppercase leading-none text-white">
                        Mañana
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-[1.45] text-secondary md:text-sm">
                      Tomalo por la mañana, a media mañana o entre 40 y 60
                      minutos antes de una tarea exigente. Evitá usarlo cerca de
                      la noche porque contiene cafeína.
                    </p>
                  </article>

                  {/* HYDRATE */}
                  <article className="rounded-lg bg-white px-4 py-4 md:px-5 md:py-4">
                    <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-2">
                      <h3 className="text-lg font-bristone font-semibold uppercase leading-none text-[#72000E] md:text-xl">
                        HYDRATE
                      </h3>

                      <span className="shrink-0 rounded-full bg-[#72000E] px-2.5 py-1 text-[9px] font-medium uppercase leading-none text-white">
                        Mediodía
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-[1.45] text-secondary md:text-sm">
                      Tomalo durante el día, idealmente con el almuerzo. Evitá
                      usarlo después de las 19:00.
                    </p>
                  </article>

                  {/* RESET */}
                  <article className="rounded-lg bg-white px-4 py-4 md:px-5 md:py-4">
                    <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-2">
                      <h3 className="text-lg font-bristone font-semibold uppercase leading-none text-[#72000E] md:text-xl">
                        RESET
                      </h3>

                      <span className="shrink-0 rounded-full bg-[#72000E] px-2.5 py-1 text-[9px] font-medium uppercase leading-none text-white">
                        Noche
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-[1.45] text-secondary md:text-sm">
                      Se toma unos 40 minutos antes de dormir, para pasar de la
                      actividad al descanso. No hace falta tomarlos juntos: cada
                      uno tiene su momento dentro del día.
                    </p>
                  </article>
                </div>
              </div>

              {/* IMAGEN */}
              <div className="flex w-full items-start justify-center md:justify-end">
                <img
                  src="/images/es-para-vos/stix-jugo.png"
                  alt="Stix"
                  className="h-auto w-full max-w-[430px] rounded-2xl object-cover lg:max-w-[500px]"
                />
              </div>
            </div>

            {/* INFORMACIÓN + CTA */}
            <div className="mt-10 flex flex-col gap-5 rounded-xl bg-white p-6  md:flex-row md:items-center md:justify-between md:px-8 md:py-6 lg:mt-14 lg:px-9">
              <p className="max-w-3xl text-sm leading-relaxed text-secondary md:text-sm">
                Disolvé el contenido de un sobre en agua y tomalo en el momento
                que corresponda.
                <br className="hidden md:block" />
                Revisá siempre la información de cada producto antes de usarlo.
              </p>

              <button
                type="button"
                onClick={() => navigate("/ciencia")}
                className="h-10 shrink-0 rounded-full bg-[#72000E] px-6 text-xs font-semibold uppercase text-white transition hover:bg-[#5d000b]"
              >
                Ver formulas
              </button>
            </div>
          </div>
        </section>
        <section
          className="flex h-[700px] w-full items-end bg-cover bg-center bg-no-repeat py-12 md:py-16 lg:py-20"
          style={{
            backgroundImage: "url('/images/es-para-vos/footer.png')",
          }}
        >
            <div className="flex flex-col p-8 gap-2 mx-auto text-center text-white">
                <h2 className="uppercase font-semibold text-2xl md:text-3xl">Encontrá una forma más simple de acompañar tu día</h2>
                <p className="text-md uppercase font-semibold">Elegí el producto que mejor encaja con tu jornada y empezá por ahí.</p>
                 <button
                  type="button"
                  onClick={() => navigate("/system")}
                  className="mt-6 w-fit mx-auto  rounded-full bg-white text-[#72000E] px-6 py-3 text-sm font-semibold uppercase"
                >
                  Elegir system
                </button>
            </div>
          
        </section>
      </main>
    </>
  );
}

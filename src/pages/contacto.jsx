import { useRef, useState } from "react";
import {
  Atom,
  Boxes,
  UserGroup,
  Mail,
  Check,
  Truck,
  ArrowRight,
  RefreshCw,
  BuildingComplex,
  Headphones,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Contacto() {
  const navigate = useNavigate();
  return (
    <>
      <main className="min-h-screen bg-[#F4F3F2] flex flex-col gap-4">
        <section className="w-full">
          <div
            className="relative flex h-[650px] w-full items-end bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/contacto/hero.png')",
            }}
          >
            <div className="relative z-10 w-full max-w-7xl px-6 pb-10 md:px-10 md:pb-12 lg:mx-auto lg:px-0">
              <div className="mx-auto text-center flex flex-col gap-2">
                <h1 className="text-2xl font-semibold uppercase leading-tight text-white md:text-4xl">
                  ¿Necesitás ayuda para elegir?
                </h1>

                <p className="mt-4 mx-auto text-center max-w-lg text-white text-md leading-relaxed">
                  Si tenés una pregunta sobre los productos, las fórmulas, tu
                  pedido o las opciones de compra, escribinos. Estamos para
                  ayudarte.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("contacto")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="mt-6 w-fit mx-auto rounded-full bg-[#72000E] px-6 py-3 text-sm font-semibold uppercase text-white transition hover:bg-[#5d000b]"
                >
                  contactar a stix
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-[#F4F3F2] px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-20">
          <div className="mx-auto w-full max-w-[1280px]">
            {/* TÍTULO */}
            <div className="mb-10 flex flex-col gap-3">
              <span className="w-fit shrink-0 rounded-full bg-[#F89437] p-2 text-xs font-medium uppercase leading-none text-white">
                <div className="flex gap-2 items-center">
                  <Headphones size={12} strokeWidth={2} />
                  <span>Canal oficial directo</span>
                </div>
              </span>

              <h2 className="max-w-xl text-2xl font-semibold uppercase leading-tight text-[#72000E] lg:text-3xl">
                Contanos qué necesitás
              </h2>

              <p className="max-w-2xl text-sm md:text-lg">
                Estamos para ayudarte con tu consulta. Completá el formulario y
                te respondemos por email.
              </p>
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_1fr] md:gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
              {/* IZQUIERDA — CARDS */}
              <div className="flex w-full flex-col gap-3 md:gap-6">
                {/* CARD */}
                <article className="flex h-[135px] w-full flex-col justify-between rounded-xl bg-white px-4 py-4 md:px-5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#BB202B] text-white"
                    >
                      <Truck size={16} strokeWidth={2} />
                    </button>

                    <h3 className="text-md font-semibold uppercase leading-none text-secondary md:text-xl">
                      Pedidos
                    </h3>
                  </div>

                  <p className="text-sm leading-[1.45] text-secondary">
                    Consultas sobre el estado de tu compra, cambios en la
                    dirección o seguimiento.
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase text-secondary">
                      Seguimiento
                    </span>

                    <button
                      type="button"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400"
                    >
                      <ArrowRight size={14} strokeWidth={4} />
                    </button>
                  </div>
                </article>

                {/* CARD */}
                <article className="flex h-[135px] w-full flex-col justify-between rounded-xl bg-white px-4 py-4 md:px-5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#BB202B] text-white"
                    >
                      <Boxes size={16} strokeWidth={2} />
                    </button>

                    <h3 className="text-md font-semibold uppercase leading-none text-secondary md:text-xl">
                      Productos
                    </h3>
                  </div>

                  <p className="text-sm leading-[1.45] text-secondary">
                    Dudas sobre SHARP, HYDRATE, RESET, las presentaciones o la
                    forma de uso
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase text-secondary">
                      formulación
                    </span>

                    <button
                      type="button"
                      onClick={() => navigate("/ciencia")}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400"
                    >
                      <ArrowRight size={14} strokeWidth={4} />
                    </button>
                  </div>
                </article>

                {/* CARD */}
                <article className="flex h-[135px] w-full flex-col justify-between rounded-xl bg-white px-4 py-4 md:px-5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#BB202B] text-white"
                    >
                      <RefreshCw size={16} strokeWidth={2} />
                    </button>

                    <h3 className="text-md font-semibold uppercase leading-none text-secondary md:text-xl">
                      compra recurrente
                    </h3>
                  </div>

                  <p className="text-sm leading-[1.45] text-secondary">
                    Ayuda para entender, modificar o cancelar tu pedido
                    recurrente.
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase text-secondary">
                      Suscripción
                    </span>

                    <button
                      type="button"
                      onClick={() => navigate("/suscription")}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400"
                    >
                      <ArrowRight size={14} strokeWidth={4} />
                    </button>
                  </div>
                </article>

                {/* CARD */}
                <article className="flex h-[135px] w-full flex-col justify-between rounded-xl bg-white px-4 py-4 md:px-5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#BB202B] text-white"
                    >
                      <BuildingComplex size={16} strokeWidth={2} />
                    </button>

                    <h3 className="text-md font-semibold uppercase leading-none text-secondary md:text-xl">
                      empresas
                    </h3>
                  </div>

                  <p className="text-sm leading-[1.45] text-secondary">
                    Propuestas para equipos, eventos, regalos corporativos y
                    acciones de bienestar.
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase text-secondary">
                      B2B Y BIENESTAR
                    </span>

                    <button
                      type="button"
                      onClick={() => navigate("/empresas")}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400"
                    >
                      <ArrowRight size={14} strokeWidth={4} />
                    </button>
                  </div>
                </article>
              </div>

              {/* DERECHA — FORM */}
              <div
                id="contacto"
                className="flex w-full items-start justify-end"
              >
                <form className="flex h-fit w-full max-w-[650px] flex-col rounded-2xl bg-[#56000F] p-6 md:p-8 lg:p-12">
                  {/* TÍTULO */}
                  <div className="mb-7">
                    <h2 className="text-xl font-semibold uppercase leading-tight text-white md:text-2xl">
                      DEJANOS TU CONSULTA
                    </h2>
                  </div>

                  {/* NOMBRE */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="nombre"
                      className="text-sm font-medium text-white"
                    >
                      Nombre
                    </label>

                    <input
                      id="nombre"
                      type="text"
                      name="nombre"
                      placeholder="Tu nombre"
                      className="h-10 w-full rounded-lg border border-white/10 bg-white px-3 text-xs text-[#1B1D1C] outline-none placeholder:text-black/35 focus:border-white"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="mt-4 flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-white"
                    >
                      Email
                    </label>

                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="tu@email.com"
                        className="h-10 w-full rounded-lg border border-white/10 bg-white px-3 pr-10 text-xs text-[#1B1D1C] outline-none placeholder:text-black/35 focus:border-white"
                      />

                      <Mail
                        size={16}
                        strokeWidth={1.8}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40"
                      />
                    </div>
                  </div>

                  {/* MOTIVO */}
                  <div className="mt-5">
                    <p className="mb-2 py-2 text-sm font-medium text-white">
                      ¿Sobre qué necesitás ayuda?
                    </p>

                    <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                      <label className="group flex cursor-pointer items-center gap-2 text-xs text-white">
                        <input
                          type="checkbox"
                          name="motivo"
                          value="Problemas con mi compra"
                          className="peer sr-only"
                        />
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border border-white/50 bg-transparent transition peer-checked:border-[#72000E] peer-checked:bg-[#72000E]">
                          <Check
                            size={11}
                            strokeWidth={3}
                            className="text-white opacity-0 transition group-has-[:checked]:opacity-100"
                          />
                        </span>
                        Problemas con mi compra
                      </label>

                      <label className="group flex cursor-pointer items-center gap-2 text-xs text-white">
                        <input
                          type="checkbox"
                          name="motivo"
                          value="Devoluciones"
                          className="peer sr-only"
                        />
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border border-white/50 bg-transparent transition peer-checked:border-[#72000E] peer-checked:bg-[#72000E]">
                          <Check
                            size={11}
                            strokeWidth={3}
                            className="text-white opacity-0 transition group-has-[:checked]:opacity-100"
                          />
                        </span>
                        Devoluciones
                      </label>

                      <label className="group flex cursor-pointer items-center gap-2 text-xs text-white">
                        <input
                          type="checkbox"
                          name="motivo"
                          value="Otro"
                          className="peer sr-only"
                        />
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border border-white/50 bg-transparent transition peer-checked:border-[#72000E] peer-checked:bg-[#72000E]">
                          <Check
                            size={11}
                            strokeWidth={3}
                            className="text-white opacity-0 transition group-has-[:checked]:opacity-100"
                          />
                        </span>
                        Otro
                      </label>
                    </div>
                  </div>

                  {/* MENSAJE */}
                  <div className="mt-4 flex flex-1 flex-col gap-1.5">
                    <label
                      htmlFor="mensaje"
                      className="text-sm font-medium text-white"
                    >
                      Mensaje
                    </label>

                    <textarea
                      id="mensaje"
                      name="mensaje"
                      placeholder="Contanos qué necesitás"
                      className="min-h-[120px] flex-1 resize-none rounded-lg border border-white/10 bg-white px-3 py-2.5 text-xs text-[#1B1D1C] outline-none placeholder:text-black/35"
                    />
                  </div>

                  {/* BOTÓN */}
                  <button
                    type="button"
                    className="mt-6 w-fit rounded-full bg-[#72000E] px-6 py-3 text-sm font-semibold uppercase text-white"
                  >
                    enviar consulta
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section
          className="flex h-175 w-full items-end bg-cover bg-center bg-no-repeat py-12 md:py-16 lg:py-20"
          style={{
            backgroundImage: "url('/images/es-para-vos/footer.png')",
          }}
        >
          <div className="flex flex-col pb-8 gap-2 mx-auto m text-center text-white">
            <h2 className="uppercase font-semibold text-2xl md:text-3xl">
              Encontrá Stix en nuestra tienda online
            </h2>
            <p className="text-sm uppercase max-w-2xl  mx-auto text-center">
              Elegí un producto, armá tu System o llevá el PROTOCOLO completo
              desde la tienda online. También podés elegir entre una compra
              única y una compra recurrente.
            </p>
            <button
              type="button"
              onClick={() => navigate("/oasis")}
              className="mt-6 w-fit mx-auto  rounded-full bg-white text-[#72000E] px-6 py-3 text-sm font-semibold uppercase"
            >
              ver oasis
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

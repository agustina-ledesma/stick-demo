import { useState } from "react";
import {
  ArrowRight,
  ChevronUp,
  Check,
  Repeat2,
  Droplet,
  Box,
  Clock3,
  Truck,
  Sun,
  Moon,
  CircleCheck,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Button = ({ children, className = "", ...props }) => (
  <button
    type="button"
    className={`rounded-full bg-[#72000E] px-6 py-3 text-sm font-semibold uppercase text-white transition hover:bg-[#5e0910] ${className}`}
    {...props}
  >
    {children}
  </button>
);

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-lg border border-[#e6e3e1] bg-white/40">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-sm font-bold uppercase text-[#72000E]"
      >
        {question}

        <ChevronUp
          size={16}
          strokeWidth={2}
          className={`shrink-0 transition-transform ${
            open ? "" : "rotate-180"
          }`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 pt-0">
          <p className="text-sm leading-relaxed text-[#6b6866]">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Suscription() {
  const navigate = useNavigate();

  return (
    <>
      <main className="bg-[#F4F3F2]">
        <section className="w-full">
          <div
            className="relative flex h-[650px] w-full items-end bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/suscripcion/hero.png')",
            }}
          >
            <div className="relative z-10 w-full max-w-7xl px-6 pb-10 md:px-10 md:pb-12 lg:mx-auto lg:px-0">
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-2xl font-semibold uppercase leading-tight text-white md:text-4xl">
                  Tu fórmula, siempre a tiempo
                </h1>

                <p className="mt-4 max-w-2xl text-white text-md leading-relaxed">
                  Elegí qué querés recibir, cada cuánto y dejá que Stix se
                  encargue del resto. Una compra recurrente pensada para
                  acompañar tu rutina, sin complicaciones.
                </p>

               
              </div>
            </div>
          </div>
        </section>
        <section className="mx-[20px] md:mx-[40px] lg:mx-[80px]">
          <div className="bg-[#f4f2f1] font-sans text-[#6b6866] antialiased">
            {/* QUÉ ES */}
            <section className="mx-auto grid w-[calc(100%-40px)] gap-10 py-16 md:w-[calc(100%-80px)] md:grid-cols-2 md:items-stretch md:py-20">
              <div className="flex h-full max-w-md flex-col">
                <h2 className="text-2xl font-semibold uppercase tracking-tight text-[#72000E] md:text-[28px]">
                  Una compra recurrente
                  <br />
                  no una membresía
                </h2>

                <p className="mt-5 text-sm leading-relaxed">
                  La suscripción es una forma simple de repetir una compra.
                  Elegís qué querés recibir, en qué presentación y con qué
                  frecuencia. Después, el mismo pedido se genera de manera
                  automática.
                </p>

                <p className="mt-4 text-sm leading-relaxed">
                  No es un club, no tiene beneficios escondidos y no necesitás
                  pagar una cuota para pertenecer. Es tu compra de siempre,
                  programada para que no tengas que acordarte cada vez.
                </p>
              </div>

              {/* BENEFICIOS */}
              <div className="h-full rounded-2xl bg-white p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#72000E] text-white">
                    <Check size={14} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-[#2a2a2a]">
                      Cero cuotas ocultas
                    </p>
                    <p className="mt-1 text-xs">
                      Sólo abonás el valor exacto de las fórmulas que recibís.
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex items-start gap-4">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#72000E] text-white">
                    <Repeat2 size={14} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-[#2a2a2a]">
                      Autonomía absoluta
                    </p>
                    <p className="mt-1 text-xs">
                      Modificás fechas, pausás o cancelás desde tu panel en
                      segundos.
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex items-start gap-4">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#72000E] text-white">
                    <ShieldCheck size={14} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-[#2a2a2a]">
                      Garantía de stock
                    </p>
                    <p className="mt-1 text-xs">
                      Tu lote mensual queda reservado.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mx-auto flex h-fit w-[calc(100%-40px)] flex-col items-center pb-16 md:w-[calc(100%-80px)] md:pb-20">
              <h2 className="text-2xl font-semibold uppercase tracking-tight text-[#72000E] md:text-[28px]">
                Lo elegís una vez, después llega solo
              </h2>

              <div className="mt-8 grid w-full gap-4 sm:grid-cols-2 md:mt-10 lg:flex lg:justify-between">
                {/* PASO 1 */}
                <div className="flex h-[300px] w-full flex-col rounded-xl bg-white p-6 lg:flex-1">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#C94D55] text-white">
                    <Box size={14} />
                  </div>

                  <div className="mt-auto">
                    <div className="h-[58px]">
                      <p className="text-sm font-bold uppercase leading-snug text-[#2a2a2a]">
                        Elegí el producto, System o Protocolo que querés
                        recibir.
                      </p>
                    </div>

                    <div className="mt-4 h-[16px]">
                      <p className="flex items-center justify-between text-[10px] font-semibold uppercase leading-none text-[#2a2a2a]">
                        Selección de fórmula
                        <ArrowRight size={13} />
                      </p>
                    </div>
                  </div>
                </div>

                {/* PASO 2 */}
                <div className="flex h-[300px] w-full flex-col rounded-xl bg-white p-6 lg:flex-1">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#C94D55] text-white">
                    <Clock3 size={14} />
                  </div>

                  <div className="mt-auto">
                    <div className="h-[58px]">
                      <p className="text-sm font-bold uppercase leading-snug text-[#2a2a2a]">
                        Seleccioná la caja y la frecuencia de entrega.
                      </p>
                    </div>

                    <div className="mt-4 h-[16px]">
                      <p className="flex items-center justify-between text-[10px] font-semibold uppercase leading-none text-[#2a2a2a]">
                        Intervalo de reposición
                        <ArrowRight size={13} />
                      </p>
                    </div>
                  </div>
                </div>

                {/* PASO 3 */}
                <div className="flex h-[300px] w-full flex-col rounded-xl bg-white p-6 lg:flex-1">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#C94D55] text-white">
                    <CircleCheck size={14} />
                  </div>

                  <div className="mt-auto">
                    <div className="h-[58px]">
                      <p className="text-sm font-bold uppercase leading-snug text-[#2a2a2a]">
                        Revisá tu pedido y confirmá tu compra.
                      </p>
                    </div>

                    <div className="mt-4 h-[16px]">
                      <p className="flex items-center justify-between text-[10px] font-semibold uppercase leading-none text-[#2a2a2a]">
                        Activación segura
                        <ArrowRight size={13} />
                      </p>
                    </div>
                  </div>
                </div>

                {/* PASO 4 */}
                <div className="flex h-[300px] w-full flex-col rounded-xl bg-white p-6 lg:flex-1">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#C94D55] text-white">
                    <Truck size={14} />
                  </div>

                  <div className="mt-auto">
                    <div className="h-[58px]">
                      <p className="text-sm font-bold uppercase leading-snug text-[#2a2a2a]">
                        Recibí el mismo pedido según la frecuencia elegida.
                      </p>
                    </div>

                    <div className="mt-4 h-[16px]">
                      <p className="flex items-center justify-between text-[10px] font-semibold uppercase leading-none text-[#2a2a2a]">
                        Entrega recurrente
                        <ArrowRight size={13} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLEXIBLE */}
              <div className="mt-6 flex w-full flex-col gap-3 items-start justify-between rounded-xl bg-white p-5 sm:flex-row sm:items-center md:p-6">
                <div>
                  <span className="inline-block rounded-full bg-[#F89437] px-2 py-1 text-sm font-semibold uppercase leading-none text-white">
                    Flexible
                  </span>

                  <p className="mt-3 max-w-xl text-sm text-[#2a2a2a]">
                    Podés cambiar la frecuencia, modificar tu pedido o cancelar
                    la compra recurrente cuando lo necesites, según las
                    condiciones de tu cuenta.
                  </p>
                </div>

                <Button
                  onClick={() => navigate("/system")}
                  className="shrink-0"
                >
                  Elegir mi momento
                </Button>
              </div>
            </section>

            {/* PRODUCTOS */}
            <section className="mx-auto w-[calc(100%-40px)] pb-20 md:w-[calc(100%-80px)] md:pb-24">
              <h2 className="text-2xl font-semibold uppercase tracking-tight text-[#72000E] md:text-[28px]">
                Qué podés recibir
              </h2>

              <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3">
                {/* SHARP */}
                <Link
                  to="/product/sharp"
                  className="group flex min-h-[130px] flex-col justify-between rounded-xl bg-white p-5 md:p-6"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold font-bristone text-[#72000E]">
                        SHARP
                      </span>

                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#72000E] text-white">
                        <Sun size={14} />
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-medium uppercase text-[#2a2a2a]">
                      Para repetir tu fórmula de foco.
                    </p>
                  </div>

                  <p className="mt-5 flex items-center justify-between text-xs font-bold uppercase text-[#72000E]">
                    Matutino
                    <span className="grid h-8 w-8 place-items-center rounded-full text-[#72000E]">
                      <ArrowRight size={14} />
                    </span>
                  </p>
                </Link>

                {/* HYDRATE */}
                <Link
                  to="/product/hydrate"
                  className="group flex min-h-[130px] flex-col justify-between rounded-xl bg-white p-5 md:p-6"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold font-bristone text-[#72000E]">
                        HYDRATE
                      </span>

                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#72000E] text-white">
                        <Droplet size={14} />
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-medium uppercase text-[#2a2a2a]">
                      Para mantener tu fórmula de hidratación en casa.
                    </p>
                  </div>

                  <p className="mt-5 flex items-center justify-between text-xs font-bold uppercase text-[#72000E]">
                    Diurno continuo
                    <span className="grid h-8 w-8 place-items-center rounded-full text-[#72000E]">
                      <ArrowRight size={14} />
                    </span>
                  </p>
                </Link>

                {/* RESET */}
                <Link
                  to="/product/reset"
                  className="group flex min-h-[130px] flex-col justify-between rounded-xl bg-white p-5  md:p-6"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-extrabold font-bristone text-[#72000E]">
                        RESET
                      </span>

                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#72000E] text-white">
                        <Moon size={14} />
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-medium uppercase text-[#2a2a2a]">
                      Para tener siempre a mano tu fórmula de descanso.
                    </p>
                  </div>

                  <p className="mt-5 flex items-center justify-between text-xs font-bold uppercase text-[#72000E]">
                    Nocturno
                    <span className="grid h-8 w-8 place-items-center rounded-full text-[#72000E]">
                      <ArrowRight size={14} />
                    </span>
                  </p>
                </Link>

                {/* SYSTEM */}
                <Link
                  to="/system"
                  className="group flex min-h-[130px] flex-col justify-between rounded-xl bg-white p-5 md:p-6"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold font-bristone text-[#72000E]">
                        SYSTEM
                      </span>
                    </div>

                    <p className="mt-3 text-xs font-medium uppercase text-[#2a2a2a]">
                      Elegí cualquiera de los dos productos.
                    </p>
                  </div>

                  <p className="mt-5 flex items-center justify-between text-xs font-bold uppercase text-[#72000E]">
                    Doble acción
                    <span className="grid h-8 w-8 place-items-center rounded-full text-[#72000E]">
                      <ArrowRight size={14} />
                    </span>
                  </p>
                </Link>

                {/* OASIS */}
                <Link
                  to="/oasis"
                  className="group flex min-h-[130px] flex-col justify-between rounded-xl bg-[#72000E] p-5 text-white md:col-span-2 md:p-6"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-semibold font-bristone">
                        OASIS
                      </span>

                      <span className="rounded-full bg-[#F89437] px-2 py-1 text-sm font-semibold uppercase leading-none text-white">
                        Integral
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-medium uppercase">
                      Llevá SHARP, HYDRATE y RESET en una misma compra
                      recurrente.
                    </p>
                  </div>

                  <p className="mt-5 flex text-xs items-center justify-between text- font-bold uppercase">
                    Ciclo biológico completo 24hs.
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#72000E]">
                      <ArrowRight size={14} />
                    </span>
                  </p>
                </Link>
              </div>
            </section>
          </div>

          {/* BANNER */}
          <section className="w-full px-5 py-16 md:px-10 md:py-20">
            <div
              className="mx-auto grid w-full items-center gap-8 overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat p-6 md:grid-cols-2 md:p-14"
              style={{
                backgroundImage: "url('/images/suscripcion/banner.png')",
              }}
            >
              <div className="max-w-md text-white">
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-md">
                  Suscripción
                </span>

                <h3 className="mt-3 text-xl font-extrabold uppercase leading-tight md:text-2xl">
                  Para cuando ya encontraste tu combinación.
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-white/85">
                  Si ya sabés qué producto usás y cada cuánto lo necesitás, la
                  compra recurrente te ayuda a mantenerlo en tu rutina sin
                  volver a empezar el proceso todos los meses.
                </p>

                <Button
                  className="mt-6 px-4 py-2 text-sm"
                  onClick={() => navigate("/system")}
                >
                  Elegir mi frecuencia
                </Button>
              </div>
            </div>
          </section>
        </section>

        {/* FAQ */}
        <section
          className="bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/faqs/bg-faqs.png')",
          }}
        >
          <div className="mx-[20px] md:mx-[40px] lg:mx-[80px]">
            <div className="mx-auto grid w-[calc(100%-40px)] gap-10 py-16 md:w-[calc(100%-80px)] md:grid-cols-[1fr_1.6fr] md:py-20">
              <div>
                <h2 className="text-lg font-semibold uppercase tracking-tight text-[#72000E] md:text-2xl md:text-[28px]">
                  Preguntas frecuentes
                </h2>

                <p className="mt-4 max-w-xs text-md leading-relaxed">
                  Resolvemos las dudas más comunes sobre cómo comprar,
                  suscribirte y recibir Stix.
                </p>
              </div>

              <div className="space-y-4">
                <FaqItem
                  question="¿Puedo hacer una compra única?"
                  answer="Sí. La compra recurrente es opcional. También podés comprar una caja por única vez."
                />

                <FaqItem
                  question="¿Puedo suscribirme a un System o al Protocolo?"
                  answer="Sí. Podés repetir una compra individual, cualquier combinación de dos de los productos o el PROTOCOLO completo."
                />

                <FaqItem
                  question="¿La suscripción es una membresía?"
                  answer="No. Es una compra recurrente: el pedido se repite con la frecuencia que elegís."
                />

                <FaqItem
                  question="¿Puedo modificar o cancelar?"
                  answer="Sí. Podés gestionar tu frecuencia y tu pedido desde tu cuenta, según las condiciones informadas al momento de comprar."
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

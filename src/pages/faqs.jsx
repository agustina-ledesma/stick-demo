import { Atom, Boxes, UserGroup, Headphones , Compass , Truck , Repeat, BadgeCheck, ClipboardCheck, ListCheck , TriangleAlert} from "lucide-react";
import StixFaq from "./partials/StixFaq";
import { useNavigate } from "react-router-dom";

export default function Faqs() {
  const navigate = useNavigate();

  const navItems = [
    { id: "logistica", label: "logistica", icon: Truck },
    { id: "tracking", label: "tracking", icon: Compass },
    { id: "gestion", label: "gestion", icon: Repeat },
    { id: "asistencia", label: "asistencia", icon: BadgeCheck },
    { id: "devoluciones", label: "devoluciones", icon: ClipboardCheck },
    { id: "nosotros", label: "nosotros", icon: UserGroup },
    { id: "usos", label: "usos", icon: ListCheck },
    { id: "productos", label: "productos", icon: Boxes },
    { id: "precauciones", label: "precauciones", icon: TriangleAlert },
  ];

  const cards = [
    {
      id: "logistica",
      title: "Recibí tu pedido donde estés",
      description:
        "El costo y el plazo de entrega se calculan según la dirección de envío y se muestran antes de confirmar la compra. Revisá que los datos estén completos para evitar demoras.",
    },
    {
      id: "tracking",
      title: "Seguí el estado de tu pedido",
      description:
        "Cuando el pedido sea despachado, vas a recibir la información de seguimiento disponible para consultar su recorrido. Si necesitás actualizar un dato de entrega, escribinos lo antes posible con tu número de pedido.",
    },
    {
      id: "gestion",
      title: "Si necesitás cambiar algo de tu pedido",
      description:
        "Si detectás un error en los datos de entrega o necesitás consultar un cambio, contactanos con tu número de pedido y te indicamos los pasos a seguir. Los cambios quedan sujetos al estado del pedido y a las condiciones informadas al momento de la compra.",
    },
    {
      id: "asistencia",
      title: "Si tu pedido llegó con un problema.",
      description:
        "Escribinos dentro de las 48 horas de recibido el pedido e incluí tu número de compra y fotos del producto o del embalaje. Así podemos revisar el caso y darte una respuesta.",
    },
    {
      id: "devoluciones",
      title: "Consultá antes de enviar el producto",
      description:
        "Si querés solicitar una devolución, contactanos antes de despachar el producto. Te vamos a indicar si el caso aplica y cómo continuar según las condiciones de la compra.No envíes el pedido por tu cuenta sin recibir primero las instrucciones de nuestro equipo.",
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-[#F4F3F2]">
        {/* HERO */}
        <section>
          <div
            className="relative flex h-[650px] w-full items-end bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/faqs/hero.png')",
            }}
          >
            <div className="relative z-10 w-full px-4 lg:px-20 pb-14">
              <div className="flex max-w-xl flex-col gap-2 text-left">
                <h1 className="text-2xl font-semibold uppercase leading-tight text-white md:text-4xl">
                  Todo lo que querés saber antes de elegir
                </h1>

                <p className="mt-4 max-w-2xl text-left text-md leading-relaxed text-white">
                  Encontrá respuestas rápidas sobre los productos, las fórmulas,
                  la forma de uso y las opciones de compra de Stix.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NAV STICKY */}
        <div className="sticky top-[72px] z-40  py-4">
          <nav className="mx-auto w-full max-w-7xl px-4 lg:px-0">
            <div
              className="flex w-full items-center justify-start gap-1.5 overflow-x-auto pb-1 lg:flex-wrap lg:justify-center lg:overflow-visible"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {navItems.map(({ id, label, icon: Icon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#72000E] px-3 py-1.5 text-[10px] font-semibold uppercase text-white transition hover:bg-[#5d000b]"
                >
                  <Icon size={13} strokeWidth={1.8} />
                  {label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 py-20 pb-20 lg:px-0">
          {/* ROW 1 — 2 CARDS */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {cards.slice(0, 2).map(({ id, title, description }) => (
              <article
                key={id}
                id={id}
                className="flex h-[225px] flex-col justify-between rounded-2xl bg-white p-7"
              >
                <div>
                  <span className="inline-flex rounded-full bg-[#F89437] px-3 py-1 text-[11px] font-semibold uppercase text-white">
                    {navItems.find((item) => item.id === id)?.label}
                  </span>

                  <h3 className="mt-5 text-lg font-semibold uppercase text-[#72000E]">
                    {title}
                  </h3>

                  <p className="mt-2 text-md leading-relaxed text-gray-500">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* ROW 2 — 3 CARDS */}
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
            {cards.slice(2, 5).map(({ id, title, description }) => (
              <article
                key={id}
                id={id}
                className="flex h-[420px] flex-col rounded-2xl bg-white p-7"
              >
                <div>
                  <span className="inline-flex rounded-full bg-[#F89437] px-3 py-1 text-[11px] font-semibold uppercase text-white">
                    {navItems.find((item) => item.id === id)?.label}
                  </span>

                  <h2 className="my-5 text-lg font-semibold uppercase text-[#72000E]">
                    {title}
                  </h2>

                  <div className="mt-2 flex flex-col gap-2 text-md leading-relaxed text-gray-500">
                    {description
                      .split(".")
                      .map(
                        (text, index) =>
                          text.trim() && (
                            <span key={index}>{text.trim()}.</span>
                          ),
                      )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="bg-[#F4F3F2]">
          <StixFaq />
        </div>
      </main>
      <div className="px-6 py-4 md:p-10 lg:p-20">
        <div className="relative w-full overflow-hidden rounded-2xl">
          <img
            src="/images/faqs/banner.png"
            alt=""
            className="block h-auto w-full"
          />

          <div className="absolute inset-0 flex items-center px-8 py-10 md:px-12 lg:px-16">
            <div className="max-w-xl text-white">
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#72000E] px-3 py-1.5 text-[11px] font-semibold uppercase leading-none text-white">
                <Headphones size={13} strokeWidth={2} />
                Soporte directo
              </div>

              <h2 className="text-2xl font-semibold uppercase leading-tight md:text-3xl">
                ¿No encontraste lo que buscabas?
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base">
                Escribinos y te ayudamos a encontrar la información que
                necesitás.
              </p>

              <button
                type="button"
                onClick={() => navigate("/contacto")}
                className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase text-[#72000E] transition hover:bg-white/90"
              >
                Contactar a Stix
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useId } from "react";

/* ---------- Contenido ---------- */
const FEATURES = [
  { icon: "check", title: "Cero cuotas ocultas", text: "Sólo abonás el valor exacto de las fórmulas que recibís." },
  { icon: "repeat", title: "Autonomía absoluta", text: "Modificás fechas, pausás o cancelás desde tu panel en segundos." },
  { icon: "drop", title: "Garantía de stock", text: "Tu lote mensual queda reservado." },
];

const STEPS = [
  { icon: "box", text: "Elegí el producto, System o Protocolo que querés recibir.", label: "Selección de fórmula" },
  { icon: "clock", text: "Seleccioná la caja y la frecuencia de entrega", label: "Intervalo de reposición" },
  { icon: "check", text: "Revisá tu pedido y confirmá tu compra", label: "Activación segura" },
  { icon: "truck", text: "Recibí el mismo pedido según la frecuencia elegida", label: "Entrega recurrente" },
];

const PRODUCTS = [
  { name: "SHARP", text: "Para repetir tu fórmula de foco.", label: "Matutino" },
  { name: "HYDRATE", text: "Para mantener tu fórmula de hidratación en casa.", label: "Diurno continuo" },
  { name: "RESET", text: "Para tener siempre a mano tu fórmula de descanso.", label: "Nocturno" },
];

const FAQS = [
  { q: "¿Puedo hacer una compra única?", a: "Sí. La compra recurrente es opcional. También podés comprar una caja por única vez." },
  { q: "¿Puedo suscribirme a un System o al Protocolo?", a: "Sí. Podés repetir una compra individual, cualquier combinación de dos de los productos o el PROTOCOLO completo." },
  { q: "¿La suscripción es una membresía?", a: "No. Es una compra recurrente: el pedido se repite con la frecuencia que elegís." },
  { q: "¿Puedo modificar o cancelar?", a: "Sí. Podés gestionar tu frecuencia y tu pedido desde tu cuenta, según las condiciones informadas al momento de comprar." },
];

const FOOTER_COLS = [
  ["Empresas", "Suscripción", "Dónde comprar"],
  ["Preguntas frecuentes", "Contacto", "Envíos y devoluciones"],
];

/* ---------- Íconos ---------- */
const PATHS = {
  check: <path d="M5 12l4 4 10-10" />,
  repeat: <path d="M17 2l4 4-4 4M3 11V9a3 3 0 013-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 01-3 3H3" />,
  drop: <path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" />,
  box: <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 9l8-4.5M12 12v9M12 12L4 7.5" />,
  clock: <path d="M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z" />,
  truck: <path d="M2 6h11v10H2zM13 9h4l3 3v4h-7M6 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />,
};

const Icon = ({ name, className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {PATHS[name]}
  </svg>
);

const Arrow = ({ className = "h-3.5 w-3.5" }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const IconBubble = ({ name }) => (
  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-wine text-white">
    <Icon name={name} className="h-4 w-4" />
  </span>
);

const Badge = ({ children }) => (
  <span className="inline-block rounded-full bg-[#f28c28] px-2 py-1 text-[10px] font-medium uppercase leading-none text-white">
    {children}
  </span>
);

/* ---------- UI base ---------- */
const H2 = ({ children, className = "" }) => (
  <h2 className={`text-2xl font-extrabold uppercase tracking-tight text-wine md:text-[28px] ${className}`}>{children}</h2>
);

const Button = ({ children, className = "", ...props }) => (
  <button
    type="button"
    className={`rounded-full bg-wine px-6 py-3 text-xs font-semibold uppercase text-white transition hover:bg-[#5e0910] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine ${className}`}
    {...props}
  >
    {children}
  </button>
);

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(true);
  const id = useId();
  return (
    <div className="rounded-lg border border-[#e6e3e1] bg-white/40">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 px-5 pt-5 text-left text-sm font-bold uppercase text-wine focus-visible:outline focus-visible:outline-2 focus-visible:outline-wine"
        >
          {q}
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? "" : "rotate-180"}`} aria-hidden="true">
            <path d="M3 10l5-5 5 5" />
          </svg>
        </button>
      </h3>
      <div id={id} className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 pt-3 text-sm leading-relaxed text-[#6b6866]">{a}</p>
        </div>
      </div>
      {!open && <div className="h-5" />}
    </div>
  );
}

/* ---------- Página ---------- */
export default function StixRecurrente({
  heroImage = "/images/hero-stix.jpg",
  bannerImage = "/images/stix-latas.png",
}) {
  return (
    <div className="font-sans text-[#6b6866] antialiased [--color-wine:#7a0c14]">
      {/* Tailwind v3: agregá  colors: { wine: "#7a0c14" }  en tailwind.config.js
          Tailwind v4: agregá  @theme { --color-wine: #7a0c14; }  en tu CSS */}

      {/* HERO */}
      <section className="relative isolate flex min-h-[460px] items-center justify-center overflow-hidden bg-[#1a0507] px-6 py-24 text-center text-white">
        <img src={heroImage} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-black/45" />
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-[34px]">
            Cuando el día te pide más de lo que podés darle
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90">
            Trabajás, estudiás, entrenás, resolvés pendientes y muchas veces llegás al final del día sin haber podido
            cuidar tus propios hábitos. Stix reúne fórmulas simples para acompañar esos momentos concretos: foco,
            hidratación y descanso.
          </p>
          <Button className="mt-8">Ver productos</Button>
        </div>
      </section>

      <div className="bg-[#f4f2f1]">
        {/* QUÉ ES */}
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div className="max-w-sm">
            <H2>
              Una compra recurrente
              <br />
              no una membresía
            </H2>
            <p className="mt-5 text-sm leading-relaxed">
              La suscripción es una forma simple de repetir una compra. Elegís qué querés recibir, en qué presentación
              y con qué frecuencia. Después, el mismo pedido se genera de manera automática.
            </p>
            <p className="mt-4 text-sm leading-relaxed">
              No es un club, no tiene beneficios escondidos y no necesitás pagar una cuota para pertenecer. Es tu compra
              de siempre, programada para que no tengas que acordarte cada vez.
            </p>
          </div>

          <ul className="space-y-7 rounded-2xl bg-white p-8 shadow-sm">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex items-start gap-4">
                <IconBubble name={f.icon} />
                <div>
                  <p className="text-xs font-bold uppercase text-[#2a2a2a]">{f.title}</p>
                  <p className="mt-1 text-xs">{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* PASOS */}
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <H2>Lo elegís una vez, después llega solo</H2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.label} className="flex min-h-[200px] flex-col justify-between rounded-xl bg-white p-6 shadow-sm">
                <IconBubble name={s.icon} />
                <div>
                  <p className="text-sm font-bold uppercase leading-snug text-[#2a2a2a]">{s.text}</p>
                  <p className="mt-5 flex items-center justify-between text-[10px] font-semibold uppercase text-[#2a2a2a]">
                    {s.label} <Arrow className="h-3 w-3" />
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-xl border border-[#d9d5d2] p-6 sm:flex-row sm:items-center">
            <div>
              <Badge>Flexible</Badge>
              <p className="mt-3 max-w-md text-sm text-[#2a2a2a]">
                Podés cambiar la frecuencia, modificar tu pedido o cancelar la compra recurrente cuando lo necesites,
                según las condiciones de tu cuenta.
              </p>
            </div>
            <Button className="shrink-0">Elegir mi momento</Button>
          </div>
        </section>

        {/* PRODUCTOS */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <H2>Qué podés recibir</H2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.name} {...p} />
            ))}
            <ProductCard name="SYSTEM" text="Elegí cualquiera de los dos productos." label="Doble acción" />
            <a
              href="#oasis"
              className="group flex min-h-[130px] flex-col justify-between rounded-xl bg-wine p-6 text-white md:col-span-2"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-extrabold tracking-[0.12em]">OASIS</span>
                  <Badge>Integral</Badge>
                </div>
                <p className="mt-3 text-xs font-medium uppercase">
                  Llevá SHARP, HYDRATE y RESET en una misma compra recurrente.
                </p>
              </div>
              <p className="mt-5 flex items-center justify-between text-xs font-bold uppercase">
                Ciclo biológico completo 24hs.
                <span className="grid h-6 w-6 place-items-center rounded-full border border-white/70 transition group-hover:bg-white group-hover:text-wine">
                  <Arrow className="h-3 w-3" />
                </span>
              </p>
            </a>
          </div>
        </section>
      </div>

      {/* BANNER OSCURO */}
      <section className="bg-[#141414] px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#6d0a12] via-[#3a0509] to-[#160405] p-8 md:grid-cols-2 md:p-14">
          <div className="max-w-md text-white">
            <p className="text-[10px] uppercase">Suscripción</p>
            <h2 className="mt-3 text-xl font-extrabold uppercase leading-tight md:text-2xl">
              Para cuando ya encontraste tu combinación.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/85">
              Si ya sabés qué producto usás y cada cuánto lo necesitás, la compra recurrente te ayuda a mantenerlo en
              tu rutina sin volver a empezar el proceso todos los meses.
            </p>
            <Button className="mt-6 px-4 py-2 text-[10px]">Elegir mi frecuencia</Button>
          </div>
          <img src={bannerImage} alt="Latas y sobres de Stix" className="mx-auto w-full max-w-md object-contain" loading="lazy" />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f4f2f1]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1fr_1.6fr]">
          <div>
            <H2>Preguntas frecuentes</H2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Resolvemos las dudas más comunes sobre cómo comprar, suscribirte y recibir Stix.
            </p>
          </div>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#141414] px-6 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-2xl font-bold tracking-[0.35em]">STIX</p>
            <p className="mt-5 max-w-[240px] text-[10px] uppercase leading-relaxed text-white/80">
              No suplementa dietas insuficientes. Consulte con su médico y/o farmacéutico
            </p>
          </div>
          {FOOTER_COLS.map((col, i) => (
            <ul key={i} className="space-y-3 text-xs uppercase text-white/80">
              {col.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white">{l}</a>
                </li>
              ))}
            </ul>
          ))}
          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="flex gap-3 text-white/90" aria-label="Redes sociales">
              {["Instagram", "Facebook", "TikTok"].map((n) => (
                <a key={n} href="#" aria-label={n} className="grid h-5 w-5 place-items-center rounded-full border border-white/60 text-[9px]">
                  {n[0]}
                </a>
              ))}
            </div>
            <a href="#" className="rounded-full bg-wine px-4 py-2 text-[10px] font-semibold uppercase">CTA nuevo</a>
          </div>
        </div>

        <div className="mx-auto mt-14 flex max-w-6xl flex-col justify-between gap-3 text-[10px] text-white/70 sm:flex-row">
          <p>© STIX Protocol. Todos los derechos reservados</p>
          <div className="flex gap-6">
            <a href="#">Términos y condiciones</a>
            <a href="#">Política de privacidad</a>
            <a href="#">Política de cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ name, text, label }) {
  return (
    <a href="#" className="group flex min-h-[130px] flex-col justify-between rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-extrabold tracking-[0.12em] text-wine">{name}</span>
          <span className="grid h-4 w-4 place-items-center rounded-full bg-wine text-white">
            <Icon name="drop" className="h-2.5 w-2.5" />
          </span>
        </div>
        <p className="mt-3 text-xs font-medium uppercase text-[#2a2a2a]">{text}</p>
      </div>
      <p className="mt-5 flex items-center justify-between text-xs font-bold uppercase text-wine">
        {label} <Arrow />
      </p>
    </a>
  );
}

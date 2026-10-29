import { Clock, Mail, MapPin } from "lucide-react";

const tiposNegocio = [
  "Farmacia premium",
  "Tienda de nutrición / wellness",
  "Gimnasio / box",
  "Café specialty / bistró",
  "Coworking",
  "Hotel",
  "E-commerce",
  "Otro",
];

const opciones = {
  cantidadLocales: ["1", "2–5", "6–20", "+20", "Solo online"],
  volumenPedido: [
    "Prueba inicial (hasta 50 cajas)",
    "Pedido medio (50–150 cajas)",
    "Volumen grande (+150 cajas)",
    "Todavía no sé",
  ],
  productosSimilares: [
    "Sí, varias marcas",
    "Sí, alguna marca",
    "No, sería primera vez en esta categoría",
  ],
};

function OpcionesRadio({
  titulo,
  name,
  opciones,
  columns = 1,
  compact = false,
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="text-sm font-medium leading-tight text-[#1B1D1C]">
        {titulo}
      </legend>

      <div
        className={`mt-2 grid gap-1.5 ${
          columns === 2 ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {opciones.map((opcion) => (
          <label
            key={opcion}
            className={`flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-[#fcfbfb] text-sm leading-tight text-[#1B1D1C] transition hover:border-[#72000E] has-[:checked]:border-[#72000E] has-[:checked]:bg-[#72000E]/5 ${
              compact
                ? "min-h-8 justify-center px-2 py-1.5 text-center"
                : "min-h-8 px-2.5 py-1.5"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opcion}
              required
              className="h-3.5 w-3.5 shrink-0 accent-[#72000E]"
            />

            <span className={compact ? "text-xs leading-tight" : ""}>
              {opcion}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function FormPuntosVenta() {
  return (
    <form className="mx-auto my-4 w-full max-w-8xl rounded-2xl bg-white p-3 md:p-4 lg:p-5">
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 lg:gap-5">
        {/* COLUMNA 1 — CAMPOS DE TEXTO */}
        <div className="flex min-w-0 flex-col gap-3 lg:h-full">
          {/* NOMBRE */}
          <div className="flex flex-col gap-0.5">
            <label
              htmlFor="pv-nombre"
              className="text-sm font-medium text-[#1B1D1C]"
            >
              Nombre
            </label>
            <input
              id="pv-nombre"
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              autoComplete="name"
              required
              className="h-9 w-full rounded-lg border border-gray-200 bg-[#fcfbfb] px-3 text-sm text-[#1B1D1C] outline-none placeholder:text-gray-400 focus:border-gray-300"
            />
          </div>

          {/* NEGOCIO / MARCA */}
          <div className="flex flex-col gap-0.5">
            <label
              htmlFor="pv-negocio"
              className="text-sm font-medium text-[#1B1D1C]"
            >
              Negocio / Marca
            </label>
            <input
              id="pv-negocio"
              type="text"
              name="negocio"
              placeholder="Nombre de tu negocio"
              autoComplete="organization"
              required
              className="h-9 w-full rounded-lg border border-gray-200 bg-[#fcfbfb] px-3 text-sm text-[#1B1D1C] outline-none placeholder:text-gray-400 focus:border-gray-300"
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-0.5">
            <label
              htmlFor="pv-email"
              className="text-sm font-medium text-[#1B1D1C]"
            >
              Email corporativo
            </label>
            <div className="relative">
              <input
                id="pv-email"
                type="email"
                name="email"
                placeholder="tu@empresa.com"
                autoComplete="email"
                required
                className="h-9 w-full rounded-lg border border-gray-200 bg-[#fcfbfb] px-3 pr-9 text-sm text-[#1B1D1C] outline-none placeholder:text-gray-400 focus:border-gray-300"
              />
              <Mail
                size={16}
                strokeWidth={1.8}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {/* WHATSAPP */}
          <div className="flex flex-col gap-0.5">
            <label
              htmlFor="pv-whatsapp"
              className="text-sm font-medium text-[#1B1D1C]"
            >
              WhatsApp <span className="text-gray-400">(opcional)</span>
            </label>
            <input
              id="pv-whatsapp"
              type="tel"
              name="whatsapp"
              placeholder="Tu número de contacto"
              autoComplete="tel"
              className="h-9 w-full rounded-lg border border-gray-200 bg-[#fcfbfb] px-3 text-sm text-[#1B1D1C] outline-none placeholder:text-gray-400 focus:border-gray-300"
            />
          </div>

          {/* UBICACIÓN */}
          <div className="flex flex-col gap-0.5">
            <label
              htmlFor="pv-ubicacion"
              className="text-sm font-medium text-[#1B1D1C]"
            >
              Ubicación del local
            </label>

            <div className="relative">
              <input
                id="pv-ubicacion"
                type="text"
                name="ubicacion"
                placeholder="Ingresá la dirección de tu local"
                autoComplete="street-address"
                required
                className="h-9 w-full rounded-lg border border-gray-200 bg-[#fcfbfb] px-3 pr-10 text-sm text-[#1B1D1C] outline-none placeholder:text-gray-400 focus:border-gray-300"
              />

              <MapPin
                size={17}
                strokeWidth={1.7}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* ESPACIO PARA LA FUTURA INTEGRACIÓN DE GOOGLE MAPS */}
            <span id="pv-google-maps" className="block" aria-hidden="true" />
          </div>

          {/* MENSAJE */}
          <div className="flex min-h-0 flex-1 flex-col gap-0.5">
            <label
              htmlFor="pv-mensaje"
              className="text-sm font-medium text-[#1B1D1C]"
            >
              ¿Algo más que debamos saber?{" "}
              <span className="text-gray-400">(opcional)</span>
            </label>

            <textarea
              id="pv-mensaje"
              name="mensaje"
              placeholder="Contanos un poco más sobre tu negocio..."
              className="min-h-[64px] w-full flex-1 resize-y rounded-lg border border-gray-200 bg-[#fcfbfb] px-3 py-2 text-sm text-[#1B1D1C] outline-none placeholder:text-gray-400 focus:border-gray-300"
            />
          </div>
        </div>

        {/* COLUMNA 2 — OPCIONES */}
        <div className="flex min-w-0 flex-col gap-3">
          {/* TIPO DE NEGOCIO */}
          <div className="rounded-xl border border-gray-200 p-3">
            <OpcionesRadio
              titulo="Tipo de negocio"
              name="tipoNegocio"
              opciones={tiposNegocio}
              columns={2}
            />
          </div>

          {/* LOCALES + VOLUMEN */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="min-w-0 rounded-xl border border-gray-200 p-2.5">
              <OpcionesRadio
                titulo="¿Cuántos locales/puntos de venta tenés?"
                name="cantidadLocales"
                opciones={opciones.cantidadLocales}
                columns={2}
                compact
              />
            </div>

            <div className="min-w-0 rounded-xl border border-gray-200 p-2.5">
              <OpcionesRadio
                titulo="Volumen estimado de pedido inicial"
                name="volumenPedido"
                opciones={opciones.volumenPedido}
              />
            </div>
          </div>

          {/* PRODUCTOS SIMILARES */}
          <div className="rounded-xl border border-gray-200 p-3">
            <OpcionesRadio
              titulo="¿Ya vendés productos similares?"
              name="productosSimilares"
              opciones={opciones.productosSimilares}
            />
          </div>
        </div>

        {/* BOTÓN Y TIEMPO DE RESPUESTA */}
        <div className="flex flex-col items-start gap-2 border-t border-gray-200 pt-3 sm:flex-row sm:items-center sm:justify-between lg:col-span-2">
          <p className="flex items-start gap-2 text-xs leading-relaxed text-gray-500">
            <Clock size={14} strokeWidth={1.8} className="mt-0.5 shrink-0" />
            Te respondemos en menos de 24 horas hábiles.
          </p>

          <button
            type="submit"
            className="min-h-9 w-full rounded-full bg-[#72000E] px-6 py-2 text-sm font-semibold uppercase text-white transition hover:bg-[#56000F] sm:w-fit"
          >
            Enviar consulta
          </button>
        </div>
      </div>
    </form>
  );
}

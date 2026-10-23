import { Mail, Clock } from "lucide-react";

export default function FormEmpresas() {
  return (
    <form className="flex w-full flex-col rounded-2xl bg-white p-4 md:p-5 lg:p-8">
      {/* DATOS */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
        {/* NOMBRE */}
        <div className="flex flex-col gap-1">
          <label htmlFor="nombre" className="text-sm font-medium text-[#1B1D1C]">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            autoComplete="name"
            required
            className="h-10 w-full rounded-lg border border-gray-200 bg-[#fcfbfb] px-3 text-sm text-[#1B1D1C] outline-none placeholder:text-gray-400 focus:border-[#72000E]"
          />
        </div>

        {/* EMPRESA */}
        <div className="flex flex-col gap-1">
          <label htmlFor="empresa" className="text-sm font-medium text-[#1B1D1C]">
            Empresa
          </label>
          <input
            id="empresa"
            type="text"
            name="empresa"
            placeholder="Nombre de la empresa"
            autoComplete="organization"
            required
            className="h-10 w-full rounded-lg border border-gray-200 bg-[#fcfbfb] px-3 text-sm text-[#1B1D1C] outline-none placeholder:text-gray-400 focus:border-[#72000E]"
          />
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email-corporativo"
            className="text-sm font-medium text-[#1B1D1C]"
          >
            Email corporativo
          </label>
          <div className="relative">
            <input
              id="email-corporativo"
              type="email"
              name="email"
              placeholder="tu@empresa.com"
              autoComplete="email"
              required
              className="h-10 w-full rounded-lg border border-gray-200 bg-[#fcfbfb] px-3 pr-9 text-sm text-[#1B1D1C] outline-none placeholder:text-gray-400 focus:border-[#72000E]"
            />
            <Mail
              size={16}
              strokeWidth={1.8}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* ROL */}
        <div className="flex flex-col gap-1">
          <label htmlFor="rol" className="text-sm font-medium text-[#1B1D1C]">
            Rol en la empresa <span className="text-gray-400">(opcional)</span>
          </label>
          <input
            id="rol"
            type="text"
            name="rol"
            placeholder="Ej. Recursos Humanos"
            className="h-10 w-full rounded-lg border border-gray-200 bg-[#fcfbfb] px-3 text-sm text-[#1B1D1C] outline-none placeholder:text-gray-400 focus:border-[#72000E]"
          />
        </div>
      </div>

      {/* CONTENEDOR DE TRES COLUMNAS */}
      <div className="mt-5 grid grid-cols-1 gap-5 rounded-xl border border-gray-200 p-4 md:grid-cols-3 md:gap-4">
        {/* TAMAÑO DEL EQUIPO */}
        <fieldset className="min-w-0">
          <legend className="text-sm font-medium text-[#1B1D1C]">
            Tamaño del equipo
          </legend>

          <div className="mt-2 flex flex-col gap-2">
            {["1–25", "26–100", "101–500", "+500"].map((opcion) => (
              <label
                key={opcion}
                className="flex min-h-9 cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-[#fcfbfb] px-3 py-2 text-sm text-[#1B1D1C] transition hover:border-[#72000E] has-[:checked]:border-[#72000E] has-[:checked]:bg-[#72000E]/5"
              >
                <input
                  type="radio"
                  name="tamanoEquipo"
                  value={opcion}
                  required
                  className="h-3.5 w-3.5 shrink-0 accent-[#72000E]"
                />
                {opcion}
              </label>
            ))}
          </div>
        </fieldset>

        {/* MODALIDAD */}
        <fieldset className="min-w-0">
          <legend className="text-sm font-medium text-[#1B1D1C]">
            Modalidad de trabajo
          </legend>

          <div className="mt-2 flex flex-col gap-2">
            {["Presencial", "Híbrido", "Remoto"].map((opcion) => (
              <label
                key={opcion}
                className="flex min-h-9 cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-[#fcfbfb] px-3 py-2 text-sm text-[#1B1D1C] transition hover:border-[#72000E] has-[:checked]:border-[#72000E] has-[:checked]:bg-[#72000E]/5"
              >
                <input
                  type="radio"
                  name="modalidad"
                  value={opcion}
                  required
                  className="h-3.5 w-3.5 shrink-0 accent-[#72000E]"
                />
                {opcion}
              </label>
            ))}
          </div>
        </fieldset>

        {/* PLAZO */}
        <fieldset className="min-w-0">
          <legend className="text-sm font-medium text-[#1B1D1C]">
            ¿Para cuándo lo estás evaluando?
          </legend>

          <div className="mt-2 flex flex-col gap-2">
            {[
              "Esta semana",
              "Este mes",
              "Próximos 3 meses",
              "Estoy explorando",
            ].map((opcion) => (
              <label
                key={opcion}
                className="flex min-h-9 cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-[#fcfbfb] px-3 py-2 text-sm text-[#1B1D1C] transition hover:border-[#72000E] has-[:checked]:border-[#72000E] has-[:checked]:bg-[#72000E]/5"
              >
                <input
                  type="radio"
                  name="plazo"
                  value={opcion}
                  required
                  className="h-3.5 w-3.5 shrink-0 accent-[#72000E]"
                />
                {opcion}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* UBICACIÓN */}
      <div className="mt-4 flex flex-col gap-1">
        <label
          htmlFor="ubicacion"
          className="text-sm font-medium text-[#1B1D1C]"
        >
          Ubicación principal
        </label>
        <select
          id="ubicacion"
          name="ubicacion"
          defaultValue=""
          required
          className="h-10 w-full rounded-lg border border-gray-200 bg-[#fcfbfb] px-3 text-sm text-[#1B1D1C] outline-none focus:border-[#72000E]"
        >
          <option value="" disabled>
            Seleccioná una ubicación
          </option>
          <option value="CABA">CABA</option>
          <option value="GBA">Gran Buenos Aires</option>
          <option value="Buenos Aires interior">Interior de Buenos Aires</option>
          <option value="Centro">Centro del país</option>
          <option value="Cuyo">Cuyo</option>
          <option value="NEA">NEA</option>
          <option value="NOA">NOA</option>
          <option value="Patagonia">Patagonia</option>
          <option value="Varias ubicaciones">Varias ubicaciones</option>
        </select>
      </div>

      {/* MENSAJE */}
      <div className="mt-4 flex flex-col gap-1">
        <label
          htmlFor="informacion-adicional"
          className="text-sm font-medium text-[#1B1D1C]"
        >
          ¿Algo más que debamos saber?{" "}
          <span className="text-gray-400">(opcional)</span>
        </label>
        <textarea
          id="informacion-adicional"
          name="mensaje"
          placeholder="Contanos un poco más sobre lo que necesitás..."
          rows={2}
          className="min-h-[72px] w-full resize-y rounded-lg border border-gray-200 bg-[#fcfbfb] px-3 py-2.5 text-sm text-[#1B1D1C] outline-none placeholder:text-gray-400 focus:border-[#72000E]"
        />
      </div>

      {/* ENVÍO */}
      <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-xs leading-relaxed text-gray-500">
          <Clock size={14} strokeWidth={1.8} className="mt-0.5 shrink-0" />
          Te respondemos en menos de 24 horas hábiles.
        </p>

        <button
          type="submit"
          className="min-h-10 w-full rounded-full bg-[#72000E] px-6 py-2.5 text-sm font-semibold uppercase text-white transition hover:bg-[#56000F] sm:w-fit"
        >
          Enviar consulta
        </button>
      </div>
    </form>
  );
}

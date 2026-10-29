import { Mail, Clock } from "lucide-react";

export default function FormContacto() {
  return (
    <form className="flex w-full flex-col max-w-3xl rounded-2xl bg-[#f4f3f2] p-4 md:p-5 lg:p-8">
      {/* Nombre */}
      <h3 className="text-2xl my-4">Dejanos tu consulta</h3>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="nombre"
          className="text-sm font-medium text-neutral-900"
        >
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Tu nombre"
          required
          className="h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900"
        />
      </div>

      {/* Email */}
      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-neutral-900">
          Email
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            required
            className="h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 pr-11 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900"
          />
          <Mail
            size={18}
            strokeWidth={1.5}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
          />
        </div>
      </div>

      {/* Motivo de consulta */}
      <div className="mt-5 flex flex-col gap-2">
        <label
          htmlFor="motivo"
          className="text-sm font-medium text-neutral-900"
        >
          Motivo de consulta
        </label>
        <select
          id="motivo"
          name="motivo"
          defaultValue=""
          required
          className="h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
        >
          <option value="" disabled>
            Seleccioná un motivo
          </option>
          <option value="productos">Productos</option>
          <option value="problemas-con-mi-compra">
            Problemas con mi compra
          </option>
          <option value="devoluciones">Devoluciones</option>
          <option value="suscripcion">Suscripción</option>
        </select>
      </div>

      {/* Mensaje */}
      <div className="mt-5 flex flex-col gap-2">
        <label
          htmlFor="mensaje"
          className="text-sm font-medium text-neutral-900"
        >
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          placeholder="¿En qué podemos ayudarte?"
          required
          className="w-full resize-y rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900"
        />
      </div>

      {/* Envío */}
     <div className="flex flex-col gap-3 mt-8">
      <button
          type="submit"
          className="min-h-10 w-full rounded-full bg-[#72000E] px-6 py-2.5 text-sm font-semibold uppercase text-white transition hover:bg-[#56000F] sm:w-fit"
        >
          Enviar consulta
        </button>
        <p className="flex items-center gap-2 text-xs text-neutral-500">
          <Clock size={16} strokeWidth={1.5} />
          Te respondemos en menos de 24 horas hábiles.
        </p>
     </div>
    </form>
  );
}

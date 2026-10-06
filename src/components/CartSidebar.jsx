import { useEffect, useState } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import products from "../data/products.json";

export default function CartSidebar({ onClose }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];

    const unitPrice = item.price / item.quantity;

    item.quantity += 1;
    item.price = unitPrice * item.quantity;

    updateCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];

    if (item.quantity === 1) {
      removeItem(index);
      return;
    }

    const unitPrice = item.price / item.quantity;

    item.quantity -= 1;
    item.price = unitPrice * item.quantity;

    updateCart(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, itemIndex) => itemIndex !== index);

    updateCart(updatedCart);
  };

  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const total = subtotal;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <aside className="absolute inset-x-0 top-0 flex h-screen flex-col bg-[#1B1D1C] text-white shadow-2xl md:bottom-3 md:left-auto md:right-3 md:top-3 md:h-auto md:w-full md:max-w-112.5 md:rounded-xl">
        {/* Header */}
        <div className="flex h-fit items-center justify-between border-b border-[#262A29] p-4">
          <span className="uppercase font-bristone">carrito</span>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex flex-col gap-6 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <>
              <h3 className="uppercase font-semibold text-white">
                TU CARRITO ESTÁ VACIO
              </h3>
              <p className="text-white">
                Elegí la fórmula para tu momento del día o llevá las tres con
                Oasis
              </p>

              <div className="rounded-xl bg-[#1C1C1C] p-3">
                <div className="grid grid-cols-3 gap-2">
                  {/* SHARP */}
                  <Link
                    to="/product/sharp"
                    onClick={onClose}
                    className="flex min-w-0 flex-col"
                  >
                    <div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#262A29]">
                      <img
                        src="/images/products/sharp.png"
                        alt="SHARP"
                        className="h-[100px] w-[100px] object-cover"
                      />
                    </div>

                    <span className="mt-2 truncate text-xs font-semibold uppercase font-bristone">
                      SHARP
                    </span>

                    <span className="mt-1 text-[10px] uppercase text-white/50">
                      Mañana
                    </span>
                  </Link>

                  {/* HYDRATE */}
                  <Link
                    to="/product/hydrate"
                    onClick={onClose}
                    className="flex min-w-0 flex-col"
                  >
                    <div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#262A29]">
                      <img
                        src="/images/products/hydrate.png"
                        alt="HYDRATE"
                        className="h-[100px] w-[100px] object-cover"
                      />
                    </div>

                    <span className="mt-2 truncate text-xs font-semibold uppercase font-bristone">
                      HYDRATE
                    </span>

                    <span className="mt-1 text-[10px] uppercase text-white/50">
                      Mediodía
                    </span>
                  </Link>

                  {/* RESET */}
                  <Link
                    to="/product/reset"
                    onClick={onClose}
                    className="flex min-w-0 flex-col"
                  >
                    <div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#262A29]">
                      <img
                        src="/images/products/reset.png"
                        alt="RESET"
                        className="h-[100px] w-[100px] object-cover"
                      />
                    </div>

                    <span className="mt-2 truncate text-xs font-semibold uppercase font-bristone">
                      RESET
                    </span>

                    <span className="mt-1 text-[10px] uppercase text-white/50">
                      Noche
                    </span>
                  </Link>
                </div>

                <Link
                  to="/oasis"
                  onClick={onClose}
                  className="mt-4 flex h-10 w-full items-center justify-center rounded-full bg-[#72000E] text-xs font-semibold uppercase text-white transition hover:bg-[#5e0910]"
                >
                  Descubre OASIS
                </Link>
              </div>
            </>
          ) : (
            <>
              {cart.map((item, index) => {
                const system =
                  item.type === "system"
                    ? products.systems.find(
                        (system) => system.id === item.system,
                      )
                    : null;

                const product =
                  item.type !== "system" ? products[item.product] : null;

                const itemName = system?.name || product?.name || item.product;

                const itemImage = system?.image || product?.images?.[0];

                return (
                  <div
                    key={index}
                    className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 rounded-lg bg-[#1C1C1C] p-3"
                  >
                    {/* Imagen */}
                    <div className="h-18 w-18 shrink-0 overflow-hidden rounded-md">
                      <img
                        src={itemImage}
                        alt={itemName}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Información */}
                    <div className="flex h-18 min-w-0 flex-col justify-between">
                      {/* Título + eliminar */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold font-bristone uppercase">
                          {itemName}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="shrink-0 text-white/50 transition hover:text-white"
                        >
                          <Trash2 size={15} strokeWidth={1.5} />
                        </button>
                      </div>

                      {/* Sticks + tipo */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/60">
                          {item.sticks} sticks
                        </span>

                        <span className="text-xs text-white/40">·</span>

                        <span className="text-xs text-white/50">
                          {item.purchaseType === "subscription"
                            ? "Suscripción"
                            : "Compra única"}
                        </span>
                      </div>

                      {/* Precio + cantidad */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          ${item.price.toFixed(2)}
                        </span>

                        <div className="flex w-fit items-center gap-2 rounded-full bg-[#72000E] px-2 py-0.5 text-white">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(index)}
                            className="flex h-6 w-6 items-center justify-center rounded-full"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="text-xs">{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(index)}
                            className="flex h-6 w-6 items-center justify-center rounded-full"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="mt-auto border-t border-[#262A29] p-4">
            <div className="mb-2 flex items-center justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="mb-4 flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="h-12 w-full rounded-full bg-[#72000E] font-semibold uppercase text-white">
              Pagar
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

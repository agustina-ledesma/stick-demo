import { useEffect, useState } from "react";
import { UserRound, ShoppingCart } from "lucide-react";

export default function CartButton({ onCartClick }) {
  const [active, setActive] = useState("cart");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const count = storedCart.reduce(
        (total, item) => total + item.quantity,
        0
      );

      setCartCount(count);
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    const interval = setInterval(updateCartCount, 300);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex h-12 w-fit items-center gap-4 rounded-full border border-white/10 bg-black/40 p-2 backdrop-blur-xl">

      {/* Usuario */}
      <button
        type="button"
        onClick={() => setActive("user")}
        className={`flex h-8 w-8 items-center justify-center rounded-full text-white/90 transition-colors ${
          active === "user"
            ? "bg-[#A90018]"
            : "bg-white/10"
        } hover:bg-transparent`}
      >
        <UserRound size={18} strokeWidth={1.5} />
      </button>

      {/* Carrito */}
      <button
        type="button"
        onClick={() => {
          setActive("cart");
          onCartClick();
        }}
        className={`relative flex h-8 w-8 items-center justify-center rounded-full text-white ${
          cartCount > 0
            ? "bg-[#A90018]"
            : "bg-white/10"
        }`}
      >
        <ShoppingCart size={18} strokeWidth={1.5} />

        {cartCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-medium leading-none text-black">
            {cartCount}
          </span>
        )}
      </button>

    </div>
  );
}
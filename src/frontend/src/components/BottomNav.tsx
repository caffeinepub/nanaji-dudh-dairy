import { Link, useLocation } from "@tanstack/react-router";
import { Home, Package, Phone, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function BottomNav() {
  const location = useLocation();
  const { totalItems, setIsOpen: setCartOpen } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-border shadow-[0_-2px_16px_rgba(0,0,0,0.08)]"
      data-ocid="bottom_nav.panel"
    >
      <div className="flex items-stretch h-16">
        {/* Home */}
        <Link
          to="/"
          data-ocid="bottom_nav.link"
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
            isActive("/") ? "text-brand-purple" : "text-muted-foreground"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-wide">Home</span>
        </Link>

        {/* Products */}
        <Link
          to="/products"
          data-ocid="bottom_nav.link"
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
            isActive("/products")
              ? "text-brand-purple"
              : "text-muted-foreground"
          }`}
        >
          <Package className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-wide">
            Products
          </span>
        </Link>

        {/* Cart */}
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          data-ocid="bottom_nav.open_modal_button"
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-muted-foreground transition-colors hover:text-brand-purple relative"
          aria-label="Open cart"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-saffron text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-wide">Cart</span>
        </button>

        {/* Contact */}
        <Link
          to="/contact"
          data-ocid="bottom_nav.link"
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
            isActive("/contact") ? "text-brand-purple" : "text-muted-foreground"
          }`}
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-wide">Contact</span>
        </Link>
      </div>
    </nav>
  );
}

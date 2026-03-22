import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Milk, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Contact Us", to: "/contact" },
];

const WA_NUMBER = "917820957013";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello! I'd like to place an order for Nanaji Dudh Dairy products.")}`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setIsOpen: setCartOpen } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
            <div className="w-10 h-10 rounded-full bg-brand-purple flex items-center justify-center">
              <Milk className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-brand-purple text-lg leading-none">
                Nanaji
              </p>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase leading-none">
                Dudh Dairy
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className={`text-sm font-medium transition-colors hover:text-brand-purple ${
                  location.pathname === link.to
                    ? "text-brand-purple font-semibold"
                    : "text-foreground/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-brand-purple hover:bg-brand-purple/10 rounded-full transition-colors"
              aria-label="Open cart"
              data-ocid="nav.open_modal_button"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-saffron text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block"
              data-ocid="nav.primary_button"
            >
              <Button className="bg-brand-purple text-white hover:bg-brand-purple-light rounded-full px-5 text-sm font-semibold">
                Shop Now
              </Button>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden p-2 text-brand-purple"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-border"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    data-ocid="nav.link"
                    className={`text-sm font-medium py-2 border-b border-border/50 ${
                      location.pathname === link.to
                        ? "text-brand-purple font-semibold"
                        : "text-foreground/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  data-ocid="nav.primary_button"
                >
                  <Button className="w-full bg-brand-purple text-white hover:bg-brand-purple-light rounded-full">
                    Shop Now
                  </Button>
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer />
    </>
  );
}

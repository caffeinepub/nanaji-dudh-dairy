import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const WA_NUMBER = "917820957013";

function buildWhatsAppUrl(product: Product) {
  const price = Number(product.price);
  const text = `Hello Nanaji Dudh Dairy! 🥛\n\nI'd like to order:\n• *${product.name}*\n• Price: ₹${price}/${product.unit}\n\nPlease confirm availability and delivery details.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

const FALLBACK_IMAGES: Record<string, string> = {
  Milk: "/assets/generated/buffalo-milk.dim_400x400.jpg",
  Ghee: "/assets/generated/desi-ghee.dim_400x400.jpg",
  Paneer: "/assets/generated/paneer.dim_400x400.jpg",
  Sweets: "/assets/generated/milk-sweets.dim_400x400.jpg",
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const price = Number(product.price);
  const quantity = Number(product.quantity ?? 0);
  const isLowStock = quantity > 0 && quantity < 10;
  const imgSrc =
    product.imageUrl ||
    FALLBACK_IMAGES[product.category] ||
    "/assets/generated/buffalo-milk.dim_400x400.jpg";
  const { addItem, setIsOpen } = useCart();

  const handleAddToCart = () => {
    if (!product.isAvailable) return;
    addItem(product);
    toast.success(`${product.name} added to cart!`, {
      action: {
        label: "View Cart",
        onClick: () => setIsOpen(true),
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow group border border-border/50"
      data-ocid={`products.item.${index + 1}`}
    >
      <div className="relative overflow-hidden aspect-square bg-section-bg">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              FALLBACK_IMAGES[product.category] ||
              "/assets/generated/buffalo-milk.dim_400x400.jpg";
          }}
        />
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="bg-card text-foreground text-xs font-semibold px-3 py-1 rounded-full border border-border">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <span className="bg-brand-purple text-saffron text-xs font-semibold px-2.5 py-1 rounded-full">
            {product.category}
          </span>
          {isLowStock && (
            <Badge className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full border-0">
              Low Stock
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display font-bold text-lg text-foreground mb-1 leading-tight">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-saffron">₹{price}</span>
            <span className="text-muted-foreground text-sm ml-1">
              /{product.unit}
            </span>
          </div>
          {quantity > 0 && (
            <span className="text-xs text-muted-foreground">
              Qty: {quantity}
            </span>
          )}
        </div>

        {/* Add to Cart - primary action */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.isAvailable}
          className="w-full mb-2 bg-saffron hover:bg-saffron/90 text-background rounded-xl font-semibold gap-2"
          data-ocid={`products.primary_button.${index + 1}`}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>

        {/* WhatsApp - secondary */}
        <a
          href={buildWhatsAppUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid={`products.secondary_button.${index + 1}`}
          className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl text-sm font-medium transition-all border ${
            product.isAvailable
              ? "border-brand-purple/50 text-foreground/80 hover:bg-brand-purple/10 hover:text-saffron"
              : "border-muted text-muted-foreground cursor-not-allowed pointer-events-none"
          }`}
        >
          <SiWhatsapp className="w-4 h-4" />
          Order via WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

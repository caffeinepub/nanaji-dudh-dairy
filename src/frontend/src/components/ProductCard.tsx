import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";
import type { Product } from "../backend.d";

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
  const imgSrc =
    product.imageUrl ||
    FALLBACK_IMAGES[product.category] ||
    "/assets/generated/buffalo-milk.dim_400x400.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow group"
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
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <span className="bg-white text-foreground text-xs font-semibold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-brand-purple text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {product.category}
          </span>
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
            <span className="text-2xl font-bold text-brand-purple">
              ₹{price}
            </span>
            <span className="text-muted-foreground text-sm ml-1">
              /{product.unit}
            </span>
          </div>
        </div>

        <a
          href={buildWhatsAppUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid={`products.primary_button.${index + 1}`}
          className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
            product.isAvailable
              ? "bg-brand-purple text-white hover:bg-brand-purple-light"
              : "bg-muted text-muted-foreground cursor-not-allowed pointer-events-none"
          }`}
        >
          <SiWhatsapp className="w-4 h-4" />
          Order via WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

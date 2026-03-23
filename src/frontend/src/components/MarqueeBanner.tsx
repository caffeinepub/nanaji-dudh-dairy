import { Milk } from "lucide-react";

const messages = [
  "🐃 Fresh Buffalo Milk Delivered Daily",
  "✨ 100% Pure & Natural Products",
  "🧈 Premium Quality Ghee & Paneer",
  "📦 Free Delivery on Orders Above ₹500",
  "📱 Order on WhatsApp: +91 7820957013",
  "🌾 Straight From Our Farm to Your Family",
  "🥛 A2 Buffalo Milk – Rich & Nutritious",
  "⭐ Trusted by 1000+ Happy Customers",
];

const sets = ["a", "b"] as const;

export default function MarqueeBanner() {
  return (
    <div className="bg-brand-purple text-white py-2 overflow-hidden whitespace-nowrap relative">
      <div className="inline-flex animate-marquee gap-10">
        {sets.map((set) =>
          messages.map((msg) => (
            <span
              key={`${set}-${msg}`}
              className="inline-flex items-center gap-2 text-sm font-medium"
            >
              <Milk className="w-3.5 h-3.5 opacity-70" />
              {msg}
            </span>
          )),
        )}
      </div>
    </div>
  );
}

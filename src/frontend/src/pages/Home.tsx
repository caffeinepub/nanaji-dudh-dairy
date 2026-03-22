import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Droplets, Leaf, Shield, Star } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";
import type { Product } from "../backend.d";
import ProductCard from "../components/ProductCard";
import { useGetAllProducts } from "../hooks/useQueries";

const WA_NUMBER = "917820957013";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello! I'd like to place an order for Nanaji Dudh Dairy products.")}`;

const FALLBACK_PRODUCTS = [
  {
    id: BigInt(1),
    name: "Fresh Buffalo Milk",
    category: "Milk",
    price: BigInt(65),
    unit: "litre",
    description:
      "Farm-fresh, pure buffalo milk rich in protein and calcium. Delivered daily.",
    imageUrl: "/assets/generated/buffalo-milk.dim_400x400.jpg",
    isAvailable: true,
  },
  {
    id: BigInt(2),
    name: "Pure Desi Ghee",
    category: "Ghee",
    price: BigInt(650),
    unit: "500g",
    description:
      "Handcrafted pure desi ghee made from fresh buffalo cream using traditional methods.",
    imageUrl: "/assets/generated/desi-ghee.dim_400x400.jpg",
    isAvailable: true,
  },
  {
    id: BigInt(3),
    name: "Fresh Paneer",
    category: "Paneer",
    price: BigInt(80),
    unit: "250g",
    description:
      "Soft, fresh homemade paneer made from pure buffalo milk. Perfect for cooking.",
    imageUrl: "/assets/generated/paneer.dim_400x400.jpg",
    isAvailable: true,
  },
  {
    id: BigInt(4),
    name: "Milk Sweets Box",
    category: "Sweets",
    price: BigInt(320),
    unit: "500g",
    description:
      "Assorted traditional Indian milk sweets made fresh daily with pure buffalo milk.",
    imageUrl: "/assets/generated/milk-sweets.dim_400x400.jpg",
    isAvailable: true,
  },
  {
    id: BigInt(5),
    name: "Malai Paneer",
    category: "Paneer",
    price: BigInt(120),
    unit: "500g",
    description:
      "Rich, creamy malai paneer made from extra-thick buffalo milk cream.",
    imageUrl: "/assets/generated/paneer.dim_400x400.jpg",
    isAvailable: true,
  },
  {
    id: BigInt(6),
    name: "Saffron Ghee",
    category: "Ghee",
    price: BigInt(850),
    unit: "500g",
    description:
      "Premium desi ghee infused with the finest Kashmir saffron for an aromatic experience.",
    imageUrl: "/assets/generated/desi-ghee.dim_400x400.jpg",
    isAvailable: true,
  },
] as Product[];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Pune",
    rating: 5,
    text: "The ghee is absolutely pure and aromatic. Reminds me of my grandmother's kitchen. Best quality I've ever had!",
  },
  {
    name: "Rajesh Patel",
    location: "Mumbai",
    rating: 5,
    text: "Buffalo milk is so creamy and fresh. My kids love it! Ordering on WhatsApp is super easy.",
  },
  {
    name: "Sunita Devi",
    location: "Nashik",
    rating: 5,
    text: "Paneer is always fresh and soft. We use it for all our cooking now. Highly recommended!",
  },
];

const categories = [
  { name: "Fresh Milk", icon: "🥛", desc: "Daily fresh buffalo milk" },
  { name: "Desi Ghee", icon: "🧈", desc: "Traditional churned ghee" },
  { name: "Paneer", icon: "🧀", desc: "Soft homemade paneer" },
  { name: "Indian Sweets", icon: "🍮", desc: "Classic milk-based sweets" },
];

const features = [
  {
    icon: Shield,
    title: "100% Pure",
    desc: "No preservatives, no additives. Pure dairy from our own buffalo herd.",
  },
  {
    icon: Droplets,
    title: "Farm Fresh",
    desc: "Collected and delivered daily for maximum freshness and nutrition.",
  },
  {
    icon: Leaf,
    title: "Hygienic",
    desc: "Processed with strict hygiene standards in a clean, certified facility.",
  },
];

export default function Home() {
  const { data: products, isLoading } = useGetAllProducts();
  const displayProducts = (
    products && products.length > 0 ? products : FALLBACK_PRODUCTS
  ).slice(0, 6);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/assets/generated/hero-dairy-farm-golden.dim_1200x600.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/90 via-brand-purple/70 to-transparent" />

        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl"
          >
            <span className="inline-block bg-saffron/20 text-saffron border border-saffron/30 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              🥛 100% Pure Buffalo Dairy
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-5">
              From Farm
              <br />
              <span className="text-saffron">to Family</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-md">
              Premium buffalo dairy products crafted with care, delivered fresh
              to your doorstep every day.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="hero.primary_button"
              >
                <Button className="bg-whatsapp hover:bg-whatsapp/90 text-white rounded-full px-8 py-6 text-base font-semibold gap-2 shadow-lg">
                  <SiWhatsapp className="w-5 h-5" />
                  Order via WhatsApp
                </Button>
              </a>
              <Link to="/products" data-ocid="hero.secondary_button">
                <Button
                  variant="outline"
                  className="border-white text-white bg-white/10 hover:bg-white hover:text-brand-purple rounded-full px-8 py-6 text-base font-semibold gap-2"
                >
                  View Products <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[
                { val: "500+", label: "Happy Families" },
                { val: "10+", label: "Years of Trust" },
                { val: "100%", label: "Pure Quality" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-saffron font-display">
                    {stat.val}
                  </p>
                  <p className="text-white/70 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* WhatsApp CTA Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-0 left-0 right-0 bg-saffron py-3"
        >
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-foreground font-semibold text-sm hover:underline"
            data-ocid="hero.whatsapp.button"
          >
            <SiWhatsapp className="w-4 h-4" />
            Order directly on WhatsApp:{" "}
            <span className="font-bold">+91 78209 57013</span>
          </a>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple mb-3">
              Our Categories
            </h2>
            <p className="text-muted-foreground">
              Explore our range of pure dairy products
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to="/products"
                  data-ocid="categories.link"
                  className="flex flex-col items-center p-6 bg-section-bg rounded-2xl hover:bg-secondary hover:shadow-card transition-all group text-center"
                >
                  <span className="text-4xl mb-3">{cat.icon}</span>
                  <h3 className="font-semibold text-brand-purple group-hover:text-brand-purple text-sm">
                    {cat.name}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-1">
                    {cat.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 bg-section-bg" id="products">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple mb-3">
              Explore Our Bestsellers
            </h2>
            <p className="text-muted-foreground">
              Freshly made, carefully packed, delivered with love
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {["a", "b", "c", "d", "e", "f"].map((k) => (
                <div
                  key={k}
                  className="bg-card rounded-2xl overflow-hidden shadow-card animate-pulse"
                  data-ocid="products.loading_state"
                >
                  <div className="aspect-square bg-muted" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-2/3" />
                    <div className="h-10 bg-muted rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map((product, i) => (
                <ProductCard
                  key={String(product.id)}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/products" data-ocid="products.primary_button">
              <Button className="bg-brand-purple text-white hover:bg-brand-purple-light rounded-full px-8 py-5 gap-2 font-semibold">
                View All Products <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-purple mb-3">
              Why Choose Us?
            </h2>
            <p className="text-muted-foreground">
              Our promise to you — pure, fresh, and trustworthy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-section-bg hover:shadow-card transition-shadow"
              >
                <div className="w-16 h-16 bg-brand-purple rounded-2xl flex items-center justify-center mb-5">
                  <feat.icon className="w-8 h-8 text-saffron" />
                </div>
                <h3 className="font-display font-bold text-xl text-brand-purple mb-2">
                  {feat.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-brand-purple text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Our Process
            </h2>
            <p className="text-white/70">
              Every product follows a careful journey from farm to your table
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: "01",
                title: "Farm Fresh",
                desc: "Milk collected fresh every morning from our healthy buffalo herd.",
                icon: "🐃",
              },
              {
                step: "02",
                title: "Hygienic Processing",
                desc: "Processed in our clean facility following strict quality standards.",
                icon: "✨",
              },
              {
                step: "03",
                title: "Quality Checks",
                desc: "Multiple quality checks ensure only the best reaches your family.",
                icon: "✅",
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="inline-block text-saffron font-bold text-sm mb-2 font-mono">
                  {step.step}
                </div>
                <h3 className="font-display font-bold text-xl mb-2">
                  {step.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur rounded-2xl p-6"
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((idx) => (
                    <Star
                      key={`star-${idx}`}
                      className="w-4 h-4 fill-saffron text-saffron"
                    />
                  ))}
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-4 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-saffron/30 flex items-center justify-center text-xs font-bold text-saffron">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Banner */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-saffron/10 border border-saffron/30 rounded-3xl p-10 text-center"
          >
            <div className="text-6xl mb-4">📱</div>
            <h2 className="font-display text-3xl font-bold text-brand-purple mb-3">
              Order in One Click on WhatsApp
            </h2>
            <p className="text-muted-foreground mb-2">
              Talk to us directly for custom orders, bulk orders, and special
              requests.
            </p>
            <p className="text-brand-purple font-bold text-xl mb-6">
              +91 78209 57013
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="cta.primary_button"
            >
              <Button className="bg-whatsapp hover:bg-whatsapp/90 text-white rounded-full px-10 py-6 text-base font-semibold gap-2 shadow-md">
                <SiWhatsapp className="w-5 h-5" />
                Chat with Us Now
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

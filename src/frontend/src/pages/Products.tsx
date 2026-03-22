import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../backend.d";
import ProductCard from "../components/ProductCard";
import { useGetProductsByCategory } from "../hooks/useQueries";

const CATEGORIES = ["All", "Milk", "Ghee", "Paneer", "Sweets"];

const FALLBACK_PRODUCTS: Product[] = [
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
    name: "Full Cream Milk",
    category: "Milk",
    price: BigInt(72),
    unit: "litre",
    description:
      "Rich and creamy full-cream buffalo milk, packed with natural fat and nutrients.",
    imageUrl: "/assets/generated/buffalo-milk.dim_400x400.jpg",
    isAvailable: true,
  },
  {
    id: BigInt(3),
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
    id: BigInt(4),
    name: "Saffron Ghee",
    category: "Ghee",
    price: BigInt(850),
    unit: "500g",
    description: "Premium desi ghee infused with the finest Kashmir saffron.",
    imageUrl: "/assets/generated/desi-ghee.dim_400x400.jpg",
    isAvailable: true,
  },
  {
    id: BigInt(5),
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
    id: BigInt(6),
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
    id: BigInt(7),
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
    id: BigInt(8),
    name: "Khoya / Mawa",
    category: "Sweets",
    price: BigInt(280),
    unit: "500g",
    description:
      "Pure khoya made by slowly reducing fresh buffalo milk. Perfect for Indian sweets.",
    imageUrl: "/assets/generated/milk-sweets.dim_400x400.jpg",
    isAvailable: true,
  },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const { data: products, isLoading } =
    useGetProductsByCategory(activeCategory);

  const baseProducts =
    products && products.length > 0 ? products : FALLBACK_PRODUCTS;
  const filtered = baseProducts.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-section-bg">
      {/* Page Header */}
      <section className="bg-brand-purple py-14">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              Our Products
            </h1>
            <p className="text-white/70 text-lg">
              Pure, fresh dairy from our farm to your family
            </p>
          </motion.div>
        </div>
        <div className="h-1 bg-saffron mt-8" />
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 rounded-full bg-white border-border"
                data-ocid="products.search_input"
              />
            </div>

            <Tabs
              value={activeCategory}
              onValueChange={setActiveCategory}
              data-ocid="products.tab"
            >
              <TabsList className="bg-white border border-border rounded-full p-1">
                {CATEGORIES.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    data-ocid="products.tab"
                    className="rounded-full data-[state=active]:bg-brand-purple data-[state=active]:text-white text-sm"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
                <div
                  key={k}
                  className="bg-card rounded-2xl overflow-hidden shadow-card animate-pulse"
                  data-ocid="products.loading_state"
                >
                  <div className="aspect-square bg-muted" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-10 bg-muted rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20" data-ocid="products.empty_state">
              <div className="text-6xl mb-4">🥛</div>
              <h3 className="font-display text-xl font-bold text-brand-purple mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground">
                Try a different category or search term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <ProductCard
                  key={String(product.id)}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

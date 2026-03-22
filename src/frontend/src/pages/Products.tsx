import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import ProductCard from "../components/ProductCard";
import { useAddProduct, useGetProductsByCategory } from "../hooks/useQueries";

const CATEGORIES = ["All", "Milk", "Ghee", "Paneer", "Sweets"];
const PRODUCT_CATEGORIES = ["Milk", "Ghee", "Paneer", "Sweets"];

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
    quantity: BigInt(100),
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
    quantity: BigInt(100),
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
    quantity: BigInt(100),
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
    quantity: BigInt(100),
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
    quantity: BigInt(100),
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
    quantity: BigInt(100),
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
    quantity: BigInt(100),
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
    quantity: BigInt(100),
  },
];

const DEFAULT_FORM = {
  name: "",
  description: "",
  price: "",
  unit: "",
  category: "",
  imageUrl: "",
  quantity: "",
};

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(DEFAULT_FORM);

  const { data: products, isLoading } =
    useGetProductsByCategory(activeCategory);
  const addProduct = useAddProduct();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.category ||
      !form.price ||
      !form.unit ||
      !form.quantity
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await addProduct.mutateAsync({
        name: form.name,
        description: form.description,
        price: BigInt(Math.round(Number(form.price))),
        unit: form.unit,
        category: form.category,
        imageUrl: form.imageUrl,
        quantity: BigInt(Math.round(Number(form.quantity))),
      });
      toast.success(`"${form.name}" added successfully!`);
      setForm(DEFAULT_FORM);
      setOpen(false);
    } catch {
      toast.error("Failed to add product. Please try again.");
    }
  };

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
          {/* Search + Filter + Add Product */}
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

            <div className="flex items-center gap-3 flex-wrap justify-center">
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

              {/* Add New Product Dialog */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-brand-purple hover:bg-brand-purple/90 text-white rounded-full font-semibold gap-2 px-5 shadow-md"
                    data-ocid="products.open_modal_button"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Product
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="max-w-lg max-h-[90vh] overflow-y-auto"
                  data-ocid="products.dialog"
                >
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl text-brand-purple">
                      Add New Product
                    </DialogTitle>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    {/* Product Name */}
                    <div className="space-y-1.5">
                      <Label htmlFor="prod-name">
                        Product Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="prod-name"
                        placeholder="e.g. Fresh Buffalo Milk"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        data-ocid="products.input"
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                      <Label>
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={form.category}
                        onValueChange={(v) =>
                          setForm((f) => ({ ...f, category: v }))
                        }
                      >
                        <SelectTrigger data-ocid="products.select">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {PRODUCT_CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price and Unit - row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="prod-price">
                          Price (₹) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="prod-price"
                          type="number"
                          min="0"
                          placeholder="e.g. 65"
                          value={form.price}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, price: e.target.value }))
                          }
                          data-ocid="products.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="prod-unit">
                          Unit <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="prod-unit"
                          placeholder="e.g. litre, 500g"
                          value={form.unit}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, unit: e.target.value }))
                          }
                          data-ocid="products.input"
                        />
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="space-y-1.5">
                      <Label htmlFor="prod-qty">
                        Stock Quantity <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="prod-qty"
                        type="number"
                        min="0"
                        placeholder="e.g. 50"
                        value={form.quantity}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, quantity: e.target.value }))
                        }
                        data-ocid="products.input"
                      />
                    </div>

                    {/* Image URL */}
                    <div className="space-y-1.5">
                      <Label htmlFor="prod-image">Product Image URL</Label>
                      <Input
                        id="prod-image"
                        placeholder="https://... or leave blank for default"
                        value={form.imageUrl}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, imageUrl: e.target.value }))
                        }
                        data-ocid="products.input"
                      />
                      {form.imageUrl && (
                        <img
                          src={form.imageUrl}
                          alt="Preview"
                          className="mt-2 rounded-xl h-24 w-24 object-cover border border-border"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      )}
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <Label htmlFor="prod-desc">Description</Label>
                      <Textarea
                        id="prod-desc"
                        placeholder="Describe the product..."
                        rows={3}
                        value={form.description}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            description: e.target.value,
                          }))
                        }
                        data-ocid="products.textarea"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 rounded-xl"
                        onClick={() => setOpen(false)}
                        data-ocid="products.cancel_button"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={addProduct.isPending}
                        className="flex-1 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-white font-semibold"
                        data-ocid="products.submit_button"
                      >
                        {addProduct.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Adding...
                          </>
                        ) : (
                          <>Add Product</>
                        )}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
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

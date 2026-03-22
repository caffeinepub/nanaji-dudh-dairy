import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Product } from "../backend.d";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: bigint) => void;
  updateQty: (id: bigint, qty: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalItems: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: bigint) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const updateQty = useCallback((id: bigint, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== id));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.product.id === id ? { ...i, quantity: qty } : i)),
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalAmount = useMemo(
    () =>
      items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0),
    [items],
  );

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalAmount,
        totalItems,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

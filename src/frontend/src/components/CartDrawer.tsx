import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Check, Copy, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";

const UPI_ID = "7820957013@ibl";
const WA_NUMBER = "917820957013";

function buildUpiUrl(amount: number) {
  return `upi://pay?pa=${UPI_ID}&pn=NanajiDudhDairy&am=${amount}&tn=OrderPayment&cu=INR`;
}

function buildQrImageUrl(amount: number) {
  const data = encodeURIComponent(buildUpiUrl(amount));
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${data}&color=6b0f1a&bgcolor=ffffff`;
}

function buildWhatsAppUrl(
  items: ReturnType<typeof useCart>["items"],
  total: number,
) {
  const lines = items
    .map(
      (i) =>
        `• ${i.product.name} x${i.quantity} - ₹${Number(i.product.price) * i.quantity}`,
    )
    .join("\n");
  const text = `Hello Nanaji Dudh Dairy! 🥛\n\nMy Order:\n${lines}\n\nTotal Amount: ₹${total}\n\nPlease confirm availability and delivery. I will pay ₹${total} via UPI.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQty,
    clearCart,
    totalAmount,
    isOpen,
    setIsOpen,
  } = useCart();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    toast.success("UPI ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlaceOrder = () => {
    window.open(
      buildWhatsAppUrl(items, totalAmount),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="w-full max-w-md flex flex-col p-0 bg-white"
        data-ocid="cart.sheet"
      >
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-brand-purple font-display">
            <ShoppingCart className="w-5 h-5" />
            Your Cart
            {items.length > 0 && (
              <span className="ml-auto text-sm font-normal text-muted-foreground">
                {items.length} item{items.length > 1 ? "s" : ""}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8"
            data-ocid="cart.empty_state"
          >
            <div className="w-20 h-20 rounded-full bg-section-bg flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-foreground">
                Cart is empty
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                Add products to place an order via WhatsApp
              </p>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-brand-purple text-white hover:bg-brand-purple-light rounded-full"
              data-ocid="cart.close_button"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <ScrollArea className="flex-1">
            <div className="px-5 py-4 space-y-4">
              {/* Cart Items */}
              {items.map((item, idx) => {
                const price = Number(item.product.price);
                const lineTotal = price * item.quantity;
                return (
                  <div
                    key={String(item.product.id)}
                    className="flex gap-3 bg-section-bg rounded-xl p-3"
                    data-ocid={`cart.item.${idx + 1}`}
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      <img
                        src={
                          item.product.imageUrl ||
                          "/assets/generated/buffalo-milk.dim_400x400.jpg"
                        }
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground leading-tight mb-0.5 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        ₹{price}/{item.product.unit}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateQty(item.product.id, item.quantity - 1)
                            }
                            className="w-6 h-6 rounded-full bg-white border border-border flex items-center justify-center hover:bg-muted transition-colors"
                            data-ocid={`cart.secondary_button.${idx + 1}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQty(item.product.id, item.quantity + 1)
                            }
                            className="w-6 h-6 rounded-full bg-white border border-border flex items-center justify-center hover:bg-muted transition-colors"
                            data-ocid={`cart.primary_button.${idx + 1}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-brand-purple font-bold text-sm">
                            ₹{lineTotal}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            className="text-destructive hover:text-destructive/80 transition-colors"
                            data-ocid={`cart.delete_button.${idx + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <Separator />

              {/* Total */}
              <div className="flex items-center justify-between py-1">
                <span className="font-display font-bold text-lg text-foreground">
                  Total
                </span>
                <span className="font-display font-bold text-2xl text-brand-purple">
                  ₹{totalAmount}
                </span>
              </div>

              {/* UPI Payment Section */}
              {totalAmount > 0 && (
                <div className="bg-white rounded-2xl border border-border p-4 space-y-4">
                  <h4 className="font-display font-bold text-center text-foreground text-base">
                    💳 Pay via UPI
                  </h4>

                  {/* UPI ID with copy */}
                  <div className="flex items-center gap-2 bg-section-bg rounded-xl px-3 py-2.5">
                    <span className="flex-1 text-sm font-mono text-brand-purple font-semibold">
                      {UPI_ID}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="text-muted-foreground hover:text-brand-purple transition-colors flex-shrink-0"
                      data-ocid="cart.toggle"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* QR Code */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-border/50">
                      <img
                        src={buildQrImageUrl(totalAmount)}
                        alt={`UPI QR code for \u20b9${totalAmount}`}
                        width={180}
                        height={180}
                        className="rounded"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Scan to pay ₹{totalAmount} with
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Google Pay
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-foreground">
                        PhonePe
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-foreground">
                        Paytm
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white rounded-xl py-6 font-bold text-base gap-2"
                data-ocid="cart.submit_button"
              >
                <SiWhatsapp className="w-5 h-5" />
                Place Order on WhatsApp
              </Button>

              {/* Clear Cart */}
              <div className="text-center pb-2">
                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                  }}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors underline underline-offset-2"
                  data-ocid="cart.delete_button"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}

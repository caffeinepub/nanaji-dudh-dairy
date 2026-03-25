import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Copy,
  CreditCard,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShoppingCart,
  Trash2,
  Truck,
  Wallet,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";

const UPI_ID = "7820957013@ibl";
const WA_NUMBER = "917820957013";

type Step = "cart" | "address" | "payment";
type PaymentMethod = "upi" | "cod" | "card";

interface AddressForm {
  name: string;
  phone: string;
  pincode: string;
  townVillage: string;
  city: string;
  street: string;
  landmark: string;
}

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
  address: AddressForm,
  paymentMethod: PaymentMethod,
) {
  const lines = items
    .map(
      (i) =>
        `• ${i.product.name} x${i.quantity} - ₹${Number(i.product.price) * i.quantity}`,
    )
    .join("\n");

  const paymentLabel =
    paymentMethod === "upi"
      ? "UPI / Online Payment"
      : paymentMethod === "cod"
        ? "Cash on Delivery"
        : "Card Payment";

  const addressLines = [
    address.street,
    address.landmark ? `Landmark: ${address.landmark}` : "",
    address.townVillage,
    address.city,
    `PIN: ${address.pincode}`,
  ]
    .filter(Boolean)
    .join(", ");

  const text = `Hello Nanaji Dudh Dairy! 🥛\n\n*My Order:*\n${lines}\n\n*Total Amount:* ₹${total}\n\n*Customer Name:* ${address.name}\n*Phone:* ${address.phone}\n\n*Delivery Address:*\n${addressLines}\n\n*Payment Method:* ${paymentLabel}\n\nPlease confirm availability and delivery. Thank you!`;

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

function StepIndicator({ current }: { current: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "cart", label: "Cart" },
    { key: "address", label: "Address" },
    { key: "payment", label: "Payment" },
  ];
  const idx = steps.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center justify-center gap-0 py-3 px-5">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i < idx
                  ? "bg-green-500 text-white"
                  : i === idx
                    ? "bg-brand-purple text-white"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i < idx ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span
              className={`text-[10px] mt-1 font-medium ${
                i === idx ? "text-brand-purple" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-12 h-0.5 mb-4 mx-1 transition-colors ${
                i < idx ? "bg-green-500" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function DrawerFooter() {
  return (
    <div className="flex-shrink-0" data-ocid="cart.panel">
      <div className="h-0.5 bg-saffron" />
      <div className="bg-brand-purple px-5 py-3 flex flex-col items-center gap-0.5">
        <p className="text-white font-bold text-sm tracking-wide">
          🥛 Nanaji Dudh Dairy
        </p>
        <p className="text-saffron text-xs font-semibold">+91 78209 57013</p>
        <p className="text-white/60 text-[10px]">
          © {new Date().getFullYear()} Nanaji Dudh Dairy. Fresh from the farm.
        </p>
      </div>
    </div>
  );
}

function AddressStepFooter() {
  return (
    <div
      className="mt-2 rounded-xl overflow-hidden border border-brand-purple/20"
      data-ocid="cart.panel"
    >
      <div className="h-0.5 bg-saffron" />
      <div className="bg-brand-purple px-4 py-3 flex flex-col items-center gap-1">
        <p className="text-white font-bold text-sm tracking-wide">
          🥛 Fresh from farm to your doorstep
        </p>
        <div className="flex items-center gap-1.5 text-saffron text-xs font-semibold">
          <Phone className="w-3 h-3" />
          <span>+91 78209 57013</span>
        </div>
        <p className="text-white/60 text-[10px] text-center">
          © {new Date().getFullYear()} Nanaji Dudh Dairy. All rights reserved.
        </p>
      </div>
    </div>
  );
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

  const [step, setStep] = useState<Step>("cart");
  const [copied, setCopied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [address, setAddress] = useState<AddressForm>({
    name: "",
    phone: "",
    pincode: "",
    townVillage: "",
    city: "",
    street: "",
    landmark: "",
  });
  const [vpHeight, setVpHeight] = useState<number>(
    typeof window !== "undefined" ? window.innerHeight : 800,
  );

  const addressScrollRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const paymentScrollRef = useRef<HTMLDivElement>(null);
  const [showPayScrollTop, setShowPayScrollTop] = useState(false);
  const [showPayScrollBottom, setShowPayScrollBottom] = useState(false);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => setVpHeight(vv.height + vv.offsetTop);
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally re-run when step changes
  useEffect(() => {
    const el = addressScrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      setShowScrollTop(el.scrollTop > 100);
      setShowScrollBottom(
        el.scrollTop + el.clientHeight < el.scrollHeight - 50,
      );
    };
    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [step]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally re-run when step or paymentMethod changes
  useEffect(() => {
    const el = paymentScrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      setShowPayScrollTop(el.scrollTop > 100);
      setShowPayScrollBottom(
        el.scrollTop + el.clientHeight < el.scrollHeight - 50,
      );
    };
    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [step, paymentMethod]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    toast.success("UPI ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddressNext = () => {
    if (!address.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!address.phone.trim() || address.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!address.pincode.trim() || address.pincode.length < 6) {
      toast.error("Please enter a valid 6-digit PIN code");
      return;
    }
    if (!address.city.trim()) {
      toast.error("Please enter your city");
      return;
    }
    if (!address.street.trim()) {
      toast.error("Please enter your street address");
      return;
    }
    setStep("payment");
  };

  const handlePlaceOrder = () => {
    window.open(
      buildWhatsAppUrl(items, totalAmount, address, paymentMethod),
      "_blank",
      "noopener,noreferrer",
    );
    clearCart();
    setStep("cart");
    setIsOpen(false);
    setAddress({
      name: "",
      phone: "",
      pincode: "",
      townVillage: "",
      city: "",
      street: "",
      landmark: "",
    });
    setPaymentMethod("upi");
    toast.success("Order sent to WhatsApp!");
  };

  const handleSheetClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) setStep("cart");
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetClose}>
      <SheetContent
        side="right"
        className="w-full max-w-md flex flex-col p-0 bg-white"
        data-ocid="cart.sheet"
      >
        <SheetHeader className="px-5 pt-5 pb-0 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-brand-purple font-display pb-3">
            {step === "address" && (
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="mr-1 text-muted-foreground hover:text-brand-purple"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {step === "payment" && (
              <button
                type="button"
                onClick={() => setStep("address")}
                className="mr-1 text-muted-foreground hover:text-brand-purple"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {step === "cart" && <ShoppingCart className="w-5 h-5" />}
            {step === "address" && <MapPin className="w-5 h-5" />}
            {step === "payment" && <Wallet className="w-5 h-5" />}
            {step === "cart"
              ? "Your Cart"
              : step === "address"
                ? "Delivery Address"
                : "Payment Method"}
            {step === "cart" && items.length > 0 && (
              <span className="ml-auto text-sm font-normal text-muted-foreground">
                {items.length} item{items.length > 1 ? "s" : ""}
              </span>
            )}
          </SheetTitle>
          {items.length > 0 && <StepIndicator current={step} />}
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
        ) : step === "cart" ? (
          <ScrollArea className="flex-1">
            <div className="px-5 py-4 space-y-4">
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

              <div className="flex items-center justify-between py-1">
                <span className="font-display font-bold text-lg text-foreground">
                  Total
                </span>
                <span className="font-display font-bold text-2xl text-brand-purple">
                  ₹{totalAmount}
                </span>
              </div>

              <Button
                onClick={() => setStep("address")}
                className="w-full bg-brand-purple hover:bg-brand-purple-light text-white rounded-xl py-6 font-bold text-base gap-2"
                data-ocid="cart.submit_button"
              >
                <MapPin className="w-5 h-5" />
                Proceed to Delivery Address
              </Button>

              <div className="text-center pb-2">
                <button
                  type="button"
                  onClick={() => clearCart()}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors underline underline-offset-2"
                  data-ocid="cart.delete_button"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </ScrollArea>
        ) : step === "address" ? (
          /* Address step: fields scroll, submit button always visible at bottom */
          <div
            className="flex flex-col flex-1 min-h-0 relative"
            style={{ maxHeight: `calc(${vpHeight}px - 120px)` }}
          >
            {/* Scrollable fields area */}
            <div
              ref={addressScrollRef}
              className="overflow-y-auto flex-1 min-h-0 px-5 py-4 space-y-4"
              style={
                { WebkitOverflowScrolling: "touch" } as React.CSSProperties
              }
            >
              <p className="text-sm text-muted-foreground">
                We'll deliver to this address and share it on WhatsApp.
              </p>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs font-semibold text-foreground mb-1 block">
                    Full Name *
                  </Label>
                  <Input
                    placeholder="Your full name"
                    value={address.name}
                    onChange={(e) =>
                      setAddress((a) => ({ ...a, name: e.target.value }))
                    }
                    className="rounded-xl"
                    data-ocid="cart.input"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-foreground mb-1 block">
                    Phone Number *
                  </Label>
                  <Input
                    placeholder="10-digit mobile number"
                    type="tel"
                    maxLength={10}
                    value={address.phone}
                    onChange={(e) =>
                      setAddress((a) => ({
                        ...a,
                        phone: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    className="rounded-xl"
                    data-ocid="cart.input"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-foreground mb-1 block">
                    PIN Code *
                  </Label>
                  <Input
                    placeholder="6-digit PIN code"
                    maxLength={6}
                    value={address.pincode}
                    onChange={(e) =>
                      setAddress((a) => ({
                        ...a,
                        pincode: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    className="rounded-xl"
                    data-ocid="cart.input"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-foreground mb-1 block">
                    Town / Village
                  </Label>
                  <Input
                    placeholder="Town or village name"
                    value={address.townVillage}
                    onChange={(e) =>
                      setAddress((a) => ({ ...a, townVillage: e.target.value }))
                    }
                    className="rounded-xl"
                    data-ocid="cart.input"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-foreground mb-1 block">
                    City *
                  </Label>
                  <Input
                    placeholder="City"
                    value={address.city}
                    onChange={(e) =>
                      setAddress((a) => ({ ...a, city: e.target.value }))
                    }
                    className="rounded-xl"
                    data-ocid="cart.input"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-foreground mb-1 block">
                    Street Address *
                  </Label>
                  <Input
                    placeholder="House no., street, area"
                    value={address.street}
                    onChange={(e) =>
                      setAddress((a) => ({ ...a, street: e.target.value }))
                    }
                    className="rounded-xl"
                    data-ocid="cart.input"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-foreground mb-1 block">
                    Landmark
                  </Label>
                  <Input
                    placeholder="Near temple, school, etc. (optional)"
                    value={address.landmark}
                    onChange={(e) =>
                      setAddress((a) => ({ ...a, landmark: e.target.value }))
                    }
                    className="rounded-xl"
                    data-ocid="cart.input"
                    onFocus={() => {
                      setTimeout(() => {
                        document
                          .getElementById("address-submit")
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest",
                          });
                      }, 400);
                    }}
                  />
                </div>
              </div>

              {/* Address page inline footer */}
              <div className="pb-4">
                <AddressStepFooter />
              </div>
            </div>

            {/* Submit button — always visible, outside the scroll area */}
            <div
              id="address-submit"
              className="flex-shrink-0 px-5 py-3 border-t border-border bg-white"
            >
              <Button
                onClick={handleAddressNext}
                className="w-full bg-brand-purple hover:bg-brand-purple-light text-white rounded-xl py-6 font-bold text-base gap-2"
                data-ocid="cart.submit_button"
              >
                <Wallet className="w-5 h-5" />
                Continue to Payment
              </Button>
            </div>

            {/* Floating scroll buttons */}
            {showScrollTop && (
              <button
                type="button"
                onClick={() =>
                  addressScrollRef.current?.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="absolute right-4 bottom-36 z-10 w-9 h-9 rounded-full bg-brand-purple text-white shadow-lg flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                aria-label="Scroll to top"
                data-ocid="cart.toggle"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            )}
            {showScrollBottom && (
              <button
                type="button"
                onClick={() =>
                  addressScrollRef.current?.scrollTo({
                    top: addressScrollRef.current.scrollHeight,
                    behavior: "smooth",
                  })
                }
                className="absolute right-4 bottom-24 z-10 w-9 h-9 rounded-full bg-brand-purple text-white shadow-lg flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                aria-label="Scroll to bottom"
                data-ocid="cart.toggle"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            )}
          </div>
        ) : (
          /* Payment Step — scrollable with floating buttons, Place Order pinned at bottom */
          <div
            className="flex flex-col flex-1 min-h-0 relative"
            style={{ maxHeight: `calc(${vpHeight}px - 120px)` }}
          >
            {/* Scrollable payment content */}
            <div
              ref={paymentScrollRef}
              className="overflow-y-auto flex-1 min-h-0 px-5 py-4 space-y-4"
              style={
                { WebkitOverflowScrolling: "touch" } as React.CSSProperties
              }
            >
              <p className="text-sm text-muted-foreground">
                Choose how you'd like to pay for your order.
              </p>

              {/* Payment Options */}
              <div className="space-y-3">
                {/* UPI */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === "upi"
                      ? "border-brand-purple bg-brand-purple/5"
                      : "border-border bg-white hover:border-brand-purple/40"
                  }`}
                  data-ocid="cart.toggle"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      paymentMethod === "upi"
                        ? "bg-brand-purple"
                        : "bg-section-bg"
                    }`}
                  >
                    <Wallet
                      className={`w-5 h-5 ${paymentMethod === "upi" ? "text-white" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">
                      UPI Payment
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Google Pay, PhonePe, Paytm
                    </p>
                  </div>
                  {paymentMethod === "upi" && (
                    <Check className="w-5 h-5 text-brand-purple" />
                  )}
                </button>

                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === "cod"
                      ? "border-brand-purple bg-brand-purple/5"
                      : "border-border bg-white hover:border-brand-purple/40"
                  }`}
                  data-ocid="cart.toggle"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      paymentMethod === "cod"
                        ? "bg-brand-purple"
                        : "bg-section-bg"
                    }`}
                  >
                    <Truck
                      className={`w-5 h-5 ${paymentMethod === "cod" ? "text-white" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Pay when you receive the order
                    </p>
                  </div>
                  {paymentMethod === "cod" && (
                    <Check className="w-5 h-5 text-brand-purple" />
                  )}
                </button>

                {/* Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === "card"
                      ? "border-brand-purple bg-brand-purple/5"
                      : "border-border bg-white hover:border-brand-purple/40"
                  }`}
                  data-ocid="cart.toggle"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      paymentMethod === "card"
                        ? "bg-brand-purple"
                        : "bg-section-bg"
                    }`}
                  >
                    <CreditCard
                      className={`w-5 h-5 ${paymentMethod === "card" ? "text-white" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">
                      Card Payment
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Debit or credit card
                    </p>
                  </div>
                  {paymentMethod === "card" && (
                    <Check className="w-5 h-5 text-brand-purple" />
                  )}
                </button>
              </div>

              {/* UPI QR Code if UPI selected */}
              {paymentMethod === "upi" && totalAmount > 0 && (
                <div className="bg-white rounded-2xl border border-border p-4 space-y-3">
                  <h4 className="font-display font-bold text-center text-foreground text-sm">
                    Scan to pay ₹{totalAmount}
                  </h4>
                  <div className="flex items-center gap-2 bg-section-bg rounded-xl px-3 py-2">
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
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-border/50">
                      <img
                        src={buildQrImageUrl(totalAmount)}
                        alt={`UPI QR code for \u20b9${totalAmount}`}
                        width={160}
                        height={160}
                        className="rounded"
                      />
                    </div>
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

              {/* Order Summary */}
              <div className="bg-section-bg rounded-xl p-3">
                <p className="text-xs font-semibold text-muted-foreground mb-2">
                  ORDER SUMMARY
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">Total Amount</span>
                  <span className="font-bold text-brand-purple">
                    ₹{totalAmount}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Delivery to</span>
                  <span className="truncate ml-2 text-right max-w-[180px]">
                    {address.city}
                    {address.pincode ? ` - ${address.pincode}` : ""}
                  </span>
                </div>
              </div>

              <div className="text-center pb-4">
                <p className="text-xs text-muted-foreground">
                  Your order details, address, and payment method will be sent
                  to our WhatsApp for confirmation.
                </p>
              </div>
            </div>

            {/* Place Order button — always visible, pinned at bottom */}
            <div className="flex-shrink-0 px-5 py-3 border-t border-border bg-white">
              <Button
                onClick={handlePlaceOrder}
                className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white rounded-xl py-6 font-bold text-base gap-2"
                data-ocid="cart.submit_button"
              >
                <SiWhatsapp className="w-5 h-5" />
                Place Order on WhatsApp
              </Button>
            </div>

            {/* Floating scroll buttons */}
            {showPayScrollTop && (
              <button
                type="button"
                onClick={() =>
                  paymentScrollRef.current?.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="absolute right-4 bottom-36 z-10 w-9 h-9 rounded-full bg-brand-purple text-white shadow-lg flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                aria-label="Scroll to top"
                data-ocid="cart.toggle"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            )}
            {showPayScrollBottom && (
              <button
                type="button"
                onClick={() =>
                  paymentScrollRef.current?.scrollTo({
                    top: paymentScrollRef.current.scrollHeight,
                    behavior: "smooth",
                  })
                }
                className="absolute right-4 bottom-24 z-10 w-9 h-9 rounded-full bg-brand-purple text-white shadow-lg flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                aria-label="Scroll to bottom"
                data-ocid="cart.toggle"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <DrawerFooter />
      </SheetContent>
    </Sheet>
  );
}

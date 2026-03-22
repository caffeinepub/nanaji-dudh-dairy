import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useSubmitContact } from "../hooks/useQueries";

const WA_NUMBER = "917820957013";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello Nanaji Dudh Dairy! I'd like to place an order or have a query.")}`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        setSubmitted(true);
        toast.success("Message sent! We'll get back to you soon.");
        setForm({ name: "", phone: "", message: "" });
      },
      onError: () => {
        toast.error("Something went wrong. Please try WhatsApp instead.");
      },
    });
  };

  return (
    <main className="min-h-screen bg-section-bg">
      {/* Page Header */}
      <section className="bg-brand-purple py-14">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              Contact Us
            </h1>
            <p className="text-white/70 text-lg">
              We're just a message away — reach us on WhatsApp!
            </p>
          </motion.div>
        </div>
        <div className="h-1 bg-saffron mt-8" />
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* WhatsApp Highlight */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-whatsapp rounded-2xl p-8 text-white shadow-card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <SiWhatsapp className="w-10 h-10" />
                  <div>
                    <h2 className="font-display font-bold text-2xl">
                      Order on WhatsApp
                    </h2>
                    <p className="text-white/80 text-sm">
                      Fastest way to place your order
                    </p>
                  </div>
                </div>
                <p className="text-3xl font-bold mb-2 tracking-wide">
                  +91 78209 57013
                </p>
                <p className="text-white/80 text-sm mb-5">
                  Send us a message with your order details and we'll confirm
                  immediately.
                </p>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.primary_button"
                >
                  <Button className="bg-white text-whatsapp hover:bg-white/90 font-bold rounded-full px-8 gap-2">
                    <SiWhatsapp className="w-4 h-4" />
                    Open WhatsApp Now
                  </Button>
                </a>
              </motion.div>

              {/* Contact Details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl p-6 shadow-card space-y-5"
              >
                <h3 className="font-display font-bold text-xl text-brand-purple mb-4">
                  Get in Touch
                </h3>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Phone / WhatsApp
                    </p>
                    <a
                      href="tel:+917820957013"
                      className="text-brand-purple font-bold hover:underline"
                    >
                      +91 78209 57013
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Address
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Nanaji Dudh Dairy, Village Road,
                      <br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-brand-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Delivery Hours
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Morning: 6:00 AM – 9:00 AM
                      <br />
                      Evening: 5:00 PM – 7:00 PM
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-brand-purple/5 border border-brand-purple/20 rounded-2xl overflow-hidden h-48 flex items-center justify-center"
              >
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-brand-purple/40 mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">
                    Maharashtra, India
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-purple text-sm font-medium hover:underline mt-1 inline-block"
                    data-ocid="contact.link"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-card"
            >
              <h2 className="font-display font-bold text-2xl text-brand-purple mb-2">
                Send us a Message
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Fill the form or order directly on WhatsApp for faster response.
              </p>

              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center py-16 text-center"
                  data-ocid="contact.success_state"
                >
                  <CheckCircle className="w-16 h-16 text-whatsapp mb-4" />
                  <h3 className="font-display font-bold text-xl text-brand-purple mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We'll contact you shortly. For faster service, reach us on
                    WhatsApp.
                  </p>
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.primary_button"
                  >
                    <Button className="bg-whatsapp text-white hover:bg-whatsapp/90 rounded-full gap-2">
                      <SiWhatsapp className="w-4 h-4" />
                      Chat on WhatsApp
                    </Button>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-3 text-sm text-muted-foreground hover:text-brand-purple underline"
                    data-ocid="contact.secondary_button"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. Ramesh Kumar"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      className="rounded-xl"
                      data-ocid="contact.input"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-foreground"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      required
                      className="rounded-xl"
                      data-ocid="contact.input"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-foreground"
                    >
                      Message / Order Details
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="I'd like to order 2 litres of buffalo milk and 500g ghee..."
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      required
                      rows={5}
                      className="rounded-xl resize-none"
                      data-ocid="contact.textarea"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-brand-purple hover:bg-brand-purple-light text-white rounded-full py-5 font-semibold gap-2"
                    data-ocid="contact.submit_button"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs text-muted-foreground bg-white px-3">
                      or
                    </div>
                  </div>

                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.secondary_button"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white rounded-full py-5 font-semibold gap-2 transition-colors"
                    >
                      <SiWhatsapp className="w-4 h-4" />
                      Message us on WhatsApp
                    </Button>
                  </a>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

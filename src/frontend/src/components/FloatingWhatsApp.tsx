import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

const WA_NUMBER = "917820957013";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello! I'd like to place an order for Nanaji Dudh Dairy products.")}`;

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      data-ocid="floating.button"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-whatsapp rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
    >
      <SiWhatsapp className="w-7 h-7 text-white" />
    </motion.a>
  );
}

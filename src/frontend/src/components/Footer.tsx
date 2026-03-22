import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Milk, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

const WA_NUMBER = "917820957013";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-purple text-white">
      {/* Saffron accent line */}
      <div className="h-1 bg-saffron" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Milk className="w-5 h-5 text-saffron" />
              </div>
              <div>
                <p className="font-display font-bold text-lg leading-none">
                  Nanaji
                </p>
                <p className="text-[10px] text-white/60 tracking-widest uppercase leading-none">
                  Dudh Dairy
                </p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Pure buffalo dairy products delivered fresh from our farm to your
              family. Trusted quality since generations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-saffron mb-4 tracking-wide uppercase text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                  data-ocid="footer.link"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                  data-ocid="footer.link"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                  data-ocid="footer.link"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                  data-ocid="footer.link"
                >
                  Order on WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-saffron mb-4 tracking-wide uppercase text-sm">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+917820957013"
                  className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-saffron" />
                  +91 78209 57013
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-saffron mt-0.5 shrink-0" />
                <span>Nanaji Dudh Dairy, Village Road, Maharashtra, India</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-whatsapp flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
                data-ocid="footer.link"
              >
                <SiWhatsapp className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
                data-ocid="footer.link"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
                data-ocid="footer.link"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-white/50 text-sm">
            © {year}. Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              className="underline hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

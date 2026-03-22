import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Products from "./pages/Products";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <FloatingWhatsApp />
      <Toaster position="top-right" />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: Products,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  contactRoute,
]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

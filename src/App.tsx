import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./Pages/Home";
import AboutPage from "./Pages/About";
import ProductsPage from "./Pages/ProductsPage";
import ContactPage from "./Pages/Contact";
import SustainableBeekeeping from "./Pages/SustainableBeekeeping";
import HoneyProcessing from "./Pages/HoneyProcessing";
import TrainingEducation from "./Pages/TrainingEducation";
import HivesManagement from "./Pages/HivesManagement";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";

export type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  alt: string;
  quantity: number;
};

const AnimatedRoutes = ({
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
}: {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
}) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="flex-grow"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/products"
            element={<ProductsPage addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            }
          />
          <Route path="/checkout" element={<CheckoutPage cartItems={cart} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/sustainable-beekeeping"
            element={<SustainableBeekeeping />}
          />
          <Route
            path="/pure-honey-and-bee-products"
            element={<HoneyProcessing />}
          />
          <Route
            path="/training-and-education"
            element={<TrainingEducation />}
          />
          <Route path="/hives-management" element={<HivesManagement />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const index = cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      const updated = [...cart];
      updated[index].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const totalCartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#2f2f2f] text-white">
        <Header cartCount={totalCartQuantity} />
        <main className="flex-grow pt-20">
          <AnimatedRoutes
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

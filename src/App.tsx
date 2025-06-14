// src/App.tsx
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Product } from "./types";

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
import LoginPage from "./Pages/LoginPage";
import MyOrdersPage from "./Pages/MyOrdersPage";
import SignupPage from "./Pages/SignupPage";
import LogoutPage from "./Pages/LogoutPage";

const db = getFirestore();

const AnimatedRoutes = ({
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
  setCart,
}: {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
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
          <Route
            path="/checkout"
            element={<CheckoutPage cartItems={cart} setCartItems={setCart} />}
          />
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<LogoutPage setCart={setCart} />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const cartRef = doc(db, "carts", user.uid);
        const snapshot = await getDoc(cartRef);
        const firebaseCart = snapshot.exists()
          ? snapshot.data().items || []
          : [];
        setCart(firebaseCart);
      } else {
        const local = localStorage.getItem("guestCart");
        setCart(local ? JSON.parse(local) : []);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const cartRef = doc(db, "carts", user.uid);
      setDoc(cartRef, { items: cart });
    } else {
      localStorage.setItem("guestCart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const totalCartQuantity = cart.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

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
            setCart={setCart}
          />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

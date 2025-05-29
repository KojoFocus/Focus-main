import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

interface HeaderProps {
  cartCount: number;
}

const Header = ({ cartCount }: HeaderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        hasScrolled
          ? "bg-[#2f2f2f]/70 backdrop-blur-md shadow-md"
          : "bg-transparent backdrop-blur-md"
      }`}
    >
      <nav className="flex items-center justify-between px-6 py-4 lg:px-12">
        {/* Left: Menu */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-white hover:bg-white/10 rounded-md transition"
        >
          <Bars3Icon className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </button>

        {/* Center: Logo */}
        <Link to="/" className="flex-1 flex justify-center">
          <img
            src="/images/logo.png"
            alt="Focus Honey Logo"
            className={`transition-all duration-300 ${
              hasScrolled ? "h-12" : "h-16"
            }`}
          />
        </Link>

        {/* Right: Cart */}
        <div className="relative">
          <Link
            to="/cart"
            className="p-2 text-white hover:bg-white/10 rounded-md inline-flex transition"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#f5d08c] text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Sidebar & Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-[#1c1c1c] shadow-2xl"
              style={{ height: "100vh" }}
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <img src="/images/logo.png" alt="Logo" className="h-8" />
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-white"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4 space-y-3">
                {["Home", "About", "Products", "Cart", "Contact"].map(
                  (item) => {
                    const path =
                      item === "Home" ? "/" : `/${item.toLowerCase()}`;
                    return (
                      <Link
                        key={item}
                        to={path}
                        onClick={() => setIsSidebarOpen(false)}
                        className="block px-4 py-2 rounded-md text-white font-medium hover:bg-white/10 transition"
                      >
                        {item}
                      </Link>
                    );
                  }
                )}

                <Link
                  to="/products"
                  onClick={() => setIsSidebarOpen(false)}
                  className="block text-center mt-4 bg-[#f5d08c] hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-md shadow transition"
                >
                  Shop Now
                </Link>
              </div>
            </motion.aside>

            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

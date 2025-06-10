import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface HeaderProps {
  cartCount: number;
}

const Header = ({ cartCount }: HeaderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [userInitials, setUserInitials] = useState<string | null>(null);

  const auth = getAuth();

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const initials = user.displayName
          ? user.displayName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
          : user.email?.[0].toUpperCase() || "?";
        setUserInitials(initials);
      } else {
        setUserInitials(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        hasScrolled
          ? "bg-[#2f2f2f]/70 backdrop-blur-md shadow-md"
          : "bg-transparent backdrop-blur-md"
      }`}
    >
      <nav className="relative flex items-center justify-between px-6 py-4 lg:px-12">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-white hover:bg-white/10 rounded-md transition"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <div className="absolute left-1/2 transform -translate-x-1/2 pt-4 pb-1">
          <Link to="/" className="inline-block">
            <img
              src="/images/logo.png"
              alt="Focus Honey Logo"
              className={`transition-all duration-300 ${
                hasScrolled ? "h-12" : "h-16"
              }`}
            />
          </Link>
        </div>

        <div className="relative">
          <Link
            to="/cart"
            className="p-2 text-white hover:bg-white/10 rounded-md inline-flex transition relative"
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

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Sidebar - appears above overlay */}
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
                {[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/about" },
                  { name: "Products", path: "/products" },
                  { name: "Cart", path: "/cart" },
                  { name: "My Orders", path: "/my-orders" },
                  { name: "Contact", path: "/contact" },
                ].map(({ name, path }) => {
                  const isCart = name === "Cart";
                  return (
                    <div key={name} className="relative">
                      <Link
                        to={path}
                        onClick={() => setIsSidebarOpen(false)}
                        className="block px-4 py-2 rounded-md text-white font-medium hover:bg-white/10 transition"
                      >
                        {name}
                      </Link>
                      {isCart && cartCount > 0 && (
                        <span className="absolute top-2 right-4 bg-[#f5d08c] text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                          {cartCount}
                        </span>
                      )}
                    </div>
                  );
                })}

                <Link
                  to="/products"
                  onClick={() => setIsSidebarOpen(false)}
                  className="block text-center mt-4 bg-[#f5d08c] hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-md shadow transition"
                >
                  Shop Now
                </Link>

                {userInitials && (
                  <Link
                    to="/logout"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block text-center mt-2 bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md shadow transition"
                  >
                    Logout
                  </Link>
                )}
              </div>
            </motion.aside>

            {/* Overlay - closes sidebar on outside click */}
            <motion.div
              key="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60"
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types";

interface ProductsPageProps {
  addToCart: (product: Product) => void;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Raw Honey - 500ml",
    price: "Ghc 50",
    image: "/images/hero1.png",
    alt: "Raw Honey",
    quantity: 0,
  },
  {
    id: 2,
    name: "Ginger Infused Honey",
    price: "Ghc 60",
    image: "/images/p2.png",
    alt: "Ginger Honey",
    quantity: 0,
  },
  {
    id: 3,
    name: "Hibiscus Honey - 250ml",
    price: "Ghc 45",
    image: "/images/p2.png",
    alt: "Hibiscus Honey",
    quantity: 0,
  },
];

const ProductsPage = ({ addToCart }: ProductsPageProps) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setToastMessage(`${product.name} added to cart!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="bg-gradient-to-b from-[#1f1f1f] to-[#2f2f2f] text-white min-h-screen pb-24 relative"
    >
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed top-5 right-5 bg-[#f5d08c] text-gray-900 px-4 py-2 rounded-md shadow-lg z-50 text-sm font-medium"
        >
          {toastMessage}
        </motion.div>
      )}

      <h2 className="text-3xl font-semibold text-center pt-28 pb-10">
        Our Products
      </h2>

      <div className="px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col"
            >
              <div className="bg-gradient-to-br from-[#2c2c2c] to-[#1b1b1b] ring-1 ring-[#f5d08c]/40 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="w-32 h-32 object-cover rounded-md border border-[#f5d08c]/40"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <div className="text-left w-full">
                    <h3 className="text-lg font-semibold mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xl font-medium text-[#f5d08c]">
                      {product.price}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="bg-[#f5d08c] hover:bg-yellow-500 text-gray-900 font-semibold text-sm px-4 py-2 rounded-md transition"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="border border-[#f5d08c] text-[#f5d08c] hover:bg-[#f5d08c] hover:text-gray-900 font-semibold text-sm px-4 py-2 rounded-md transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsPage;

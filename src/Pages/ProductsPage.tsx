import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  alt: string;
  quantity: number;
};

interface ProductsPageProps {
  addToCart: (product: Product) => void;
}

const products: Product[] = [
  {
    id: 1,
    name: "Golden Blossom Honey",
    price: "Ghc 100",
    image: "/images/hero1.png",
    alt: "Golden Blossom Honey",
    quantity: 0,
  },
  {
    id: 2,
    name: "Wild Forest Honey",
    price: "Ghc 120",
    image: "/images/p2.png",
    alt: "Wild Forest Honey",
    quantity: 0,
  },
  {
    id: 3,
    name: "Organic Acacia Honey",
    price: "Ghc 100",
    image: "/images/hero1.png",
    alt: "Organic Acacia Honey",
    quantity: 0,
  },
  {
    id: 4,
    name: "Manuka Blend Honey",
    price: "Ghc 120",
    image: "/images/p2.png",
    alt: "Manuka Blend Honey",
    quantity: 0,
  },
  {
    id: 5,
    name: "Sunflower Creamed Honey",
    price: "Ghc 100",
    image: "/images/hero1.png",
    alt: "Sunflower Creamed Honey",
    quantity: 0,
  },
  {
    id: 6,
    name: "Tropical Wildflower Honey",
    price: "Ghc 120",
    image: "/images/p2.png",
    alt: "Tropical Wildflower Honey",
    quantity: 0,
  },
  {
    id: 7,
    name: "Premium Clover Honey",
    price: "Ghc 100",
    image: "/images/hero1.png",
    alt: "Premium Clover Honey",
    quantity: 0,
  },
  {
    id: 8,
    name: "Buckwheat Dark Honey",
    price: "Ghc 120",
    image: "/images/p2.png",
    alt: "Buckwheat Dark Honey",
    quantity: 0,
  },
];

const ProductsPage = ({ addToCart }: ProductsPageProps) => {
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeNotification, setActiveNotification] = useState<{
    productId: number | null;
    message: string;
  }>({ productId: null, message: "" });

  const handleSearch = (query: string) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const redirectToWhatsApp = (productName: string) => {
    const message = encodeURIComponent(
      `Hello! I want ${productName}.\n\nQuantity: \nDelivery Address: \nContact Number: `
    );
    window.open(`https://wa.me/+233540484052?text=${message}`, "_blank");
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setActiveNotification({
      productId: product.id,
      message: `1 ${product.name} added to cart!`,
    });

    setTimeout(() => {
      setActiveNotification({ productId: null, message: "" });
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="bg-gradient-to-b from-[#4f4f4f] to-[#2f2f2f] text-white min-h-screen pb-24 relative"
    >
      <header className="relative z-40 pb-4">
        <Header cartCount={0} />
      </header>

      <SearchBar onSearch={handleSearch} />

      <div className="mt-10 px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
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
                          onClick={() => redirectToWhatsApp(product.name)}
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

                {activeNotification.productId === product.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-2 bg-[#f5d08c] text-gray-900 px-4 py-2 rounded-md shadow flex items-center justify-between text-sm font-medium"
                  >
                    <span>{activeNotification.message}</span>
                    <button
                      onClick={() => navigate("/cart")}
                      className="ml-4 underline hover:text-gray-700"
                    >
                      View Cart
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-400 text-sm mt-12">
              No products found.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsPage;

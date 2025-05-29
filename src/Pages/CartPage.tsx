import { motion } from "framer-motion";

type CartItem = {
  id: number;
  name: string;
  price: string;
  image: string;
  alt: string;
  quantity: number;
};

interface CartPageProps {
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const CartPage = ({
  cartItems,
  removeFromCart,
  updateQuantity,
}: CartPageProps) => {
  const calculateTotal = (): number => {
    return cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.price.replace("Ghc ", "")) * item.quantity,
      0
    );
  };

  return (
    <div className="bg-[#2f2f2f] text-white min-h-screen pb-20 pt-40">
      <div className="container mx-auto px-6 space-y-12">
        <h2 className="text-4xl font-semibold text-center mb-8">Your Cart</h2>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#2c2c2c] to-[#1b1b1b] ring-1 ring-[#f5d08c]/40 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-32 h-32 object-cover rounded-md border border-[#f5d08c]/40"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <div className="text-left w-full">
                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                    <p className="text-[#f5d08c] font-semibold text-base">
                      Price: Ghc {parseFloat(item.price.replace("Ghc ", ""))}
                    </p>
                    <div className="mt-4 flex items-center flex-wrap gap-3">
                      <button
                        className="bg-[#f5d08c] hover:bg-yellow-500 text-gray-900 font-semibold text-sm px-3 py-2 rounded-md transition"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        className="bg-[#f5d08c] hover:bg-yellow-500 text-gray-900 font-semibold text-sm px-3 py-2 rounded-md transition"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        className="ml-2 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm px-3 py-2 rounded-md transition"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="col-span-3 text-center text-gray-400 text-sm mt-12">
            Your cart is empty.
          </p>
        )}

        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto mt-10 px-6"
          >
            <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>
                    Ghc{" "}
                    {parseFloat(item.price.replace("Ghc ", "")) * item.quantity}
                  </span>
                </li>
              ))}
              <li className="flex justify-between font-bold border-t border-[#f5d08c]/40 pt-4">
                <span>Total:</span>
                <span>Ghc {calculateTotal()}</span>
              </li>
            </ul>
            <div className="mt-6 text-center">
              <button
                className="inline-flex items-center bg-[#f5d08c] hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-md transition"
                onClick={() => {
                  const phoneNumber = "+233540484052";
                  let message = `Hello! I want:\n\n`;
                  cartItems.forEach((item) => {
                    message += `${item.quantity} x ${item.name}\n`;
                  });
                  message += `\nTotal: Ghc ${calculateTotal()}\n\n`;
                  message += "Delivery Address: \nContact Number: ";
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                    message
                  )}`;
                  window.open(whatsappUrl, "_blank");
                }}
              >
                Checkout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

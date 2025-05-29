import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type CartItem = {
  id: number;
  name: string;
  price: string;
  image: string;
  alt: string;
  quantity: number;
};

interface CheckoutPageProps {
  cartItems: CartItem[];
}

const CheckoutPage = ({ cartItems }: CheckoutPageProps) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const total = cartItems.reduce(
    (sum, item) =>
      sum + parseFloat(item.price.replace("Ghc ", "")) * item.quantity,
    0
  );

  const handleSubmit = () => {
    if (!name || !phone || !address) return alert("Please fill all fields");

    const message = `
Hello! I want to place an order.

🛒 Items:
${cartItems
  .map((item) => `- ${item.quantity} x ${item.name}`)
  .join("\n")}

📦 Total: Ghc ${total}
👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}
📝 Note: ${note || "N/A"}
`;

    const url = `https://wa.me/+233540484052?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#2f2f2f] text-white min-h-screen pt-40 pb-24 px-6 lg:px-12"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Delivery Details
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          <div>
            <label className="block mb-1 text-sm text-white/80">Full Name</label>
            <input
              type="text"
              className="w-full bg-[#1c1c1c] border border-[#f5d08c]/40 px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#f5d08c]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/80">Phone Number</label>
            <input
              type="tel"
              className="w-full bg-[#1c1c1c] border border-[#f5d08c]/40 px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#f5d08c]"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/80">Delivery Address</label>
            <textarea
              className="w-full bg-[#1c1c1c] border border-[#f5d08c]/40 px-4 py-3 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#f5d08c]"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/60">Order Note (optional)</label>
            <textarea
              className="w-full bg-[#1c1c1c] border border-white/10 px-4 py-3 rounded-md text-white resize-none focus:outline-none"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              className="inline-flex items-center bg-[#f5d08c] hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-md transition"
            >
              Confirm Order on WhatsApp
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
        </form>

        <p
          onClick={() => navigate("/cart")}
          className="mt-6 text-center text-sm text-[#f5d08c] underline cursor-pointer"
        >
          Go back to Cart
        </p>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;

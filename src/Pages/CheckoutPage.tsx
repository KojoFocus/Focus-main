import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { clearCartInFirebase } from "../utils/firebaseCart";
import { toast } from "react-hot-toast";
import type { Product } from "../types";

interface CheckoutPageProps {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CheckoutPage = ({ cartItems, setCartItems }: CheckoutPageProps) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid || "guest";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => {
    const price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace("Ghc ", ""))
        : item.price;
    return sum + price * item.quantity;
  }, 0);

  const generateWhatsAppMessage = () => {
    let message = `📦 *Focus Honey Order*\n=======================\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    message += `🏠 *Address:* ${address}\n`;
    message += `📝 *Note:* ${note || "N/A"}\n\n`;
    message += `🧴 *Items:*\n`;
    cartItems.forEach((item) => {
      const price =
        typeof item.price === "string"
          ? parseFloat(item.price.replace("Ghc ", ""))
          : item.price;
      message += `• ${item.name} x${item.quantity} — Ghc ${(
        price * item.quantity
      ).toFixed(2)}\n`;
    });
    message += `\n💰 *Total:* Ghc ${totalPrice.toFixed(
      2
    )}\n\n✅ Thank you for choosing Focus Honey!`;
    return encodeURIComponent(message);
  };

  const handleSubmit = () => {
    if (!name || !phone || !address) {
      toast.error("Please fill all fields.");
      return;
    }

    setShowConfirmation(true);
  };

  const confirmOrder = async () => {
    try {
      const orderPayload = {
        userId,
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.quantity,
          price:
            typeof item.price === "string"
              ? parseFloat(item.price.replace("Ghc ", ""))
              : item.price,
          image: item.image,
          product: item.id,
        })),
        shippingAddress: {
          name,
          phone,
          address,
          note: note || "N/A",
        },
        paymentMethod: "WhatsApp",
        totalPrice,
        createdAt: serverTimestamp(),
        status: "Pending Confirmation",
      };

      await addDoc(collection(db, "orders"), orderPayload);

      toast.success(
        "Your order has been recorded. Please complete it via WhatsApp.",
        {
          style: {
            background: "#1c1c1c",
            color: "#f5d08c",
            border: "1px solid #f5d08c",
          },
        }
      );

      setCartItems([]);
      await clearCartInFirebase(userId);
      localStorage.removeItem(`focusCart-${userId}`);

      const message = generateWhatsAppMessage();
      window.location.href = `https://wa.me/233540484052?text=${message}`;
    } catch (err) {
      console.error(err);
      toast.error("Failed to confirm order.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#2f2f2f] text-white min-h-screen pt-28 pb-20 px-4 sm:px-6 md:px-10 lg:px-12"
    >
      <div className="w-full max-w-lg mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 sm:mb-8">
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
            <label className="block mb-1 text-sm text-white/80">
              Full Name
            </label>
            <input
              type="text"
              className="w-full bg-[#1c1c1c] border border-[#f5d08c]/40 px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#f5d08c]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/80">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full bg-[#1c1c1c] border border-[#f5d08c]/40 px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#f5d08c]"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/80">
              Delivery Address
            </label>
            <textarea
              className="w-full bg-[#1c1c1c] border border-[#f5d08c]/40 px-4 py-3 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#f5d08c]"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/60">
              Order Note (optional)
            </label>
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
              Submit Order
            </button>
          </div>
        </form>

        {showConfirmation && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2f2f2f] border border-[#f5d08c]/20 rounded-xl p-6 w-full max-w-md text-white overflow-y-auto max-h-[90vh]">
              <h3 className="text-lg font-bold text-[#f5d08c] mb-4 text-center">
                Confirm Your Order
              </h3>
              <div className="text-sm text-white/90 space-y-4 mb-6">
                <div className="border border-[#f5d08c]/20 rounded-lg p-4 bg-[#1c1c1c]/60">
                  <h4 className="text-[#f5d08c] font-bold mb-2">
                    Delivery Info
                  </h4>
                  <p>
                    <span className="font-semibold">Name:</span> {name}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span> {phone}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span> {address}
                  </p>
                  <p>
                    <span className="font-semibold">Note:</span> {note || "N/A"}
                  </p>
                </div>
                <div className="border border-[#f5d08c]/20 rounded-lg p-4 bg-[#1c1c1c]/60">
                  <h4 className="text-[#f5d08c] font-bold mb-2">
                    Order Summary
                  </h4>
                  <ul className="space-y-1 list-disc list-inside text-white/80">
                    {cartItems.map((item, i) => {
                      const price =
                        typeof item.price === "string"
                          ? parseFloat(item.price.replace("Ghc ", ""))
                          : item.price;
                      return (
                        <li key={i}>
                          {item.name} x{item.quantity} — Ghc{" "}
                          {(price * item.quantity).toFixed(2)}
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-3 font-semibold text-white">
                    Total: Ghc {totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmOrder}
                  className="px-4 py-2 rounded bg-[#f5d08c] text-gray-900 font-semibold hover:bg-yellow-500"
                >
                  Confirm & Open WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}

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

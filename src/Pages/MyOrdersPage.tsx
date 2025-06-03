import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";

interface Order {
  id: string;
  createdAt: string;
  totalPrice: number;
  orderItems: {
    name: string;
    qty: number;
    price: number;
  }[];
}

interface jsPDFWithPlugin extends jsPDF {
  lastAutoTable?: {
    finalY?: number;
  };
}

const getRandomStatus = () => {
  const statuses = ["Pending", "Processing", "Shipped", "Delivered"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  const generatePDF = (order: Order) => {
    const doc = new jsPDF();

    const displayName = user?.displayName || "Customer"; // fallback if no name

    doc.text("Focus Honey - Order Receipt", 14, 20);
    doc.text(`Customer Name: ${displayName}`, 14, 30);
    doc.text(`Order ID: ${order.id}`, 14, 40);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 14, 50);

    const items = order.orderItems.map((item) => [
      item.name,
      item.qty.toString(),
      `Ghc ${item.price}`,
    ]);

    autoTable(doc, {
      head: [["Item", "Quantity", "Price"]],
      body: items,
      startY: 60,
    });

    const extendedDoc = doc as jsPDFWithPlugin;
    const finalY = extendedDoc.lastAutoTable?.finalY || 90;

    doc.text(`Total: Ghc ${order.totalPrice.toFixed(2)}`, 14, finalY + 10);

    doc.save(
      `FocusHoney_${displayName.replace(/\s/g, "_")}_Order_${order.id.slice(
        -6
      )}.pdf`
    );
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);

        const fetchedOrders: Order[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            createdAt: data.createdAt?.toDate().toISOString() || "",
            totalPrice: data.totalPrice,
            orderItems: data.orderItems,
          };
        });

        setOrders(fetchedOrders);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders. Please try again.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <motion.div
      className="min-h-screen bg-[#2f2f2f] text-white px-6 pt-28 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-semibold">My Orders</h2>
          <button
            onClick={handleLogout}
            className="text-sm bg-[#f5d08c] hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded font-semibold transition"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <p className="text-center text-white/70">Loading...</p>
        ) : error ? (
          <div className="text-red-500 bg-red-500/10 border border-red-500/40 p-3 rounded text-center">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center space-y-4 text-white/70">
            <p>You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate("/")}
              className="text-sm bg-[#f5d08c] hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded font-semibold"
            >
              Back to Shop
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className={`bg-[#1c1c1c] border ${
                  index === 0 ? "border-yellow-500" : "border-[#f5d08c]/30"
                } rounded-xl p-5 space-y-3 shadow`}
              >
                <div className="text-sm text-white/60">
                  <span className="font-semibold text-white">Order ID:</span>{" "}
                  {order.id.slice(-6).toUpperCase()}
                </div>

                <div className="text-sm text-white/60">
                  <span className="font-semibold text-white">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </div>

                <div className="text-sm text-white/60">
                  <span className="font-semibold text-white">Status:</span>{" "}
                  <span className="text-green-400 font-semibold">
                    {getRandomStatus()}
                  </span>
                </div>

                <div className="text-sm text-white/60">
                  <span className="font-semibold text-white">Items:</span>
                  <ul className="list-disc list-inside pl-2 mt-1 space-y-1">
                    {order.orderItems.map((item, i) => (
                      <li key={i} className="text-white/80">
                        {item.qty} x {item.name} – Ghc {item.price}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm text-white/60">
                  <span className="font-semibold text-white">Total:</span> Ghc{" "}
                  {order.totalPrice.toFixed(2)}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => generatePDF(order)}
                    className="text-xs bg-[#f5d08c] hover:bg-yellow-500 text-gray-900 px-3 py-2 rounded font-semibold transition"
                  >
                    Download Receipt (PDF)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyOrdersPage;

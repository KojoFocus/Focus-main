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
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [105, 148], // A6 size
    });

    const userName = user?.displayName || user?.email || "Customer";

    // Set background
    doc.setFillColor(47, 47, 47); // #2f2f2f dark gray
    doc.rect(0, 0, 105, 148, "F"); // fill whole A6 page

    // Add Logo
    const img = new Image();
    img.src = "/logo.png"; // must be in /public folder
    doc.addImage(img, "PNG", 8, 8, 25, 25);

    // Header
    doc.setTextColor("#f5d08c"); // soft gold
    doc.setFontSize(14);
    doc.text("Focus Honey - Receipt", 38, 18);

    // Customer & Order Info
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255); // white
    doc.text(`Customer: ${userName}`, 8, 40);
    doc.text(`Order ID: ${order.id.slice(-6).toUpperCase()}`, 8, 46);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 8, 52);

    // Order Items Table
    const items = order.orderItems.map((item) => [
      item.name,
      item.qty.toString(),
      `Ghc ${item.price}`,
    ]);

    autoTable(doc, {
      startY: 58,
      head: [["Item", "Qty", "Price"]],
      body: items,
      theme: "grid",
      styles: {
        fontSize: 8,
        textColor: [255, 255, 255], // white text
        fillColor: [60, 60, 60], // dark rows
      },
      headStyles: {
        fillColor: [245, 208, 140], // #f5d08c
        textColor: [0, 0, 0], // black
      },
      alternateRowStyles: {
        fillColor: [50, 50, 50],
      },
      tableLineColor: [200, 200, 200],
      tableLineWidth: 0.1,
      margin: { left: 8, right: 8 },
    });

    const finalY = (doc as jsPDFWithPlugin).lastAutoTable?.finalY || 100;

    // Total
    doc.setFontSize(10);
    doc.setTextColor("#f5d08c");
    doc.text(`Total: Ghc ${order.totalPrice.toFixed(2)}`, 8, finalY + 8);

    // Footer Contact
    doc.setFontSize(7);
    doc.setTextColor(180, 180, 180); // muted gray
    doc.text("Focus Honey · Accra, Ghana", 8, finalY + 20);
    doc.text("Phone: +233 24 123 4567", 8, finalY + 25);
    doc.text("Email: info@focushoney.com", 8, finalY + 30);
    doc.text("Thank you for your order!", 8, finalY + 38);

    // Save
    doc.save(`FocusHoney_${order.id.slice(-6)}.pdf`);
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

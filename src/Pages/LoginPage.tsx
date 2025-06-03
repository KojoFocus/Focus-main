import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Ensure this exports `auth` from firebase.ts

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("userInfo", JSON.stringify(userCredential.user));
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Signup failed. Try again.");
      }
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1f1f1f] to-[#2f2f2f] px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#1c1c1c] border border-[#f5d08c]/30 rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center text-white">
          Login to Focus Honey
        </h2>

        {error && (
          <div className="text-sm text-red-500 text-center bg-red-500/10 border border-red-500/40 p-2 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm mb-1 text-white/80">Email</label>
          <input
            type="email"
            required
            className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] border border-[#f5d08c]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#f5d08c]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-white/80">Password</label>
          <input
            type="password"
            required
            className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] border border-[#f5d08c]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#f5d08c]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#f5d08c] hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-md transition"
        >
          Login
        </button>

        <p
          onClick={() => navigate("/signup")}
          className="text-sm text-[#f5d08c] text-center mt-4 underline cursor-pointer"
        >
          Don’t have an account? Sign up
        </p>
      </form>
    </motion.div>
  );
};

export default LoginPage;

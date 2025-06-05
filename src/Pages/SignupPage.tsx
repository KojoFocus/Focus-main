import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 🔁 New state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ⏳ Start loading

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      localStorage.setItem("userInfo", JSON.stringify(userCredential.user));
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Signup failed. Try again.");
      }
    } finally {
      setLoading(false); // ✅ End loading
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
          Create an Account
        </h2>

        {error && (
          <div className="text-sm text-red-500 text-center bg-red-500/10 border border-red-500/40 p-2 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm mb-1 text-white/80">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] border border-[#f5d08c]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#f5d08c]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-white/80">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] border border-[#f5d08c]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#f5d08c]"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-white/80">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-[#2a2a2a] border border-[#f5d08c]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#f5d08c]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-bold py-3 rounded-md transition ${
            loading
              ? "bg-[#f5d08c]/70 cursor-not-allowed text-gray-700"
              : "bg-[#f5d08c] hover:bg-yellow-500 text-gray-900"
          }`}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p
          onClick={() => navigate("/login")}
          className="text-sm text-[#f5d08c] text-center mt-4 underline cursor-pointer"
        >
          Already have an account? Login
        </p>
      </form>
    </motion.div>
  );
};

export default SignupPage;

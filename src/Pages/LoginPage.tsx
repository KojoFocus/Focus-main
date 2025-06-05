import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getFriendlyError = (code: string) => {
    switch (code) {
      case "auth/user-not-found":
        return "No account found with that email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-email":
        return "The email address is not valid.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please wait and try again.";
      default:
        return "Login failed. Please check your credentials.";
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      localStorage.setItem("focusUser", JSON.stringify({ uid: user.uid }));
      navigate("/");
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "code" in err) {
        const firebaseError = err as { code: string };
        setError(getFriendlyError(firebaseError.code));
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-[#2f2f2f] text-white px-6 pt-28 pb-24 flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <form
        onSubmit={handleLogin}
        className="bg-[#1c1c1c] p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center">Login</h2>

        <AnimatePresence>
          {error && (
            <motion.div
              className="text-red-300 bg-red-500/10 border border-red-500/40 p-3 rounded text-sm"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded bg-[#2f2f2f] border border-white/20 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 rounded bg-[#2f2f2f] border border-white/20 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-2 rounded transition ${
            loading
              ? "bg-yellow-300 text-gray-800 cursor-not-allowed"
              : "bg-[#f5d08c] hover:bg-yellow-500 text-gray-900"
          }`}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <span
            className="text-yellow-400 cursor-pointer underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </motion.div>
  );
};

export default LoginPage;

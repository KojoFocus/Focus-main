import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="bg-gradient-to-b from-[#1f1f1f] to-[#2f2f2f] text-white min-h-screen text-center font-sans"
    >
      <div className="relative isolate px-6 pt-10 lg:px-8 overflow-hidden">
        {/* Decorative Blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu blur-3xl opacity-20 sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] w-[36rem] aspect-[1155/678] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f5d08c] to-[#b45309] sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-4xl py-24 sm:py-36 lg:py-44 space-y-12">
          {/* Hero Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex justify-center"
          >
            <div className="rounded-2xl overflow-hidden border-2 border-[#f5d08c]/40 shadow-2xl w-full max-w-[500px] transform transition-transform duration-1000 hover:scale-[1.015]">
              <video
                src="/videos/honey-processing.mp4"
                className="w-full h-auto object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6, type: "spring" }}
          >
            <Link
              to="/products"
              className="inline-block rounded-full border-2 border-[#f5d08c] px-8 py-3 text-sm font-bold tracking-wide text-[#f5d08c] hover:bg-[#f5d08c] hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-yellow-400/30 hover:scale-105"
            >
              Go to Store
            </Link>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed"
          >
            Taste the journey of every drop — straight from the hive to your
            home.
            <br />
            <span className="text-[#f5d08c] font-medium">
              Pure. Raw. Focused.
            </span>
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;

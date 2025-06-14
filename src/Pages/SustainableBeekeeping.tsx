import { motion } from "framer-motion";

const SustainableBeekeeping = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="bg-gradient-to-b from-[#1f1f1f] to-[#2f2f2f] text-white min-h-screen pb-20"
    >
      <div className="container mx-auto px-6 space-y-16 pt-40">
        {/* Section Title */}
        <motion.h2
          className="text-4xl font-bold text-center text-[#f5d08c]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Sustainable Beekeeping
        </motion.h2>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Block */}
          <motion.div
            className="space-y-6 text-base text-gray-300 leading-relaxed"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p>
              At Focus Farms, we practice sustainable beekeeping methods that
              prioritize the health of bees and the environment. Our approach
              ensures minimal interference with natural ecosystems while
              maximizing the benefits of beekeeping.
            </p>
            <p>
              We use eco-friendly tools and techniques to support the growth of
              healthy bee colonies. By doing so, we contribute to biodiversity,
              pollination, and the production of pure, natural honey.
            </p>
          </motion.div>

          {/* Image Block */}
          <motion.div
            className="rounded-2xl overflow-hidden border-2 border-[#f5d08c]/40 shadow-2xl"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/images/sustainablebeekeeping.png"
              alt="Sustainable Beekeeping"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SustainableBeekeeping;

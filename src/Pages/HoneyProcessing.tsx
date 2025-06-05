import { useEffect } from "react";
import { motion } from "framer-motion";

const HoneyProcessing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#2f2f2f] text-white min-h-screen pb-24"
    >
      <div className="container mx-auto px-6 space-y-16 pt-40">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-semibold text-center text-[#f5d08c]"
        >
          Honey Processing & Sales
        </motion.h2>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              Our honey processing techniques are designed to preserve the
              natural qualities of honey. From extraction to bottling, we ensure
              that no additives or preservatives are used.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our honey is carefully harvested, filtered, and packaged to
              deliver the purest product to your table. Taste the difference
              with our 100% natural honey!
            </p>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl overflow-hidden border-2 border-[#f5d08c]/30 shadow-2xl"
          >
            <video controls className="w-full h-auto object-cover">
              <source src="/videos/honey-processing.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HoneyProcessing;

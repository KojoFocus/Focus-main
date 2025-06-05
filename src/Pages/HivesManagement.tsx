import { useEffect } from "react";
import { motion } from "framer-motion";

const HivesManagement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-b from-[#1f1f1f] to-[#2f2f2f] text-white min-h-screen pb-24"
    >
      <div className="container mx-auto px-6 space-y-16 pt-40">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold text-center text-[#f5d08c]"
        >
          Hives Management
        </motion.h2>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          {/* Text Content */}
          <div className="space-y-6 text-gray-300 text-base leading-relaxed">
            <p>
              Effective hives management is at the core of sustainable
              beekeeping. At Focus Farms, we prioritize the health and
              productivity of our hives through innovative techniques and
              careful monitoring.
            </p>
            <p>
              Our approach includes regular inspections, disease prevention, and
              optimal hive placement to ensure healthy bee colonies and maximum
              honey production.
            </p>
          </div>

          {/* Image Content */}
          <div className="flex justify-center">
            <motion.img
              src="/images/hives-management.png"
              alt="Hives Management"
              className="rounded-lg shadow-lg border border-[#f5d08c]/30 w-full max-w-md"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HivesManagement;

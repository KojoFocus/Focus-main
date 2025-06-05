import { motion } from "framer-motion";

const TrainingEducation = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="bg-gradient-to-b from-[#4f4f4f] to-[#2f2f2f] text-white min-h-screen pb-20"
    >
      <div className="container mx-auto px-6 space-y-16 pt-40">
        {/* Section Title */}
        <motion.h2
          className="text-4xl font-bold text-center text-[#f5d08c]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Training & Education
        </motion.h2>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <motion.div
            className="space-y-6 text-base text-gray-300 leading-relaxed"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p>
              We believe in empowering communities through education. Our
              training programs teach individuals and groups about sustainable
              beekeeping practices, hive management, and honey production.
            </p>
            <p>
              Whether you're a beginner or an experienced beekeeper, our
              workshops and resources are designed to help you succeed.
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden border-2 border-[#f5d08c]/40 shadow-2xl">
              <img
                src="/images/trainingandeducation.png"
                alt="Training Session"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border-2 border-[#f5d08c]/40 shadow-2xl">
              <img
                src="/images/ecofriendlymethods.png"
                alt="Workshop"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TrainingEducation;

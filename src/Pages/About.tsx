import {
  CheckCircleIcon,
  UsersIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cardStyle =
  "bg-gradient-to-tr from-[#262626] to-[#1c1c1c] text-white border border-[#f5d08c]/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300";

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="bg-gradient-to-b from-[#1f1f1f] to-[#2f2f2f] text-white min-h-screen pb-20"
    >
      <div className="container mx-auto px-6 space-y-16 pt-40">
        {/* Our Mission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-semibold mb-6">Our Mission</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-300">
            At Focus Farms, we believe in the incredible potential of bees to
            create sustainable solutions for the world. Through eco-friendly
            beekeeping practices, we aim to empower communities, protect
            ecosystems, and provide pure, natural bee products.
          </p>
        </motion.section>

        {/* What We Do */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-semibold text-center mb-10">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Sustainable Beekeeping",
                image: "/images/sustainablebeekeeping.png",
                link: "/sustainable-beekeeping",
              },
              {
                title: "Honey Processing",
                image: "/images/honeyandbeeproducts.png",
                link: "/pure-honey-and-bee-products",
              },
              {
                title: "Training & Education",
                image: "/images/trainingandeducation.png",
                link: "/training-and-education",
              },
              {
                title: "Hives Management",
                image: "/images/ecofriendlymethods.png",
                link: "/hives-management",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={cardStyle}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 mx-auto mb-4 object-cover rounded-full border-4 border-[#f5d08c]/40"
                />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <Link
                  to={item.link}
                  className="inline-flex items-center mt-4 px-5 py-2 rounded-lg bg-[#f5d08c] text-gray-900 font-semibold text-sm hover:bg-yellow-500 transition"
                >
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-semibold text-center mb-10">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={cardStyle}>
              <CheckCircleIcon className="w-12 h-12 mx-auto mb-3 text-[#f5d08c]" />
              <h3 className="text-xl font-semibold mb-2">Pure and Natural</h3>
              <p className="text-sm text-gray-300">
                Our products are 100% natural, free from additives and
                preservatives, ensuring you get the best nature has to offer.
              </p>
            </div>
            <div className={cardStyle}>
              <UsersIcon className="w-12 h-12 mx-auto mb-3 text-[#f5d08c]" />
              <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
              <p className="text-sm text-gray-300">
                We work closely with local communities to promote sustainable
                practices and create economic opportunities.
              </p>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <h2 className="text-4xl font-semibold mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-6">
            Discover the power of bees with Focus Honey. Explore our products,
            learn about sustainable beekeeping, and be part of the change.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-[#f5d08c] hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold text-sm transition"
          >
            Talk to Us
            <ChatBubbleOvalLeftIcon className="w-4 h-4 ml-2" />
          </Link>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default AboutPage;

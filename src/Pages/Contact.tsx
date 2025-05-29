import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="bg-gradient-to-b from-[#1f1f1f] to-[#2f2f2f] text-white min-h-screen pb-20"
    >
      <div className="container mx-auto px-6 space-y-16 pt-32">
        {/* Contact Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-semibold text-center mb-8">
            Get in Touch
          </h2>
          <form className="max-w-2xl mx-auto space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full rounded-md border border-[#f5d08c]/30 bg-transparent px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5d08c]"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-md border border-[#f5d08c]/30 bg-transparent px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5d08c]"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full rounded-md border border-[#f5d08c]/30 bg-transparent px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5d08c]"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#f5d08c] hover:bg-yellow-500 text-gray-900 font-semibold text-sm px-6 py-3 rounded-md transition"
            >
              Send Message
            </button>
          </form>
        </motion.section>

        {/* Contact Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-4xl font-semibold mb-6">Contact Us</h2>
          <div className="space-y-2 text-gray-300 text-sm">
            <p>Email: info@focushoney.com</p>
            <p>Phone: +233 540 484 052</p>
            <p>Address: Teiman Borga-Town, Accra</p>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default ContactPage;

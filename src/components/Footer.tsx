import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2f2f2f]  text-white py-16">
      <div className="container mx-auto px-6 space-y-10">
        {/* Logo + Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center md:justify-start"
          >
            <img
              src="/images/logo.png"
              alt="Focus Honey Logo"
              className="h-12 w-auto drop-shadow-sm"
            />
          </Link>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-400 hover:text-[#f5d08c] transition duration-300"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-[#f5d08c] transition duration-300"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-400 hover:text-[#f5d08c] transition duration-300"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-[#f5d08c] transition duration-300"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-[#f5d08c]/20" />

        {/* Copyright */}
        <p className="text-center text-sm text-gray-400 tracking-wide">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Focus Honey</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

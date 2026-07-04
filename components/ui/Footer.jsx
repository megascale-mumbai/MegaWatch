"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, MapPin, Phone, Mail } from "lucide-react";

// Custom SVG Icons for Brands (since Lucide removed them)
const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.247 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.247-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.247-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.247 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.337-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.5 0-4 1.5-4 4v2z" />
  </svg>
);

export default function Footer() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const footerLinks = {
    navigation: [
      { name: "Collection", href: "/collection" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
    support: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Shipping & Returns", href: "/shipping" },
      { name: "Terms and Conditions", href: "/terms" },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-stone-950 text-white pt-10 md:pt-14 pb-8 border-t border-white/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />

      <div className="w-full px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-16 mb-6"
        >
          {/* Brand Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 lg:gap-6 text-left border-b border-white/5 lg:border-b-0 pb-3 lg:pb-0"
          >
            <Link href="/" className="group inline-block">
              <span className="text-2xl font-display font-bold tracking-tighter text-white group-hover:text-accent transition-all duration-500">
                MEGA
                <span className="text-accent group-hover:text-white transition-colors">
                  WATCH
                </span>
              </span>
            </Link>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xs font-medium">
              Defining the future of horological excellence through digital
              precision and timeless craftsmanship.
            </p>
            <div className="flex gap-4 mt-1 lg:mt-2">
              {[
                {
                  icon: InstagramIcon,
                  name: "instagram",
                  href: "https://www.instagram.com/_megascale_?igsh=c2NzYTV2eDQ3M3Uw",
                },
                {
                  icon: FacebookIcon,
                  name: "facebook",
                  href: "https://www.facebook.com/megascale.surat.96",
                },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -5, borderColor: "var(--accent)" }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:text-accent transition-all duration-300 bg-white/5 backdrop-blur-sm"
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:gap-6 border-b border-white/5 lg:border-b-0 pb-3 lg:pb-0"
          >
            {/* Mobile/Tablet Header Button */}
            <button
              onClick={() => toggleDropdown("navigation")}
              className="w-full flex items-center justify-between py-2 text-left lg:hidden"
            >
              <span className="text-[10px] font-display font-bold uppercase tracking-[0.4em] text-accent/80">
                Navigation
              </span>
              <span className="text-accent text-sm font-bold">
                {openDropdown === "navigation" ? "−" : "+"}
              </span>
            </button>

            {/* Desktop Header */}
            <h4 className="hidden lg:block text-[10px] font-display font-bold uppercase tracking-[0.4em] text-accent/80 text-left">
              Navigation
            </h4>

            <ul
              className={`flex-col gap-3 lg:gap-4 mt-2 lg:mt-0 text-left ${openDropdown === "navigation" ? "flex" : "hidden lg:flex"}`}
            >
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-stone-400 hover:text-white hover:translate-x-1 transition-all duration-300 text-[11px] sm:text-sm font-medium tracking-wide inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:gap-6 border-b border-white/5 lg:border-b-0 pb-3 lg:pb-0"
          >
            {/* Mobile/Tablet Header Button */}
            <button
              onClick={() => toggleDropdown("support")}
              className="w-full flex items-center justify-between py-2 text-left lg:hidden"
            >
              <span className="text-[10px] font-display font-bold uppercase tracking-[0.4em] text-accent/80">
                Support
              </span>
              <span className="text-accent text-sm font-bold">
                {openDropdown === "support" ? "−" : "+"}
              </span>
            </button>

            {/* Desktop Header */}
            <h4 className="hidden lg:block text-[10px] font-display font-bold uppercase tracking-[0.4em] text-accent/80 text-left">
              Support
            </h4>

            <ul
              className={`flex-col gap-3 lg:gap-4 mt-2 lg:mt-0 text-left ${openDropdown === "support" ? "flex" : "hidden lg:flex"}`}
            >
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-stone-400 hover:text-white hover:translate-x-1 transition-all duration-300 text-[11px] sm:text-sm font-medium tracking-wide inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:gap-6 border-b border-white/5 lg:border-b-0 pb-3 lg:pb-0"
          >
            {/* Mobile/Tablet Header Button */}
            <button
              onClick={() => toggleDropdown("contact")}
              className="w-full flex items-center justify-between py-2 text-left lg:hidden"
            >
              <span className="text-[10px] font-display font-bold uppercase tracking-[0.4em] text-accent/80">
                Contact Us
              </span>
              <span className="text-accent text-sm font-bold">
                {openDropdown === "contact" ? "−" : "+"}
              </span>
            </button>

            {/* Desktop Header */}
            <h4 className="hidden lg:block text-[10px] font-display font-bold uppercase tracking-[0.4em] text-accent/80 text-left">
              Contact Us
            </h4>

            <div
              className={`flex-col gap-4 text-left mt-2 lg:mt-0 ${openDropdown === "contact" ? "flex" : "hidden lg:flex"}`}
            >
              <div className="flex items-start gap-3">
                <MapPin
                  className="text-accent flex-shrink-0 mt-0.5"
                  size={14}
                />
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-medium">
                  411, New Escon Plaza, Chhaprabhatha Road, Amroli, Surat,
                  Gujarat - 394107
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-accent flex-shrink-0" size={14} />
                <a
                  href="tel:+918850011652"
                  className="text-stone-400 hover:text-white transition-colors text-xs sm:text-sm font-medium tracking-wide"
                >
                  +91 88500 11652
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-accent flex-shrink-0" size={14} />
                <a
                  href="mailto:support@megawatch.com"
                  className="text-stone-400 hover:text-white transition-colors text-xs sm:text-sm font-medium tracking-wide"
                >
                  support@megawatch.com
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 relative">
          <p className="text-stone-600 text-[9px] tracking-[0.2em] font-medium uppercase">
            © {new Date().getFullYear()} MEGAWATCH GENÈVE. ALL RIGHTS RESERVED.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            className="absolute left-1/2 -top-6 -translate-x-1/2 w-12 h-12 bg-stone-900 border border-white/10 rounded-full flex items-center justify-center text-accent hover:border-accent transition-all shadow-2xl"
          >
            <ArrowUp size={18} strokeWidth={2.5} />
          </motion.button>

          <div className="flex gap-8 lg:gap-12">
            {["Privacy Policy", "Terms of Service"].map((text) => (
              <Link
                key={text}
                href={text === "Privacy Policy" ? "/privacy" : "/terms"}
                className="text-stone-600 hover:text-accent transition-colors text-[9px] tracking-[0.2em] font-medium uppercase"
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Hammer, Award, Microscope, ArrowRight } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-white">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-50/50 -skew-x-12 translate-x-1/4 pointer-events-none hidden lg:block" />

      <div className="w-full px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* LEFT: WORKSHOP IMAGE & BADGE (lg:col-span-3) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full lg:col-span-3 max-w-[320px] mx-auto lg:mx-0 relative order-2 lg:order-1"
          >
            <div className="relative rounded-[24px] md:rounded-[30px] overflow-hidden aspect-[3/4] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-black/5 group">
              <img
                src="/backgrounds/workshop.png"
                alt="Luxury Watch Workshop"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* RIGHT: BRAND STORY & VALUES (lg:col-span-9) */}
          <div className="lg:col-span-9 space-y-6 sm:space-y-8 order-1 lg:order-2 text-center lg:text-left flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-8 h-[1px] bg-accent" />
                <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[9px] md:text-[10px]">
                  About the Brand
                </span>
                <div className="w-8 h-[1px] bg-accent lg:hidden" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-black uppercase leading-tight tracking-tight">
                MASTERS OF <span className="text-accent italic">HOROLOGY.</span>
              </h2>
              <p className="text-stone-500 text-sm md:text-base leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                MegaWatch was born from a singular obsession: to bridge the gap
                between traditional Swiss craftsmanship and the digital future.
                Our workshop is where legacy meets the pixel.
              </p>
            </motion.div>

            {/* Features Cards */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 text-left">
              <motion.div
                whileHover={{ y: -3 }}
                className="bg-stone-50 border border-black/5 p-5 sm:p-6 rounded-[20px] transition-all duration-300 hover:bg-white hover:shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent mb-4 shadow-sm">
                  <Hammer size={18} strokeWidth={1.5} />
                </div>
                <h4 className="text-black font-display font-bold uppercase tracking-wider mb-1.5 text-xs md:text-sm">
                  The Workshop
                </h4>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Our atelier houses the finest tools and the most dedicated
                  artisans, ensuring every component is a masterpiece.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="bg-stone-50 border border-black/5 p-5 sm:p-6 rounded-[20px] transition-all duration-300 hover:bg-white hover:shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent mb-4 shadow-sm">
                  <Microscope size={18} strokeWidth={1.5} />
                </div>
                <h4 className="text-black font-display font-bold uppercase tracking-wider mb-1.5 text-xs md:text-sm">
                  Micro-Precision
                </h4>
                <p className="text-stone-400 text-xs leading-relaxed">
                  We operate at the sub-micron level, where even the smallest
                  gear is optimized for flawless performance.
                </p>
              </motion.div>
            </div>

            {/* Call to Action Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="pt-2"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-3 py-3 px-6 bg-black hover:bg-accent text-white hover:text-black font-display font-bold uppercase tracking-widest text-[8px] md:text-[9px] transition-all duration-300 shadow-md"
              >
                Discover Our Heritage
                <ArrowRight size={12} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

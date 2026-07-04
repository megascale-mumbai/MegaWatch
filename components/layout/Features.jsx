"use client";

import { motion } from "framer-motion";
import { Settings2, Palette, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    title: "Mechanical Soul",
    desc: "Engineered with a real-time physics engine that replicates the complex inertia and fluid movement of a mechanical caliber.",
    icon: Settings2,
  },
  {
    title: "Artisanal Studio",
    desc: "A limitless canvas for the horological connoisseur. Customize every micron of your timepiece with unprecedented precision.",
    icon: Palette,
  },
  {
    title: "Digital Integrity",
    desc: "Secured by the latest in cryptographic design persistence, ensuring your bespoke masterpieces are preserved for eternity.",
    icon: ShieldCheck,
  },
];

export default function Features() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden border-y border-black/5">
      {/* Background Subtle Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] sm:text-[140px] md:text-[200px] font-display font-black text-black/[0.01] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap">
        ENGINEERED
      </div>

      <div className="w-full px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-6 md:mb-8">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[9px] md:text-[10px]">
                The Engine
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-black uppercase leading-tight tracking-tight">
              CORE <span className="text-accent italic">CAPABILITIES.</span>
            </h2>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group relative bg-stone-50/50 border border-black/5 p-6 sm:p-7 md:p-8 rounded-[24px] hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] hover:border-black/10 transition-all duration-500 overflow-hidden"
            >
              {/* Background Watermark Number */}
              <div className="absolute top-4 right-6 text-5xl font-display font-black text-black/[0.02] transition-colors duration-500 group-hover:text-accent/[0.05]">
                {feature.num}
              </div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-accent group-hover:scale-110 shadow-sm">
                    <feature.icon
                      className="w-5 h-5 text-black group-hover:text-white transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-display font-bold text-black mb-2.5 uppercase tracking-wider group-hover:text-accent transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-medium transition-colors duration-500 group-hover:text-stone-500">
                    {feature.desc}
                  </p>
                </div>

                {/* Decorative bottom button / accent */}
                <div className="mt-6 pt-3 flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-[1px] w-5 bg-accent" />
                  <span className="text-[8px] font-bold text-accent uppercase tracking-widest">
                    Learn More
                  </span>
                </div>
              </div>

              {/* Bottom decorative color border line */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

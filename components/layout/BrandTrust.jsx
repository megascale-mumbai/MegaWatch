"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Compass, Gem, Droplets, Truck } from "lucide-react";

const trustItems = [
  { icon: Compass, text: "Swiss Movement" },
  { icon: ShieldCheck, text: "2 Year Warranty" },
  { icon: Gem, text: "Premium Steel" },
  { icon: Droplets, text: "Water Resistant" },
  { icon: Truck, text: "Free Shipping" },
];

export default function BrandTrust() {
  return (
    <div className="relative z-[60] bg-white border-y border-black/5 py-8 overflow-hidden">
      <div className="w-full px-6">
        
        {/* Desktop Grid (5 Columns) */}
        <div className="hidden md:grid grid-cols-5 gap-6 items-center justify-items-center">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center transition-colors duration-500 group-hover:bg-accent group-hover:text-white flex-shrink-0">
                <item.icon size={18} strokeWidth={1.5} className="text-accent group-hover:text-white transition-colors duration-500" />
              </div>
              <span className="text-[10px] lg:text-[11px] font-display font-bold uppercase tracking-[0.3em] text-stone-500 group-hover:text-black transition-colors duration-500 whitespace-nowrap">
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Mobile Auto-Slider (Seamless Infinite Loop Marquee) */}
        <div className="md:hidden flex overflow-hidden relative w-full py-1">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 15,
              repeat: Infinity,
            }}
            className="flex gap-12 pr-12 whitespace-nowrap"
          >
            {[...trustItems, ...trustItems].map((item, index) => (
              <div key={index} className="flex items-center gap-3 flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-accent/5 flex items-center justify-center flex-shrink-0">
                  <item.icon size={16} strokeWidth={1.5} className="text-accent" />
                </div>
                <span className="text-[9px] font-display font-bold uppercase tracking-[0.25em] text-stone-500 whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
      
      {/* Decorative infinite scan line */}
      <motion.div 
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent pointer-events-none"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const sliderProducts = [
  {
    id: "gravitas-steel",
    name: "GRAVITAS STEEL",
    tagline: "AUTOMATIC CHRONO",
    desc: "From the premium finish to the intricate automatic movement, every detail of Gravitas is crafted to leave a lasting impression from the very first look.",
    image: "/watches/trending/watch1.png",
    link: "/collection",
  },
  {
    id: "gravitas-obsidian",
    name: "GRAVITAS OBSIDIAN",
    tagline: "MATTE BLACK EDITION",
    desc: "An stealth statement piece featuring a DLC coated sandblasted steel case, luminous indices, and a bespoke handcrafted leather strap.",
    image: "/watches/trending/watch4.png",
    link: "/collection",
  },
  {
    id: "gravitas-gold",
    name: "GRAVITAS GOLD",
    tagline: "ROYAL HERITAGE",
    desc: "Exposed tourbillon movement encased in hand-polished 18K gold architecture, designed for those who appreciate horological heritage.",
    image: "/watches/trending/watch2.png",
    link: "/collection",
  },
];

export default function BrandPromotion() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderProducts.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + sliderProducts.length) % sliderProducts.length,
    );
  };

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="w-full px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-accent/30" />
            <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[9px] md:text-[10px]">
              Domestic Pride
            </span>
            <div className="w-12 h-[1px] bg-accent/30" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-black uppercase leading-tight tracking-tight">
            PROUDLY <span className="text-accent italic">INDIAN BRAND.</span>
          </h2>
        </div>

        {/* Grid Layout: Left (Video) | Right (Ad & Product Slider) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* LEFT COLUMN: WATCH VIDEO (col-span-6) */}
          <div className="lg:col-span-6 relative rounded-2xl sm:rounded-[20px] overflow-hidden bg-black aspect-[4/5] shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-black/5 group">
            <video
              src="/vedio/14004256_1080_1920_60fps.mp4"
              className="w-full h-full object-cover"
              preload="metadata"
              autoPlay
              loop
              muted
              playsInline
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
          </div>
 
          {/* RIGHT COLUMN: AD BANNER & PRODUCT SLIDER (col-span-6) */}
          <div className="lg:col-span-6 flex flex-col gap-8 md:gap-10">
            {/* RIGHT TOP: AD BANNER */}
            <div className="flex flex-row rounded-xl sm:rounded-[20px] overflow-hidden bg-black text-white min-h-[150px] sm:min-h-[200px] md:min-h-[220px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-white/5 group">
              {/* Left Side: Text Content (50% width) */}
              <div className="w-[50%] p-4 sm:p-6 flex flex-col justify-between text-left">
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-xs sm:text-base md:text-xl leading-tight uppercase tracking-tight text-white">
                    GRAVITAS <br />
                    <span className="text-accent italic font-normal text-[10px] sm:text-xs">
                      IS NOW HERE
                    </span>
                  </h3>
                  <p className="text-stone-400 text-[8px] sm:text-[10px] leading-normal font-medium line-clamp-2">
                    Where Mechanical Artistry meets modern luxury. New Launch Alert...
                  </p>
                </div>

                <div className="mt-2">
                  <button className="py-1 px-3 sm:py-2 sm:px-4 bg-white hover:bg-accent text-black hover:text-white font-display font-bold text-[8px] sm:text-[9px] uppercase tracking-widest transition-colors duration-300">
                    LIVE NOW
                  </button>
                </div>
              </div>

              {/* Right Side: Image with solid light grey background (50% width) */}
              <div className="w-[50%] bg-[#d0d0d0] flex items-center justify-center overflow-hidden">
                <img
                  src="/watches/trending/watch3.png"
                  alt="Gravitas Ad"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* RIGHT BOTTOM: WATCH PRODUCT SLIDER */}
            <div className="flex flex-row rounded-xl sm:rounded-[20px] overflow-hidden bg-white border border-black/5 flex-grow shadow-sm min-h-[150px] sm:min-h-[200px] md:min-h-[220px]">
              {/* Left Side: Large Watch Image (40% width) stretching edge-to-edge */}
              <div className="w-[40%] sm:w-[50%] bg-[#e8e8e8] flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={sliderProducts[currentIndex].image}
                    alt={sliderProducts[currentIndex].name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Right Side: Padded Info & Controls (60% width) */}
              <div className="w-[60%] sm:w-[50%] p-4 sm:p-6 flex flex-col justify-between text-left">
                <div className="relative overflow-hidden flex-grow flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-1 sm:space-y-2"
                    >
                      <span className="text-[7px] sm:text-[8px] font-bold text-stone-500 uppercase tracking-widest bg-stone-200/50 py-0.5 px-2 rounded-full w-max block">
                        {sliderProducts[currentIndex].tagline}
                      </span>
                      <h4 className="text-black font-display font-extrabold text-xs sm:text-sm md:text-base tracking-wider leading-none uppercase">
                        {sliderProducts[currentIndex].name}
                      </h4>
                      <p className="text-stone-500 text-[8px] sm:text-[10px] leading-normal line-clamp-2">
                        {sliderProducts[currentIndex].desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Slider Controls & Button Row */}
                <div className="flex items-center justify-between gap-2 pt-2 mt-2 border-t border-black/5">
                  <Link href="/collection">
                    <button className="py-1 px-3 bg-black hover:bg-accent text-white font-display font-bold text-[8px] sm:text-[9px] uppercase tracking-widest transition-colors duration-300">
                      Discover
                    </button>
                  </Link>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      <button
                        onClick={handlePrev}
                        className="w-6 h-6 bg-stone-100 text-stone-600 hover:bg-accent hover:text-white transition-all active:scale-95 flex items-center justify-center font-mono font-bold text-[10px]"
                      >
                        &lt;
                      </button>
                      <button
                        onClick={handleNext}
                        className="w-6 h-6 bg-stone-100 text-stone-600 hover:bg-accent hover:text-white transition-all active:scale-95 flex items-center justify-center font-mono font-bold text-[10px]"
                      >
                        &gt;
                      </button>
                    </div>
                    <span className="text-[9px] font-bold text-stone-400 min-w-[24px] text-right">
                      {currentIndex + 1}/{sliderProducts.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

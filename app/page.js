"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/layout/Hero";
import BrandTrust from "@/components/layout/BrandTrust";
// import Features from "@/components/layout/Features";
import AboutUs from "@/components/layout/AboutUs";
import Categories from "@/components/layout/Categories";
import TrendingProducts from "@/components/layout/TrendingProducts";
import BrandPromotion from "@/components/layout/BrandPromotion";
import Gallery from "@/components/layout/Gallery";
import Legacy from "@/components/layout/Legacy";
import DialPicker from "@/components/layout/DialPicker";
import Testimonials from "@/components/layout/Testimonials";
import Blog from "@/components/layout/Blog";
import Faq from "@/components/layout/Faq";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col bg-white">
      <Navbar />

      <Hero isLoaded={isLoaded} />
      <BrandTrust />
      {/* <Features /> */}
      <AboutUs />
      <Categories />
      <TrendingProducts />
      <BrandPromotion />
      <Gallery />
      <Legacy />
      <DialPicker />
      <Testimonials />
      <Blog />
      <Faq />

      {/* Loading Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
            className="fixed inset-0 flex items-center justify-center bg-white z-[200]"
          >
            <div className="flex flex-col items-center gap-8 px-6">
              {/* Nested Luxury Orbital Spinner */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                {/* Outer Gold Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-[2px] border-accent/10 border-t-accent rounded-full"
                />
                {/* Inner Counter-Rotating Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border-[2px] border-black/5 border-b-black rounded-full"
                />
                {/* Center Pulsing Logo Icon */}
                <motion.div
                  animate={{ scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-black rotate-45 flex items-center justify-center shadow-lg"
                >
                  <span className="text-[10px] sm:text-[11px] font-black text-white -rotate-45">M</span>
                </motion.div>
              </div>

              {/* Text with animated character letters */}
              <div className="text-center">
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-accent text-[9px] sm:text-[11px] font-bold tracking-[0.4em] uppercase"
                >
                  Initializing Luxury
                </motion.p>
                <div className="w-12 h-[1px] bg-accent/20 mx-auto mt-3 overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1/2 h-full bg-accent"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
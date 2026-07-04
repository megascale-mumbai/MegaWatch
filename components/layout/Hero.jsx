"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const SLIDES = [
  "/images/hero-watch-bg.png",
  "/images/hero-bg.png",
  "/categories/luxury.png",
  "/categories/chronos.png",
  "/categories/heritage.png",
];

const PARTICLES = [
  { id: 1, left: "10%", yStart: 800, yEnd: -100, duration: 25 },
  { id: 2, left: "25%", yStart: 950, yEnd: -200, duration: 32 },
  { id: 3, left: "40%", yStart: 700, yEnd: -50, duration: 20 },
  { id: 4, left: "55%", yStart: 850, yEnd: -150, duration: 28 },
  { id: 5, left: "70%", yStart: 600, yEnd: -120, duration: 22 },
  { id: 6, left: "85%", yStart: 900, yEnd: -80, duration: 30 },
  { id: 7, left: "15%", yStart: 750, yEnd: -180, duration: 27 },
  { id: 8, left: "30%", yStart: 880, yEnd: -110, duration: 24 },
  { id: 9, left: "50%", yStart: 650, yEnd: -90, duration: 18 },
  { id: 10, left: "65%", yStart: 920, yEnd: -220, duration: 35 },
  { id: 11, left: "80%", yStart: 780, yEnd: -130, duration: 29 },
  { id: 12, left: "95%", yStart: 830, yEnd: -160, duration: 26 },
  { id: 13, left: "5%", yStart: 900, yEnd: -100, duration: 31 },
  { id: 14, left: "20%", yStart: 720, yEnd: -140, duration: 21 },
  { id: 15, left: "35%", yStart: 810, yEnd: -60, duration: 23 },
  { id: 16, left: "45%", yStart: 860, yEnd: -190, duration: 33 },
  { id: 17, left: "60%", yStart: 690, yEnd: -110, duration: 19 },
  { id: 18, left: "75%", yStart: 940, yEnd: -240, duration: 36 },
  { id: 19, left: "90%", yStart: 760, yEnd: -70, duration: 28 },
  { id: 20, left: "52%", yStart: 890, yEnd: -150, duration: 25 },
];

export default function Hero({ isLoaded }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Interval timer for background slide transitions
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);

    return () => clearInterval(slideTimer);
  }, []);

  // Mouse Interaction for 3D Rotation
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Parallax & Scroll Effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const bgY = useTransform(scrollY, [0, 1000], [0, 200]); // Parallax for background
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen min-h-[600px] flex items-center bg-stone-950 overflow-hidden"
    >
      {/* Cinematic Background Image Slider */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={SLIDES[currentSlide]}
            alt={`Luxury Slide ${currentSlide + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.75, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Uniform subtle overlay to make watch details visible while keeping text legible */}
        <div className="absolute inset-0 bg-black/35 z-10" />
      </motion.div>

      {/* Background Particles / Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] animate-float" />

        {/* Floating Particles */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.1, y: p.yStart }}
            animate={{
              y: [p.yStart, p.yEnd],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[1px] h-[1px] bg-accent/40 rounded-full pointer-events-none"
            style={{ left: p.left }}
          />
        ))}

        {/* Cinematic Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 h-full flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center h-full">
          {/* TEXT CONTENT */}
          <motion.div
            style={{ y: y1, opacity, scale }}
            className="flex flex-col items-center text-center w-full"
          >
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[9px] md:text-[11px]">
                Luxury Redefined
              </span>
              <div className="w-12 h-[1px] bg-accent" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-2xl sm:text-4xl md:text-6xl xl:text-7xl font-display font-black text-white leading-[0.9] uppercase tracking-[-0.03em] mb-6 sm:mb-10"
            >
              TIME <br />
              <span className="text-accent italic drop-shadow-[0_0_20px_rgba(184,134,11,0.25)]">
                REDEFINED
              </span>{" "}
              <br />
              <span className="text-xs sm:text-lg md:text-2xl xl:text-3xl block mt-3 sm:mt-5 text-white/90 font-medium tracking-tight">
                ELEGANCE IN EVERY SECOND
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-row justify-center items-center gap-3 sm:gap-6 mt-2 sm:mt-4"
            >
              <Link
                href="/collection"
                className="px-4 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 bg-accent text-white font-display font-bold uppercase tracking-widest text-[8px] sm:text-[9px] md:text-[10px] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl shadow-accent/20 text-center whitespace-nowrap"
              >
                Shop Collection
              </Link>
              <Link
                href="/about"
                className="px-4 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 border border-white/20 text-white font-display font-bold uppercase tracking-widest text-[8px] sm:text-[9px] md:text-[10px] hover:bg-white/5 hover:border-white transition-all duration-500 text-center whitespace-nowrap"
              >
                About Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

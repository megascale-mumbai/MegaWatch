"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote: "The weight and presence of the Gravitas Gold on my wrist is perfect. The hand-finished skeleton tourbillon movement is a stunning conversation starter. It is a genuine Indian-engineered horological masterpiece.",
    author: "Alexander Vance",
    role: "Horological Collector",
    location: "Geneva, Switzerland",
    image: "/testimonials/alexander.png",
    rating: 5
  },
  {
    id: 2,
    quote: "An absolute heirloom piece. The dial finishing has an elite premium quality that rivals historic Swiss brands. It pairs beautifully with both evening attire and everyday wear. Impeccable craftsmanship.",
    author: "Elena Rossi",
    role: "Luxury Lifestyle Collector",
    location: "Milan, Italy",
    image: "/testimonials/elena.png",
    rating: 5
  },
  {
    id: 3,
    quote: "As a professional watch collector, I look for precision assembly and clean movement tolerances. The Gravitas Steel exceeds expectations. The automatic movement has been incredibly reliable.",
    author: "Marcus Thorne",
    role: "Senior Collector",
    location: "London, UK",
    image: "/testimonials/marcus.png",
    rating: 5
  },
  {
    id: 4,
    quote: "The scratch-resistant sandblasted DLC coating on the Obsidian Stealth edition is exceptional. It is a bold, matte black design that speaks quietly but stands out with pure luxury.",
    author: "Sophia Chen",
    role: "Collector & Executive",
    location: "Singapore",
    image: "/testimonials/sophia.png",
    rating: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-stone-50/40">
      {/* Decorative luxury radial background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[80rem] bg-[radial-gradient(ellipse_at_center,rgba(184,134,11,0.02)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="w-full px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-accent/30" />
            <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[9px] md:text-[10px]">
              The Global Voice
            </span>
            <div className="w-12 h-[1px] bg-accent/30" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-black uppercase leading-tight tracking-tight">
            REPUTATION <span className="text-accent italic">OF PRECISION.</span>
          </h2>
        </div>

        {/* Centralized Slider Container */}
        <div className="max-w-4xl mx-auto relative px-4 md:px-12">
          
          {/* Main Testimonial Card */}
          <div className="bg-white border border-black/5 rounded-[32px] md:rounded-[48px] p-6 sm:p-10 md:p-14 shadow-xl shadow-black/[0.02] relative overflow-hidden min-h-[380px] sm:min-h-[320px] md:min-h-[280px] flex items-center">
            
            {/* Elegant Quotation Watermark */}
            <div className="absolute top-4 right-10 text-[180px] md:text-[220px] text-accent/[0.03] font-serif font-black select-none pointer-events-none">
              &ldquo;
            </div>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-8 md:gap-12 items-center"
              >
                {/* Client Avatar Wrapper */}
                <div className="flex flex-col items-center md:items-start">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-accent/20 p-1 shadow-md bg-white">
                    <img 
                      src={testimonials[activeIndex].image} 
                      alt={testimonials[activeIndex].author}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Review Copy */}
                <div className="text-center md:text-left flex flex-col justify-center">
                  <div className="mb-3 flex justify-center md:justify-start gap-0.5">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" className="text-accent" />
                    ))}
                  </div>

                  <blockquote className="text-sm sm:text-base md:text-lg font-medium text-stone-855 leading-relaxed mb-6 italic">
                    &ldquo;{testimonials[activeIndex].quote}&rdquo;
                  </blockquote>

                  <div>
                    <cite className="not-italic font-display font-bold text-base text-black uppercase tracking-wider block mb-1">
                      {testimonials[activeIndex].author}
                    </cite>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                      <span className="text-accent font-bold uppercase tracking-[0.25em] text-[8px]">{testimonials[activeIndex].role}</span>
                      <div className="w-1 h-1 rounded-full bg-stone-300 hidden sm:block" />
                      <span className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[8px]">{testimonials[activeIndex].location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls (Floating side buttons on desktop, bottom center on mobile) */}
          <div className="flex justify-center md:justify-between items-center gap-6 mt-8 md:mt-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:inset-x-0 md:px-0 z-20">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-black/5 bg-white text-stone-400 hover:text-black hover:border-black hover:shadow-md transition-all flex items-center justify-center md:-translate-x-5"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-black/5 bg-white text-stone-400 hover:text-black hover:border-black hover:shadow-md transition-all flex items-center justify-center md:translate-x-5"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`h-1 rounded-full transition-all duration-500 ${index === activeIndex ? 'w-8 bg-accent' : 'w-2 bg-stone-200 hover:bg-stone-300'}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

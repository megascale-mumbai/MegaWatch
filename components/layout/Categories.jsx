"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    id: "luxury",
    title: "Luxury",
    subtitle: "High-End Elegance",
    image: "/categories/luxury.png",
    desc: "Exquisite craftsmanship meets timeless gold and diamond accents."
  },
  {
    id: "sport",
    title: "Sport",
    subtitle: "Performance Engineered",
    image: "/categories/sport.png",
    desc: "Rugged durability with carbon fiber and high-precision tracking."
  },
  {
    id: "classic",
    title: "Classic",
    subtitle: "Timeless Heritage",
    image: "/categories/heritage.png",
    desc: "Elegant traditional complications representing the peak of classic horology."
  },
  {
    id: "limited",
    title: "Limited Edition",
    subtitle: "Rare Masterpieces",
    image: "/categories/limited.png",
    desc: "Numbered artifacts featuring skeleton movements and rare materials."
  }
];

function CategoryCard({ cat, index, isVisible }) {
  // Adjusted height for a perfectly balanced 2-column layout on all sizes
  const heightClass = "h-[220px] sm:h-[300px] md:h-[380px] lg:h-[460px]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className={`group relative overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px] bg-stone-900 shadow-xl ${heightClass}`}
    >
      {/* Hover Zoom Image */}
      <img 
        src={cat.image} 
        alt={cat.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 group-hover:rotate-1"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-700" />
      
      {/* Content */}
      <div className="absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-end z-10">
        <div className="overflow-hidden mb-1.5 sm:mb-3">
          <p className="text-accent font-display font-bold text-[7px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.4em] translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            {cat.subtitle}
          </p>
        </div>
        
        <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white uppercase tracking-tight mb-2 sm:mb-4 group-hover:text-accent transition-colors duration-500">
          {cat.title}
        </h3>
        
        <p className="hidden sm:block text-white/60 text-xs md:text-sm max-w-xs mb-6 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-700 delay-100 font-medium">
          {cat.desc}
        </p>
        
        <Link 
          href={`/collection`}
          className="flex items-center gap-2 sm:gap-4 group/btn"
        >
          <div className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:border-accent transition-all duration-500 flex-shrink-0">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[14px] sm:h-[14px] group-hover/btn:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
          <span className="text-[7px] sm:text-[8px] md:text-[9px] font-bold text-white uppercase tracking-[0.2em] sm:tracking-[0.3em]">Explore Collection</span>
        </Link>
      </div>

      {/* Golden Border Glow */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/40 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] transition-all duration-700 pointer-events-none shadow-[inset_0_0_50px_rgba(184,134,11,0)] group-hover:shadow-[inset_0_0_50px_rgba(184,134,11,0.2)]" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none shadow-[0_0_80px_rgba(184,134,11,0.15)] rounded-[20px] sm:rounded-[30px] md:rounded-[40px]" />
    </motion.div>
  );
}

export default function Categories() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-50/50 -skew-x-12 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/[0.02] rounded-full blur-[150px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="w-full px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <div className="flex items-center gap-4 mb-3 sm:mb-4">
            <div className="w-10 h-[1px] bg-accent/30" />
            <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[9px] md:text-[10px]">Curation</span>
            <div className="w-10 h-[1px] bg-accent/30" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-black uppercase tracking-tighter leading-tight">
            FEATURED <span className="text-accent italic">COLLECTIONS</span>
          </h2>
        </div>

        {/* 2-Column Grid on Mobile and Tablet */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

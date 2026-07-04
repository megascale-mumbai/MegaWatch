"use client";

import { useEffect, useState, useRef } from "react";

function StatCard({ stat, index, isVisible }) {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger "active" state on mobile
        if (window.innerWidth < 1024) {
          setIsActive(entry.isIntersecting);
        }
      },
      { threshold: 0.6 } // Trigger when card is mostly in view
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`group relative p-10 bg-stone-50/50 border border-black/5 rounded-2xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${isActive ? "is-active" : ""}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Background Number */}
      <span className={`absolute top-6 right-8 text-7xl font-display font-bold text-black/[0.03] select-none group-hover:text-accent/5 transition-colors duration-500 ${isActive ? "text-accent/5" : ""}`}>
        0{index + 1}
      </span>

      <div className="relative z-10">
        <p className="text-[9px] font-display font-bold text-accent uppercase tracking-[0.3em] mb-4">
          {stat.label}
        </p>
        
        <p className={`text-3xl md:text-4xl font-display font-bold tracking-tighter text-black mb-4 group-hover:luxury-text transition-all duration-500 ${isActive ? "luxury-text" : ""}`}>
          {stat.val}
        </p>
        
        <p className={`text-stone-500 text-[11px] leading-relaxed max-w-[200px] transition-all duration-500 font-medium ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"}`}>
          {stat.desc}
        </p>
      </div>

      {/* Hover Decorative Element */}
      <div className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-700 rounded-b-2xl ${isActive ? "w-full" : "w-0 lg:group-hover:w-full"}`} />
      <div className={`absolute inset-0 bg-accent/[0.02] transition-opacity duration-500 rounded-2xl ${isActive ? "opacity-100" : "opacity-0 lg:group-hover:opacity-100"}`} />
    </div>
  );
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Caliber Precision", val: "±0.001s", desc: "Sub-millisecond accuracy in real-time." },
    { label: "Hand-Finished", val: "8K UHD", desc: "Pixel-perfect textures for extreme detail." },
    { label: "Craftsmanship", val: "Elite", desc: "Curated by master horological engineers." },
    { label: "Watch Models", val: "Dynamic", desc: "Infinite customization possibilities." }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-white relative z-10 overflow-hidden py-24">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-accent/[0.02] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        {/* Section Heading */}
        <div className={`mb-24 text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-accent/30" />
            <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[10px]">Technical Specifications</span>
            <div className="w-12 h-[1px] bg-accent/30" />
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-black uppercase tracking-tight">
            Engineered <span className="text-accent">Excellence</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}




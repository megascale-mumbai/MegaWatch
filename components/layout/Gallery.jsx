"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

function GalleryItem({ item, index }) {
  const [isActive, setIsActive] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth < 1024) {
          setIsActive(entry.isIntersecting);
        }
      },
      { threshold: 0.6 }
    );

    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={itemRef}
      className={`group relative overflow-hidden rounded-2xl sm:rounded-[20px] aspect-[4/3] sm:aspect-[16/10] bg-stone-100 ${isActive ? "is-active" : ""}`}
    >
      <img 
        src={item.img} 
        alt={item.title} 
        className={`w-full h-full object-cover grayscale-[0.5] transition-all duration-1000 ${isActive ? "grayscale-0 scale-105" : "group-hover:grayscale-0 group-hover:scale-105"}`}
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity ${isActive ? "opacity-90" : "opacity-80 group-hover:opacity-90"}`} />
      <div className={`absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 lg:p-10 w-full transform transition-transform duration-500 ${isActive ? "translate-y-0" : "translate-y-4 group-hover:translate-y-0"}`}>
        <span className="text-accent text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-1 sm:mb-2 block">{item.type}</span>
        <h3 className="text-base sm:text-lg md:text-xl lg:text-3xl font-display font-bold text-white mb-1.5 sm:mb-3">{item.title}</h3>
        <p className={`text-stone-300 text-[10px] sm:text-xs md:text-sm max-w-md mb-3 sm:mb-4 transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>{item.desc}</p>
        <Link href="/collection" className="text-white text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 sm:gap-3 group/btn">
          View Details
          <div className={`h-[1px] bg-white/30 transition-all ${isActive ? "w-12 bg-accent" : "w-8 group-hover/btn:w-12 group-hover/btn:bg-accent"}`} />
        </Link>
      </div>
    </div>
  );
}

export default function Gallery() {
  const items = [
    { 
      title: "Obsidian Stealth", 
      type: "Black Edition", 
      img: "/watch_black_edition_1778735572330.png",
      desc: "A masterclass in minimalism. Matte sapphire casing with bioluminescent markers."
    },
    { 
      title: "Royal Skeleton", 
      type: "Heritage Gold", 
      img: "/watch_gold_skeleton_1778735587598.png",
      desc: "Witness the heartbeat of time. 18K gold architecture with exposed tourbillon."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="w-full px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-8 md:mb-10">
          <h4 className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[9px] md:text-[10px] mb-4">Curated Selection</h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-black uppercase tracking-tight">The Masterpiece <span className="text-accent italic">Gallery.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {items.map((item, i) => (
            <GalleryItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}


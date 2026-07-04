"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import { Award, ShieldCheck, HeartHandshake, Compass } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Award className="text-accent" size={32} strokeWidth={1.5} />,
      title: "Unmatched Craftsmanship",
      description: "Every MegaWatch is assembled by master horologists with decades of experience, combining micro-precision engineering with timeless Swiss handcrafting techniques.",
    },
    {
      icon: <ShieldCheck className="text-accent" size={32} strokeWidth={1.5} />,
      title: "Premium Materials",
      description: "We source only the highest grade materials: aerospace-grade titanium, scratch-resistant sapphire crystal, marine-grade stainless steel, and ethically sourced leather.",
    },
    {
      icon: <Compass className="text-accent" size={32} strokeWidth={1.5} />,
      title: "Innovation First",
      description: "While we respect traditional horology, we constantly push boundaries. Our dynamic watch interfaces represent a seamless blend of mechanical legacy and digital ingenuity.",
    },
    {
      icon: <HeartHandshake className="text-accent" size={32} strokeWidth={1.5} />,
      title: "Lifetime Guarantee",
      description: "We stand behind our timepieces. Every MegaWatch comes with a lifetime guarantee of authenticity and performance, supported by our global network of master watchmakers.",
    },
  ];

  return (
    <main className="min-h-screen bg-background pb-24 relative overflow-hidden">
      <Navbar />

      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      {/* HERO SECTION */}
      <div className="w-full pt-28 px-6 md:px-12">
        <header className="mb-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-black tracking-[0.6em] uppercase mb-6 text-[10px]"
          >
            OUR HERITAGE
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-6 text-black leading-none uppercase"
          >
            CRAFTING TIME
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-12 h-0.5 bg-accent mx-auto mb-8" 
          />
        </header>

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight text-black leading-tight">
              WHERE LEGACY MEETS THE <span className="text-accent italic">FUTURE</span>
            </h3>
            <p className="text-stone-500 text-lg leading-relaxed font-medium">
              Founded under a singular vision to redefine watchmaking, MegaWatch bridges the gap between traditional mechanical engineering and modern digital design. Our timepieces are built for collectors who value both heritage and technological progress.
            </p>
            <p className="text-stone-400 text-sm leading-relaxed">
              Every curve, dial, and hand is meticulously conceptualized in our design studios. We combine classic Swiss aesthetics with fully customizable digital engines, allowing watch enthusiasts to build a personal statement that tells more than just time.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-[32px] overflow-hidden aspect-[16/10] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] border border-black/5"
          >
            <img 
              src="/backgrounds/workshop.png" 
              alt="MegaWatch Workshop" 
              className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Our Atelier</span>
              <h4 className="text-white font-bold text-xl">Geneva, Switzerland</h4>
            </div>
          </motion.div>
        </div>

        {/* CORE VALUES */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-10">
            <h3 className="text-lg md:text-xl font-display font-bold uppercase tracking-tight text-black mb-2">
              OUR GUIDING PRINCIPLES
            </h3>
            <p className="text-stone-400 text-sm max-w-lg mx-auto">
              Every timepiece we design, build, and service is guided by four fundamental values.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="p-6 md:p-8 bg-white border border-black/5 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-stone-50 border border-black/5 flex items-center justify-center mb-4 shadow-sm">
                  {val.icon}
                </div>
                <h4 className="text-black font-display font-bold uppercase tracking-wider mb-4 text-base md:text-lg">
                  {val.title}
                </h4>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-black rounded-[24px] p-8 md:p-14 text-center relative overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.15)_0%,transparent_60%)]" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-display font-bold uppercase tracking-tight leading-tight">
              EXPLORE THE ART OF TIME
            </h3>
            <p className="text-stone-400 text-base leading-relaxed">
              Find your signature design or build a custom luxury timepiece that mirrors your exact taste.
            </p>
            <div className="pt-4">
              <Link 
                href="/collection" 
                className="inline-block py-5 px-10 bg-accent text-black font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white transition-colors shadow-xl"
              >
                Browse Collection
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

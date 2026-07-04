"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, ZoomIn, Palette, Layers, Watch as WatchIcon } from "lucide-react";

const finishes = [
  { id: "steel", name: "Steel", color: "bg-stone-300", gradient: "linear-gradient(135deg, #d1d5db, #9ca3af, #f3f4f6)" },
  { id: "gold", name: "Gold", color: "bg-accent", gradient: "linear-gradient(135deg, #b8860b, #facc15, #966d09)" },
  { id: "titanium", name: "Titanium", color: "bg-stone-600", gradient: "linear-gradient(135deg, #4b5563, #9ca3af, #374151)" },
];

const straps = [
  { id: "black", name: "Onyx Leather", color: "bg-black" },
  { id: "brown", name: "Cognac Leather", color: "bg-[#5d4037]" },
  { id: "blue", name: "Navy Rubber", color: "bg-[#1e3a8a]" },
  { id: "silver", name: "Steel Link", color: "bg-stone-400" },
];

const dialColors = [
  { id: "none", name: "Original", filter: "hue-rotate(0deg)" },
  { id: "blue", name: "Deep Sea", filter: "hue-rotate(180deg) brightness(0.8) saturate(1.5)" },
  { id: "emerald", name: "Emerald", filter: "hue-rotate(90deg) brightness(0.7) saturate(1.2)" },
  { id: "ruby", name: "Ruby", filter: "hue-rotate(320deg) brightness(0.7) saturate(1.5)" },
];

export default function InteractiveExperience() {
  const [finish, setFinish] = useState(finishes[1]);
  const [strap, setStrap] = useState(straps[0]);
  const [dial, setDial] = useState(dialColors[0]);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [time, setTime] = useState(null);

  // Clock hands logic
  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const secondAngle = time ? time.getSeconds() * 6 : 0;
  const minuteAngle = time ? time.getMinutes() * 6 + time.getSeconds() * 0.1 : 0;
  const hourAngle = time ? (time.getHours() % 12) * 30 + time.getMinutes() * 0.5 : 0;

  return (
    <section className="py-24 md:py-40 bg-stone-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          
          {/* LEFT: INTERACTIVE VIEWER */}
          <div className="flex-1 relative w-full aspect-square max-w-[600px] flex items-center justify-center">
            {/* Background platform */}
            <div className="absolute inset-0 bg-white rounded-[60px] shadow-2xl border border-black/5" />
            
            {/* Decorative Rings */}
            <div className="absolute w-[80%] h-[80%] border border-black/[0.03] rounded-full animate-spin [animation-duration:40s]" />
            <div className="absolute w-[90%] h-[90%] border border-black/[0.01] rounded-full animate-spin-reverse [animation-duration:60s]" />

            {/* THE WATCH */}
            <motion.div
              style={{ 
                rotate: rotation,
                scale: zoom
              }}
              className="relative z-10 w-[280px] h-[280px] md:w-[450px] md:h-[450px]"
            >
              {/* Strap (Simulated) */}
              <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[40%] h-[150%] rounded-[40px] shadow-2xl overflow-hidden z-0">
                <div 
                  className={`w-full h-full ${strap.color} transition-colors duration-1000 relative`}
                >
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />
                </div>
              </div>

              {/* Case */}
              <div 
                style={{ background: finish.gradient }}
                className="absolute inset-0 rounded-full border-[10px] md:border-[18px] border-black/10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(255,255,255,0.3)] z-10 p-4 md:p-6"
              >
                {/* Dial Wrapper */}
                <div className="relative w-full h-full rounded-full bg-black overflow-hidden shadow-inner">
                  {/* Dial Image with Filter */}
                  <img 
                    src="/watches/watch3/dial.png" 
                    alt="Dial"
                    style={{ filter: dial.filter }}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 transition-all duration-1000"
                  />

                  {/* Hands */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    {time && (
                      <>
                        <div className="absolute w-2 h-[28%] bg-white rounded-full origin-bottom" style={{ transform: `translateY(-50%) rotate(${hourAngle}deg)` }} />
                        <div className="absolute w-1.5 h-[40%] bg-stone-300 rounded-full origin-bottom" style={{ transform: `translateY(-50%) rotate(${minuteAngle}deg)` }} />
                        <div className="absolute w-0.5 h-[45%] bg-accent rounded-full origin-bottom" style={{ transform: `translateY(-50%) rotate(${secondAngle}deg)` }} />
                      </>
                    )}
                    <div className="w-5 h-5 rounded-full bg-accent border-4 border-black z-30" />
                  </div>

                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/40 z-40" />
                </div>
              </div>
            </motion.div>

            {/* Quick Controls overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-50">
               <button 
                onClick={() => setRotation(r => r + 90)}
                className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-accent transition-colors shadow-xl"
              >
                <RotateCw size={18} />
              </button>
              <button 
                onClick={() => setZoom(z => z === 1 ? 1.2 : 1)}
                className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-accent transition-colors shadow-xl"
              >
                <ZoomIn size={18} />
              </button>
            </div>
          </div>

          {/* RIGHT: CONTROLS PANEL */}
          <div className="flex-1 w-full">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-accent" />
                <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[10px]">Real-time Configurator</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-black uppercase tracking-tight mb-8">
                INTERACTIVE <br />
                <span className="text-accent italic">EXPERIENCE.</span>
              </h2>
              <p className="text-stone-500 text-base md:text-lg max-w-md leading-relaxed font-medium">
                Take control of every detail. Experience the masterpiece before it ever touches your wrist.
              </p>
            </div>

            <div className="grid gap-10">
              {/* Finish Selection
              <div>
                <label className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-stone-400 mb-6 block">Metal Finish</label>
                <div className="flex flex-wrap gap-4">
                  {finishes.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFinish(f)}
                      className={`px-8 py-4 rounded-xl border flex items-center gap-3 transition-all duration-300 ${finish.id === f.id ? "bg-black text-white border-black" : "bg-white text-stone-600 border-black/5 hover:border-black/20"}`}
                    >
                      <div className={`w-4 h-4 rounded-full border border-white/20`} style={{ background: f.gradient }} />
                      <span className="text-[11px] font-bold uppercase tracking-widest">{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Strap Selection */}
              {/* <div>
                <label className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-stone-400 mb-6 block">Strap Material</label>
                <div className="flex flex-wrap gap-4">
                  {straps.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setStrap(s)}
                      className={`px-8 py-4 rounded-xl border flex items-center gap-3 transition-all duration-300 ${strap.id === s.id ? "bg-black text-white border-black" : "bg-white text-stone-600 border-black/5 hover:border-black/20"}`}
                    >
                      <div className={`w-4 h-4 rounded-full ${s.color}`} />
                      <span className="text-[11px] font-bold uppercase tracking-widest">{s.name}</span>
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Dial Color Selection */}
              <div>
                <label className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-stone-400 mb-6 block">Dial Aesthetic</label>
                <div className="flex flex-wrap gap-4">
                  {dialColors.map(d => (
                    <button
                      key={d.id}
                      onClick={() => setDial(d)}
                      className={`px-8 py-4 rounded-xl border flex items-center gap-3 transition-all duration-300 ${dial.id === d.id ? "bg-black text-white border-black" : "bg-white text-stone-600 border-black/5 hover:border-black/20"}`}
                    >
                      <Palette size={14} className={dial.id === d.id ? "text-accent" : "text-stone-400"} />
                      <span className="text-[11px] font-bold uppercase tracking-widest">{d.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-black/5 flex items-center justify-between">
                 <div className="flex gap-10">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Movement</span>
                      <span className="text-xs font-display font-bold text-black uppercase">Automatic</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Accuracy</span>
                      <span className="text-xs font-display font-bold text-black uppercase">±0.001s</span>
                    </div>
                 </div>
                 <Link href="/editor" className="px-10 py-5 bg-accent text-white text-[10px] font-display font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                    Go Full Bespoke
                 </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

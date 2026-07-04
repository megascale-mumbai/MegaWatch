"use client";

import { motion } from "framer-motion";

export default function Legacy() {
  return (
    <section className="py-12 md:py-16 lg:py-10 xl:py-16 relative overflow-hidden bg-white">
      {/* Decorative background grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-16 items-center">
          {/* LEFT COLUMN: TYPOGRAPHY SECTION */}
          <div className="lg:col-span-6 space-y-8 text-left flex flex-col justify-center lg:pr-12 xl:pr-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[10px] md:text-[11px]">
                The Vision
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-6xl font-display font-extrabold text-black leading-tight tracking-tight uppercase">
              A LEGACY <br />
              <span className="text-accent italic">IN MOTION.</span>
            </h2>

            <p className="text-stone-600 text-sm sm:text-base md:text-lg lg:text-sm xl:text-lg leading-relaxed font-medium max-w-xl">
              MegaWatch was born from a singular vision: to bridge the gap
              between traditional Swiss horology and the limitless potential of
              digital engineering. Every pixel is crafted with the same
              reverence as a hand-polished gear.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-stone-100">
              <div className="space-y-1.5">
                <h4 className="font-bold text-accent uppercase tracking-widest text-[11px] sm:text-[12px]">
                  Heritage
                </h4>
                <p className="text-stone-555 text-xs sm:text-sm leading-relaxed font-medium">
                  Founded on the principles of classic watchmaking and timeless
                  design.
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-accent uppercase tracking-widest text-[11px] sm:text-[12px]">
                  Innovation
                </h4>
                <p className="text-stone-555 text-xs sm:text-sm leading-relaxed font-medium">
                  Powered by the world&apos;s most advanced real-time rendering
                  engine.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ROTATING WATCH CIRCLES */}
          <div className="lg:col-span-6 relative flex items-center justify-center overflow-visible min-h-[380px] md:min-h-[650px] lg:min-h-[400px] xl:min-h-[650px] w-full">
            {/* Luxury radial gold glow backdrop */}
            <div className="absolute w-[20rem] h-[20rem] md:w-[32rem] md:h-[32rem] bg-accent/[0.04] rounded-full blur-[80px] md:blur-[120px] pointer-events-none z-0" />

            {/* Concentric helper dashed circles in background (rotating slowly for draftsmanship feel) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
              className="absolute rounded-full border border-dashed border-stone-200/60 w-[15rem] h-[15rem] md:w-[25rem] md:h-[25rem] lg:w-[17rem] lg:h-[17rem] xl:w-[25rem] xl:h-[25rem] z-0"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              className="absolute rounded-full border border-dashed border-stone-200/60 w-[9.5rem] h-[9.5rem] md:w-[15.5rem] md:h-[15.5rem] lg:w-[10.5rem] lg:h-[10.5rem] xl:w-[15.5rem] xl:h-[15.5rem] z-0"
            />

            {/* Center Logo/Icon (pulsing softly) */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute z-20 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-xl border border-stone-100/80 flex items-center justify-center"
            >
              <span className="text-accent font-display font-extrabold text-base md:text-lg tracking-tight">
                MW
              </span>
            </motion.div>

            {/* OUTER IMAGE CIRCLE */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
              className="absolute w-[340px] h-[340px] md:w-[620px] md:h-[620px] lg:w-[420px] lg:h-[420px] xl:w-[620px] xl:h-[620px] flex items-center justify-center pointer-events-none z-10"
            >
              <img
                src="/watches/sport_watch_circle.png"
                alt="Sport Watch Circle"
                className="w-full h-full object-contain filter drop-shadow-lg mix-blend-multiply scale-[1.15]"
              />
            </motion.div>

            {/* INNER IMAGE CIRCLE */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="absolute w-[340px] h-[340px] md:w-[620px] md:h-[620px] lg:w-[420px] lg:h-[420px] xl:w-[620px] xl:h-[620px] flex items-center justify-center pointer-events-none z-10"
            >
              <img
                src="/watches/classic_watch_circle.png"
                alt="Classic Watch Circle"
                className="w-full h-full object-contain filter drop-shadow-md mix-blend-multiply scale-[1.15]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

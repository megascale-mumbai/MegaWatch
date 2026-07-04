"use client";

import Link from "next/link";

export default function Studio() {
  return (
    <section className="py-32 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h4 className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[10px] mb-8">Personalized Perfection</h4>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold text-black mb-12 uppercase leading-tight tracking-tighter sm:tracking-normal">
            YOUR TIME, <br />
            <span className="text-accent">YOUR VISION.</span>
          </h2>
          <p className="text-stone-600 text-base md:text-lg mb-16 leading-relaxed font-medium px-4 md:px-0">
            Step into the **MegaWatch Bespoke Studio**. From the material of the bezel to the ticking frequency of the seconds hand, every detail is at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 px-6 sm:px-0">
            <Link
              href="/editor"
              className="w-full sm:w-auto px-10 md:px-16 py-6 md:py-8 bg-black text-white text-[10px] md:text-[11px] font-display font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-2xl flex items-center justify-center gap-4 group"
            >
              Enter Bespoke Studio
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link
              href="/collection"
              className="w-full sm:w-auto px-10 md:px-16 py-6 md:py-8 border border-black/10 text-black text-[10px] md:text-[11px] font-display font-bold uppercase tracking-widest hover:border-black transition-all text-center"
            >
              Browse Configurations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

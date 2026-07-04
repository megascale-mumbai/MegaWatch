"use client";

import { useEffect, useState } from "react";

export default function Community() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("community-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="community-section" className="min-h-[80vh] flex items-center justify-center bg-white relative overflow-hidden">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 bg-[#fbfbfb]" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black/5 to-transparent" />
      
      {/* Large Atmospheric Shapes */}
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[140%] bg-accent/[0.03] -skew-x-12 translate-x-[-10%] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] border border-black/[0.02] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border border-black/[0.03] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 transition-all duration-[2000ms] ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
          
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.004 2C6.48 2 2.004 6.48 2.004 12C2.004 13.9 2.534 15.68 3.454 17.2L2.004 22L6.944 20.65C8.424 21.52 10.154 22 12.004 22C17.524 22 22.004 17.52 22.004 12C22.004 6.48 17.524 2 12.004 2ZM17.154 16.59C16.944 17.19 16.144 17.7 15.544 17.83C15.004 17.95 14.304 18.04 11.954 17.07C8.944 15.83 7.004 12.78 6.854 12.58C6.704 12.38 5.604 10.92 5.604 9.41C5.604 7.9 6.374 7.16 6.664 6.86C6.954 6.56 7.424 6.41 7.894 6.41C8.044 6.41 8.184 6.41 8.304 6.42C8.654 6.43 8.834 6.45 9.064 6.99C9.354 7.69 10.064 9.42 10.154 9.6C10.244 9.78 10.334 10.02 10.214 10.26C10.094 10.5 9.994 10.63 9.814 10.84C9.634 11.05 9.464 11.21 9.284 11.43C9.114 11.62 8.924 11.83 9.134 12.19C9.344 12.55 10.064 13.72 11.114 14.66C12.474 15.87 13.574 16.25 13.984 16.42C14.394 16.59 14.634 16.55 14.864 16.29C15.094 16.03 15.844 15.15 16.134 14.73C16.424 14.31 16.714 14.37 17.094 14.52C17.474 14.67 19.504 15.67 19.924 15.88C20.344 16.09 20.614 16.2 20.724 16.39C20.834 16.58 20.834 17.48 20.384 18.08C19.934 18.68 18.234 19.22 17.154 16.59Z"/>
                </svg>
              </div>
              <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[10px]">Exclusive Access</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-black mb-12 leading-[1.1] uppercase tracking-tighter">
              JOIN THE <br />
              <span className="text-accent">ELITE CIRCLE.</span>
            </h2>
            
            <p className="text-stone-500 text-base md:text-lg mb-16 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
              Step into the inner sanctum of horological excellence. Connect with connoisseurs and be the first to witness our limited masterpieces.
            </p>
            
            <a 
              href="https://wa.me/yourcommunitylink" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-8 px-16 py-9 bg-black text-white rounded-full font-display font-bold text-[12px] uppercase tracking-widest hover:bg-[#25D366] transition-all duration-700 group shadow-2xl hover:shadow-[#25D366]/30"
            >
              Enter Community
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-2 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          <div className="flex-1 relative hidden lg:block">
            <div className="relative z-10 w-full aspect-square bg-white rounded-full border border-black/5 shadow-inner flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
              <div className="text-center">
                  <div className="text-accent font-display font-bold text-[120px] mb-4 opacity-5 group-hover:opacity-10 transition-opacity duration-700">MW</div>
                  <p className="text-stone-300 font-display text-[10px] uppercase tracking-[0.8em]">Inner Circle</p>
              </div>
              
              {/* Animated Floating Badges */}
              <div className="absolute top-[15%] right-[10%] w-28 h-28 bg-white border border-black/5 rounded-3xl shadow-2xl flex flex-col items-center justify-center animate-float">
                  <span className="text-accent font-display font-bold text-2xl">500+</span>
                  <span className="text-[8px] font-bold text-stone-400 uppercase tracking-widest">Members</span>
              </div>
              
              <div className="absolute bottom-[20%] left-[5%] w-40 h-24 bg-white border border-black/5 rounded-3xl shadow-2xl p-6 flex flex-col justify-center animate-float [animation-delay:1.5s]">
                  <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-pulse" />
                    Live Now
                  </p>
                  <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-4 border-white bg-stone-200" />
                      ))}
                      <div className="w-8 h-8 rounded-full border-4 border-white bg-accent text-white text-[8px] font-bold flex items-center justify-center">+</div>
                  </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

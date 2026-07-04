"use client";

import DynamicWatch from "./DynamicWatch";
import Link from "next/link";

export default function WatchCard({ watch }) {
  return (
    <div className="group relative bg-white border border-black/5 p-10 hover:bg-stone-50 transition-all duration-700 overflow-hidden">
      <div className="absolute top-0 right-0 p-8">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      </div>

      <div className="mb-12 flex justify-center py-8 transition-all duration-1000 group-hover:scale-110">
        <div className="scale-100 drop-shadow-[0_40px_60px_rgba(0,0,0,0.12)] relative z-10">
          <DynamicWatch config={watch} />
        </div>
        {/* Shadow circle */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/[0.03] rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-black uppercase">
              Series {watch.id.replace('watch', '')}
            </h2>
            <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
              Precision Core
            </p>
          </div>
          <span className="text-accent font-black tracking-tighter text-xl">$2,400</span>
        </div>
        
        <div className="flex items-center gap-6 mt-8 pt-8 border-t border-black/5 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
           <Link 
             href={`/watch/${watch.id}`}
             className="flex-1 text-center py-4 bg-black text-white text-[9px] font-black uppercase tracking-[0.3em] hover:bg-accent transition-all"
           >
             Purchase
           </Link>
           <Link 
             href={`/editor?id=${watch.id}`}
             className="text-[9px] font-black uppercase tracking-[0.3em] text-stone-400 hover:text-black transition-colors"
           >
             Customize
           </Link>
        </div>
      </div>
    </div>
  );
}

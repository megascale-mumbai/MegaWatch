"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Truck, ShieldCheck, MessageSquare, Star, Send, CheckCircle } from "lucide-react";

// Removed ReviewCard as it's moved to ProductReviews.jsx

export default function ProductDetails({ specs, description, productId }) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description", icon: MessageSquare },
    { id: "specifications", label: "Specifications", icon: Settings },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "warranty", label: "Warranty", icon: ShieldCheck },
  ];

  const content = {
    description: (
      <div className="prose prose-sm max-w-none text-stone-500 leading-relaxed font-medium">
        {description}
      </div>
    ),
    specifications: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-10 gap-y-6 sm:gap-y-8">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="border-b border-black/5 pb-4">
            <p className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">{key.replace(/([A-Z])/g, ' $1')}</p>
            <p className="text-sm font-bold text-black uppercase">{value}</p>
          </div>
        ))}
      </div>
    ),
    shipping: (
      <div className="space-y-6">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-accent flex-shrink-0">
            <Truck size={18} />
          </div>
          <div>
            <h4 className="text-black font-display font-bold uppercase tracking-wider mb-1 text-sm">Free Express Shipping</h4>
            <p className="text-stone-500 text-xs leading-relaxed">Complimentary express shipping worldwide on all watch orders. Delivery typically takes 3-5 business days depending on your location.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-accent flex-shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h4 className="text-black font-display font-bold uppercase tracking-wider mb-1 text-sm">Secure Packaging</h4>
            <p className="text-stone-500 text-xs leading-relaxed">Every timepiece is securely packed in our signature luxury display box, double-boxed for maximum protection during transit.</p>
          </div>
        </div>
      </div>
    ),
    warranty: (
      <div>
        <div className="p-6 bg-stone-50 rounded-2xl border border-black/5">
           <h4 className="text-black font-display font-bold uppercase tracking-wider mb-4 flex items-center gap-3 text-sm">
             <ShieldCheck size={18} className="text-accent" />
             2-Year Warranty
           </h4>
           <p className="text-stone-500 text-xs leading-relaxed mb-6">
             All MegaWatch timepieces are covered by a comprehensive 2-year international warranty from the date of purchase. This covers manufacturing defects and internal movement components.
           </p>
           <ul className="space-y-3">
             {["Original MW Movement", "Case & Crystal Defects", "Water Resistance Integrity"].map((item, i) => (
               <li key={i} className="flex items-center gap-3 text-[10px] font-bold text-black uppercase tracking-widest">
                 <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                 {item}
               </li>
             ))}
           </ul>
        </div>
      </div>
    ),
  };

  return (
    <div className="w-full">
      <div className="divide-y divide-black/5 border-t border-black/5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <div key={tab.id} className="w-full">
              <button
                onClick={() => setActiveTab(isActive ? null : tab.id)}
                className="w-full py-6 flex flex-row items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? "text-accent" : "text-stone-400 group-hover:text-black"} />
                  <span className={`text-[11px] font-display font-bold uppercase tracking-[0.2em] ${isActive ? "text-black" : "text-stone-600 group-hover:text-black"}`}>
                    {tab.label}
                  </span>
                </div>
                <div className="text-stone-300 group-hover:text-black transition-colors relative flex items-center justify-center w-4 h-4">
                  <div className="absolute w-full h-[1.5px] bg-current" />
                  <div className={`absolute w-[1.5px] h-full bg-current transition-transform duration-300 ${isActive ? "rotate-90 scale-0" : "scale-100"}`} />
                </div>
              </button>
              
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pt-2">
                      {content[tab.id]}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}


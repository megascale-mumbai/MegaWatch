"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqItems = [
  {
    question: "How do I care for my mechanical automatic watch?",
    answer:
      "We recommend servicing your automatic movement every 3 to 5 years by a certified watchmaker. Avoid exposing the watch to strong magnetic fields, extreme temperatures, or heavy shocks. Clean the case regularly with a soft, dry microfiber cloth.",
  },
  {
    question: "What is the water resistance rating of your timepieces?",
    answer:
      "All Gravitas collection models are certified water-resistant up to 50 meters (5 ATM). This protects them against rain, sweat, splashes, and hand-washing. However, we advise against wearing them while swimming, diving, or in hot steam rooms.",
  },
  {
    question: "Do you offer worldwide shipping and insured delivery?",
    answer:
      "Yes, we provide complimentary, fully-insured worldwide shipping via premium couriers (DHL Express and FedEx). Every package is tracked, requires a direct signature upon delivery, and is shipped in a hand-crafted presentation box.",
  },
  {
    question: "What does the warranty cover?",
    answer:
      "Every timepiece is backed by our comprehensive 5-year international warranty. It covers any manufacturing defects in the mechanical movement, case, hands, and dial. The warranty does not cover scratch damage, normal wear and tear, or leather strap aging.",
  },
  {
    question: "How can I track my order once it is shipped?",
    answer:
      "As soon as your timepiece is dispatched, you will receive a confirmation email containing your tracking number and a link to trace your delivery in real-time. Our concierge team also monitors your shipment until it is safely delivered.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and bank wire transfers. All transactions are fully encrypted, secure, and protected against fraud.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-white border-t border-stone-100">
      {/* Decorative subtle accent circle in background */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/[0.01] rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="w-full px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-[1px] bg-accent/30" />
            <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[8px] md:text-[9px]">
              Support & Care
            </span>
            <div className="w-8 h-[1px] bg-accent/30" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-black uppercase leading-tight tracking-tight">
            FREQUENTLY ASKED{" "}
            <span className="text-accent italic">QUESTIONS.</span>
          </h2>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full">
          {/* LEFT COLUMN: WATCH IMAGE (col-span-3) */}
          <div className="lg:col-span-3 w-full flex justify-start lg:sticky lg:top-24 group/img-wrapper mx-auto lg:mx-0 max-w-[320px]">
            <div className="relative w-full aspect-[3/4] rounded-[24px] bg-stone-50 border border-black/5 shadow-md transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(184,134,11,0.12)] overflow-hidden group">
              <img
                src="/watch_gold_skeleton_1778735587598.png"
                alt="Luxury movement mechanism close up"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105 mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-stone-900/5 mix-blend-overlay pointer-events-none" />

              {/* Luxury gold highlight corner badge */}
              <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full z-10">
                <span className="text-[7px] font-black uppercase tracking-[0.25em] text-accent">
                  Craftsmanship
                </span>
              </div>
            </div>

            {/* Outer expanding gold reveal frame */}
            <div className="absolute -inset-3 border border-accent/0 rounded-[30px] transition-all duration-700 pointer-events-none group-hover/img-wrapper:-inset-4 group-hover/img-wrapper:border-accent/20 z-0 hidden lg:block" />
          </div>

          {/* RIGHT COLUMN: ACCORDION (col-span-9) */}
          <div className="lg:col-span-9 w-full space-y-3 flex flex-col justify-center">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border-b border-stone-100 pb-2.5 transition-colors duration-300"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between py-3 text-left group"
                  >
                    <span
                      className={`font-display font-bold text-[10px] sm:text-xs md:text-sm tracking-normal uppercase transition-colors duration-300 pr-4 ${isOpen ? "text-accent" : "text-black group-hover:text-accent"}`}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 ${isOpen ? "border-accent text-accent bg-accent/5" : "border-stone-200 text-stone-400 group-hover:border-black group-hover:text-black"}`}
                    >
                      {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-stone-500 text-[11px] sm:text-xs leading-relaxed pt-1 pb-3 pr-8 font-medium">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function TermsPage() {
  return (
    <main className="flex-1 bg-background relative overflow-hidden flex flex-col justify-between">
      <Navbar />

      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full pt-28 px-6 md:px-12 max-w-3xl mx-auto flex-grow pb-16">
        <header className="mb-8 text-center sm:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-black tracking-[0.6em] uppercase mb-4 text-[9px]"
          >
            LEGAL AGREEMENT
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl sm:text-3xl font-black tracking-tighter mb-4 text-black leading-none uppercase"
          >
            Terms and Conditions
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-12 h-0.5 bg-accent mb-6 origin-left"
          />
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 text-stone-500 text-sm leading-relaxed"
        >
          <p>
            Welcome to MegaWatch. By accessing this platform, configuring design
            models, or purchasing our luxury timepieces, you agree to comply
            with and be bound by the following terms of service.
          </p>
          <h3 className="text-black font-display font-bold uppercase tracking-wider text-base pt-4">
            1. Intellectual Property
          </h3>
          <p>
            All custom dial layouts, watch movement renderings, mechanical
            dynamic animations, and brand assets displayed on MegaWatch are the
            exclusive property of MegaWatch and protected by international
            copyright laws.
          </p>
          <h3 className="text-black font-display font-bold uppercase tracking-wider text-base pt-4">
            2. Bespoke Customizations
          </h3>
          <p>
            When utilizing our interactive horological studio to custom design
            watches, you acknowledge that configurations are built specifically
            to your order. Modifications or cancellations are not permitted once
            the assembly phase has initiated.
          </p>
          <h3 className="text-black font-display font-bold uppercase tracking-wider text-base pt-4">
            3. Disclaimer of Liability
          </h3>
          <p>
            MegaWatch strives for horizontal precision, but does not guarantee
            that color representation on screens matches 100% with the physical
            components due to screen calibration differences.
          </p>
        </motion.div>
      </div>
    </main>
  );
}

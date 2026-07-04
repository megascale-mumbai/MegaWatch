"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function ShippingPage() {
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
            ORDER SERVICE
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl sm:text-3xl font-black tracking-tighter mb-4 text-black leading-none uppercase"
          >
            Shipping & Returns
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
            At MegaWatch, we offer premium worldwide delivery services to ensure
            your customized timepiece reaches you in perfect condition.
          </p>
          <h3 className="text-black font-display font-bold uppercase tracking-wider text-base pt-4">
            1. Insured Worldwide Shipping
          </h3>
          <p>
            We provide complimentary, fully-insured delivery via DHL Express or
            FedEx on all watch orders. Every package is tracked, requires a
            direct signature upon delivery, and is packed in a protective,
            presentation-ready case.
          </p>
          <h3 className="text-black font-display font-bold uppercase tracking-wider text-base pt-4">
            2. Returns and Exchanges
          </h3>
          <p>
            If you are not completely satisfied with your purchase, you may
            return the timepiece in its original, unworn condition within 14
            days of delivery for a full refund or exchange. Custom engraved or
            specially bespoke timepieces are subject to customized evaluation.
          </p>
          <h3 className="text-black font-display font-bold uppercase tracking-wider text-base pt-4">
            3. Return Process
          </h3>
          <p>
            To initiate a return, contact our customer support concierge to
            request a secure prepaid shipping label. Pack your watch securely,
            including all original certificates, tags, and documentation.
          </p>
        </motion.div>
      </div>
    </main>
  );
}

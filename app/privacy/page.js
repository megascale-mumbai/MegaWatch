"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";

export default function PrivacyPage() {
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
            LEGAL INFORMATION
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl sm:text-3xl font-black tracking-tighter mb-4 text-black leading-none uppercase"
          >
            Privacy Policy
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
            At MegaWatch, we are committed to safeguarding the privacy of our
            visitors and clients. This Privacy Policy details how we collect,
            use, and store your personal information when you visit or interact
            with our platform.
          </p>
          <h3 className="text-black font-display font-bold uppercase tracking-wider text-base pt-4">
            1. Information Collection
          </h3>
          <p>
            We collect personal details such as name, email address, phone
            number, and billing information when you browse our catalog or
            configure a luxury timepiece on our dynamic design engine.
          </p>
          <h3 className="text-black font-display font-bold uppercase tracking-wider text-base pt-4">
            2. Secure Processing
          </h3>
          <p>
            Your data is strictly encrypted and shared only with premium payment
            gateways and trusted shipping partners (DHL, FedEx) to facilitate
            the delivery of your watch. We do not sell or lease customer
            information.
          </p>
          <h3 className="text-black font-display font-bold uppercase tracking-wider text-base pt-4">
            3. Customer Rights
          </h3>
          <p>
            You retain the right to review, update, or request the deletion of
            your personal records at any time. For questions regarding privacy,
            please contact our concierge service.
          </p>
        </motion.div>
      </div>
    </main>
  );
}

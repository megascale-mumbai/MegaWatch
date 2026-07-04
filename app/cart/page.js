"use client";

import Navbar from "@/components/ui/Navbar";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { cart } = useCart();

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      
      <div className="pt-32 pb-24 md:pt-48 md:pb-40">
        <div className="container mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-accent" />
                <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[10px]">Your Selection</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-display font-bold text-black uppercase tracking-tighter leading-none">
                SHOPPING <span className="text-accent italic">CART.</span>
              </h1>
            </div>
            
            <Link 
              href="/collection" 
              className="flex items-center gap-3 text-[10px] font-display font-bold uppercase tracking-[0.3em] text-stone-400 hover:text-black transition-colors"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>

          <div className="grid lg:grid-cols-[1.8fr_1.2fr] gap-12 lg:gap-20 items-start">
            
            {/* Cart List */}
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <CartItem key={`${item.id}-${item.variant.id}-${item.strap.id}`} item={item} />
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-32 text-center bg-white rounded-[40px] border border-black/5"
                  >
                    <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-8">
                      <ShoppingBag size={32} className="text-stone-300" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-black mb-4">YOUR CART IS EMPTY</h3>
                    <p className="text-stone-400 text-sm mb-12 max-w-xs mx-auto">Discover our curated collection of luxury timepieces and find your next masterpiece.</p>
                    <Link href="/collection" className="px-12 py-6 bg-black text-white rounded-2xl font-display font-bold text-[11px] uppercase tracking-widest hover:bg-accent transition-all shadow-xl">
                       Explore Collection
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Summary Panel */}
            {cart.length > 0 && <CartSummary />}

          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="py-20 border-t border-black/5 text-center bg-white">
         <p className="text-[10px] font-display font-bold uppercase tracking-[0.5em] text-stone-400">
           MegaWatch &copy; 2026. All Rights Reserved.
         </p>
      </footer>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ArrowRight, Ticket, ShieldCheck, Truck } from "lucide-react";

export default function CartSummary() {
  const { subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% Tax
  const discount = isApplied ? subtotal * 0.1 : 0; // 10% Discount
  const total = subtotal + shipping + tax - discount;

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === "MEGA10") {
      setIsApplied(true);
    }
  };

  return (
    <div className="bg-white rounded-[40px] p-8 md:p-10 border border-black/5 shadow-2xl sticky top-32">
      <h3 className="text-2xl font-display font-bold text-black uppercase tracking-tight mb-8">Order Summary</h3>
      
      <div className="space-y-6 mb-10">
        <div className="flex justify-between">
          <span className="text-stone-400 text-sm font-bold uppercase tracking-widest">Subtotal</span>
          <span className="text-black font-display font-bold">${subtotal.toLocaleString('en-US')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-stone-400 text-sm font-bold uppercase tracking-widest">Shipping</span>
          <span className="text-[#25D366] text-sm font-bold uppercase tracking-widest italic">Free</span>
        </div>
        <div className="flex justify-between">
          <span className="text-stone-400 text-sm font-bold uppercase tracking-widest">Tax (8%)</span>
          <span className="text-black font-display font-bold">${tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        
        {isApplied && (
          <div className="flex justify-between text-accent">
            <span className="text-sm font-bold uppercase tracking-widest">Discount (10%)</span>
            <span className="font-display font-bold">-${discount.toLocaleString('en-US')}</span>
          </div>
        )}
      </div>

      {/* Coupon Input */}
      <div className="relative mb-10">
        <input 
          type="text" 
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Promo Code"
          disabled={isApplied}
          className="w-full bg-stone-50 border border-black/5 rounded-2xl py-5 px-6 pr-24 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent transition-all"
        />
        <button 
          onClick={handleApplyCoupon}
          disabled={isApplied}
          className="absolute right-2 top-2 bottom-2 px-6 bg-black text-white rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-accent transition-all disabled:bg-stone-200"
        >
          {isApplied ? "Applied" : "Apply"}
        </button>
      </div>

      <div className="pt-8 border-t border-black/5 mb-10">
        <div className="flex justify-between items-end">
          <span className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Total Amount</span>
          <span className="text-4xl font-display font-bold text-black">${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      <button className="w-full py-7 bg-black text-white rounded-[24px] font-display font-bold text-[12px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-accent transition-all shadow-2xl group">
        Checkout Now
        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
      </button>

      {/* Trust Markers */}
      <div className="mt-10 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck size={16} className="text-accent" />
          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Secure Payment</span>
        </div>
        <div className="flex items-center gap-3">
          <Truck size={16} className="text-accent" />
          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Global Express</span>
        </div>
      </div>
    </div>
  );
}

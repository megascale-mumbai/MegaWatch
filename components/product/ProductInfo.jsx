"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingBag, CreditCard, ChevronRight, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductInfo({ product }) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedStrap, setSelectedStrap] = useState(product.straps[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-xl md:text-2xl lg:text-2xl font-display font-bold uppercase tracking-tight mb-3 leading-tight break-words">
          {product.name}
        </h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
          <div className="flex items-center gap-1 text-accent">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={`${i < Math.floor(product.rating) ? "" : "text-stone-200"}`} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
            ))}
          </div>
          <span className="text-stone-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">{product.reviews} Reviews</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <p className="text-2xl sm:text-3xl font-display font-bold text-accent">{product.price}</p>
          {product.compareAtPrice && (
            <p className="text-lg sm:text-xl font-display font-bold text-stone-300 line-through tracking-wide">
              {product.compareAtPrice}
            </p>
          )}
        </div>
      </div>

      <p className="text-stone-500 text-sm md:text-base leading-relaxed mb-10 font-medium">
        {product.description}
      </p>

      {/* Selectors */}
      <div className="space-y-10 mb-12">
        {/* Quantity */}
        <div>
          <span className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-stone-400 mb-6 block">Quantity</span>
          <div className="inline-flex items-center p-2 bg-stone-50 rounded-2xl border border-black/5 gap-6">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center font-bold hover:bg-black hover:text-white transition-all"
            >
              -
            </button>
            <span className="text-sm font-display font-bold w-4 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center font-bold hover:bg-black hover:text-white transition-all"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button
          onClick={() => addToCart(product, selectedVariant, selectedStrap, quantity)}
          className="w-full py-6 bg-black text-white rounded-2xl font-display font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-accent transition-all shadow-2xl group"
        >
          <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
          Add To Cart
        </button>
        <button className="w-full py-6 border-2 border-black text-black rounded-2xl font-display font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-black hover:text-white transition-all group">
          <CreditCard size={18} className="group-hover:scale-110 transition-transform" />
          Buy It Now
        </button>
      </div>

      {/* Trust Markers */}
      <div className="mt-12 pt-8 border-t border-black/5 flex flex-wrap gap-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#25D366]" />
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">In Stock - Ready to Ship</span>
        </div>
        <div className="flex items-center gap-3">
          <Check size={14} className="text-accent" />
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Free Express Shipping</span>
        </div>
      </div>
    </div>
  );
}

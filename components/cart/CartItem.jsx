"use client";

import { motion } from "framer-motion";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-[32px] border border-black/5 mb-6 group transition-all hover:shadow-xl"
    >
      {/* Product Image */}
      <div className="w-32 h-32 bg-stone-50 rounded-2xl flex-shrink-0 flex items-center justify-center p-4">
        <img src={item.image} alt={item.name} className="w-full h-full object-contain drop-shadow-xl" />
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left">
        <h4 className="text-xl font-display font-bold text-black uppercase tracking-tight mb-2">{item.name}</h4>
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Finish:</span>
            <span className="text-[10px] font-bold text-black uppercase">{item.variant.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Strap:</span>
            <span className="text-[10px] font-bold text-black uppercase">{item.strap.name}</span>
          </div>
        </div>
        <p className="text-accent font-display font-bold">{item.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-6 bg-stone-50 rounded-2xl p-2 border border-black/5">
        <button 
          onClick={() => updateQuantity(item.id, item.variant.id, item.strap.id, item.quantity - 1)}
          className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all"
        >
          <Minus size={14} />
        </button>
        <span className="text-sm font-display font-bold w-4 text-center">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.variant.id, item.strap.id, item.quantity + 1)}
          className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Remove Button */}
      <button 
        onClick={() => removeFromCart(item.id, item.variant.id, item.strap.id)}
        className="p-4 text-stone-300 hover:text-red-500 transition-colors"
      >
        <Trash2 size={20} />
      </button>
    </motion.div>
  );
}

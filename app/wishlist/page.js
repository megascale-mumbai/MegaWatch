"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingCart, Sliders } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    // Add default variant and strap
    const defaultVariant = product.variants ? product.variants[0] : { id: "default", name: "Default" };
    const defaultStrap = product.straps ? product.straps[0] : { id: "default", name: "Default" };
    addToCart(product, defaultVariant, defaultStrap, 1);
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col justify-between">
      <Navbar />

      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full pt-28 px-6 md:px-12 max-w-7xl mx-auto flex-grow pb-16 relative z-10">
        <header className="mb-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-black tracking-[0.6em] uppercase mb-4 text-[9px]"
          >
            FAVORITES
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter mb-4 text-black leading-none uppercase"
          >
            My Wishlist
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-12 h-0.5 bg-accent mx-auto mb-6" 
          />
        </header>

        {wishlist.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white border border-black/5 rounded-[24px] p-8 max-w-lg mx-auto shadow-sm"
          >
            <p className="text-stone-500 text-sm leading-relaxed mb-8">
              No timepieces in your wishlist yet. Explore our luxury collection to save your favorites.
            </p>
            <Link 
              href="/collection" 
              className="inline-block py-4 px-8 bg-black text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-accent hover:text-black transition-colors"
            >
              Browse Collection
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative bg-white rounded-[24px] p-6 transition-all duration-500 hover:shadow-xl border border-black/5 flex flex-col justify-between overflow-hidden text-left"
              >
                <div>
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-stone-50 border border-black/5 flex items-center justify-center text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={14} />
                  </button>

                  {/* Image Display */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-stone-50/60 flex items-center justify-center mb-6">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-36 h-36 object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Metadata */}
                  <span className="text-accent text-[8px] font-bold uppercase tracking-widest block mb-1">
                    {product.category}
                  </span>
                  <h3 className="text-black font-display font-bold uppercase tracking-tight text-base group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-stone-400 text-xs leading-relaxed mt-2 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col gap-3">
                  <div className="text-lg font-black text-black tracking-tight mb-1">
                    {product.price}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link 
                      href={`/product/${product.id}`}
                      className="py-3 bg-stone-50 hover:bg-stone-100 text-black border border-black/5 text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Sliders size={10} />
                      Detail
                    </Link>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="py-3 bg-black text-white text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 hover:bg-accent hover:text-black transition-all"
                    >
                      <ShoppingCart size={10} />
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

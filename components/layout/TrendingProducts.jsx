"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import DynamicWatch from "@/components/watch/DynamicWatch";

function ProductCard({ product }) {
  const getNumericPrice = (pStr) => {
    const clean = String(pStr || "").replace(/,/g, '');
    const match = clean.match(/[0-9]+(?:\.[0-9]+)?/);
    return match ? parseFloat(match[0]) : 0;
  };

  const priceVal = getNumericPrice(product.price) || 1200.00;
  const comparePriceVal = getNumericPrice(product.comparePrice) || (priceVal * 1.25);
  const discountPercent = comparePriceVal > priceVal ? Math.round(((comparePriceVal - priceVal) / comparePriceVal) * 100) : 0;

  const info = {
    name: product.name || `Series ${product.id.replace("watch", "")}`,
    price: product.price || "Rs. 1200.00",
    comparePrice: product.comparePrice || `Rs. ${(priceVal * 1.25).toFixed(2)}`,
    discountPercent,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative bg-white rounded-none overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col"
    >
      {/* Image Zone */}
      <Link
        href={`/product/${product.id}`}
        className="relative block overflow-hidden bg-[#fafafa] aspect-square rounded-none"
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.03)_0%,_transparent_70%)] pointer-events-none z-0" />

        {/* Product Image / Watch */}
        <div className="absolute inset-0 flex items-center justify-center p-0 z-10 transition-transform duration-700 group-hover:scale-102">
          {(product.image || product.dialImage) ? (
            <img
              src={product.image || product.dialImage}
              alt={info.name}
              className="w-full h-full object-contain"
              style={{ mixBlendMode: 'multiply' }}
            />
          ) : (
            <div className="w-full h-full p-6 flex items-center justify-center">
              <DynamicWatch config={product} />
            </div>
          )}
        </div>

        {/* Category badge top-left */}
        <div className="absolute top-2.5 left-2.5 z-20">
          <span className="px-2 py-0.5 bg-white border border-stone-200 text-[6.5px] font-display font-extrabold uppercase tracking-[0.25em] text-stone-500 shadow-sm">
            {product.category || "Trending"}
          </span>
        </div>

        {/* Sleek hover details overlay */}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
          <div className="px-5 py-2 bg-white text-black font-display font-black text-[9px] uppercase tracking-[0.25em] border border-stone-200 shadow-lg select-none">
            View Details
          </div>
        </div>
      </Link>

      {/* Info Zone */}
      <div className="px-3 sm:px-4 py-3 flex flex-col gap-2.5">
        {/* Title */}
        <h3 className="text-[10px] sm:text-[11px] font-display font-bold text-black uppercase tracking-wider leading-snug line-clamp-1">
          {info.name}
        </h3>

        {/* Price & Review Row */}
        <div className="flex items-center justify-between mt-0.5 gap-1">
          {/* Price → Discount Tag → Compare Price */}
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <span className="text-[11px] sm:text-xs font-display font-black text-black shrink-0">
              {info.price}
            </span>
            {info.discountPercent > 0 && (
              <span
                className="shrink-0 inline-flex items-center px-1 py-[1px] rounded-[3px] text-[8px] sm:text-[9px] font-bold tracking-wide leading-none"
                style={{
                  background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96d 45%, #b8922a 100%)',
                  color: '#2a1a00',
                  boxShadow: '0 1px 3px rgba(180,140,30,0.35)',
                  letterSpacing: '0.04em',
                }}
              >
                -{info.discountPercent}% OFF
              </span>
            )}
            <span className="text-[9px] sm:text-[10px] font-display font-medium text-stone-400 line-through shrink-0">
              {info.comparePrice}
            </span>
          </div>

          {/* Review Stars */}
          <div className="flex items-center gap-0.5 shrink-0">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="7" height="7" viewBox="0 0 24 24" fill={i < Math.floor(product.rating || 5) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" className="text-amber-500">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TrendingProducts() {
  const [trendingList, setTrendingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        // Fetch configs and products in parallel
        const [configRes, productRes] = await Promise.all([
          fetch('/api/watches?full=1'),
          fetch('/api/products')
        ]);
        
        if (!configRes.ok) throw new Error(`Failed to fetch watches: status ${configRes.status}`);
        if (!productRes.ok) throw new Error(`Failed to fetch products: status ${productRes.status}`);
        
        const configType = configRes.headers.get("content-type");
        const productType = productRes.headers.get("content-type");
        
        if (!configType?.includes("application/json") || !productType?.includes("application/json")) {
          throw new TypeError("Expected JSON response from server");
        }
        
        const configResult = await configRes.json();
        const productResult = await productRes.json();
        
        const customConfigs = (configResult.success && Array.isArray(configResult.data)) ? configResult.data : [];
        const rawProducts = productResult.data || productResult || [];
        
        if (Array.isArray(rawProducts) && rawProducts.length > 0) {
          // Take first 4 for trending
          const top4 = rawProducts.slice(0, 4);
          
          const mapped = top4.map(p => {
             const customConfigRecord = customConfigs.find(c => c.name === String(p.id));
             const hasCustomConfig = !!customConfigRecord;
             const customConfigData = customConfigRecord?.config || {};
             
             const priceVal = p.priceRange?.minVariantPrice?.amount || p.price || '1249.00';
             const rawCompare = p.priceRange?.maxVariantPrice?.amount 
               || p.compare_at_price 
               || p.variants?.[0]?.compare_at_price 
               || p.compareAtPrice 
               || null;
             
             const priceClean = String(priceVal).replace(/,/g, '');
             const priceMatch = priceClean.match(/[0-9]+(?:\.[0-9]+)?/);
             const priceNum = priceMatch ? parseFloat(priceMatch[0]) : 0;

             const compareClean = rawCompare ? String(rawCompare).replace(/,/g, '') : '';
             const compareMatch = compareClean ? compareClean.match(/[0-9]+(?:\.[0-9]+)?/) : null;
             const comparePriceNum = compareMatch ? parseFloat(compareMatch[0]) : null;

             const effectiveCompare = comparePriceNum && comparePriceNum > priceNum ? comparePriceNum : priceNum * 1.25;

             return {
                id: String(p.id),
                name: p.title || p.name || `Product ${p.id}`,
                price: `Rs. ${priceNum.toFixed(2)}`,
                comparePrice: `Rs. ${effectiveCompare.toFixed(2)}`,
                category: p.category || 'Trending',
                image: p.image_url || p.images?.[0]?.url || "/watches/trending/watch1.png",
                rating: 5.0,
                hasCustomConfig,
                ...customConfigData,
                dialImage: customConfigRecord?.dialImage || p.image_url || p.images?.[0]?.url,
                dialScale: customConfigRecord?.dialScale || 100
             };
          });
          setTrendingList(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch trending products", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-stone-50 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black/5 to-transparent" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full px-6 md:px-12">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[9px] md:text-[10px]">Curated</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-black uppercase tracking-tight">
              TRENDING <span className="text-accent italic">NOW.</span>
            </h2>
          </div>
          
          <Link href="/collection">
            <button className="text-[9px] md:text-[10px] font-display font-bold uppercase tracking-[0.25em] text-black border-b border-black/20 pb-1.5 hover:text-accent hover:border-accent transition-all duration-300">
              View All Products
            </button>
          </Link>
        </div>

        {/* 2 Columns on Mobile/Tablet, 4 Columns on Laptop/Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {isLoading ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center py-12">
               <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            trendingList.map((product, idx) => (
              <ProductCard key={product.id || idx} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

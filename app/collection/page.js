"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import DynamicWatch from "@/components/watch/DynamicWatch";
import { watchConfigs } from "@/components/watch/watchConfigs";
import { getWatchConfig } from "@/lib/watchStorage";
import Navbar from "@/components/ui/Navbar";

// Gender classification for our watch models
const watchGenders = {
  watch1: "Woman",
  watch2: "Man",
  watch3: "Man",
  watch4: "Woman",
  watch6: "Man",
};

// Details corresponding to the boxed product card design
const watchDetails = {
  watch1: {
    name: "Classic Elegance",
    desc: "Stainless steel with sapphire crystal",
    price: "$2,400",
  },
  watch2: {
    name: "Modern Chrono",
    desc: "Stainless steel with sapphire crystal",
    price: "$2,600",
  },
  watch3: {
    name: "Heritage Gold",
    desc: "18K Gold plated with sapphire crystal",
    price: "$3,750",
  },
  watch4: {
    name: "Titanium Stealth",
    desc: "Grade 5 Titanium with sapphire crystal",
    price: "$2,900",
  },
  watch6: {
    name: "Modern Minimalist",
    desc: "Brushed Steel with sapphire crystal",
    price: "$2,200",
  },
};

export default function Collection() {
  const [configs, setConfigs] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [collections, setCollections] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const initializeData = async () => {
      // 1. Fetch Collections
      let cols = [];
      try {
        const res = await fetch('/api/collections');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Expected JSON response from server");
        }
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          cols = result.data.map(col => ({
            id: String(col.id),
            title: col.title,
            handle: col.handle
          }));
          setCollections(cols);
        }
      } catch (err) {
        console.error("Failed to fetch collections", err);
      }

      // 2. Fetch All Products
      let fetchedProducts = [];
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Expected JSON response from server");
        }
        const result = await res.json();
        const rawData = result.data || result;

        // Fetch custom configs from our database
        let customConfigs = [];
        try {
          const configRes = await fetch('/api/watches');
          if (configRes.ok) {
            const configContentType = configRes.headers.get("content-type");
            if (configContentType && configContentType.includes("application/json")) {
              const configResult = await configRes.json();
              if (configResult.success && Array.isArray(configResult.data)) {
                customConfigs = configResult.data;
              }
            }
          }
        } catch (configErr) {
          console.error("Failed to fetch custom watch configs", configErr);
        }

        if (Array.isArray(rawData)) {
          fetchedProducts = rawData.map(product => {
            const priceVal = product.priceRange?.minVariantPrice?.amount || product.price || '1249.00';
            const rawCompare = product.priceRange?.maxVariantPrice?.amount 
              || product.compare_at_price 
              || product.variants?.[0]?.compare_at_price 
              || product.compareAtPrice 
              || null;
            const priceClean = String(priceVal).replace(/,/g, '');
            const priceMatch = priceClean.match(/[0-9]+(?:\.[0-9]+)?/);
            const priceNum = priceMatch ? parseFloat(priceMatch[0]) : 0;

            const compareClean = rawCompare ? String(rawCompare).replace(/,/g, '') : '';
            const compareMatch = compareClean ? compareClean.match(/[0-9]+(?:\.[0-9]+)?/) : null;
            const comparePriceNum = compareMatch ? parseFloat(compareMatch[0]) : null;

            const effectiveCompare = comparePriceNum && comparePriceNum > priceNum ? comparePriceNum : priceNum * 1.25;
            const cleanDesc = product.description
              ? product.description
                  .replace(/<[^>]*>/g, '')
                  .replace(/&nbsp;/g, ' ')
                  .replace(/&amp;/g, '&')
                  .replace(/\s+/g, ' ')
                  .trim()
              : 'Luxury Timepiece';
            
            // Look for a custom visual config where name matches the product ID
            const customConfigRecord = customConfigs.find(c => c.name === String(product.id));
            const hasCustomConfig = !!customConfigRecord;
            const customConfigData = customConfigRecord?.config || {};

            return {
              id: String(product.id),
              name: product.title || product.name || `Product ${product.id}`,
              description: cleanDesc,
              price: `Rs. ${priceNum.toFixed(2)}`,
              comparePrice: `Rs. ${effectiveCompare.toFixed(2)}`,
              category: product.category || 'Man',
              image: product.image_url || (product.images?.[0]?.url || null),
              dialImage: customConfigRecord?.dialImage || product.image_url || (product.images?.[0]?.url || product.dialImage || null),
              dialScale: customConfigRecord?.dialScale || 100,
              hasCustomConfig,
              
              // Custom configs
              caseColor: customConfigData.caseColor || product.caseColor || '#d4af37',
              strapColor: customConfigData.strapColor || product.strapColor || '#1c1917',
              dialColor: customConfigData.dialColor || product.dialColor || '#1c1917',
              hands: customConfigData.hands || product.hands || {
                hour: { color: '#ffffff' },
                minute: { color: '#ffffff' },
                second: { color: '#e74c3c', timing: 'sweep' }
              },
              hub: customConfigData.hub || undefined,
              subDials: customConfigData.subDials || undefined,
              markers: customConfigData.markers || undefined,
              dateWindow: customConfigData.dateWindow || undefined
            };
          });
        }
      } catch (err) {
        console.error("Failed to fetch products from backend API", err);
      }

      const updatedConfigs = {};
      if (fetchedProducts.length > 0) {
        setAllProducts(fetchedProducts);
        fetchedProducts.forEach(product => {
          updatedConfigs[product.id] = product;
        });
      } else {
        // Fallback to local default configs
        Object.keys(watchConfigs).forEach(id => {
          updatedConfigs[id] = {
            id,
            ...watchConfigs[id],
            name: watchDetails[id]?.name || `Series ${id.replace('watch', '')}`,
            description: watchDetails[id]?.desc || 'Luxury Timepiece',
            price: watchDetails[id]?.price || '$2,400'
          };
        });
      }

      setConfigs(updatedConfigs);
      setIsLoaded(true);
    };

    initializeData();
  }, []);

  const handleTabClick = async (tabId) => {
    setFilter(tabId);
    if (tabId === "ALL") {
      const updatedConfigs = {};
      if (allProducts.length > 0) {
        allProducts.forEach(p => {
          updatedConfigs[p.id] = p;
        });
      } else {
        Object.keys(watchConfigs).forEach(id => {
          updatedConfigs[id] = {
            id,
            ...watchConfigs[id],
            name: watchDetails[id]?.name || `Series ${id.replace('watch', '')}`,
            description: watchDetails[id]?.desc || 'Luxury Timepiece',
            price: watchDetails[id]?.price || '$2,400'
          };
        });
      }
      setConfigs(updatedConfigs);
    } else {
      setIsLoaded(false);
      try {
        const res = await fetch(`/api/collections/${tabId}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Expected JSON response from server");
        }
        const result = await res.json();
        
        const collectionProducts = result.data?.products || [];
        if (Array.isArray(collectionProducts) && collectionProducts.length > 0) {
          const mapped = collectionProducts.map(product => {
            const priceVal = product.priceRange?.minVariantPrice?.amount || product.price || '1249.00';
            const rawCompare = product.priceRange?.maxVariantPrice?.amount 
              || product.compare_at_price 
              || product.variants?.[0]?.compare_at_price 
              || product.compareAtPrice 
              || null;
            const cleanDesc = product.description ? product.description.replace(/<[^>]*>/g, '') : 'Luxury Timepiece';
            
            const priceClean = String(priceVal).replace(/,/g, '');
            const priceMatch = priceClean.match(/[0-9]+(?:\.[0-9]+)?/);
            const priceNum = priceMatch ? parseFloat(priceMatch[0]) : 0;

            const compareClean = rawCompare ? String(rawCompare).replace(/,/g, '') : '';
            const compareMatch = compareClean ? compareClean.match(/[0-9]+(?:\.[0-9]+)?/) : null;
            const comparePriceNum = compareMatch ? parseFloat(compareMatch[0]) : null;

            const effectiveCompare = comparePriceNum && comparePriceNum > priceNum ? comparePriceNum : priceNum * 1.25;
            
            return {
              id: String(product.id),
              name: product.title || product.name || `Product ${product.id}`,
              description: cleanDesc,
              price: `Rs. ${priceNum.toFixed(2)}`,
              comparePrice: `Rs. ${effectiveCompare.toFixed(2)}`,
              category: product.category || 'Man',
              dialImage: product.image_url || (product.images?.[0]?.url || product.dialImage || null),
              caseColor: '#d4af37',
              strapColor: '#1c1917',
              dialColor: '#1c1917',
              hands: {
                hour: { color: '#ffffff' },
                minute: { color: '#ffffff' },
                second: { color: '#e74c3c', timing: 'sweep' }
              }
            };
          });
          
          const newConfigs = {};
          mapped.forEach(p => {
            newConfigs[p.id] = p;
          });
          setConfigs(newConfigs);
        } else {
          // Fallback: Filter locally from allProducts matching the collection title/handle
          const selectedCol = collections.find(c => c.id === tabId);
          const colTitle = selectedCol ? selectedCol.title.toLowerCase() : '';
          
          const filtered = allProducts.filter(p => {
            const category = p.category ? p.category.toLowerCase() : '';
            return category.includes(colTitle) || colTitle.includes(category);
          });

          const newConfigs = {};
          if (filtered.length > 0) {
            filtered.forEach(p => {
              newConfigs[p.id] = p;
            });
          } else {
            const genderFilter = colTitle.includes('women') ? 'Woman' : 'Man';
            Object.keys(watchConfigs).forEach(id => {
              if (watchGenders[id] === genderFilter) {
                newConfigs[id] = {
                  id,
                  ...watchConfigs[id],
                  name: watchDetails[id]?.name || `Series ${id.replace('watch', '')}`,
                  description: watchDetails[id]?.desc || 'Luxury Timepiece',
                  price: watchDetails[id]?.price || '$2,400'
                };
              }
            });
          }
          setConfigs(newConfigs);
        }
      } catch (err) {
        console.error("Failed to fetch products for collection", err);
      }
      setIsLoaded(true);
    }
  };

  // Filter and Sort watches based on selected category and sort method
  const getSortedWatches = () => {
    const list = Object.values(configs);
    
    const getNumericPrice = (pStr) => {
      const clean = String(pStr || "").replace(/,/g, '');
      const match = clean.match(/[0-9]+(?:\.[0-9]+)?/);
      return match ? parseFloat(match[0]) : 0;
    };

    if (sortBy === "name-asc") {
      return [...list].sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
    }
    if (sortBy === "name-desc") {
      return [...list].sort((a, b) => String(b.name || "").localeCompare(String(a.name || "")));
    }
    if (sortBy === "price-asc") {
      return [...list].sort((a, b) => getNumericPrice(a.price) - getNumericPrice(b.price));
    }
    if (sortBy === "price-desc") {
      return [...list].sort((a, b) => getNumericPrice(b.price) - getNumericPrice(a.price));
    }
    return list;
  };

  const sortedWatches = getSortedWatches();

  return (
    <main className="min-h-screen bg-white pb-24 font-sans">
      <Navbar />

      {/* Top Banner (Full width, elegant reduced height, theme styling) */}
      <div
        className="relative w-full h-[65vh] min-h-[420px] flex items-center text-stone-900 bg-cover bg-center bg-no-repeat border-b border-stone-100"
        style={{ backgroundImage: "url('/backgrounds/collection_banner.png')" }}
      >
        {/* Subtle overlay for contrast */}
        <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />

        {/* Centered container with responsive padding matching grid system */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 w-full z-10">
          <div className="max-w-md sm:max-w-lg md:max-w-xl z-10 space-y-6 text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-display font-black uppercase tracking-tight leading-[0.95] text-stone-950">
              Designed to <br />
              <span className="text-accent">Endure</span>
            </h1>
            <div className="pt-2">
              <a
                href="#products-catalog"
                className="inline-block px-8 py-4 bg-black hover:bg-accent text-white font-display text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300 rounded-none shadow-md"
              >
                VIEW COLLECTIONS
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the Page content */}
      <div className="max-w-full mx-auto px-4 sm:px-8 md:px-12 xl:px-16 2xl:px-24 pt-24">
        {/* Section Header (Matches page styling) */}
        <div
          id="products-catalog"
          className="text-center max-w-2xl mx-auto mb-16 px-4 scroll-mt-24"
        >
          <h2 className="text-2xl sm:text-3.5xl font-display font-black text-stone-950 uppercase tracking-tight mb-4">
            Explore Our <span className="text-accent">Signature Pieces</span>
          </h2>
        </div>

        {/* Sidebar + Products Flex Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Sidebar Filter Panel */}
          <div className="w-full lg:w-64 shrink-0 bg-stone-50 border border-stone-200/80 p-5 space-y-7 lg:sticky lg:top-28 z-20">
            {/* Category Filter */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-700 border-b border-stone-200 pb-2.5 mb-3.5">
                Categories
              </h3>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => handleTabClick("ALL")}
                  className={`text-left text-[11px] font-display uppercase tracking-wider py-2 px-3 transition-all select-none cursor-pointer border ${
                    filter === "ALL"
                      ? "text-accent font-bold bg-accent/[0.03] border-accent/30 border-l-2 border-l-accent"
                      : "text-stone-500 hover:text-stone-850 hover:bg-stone-100/60 border-transparent"
                  }`}
                >
                  All Products
                </button>
                {collections.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => handleTabClick(col.id)}
                    className={`text-left text-[11px] font-display uppercase tracking-wider py-2 px-3 transition-all select-none cursor-pointer border ${
                      filter === col.id
                        ? "text-accent font-bold bg-accent/[0.03] border-accent/30 border-l-2 border-l-accent"
                        : "text-stone-500 hover:text-stone-850 hover:bg-stone-100/60 border-transparent"
                    }`}
                  >
                    {col.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Order Filter */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-700 border-b border-stone-200 pb-2.5 mb-3.5">
                Sort Options
              </h3>
              <div className="flex flex-col gap-1.5">
                {[
                  { value: "default", label: "Default Layout" },
                  { value: "price-asc", label: "Price: Low to High" },
                  { value: "price-desc", label: "Price: High to Low" },
                  { value: "name-asc", label: "Alphabetical: A-Z" },
                  { value: "name-desc", label: "Alphabetical: Z-A" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value)}
                    className={`text-left text-[11px] font-display uppercase tracking-wider py-2 px-3 transition-all select-none cursor-pointer border ${
                      sortBy === opt.value
                        ? "text-accent font-bold bg-accent/[0.03] border-accent/30 border-l-2 border-l-accent"
                        : "text-stone-500 hover:text-stone-850 hover:bg-stone-100/60 border-transparent"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid (Right Hand Side) */}
          <div className="flex-1 w-full">
            <motion.div
              className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            >
              <AnimatePresence mode="popLayout">
                {sortedWatches.map((watch, idx) => {
                  const priceVal = parseFloat((watch.price || "1200.00").replace(/[^0-9.]/g, '')) || 1200.00;
                  const comparePriceVal = parseFloat((watch.comparePrice || "").replace(/[^0-9.]/g, '')) || (priceVal * 1.25);
                  const discountPercent = comparePriceVal > priceVal ? Math.round(((comparePriceVal - priceVal) / comparePriceVal) * 100) : 0;
                  const info = {
                    name: watch.name || watchDetails[watch.id]?.name || `Series ${watch.id.replace("watch", "")}`,
                    desc: watch.description || watchDetails[watch.id]?.desc || "Luxury Timepiece",
                    price: watch.price || watchDetails[watch.id]?.price || "Rs. 1200.00",
                    comparePrice: watch.comparePrice || `Rs. ${(priceVal * 1.25).toFixed(2)}`,
                    discountPercent,
                  };
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.25, 1, 0.5, 1] }}
                      key={watch.id}
                      className="group relative bg-white rounded-none overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col"
                    >
                       {/* Image Zone */}
                       <Link
                         href={`/product/${watch.id}`}
                         className="relative block overflow-hidden bg-[#fafafa] aspect-square"
                       >
                         {/* Subtle radial glow */}
                         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.03)_0%,_transparent_70%)] pointer-events-none z-0" />
     
                         {/* Product Image / Watch */}
                         <div className="absolute inset-0 flex items-center justify-center p-0 z-10 transition-transform duration-700 group-hover:scale-102">
                           {(watch.image || watch.dialImage) ? (
                             <img
                               src={watch.image || watch.dialImage}
                               alt={info.name}
                               className="w-full h-full object-contain"
                               style={{ mixBlendMode: 'multiply' }}
                             />
                           ) : (
                             <DynamicWatch config={watch} />
                           )}
                         </div>
     
                         {/* Category badge top-left */}
                         <div className="absolute top-2.5 left-2.5 z-20">
                           <span className="px-2 py-0.5 bg-white border border-stone-200 text-[6.5px] font-display font-extrabold uppercase tracking-[0.25em] text-stone-500 shadow-sm">
                             {watch.category || "Collection"}
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
                             {discountPercent > 0 && (
                               <span
                                 className="shrink-0 inline-flex items-center px-1 py-[1px] rounded-[3px] text-[8px] sm:text-[9px] font-bold tracking-wide leading-none"
                                 style={{
                                   background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96d 45%, #b8922a 100%)',
                                   color: '#2a1a00',
                                   boxShadow: '0 1px 3px rgba(180,140,30,0.35)',
                                   letterSpacing: '0.04em',
                                 }}
                               >
                                 -{discountPercent}% OFF
                               </span>
                             )}
                             <span className="text-[9px] sm:text-[10px] font-display font-medium text-stone-400 line-through shrink-0">
                               {info.comparePrice}
                             </span>
                           </div>

                           {/* Review Stars */}
                           <div className="flex items-center gap-0.5 shrink-0">
                             {[...Array(5)].map((_, i) => (
                               <svg key={i} width="7" height="7" viewBox="0 0 24 24" fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" className="text-amber-500">
                                 <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                               </svg>
                             ))}
                           </div>
                         </div>
                       </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Screen Loader overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </main>
  );
}

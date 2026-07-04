"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import DynamicWatch from "@/components/watch/DynamicWatch";
import { watchConfigs } from "@/components/watch/watchConfigs";
import { getWatchConfig } from "@/lib/watchStorage";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";

export default function ProductPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const [config, setConfig] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({ features: true, description: false, specifications: false, shipping: false });

  const toggleAccordion = (key) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };
  const router = useRouter();

  useEffect(() => {
    const loadConfig = async () => {
      let productData = null;
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Expected JSON response from server");
        }
        const result = await res.json();
        if (result.success && result.data) {
          const product = result.data;
          
          const priceVal = product.priceRange?.minVariantPrice?.amount || product.price || '1249.00';
          const compareAtVal = product.compareAtPrice?.amount || product.compare_at_price || null;
          const cleanDesc = product.description ? product.description.replace(/<[^>]*>/g, '') : '';
          
          productData = {
            id: String(product.id),
            name: product.title || product.name || `Series ${id.replace('watch', '')}`,
            description: cleanDesc || 'Luxury Timepiece',
            price: priceVal,
            compareAtPrice: compareAtVal,
            images: product.images || [],
            category: product.category || 'Man',
            caseColor: '#d4af37',
            strapColor: '#1c1917',
            dialColor: '#1c1917',
            hands: {
              hour: { color: '#ffffff' },
              minute: { color: '#ffffff' },
              second: { color: '#e74c3c', timing: 'sweep' }
            }
          };
        }
      } catch (err) {
        console.error("Backend products fetch failed:", err);
      }

      // Fallback 1: Database watches
      if (!productData) {
        try {
          const res = await fetch(`/api/watches/${id}`);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Expected JSON response from server");
          }
          const result = await res.json();
          if (result.success && result.data) {
            const w = result.data;
            productData = { ...(w.config || {}), ...w };
            delete productData.config;
          }
        } catch (err) {
          console.error("Watches database fetch failed:", err);
        }
      }

      // Fallback 2: Local IndexedDB
      if (!productData && (watchConfigs[id] || id)) {
        productData = await getWatchConfig(id, null);
      }

      // Fallback 3: Static config
      if (!productData && watchConfigs[id]) {
        productData = watchConfigs[id];
      }

      if (productData) {
        setConfig(productData);
      } else {
        router.push("/collection");
        return;
      }

      setTimeout(() => setIsLoaded(true), 150);
    };
    loadConfig();
  }, [id, router]);

  if (!config) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-stone-200 border-t-black rounded-full animate-spin" />
      </main>
    );
  }

  const hasImages = config.images && config.images.length > 0;

  return (
    <main className="min-h-screen bg-white pb-24 font-sans text-stone-900">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-24 lg:pt-32">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-[12px] font-medium text-stone-500 uppercase tracking-wider">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collection" className="hover:text-black transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-stone-900 font-bold">{config.name}</span>
        </nav>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 lg:items-start">

          {/* LEFT: Image Gallery + Main Image */}
          <div className="w-full lg:w-[60%] flex gap-4 lg:gap-6 h-[500px] md:h-[650px] lg:sticky lg:top-24 z-10">
            {/* Thumbnails Sidebar */}
            <div className="w-20 hidden md:flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
              {hasImages ? (
                config.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-full aspect-square bg-stone-50 rounded-md border-2 cursor-pointer flex items-center justify-center overflow-hidden transition-all shrink-0 ${activeImageIndex === i ? 'border-black' : 'border-transparent hover:border-stone-300'}`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-contain p-2" />
                  </div>
                ))
              ) : (
                [1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`w-full aspect-square bg-white rounded-md border-2 cursor-pointer flex items-center justify-center overflow-hidden transition-all shrink-0 ${i === 1 ? 'border-black' : 'border-transparent hover:border-stone-300'}`}>
                    <div className="w-full h-full mix-blend-multiply pointer-events-none">
                      <div className="w-full h-full origin-center scale-[0.85] flex items-center justify-center">
                        <DynamicWatch config={config} />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Main Image Container */}
            <div className="flex-1 bg-white rounded-xl relative flex items-center justify-center overflow-hidden group">
              {hasImages ? (
                <div className="w-full h-full relative z-10 transition-transform duration-700 ease-out group-hover:scale-105 flex items-center justify-center">
                  <img src={config.images[activeImageIndex]?.url} alt={config.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
              ) : (
                <div className="w-full h-full relative z-10 mix-blend-multiply pointer-events-none">
                  <div className="w-full h-full scale-[0.85] transition-transform duration-700 ease-out group-hover:scale-[0.95] flex items-center justify-center p-8 pointer-events-auto">
                    <DynamicWatch config={config} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="w-full lg:w-[40%] flex flex-col pt-2 md:pt-4">

            {/* Brand & Rating */}
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-[10px] font-black text-stone-400 tracking-[0.3em] uppercase">MEGAWATCH</h2>
              <div className="flex items-center gap-1 text-[11px] font-bold text-stone-600">
                <span className="text-stone-900">★</span> 4.71 <span className="text-stone-400 font-normal">(24)</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-4 text-stone-900">
              {config.name}
            </h1>

            {/* Sub-description */}
            <div className="mb-6">
               <div className="text-[10px] font-bold text-stone-400 tracking-[0.15em] uppercase mb-2">
                 Ideal For: <span className="text-stone-900 ml-1">Men</span>
               </div>
               {config.description ? (
                 <div className="text-[13px] text-stone-500 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: config.description }} />
               ) : (
                 <p className="text-[13px] text-stone-500 font-medium leading-relaxed">No description available.</p>
               )}
            </div>

            {/* Price Block */}
            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-1">
                <span className="text-4xl font-black text-stone-900 tracking-tight">
                  Rs. {parseFloat(config.price || '1249').toFixed(2)}
                </span>
                {config.compareAtPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400 line-through text-lg font-semibold">Rs. {parseFloat(config.compareAtPrice).toFixed(2)}</span>
                    <span className="bg-stone-900 text-white text-[9px] font-bold px-2 py-1 uppercase tracking-[0.1em]">
                      {Math.round(((parseFloat(config.compareAtPrice) - parseFloat(config.price)) / parseFloat(config.compareAtPrice)) * 100)}% Off
                    </span>
                  </div>
                )}
              </div>
              <p className="text-[11px] text-stone-500 font-medium tracking-wide mt-2">MRP (Inclusive of all taxes). Shipping calculated at checkout.</p>
            </div>

            {/* Colors Selection */}
            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-900">Available Colors</h3>
              </div>
              <div className="flex gap-4">
                <div className="w-16 flex flex-col items-center gap-3 cursor-pointer group">
                  <div className="w-full aspect-square border-2 border-stone-900 bg-stone-50 flex items-center justify-center p-2 relative overflow-hidden transition-all">
                    {hasImages ? (
                      <img src={config.images[0]?.url} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    ) : (
                      <div className="w-[150%] h-[150%] scale-[0.4] origin-center pointer-events-none flex items-center justify-center">
                        <DynamicWatch config={config} />
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-black text-stone-900 uppercase tracking-widest">Primary</span>
                </div>

                <div className="w-16 flex flex-col items-center gap-3 cursor-pointer group opacity-60 hover:opacity-100 transition-opacity">
                  <div className="w-full aspect-square border border-stone-200 group-hover:border-stone-400 bg-stone-50 flex items-center justify-center p-2 relative overflow-hidden transition-all">
                    {hasImages && config.images[1] ? (
                      <img src={config.images[1]?.url} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    ) : (
                      <div className="w-[150%] h-[150%] scale-[0.4] origin-center pointer-events-none flex items-center justify-center">
                        <DynamicWatch config={{ ...config, frameColor: '#e5e7eb' }} />
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-bold text-stone-500 uppercase tracking-widest group-hover:text-stone-900">Secondary</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="flex-1 py-4 md:py-4 border border-stone-900 text-stone-900 font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-stone-50 transition-all">
                Add To Cart
              </button>
              <button className="flex-1 py-4 md:py-4 bg-stone-900 text-white font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-black hover:-translate-y-0.5 transition-all duration-300">
                Buy Now
              </button>
            </div>

            {/* Delivery Check */}
            <div className="mb-8 border-t border-b border-stone-100 py-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-4 text-stone-900">Delivery Options</h3>
              <div className="flex relative">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="flex-1 border-b border-stone-300 px-0 py-2 text-sm font-medium focus:outline-none focus:border-stone-900 bg-transparent transition-colors placeholder:text-stone-400"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-900 text-[10px] font-bold uppercase tracking-widest hover:text-black transition-colors">
                  Check
                </button>
              </div>
            </div>

            {/* Features Accordion */}
            <div className="mb-6">
              <div onClick={() => toggleAccordion('features')} className="flex justify-between items-center mb-6 pb-4 border-b border-stone-100 cursor-pointer group">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-stone-900 group-hover:text-stone-600 transition-colors">Features</h3>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${openAccordions.features ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>

              {openAccordions.features && (
                <div className="grid grid-cols-2 gap-y-10 gap-x-4 pl-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  {[
                    { 
                      icon: (
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-900">
                          <path d="M2 17c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
                          <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
                          <path d="M12 14a5 5 0 0 1-5-5V7h10v2a5 5 0 0 1-5 5z" />
                          <path d="M9 7V5a2 2 0 0 1 4 0v2" />
                        </svg>
                      ), 
                      text: "30 M Water Resistant" 
                    },
                    { 
                      icon: (
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-900">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <circle cx="12" cy="11" r="4" />
                          <path d="M12 9v2l1.5 1.5" />
                        </svg>
                      ), 
                      text: "Durable Material" 
                    },
                    { 
                      icon: (
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-900">
                          <circle cx="12" cy="12" r="10" />
                          <text x="12" y="16" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold" fill="currentColor" stroke="none">ALS</text>
                        </svg>
                      ), 
                      text: "Multiple Alarms" 
                    },
                    { 
                      icon: (
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-900">
                          <circle cx="12" cy="14" r="8" />
                          <path d="M12 10v4l2 2" />
                          <path d="M10 2h4" />
                          <path d="M12 2v4" />
                          <path d="M18 7l-1.5 1.5" />
                        </svg>
                      ), 
                      text: "Multi Functional" 
                    },
                    {
                      icon: (
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-900">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      ),
                      text: "1 Year Warranty"
                    }
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-5">
                      <div className="flex-shrink-0 flex items-center justify-center">
                        {feat.icon}
                      </div>
                      <span className="text-[12px] font-medium text-stone-500 tracking-wide w-24 leading-relaxed">
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description Accordion */}
            <div className="mt-6 border-t border-stone-100 pt-6">
              <div onClick={() => toggleAccordion('description')} className="flex justify-between items-center cursor-pointer group pb-2">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-stone-900 group-hover:text-stone-600 transition-colors">Description</h3>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${openAccordions.description ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              {openAccordions.description && (
                <div className="pt-4 text-[13px] text-stone-500 font-medium leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="mb-4">Crafted for those who appreciate both timeless design and robust functionality, this watch seamlessly transitions from the boardroom to the great outdoors. The premium build ensures durability without compromising on comfort.</p>
                  <p>Every detail, from the textured dial to the polished case, reflects our commitment to exceptional horology. Elevate your everyday style with a timepiece that makes a statement.</p>
                </div>
              )}
            </div>

            {/* Specifications Accordion */}
            <div className="mt-6 border-t border-stone-100 pt-6">
              <div onClick={() => toggleAccordion('specifications')} className="flex justify-between items-center cursor-pointer group pb-2">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-stone-900 group-hover:text-stone-600 transition-colors">Specifications</h3>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${openAccordions.specifications ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              {openAccordions.specifications && (
                <div className="pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <ul className="text-[12px] text-stone-500 font-medium space-y-3">
                    <li className="flex justify-between border-b border-stone-50 pb-2"><span className="text-stone-400">Movement</span> <span className="text-stone-900">Quartz Precision</span></li>
                    <li className="flex justify-between border-b border-stone-50 pb-2"><span className="text-stone-400">Case Material</span> <span className="text-stone-900">Stainless Steel</span></li>
                    <li className="flex justify-between border-b border-stone-50 pb-2"><span className="text-stone-400">Glass</span> <span className="text-stone-900">Scratch-resistant Mineral</span></li>
                    <li className="flex justify-between border-b border-stone-50 pb-2"><span className="text-stone-400">Strap</span> <span className="text-stone-900">Premium Silicone / Leather</span></li>
                    <li className="flex justify-between border-b border-stone-50 pb-2"><span className="text-stone-400">Case Size</span> <span className="text-stone-900">42mm</span></li>
                    <li className="flex justify-between pb-2"><span className="text-stone-400">Weight</span> <span className="text-stone-900">145g</span></li>
                  </ul>
                </div>
              )}
            </div>

            {/* Shipping & Returns Accordion */}
            <div className="mt-6 border-t border-b border-stone-100 py-6">
              <div onClick={() => toggleAccordion('shipping')} className="flex justify-between items-center cursor-pointer group pb-2">
                <h3 className="text-[11px] font-black uppercase tracking-[0.1em] text-stone-900 group-hover:text-stone-600 transition-colors">Shipping & Returns</h3>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${openAccordions.shipping ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              {openAccordions.shipping && (
                <div className="pt-4 text-[13px] text-stone-500 font-medium leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="mb-3"><strong className="text-stone-900">Standard Delivery:</strong> 3-5 business days. Free for orders over Rs. 2000.</p>
                  <p className="mb-3"><strong className="text-stone-900">Express Delivery:</strong> 1-2 business days. Calculated at checkout.</p>
                  <p><strong className="text-stone-900">Returns:</strong> We accept returns within 7 days of delivery for unworn items in original packaging. Visit our Returns center to initiate.</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-32 pt-16 border-t border-stone-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-stone-900 mb-2">Customer Reviews</h2>
              <div className="flex items-center gap-3">
                <div className="flex text-lg text-stone-900">★★★★★</div>
                <span className="text-sm font-bold text-stone-900">4.71</span>
                <span className="text-sm text-stone-500">Based on 24 reviews</span>
              </div>
            </div>
            <button className="py-3 px-8 border-2 border-stone-900 text-stone-900 font-bold uppercase tracking-widest text-[11px] hover:bg-stone-900 hover:text-white transition-all">
              Write a Review
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Rahul S.", rating: 5, date: "Oct 12, 2023", title: "Absolutely stunning", text: "The build quality is exceptional for the price. It feels heavy and premium. The dial is very legible in direct sunlight too." },
              { name: "Vikram M.", rating: 5, date: "Sep 28, 2023", title: "Great daily beater", text: "Been wearing this every day for a month. No scratches on the glass so far. The silicone strap is very comfortable." },
              { name: "Aditi P.", rating: 4, date: "Aug 15, 2023", title: "Looks premium", text: "Got this for my brother and he loves it. Only giving 4 stars because delivery took an extra day. Otherwise flawless." }
            ].map((review, i) => (
              <div key={i} className="bg-stone-50 p-6 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex text-sm text-stone-900">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{review.date}</span>
                </div>
                <h4 className="font-bold text-stone-900 mb-2">{review.title}</h4>
                <p className="text-[13px] text-stone-600 mb-4 leading-relaxed">{review.text}</p>
                <div className="text-[11px] font-bold text-stone-900 uppercase tracking-wider">{review.name} <span className="text-stone-400 ml-1">Verified Buyer</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mt-32 pt-16 border-t border-stone-100 mb-24">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tight text-stone-900">You May Also Like</h2>
            <Link href="/collection" className="text-[11px] font-bold text-stone-500 uppercase tracking-widest hover:text-stone-900 transition-colors border-b border-transparent hover:border-stone-900 pb-1">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-col items-center group cursor-pointer">
                <Link
                  href={`/watch/watch${item}`}
                  className="w-full relative bg-white border border-stone-100 hover:border-stone-300 transition-colors aspect-[4/5] flex items-center justify-center overflow-hidden mb-4 rounded-md group"
                >
                  <div className="w-full h-full absolute inset-0 mix-blend-multiply pointer-events-none">
                    <div className="w-full h-full origin-center scale-95 group-hover:scale-100 transition-transform duration-700 flex items-center justify-center p-2">
                      <DynamicWatch config={watchConfigs[`watch${item}`]} />
                    </div>
                  </div>
                </Link>

                <div className="text-center flex flex-col items-center w-full px-2">
                  <Link href={`/watch/watch${item}`} className="hover:text-stone-900 transition-colors">
                    <h3 className="text-[12px] font-medium text-stone-600 tracking-wide mb-1.5">
                      Analog Men's Watch - Series {item}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[11px] text-stone-400 line-through font-medium">Rs. 1,899.00</span>
                    <span className="text-[13px] font-bold text-[#f59e0b]">Rs. 1249.00</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mt-16 pt-16 border-t border-stone-100 mb-24">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tight text-stone-900">Recently Viewed</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {[4, 2, 1, 3].map((item) => (
              <div key={item} className="flex flex-col items-center group cursor-pointer">
                <Link
                  href={`/watch/watch${item}`}
                  className="w-full relative bg-white border border-stone-100 hover:border-stone-300 transition-colors aspect-[4/5] flex items-center justify-center overflow-hidden mb-4 rounded-md group"
                >
                  <div className="w-full h-full absolute inset-0 mix-blend-multiply pointer-events-none">
                    <div className="w-full h-full origin-center scale-95 group-hover:scale-100 transition-transform duration-700 flex items-center justify-center p-2">
                      <DynamicWatch config={watchConfigs[`watch${item}`]} />
                    </div>
                  </div>
                </Link>

                <div className="text-center flex flex-col items-center w-full px-2">
                  <Link href={`/watch/watch${item}`} className="hover:text-stone-900 transition-colors">
                    <h3 className="text-[12px] font-medium text-stone-600 tracking-wide mb-1.5">
                      Analog Men's Watch - Series {item}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[11px] text-stone-400 line-through font-medium">Rs. 1,899.00</span>
                    <span className="text-[13px] font-bold text-[#f59e0b]">Rs. 1249.00</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Add a global style for the custom scrollbar */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e7e5e4; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d6d3d1; }
      `}} />
    </main>
  );
}

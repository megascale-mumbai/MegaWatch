"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, User, Menu, X, Home } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiProducts, setApiProducts] = useState([]);
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const handleScroll = () => {
      // Stay transparent until we fully pass the hero section
      setScrolled(window.scrollY > window.innerHeight * 0.95);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    const fetchSearchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const result = await res.json();
          const list = result.data || result || [];
          setApiProducts(list.map(p => {
            const priceVal = p.priceRange?.minVariantPrice?.amount || p.price || '1249.00';
            const priceClean = String(priceVal).replace(/,/g, '');
            const priceMatch = priceClean.match(/[0-9]+(?:\.[0-9]+)?/);
            const priceNum = priceMatch ? parseFloat(priceMatch[0]) : 0;
            return {
              id: String(p.id),
              name: p.title || p.name || `Product ${p.id}`,
              category: p.category || "Luxury",
              price: `Rs. ${priceNum.toFixed(2)}`,
              image: p.image || p.dialImage || (p.images?.[0]?.url) || ""
            };
          }));
        }
      } catch (err) {
        console.error("Failed to fetch search products", err);
      }
    };
    fetchSearchProducts();
  }, []);

  // Prevent scroll when menu or cart drawer is open
  useEffect(() => {
    if (isOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, isCartOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/collection" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
          scrolled
            ? "py-3 md:py-4 bg-white/80 backdrop-blur-2xl border-b border-black/5 shadow-sm"
            : "py-4 md:py-6 bg-transparent"
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-10 flex lg:grid lg:grid-cols-3 items-center justify-between lg:justify-normal">
          {/* LEFT: LOGO */}
          <div className="flex items-center justify-start">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="relative w-8 h-8 md:w-9 h-9 flex items-center justify-center">
                <div
                  className={`absolute inset-0 rounded-lg rotate-45 group-hover:rotate-90 transition-all duration-500 ease-in-out ${scrolled ? "bg-black" : "bg-white"}`}
                />
                <span
                  className={`relative z-10 font-black text-sm md:text-base transition-colors duration-500 ease-in-out ${scrolled ? "text-white" : "text-black"}`}
                >
                  M
                </span>
              </div>
              <span
                className={`text-base md:text-lg lg:text-xl font-black tracking-[-0.05em] uppercase transition-colors duration-500 ease-in-out ${scrolled ? "text-black" : "text-white"}`}
              >
                Mega<span className="text-accent">Watch</span>
              </span>
            </Link>
          </div>

          {/* CENTER: LINKS */}
          <div className={`hidden lg:flex items-center justify-center gap-8 xl:gap-12 transition-all duration-550 ${showSearch ? "opacity-0 pointer-events-none scale-95" : "opacity-100"}`}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative group py-2 ${
                    isActive
                      ? "text-accent"
                      : scrolled
                      ? "text-stone-500 hover:text-black"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-accent transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              );
            })}
          </div>

          {/* RIGHT: ICONS */}
          <div className="flex items-center justify-end gap-2 md:gap-6">
            <AnimatePresence mode="wait">
              {showSearch ? (
                <motion.div
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "16rem", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`hidden lg:flex items-center gap-2 border-b py-1 overflow-hidden ${scrolled ? "border-black/20" : "border-white/20"}`}
                >
                  <Search size={16} className={scrolled ? "text-stone-500 flex-shrink-0" : "text-white/60 flex-shrink-0"} />
                  <input
                    type="text"
                    placeholder="Search timepieces..."
                    className={`bg-transparent text-xs focus:outline-none w-full ${scrolled ? "text-black placeholder:text-stone-400" : "text-white placeholder:text-white/40"}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery("");
                    }}
                    className="flex-shrink-0"
                  >
                    <X
                      size={14}
                      className={
                        scrolled
                          ? "text-stone-400 hover:text-black"
                          : "text-white/60 hover:text-white"
                      }
                    />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="search-button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowSearch(true)}
                  className={`hidden lg:flex transition-colors duration-500 ease-in-out p-2 ${scrolled ? "text-black hover:text-accent" : "text-white hover:text-accent"}`}
                >
                  <Search size={18} strokeWidth={2.5} />
                </motion.button>
              )}
            </AnimatePresence>
            <Link
              href="/profile"
              className={`hidden lg:flex transition-colors duration-500 ease-in-out p-2 ${scrolled ? "text-black hover:text-accent" : "text-white hover:text-accent"}`}
            >
              <User size={18} strokeWidth={2.5} />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className={`hidden lg:flex transition-colors duration-500 ease-in-out p-2 relative ${scrolled ? "text-black hover:text-accent" : "text-white hover:text-accent"}`}
            >
              <ShoppingBag size={18} strokeWidth={2.5} />
              {totalItems > 0 && (
                <span
                  className={`absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold ${scrolled ? "bg-black text-white" : "bg-white text-black"}`}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden w-8 h-8 flex items-center justify-center relative z-[110] transition-colors duration-500 ease-in-out ${
                isOpen ? "text-white" : scrolled ? "text-black" : "text-white"
              }`}
            >
              {isOpen ? (
                <X size={20} strokeWidth={2.5} />
              ) : (
                <Menu size={20} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>

        {/* Slide-down Search Bar for Mobile and Tablet */}
        {showSearch && (
          <>
            {/* Click Outside Backdrop */}
            <div
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-[2px] lg:hidden"
              onClick={() => {
                setShowSearch(false);
                setSearchQuery("");
              }}
            />

            <div className="absolute top-0 left-0 right-0 z-[101] bg-white border-b border-black/5 px-6 py-4 flex items-center gap-3 shadow-md lg:hidden">
              <Search size={18} className="text-stone-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search timepieces..."
                className="flex-1 bg-transparent text-sm text-black focus:outline-none placeholder:text-stone-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
                className="flex-shrink-0 p-1 relative z-20 text-stone-500 hover:text-black"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>
          </>
        )}

        {/* Results Dropdown Card for All Sizes */}
        {showSearch && searchQuery.trim() !== "" && (
          <div className="absolute top-full right-4 md:right-10 left-4 md:left-auto mt-2 md:w-96 bg-white border border-black/5 rounded-2xl shadow-xl overflow-hidden z-[200] max-h-[360px] overflow-y-auto p-2">
            {(() => {
              const combinedProducts = [...products, ...apiProducts];
              
              // Deduplicate products by id
              const seen = new Set();
              const uniqueProducts = combinedProducts.filter(p => {
                const idStr = String(p.id);
                if (seen.has(idStr)) return false;
                seen.add(idStr);
                return true;
              });

              const filtered = uniqueProducts.filter(
                (p) =>
                  String(p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                  String(p.category || "").toLowerCase().includes(searchQuery.toLowerCase()),
              );

              if (filtered.length === 0) {
                return (
                  <div className="text-center py-8">
                    <p className="text-xs uppercase tracking-widest text-stone-400">
                      No timepieces match
                    </p>
                  </div>
                );
              }

              return (
                <div className="flex flex-col gap-1">
                  {filtered.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => {
                        setShowSearch(false);
                        setSearchQuery("");
                      }}
                      className="flex gap-3 p-2 rounded-xl hover:bg-stone-50 transition-all duration-300 group items-center text-left"
                    >
                      <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 border border-black/5">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-grow text-left">
                        <span className="text-accent text-[8px] font-bold uppercase tracking-widest">
                          {product.category}
                        </span>
                        <h4 className="text-black font-bold text-xs uppercase tracking-tight group-hover:text-accent transition-colors mt-0.5">
                          {product.name}
                        </h4>
                        <p className="text-stone-400 text-[10px] font-semibold mt-0.5">
                          {product.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            })()}
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[105] bg-stone-950 transition-all duration-700 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Decorative background element */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[100px] rounded-full" />

        <div className="flex flex-col h-full p-8 pt-24 relative z-10">
          {/* Close button directly inside overlay to avoid z-index/stacking context issues */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors bg-white/5 rounded-full border border-white/10"
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={2} />
          </button>

          <div className="flex flex-col gap-5 mt-4">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg sm:text-xl font-display font-bold uppercase tracking-[0.15em] transition-all duration-700 group flex items-center gap-3 ${
                  isOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${i * 100}ms`, color: "white" }}
              >
                <span className="text-accent text-[9px] tracking-widest font-sans opacity-50 group-hover:opacity-100 transition-opacity">
                  0{i + 1}
                </span>
                <span className="group-hover:text-accent transition-colors">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-auto pb-6 border-t border-white/10 pt-6">
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Link 
                href="/wishlist" 
                onClick={() => setIsOpen(false)}
                className="py-3 bg-white/5 text-white text-[9px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/10 text-center block"
              >
                Wishlist
              </Link>
              <Link 
                href="/profile" 
                onClick={() => setIsOpen(false)}
                className="py-3 bg-white/5 text-white text-[9px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/10 text-center block"
              >
                Profile
              </Link>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full py-4 bg-accent text-black text-center text-[10px] font-black uppercase tracking-[0.3em] block hover:bg-white transition-colors shadow-2xl"
            >
              Checkout Cart
            </button>
            <div className="mt-6 flex justify-between items-center">
              <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">
                © 2026 MegaWatch
              </p>
              <div className="flex gap-4">
                <span className="text-[9px] font-bold text-white uppercase tracking-widest cursor-pointer hover:text-accent transition-colors">
                  IG
                </span>
                <span className="text-[9px] font-bold text-white uppercase tracking-widest cursor-pointer hover:text-accent transition-colors">
                  TW
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar for Mobile and Tablet */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden bg-white/95 backdrop-blur-lg border-t border-stone-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe">
        <div className="flex items-center justify-around py-2 px-2">
          <Link
            href="/"
            className={`flex flex-col items-center gap-0.5 p-1.5 transition-colors ${pathname === "/" ? "text-accent font-bold" : "text-stone-500 hover:text-black font-medium"}`}
          >
            <Home size={18} strokeWidth={2.2} />
            <span className="text-[8px] uppercase tracking-wider">Home</span>
          </Link>

          <button
            onClick={() => setShowSearch(true)}
            className="flex flex-col items-center gap-0.5 p-1.5 text-stone-500 hover:text-black font-medium transition-colors"
          >
            <Search size={18} strokeWidth={2.2} />
            <span className="text-[8px] uppercase tracking-wider">Search</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className={`flex flex-col items-center gap-0.5 p-1.5 relative transition-colors ${pathname === "/cart" ? "text-accent font-bold" : "text-stone-500 hover:text-black font-medium"}`}
          >
            <div className="relative">
              <ShoppingBag size={18} strokeWidth={2.2} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-[8px] uppercase tracking-wider">Cart</span>
          </button>

          <Link
            href="/wishlist"
            className={`flex flex-col items-center gap-0.5 p-1.5 transition-colors ${pathname === "/wishlist" ? "text-accent font-bold" : "text-stone-500 hover:text-black font-medium"}`}
          >
            <Heart size={18} strokeWidth={2.2} />
            <span className="text-[8px] uppercase tracking-wider">
              Wishlist
            </span>
          </Link>

          <Link
            href="/profile"
            className={`flex flex-col items-center gap-0.5 p-1.5 transition-colors ${pathname === "/profile" ? "text-accent font-bold" : "text-stone-500 hover:text-black font-medium"}`}
          >
            <User size={18} strokeWidth={2.2} />
            <span className="text-[8px] uppercase tracking-wider">Profile</span>
          </Link>
        </div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[190] bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[200] shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-black uppercase tracking-tight">Shopping Bag</h3>
                  <p className="text-stone-400 text-[9px] font-black uppercase tracking-[0.2em] mt-1">
                    {totalItems} {totalItems === 1 ? "Item" : "Items"} Selected
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-50 border border-black/5 flex items-center justify-center text-stone-500 hover:text-black transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-stone-400 text-sm mb-6">Your shopping bag is empty.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="py-3 px-6 bg-black text-white text-[9px] font-black uppercase tracking-[0.3em] hover:bg-accent hover:text-black transition-all"
                    >
                      Continue Exploring
                    </button>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div
                      key={`${item.id}-${item.variant.id}-${item.strap.id}-${index}`}
                      className="flex gap-4 p-4 border border-stone-100 rounded-xl hover:border-black/10 transition-all text-left"
                    >
                      <div className="w-16 h-16 bg-stone-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-black/5">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-black uppercase tracking-tight">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id, item.variant.id, item.strap.id)}
                            className="text-stone-300 hover:text-red-500 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider mt-1">
                          Case: {item.variant.name} • Strap: {item.strap.name}
                        </p>
                        
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center border border-black/5 rounded-lg bg-stone-50">
                            <button
                              onClick={() => updateQuantity(item.id, item.variant.id, item.strap.id, item.quantity - 1)}
                              className="px-2 py-1 text-stone-500 hover:text-black text-xs"
                            >
                              -
                            </button>
                            <span className="px-2 text-stone-800 text-[10px] font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.variant.id, item.strap.id, item.quantity + 1)}
                              className="px-2 py-1 text-stone-500 hover:text-black text-xs"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-black text-black">{item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-stone-100 bg-stone-50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Total Sum</span>
                    <span className="text-xl font-black text-black tracking-tight">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="space-y-3">
                    <Link
                      href="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-4 bg-black text-white text-center text-[10px] font-black uppercase tracking-[0.3em] block hover:bg-accent hover:text-black transition-all shadow-md"
                    >
                      Complete Checkout
                    </Link>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-3.5 bg-transparent border border-black/10 text-stone-600 hover:text-black text-center text-[9px] font-bold uppercase tracking-[0.2em] block transition-colors"
                    >
                      Keep Browsing
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

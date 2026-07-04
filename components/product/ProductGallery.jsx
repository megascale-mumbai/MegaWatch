"use client";
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, Share2 } from "lucide-react";
import DynamicWatch from "@/components/watch/DynamicWatch";

export default function ProductGallery({ image, images = [], name, customConfig, productId }) {
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [activeImage, setActiveImage] = useState(image);
  const containerRef = useRef(null);

  // Build the thumbnail list dynamically
  const thumbnails = [];
  if (customConfig) {
    thumbnails.push({
      id: "dynamic-watch",
      type: "dynamic",
      name: "Custom Design",
    });
  }

  if (Array.isArray(images) && images.length > 0) {
    images.forEach((img, idx) => {
      thumbnails.push({
        id: `${productId}-img-${idx}`,
        type: "static",
        image: img.url || img,
        name: `${name} - View ${idx + 1}`
      });
    });
  } else if (image) {
    thumbnails.push({
      id: productId,
      type: "static",
      image: image,
      name: name
    });
  }

  // Active thumbnail ID tracker
  const [activeId, setActiveId] = useState(() => {
    return customConfig ? "dynamic-watch" : (thumbnails[0]?.id || "");
  });

  useEffect(() => {
    setActiveId(customConfig ? "dynamic-watch" : (thumbnails[0]?.id || ""));
    setActiveImage(image);
  }, [image, customConfig]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [productId]);

  const hasImage = activeId !== "dynamic-watch" && activeImage;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const lensSize = 40; // 40% size of container
  const halfLens = lensSize / 2;
  const clampedX = Math.max(halfLens, Math.min(100 - halfLens, mousePos.x));
  const clampedY = Math.max(halfLens, Math.min(100 - halfLens, mousePos.y));

  return (
    <div className="w-full flex flex-col-reverse md:flex-row gap-3 md:gap-4">
      {/* ── Thumbnail Strip ── */}
      {thumbnails.length > 1 && (
        <div className="flex flex-row md:flex-col gap-3 md:w-16 flex-shrink-0 overflow-x-auto no-scrollbar pb-2 md:pb-0 hide-scrollbar">
          {thumbnails.map((thumb) => {
            const isActive = activeId === thumb.id;
            return (
              <motion.button
                key={thumb.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setActiveId(thumb.id);
                  if (thumb.type === "static") {
                    setActiveImage(thumb.image);
                  }
                }}
                className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 bg-white ${
                  isActive
                    ? "border-accent shadow-md shadow-accent/20"
                    : "border-stone-100 hover:border-stone-300"
                }`}
              >
                {thumb.type === "dynamic" ? (
                  <div 
                    className="w-full h-full p-1 origin-center flex items-center justify-center pointer-events-none"
                    style={{ transform: `scale(${1.0 * Math.min(1, 100 / (customConfig.dialScale || 100))})` }}
                  >
                    <DynamicWatch config={customConfig} />
                  </div>
                ) : (
                  <img
                    src={thumb.image}
                    alt={thumb.name}
                    className="w-full h-full object-contain p-1"
                    style={{ mixBlendMode: "multiply" }}
                  />
                )}
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
                )}
              </motion.button>
            );
          })}
        </div>
      )}
 
      {/* ── Main Viewer ── */}
      <div className="flex-1 flex flex-col gap-3 relative">
        <div
          ref={containerRef}
          onMouseEnter={() => setZoomed(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setZoomed(false)}
          className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-stone-100 group cursor-crosshair shadow-sm hover:shadow-md transition-shadow duration-300 z-10"
        >
          {/* Subtle radial glow instead of full bg color */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.03)_0%,_transparent_70%)] pointer-events-none z-0" />
 
          {/* Main Image / Watch */}
          <AnimatePresence mode="wait">
            {activeId === "dynamic-watch" ? (
              <motion.div
                key="dynamic"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center z-10 p-0"
              >
                <DynamicWatch config={customConfig} />
              </motion.div>
            ) : (
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden p-0"
              >
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                    style={{ mixBlendMode: "multiply" }}
                  />
                ) : (
                  <div className="text-stone-300 text-sm">No image</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
 
          {/* Magnifier Lens */}
          {zoomed && (
            <div
              style={{
                position: "absolute",
                left: `${clampedX}%`,
                top: `${clampedY}%`,
                width: `${lensSize}%`,
                height: `${lensSize}%`,
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(99, 102, 241, 0.06)",
                border: "1.5px solid rgba(99, 102, 241, 0.35)",
                borderRadius: "1rem",
                pointerEvents: "none",
                zIndex: 30,
              }}
            />
          )}

          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-accent/25 rounded-tl-lg pointer-events-none z-0" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-accent/25 rounded-br-lg pointer-events-none z-0" />
        </div>

        {/* Floating Zoom Panel on Right */}
        {zoomed && (
          <div 
            className="hidden lg:block absolute top-[-10%] left-[calc(100%+1.5rem)] w-[120%] h-[120%] bg-white border border-stone-200/80 shadow-2xl overflow-hidden z-50 pointer-events-none"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12)"
            }}
          >
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.02)_0%,_transparent_70%)] z-0" />
            
            <div
              style={{
                width: "100%",
                height: "100%",
                transform: `scale(${100 / lensSize})`,
                transformOrigin: `${clampedX}% ${clampedY}%`,
              }}
              className="absolute inset-0 flex items-center justify-center p-0"
            >
              {activeId === "dynamic-watch" ? (
                <div className="w-full h-full p-0 flex items-center justify-center scale-[0.88]">
                  <DynamicWatch config={customConfig} />
                </div>
              ) : activeImage ? (
                <img
                  src={activeImage}
                  alt={name}
                  className="w-full h-full object-contain"
                  style={{ mixBlendMode: "multiply" }}
                />
              ) : null}
            </div>
          </div>
        )}
 
        {/* Info bar */}
        <div className="flex items-center justify-between px-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-stone-400">
            {activeId === "dynamic-watch" ? "Custom Configuration" : "Official Product Image"}
          </p>
          {zoomed && (
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-300">Hovering to zoom</p>
          )}
        </div>
      </div>
    </div>
  );
}


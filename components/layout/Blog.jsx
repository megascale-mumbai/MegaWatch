"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    category: "Craftsmanship",
    date: "June 28, 2026",
    title: "The Art of Skeletonization",
    desc: "Delve into the intricate details of exposed gear architecture and the micro-engineering behind skeleton watches.",
    image: "/watch_gold_skeleton_1778735587598.png",
  },
  {
    id: 2,
    category: "Innovation",
    date: "June 15, 2026",
    title: "Why Mechanical Hearts Keep Beating",
    desc: "Exploring how traditional mechanical movements continue to capture the soul of luxury in a digital era.",
    image: "/watch_black_edition_1778735572330.png",
  },
  {
    id: 3,
    category: "Heritage",
    date: "May 30, 2026",
    title: "The Legacy of Tourbillon Movements",
    desc: "A deep dive into Abraham-Louis Breguet's invention and its modern-day representation of absolute precision.",
    image: "/watches/trending/watch1.png",
  }
];

export default function Blog() {
  const [activePost, setActivePost] = useState(0);

  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-white border-t border-stone-100">
      <div className="w-full px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-accent/30" />
            <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[9px] md:text-[10px]">
              Horological Journal
            </span>
            <div className="w-12 h-[1px] bg-accent/30" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-black uppercase leading-tight tracking-tight">
            THE WATCH <span className="text-accent italic">CHRONICLE.</span>
          </h2>
        </div>

        {/* Desktop Blog Posts Grid (md and up) */}
        <div className="hidden md:grid grid-cols-3 gap-8 lg:gap-10">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col bg-stone-50/40 border border-black/5 rounded-2xl overflow-hidden group hover:shadow-md transition-shadow duration-300"
            >
              {/* Image Box */}
              <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                />
              </div>

              {/* Text details */}
              <div className="p-6 flex flex-col justify-between flex-grow text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-stone-400">
                    <span className="text-accent">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-black group-hover:text-accent transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">
                    {post.desc}
                  </p>
                </div>

                <div className="pt-6">
                  <Link 
                    href={`/journal`}
                    className="text-[10px] font-display font-bold uppercase tracking-widest text-black hover:text-accent flex items-center gap-2 group/link"
                  >
                    Read Article
                    <span className="transform translate-x-0 group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile/Tablet Blog Posts Slider (below md) */}
        <div className="md:hidden flex flex-col items-center">
          <div className="w-full max-w-[360px] relative">
            <AnimatePresence mode="wait">
              <motion.article 
                key={activePost}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col bg-stone-50/40 border border-black/5 rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Image Box */}
                <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                  <img 
                    src={blogPosts[activePost].image}
                    alt={blogPosts[activePost].title}
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                </div>

                {/* Text details */}
                <div className="p-5 flex flex-col justify-between flex-grow text-left">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-wider text-stone-400">
                      <span className="text-accent">{blogPosts[activePost].category}</span>
                      <span>•</span>
                      <span>{blogPosts[activePost].date}</span>
                    </div>

                    <h3 className="font-display font-bold text-base text-black leading-snug">
                      {blogPosts[activePost].title}
                    </h3>

                    <p className="text-stone-500 text-[11px] leading-relaxed line-clamp-3">
                      {blogPosts[activePost].desc}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-black/5 mt-4">
                    <Link 
                      href={`/journal`}
                      className="text-[9px] font-display font-bold uppercase tracking-widest text-black hover:text-accent flex items-center gap-1.5 group/link"
                    >
                      Read Article
                      <span className="transform translate-x-0 group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                    </Link>

                    {/* Slider Navigation */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setActivePost((prev) => (prev - 1 + blogPosts.length) % blogPosts.length)}
                        className="w-6 h-6 rounded bg-stone-100 text-stone-600 hover:bg-accent hover:text-white transition-all flex items-center justify-center font-mono font-bold text-[10px]"
                      >
                        &lt;
                      </button>
                      <span className="text-[10px] font-semibold text-stone-400 px-1">
                        {activePost + 1} / {blogPosts.length}
                      </span>
                      <button
                        onClick={() => setActivePost((prev) => (prev + 1) % blogPosts.length)}
                        className="w-6 h-6 rounded bg-stone-100 text-stone-600 hover:bg-accent hover:text-white transition-all flex items-center justify-center font-mono font-bold text-[10px]"
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}

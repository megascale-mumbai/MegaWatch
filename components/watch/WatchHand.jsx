"use client";

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Renders a watch hand with dynamic positioning and depth effects.
 */
export default function WatchHand({
  movement,
  rotation,
  color = "white",
  width = 10,
  height = 100,
  zIndex = 10,
  x,
  y,
  className = ""
}) {
  const isCentered = x === undefined || y === undefined;

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        zIndex,
        ...(isCentered ? {
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        } : {
          left: x,
          top: y,
          transform: 'translate(-50%, -50%)', // Center on the point
          width: 0, // Zero size container for precise rotation
          height: 0,
        })
      }}
    >
      <motion.div
        style={{
          width,
          height: height * 2, // Double height because we rotate around the center
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          transformOrigin: 'center center',
          rotate: rotation,
        }}
        initial={false}
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 300, damping: 30, restDelta: 0.001 }}
      >
        {/* The actual visible part of the hand (top half) */}
        <div
          className="rounded-full shadow-lg"
          style={{
            backgroundColor: color,
            width: '100%',
            height: '50%', // Only top half is visible
            borderRadius: '999px 999px 0 0',
            background: `linear-gradient(to bottom, ${color}, ${color}CC)`,
          }}
        />

        {/* Subtle center cap/pivot */}
        <div
          className="absolute rounded-full shadow-md"
          style={{
            width: width * 2,
            height: width * 2,
            backgroundColor: color,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '2px solid rgba(0,0,0,0.2)',
            zIndex: 100,
          }}
        />
      </motion.div>
    </div>
  );
}

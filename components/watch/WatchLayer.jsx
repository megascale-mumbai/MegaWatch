"use client";

import React from 'react';
import Image from 'next/image';
import WatchHand from './WatchHand';
import { motion } from 'framer-motion';

export default function WatchLayer({ layer, clockData, isEditMode, onUpdate, isSelected }) {
  const { type, src, x, y, width, height, zIndex, movement, color, opacity = 1, className } = layer;

  const handleDrag = (e, info) => {
    // Info contains delta or point. We'll use point relative to container.
    // However, it's easier to just update x and y based on the drag end.
  };

  const handleDragEnd = (e, info) => {
    onUpdate({ x: layer.x + info.offset.x, y: layer.y + info.offset.y });
  };

  const commonProps = isEditMode ? {
    drag: true,
    dragMomentum: false,
    onDragEnd: handleDragEnd,
    whileHover: { outline: '1px solid #e63946' },
    style: { outline: isSelected ? '2px solid #e63946' : 'none' }
  } : {};

  if (type === 'image') {
    return (
      <motion.div
        className="absolute cursor-move"
        style={{
          left: x,
          top: y,
          width,
          height,
          zIndex,
          opacity,
          ...commonProps.style
        }}
        {...(isEditMode ? { drag: true, dragMomentum: false, onDragEnd: handleDragEnd } : {})}
      >
        <Image
          src={src}
          alt={layer.id}
          width={width}
          height={height}
          className="object-contain pointer-events-none"
          priority
        />
      </motion.div>
    );
  }

  if (type === 'hand') {
    let rotation = 0;
    switch (movement) {
      case 'hour': rotation = clockData.hourDeg; break;
      case 'minute': rotation = clockData.minuteDeg; break;
      case 'second': rotation = clockData.secondDeg; break;
      case 'sub-second': rotation = clockData.subSecondDeg; break;
      case 'sub-24h': rotation = clockData.sub24hDeg; break;
      default: rotation = 0;
    }

    return (
      <motion.div
        style={{ zIndex, ...commonProps.style }}
        {...(isEditMode ? { drag: true, dragMomentum: false, onDragEnd: handleDragEnd } : {})}
        className={isEditMode ? "cursor-move" : ""}
      >
        <WatchHand
          movement={movement}
          rotation={rotation}
          color={color}
          width={width}
          height={height}
          zIndex={zIndex}
          x={x}
          y={y}
          className={className}
        />
      </motion.div>
    );
  }

  if (type === 'overlay') {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex, opacity, mixBlendMode: 'screen' }}
      >
        <Image
          src={src}
          alt="Overlay"
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return null;
}

export const LUXURY_WATCH_CONFIG = {
  name: "Franktime Obsidian",
  slug: "franktime-obsidian",
  size: 600,
  layers: [
    {
      id: "base-dial",
      type: "image",
      src: "/watches/dial.png",
      x: 0,
      y: 0,
      width: 600,
      height: 600,
      zIndex: 1,
    },
    {
      id: "hour-hand",
      type: "hand",
      movement: "hour",
      color: "silver",
      width: 12,
      height: 180,
      zIndex: 10,
      className: "hour-hand-luxury",
    },
    {
      id: "minute-hand",
      type: "hand",
      movement: "minute",
      color: "silver",
      width: 8,
      height: 240,
      zIndex: 11,
      className: "minute-hand-luxury",
    },
    {
      id: "second-hand",
      type: "hand",
      movement: "second",
      color: "#e63946", // Luxury red accent
      width: 3,
      height: 280,
      zIndex: 12,
      className: "second-hand-luxury",
    },
    {
      id: "subdial-seconds",
      type: "hand",
      movement: "sub-second",
      color: "silver",
      width: 2,
      height: 40,
      x: 300, // Center of subdial
      y: 450, // Bottom subdial position
      zIndex: 8,
    },
    {
      id: "glass-overlay",
      type: "overlay",
      src: "/watches/glass.png",
      opacity: 0.4,
      zIndex: 20,
    }
  ]
};

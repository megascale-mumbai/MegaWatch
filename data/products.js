export const products = [
  {
    id: "oceanic-chronograph",
    name: "Oceanic Chronograph",
    price: "$1,299",
    rating: 4.9,
    reviews: 128,
    image: "/watches/trending/watch1.png",
    category: "Sport",
    description: "Designed for the modern explorer, the Oceanic Chronograph combines rugged durability with Swiss precision. Features a 42mm brushed steel case and a deep-sea blue dial that captures the essence of the ocean.",
    specs: {
      movement: "Automatic Swiss Caliber MW-01",
      case: "316L Stainless Steel, 42mm",
      glass: "Domed Sapphire with AR Coating",
      waterResistance: "200m / 660ft",
      powerReserve: "48 Hours"
    },
    variants: [
      { id: "steel", name: "Brushed Steel", color: "#d1d5db" },
      { id: "black", name: "PVD Black", color: "#1a1a1a" }
    ],
    straps: [
      { id: "rubber", name: "Navy Rubber", color: "#1e3a8a" },
      { id: "leather", name: "Black Leather", color: "#000000" }
    ]
  },
  {
    id: "golden-heritage",
    name: "Golden Heritage",
    price: "$2,450",
    rating: 5.0,
    reviews: 84,
    image: "/watches/trending/watch2.png",
    category: "Luxury",
    description: "A testament to timeless elegance, the Golden Heritage is crafted with 18K solid gold and features a meticulously hand-finished black dial. A masterpiece for those who appreciate the finer things.",
    specs: {
      movement: "Manual Wind Caliber MW-Luxury",
      case: "18K Yellow Gold, 40mm",
      glass: "Flat Sapphire with AR Coating",
      waterResistance: "50m / 165ft",
      powerReserve: "72 Hours"
    },
    variants: [
      { id: "gold", name: "18K Gold", color: "#b8860b" },
      { id: "rose", name: "Rose Gold", color: "#e2a08a" }
    ],
    straps: [
      { id: "leather-brown", name: "Cognac Leather", color: "#5d4037" },
      { id: "leather-black", name: "Matte Black", color: "#111111" }
    ]
  },
  {
    id: "skeleton-masterpiece",
    name: "Skeleton Masterpiece",
    price: "$3,800",
    rating: 4.8,
    reviews: 42,
    image: "/watches/trending/watch3.png",
    category: "Limited Edition",
    description: "Behold the inner soul of horology. The Skeleton Masterpiece reveals the intricate dance of gears and springs through a fully transparent sapphire dial. Limited to 100 pieces worldwide.",
    specs: {
      movement: "Open-Work Skeleton Automatic",
      case: "Grade 5 Titanium, 44mm",
      glass: "Full Sapphire Crystal",
      waterResistance: "100m / 330ft",
      powerReserve: "60 Hours"
    },
    variants: [
      { id: "titanium", name: "Natural Titanium", color: "#4b5563" },
      { id: "blue", name: "Anodized Blue", color: "#2563eb" }
    ],
    straps: [
      { id: "titanium-link", name: "Titanium Link", color: "#4b5563" },
      { id: "rubber-black", name: "Textured Rubber", color: "#000000" }
    ]
  },
  {
    id: "titanium-stealth",
    name: "Titanium Stealth",
    price: "$1,100",
    rating: 4.7,
    reviews: 215,
    image: "/watches/trending/watch4.png",
    category: "Modern",
    description: "Lightweight, ultra-durable, and uncompromisingly modern. The Titanium Stealth is built for high-performance lifestyles, featuring a bead-blasted titanium case and a high-contrast minimalist dial.",
    specs: {
      movement: "High-Beat Quartz Precision",
      case: "Bead-Blasted Titanium, 41mm",
      glass: "Anti-Reflective Sapphire",
      waterResistance: "150m / 500ft",
      powerReserve: "3 Year Battery"
    },
    variants: [
      { id: "stealth", name: "Bead-Blasted", color: "#6b7280" },
      { id: "olive", name: "Olive Drab", color: "#3f6212" }
    ],
    straps: [
      { id: "nato", name: "Military NATO", color: "#374151" },
      { id: "fkm", name: "FKM Rubber", color: "#111827" }
    ]
  }
];

export const getProductById = (id) => products.find(p => p.id === id);

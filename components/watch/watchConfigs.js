export const watchConfigs = {
  watch1: {
    id: "watch1",
    dialImage: "/watches/watch1/dial.png",
    pivot: { fx: 0.5, fy: 0.5 }, // Perfectly centered
    hub: {
      style: 'faceted',
      size: 12,
      gradient: ["#f8fafc", "#cbd5e1", "#64748b"],
      innerCircle: true,
      innerCircleColor: "#1e293b"
    },
    hands: {
      hour: {
        width: 8, height: 50,
        gradient: ["#D1D5DB", "#F3F4F6", "#9CA3AF"],
        dropShadow: "drop-shadow(0 4px 6px rgba(0,0,0,0.6))"
      },
      minute: {
        width: 6, height: 75,
        gradient: ["#E5E7EB", "#FFFFFF", "#D1D5DB"],
        dropShadow: "drop-shadow(0 6px 8px rgba(0,0,0,0.7))"
      },
      second: {
        width: 4, height: 90, mainHeight: 75, tailHeight: 15,
        color: "#EF4444",
        timing: "steps(60)",
        dropShadow: "drop-shadow(0 8px 10px rgba(0,0,0,0.8))"
      }
    }
  },
  watch2: {
    id: "watch2",
    dialImage: "/watches/watch2/dial.jpg",
    pivot: { fx: 0.4812, fy: 0.4881 },
    hub: {
      style: 'faceted',
      size: 14,
      gradient: ["#f8fafc", "#cbd5e1", "#64748b"],
      innerCircle: true,
      innerCircleColor: "#1e293b"
    },
    hands: {
      hour: {
        useImage: true,
        imagePath: "/watches/watch2/hour-removebg-preview.png",
        width: 120, height: 120,
        pivot: { x: 0.5, y: 0.785 },
        blendMode: "normal",
        dropShadow: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
      },
      minute: {
        useImage: true,
        imagePath: "/watches/watch2/minute-removebg-preview.png",
        width: 160, height: 160,
        pivot: { x: 0.5, y: 0.865 },
        dropShadow: "drop-shadow(0 5px 10px rgba(0,0,0,0.35))"
      },
      second: {
        useImage: true,
        imagePath: "/watches/watch2/second-removebg-preview.png",
        width: 180, height: 180,
        pivot: { x: 0.5, y: 0.82 },
        color: "#CBD5E1",
        timing: "steps(60)",
        dropShadow: "drop-shadow(0 6px 12px rgba(0,0,0,0.4))"
      }
    },
    subDials: [
      {
        id: "casio-24h",
        type: "24h",
        fx: 0.3162, fy: 0.512,
        offset: 0,
        hand: { width: 2, height: 22, color: "#CBD5E1" }
      },
      {
        id: "casio-day",
        type: "day",
        fx: 0.6462, fy: 0.512,
        offset: 0,
        hand: { width: 2, height: 22, color: "#CBD5E1" }
      },
      {
        id: "casio-date",
        type: "date",
        fx: 0.4812, fy: 0.645,
        offset: 0,
        hand: { width: 2, height: 22, color: "#CBD5E1" }
      }
    ]
  },
  watch3: {
    id: "watch3",
    dialImage: "/watches/watch3/dial.png",
    pivot: { fx: 0.5, fy: 0.5 },
    hub: {
      style: 'ornate',
      size: 15,
      color: "#FFD700",
      gradient: ["#B8860B", "#FFD700", "#DAA520"],
      innerCircle: true,
      innerCircleColor: "#451a03"
    },
    hands: {
      hour: {
        width: 12, height: 65,
        style: 'premium-faceted',
        gradient: ["#B8860B", "#FFD700", "#DAA520"],
        dropShadow: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))"
      },
      minute: {
        width: 8, height: 95,
        style: 'premium-faceted',
        gradient: ["#DAA520", "#F0E68C", "#B8860B"],
        dropShadow: "drop-shadow(0 6px 10px rgba(0,0,0,0.5))"
      },
      second: {
        width: 2.5, height: 110, mainHeight: 90, tailHeight: 20,
        color: "#FFD700",
        timing: "linear",
        dropShadow: "drop-shadow(0 8px 12px rgba(0,0,0,0.6))"
      }
    },
    subDials: [
      {
        id: "omega-9h",
        type: "day",
        fx: 0.31, fy: 0.50,
        offset: 0,
        hand: { width: 1.5, height: 18, color: "#FFD700" }
      },
      {
        id: "omega-3h",
        type: "month",
        fx: 0.69, fy: 0.50,
        offset: 0,
        hand: { width: 1.5, height: 18, color: "#FFD700" }
      },
      {
        id: "omega-6h",
        type: "24h",
        fx: 0.5, fy: 0.76,
        offset: 0,
        hand: { width: 1.5, height: 18, color: "#FFD700" }
      }
    ]
  },
  watch4: {
    id: "watch4",
    dialImage: "/watches/watch4/dial.png",
    pivot: { fx: 0.5, fy: 0.4437 },
    hub: {
      style: 'simple',
      size: 12,
      color: "#D1D5DB",
      innerCircle: false
    },
    hands: {
      hour: {
        width: 10, height: 60,
        gradient: ["#D1D5DB", "#F3F4F6", "#9CA3AF"],
        dropShadow: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
      },
      minute: {
        width: 7, height: 90,
        gradient: ["#E5E7EB", "#FFFFFF", "#D1D5DB"],
        dropShadow: "drop-shadow(0 5px 10px rgba(0,0,0,0.35))"
      },
      second: {
        width: 2, height: 110, mainHeight: 90, tailHeight: 20,
        color: "#EF4444", 
        timing: "steps(60)",
        dropShadow: "drop-shadow(0 6px 12px rgba(0,0,0,0.4))"
      }
    }
  },
  watch6: {
    id: "watch6",
    dialImage: "/watches/watch6/dial.png",
    pivot: { fx: 0.4812, fy: 0.4881 },
    hub: {
      style: 'faceted',
      size: 14,
      gradient: ["#FFFFFF", "#CBD5E1", "#475569"],
      innerCircle: true,
      innerCircleColor: "#1e293b"
    },
    hands: {
      hour: {
        width: 12, height: 65,
        style: 'premium-faceted',
        gradient: ["#FFFFFF", "#CBD5E1", "#475569"],
        dropShadow: "drop-shadow(0 6px 12px rgba(0,0,0,0.4))"
      },
      minute: {
        width: 8, height: 95,
        style: 'premium-faceted',
        gradient: ["#FFFFFF", "#E2E8F0", "#1E293B"],
        dropShadow: "drop-shadow(0 8px 16px rgba(0,0,0,0.45))"
      },
      second: {
        width: 2, height: 115, mainHeight: 95, tailHeight: 20,
        color: "#3B82F6",
        timing: "steps(60)",
        dropShadow: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))"
      }
    },
    subDials: [
      {
        id: "casio6-24h",
        type: "24h",
        fx: 0.3162, fy: 0.512,
        offset: 0,
        hand: { width: 1.5, height: 18, color: "#CBD5E1" }
      },
      {
        id: "casio6-day",
        type: "day",
        fx: 0.6462, fy: 0.512,
        offset: 0,
        hand: { width: 1.5, height: 18, color: "#CBD5E1" }
      },
      {
        id: "casio6-date",
        type: "date",
        fx: 0.4812, fy: 0.645,
        offset: 0,
        hand: { width: 1.5, height: 18, color: "#CBD5E1" }
      }
    ]
  }
};

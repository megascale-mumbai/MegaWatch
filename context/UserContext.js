"use client";

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user status from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("megawatch_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user session", e);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, name = "Alexander Mercer") => {
    const newUser = {
      name,
      email,
      phone: "+91 88500 11652",
      address: "411, New Escon Plaza, Chhaprabhatha Road, Amroli, Surat, Gujarat - 394107",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
      joinDate: "June 2026",
      orders: [
        {
          id: "MW-78491",
          date: "June 28, 2026",
          status: "Delivered",
          total: "$2,400.00",
          item: "Series 3 Custom Timepiece"
        },
        {
          id: "MW-74892",
          date: "June 15, 2026",
          status: "Processing",
          total: "$1,299.00",
          item: "Oceanic Chronograph"
        }
      ]
    };
    setUser(newUser);
    localStorage.setItem("megawatch_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("megawatch_user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

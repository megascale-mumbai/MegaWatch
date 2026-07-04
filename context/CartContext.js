"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("megawatch_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("megawatch_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, variant, strap, quantity) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.variant.id === variant.id && item.strap.id === strap.id
      );

      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }

      return [...prev, { ...product, variant, strap, quantity }];
    });
  };

  const removeFromCart = (id, variantId, strapId) => {
    setCart((prev) => prev.filter(
      (item) => !(item.id === id && item.variant.id === variantId && item.strap.id === strapId)
    ));
  };

  const updateQuantity = (id, variantId, strapId, quantity) => {
    setCart((prev) => prev.map((item) => {
      if (item.id === id && item.variant.id === variantId && item.strap.id === strapId) {
        return { ...item, quantity: Math.max(1, quantity) };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.price.replace("$", "").replace(",", ""));
    return acc + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

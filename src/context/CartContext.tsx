'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. Define the shape of a Cart Item
export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// 2. Define what functions/data the Context provides
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  totalItems: number; // <--- This was missing!
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart from LocalStorage on startup
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to LocalStorage whenever it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  // --- ACTIONS ---

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new item, add it with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setIsCartOpen(true); // Open drawer when adding
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // --- CALCULATIONS ---

  // 3. Calculate Total Items (The fix for your error)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 4. Calculate Total Price
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        isCartOpen, 
        toggleCart, 
        totalItems, // <--- Passing it here fixes the error
        cartTotal 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
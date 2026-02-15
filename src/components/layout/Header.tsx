'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext'; // Ensure this path is correct

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();

  return (
    <>
      {/* HEADER: Always White, Always Fixed, Always Clean */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-100 h-16 md:h-20 flex items-center transition-all duration-300">
        
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-full">
          
          {/* 1. LEFT: Mobile Menu + Logo */}
          <div className="flex items-center gap-2 md:gap-0">
            {/* Mobile Menu Button (Hamburger) */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="cursor-pointer flex items-center">
              <img 
                src="/stanw-infi.svg" 
                alt="Stanway Health" 
                className="h-8 md:h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* 2. CENTER: Desktop Navigation (Hidden on Mobile) */}
          <nav className="hidden md:flex gap-8 font-medium text-sm text-gray-700">
            <Link href="/shop" className="hover:text-red-600 transition-colors">Shop All</Link>
            <Link href="/shop?collection=bestsellers" className="hover:text-red-600 transition-colors">Best Sellers</Link>
            <Link href="/about" className="hover:text-red-600 transition-colors">Our Science</Link>
          </nav>

          {/* 3. RIGHT: Icons (Search, Profile, Cart) */}
          <div className="flex items-center gap-3 md:gap-6">
            <button className="p-2 text-gray-700 hover:text-red-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <Link href="/account" className="hidden md:block p-2 text-gray-700 hover:text-red-600 transition-colors">
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Icon with Counter Badge */}
            <button 
              onClick={() => toggleCart()} 
              className="relative p-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* 4. MOBILE MENU DRAWER (Slide-in from Left) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex md:hidden">
          {/* Black Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* White Menu Panel */}
          <div className="relative w-[80%] max-w-[300px] h-full bg-white shadow-2xl p-6 flex flex-col">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mt-8 flex flex-col gap-6 text-lg font-medium text-gray-800">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop All</Link>
              <Link href="/shop?collection=bestsellers" onClick={() => setIsMobileMenuOpen(false)}>Best Sellers</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>Our Science</Link>
              <hr className="border-gray-100" />
              <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-500">
                <User className="w-5 h-5" /> My Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
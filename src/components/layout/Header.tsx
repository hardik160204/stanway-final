'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleCart, cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* 1. Logo Image (Fetches from public/logo.png) */}
        <Link href="/" className="cursor-pointer">
          <img 
            src="/stanw-infi.svg" 
            alt="Stanway Health" 
            className="h-8 md:h-10 w-auto object-contain"
          />
        </Link>

        {/* 2. Desktop Navigation */}
        <nav className="hidden md:flex gap-8 font-medium text-sm">
          <Link href="/shop" className="hover:text-red-600 transition-colors cursor-pointer">
            Shop All
          </Link>
          <Link href="/shop?collection=bestsellers" className="hover:text-red-600 transition-colors cursor-pointer">
            Best Sellers
          </Link>
          <Link href="/about" className="hover:text-red-600 transition-colors cursor-pointer">
            Our Science
          </Link>
        </nav>

        {/* 3. Action Icons */}
        <div className="flex items-center gap-6">
          
          {/* Search Button */}
          <button className="group p-2 hover:bg-gray-100 rounded-full transition-all cursor-pointer">
            <Search className="w-5 h-5 text-gray-700 group-hover:text-black" />
          </button>

          {/* Account Button */}
          <button className="group p-2 hover:bg-gray-100 rounded-full transition-all cursor-pointer">
            <User className="w-5 h-5 text-gray-700 group-hover:text-black" />
          </button>
          
          {/* Cart Button */}
          <button 
            onClick={toggleCart} 
            className="group relative p-2 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-black" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <Menu className="w-6 h-6 text-gray-900" />
          </button>

        </div>
      </div>
    </header>
  );
}
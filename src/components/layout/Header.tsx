'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, User } from 'lucide-react';
import CartSidebar from '../cart/CartSidebar';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Your specific Shopify Account Login URL
  const shopifyAccountUrl = "https://stanway-health-and-wellness-co.myshopify.com/account";

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* 1. Mobile Menu Button */}
        <button 
          className="md:hidden p-2 -ml-2 text-gray-600 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* 2. LOGO */}
        <Link href="/" className="flex-shrink-0 cursor-pointer">
          <img 
            src="/stanw-infi.svg" 
            alt="Stanway Health" 
            className="h-8 md:h-12 w-auto max-w-[120px] md:max-w-none object-contain mix-blend-multiply" 
          />
        </Link>

        {/* 3. Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="text-sm font-medium text-gray-700 hover:text-black transition-colors cursor-pointer">Shop All</Link>
          
          {/* UPDATED: Now points to your Shopify 'Best Sellers' Collection */}
          <Link href="/collections/best-sellers" className="text-sm font-medium text-gray-700 hover:text-black transition-colors cursor-pointer">Best Sellers</Link>
          
          <Link href="/science" className="text-sm font-medium text-gray-700 hover:text-black transition-colors cursor-pointer">Our Science</Link>
          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-black transition-colors cursor-pointer">About Us</Link>
        </div>

        {/* 4. Right Icons */}
        <div className="flex items-center gap-1 md:gap-4 -mr-2">
          
          <button className="hidden md:block p-2 text-gray-600 hover:text-black transition-colors cursor-pointer">
            <Search size={20} />
          </button>
          
          {/* --- ACCOUNT ICON --- */}
          <a 
            href={shopifyAccountUrl}
            className="block p-2 text-gray-600 hover:text-black transition-colors cursor-pointer"
          >
            <User size={20} />
          </a>

          {/* Cart Sidebar (Make sure cursor-pointer is inside the trigger button in CartSidebar.tsx) */}
          <CartSidebar />
          
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-16 shadow-xl py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          <Link href="/shop" className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>Shop All</Link>
          
          {/* Mobile Best Sellers Link */}
          <Link href="/collections/best-sellers" className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>Best Sellers</Link>
          
          <Link href="/science" className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>Our Science</Link>
          <Link href="/about" className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          
          {/* Mobile Account Link */}
          <a 
            href={shopifyAccountUrl}
            className="text-lg font-medium text-gray-800 py-2 flex items-center gap-2 cursor-pointer"
          >
            <User size={20} /> My Account
          </a>
        </div>
      )}
    </nav>
  );
}
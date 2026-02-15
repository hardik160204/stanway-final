'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-600 border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Top Section: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="col-span-1 md:col-span-1">
            {/* LOGO IMAGE with Spacing */}
            <Link href="/" className="inline-block mb-6"> 
              <img 
                src="/stanw-infi.svg" 
                alt="Stanway Health" 
                className="h-12 w-auto object-contain" // Adjusted height to look good
              />
            </Link>
            
            <p className="text-sm leading-relaxed mb-6">
              Science-backed formulations designed to help you live a longer, healthier, and more vibrant life.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/shop" className="hover:text-red-600 transition-colors">All Products</Link></li>
              <li><Link href="/shop?collection=bestsellers" className="hover:text-red-600 transition-colors">Best Sellers</Link></li>
              <li><Link href="/shop" className="hover:text-red-600 transition-colors">Combos</Link></li>
              <li><Link href="/shop" className="hover:text-red-600 transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/about" className="hover:text-red-600 transition-colors">Our Science</Link></li>
              <li><Link href="/about" className="hover:text-red-600 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-red-600 transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-red-600 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 uppercase tracking-wider text-sm">Stay Updated</h4>
            <p className="text-sm mb-4">Join our community for exclusive health tips and early access.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
              />
              <button className="w-full bg-black text-white px-4 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                Subscribe <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Stanway Health. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
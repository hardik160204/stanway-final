'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, User, Loader2 } from 'lucide-react';
import CartSidebar from '../cart/CartSidebar';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Search States
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const shopifyAccountUrl = "https://stanway-health-and-wellness-co.myshopify.com/account";

 // The magic hook that searches as you type
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        
        // SAFETY CHECK: If the server returns HTML (like a 404 page), stop here!
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Oops! API did not return JSON. Did you restart the server?");
        }

        const data = await res.json();
        setSearchResults(data.products || []);
      } catch (error) {
        console.error("Search error caught:", error);
        setSearchResults([]); // Keep the UI clean if it fails
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          
          <button 
            className="md:hidden p-2 -ml-2 text-gray-600 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" className="flex-shrink-0 cursor-pointer">
            <img src="/stanw-infi.svg" alt="Stanway Health" className="h-8 md:h-12 w-auto max-w-[120px] md:max-w-none object-contain mix-blend-multiply" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-sm font-medium text-gray-700 hover:text-black transition-colors cursor-pointer">Shop All</Link>
            <Link href="/collections/best-sellers" className="text-sm font-medium text-gray-700 hover:text-black transition-colors cursor-pointer">Best Sellers</Link>
            <Link href="/science" className="text-sm font-medium text-gray-700 hover:text-black transition-colors cursor-pointer">Our Science</Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-black transition-colors cursor-pointer">About Us</Link>
          </div>

          <div className="flex items-center gap-1 md:gap-4 -mr-2">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-gray-600 hover:text-black transition-colors cursor-pointer">
              <Search size={20} />
            </button>
            <a href={shopifyAccountUrl} className="block p-2 text-gray-600 hover:text-black transition-colors cursor-pointer">
              <User size={20} />
            </a>
            <CartSidebar />
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-16 shadow-xl py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
            <Link href="/shop" className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>Shop All</Link>
            <Link href="/collections/best-sellers" className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>Best Sellers</Link>
            <Link href="/science" className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>Our Science</Link>
            <Link href="/about" className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <a href={shopifyAccountUrl} className="text-lg font-medium text-gray-800 py-2 flex items-center gap-2 cursor-pointer">
              <User size={20} /> My Account
            </a>
          </div>
        )}
      </nav>

      {/* FULL-SCREEN SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md animate-in fade-in duration-200 flex flex-col pt-24 px-4 md:px-8 overflow-y-auto">
          
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 p-3 text-gray-500 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-full transition-all cursor-pointer shadow-sm"
          >
            <X size={24} />
          </button>

          <div className="w-full max-w-4xl mx-auto relative mt-8 md:mt-16 mb-20">
            <div className="flex items-center border-b-2 border-black pb-4">
              <Search size={32} className="text-gray-400 mr-4" />
              <input 
                type="text"
                autoFocus
                placeholder="Search formulations, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-2xl md:text-5xl bg-transparent outline-none placeholder-gray-300 text-black font-medium"
              />
              {isSearching && <Loader2 className="animate-spin text-gray-400 ml-4" size={28} />}
            </div>
            
            {/* SEARCH RESULTS */}
            <div className="mt-12">
              {!searchQuery && (
                <>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Popular Searches</p>
                  <div className="flex flex-wrap gap-3">
                    {['Protein', 'Vitamins', 'Gut Health', 'Pre-workout'].map(term => (
                      <button 
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-full text-sm font-medium text-gray-700 cursor-pointer hover:bg-black hover:text-white transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* LIVE PRODUCT LIST */}
              {searchQuery && searchResults.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                  {searchResults.map((product) => (
                    <Link 
                      href={`/products/${product.handle}`} 
                      key={product.id}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors group cursor-pointer"
                    >
                      {product.featuredImage && (
                        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={product.featuredImage.url} alt={product.featuredImage.altText || product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-1">{product.title}</h4>
                        <p className="text-gray-500 text-sm">
                          {product.priceRange.minVariantPrice.currencyCode} {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* NO RESULTS FOUND */}
              {searchQuery && !isSearching && searchResults.length === 0 && (
                <p className="text-gray-500 text-lg">No products found matching "{searchQuery}". Try a different term.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
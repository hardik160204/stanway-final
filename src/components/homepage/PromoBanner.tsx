'use client';

import React from 'react';
import Link from 'next/link';

export default function PromoBanner() {
  return (
    <section className="w-full bg-gray-50 border-b border-gray-200">
      <Link href="/shop" className="block w-full">
        
        {/* === MOBILE HERO (Phone) === */}
        <div className="block md:hidden w-full relative min-h-[400px]">
          <img 
            src="/hero-mobile.jpg" 
            alt="Stanway Mobile Hero" 
            className="w-full h-auto object-cover"
            // REMOVED priority="true" (This was causing the error)
          />
        </div>

        {/* === DESKTOP HERO (Laptop) === */}
        <div className="hidden md:block w-full relative min-h-[500px]">
          <img 
            src="/hero-desktop.jpg" 
            alt="Stanway Desktop Hero" 
            className="w-full h-auto object-cover"
             // REMOVED priority="true"
          />
        </div>

      </Link>
    </section>
  );
}
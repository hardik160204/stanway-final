'use client';

import React from 'react';
import Link from 'next/link';

export default function PromoBanner() {
  return (
    <section className="w-full bg-white">
      <Link href="/shop" className="block w-full">
        
        {/* === MOBILE HERO === */}
        {/* NO 'min-h', NO 'h-64'. Just w-full. 
            The div will now be exactly as tall as the image. */}
        <div className="block md:hidden w-full">
          <img 
            src="/hero-mobile.jpg" 
            alt="Stanway Mobile Hero" 
            className="w-full h-auto object-cover block" 
            // 'block' is critical. It kills the tiny 4px gap browsers add below images.
          />
        </div>

        {/* === DESKTOP HERO === */}
        <div className="hidden md:block w-full">
          <img 
            src="/hero-desktop.jpg" 
            alt="Stanway Desktop Hero" 
            className="w-full h-auto object-cover block"
          />
        </div>

      </Link>
    </section>
  );
}
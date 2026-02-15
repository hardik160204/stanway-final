'use client';

import React from 'react';
import Link from 'next/link';

export default function PromoBanner() {
  return (
    <section className="w-full bg-white">
      <Link href="/shop" className="block w-full">
        
        {/* === MOBILE HERO === */}
        {/* Removed 'min-h-[...]' so it shrinks to fit the image perfectly */}
        <div className="block md:hidden w-full relative h-auto">
          <img 
            src="/hero-mobile.jpg" 
            alt="Stanway Mobile Hero" 
            className="w-full h-auto object-contain block" 
            // 'block' removes the tiny invisible gap at the bottom of images
          />
        </div>

        {/* === DESKTOP HERO === */}
        <div className="hidden md:block w-full relative h-auto">
          <img 
            src="/hero-desktop.jpg" 
            alt="Stanway Desktop Hero" 
            className="w-full h-auto object-contain block"
          />
        </div>

      </Link>
    </section>
  );
}
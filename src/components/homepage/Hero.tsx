'use client';

import React from 'react';
import Link from 'next/link';

export default function PromoBanner() {
  return (
    <section className="w-full bg-white">
      <Link href="/shop" className="block w-full">
        
        {/* MOBILE HERO (Visible only on Phone) */}
        <div className="block md:hidden">
          <img 
            src="/hero-mobile.jpg" 
            alt="Stanway Hero Mobile" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* DESKTOP HERO (Visible only on Laptop) */}
        <div className="hidden md:block">
          <img 
            src="/hero-desktop.jpg" 
            alt="Stanway Hero Desktop" 
            className="w-full h-auto object-cover"
          />
        </div>

      </Link>
    </section>
  );
}
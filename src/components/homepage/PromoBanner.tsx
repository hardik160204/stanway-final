'use client';

import React from 'react';
import Link from 'next/link';

export default function PromoBanner() {
  return (
    <section className="w-full bg-white">
      <Link href="/shop" className="block w-full">
        
        {/* --- MOBILE VERSION (Visible on Phones Only) --- */}
        {/* Make sure this image is TALL (e.g., 1080x1350) */}
        <div className="block md:hidden w-full">
          <img 
            src="/mobile-banner.jpg" 
            alt="Stanway Health Mobile" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* --- DESKTOP VERSION (Visible on Laptops Only) --- */}
        {/* Make sure this image is WIDE (e.g., 1920x600) */}
        <div className="hidden md:block w-full">
          <img 
            src="/desktop-banner.jpg" 
            alt="Stanway Health Desktop" 
            className="w-full h-auto object-cover"
          />
        </div>

      </Link>
    </section>
  );
}
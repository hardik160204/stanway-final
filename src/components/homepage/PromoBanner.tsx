'use client';

import React from 'react';
import Link from 'next/link';

export default function PromoBanner() {
  return (
    // "pt-16" pushes it down so it doesn't hide behind the navbar
    <section className="w-full pt-16 bg-white">
      
      <Link href="/shop" className="block w-full">
        {/* This is the "Magic" line: 
           w-full = Take full width of phone
           h-auto = Calculate height automatically (NO DISTORTION)
        */}
        <img 
          src="/hero-bundle.png" 
          alt="Banner" 
          className="w-full h-auto object-contain"
        />
      </Link>

    </section>
  );
}
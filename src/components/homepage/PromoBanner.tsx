'use client';

import React from 'react';
import Link from 'next/link';

export default function PromoBanner() {
  return (
    <section className="w-full bg-gray-100 border-b border-gray-300">
      <Link href="/shop" className="block w-full">
        
        {/* === MOBILE HERO (Phone Only) === */}
        <div className="block md:hidden w-full relative min-h-[300px] bg-red-100 border-4 border-red-500">
          
          {/* This text only shows if the image is broken */}
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
            <p className="text-red-600 font-bold">
              MOBILE IMAGE NOT FOUND.<br/>
              Check file name: <br/>
              <span className="text-black">/public/hero-mobile.jpg</span>
            </p>
          </div>

          <img 
            src="/hero-mobile.jpg" 
            alt="Mobile Hero" 
            className="relative z-10 w-full h-auto object-cover min-h-[300px]"
            onError={(e) => e.currentTarget.style.opacity = '0'} // Hides image if broken so you see the error text
          />
        </div>

        {/* === DESKTOP HERO (Laptop Only) === */}
        <div className="hidden md:block w-full relative min-h-[400px] bg-blue-100">
          <img 
            src="/hero-desktop.jpg" 
            alt="Desktop Hero" 
            className="w-full h-auto object-cover"
          />
        </div>

      </Link>
    </section>
  );
}
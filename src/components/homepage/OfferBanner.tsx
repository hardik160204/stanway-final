'use client';

import React from 'react';
import Link from 'next/link';

export default function OfferBanner() {
  return (
    <section className="w-full bg-white py-8">
      <div className="container mx-auto px-4">
        
        <Link href="/shop" className="block w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          
          {/* === MOBILE OFFER === */}
          <div className="block md:hidden w-full">
            <img 
              src="/offer-mobile.png" 
              alt="Special Offer" 
              className="w-full h-auto object-cover block"
            />
          </div>

          {/* === DESKTOP OFFER === */}
          <div className="hidden md:block w-full">
            <img 
              src="/offer-desktop.png" 
              alt="Special Offer" 
              className="w-full h-auto object-cover block"
            />
          </div>

        </Link>

      </div>
    </section>
  );
}
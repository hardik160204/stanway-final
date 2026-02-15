'use client';

import React from 'react';
import Link from 'next/link';

export default function OfferBanner() {
  return (
    <section className="w-full bg-white py-8 md:py-16">
      <div className="container mx-auto px-4">
        
        <Link href="/shop" className="block w-full overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          
          {/* === MOBILE OFFER (Phone) === */}
          {/* Visible on screens smaller than 768px */}
          <div className="block md:hidden w-full relative">
            <img 
              src="/offer-mobile.jpg" 
              alt="Special Offer" 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* === DESKTOP OFFER (Laptop) === */}
          {/* Visible on screens larger than 768px */}
          <div className="hidden md:block w-full relative">
            <img 
              src="/offer-desktop.jpg" 
              alt="Special Offer" 
              className="w-full h-auto object-cover"
            />
          </div>

        </Link>

      </div>
    </section>
  );
}
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Moon, Zap } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="container mx-auto">
        
        {/* The Banner Container - Soft Blue Background like HK Vitals */}
        <div className="bg-[#DCEAF7] rounded-3xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 md:p-12 relative">
          
          {/* LEFT: Headline & Benefits */}
          <div className="w-full md:w-1/2 z-10 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold text-[#2A4365] mb-4 leading-tight">
              Daily balance starts <br />
              with the right pair!
            </h2>
            
            {/* Decorative Dots */}
            <div className="flex gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-[#2A4365]"></div>
              <div className="w-3 h-3 rounded-full bg-[#2A4365] opacity-60"></div>
              <div className="w-3 h-3 rounded-full bg-[#2A4365] opacity-30"></div>
            </div>

            {/* Simple Icons (Like the arm/bed icons in your reference) */}
            <div className="flex gap-8">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-[#2A4365]" />
                <span className="text-sm font-bold text-[#2A4365] leading-tight">
                  Boosts Daily <br /> Energy
                </span>
              </div>
              <div className="border-l border-[#2A4365]/20 h-10"></div>
              <div className="flex items-center gap-3">
                <Moon className="w-6 h-6 text-[#2A4365]" />
                <span className="text-sm font-bold text-[#2A4365] leading-tight">
                  Promotes Better <br /> Sleep
                </span>
              </div>
            </div>

            {/* Mobile CTA (Desktop uses the price tag as CTA) */}
            <div className="mt-8 md:hidden">
               <Link href="/shop" className="bg-[#2A4365] text-white px-6 py-3 rounded-full font-bold text-sm">
                 Shop Now
               </Link>
            </div>
          </div>

          {/* CENTER: The Price Tag Box (Floating) */}
          <div className="relative z-20 md:-ml-20 mb-8 md:mb-0 transform md:rotate-2 hover:rotate-0 transition-transform duration-300">
             <div className="bg-white border-2 border-[#5B7C99] rounded-xl p-4 shadow-lg text-center min-w-[140px]">
                <div className="bg-[#333] text-white text-xs font-bold uppercase py-1 px-2 rounded mb-1 inline-block">
                  GET @
                </div>
                <div className="text-4xl font-black text-[#2A4365]">
                  ₹999
                </div>
                <div className="text-xs text-gray-400 line-through">₹1499</div>
             </div>
          </div>

          {/* RIGHT: Product Image */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end relative">
            {/* Placeholder for your Combo Image (Two bottles) */}
            <img 
              src="/product-ashwa.jpg" 
              alt="Wellness Combo" 
              className="w-48 md:w-64 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
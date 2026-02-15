'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="relative w-full bg-[#F0F4F8] pt-28 pb-12 md:pt-32 md:pb-20 overflow-hidden">
      
      {/* Container: Controls width and centers everything */}
      <div className="container mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
        
        {/* 1. TEXT SECTION (Scales down perfectly on phone) */}
        <div className="z-10 w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:space-y-6">
          
          {/* Badge: Small tag above title */}
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase">
            New Launch
          </span>

          {/* Title: 
              - Mobile: text-4xl (Big enough to read, small enough to fit)
              - Desktop: text-6xl (Huge impact) 
          */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
            The Ultimate <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Daily Stack.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-sm md:text-lg max-w-md leading-relaxed">
            Multivitamins + ACV + Collagen. <br className="hidden md:block" />
            The complete science-backed kit for your best self.
          </p>

          {/* Button */}
          <Link 
            href="/shop" 
            className="group mt-4 inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full font-semibold text-sm md:text-base transition-all hover:bg-gray-800 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Shop Bundle <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 2. IMAGE SECTION (The Hero) */}
        {/* This is the part that "shrinks" instead of distorting */}
        <div className="relative w-full md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
          
          {/* Decorative Blur Background (Optional) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-purple-200 blur-[80px] opacity-40 rounded-full scale-75"></div>
          
          {/* THE IMAGE: 
              - w-full: Takes full width of container
              - h-auto: Adjusts height automatically (No stretching)
              - object-contain: Ensures 100% of the image is visible
          */}
          <img 
            src="/hero-bundle.png" 
            alt="Daily Stack Bundle"
            className="relative z-10 w-[85%] md:w-full max-w-[400px] md:max-w-[600px] h-auto object-contain drop-shadow-2xl animate-float"
            // Fallback in case your image is missing
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/600x600/png?text=Bundle+Image";
            }}
          />
        </div>

      </div>
    </section>
  );
}
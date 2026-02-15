'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  return (
    // ADDED: pt-24 to push content below the fixed header
    // ADDED: min-h-[80vh] to ensure it fits the mobile screen nicely
    <section className="relative w-full min-h-[80vh] bg-blue-50 pt-24 pb-10 px-4 md:px-12 flex flex-col md:flex-row items-center justify-center overflow-hidden">
      
      {/* Text Content */}
      <div className="z-10 w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start space-y-4 md:space-y-6">
        
        {/* FIXED: Text size is now 4xl on mobile (smaller) and 6xl on desktop */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#1a202c] leading-tight tracking-tight">
          The Ultimate <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
            Daily Stack.
          </span>
        </h1>

        <p className="text-gray-600 text-sm md:text-lg max-w-md mx-auto md:mx-0">
          Get the complete kit: Multivitamins + ACV + Collagen. 
          Science-backed nutrition for your best self.
        </p>

        <Link 
          href="/shop" 
          className="group flex items-center gap-2 bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold transition-all hover:bg-gray-800 hover:scale-105"
        >
          View Bundle <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Image Content */}
      <div className="relative w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
        {/* Placeholder circle background */}
        <div className="absolute inset-0 bg-blue-200 blur-3xl opacity-30 rounded-full transform scale-75"></div>
        
        {/* FIXED: Image with object-contain to prevent stretching */}
        {/* Ensure this file exists in your public folder! */}
        <img 
          src="/hero-bundle.png" 
          alt="Daily Stack Bundle"
          className="relative z-10 w-[80%] md:w-full max-w-md drop-shadow-2xl object-contain animate-float"
          onError={(e) => {
            // Fallback if image is missing
            e.currentTarget.src = "https://placehold.co/400x400/e2e8f0/1e293b?text=Product+Image";
          }}
        />
      </div>

    </section>
  );
}
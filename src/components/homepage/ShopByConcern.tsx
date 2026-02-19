'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

// --- UPDATED LINKS ---
// We changed the "link" properties below to point to dedicated collection pages
const categories = [
  { 
    id: 'daily', 
    title: 'DAILY NUTRITION', 
    link: '/collections/daily-nutrition', 
    bgColor: 'bg-[#EAD6C9]', 
    image: '/cat-daily.jpg' 
  },
  { 
    id: 'beauty', 
    title: 'SKIN & DETOX', 
    link: '/collections/skin-detox', 
    bgColor: 'bg-[#A8C6DF]', 
    image: '/cat-beauty.jpg' 
  },
  { 
    id: 'balance', 
    title: 'METABOLISM', 
    link: '/collections/metabolism', 
    bgColor: 'bg-[#F0D879]', 
    image: '/cat-energy.jpg' 
  }
];
export default function ShopByConcern() {
  return (
    <section className="py-8 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-6 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Range</h2>
        </div>

        {/* MOBILE: Flex + Overflow (Swipe). DESKTOP: Grid */}
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-10 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory hide-scrollbar">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={cat.link}
              // Fixed width (w-64) for mobile makes it swipeable
              className={`relative flex-shrink-0 w-64 md:w-full max-w-[340px] h-[280px] md:h-[380px] rounded-2xl md:rounded-3xl overflow-hidden group ${cat.bgColor} snap-center`}
            >
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1">
                <span className="text-xs md:text-sm font-bold text-gray-900 tracking-widest uppercase">
                  {cat.title}
                </span>
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-gray-900 stroke-[3]" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[85%] flex items-end justify-center">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  style={{ mixBlendMode: 'multiply' }} 
                />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
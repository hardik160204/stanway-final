'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Configuration for your 3 Slides
  const slides = [
    {
      id: 1,
      mobile: '/hero1-mobile.jpg',
      desktop: '/hero1-desktop.jpg',
      alt: 'Slide 1: Welcome to Stanway'
    },
    {
      id: 2,
      mobile: '/hero2-mobile.jpg',
      desktop: '/hero2-desktop.jpg',
      alt: 'Slide 2: Best Sellers'
    },
    {
      id: 3,
      mobile: '/hero3-mobile.jpg',
      desktop: '/hero3-desktop.jpg',
      alt: 'Slide 3: New Science'
    }
  ];

  // Auto-Slide Logic (Every 5 Seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5000ms = 5 Seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="w-full bg-white relative group">
      <Link href="/shop" className="block w-full">
        
        {/* GRID STACK TRICK: 
           We put all images in the same grid cell (col-start-1 row-start-1).
           This makes them stack on top of each other.
           We then just toggle opacity to fade them in/out.
        */}
        <div className="grid grid-cols-1">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`col-start-1 row-start-1 w-full transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* === MOBILE IMAGE === */}
              <div className="block md:hidden w-full">
                <img 
                  src={slide.mobile} 
                  alt={slide.alt} 
                  className="w-full h-auto object-cover block"
                />
              </div>

              {/* === DESKTOP IMAGE === */}
              <div className="hidden md:block w-full">
                <img 
                  src={slide.desktop} 
                  alt={slide.alt} 
                  className="w-full h-auto object-cover block"
                />
              </div>
            </div>
          ))}
        </div>

      </Link>

      {/* Navigation Dots (Bottom Center) */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all shadow-sm ${
              index === currentSlide 
                ? 'bg-black w-6' // Active Dot (Wide)
                : 'bg-white/60 hover:bg-white' // Inactive Dot
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
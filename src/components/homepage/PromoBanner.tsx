'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getHomepageConfig } from '../../app/lib/shopify-content';

interface Slide {
  id: number;
  mobile: string;
  desktop: string;
  link: string;
  alt: string;
}

export default function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    async function loadShopifyData() {
      const config = await getHomepageConfig();

      if (config?.promo_desktop && config.promo_desktop.length > 0) {
        const shopifySlides = config.promo_desktop.map((desktopUrl: string, index: number) => ({
          id: index,
          desktop: desktopUrl,
          mobile: config.promo_mobile[index] || desktopUrl, 
          // Match the link to the image index. If missing, fallback to "/shop"
          link: (config.promo_links && config.promo_links[index]) ? config.promo_links[index] : "/shop",
          alt: `Promo Slide ${index + 1}`
        }));
        setSlides(shopifySlides);
      }
    }
    loadShopifyData();
  }, []);

  // Auto-Slide Logic (5 Seconds)
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  // Get the link for the currently visible slide
  const currentLink = slides[currentSlide]?.link || "/shop";

  return (
    <section className="w-full bg-white relative group">
      
      {/* The clickable wrapper around the entire slider */}
      <Link href={currentLink} className="block w-full">
        <div className="grid grid-cols-1">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`col-start-1 row-start-1 w-full transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Mobile Image */}
              <div className="block md:hidden w-full">
                <img src={slide.mobile} alt={slide.alt} className="w-full h-auto object-cover" />
              </div>
              {/* Desktop Image */}
              <div className="hidden md:block w-full">
                <img src={slide.desktop} alt={slide.alt} className="w-full h-auto object-cover" />
              </div>
            </div>
          ))}
        </div>
      </Link>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.preventDefault(); setCurrentSlide(index); }}
            className={`w-2.5 h-2.5 rounded-full transition-all shadow-sm ${
              index === currentSlide ? 'bg-black w-6' : 'bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
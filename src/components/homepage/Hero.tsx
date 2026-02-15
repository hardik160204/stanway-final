'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    headline: "Fix Your Metabolism,\nInside Out.",
    subtext: "Clinically proven formulas to reduce bloating and boost energy.",
    buttonText: "Shop Metabolism",
    bgColor: "bg-gray-100", // Forced standard Tailwind gray
    accentColor: "text-orange-600",
    image: "/bottle example.jpg", 
    price: "₹799"
  },
  {
    id: 2,
    headline: "Immunity That\nActually Works.",
    subtext: "Pure Ashwagandha and Vitamin C for your daily defense shield.",
    buttonText: "Shop Immunity",
    bgColor: "bg-red-50", // Forced standard Tailwind red tint
    accentColor: "text-red-600",
    image: "/hero-bottles.png", 
    price: "₹499"
  },
  {
    id: 3,
    headline: "The Ultimate\nDaily Stack.",
    subtext: "Get the complete kit: Multivitamins + ACV + Collagen.",
    buttonText: "View Bundle",
    bgColor: "bg-blue-50", // Forced standard Tailwind blue tint
    accentColor: "text-blue-600",
    image: "/hero-bottles.png", 
    price: "₹1299"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    // FORCE HEIGHT: min-h-[600px] ensures it never collapses
    <section className="relative w-full min-h-[650px] md:h-[85vh] overflow-hidden pt-20">
      
      <AnimatePresence mode='wait'>
        {slides.map((slide, index) => (
          index === current && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              // ABSOLUTE POSITIONING to fill the screen
              className={`absolute inset-0 w-full h-full ${slide.bgColor} flex items-center justify-center`}
            >
              <div className="container mx-auto px-4 md:px-8 h-full flex flex-col md:flex-row items-center justify-center gap-10">
                
                {/* --- LEFT TEXT (Forced Dark Colors) --- */}
                <div className="flex-1 text-center md:text-left z-10 max-w-xl">
                  <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
                  >
                    {slide.headline}
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mt-6 text-lg text-gray-700 font-medium"
                  >
                    {slide.subtext}
                  </motion.p>

                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 flex justify-center md:justify-start"
                  >
                    <button className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg cursor-pointer">
                      {slide.buttonText}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                </div>

                {/* --- RIGHT IMAGE --- */}
                <div className="flex-1 relative w-full flex justify-center items-center">
                   {/* IMAGE CONTAINER */}
                   <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                      {/* Placeholder Circle if image fails */}
                      <div className="absolute inset-0 bg-white/40 rounded-full blur-3xl" />
                      
                      <Image 
                        src={slide.image} 
                        alt="Product"
                        fill
                        className="object-contain drop-shadow-2xl z-10"
                        priority
                      />
                   </div>
                </div>

              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* --- DOTS --- */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-3 rounded-full transition-all duration-300 ${
              idx === current ? "w-8 bg-black" : "w-3 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
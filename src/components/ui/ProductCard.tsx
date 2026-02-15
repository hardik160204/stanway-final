'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Star, FlaskConical, Info } from 'lucide-react';
import { motion } from 'framer-motion';
// 1. IMPORT THE HOOK
import { useCart } from '../../context/CartContext';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  ingredients: string[];
  goal: string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const [isScienceMode, setIsScienceMode] = useState(false);
  
  // 2. GET THE OPEN FUNCTION
  const { toggleCart } = useCart();

  return (
    <div className="relative w-[280px] md:w-[320px] h-[420px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex-shrink-0 snap-center group">
      
      {/* --- TOGGLE --- */}
      <div className="absolute top-4 right-4 z-20 flex bg-gray-100 rounded-full p-1">
        <button 
          onClick={() => setIsScienceMode(false)}
          className={`p-1.5 rounded-full transition-all ${!isScienceMode ? 'bg-white shadow-sm' : 'text-gray-400'}`}
        >
          <Info className="w-3 h-3 md:w-4 md:h-4" />
        </button>
        <button 
          onClick={() => setIsScienceMode(true)}
          className={`p-1.5 rounded-full transition-all ${isScienceMode ? 'bg-black text-white shadow-sm' : 'text-gray-400'}`}
        >
          <FlaskConical className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>

      {/* --- IMAGES --- */}
      <div className="relative h-[220px] w-full flex items-center justify-center mb-4 overflow-hidden rounded-xl bg-gray-50">
        <motion.div
          animate={{ opacity: isScienceMode ? 0 : 1, scale: isScienceMode ? 0.9 : 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image 
            src={product.image} 
            alt={product.name} 
            width={200} 
            height={200}
            className="object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500" 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isScienceMode ? 1 : 0, scale: isScienceMode ? 1 : 0.9 }}
          className="absolute inset-0 bg-black/90 text-white p-6 flex flex-col justify-center items-start rounded-xl"
        >
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Active Compounds</p>
          <ul className="space-y-2">
            {product.ingredients.map((ing, i) => (
              <li key={i} className="flex items-center gap-2 text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {ing}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* --- INFO --- */}
      <div>
        <span className="inline-block px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-md mb-2">
          {product.goal}
        </span>
        <h3 className="text-lg font-bold text-gray-900 leading-tight min-h-[50px]">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mt-1 mb-4">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-gray-900">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through">₹{Math.round(product.price * 1.4)}</span>
            <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          </div>
          
          {/* 3. ATTACH THE OPEN CART EVENT HERE */}
          <button 
           onClick={() => toggleCart()}
            className="h-10 w-10 md:w-auto md:px-4 bg-black text-white rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95 shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden md:inline text-sm font-bold">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
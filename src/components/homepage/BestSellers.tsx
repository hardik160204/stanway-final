'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { products } from '../../data/products';

export default function BestSellers() {
  const featured = products.slice(0, 4);

  return (
    <section className="py-8 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header - Compact for Mobile */}
        <div className="flex justify-between items-end mb-4 md:mb-12">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">Trending Now</h2>
            <p className="text-xs md:text-base text-gray-500">Our most loved formulations.</p>
          </div>
          <Link href="/shop?collection=bestsellers" className="flex items-center gap-1 text-xs md:text-sm font-bold text-red-600">
            View All <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
          </Link>
        </div>

        {/* THE FIX: grid-cols-2 for mobile, gap-3 (tight spacing) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {featured.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="group bg-white rounded-xl p-2 md:p-4 shadow-sm border border-transparent hover:border-gray-100">
              
              {/* Image */}
              <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-2 md:mb-4">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Info - Compact for Mobile */}
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-[10px] md:text-xs font-bold text-gray-500">{product.rating}</span>
                </div>
                
                {/* Clamp title to 2 lines so grid stays even */}
                <h3 className="font-bold text-gray-900 text-xs md:text-lg leading-tight mb-1 line-clamp-2 min-h-[2.5em]">
                  {product.title}
                </h3>
                
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-bold text-gray-900 text-sm md:text-base">₹{product.price}</span>
                  <span className="text-[10px] md:text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
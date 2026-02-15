'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Star, ShoppingBag } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

// Next.js 15: searchParams is now a Promise
export default function ShopPage({ searchParams }: { searchParams: Promise<{ collection?: string }> }) {
  
  // 1. Unwrap the params to see if we clicked "Best Sellers"
  // We use a try/catch or simple check because sometimes searchParams might be undefined in strict mode
  const params = use(searchParams);
  const isBestSellers = params?.collection === 'bestsellers';

  const { addToCart } = useCart();

  // 2. Filter Logic: If Best Sellers, only show items with Rating >= 4.7
  const displayProducts = isBestSellers 
    ? products.filter((p) => p.rating >= 4.7) 
    : products;

  const pageTitle = isBestSellers ? "Best Sellers" : "All Products";
  const pageSubtitle = isBestSellers 
    ? "Our most loved, top-rated formulations." 
    : "Science-backed formulations for your specific health goals.";

  return (
    <main className="bg-white min-h-screen">
      <Header />

      {/* Page Header */}
      <div className="bg-gray-50 pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {pageTitle}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {pageSubtitle}
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Empty State Check */}
          {displayProducts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-bold text-gray-900">No products found.</h3>
              <Link href="/shop" className="text-red-600 underline mt-2 inline-block">View all products</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {displayProducts.map((product) => (
                <div key={product.id} className="group flex flex-col">
                  
                  <Link href={`/products/${product.slug}`} className="block relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Quick Add Button */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart({
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          image: product.image,
                          quantity: 1
                        });
                      }}
                      className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </Link>

                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold text-gray-500">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                    
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 hover:text-red-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900">₹{product.price}</span>
                      <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
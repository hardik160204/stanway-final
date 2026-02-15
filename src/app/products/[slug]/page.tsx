'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { products } from '../../../data/products';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { useCart } from '../../../context/CartContext'; 
import { Star, Minus, Plus, ChevronDown, ChevronUp, ShoppingBag, Zap, Truck, ShieldCheck } from 'lucide-react';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 1. Unwrap the params (Next.js 15 Fix)
  const { slug } = React.use(params);
  
  // 2. Get Cart Tools
  const { addToCart } = useCart();

  // 3. Find the product matching the URL
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <a href="/" className="text-blue-600 underline">Return Home</a>
        </div>
      </div>
    );
  }

  // --- STATE ---
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image); // Use single image for now
  const [openSection, setOpenSection] = useState<string | null>('benefits');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  };

  const handleBuyNow = () => {
    // 1. Add to cart
    handleAddToCart();
    // 2. In the future: router.push('/checkout');
    // For now, it just opens the drawer which is perfect.
  };

  return (
    <main className="bg-white min-h-screen">
      <Header />

      <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
        
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
          <a href="/" className="hover:text-black">Home</a> / 
          <a href="/shop" className="hover:text-black">Shop</a> / 
          <span className="text-black font-semibold line-clamp-1">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* --- LEFT: IMAGE --- */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
              <img 
                src={activeImage} 
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* --- RIGHT: DETAILS --- */}
          <div className="flex flex-col">
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <span className="ml-2 text-black font-bold">{product.rating}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500 underline">{product.reviews} Reviews</span>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-xl text-gray-400 line-through mb-1">₹{product.originalPrice}</span>
              <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded mb-2">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            {/* --- ACTION AREA --- */}
            <div className="flex flex-col gap-4 mb-10">
               
               {/* Row 1: Quantity */}
               <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-900">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 gap-6">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-black">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold w-4 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-black">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
               </div>

               {/* Row 2: BUTTONS */}
               <div className="flex gap-4 mt-4">
                  
                  {/* Add to Cart (Secondary) */}
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 border-2 border-black text-black px-6 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </button>

                  {/* Buy Now (Primary) */}
                  <button 
                    onClick={handleBuyNow}
                    className="flex-1 bg-black text-white px-6 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-transform active:scale-95 shadow-xl"
                  >
                    <Zap className="w-5 h-5 fill-current" />
                    Buy Now
                  </button>
               </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mb-10 text-sm text-gray-600">
               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                 <Truck className="w-5 h-5 text-gray-400" />
                 <span>Free Shipping above ₹499</span>
               </div>
               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                 <ShieldCheck className="w-5 h-5 text-gray-400" />
                 <span>100% Authentic Guarantee</span>
               </div>
            </div>

            {/* ACCORDIONS */}
            <div className="border-t border-gray-200">
              {['benefits', 'ingredients', 'usage'].map((section) => (
                <div key={section} className="border-b border-gray-200">
                  <button 
                    onClick={() => toggleSection(section)}
                    className="w-full py-5 flex items-center justify-between font-bold text-gray-900 hover:text-red-600 capitalize"
                  >
                    {section === 'usage' ? 'How to Use' : section}
                    {openSection === section ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {openSection === section && (
                    <div className="pb-5 text-gray-600 leading-relaxed">
                      {section === 'benefits' ? (
                        <ul className="space-y-3">
                          {product.benefits?.map((b, i) => (
                            <li key={i} className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />{b}</li>
                          )) || "See packaging for details."}
                        </ul>
                      ) : section === 'ingredients' ? (
                        product.ingredients
                      ) : (
                        product.usage
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
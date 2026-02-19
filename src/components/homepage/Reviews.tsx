'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Aditi S.",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    product: "Apple Cider Vinegar Tablets",
    rating: 5,
    text: "I was skeptical about ACV because of the taste, but these effervescents are actually delicious. My bloating has gone down significantly."
  },
  {
    id: 2,
    name: "Rahul M.",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    product: "Ashwagandha Tablets",
    rating: 5,
    text: "My sleep quality was terrible due to work stress. This KSM-66 is the real deal. I fall asleep faster and wake up feeling rested."
  },
  {
    id: 3,
    name: "Sneha K.",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    product: "Collagen Tablets",
    rating: 5,
    text: "My skin feels so much plumper. I add this to my morning coffee and it dissolves instantly. Love that it has no weird aftertaste."
  },
  {
    id: 4,
    name: "Vikram R.",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    product: "Multivitamin for Men tablets",
    rating: 4,
    text: "A solid daily stack. I used to feel drained by 4 PM, but my energy levels are much more stable now. Good packaging too."
  }
];

export default function Reviews() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Trusted by 5,000+ Indians
          </h2>
          <div className="flex justify-center items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-bold text-gray-900 text-sm">4.8/5 Average</span>
          </div>
        </div>

        {/* Horizontal Scroll Rail */}
        <div className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="min-w-[300px] md:min-w-[350px] bg-gray-50 rounded-2xl p-6 flex flex-col snap-center border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* User Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                  <Image 
                    src={review.image} 
                    alt={review.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                  <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    {review.role}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex text-yellow-400 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
                "{review.text}"
              </p>

              {/* Product Tag */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Purchased</p>
                <p className="text-sm font-semibold text-gray-900">{review.product}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
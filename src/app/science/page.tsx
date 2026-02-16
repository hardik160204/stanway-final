import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { Microscope, Leaf, ShieldCheck, Activity } from 'lucide-react';
import Link from 'next/link';

export default function SciencePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-50 py-20 md:py-32 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Science, Not Magic.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We don't believe in miracle cures. We believe in clinical dosages, 
          bio-available ingredients, and rigorous testing.
        </p>
      </section>

      {/* The 3 Pillars */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Card 1 */}
          <div className="p-8 border border-gray-100 rounded-2xl bg-white hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
              <Activity size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">High Bio-Availability</h3>
            <p className="text-gray-600">
              It doesn't matter how much you take; it matters how much you absorb. 
              We use premium forms of vitamins (like Methylcobalamin instead of Cyanocobalamin) 
              that your body actually recognizes and uses.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 border border-gray-100 rounded-2xl bg-white hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mb-6 text-green-600">
              <Leaf size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Clean Ingredients</h3>
            <p className="text-gray-600">
              No talc. No hidden sugars. No titanium dioxide. Just pure active ingredients 
              encapsulated in 100% plant-based vegan shells.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 border border-gray-100 rounded-2xl bg-white hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mb-6 text-purple-600">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Clinical Dosages</h3>
            <p className="text-gray-600">
              We don't "fairy dust" our products. If a study says 500mg is needed for results, 
              we put 500mg in the capsule. Period.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-20 text-center px-4">
        <h2 className="text-3xl font-bold mb-6">Experience the Difference</h2>
        <Link href="/shop" className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition">
          Shop All Products
        </Link>
      </section>

      <Footer />
    </main>
  );
}
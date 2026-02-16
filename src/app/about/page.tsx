import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <div className="relative h-[60vh] bg-gray-900 flex items-center justify-center">
        {/* You can replace this image later */}
        <img 
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80" 
          alt="Lab research" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Wellness for the Modern World.
          </h1>
          <p className="text-xl text-gray-200">
            Bridging the gap between ancient wisdom and modern clinical science.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Our Story</h2>
          <div className="prose prose-lg text-gray-600 space-y-6">
            <p>
              Stanway Health was born out of frustration. Frustration with supplements that 
              didn't work, labels that hid ingredients, and an industry that prioritized 
              profit over purity.
            </p>
            <p>
              We set out to build something different: A brand that treats supplements like 
              science, not candy. We partnered with top clinicians and formulators to create 
              products that address the real stressors of modern life—stress, fatigue, 
              and nutritional gaps.
            </p>
            <p>
              Today, Stanway is trusted by thousands of people who refuse to compromise 
              on their health.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-2">Transparency First</h3>
              <p className="text-gray-600">We list every single ingredient. No proprietary blends hiding cheap fillers.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-2">Customer Obsession</h3>
              <p className="text-gray-600">We build what you need, not just what's trendy. Your health is our only KPI.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
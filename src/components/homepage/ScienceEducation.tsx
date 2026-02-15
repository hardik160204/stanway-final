'use client';

import React from 'react';
import { ShieldCheck, Brain, Zap } from 'lucide-react';

export default function ScienceSection() {
  const scienceCards = [
    {
      id: 1,
      title: "Gut Health",
      subtitle: "The Second Brain.",
      description: "70% of your immune system lives in your gut. An imbalance causes brain fog. We use spore-based probiotics that survive stomach acid to actually reach your intestines.",
      statLabel: "Absorption Rate",
      statValue: "90%",
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
      color: "bg-green-50",
      iconBg: "bg-green-100"
    },
    {
      id: 2,
      title: "Stress & Cortisol",
      subtitle: "The Silent Killer.",
      description: "Chronic stress creates cortisol, which stores fat. Our complex uses Acetic Acid to reactivate dormant metabolic pathways.",
      statLabel: "Cortisol Levels",
      statValue: "-27%",
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50",
      iconBg: "bg-purple-100"
    },
    {
      id: 3,
      title: "Metabolism",
      subtitle: "Fire Up The Engine.",
      description: "Clinical doses of Green Tea Extract and L-Carnitine to turn stored fat into usable energy throughout your day.",
      statLabel: "Fat Oxidation",
      statValue: "3x Faster",
      icon: <Zap className="w-6 h-6 text-orange-600" />,
      color: "bg-orange-50",
      iconBg: "bg-orange-100"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Backed by Science</h2>
          <p className="text-gray-500 mt-2">Real ingredients. Real results.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scienceCards.map((card) => (
            <div key={card.id} className="border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              
              {/* Header: Icon + Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${card.iconBg}`}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-900">{card.title}</h3>
              </div>

              {/* Content */}
              <h4 className="font-semibold text-lg text-gray-800 mb-2">{card.subtitle}</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {card.description}
              </p>

              {/* Proven Result Box */}
              <div className={`rounded-xl p-4 flex items-center justify-between ${card.color}`}>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Proven Result</p>
                  <p className="text-xs text-gray-500">{card.statLabel}</p>
                </div>
                <p className="text-2xl font-black text-gray-900">{card.statValue}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
'use client';

import React from 'react';
import { Brain, Flame, Shield, Activity } from 'lucide-react';

const topics = [
  {
    id: 'metabolism',
    label: 'Metabolism',
    icon: <Flame className="w-6 h-6 text-orange-600" />,
    bgBox: "bg-orange-100",
    title: "It's Not Just About Calories.",
    description: "Metabolism is your body's engine. When it slows down due to age or stress, you store fat. Our complex uses Acetic Acid to reactivate dormant metabolic pathways.",
    stat: "3x Faster",
    statLabel: "Fat Oxidation",
  },
  {
    id: 'gut',
    label: 'Gut Health',
    icon: <Shield className="w-6 h-6 text-green-600" />,
    bgBox: "bg-green-100",
    title: "The Second Brain.",
    description: "70% of your immune system lives in your gut. An imbalance causes brain fog. We use spore-based probiotics that survive stomach acid to actually reach your intestines.",
    stat: "90%",
    statLabel: "Absorption Rate",
  },
  {
    id: 'stress',
    label: 'Stress & Cortisol',
    icon: <Brain className="w-6 h-6 text-purple-600" />,
    bgBox: "bg-purple-100",
    title: "The Energy Killer.",
    description: "Chronic stress spikes Cortisol, which eats muscle and hoards fat. KSM-66 Ashwagandha actively lowers these levels, flipping you back to 'rest and digest' mode.",
    stat: "-27%",
    statLabel: "Cortisol Levels",
  }
];

export default function ScienceEducation() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-red-600 font-bold tracking-widest text-xs uppercase bg-red-50 px-3 py-1 rounded-full">
            The Science Focus
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            Fixing the Foundation, Not Symptoms.
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Most supplements fail because they ignore the root causes. We target the three pillars of vitality.
          </p>
        </div>

        {/* The "Banner" Grid - Static & Informational */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {topics.map((topic) => (
            <div key={topic.id} className="flex flex-col items-start">
              
              {/* Icon & Label Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl ${topic.bgBox}`}>
                  {topic.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{topic.label}</h3>
              </div>
              
              {/* Main Title */}
              <h4 className="text-lg font-bold text-gray-900 leading-tight mb-3">
                {topic.title}
              </h4>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                {topic.description}
              </p>
              
              {/* Stat Block (At bottom) */}
              <div className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between mt-auto">
                 <div>
                   <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Proven Result</div>
                   <div className="text-xs font-medium text-gray-900">{topic.statLabel}</div>
                 </div>
                 <div className="text-3xl font-black text-gray-900">{topic.stat}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
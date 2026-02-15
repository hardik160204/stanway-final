'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, ShieldCheck, Leaf, Activity } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "High Absorption",
    text: "Bio-available formulas that your body actually uses.",
    icon: <Activity className="w-8 h-8 text-green-400" />
  },
  {
    id: 2,
    title: "Clinically Dosed",
    text: "Ingredients at levels proven to show results.",
    icon: <FlaskConical className="w-8 h-8 text-blue-400" />
  },
  {
    id: 3,
    title: "Zero Hidden Fillers",
    text: "No sugar, no talc, no nasty preservatives.",
    icon: <ShieldCheck className="w-8 h-8 text-purple-400" />
  },
  {
    id: 4,
    title: "100% Plant Based",
    text: "Vegan certified formulas derived from nature.",
    icon: <Leaf className="w-8 h-8 text-emerald-400" />
  }
];

export default function WhyStanway() {
  return (
    <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
      
      {/* Background Decor (Subtle Glow) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Science, Not Magic.
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            We don't do "miracle cures." We do clinical dosages and clean ingredients that fix your metabolism from the inside out.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
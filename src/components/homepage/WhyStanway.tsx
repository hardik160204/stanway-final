import React from 'react';
import { Activity, FlaskConical, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Activity className="w-10 h-10 text-green-600" />,
    title: "High Absorption",
    description: "Bio-available formulas that your body actually absorbs, not just flushes out."
  },
  {
    icon: <FlaskConical className="w-10 h-10 text-blue-600" />,
    title: "Clinically Dosed",
    description: "Ingredients at the exact levels proven to show results in human studies."
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-purple-600" />,
    title: "Zero Hidden Fillers",
    description: "No sugar, no talc, no nasty preservatives. Just pure active ingredients."
  }
];

export default function WhyStanway() {
  return (
    <section className="bg-white py-20 border-t border-gray-100">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Backed by Real Science
          </h2>
          <p className="text-gray-500">
            We don't rely on magic. We rely on clinical data and clean sourcing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition duration-300 border border-gray-100 text-center group">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
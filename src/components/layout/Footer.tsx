'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // This points to a simple API route we will create in the next step
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* 1. BRAND & SOCIALS */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="cursor-pointer">
              <img src="/stanw-infi.svg" alt="Stanway Health" className="h-10 w-auto object-contain mix-blend-multiply" />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Science-backed formulations designed to help you live a longer, healthier, and more vibrant life.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/stanwayhealth/" target="_blank" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-700">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/people/Stanway-Health-and-Wellness-Co/61585043815629/" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-700">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* 2. SHOP */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="flex flex-col gap-4 text-gray-600 text-sm">
              <li><Link href="/shop" className="hover:text-black transition-colors cursor-pointer">All Products</Link></li>
              <li><Link href="/collections/best-sellers" className="hover:text-black transition-colors cursor-pointer">Best Sellers</Link></li>
              <li><Link href="/shop" className="hover:text-black transition-colors cursor-pointer">New Arrivals</Link></li>
            </ul>
          </div>

          {/* 3. COMPANY */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="flex flex-col gap-4 text-gray-600 text-sm">
              <li><Link href="/science" className="hover:text-black transition-colors cursor-pointer">Our Science</Link></li>
              <li><Link href="/about" className="hover:text-black transition-colors cursor-pointer">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-black transition-colors cursor-pointer">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-black transition-colors cursor-pointer">FAQ</Link></li>
            </ul>
          </div>

          {/* 4. NEWSLETTER */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Stay Updated</h4>
            <p className="text-gray-600 text-sm mb-4">Join our community for exclusive health tips and early access.</p>
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                type="email" 
                required
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="mt-3 w-full bg-black text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all cursor-pointer disabled:bg-gray-400"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'} <Send size={16} />
              </button>
            </form>
            {status === 'success' && <p className="text-green-600 text-xs mt-2 font-medium">✓ You're on the list!</p>}
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">© 2026 Stanway Health. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/policies/privacy-policy" className="text-gray-400 hover:text-black text-xs transition-colors cursor-pointer">Privacy Policy</Link>
            <Link href="/policies/terms-of-service" className="text-gray-400 hover:text-black text-xs transition-colors cursor-pointer">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
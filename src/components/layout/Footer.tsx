'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Send, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const shopifyUrl = "https://stanway-health-and-wellness-co.myshopify.com/contact#contact_form";

  const handleSubmit = () => {
    setStatus('submitting');
    // This gives the hidden iframe a second to process the Shopify form
    // before we show the success message and clear the input.
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="flex flex-col gap-6">
            <Link href="/"><img src="/stanw-infi.svg" alt="Stanway Health" className="h-10 w-auto mix-blend-multiply" /></Link>
            <p className="text-gray-600 text-sm">Science-backed formulations for a vibrant life.</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/stanwayhealth/" target="_blank" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/people/Stanway-Health-and-Wellness-Co/61585043815629/" 
              className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-sm tracking-wider">Shop</h4>
            <ul className="flex flex-col gap-4 text-gray-600 text-sm">
              <li><Link href="/shop" className="hover:text-black transition-colors">All Products</Link></li>
              <li><Link href="/collections/best-sellers" className="hover:text-black transition-colors">Best Sellers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-sm tracking-wider">Company</h4>
            <ul className="flex flex-col gap-4 text-gray-600 text-sm">
              <li><Link href="/science" className="hover:text-black transition-colors">Our Science</Link></li>
              <li><Link href="/about" className="hover:text-black transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-sm tracking-wider">Stay Updated</h4>
            
            {status === 'success' ? (
              <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-4 flex items-center gap-3">
                <CheckCircle className="text-green-600" size={20} />
                <p className="text-green-800 text-sm font-medium">Successfully subscribed!</p>
              </div>
            ) : (
              <>
                {/* THE INVISIBLE TRAP DOOR */}
                <iframe name="hidden_iframe" id="hidden_iframe" style={{ display: 'none' }}></iframe>
                
                <form action={shopifyUrl} method="post" target="hidden_iframe" onSubmit={handleSubmit} className="relative">
                  <input type="hidden" name="form_type" value="customer" />
                  <input type="hidden" name="contact[tags]" value="newsletter" />
                  
                  <input 
                    type="email" 
                    name="contact[email]"
                    required 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="mt-3 w-full bg-black text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-800 disabled:bg-gray-400 transition-colors cursor-pointer"
                  >
                    {status === 'submitting' ? 'Subscribing...' : 'Subscribe'} <Send size={16} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">© 2026 Stanway Health. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/policies/privacy-policy" className="text-gray-400 hover:text-black text-xs transition-colors">Privacy Policy</Link>
            <Link href="/policies/terms-of-service" className="text-gray-400 hover:text-black text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
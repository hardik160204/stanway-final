"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 1. Fetch Cart when the sidebar opens
  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  async function fetchCart() {
    setLoading(true);
    const cartId = localStorage.getItem('shopify_cart_id');

    if (!cartId) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ action: 'get', cartId }),
      });
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Cart fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  // Calculate total quantity for the badge
  const totalQuantity = cart?.lines?.edges?.reduce((sum: number, item: any) => sum + item.node.quantity, 0) || 0;

  return (
    <>
      {/* 1. THE TRIGGER BUTTON (Shopping Bag Icon) */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="relative p-2 text-gray-700 hover:text-black transition"
      >
        <ShoppingBag className="w-6 h-6" />
        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {totalQuantity}
          </span>
        )}
      </button>

      {/* 2. THE OVERLAY & SIDEBAR */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Dark Background Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar Content */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {loading ? (
                <div className="text-center py-10 text-gray-500">Loading...</div>
              ) : !cart || !cart.lines?.edges?.length ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Your cart is empty</p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-bold underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.lines.edges.map((item: any) => {
                  const line = item.node;
                  const product = line.merchandise.product;
                  const image = product.images.edges[0]?.node.url;

                  return (
                    <div key={line.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                         {image && <img src={image} alt={product.title} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                           <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{product.title}</h3>
                           <p className="text-xs text-gray-500">{line.merchandise.title}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <p className="font-semibold text-sm">₹{parseFloat(line.merchandise.price.amount).toFixed(2)}</p>
                          <p className="text-xs text-gray-400">Qty: {line.quantity}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer (Total & Checkout) */}
            {cart && cart.lines?.edges?.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-xl font-bold">₹{parseFloat(cart.cost.totalAmount.amount).toFixed(2)}</span>
                </div>
                <a 
                  href={cart.checkoutUrl}
                  className="block w-full bg-black text-white text-center py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-lg"
                >
                  Checkout Now
                </a>
                <Link 
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-xs text-gray-500 mt-4 underline"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
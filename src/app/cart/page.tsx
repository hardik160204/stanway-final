"use client";

import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Link from 'next/link';
// Import the icons
import { Trash2, Plus, Minus, Loader2 } from 'lucide-react';

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const cartId = localStorage.getItem('shopify_cart_id');
    if (cartId) {
      fetchCart(cartId);
    } else {
      setLoading(false);
    }
  }, []);

  // --- API CALLS ---

  async function fetchCart(cartId: string) {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ action: 'get', cartId }),
      });
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantity(lineId: string, newQuantity: number) {
    if (newQuantity < 1) return; // Don't go below 1 (use delete instead)
    
    setUpdatingId(lineId); // Show loading spinner on this specific item
    const cartId = localStorage.getItem('shopify_cart_id');

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ action: 'update', cartId, lineId, quantity: newQuantity }),
      });
      const updatedCart = await res.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setUpdatingId(null);
    }
  }

  async function removeItem(lineId: string) {
    if (!confirm("Remove this item?")) return;
    
    setUpdatingId(lineId);
    const cartId = localStorage.getItem('shopify_cart_id');

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ action: 'remove', cartId, lineId }),
      });
      const updatedCart = await res.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setUpdatingId(null);
    }
  }

  // --- RENDER ---

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>

        {!cart || cart.lines?.edges?.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <Link href="/shop" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* LEFT: Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cart.lines.edges.map((item: any) => {
                const line = item.node;
                const product = line.merchandise.product;
                const image = product.images.edges[0]?.node.url;
                const isUpdating = updatingId === line.id;

                return (
                  <div key={line.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
                    {/* Image */}
                    <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                      <img src={image} alt={product.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Info & Controls */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900">{product.title}</h3>
                          <p className="text-sm text-gray-500">{line.merchandise.title !== 'Default Title' ? line.merchandise.title : ''}</p>
                        </div>
                        {/* Remove Button */}
                        <button 
                          onClick={() => removeItem(line.id)}
                          className="text-gray-400 hover:text-red-600 transition p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
                          <button 
                            disabled={isUpdating || line.quantity <= 1}
                            onClick={() => updateQuantity(line.id, line.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center hover:text-black disabled:opacity-30"
                          >
                            <Minus size={14} />
                          </button>
                          
                          <span className={`text-sm font-bold w-4 text-center ${isUpdating ? 'opacity-50' : ''}`}>
                            {line.quantity}
                          </span>

                          <button 
                            disabled={isUpdating}
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center hover:text-black disabled:opacity-30"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <span className="font-bold text-lg">
                           ₹{parseFloat(line.merchandise.price.amount).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: Summary */}
            <div className="bg-gray-50 p-8 rounded-2xl h-fit border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="flex justify-between text-lg font-bold mb-6 border-t border-gray-200 pt-4">
                <span>Total</span>
                <span>
                   {cart.cost?.totalAmount?.amount ? `₹${parseFloat(cart.cost.totalAmount.amount).toFixed(2)}` : 'Calculated at Checkout'}
                </span>
              </div>

              <a 
                href={cart.checkoutUrl} 
                className="block w-full bg-black text-white text-center py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-lg"
              >
                Proceed to Checkout
              </a>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Tax included. Shipping calculated at checkout.
              </p>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
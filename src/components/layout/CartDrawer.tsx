'use client';

import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, addToCart, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Dark Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
        onClick={toggleCart}
      />

      {/* Drawer Panel */}
      <div className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[70] shadow-2xl flex flex-col transform transition-transform duration-300 ease-out">
        
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Cart
          </h2>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
              <p className="font-bold text-lg">Your cart is empty</p>
              <button onClick={toggleCart} className="mt-4 text-red-600 font-bold underline">
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                {/* Image */}
                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 relative">
                  {/* Using standard img for now to avoid domain issues */}
                  <img src={item.image || '/placeholder.jpg'} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm text-gray-900 line-clamp-2">{item.title}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-gray-500 mb-3">₹{item.price}</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-200 rounded-md w-fit">
                    <button 
                       className="px-2 py-1 hover:bg-gray-50"
                       onClick={() => addToCart({ ...item, quantity: -1 })}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-sm font-bold">{item.quantity}</span>
                    <button 
                       className="px-2 py-1 hover:bg-gray-50"
                       onClick={() => addToCart({ ...item, quantity: 1 })}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4 text-lg font-bold">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg">
              Checkout Securely
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              Free Shipping & Secure Payment
            </p>
          </div>
        )}

      </div>
    </>
  );
}
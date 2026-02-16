"use client";

import React, { useState } from 'react';

export default function AddToCartButton({ variantId }: { variantId: string }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Add to Cart");

  async function handleAddToCart() {
    if (!variantId) {
      alert("Error: Product variant not found.");
      return;
    }

    setLoading(true);
    setStatus("Adding...");

    try {
      // 1. Check if we already have a cart ID in LocalStorage
      let cartId = localStorage.getItem('shopify_cart_id');

      // 2. If no cart, CREATE one
      if (!cartId) {
        const createRes = await fetch('/api/cart', {
          method: 'POST',
          body: JSON.stringify({ action: 'create' }),
        });
        const cartData = await createRes.json();
        cartId = cartData.id;
        localStorage.setItem('shopify_cart_id', cartId!);
      }

      // 3. ADD the item to the cart
      const addRes = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ action: 'add', cartId, variantId }),
      });

      if (addRes.ok) {
        setStatus("Added!");
        // Reset button text after 2 seconds
        setTimeout(() => setStatus("Add to Cart"), 2000);
      } else {
        setStatus("Error");
      }

    } catch (error) {
      console.error("Cart Error:", error);
      setStatus("Try Again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button 
      onClick={handleAddToCart}
      disabled={loading}
      className={`py-4 px-8 rounded-full font-bold text-lg w-full md:w-auto mb-10 shadow-lg transition duration-200
        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800 shadow-gray-200'}
        ${status === 'Added!' ? 'bg-green-600 hover:bg-green-700' : ''}
      `}
    >
      {status}
    </button>
  );
}
import React from 'react';
import Link from 'next/link';
// Adjusting imports to go up two levels (../../) because we are in /app/shop/
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

// --- 1. SHOPIFY FETCH FUNCTION (Get 20 Products) ---
async function getAllProducts() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
  const URL = `https://${domain}/api/2023-01/graphql.json`;

  const query = `
  {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }`;

  const options = {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": token!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    cache: 'no-store' as RequestCache,
  };

  try {
    const res = await fetch(URL, options);
    const data = await res.json();
    return data.data?.products?.edges || [];
  } catch (error) {
    console.error("Shopify Shop Error:", error);
    return [];
  }
}

// --- 2. SHOP PAGE COMPONENT ---
export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Title */}
      <div className="bg-gray-50 py-12 md:py-20 text-center border-b border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
        <p className="text-gray-500 max-w-2xl mx-auto px-4">
          Browse our full range of science-backed supplements designed for your daily health.
        </p>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-16">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((item: any) => {
              const product = item.node;
              // Handle image URL safely
              const image = product.images?.edges?.[0]?.node?.url || 
                            product.images?.edges?.[0]?.node?.transformedSrc || 
                            '/placeholder.jpg';
              
              const price = product.priceRange.minVariantPrice.amount;

              return (
                <Link key={product.id} href={`/products/${product.handle}`} className="group block">
                  <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 relative aspect-square border border-gray-100">
                    <img 
                      src={image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    ₹{parseFloat(price).toFixed(2)}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-gray-400">No products found.</h2>
            <p className="text-gray-400 text-sm mt-2">Check your Shopify Inventory.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
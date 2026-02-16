import React from 'react';
import Link from 'next/link';

// --- IMPORTS ---
import Header from '../components/layout/Header';
import PromoBanner from '../components/homepage/PromoBanner';
import Hero from '../components/homepage/Hero';
import ShopByConcern from '../components/homepage/ShopByConcern'; // Your "Our Range" Cards
import WhyStanway from '../components/homepage/WhyStanway'; // The 3 Icons section
import Reviews from '../components/homepage/Reviews';
import BlogSection from '../components/homepage/BlogSection';
import OfferBanner from '../components/homepage/OfferBanner';
import Footer from '../components/layout/Footer';

// --- FALLBACK DATA (Backup in case Shopify connection is slow) ---
const FALLBACK_PRODUCTS = [
  {
    node: {
      id: 'fb1',
      title: 'Ashwagandha Tablets 500 mg',
      handle: 'ashwagandha-tablets',
      priceRange: { minVariantPrice: { amount: '499.00' } },
      images: { edges: [{ node: { url: 'https://cdn.shopify.com/s/files/1/0865/4988/9306/files/Ashwagandha.jpg?v=1708160000' } }] }
    }
  },
  {
    node: {
      id: 'fb2',
      title: 'Multivitamin For Men',
      handle: 'multivitamin-men',
      priceRange: { minVariantPrice: { amount: '599.00' } },
      images: { edges: [{ node: { url: 'https://cdn.shopify.com/s/files/1/0865/4988/9306/files/Multivitamin.jpg?v=1708160000' } }] }
    }
  },
  {
    node: {
      id: 'fb3',
      title: 'Multivitamin For Women',
      handle: 'multivitamin-women',
      priceRange: { minVariantPrice: { amount: '599.00' } },
      images: { edges: [{ node: { url: 'https://cdn.shopify.com/s/files/1/0865/4988/9306/files/WomenMulti.jpg?v=1708160000' } }] }
    }
  },
  {
    node: {
      id: 'fb4',
      title: 'Cranberry Tablets 600 mg',
      handle: 'cranberry-tablets',
      priceRange: { minVariantPrice: { amount: '649.00' } },
      images: { edges: [{ node: { url: 'https://cdn.shopify.com/s/files/1/0865/4988/9306/files/Cranberry.jpg?v=1708160000' } }] }
    }
  }
];

// --- SHOPIFY FETCH FUNCTION (With Backup) ---
async function getShopifyProducts() {
  try {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
    
    // If keys are missing, return backup immediately
    if (!domain || !token) return FALLBACK_PRODUCTS;

    const URL = `https://${domain}/api/2023-01/graphql.json`;

    const query = `
    {
      products(first: 4) {
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

    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error("Shopify Fetch Failed, using backup.");
      return FALLBACK_PRODUCTS;
    }

    const data = await res.json();
    const products = data.data?.products?.edges;

    // If Shopify returns empty list, use backup
    if (!products || products.length === 0) return FALLBACK_PRODUCTS;
    
    return products;

  } catch (error) {
    console.error("Shopify Error:", error);
    return FALLBACK_PRODUCTS; // Safety net
  }
}

// --- MAIN PAGE LAYOUT ---
export default async function Home() {
  // 1. Get Products (Real or Backup)
  const trendingProducts = await getShopifyProducts();

  return (
    <main className="min-h-screen bg-white pt-24 md:pt-28">
      <Header />
      <PromoBanner />
      <Hero />

      {/* 2. OUR RANGE (The Cards Section) */}
      <ShopByConcern />
      {/* 3. Why Stanway (Icons) */}
      <WhyStanway />

      {/* 4. TRENDING NOW */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
          <Link href="/shop" className="text-sm font-semibold underline hover:text-gray-600">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trendingProducts.map((item: any) => {
            const product = item.node;
            // Handle both new .url and old .transformedSrc just in case
            const image = product.images?.edges?.[0]?.node?.url || 
                          product.images?.edges?.[0]?.node?.transformedSrc || 
                          '/placeholder.jpg';
                          
            const price = product.priceRange.minVariantPrice.amount;

            return (
              <Link key={product.id} href={`/products/${product.handle}`} className="group block">
                <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 relative aspect-square">
                  <img 
                    src={image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1 truncate">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  ₹{parseFloat(price).toFixed(2)}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Removed ScienceEducation as requested */}
      
      <Reviews />
      <OfferBanner />
      <BlogSection />
      <Footer />
    </main>
  );
}
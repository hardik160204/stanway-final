import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';

// 1. Fetch the specific collection from your Shopify Brain
async function getCollection(handle: string) {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
  
  if (!domain || !token) return null;

  const URL = `https://${domain}/api/2023-01/graphql.json`;

  const query = `
  {
    collection(handle: "${handle}") {
      title
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
                }
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

  if (!res.ok) return null;
  const data = await res.json();
  return data.data?.collection;
}

// 2. Build the Page Layout
export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params (Our Next.js 16 rule!)
  const resolvedParams = await params;
  
  // Ask Shopify for the collection based on the URL
  const collection = await getCollection(resolvedParams.slug);

  // If Shopify can't find the collection, show a 404
  if (!collection) {
    return notFound();
  }

  const products = collection.products.edges;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 md:px-8 py-24 md:py-32">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12">
          {collection.title}
        </h1>

        {/* If the collection is empty, show a message */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No products found in this collection yet. Be sure to add some in Shopify!</p>
        ) : (
          /* The Product Grid */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((item: any) => {
              const product = item.node;
              const image = product.images?.edges?.[0]?.node?.url || '/placeholder.jpg';
              const price = product.priceRange.minVariantPrice.amount;

              return (
                <Link key={product.id} href={`/products/${product.handle}`} className="group block bg-white p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="bg-gray-100 rounded-2xl overflow-hidden mb-4 relative aspect-square">
                    <img 
                      src={image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1 truncate">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-medium">
                    ₹{parseFloat(price).toFixed(2)}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
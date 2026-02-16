import React from 'react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Link from 'next/link';

// --- 1. SHOPIFY FETCH FUNCTION ---
async function getProduct(handle: string) {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
  const URL = `https://${domain}/api/2023-01/graphql.json`;

  const query = `
  {
    product(handle: "${handle}") {
      id
      title
      handle
      descriptionHtml
      priceRange {
        minVariantPrice {
          amount
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
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
    return data.data?.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// --- 2. PRODUCT PAGE COMPONENT ---
// FIXED: 'params' is now a Promise in Next.js 15
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // FIXED: We must 'await' the params before using them
  const resolvedParams = await params;
  const productHandle = resolvedParams.slug;

  const product = await getProduct(productHandle);

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-500 mb-8">
            We searched for "{productHandle}" but couldn't find it.
          </p>
          <Link href="/" className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
            Back to Home
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Handle image URL safely
  const image = product.images?.edges?.[0]?.node?.url || 
                product.images?.edges?.[0]?.node?.transformedSrc || 
                '/placeholder.jpg';
                
  const price = product.priceRange.minVariantPrice.amount;
  const description = product.descriptionHtml;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: Product Image */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center border border-gray-100">
             <img 
               src={image} 
               alt={product.title} 
               className="w-full h-full object-cover"
             />
          </div>

          {/* RIGHT: Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {product.title}
            </h1>
            
            <p className="text-2xl text-gray-900 font-semibold mb-8">
              ₹{parseFloat(price).toFixed(2)}
            </p>

            <button className="bg-black text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-gray-800 transition w-full md:w-auto mb-10 shadow-lg shadow-gray-200 cursor-pointer">
              Add to Cart
            </button>

            <div className="prose prose-lg text-gray-600">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
              {/* Render HTML description safely */}
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
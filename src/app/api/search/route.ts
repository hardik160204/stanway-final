import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim();

  if (!query) {
    return NextResponse.json({ products: [] });
  }

  // UPDATED: Now it perfectly matches your existing .env.local file!
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || '';
  const token = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || '';

  const graphqlQuery = `
    query SearchProducts($searchQuery: String!) {
      products(first: 5, query: $searchQuery) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { searchQuery: `${query}*` },
      }),
    });

    const data = await res.json();
    
    // Optional: You can delete this console.log if you don't want to see the wiretap anymore
    console.log("SHOPIFY SEARCH RESPONSE:", JSON.stringify(data, null, 2));

    const products = data?.data?.products?.edges.map((edge: any) => edge.node) || [];
    
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}
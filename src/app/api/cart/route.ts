import { NextResponse } from 'next/server';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
const URL = `https://${domain}/api/2023-01/graphql.json`;

async function shopifyFetch(query: string, variables = {}) {
  const options = {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": token!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store' as RequestCache,
  };

  const response = await fetch(URL, options);
  return await response.json();
}

export async function POST(req: Request) {
  const body = await req.json();
  const { action, cartId, variantId, lineId, quantity } = body;

  try {
    // 1. GET CART
    if (action === 'get') {
      const query = `
        query getCart($cartId: ID!) {
          cart(id: $cartId) {
            id
            checkoutUrl
            cost { totalAmount { amount currencyCode } }
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product { title handle images(first: 1) { edges { node { url } } } }
                      price { amount }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const response = await shopifyFetch(query, { cartId });
      return NextResponse.json(response.data.cart);
    }

    // 2. CREATE CART
    if (action === 'create') {
      const query = `mutation cartCreate { cartCreate { cart { id checkoutUrl } } }`;
      const response = await shopifyFetch(query);
      return NextResponse.json(response.data.cartCreate.cart);
    }

    // 3. ADD TO CART
    if (action === 'add') {
      const query = `
        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart { id lines(first: 10) { edges { node { quantity } } } }
          }
        }
      `;
      const variables = { cartId, lines: [{ merchandiseId: variantId, quantity: 1 }] };
      const response = await shopifyFetch(query, variables);
      return NextResponse.json(response.data.cartLinesAdd.cart);
    }

    // 4. REMOVE ITEM (New)
    if (action === 'remove') {
      const query = `
        mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
              id
              checkoutUrl
              cost { totalAmount { amount currencyCode } }
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        product { title handle images(first: 1) { edges { node { url } } } }
                        price { amount }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const variables = { cartId, lineIds: [lineId] };
      const response = await shopifyFetch(query, variables);
      return NextResponse.json(response.data.cartLinesRemove.cart);
    }

    // 5. UPDATE QUANTITY (New)
    if (action === 'update') {
      const query = `
        mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
              id
              checkoutUrl
              cost { totalAmount { amount currencyCode } }
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        product { title handle images(first: 1) { edges { node { url } } } }
                        price { amount }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const variables = { cartId, lines: [{ id: lineId, quantity: quantity }] };
      const response = await shopifyFetch(query, variables);
      return NextResponse.json(response.data.cartLinesUpdate.cart);
    }

    return NextResponse.json({ error: "Invalid Action" }, { status: 400 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Shopify Error" }, { status: 500 });
  }
}
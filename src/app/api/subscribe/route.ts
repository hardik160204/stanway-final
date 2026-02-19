import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN; // Note: Use your ADMIN token for this

  const query = `
    mutation customerCreate($input: CustomerInput!) {
      customerCreate(input: $input) {
        customer { email }
        userErrors { field message }
      }
    }
  `;

  const variables = {
    input: {
      email,
      acceptsMarketing: true,
      tags: ["newsletter"]
    }
  };

  const res = await fetch(`https://${domain}/admin/api/2023-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token!,
    },
    body: JSON.stringify({ query, variables }),
  });

  return NextResponse.json({ success: res.ok });
}
const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;

async function ShopifyData(query: string) {
  const URL = `https://${domain}/api/2023-01/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, options).then((response) => response.json());
    return data;
  } catch (error) {
    throw new Error("Products not fetched");
  }
}

export async function getProductsInCollection() {
  const query = `
  {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          tags 
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

  const response = await ShopifyData(query);
  return response.data?.products?.edges ? response.data.products.edges : [];
}
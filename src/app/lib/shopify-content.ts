export async function getHomepageConfig() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
  const URL = `https://${domain}/api/2023-01/graphql.json`;

  const query = `
  {
    metaobject(handle: {handle: "global-settings", type: "homepage_config"}) {
      fields {
        key
        value
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
    }
  }
  `;

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": token!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      cache: 'no-store', // Ensures we always get fresh data
    });
    const data = await res.json();
    const fields = data.data?.metaobject?.fields || [];
    
    // Convert array to easy object
    const config: any = {};
    fields.forEach((f: any) => {
      if (f.key === "offer_image" && f.reference) {
        config[f.key] = f.reference.image.url;
      } else {
        config[f.key] = f.value;
      }
    });
    
    return config;
  } catch (error) {
    console.error("Metaobject Error:", error);
    return null;
  }
}
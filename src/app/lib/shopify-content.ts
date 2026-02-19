export async function getHomepageConfig() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
  const URL = `https://${domain}/api/2023-01/graphql.json`;

  const query = `
  {
    metaobject(handle: {handle: "stanway-settings", type: "homepage_config"}) {
      fields {
        key
        value
        references(first: 10) {
          edges {
            node {
              ... on MediaImage {
                image {
                  url
                }
              }
            }
          }
        }
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
      cache: 'no-store',
    });
    const data = await res.json();
    const fields = data.data?.metaobject?.fields || [];
    
    // 1. Initialize empty containers
    let promoDesktop: string[] = [];
    let promoMobile: string[] = [];
    let offerDesktop = "";
    let offerMobile = "";

    // 2. Sort the data into the right containers
    fields.forEach((f: any) => {
      // Promo Desktop (List)
      if (f.key === "promo_banners" && f.references) {
        promoDesktop = f.references.edges.map((e: any) => e.node.image.url);
      } 
      // Promo Mobile (List)
      else if (f.key === "promo_banners_mobile" && f.references) {
        promoMobile = f.references.edges.map((e: any) => e.node.image.url);
      }
      // Offer Desktop (Single)
      else if (f.key === "offer_image" && f.reference) {
        offerDesktop = f.reference.image.url;
      }
      // Offer Mobile (Single) - Checking for your specific "1" key
      else if (f.key === "offer_image_mobile_1" && f.reference) {
        offerMobile = f.reference.image.url;
      }
    });

    // 3. Return the clean package
    return {
      promo_desktop: promoDesktop,
      promo_mobile: promoMobile.length > 0 ? promoMobile : promoDesktop, // Fallback if mobile empty
      offer_desktop: offerDesktop,
      offer_mobile: offerMobile || offerDesktop // Fallback if mobile empty
    };

  } catch (error) {
    console.error("Metaobject Error:", error);
    return null;
  }
}
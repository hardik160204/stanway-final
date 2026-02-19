export async function getHomepageConfig() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
  const URL = `https://${domain}/api/2024-01/graphql.json`;

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
                image { url }
              }
            }
          }
        }
        reference {
          ... on MediaImage {
            image { url }
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
    
    let promoDesktop: string[] = [];
    let promoMobile: string[] = [];
    let offerDesktop = "";
    let offerMobile = "";
    
    // NEW: Default links fall back to /shop if you leave the Shopify box empty
    let promoLink = "/shop"; 
    let offerLink = "/shop";

    fields.forEach((f: any) => {
      // Images
      if (f.key === "promo_banners" && f.references) {
        promoDesktop = f.references.edges.map((e: any) => e.node.image.url);
      } else if (f.key === "promo_banners_mobile" && f.references) {
        promoMobile = f.references.edges.map((e: any) => e.node.image.url);
      } else if (f.key === "offer_image" && f.reference) {
        offerDesktop = f.reference.image.url;
      } else if (f.key === "offer_image_mobile_1" && f.reference) {
        offerMobile = f.reference.image.url;
      } 
      // NEW: Links (These use f.value because they are text, not images)
      else if (f.key === "promo_link" && f.value) {
        promoLink = f.value;
      } else if (f.key === "offer_link" && f.value) {
        offerLink = f.value;
      }
    });

    return {
      promo_desktop: promoDesktop,
      promo_mobile: promoMobile.length > 0 ? promoMobile : promoDesktop,
      offer_desktop: offerDesktop,
      offer_mobile: offerMobile || offerDesktop,
      promo_link: promoLink, // Exporting the link
      offer_link: offerLink  // Exporting the link
    };

  } catch (error) {
    console.error("Metaobject Error:", error);
    return null;
  }
}
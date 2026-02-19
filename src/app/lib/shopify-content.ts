// 1. Fetches Homepage Banners and Links
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
    
    // Arrays and strings for our links
    let promoLinks: string[] = []; 
    let offerLink = "/shop";

    fields.forEach((f: any) => {
      // Images
      if (f.key === "promo_banners" && f.references) {
        promoDesktop = f.references.edges.map((e: any) => e.node.image?.url).filter(Boolean);
      } else if (f.key === "promo_banners_mobile" && f.references) {
        promoMobile = f.references.edges.map((e: any) => e.node.image?.url).filter(Boolean);
      } else if (f.key === "offer_image" && f.reference) {
        offerDesktop = f.reference.image?.url || "";
      } else if (f.key === "offer_image_mobile_1" && f.reference) {
        offerMobile = f.reference.image?.url || "";
      } 
      // Links
      else if (f.key === "promo_links" && f.value) {
        try {
          promoLinks = JSON.parse(f.value); 
        } catch (e) {
          promoLinks = [];
        }
      } else if (f.key === "offer_link" && f.value) {
        offerLink = f.value;
      }
    });

    return {
      promo_desktop: promoDesktop,
      promo_mobile: promoMobile.length > 0 ? promoMobile : promoDesktop,
      offer_desktop: offerDesktop,
      offer_mobile: offerMobile || offerDesktop,
      promo_links: promoLinks, 
      offer_link: offerLink  
    };

  } catch (error) {
    console.error("Metaobject Error:", error);
    return null;
  }
}

// 2. Fetches the 3 newest articles for the Homepage feed
export async function getLatestArticles() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
  const URL = `https://${domain}/api/2024-01/graphql.json`;

  const query = `
  {
    blog(handle: "news") {
      articles(first: 3, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            excerptHtml
            publishedAt
            image {
              url
              altText
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
    return data.data?.blog?.articles?.edges.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error("Error fetching latest articles:", error);
    return [];
  }
}

// 3. Fetches a single article based on the URL clicked
export async function getSingleArticle(handle: string) {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
  const URL = `https://${domain}/api/2024-01/graphql.json`;

  const query = `
  {
    blog(handle: "news") {
      articleByHandle(handle: "${handle}") {
        title
        publishedAt
        contentHtml
        image {
          url
          altText
        }
        authorV2 {
          name
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
    return data.data?.blog?.articleByHandle || null;

  } catch (error) {
    console.error("Error fetching single article:", error);
    return null;
  }
}
import React from 'react';
import Link from 'next/link';

// --- SHOPIFY FETCH FUNCTION ---
async function getBlogs() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;
  const URL = `https://${domain}/api/2023-01/graphql.json`;

  const query = `
  {
    articles(first: 3, sortKey: PUBLISHED_AT, reverse: true) {
      edges {
        node {
          id
          title
          excerpt
          handle
          publishedAt
          image {
            url
            altText
          }
          blog {
            handle
          }
        }
      }
    }
  }
  `;

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
    return data.data?.articles?.edges || [];
  } catch (error) {
    console.error("Blog Fetch Error:", error);
    return [];
  }
}

export default async function BlogSection() {
  const articles = await getBlogs();

  if (articles.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Latest from Stanway
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item: any) => {
            const article = item.node;
            return (
              <div key={article.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-4 aspect-[4/3] bg-gray-100">
                  {article.image && (
                    <img 
                      src={article.image.url} 
                      alt={article.image.altText || article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-600 transition">
                  {article.title}
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  {article.excerpt || "Read more about this topic..."}
                </p>
                <Link 
                  href={`/blogs/${article.blog.handle}/${article.handle}`} // Note: You'll need to create this page later if you want full articles
                  className="text-black font-bold underline hover:text-gray-600"
                >
                  Read Article
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
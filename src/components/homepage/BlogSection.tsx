import React from 'react';
import Link from 'next/link';
// The exact path based on your screenshot
import { getLatestArticles } from '../../app/lib/shopify-content'; 

export default async function BlogSection() {
  // Fetch the 3 most recent articles directly from Shopify
  const articles = await getLatestArticles();

  // If there are no articles published yet, don't show the section to avoid a blank space
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
          Latest from Stanway
        </h2>

        {/* Blog Cards Grid (3 columns on Desktop, 1 on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article: any) => (
            <div key={article.id} className="flex flex-col group">
              
              {/* 1. The Image (Notice the singular /blog/ path here!) */}
              <Link href={`/blog/${article.handle}`} className="block overflow-hidden rounded-2xl mb-4">
                {article.image ? (
                  <img 
                    src={article.image.url} 
                    alt={article.image.altText || article.title} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-2xl" />
                )}
              </Link>

              {/* 2. The Title */}
              <Link href={`/blog/${article.handle}`}>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                  {article.title}
                </h3>
              </Link>

              {/* 3. The Excerpt (Summary) */}
              {article.excerptHtml && (
                <div 
                  className="text-gray-600 text-sm mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: article.excerptHtml }}
                />
              )}

              {/* 4. The "Read Article" Button */}
              <Link 
                href={`/blog/${article.handle}`} 
                className="text-black font-bold text-sm underline hover:text-gray-600 transition-colors mt-auto"
              >
                Read Article
              </Link>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogs } from '../../../data/blogs';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <Link href="/" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>

          <header className="text-center mb-10">
            <span className="text-red-600 font-bold text-sm uppercase tracking-wider">{blog.category}</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-6 leading-tight">{blog.title}</h1>
            <div className="flex items-center justify-center text-gray-500 text-sm gap-4 font-medium">
              <p>By {blog.author}</p>
              <span>•</span>
              <p>{blog.date}</p>
              <span>•</span>
              <p>{blog.readTime}</p>
            </div>
          </header>

          <div className="relative w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-12 shadow-xl">
             {/* STANDARD HTML IMG TAG */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-red-600 hover:prose-a:text-red-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

        </div>
      </article>

      <Footer />
    </main>
  );
}
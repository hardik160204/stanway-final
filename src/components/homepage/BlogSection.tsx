'use client';

import React from 'react';
import Link from 'next/link';
import { blogs } from '../../data/blogs';

export default function BlogSection() {
  const featuredBlogs = blogs.slice(0, 3);
  const largeBlog = featuredBlogs[0];
  const smallBlogs = featuredBlogs.slice(1);

  return (
    <section className="py-16 md:py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Blogs</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Large Blog Card */}
          <Link href={`/blog/${largeBlog.slug}`} className="md:col-span-2 relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden group block">
            {/* STANDARD HTML IMG TAG - Works with any URL instantly */}
            <img
              src={largeBlog.image}
              alt={largeBlog.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-10">
              <span className="text-white/80 text-sm md:text-base mb-3 block font-medium">{largeBlog.readTime} | {largeBlog.category}</span>
              <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">{largeBlog.title}</h3>
            </div>
          </Link>

          {/* Small Blog Cards */}
          <div className="flex flex-col gap-6">
            {smallBlogs.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.slug}`} className="relative h-[240px] rounded-3xl overflow-hidden group block">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-white/80 text-xs md:text-sm mb-2 block font-medium">{blog.readTime} | {blog.category}</span>
                  <h3 className="text-xl font-bold text-white leading-tight">{blog.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
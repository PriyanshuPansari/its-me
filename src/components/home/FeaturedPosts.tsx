// src/components/home/FeaturedPosts.tsx
import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BlogPostCard from './BlogPostCard'
import type { BlogPostCardProps } from './BlogPostCard'

const FeaturedPosts = () => {
  const posts: BlogPostCardProps[] = [
    {
      title: 'Building a Modern Web Application with Next.js and TypeScript',
      excerpt:
        'Learn how to build scalable web applications using Next.js 13+ and TypeScript, with a focus on best practices and performance optimization.',
      date: 'February 20, 2024',
      readingTime: '8 min read',
      slug: 'building-modern-web-app',
      tags: ['Next.js', 'TypeScript', 'Web Development'],
    },
    {
      title: 'Understanding React Server Components',
      excerpt:
        'Deep dive into React Server Components, how they work, and when to use them in your Next.js applications for optimal performance.',
      date: 'February 15, 2024',
      readingTime: '6 min read',
      slug: 'react-server-components',
      tags: ['React', 'Performance', 'Architecture'],
    },
    {
      title: 'Mastering Tailwind CSS: From Basics to Advanced',
      excerpt:
        'A comprehensive guide to using Tailwind CSS effectively, including advanced features, custom configurations, and performance optimization.',
      date: 'February 10, 2024',
      readingTime: '10 min read',
      slug: 'mastering-tailwind-css',
      tags: ['CSS', 'Tailwind', 'Styling'],
    },
  ]

  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-900/50 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Latest from the Blog
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
            Dive into technical articles about web development, software
            engineering, and best practices in modern application development.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} {...post} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            View All Posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPosts

// src/components/blog/BlogPostListCard.tsx
import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/types/blog'
import Image from 'next/image'

interface BlogPostListCardProps extends BlogPost {
  onCategoryClick: (category: string) => void
  onTagClick: (tag: string) => void
}

const BlogPostListCard = ({
  title,
  excerpt,
  date,
  readingTime,
  slug,
  tags,
  category,
  author,
  coverImage,
  onCategoryClick,
  onTagClick,
}: BlogPostListCardProps) => {
  return (
    <article className="group grid gap-8 rounded-lg border bg-white p-2 transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:grid-cols-5 sm:p-6">
      {/* Image - Hidden on mobile */}
      <div className="hidden overflow-hidden rounded-lg sm:col-span-2 sm:block">
        <Link href={`/blog/${slug}`}>
          <div className="relative h-full w-full">
            <Image
              src={coverImage || '/api/placeholder/600/400'}
              alt={title}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-col sm:col-span-3">
        {/* Category & Date */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <button
            onClick={() => onCategoryClick(category)}
            className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
          >
            {category}
          </button>
          <span className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        {/* Title */}
        <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          <Link href={`/blog/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="mt-3 text-gray-600 dark:text-gray-300">{excerpt}</p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Author & Reading Time */}
        <div className="mt-4 flex items-center justify-between border-t pt-4 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Image
                src={author.image}
                alt={author.name}
                fill
                className="rounded-full object-cover"
                sizes="32px"
              />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {author.name}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            {readingTime}
          </div>
        </div>

        {/* Read More Link */}
        <Link
          href={`/blog/${slug}`}
          className="group/link mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

export default BlogPostListCard

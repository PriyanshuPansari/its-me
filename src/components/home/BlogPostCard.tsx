// src/components/home/BlogPostCard.tsx
import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export type BlogPostCardProps = {
  title: string
  excerpt: string
  date: string
  readingTime: string
  slug: string
  tags: string[]
}

const BlogPostCard = ({
  title,
  excerpt,
  date,
  readingTime,
  slug,
  tags,
}: BlogPostCardProps) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="flex-1 p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
          <Link href={`/blog/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="mt-3 text-gray-600 dark:text-gray-300">{excerpt}</p>

        {/* Metadata */}
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="${metadataStyle} inline-flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="${metadataStyle} inline-flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readingTime}</span>
          </div>
        </div>
      </div>

      {/* Read More Link */}
      <div className="border-t p-4 dark:border-gray-700">
        <Link
          href={`/blog/${slug}`}
          className="group/link inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

export default BlogPostCard

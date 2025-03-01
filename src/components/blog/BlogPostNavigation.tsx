// src/components/blog/BlogPostNavigation.tsx
import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/types/blog'

interface BlogPostNavigationProps {
  previousPost: BlogPost | null
  nextPost: BlogPost | null
}

const BlogPostNavigation = ({
  previousPost,
  nextPost,
}: BlogPostNavigationProps) => {
  return (
    <div className="mx-auto mt-12 max-w-3xl border-t border-gray-200 pt-8 dark:border-gray-800">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Previous Post */}
        {previousPost ? (
          <Link
            href={`/blog/${previousPost.slug}`}
            className="group flex flex-col space-y-2 rounded-lg border p-4 transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800/50"
          >
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Previous Post</span>
            </div>
            <h4 className="text-base font-medium text-gray-900 dark:text-white">
              {previousPost.title}
            </h4>
          </Link>
        ) : (
          <div />
        )}

        {/* Next Post */}
        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group flex flex-col items-end space-y-2 rounded-lg border p-4 text-right transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800/50"
          >
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span>Next Post</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
            <h4 className="text-base font-medium text-gray-900 dark:text-white">
              {nextPost.title}
            </h4>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

export default BlogPostNavigation

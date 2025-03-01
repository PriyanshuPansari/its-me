// src/app/blog/[slug]/page.tsx
import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, Eye } from 'lucide-react'
import { blogPosts } from '@/lib/blog'
import BlogPostContent from '@/components/blog/BlogPostContent'
import { calculateReadingTime } from '@/lib/utils'
import type { Metadata } from 'next'
import type { BlogPost } from '@/types/blog'
import Image from 'next/image'

// Get related posts based on category and tags
const getRelatedPosts = (currentPost: BlogPost, count: number = 3) => {
  return blogPosts
    .filter(
      (post) =>
        post.slug !== currentPost.slug &&
        (post.category === currentPost.category ||
          post.tags.some((tag) => currentPost.tags.includes(tag)))
    )
    .slice(0, count)
}

// Get previous and next posts for navigation
const getAdjacentPosts = (currentPost: BlogPost) => {
  // Sort posts by date, newest first
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const currentIndex = sortedPosts.findIndex(
    (post) => post.slug === currentPost.slug
  )

  return {
    previousPost:
      currentIndex < sortedPosts.length - 1
        ? sortedPosts[currentIndex + 1]
        : null,
    nextPost: currentIndex > 0 ? sortedPosts[currentIndex - 1] : null,
  }
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const post = blogPosts.find((post) => post.slug === resolvedParams.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: `${post.title} | Your Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.coverImage || '/api/placeholder/1200/630',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage || '/api/placeholder/1200/630'],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const post = blogPosts.find((post) => post.slug === resolvedParams.slug)

  if (!post) {
    notFound()
  }

  // Calculate reading time based on content length
  const readingTime = calculateReadingTime(post.content)
  const postWithReadingTime = {
    ...post,
    readingTime: readingTime,
  }

  const relatedPosts = getRelatedPosts(post)
  const { previousPost, nextPost } = getAdjacentPosts(post)

  // Mock view count - in a real app, this would be stored in a database
  const viewCount = Math.floor(Math.random() * 1000) + 100

  return (
    <article className="min-h-screen overflow-hidden bg-white dark:bg-gray-900">
      {/* Hero section */}
      <div className="relative">
        {/* Cover image */}
        <div className="aspect-[2/1] w-full overflow-hidden">
          <div className="relative h-full w-full">
            <Image
              src={post.coverImage || '/api/placeholder/1200/600'}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority // Add this for important images above the fold
            />
          </div>
        </div>

        {/* Overlay content */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent">
          <div className="absolute bottom-0 w-full p-8">
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-wrap items-center gap-4 text-sm text-white">
                <Link
                  href={`/blog?category=${post.category}`}
                  className="rounded-full bg-blue-600/90 px-3 py-1 font-medium hover:bg-blue-600"
                >
                  {post.category}
                </Link>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {readingTime}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {viewCount} views
                </span>
              </div>
              <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 text-lg text-gray-200">{post.excerpt}</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="relative h-12 w-12">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="rounded-full border-2 border-white object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="font-medium text-white">
                    {post.author.name}
                  </div>
                  <div className="text-sm text-gray-300">
                    Author & Developer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <BlogPostContent
        post={postWithReadingTime}
        relatedPosts={relatedPosts}
        previousPost={previousPost}
        nextPost={nextPost}
      />
    </article>
  )
}

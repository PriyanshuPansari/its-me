'use client'

// src/components/blog/BlogPostContent.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Share2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
//import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
//import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import ReadingProgress from '@/components/blog/ReadingProgress'
import TableOfContents from '@/components/blog/TableOfContents'
import BlogPostNavigation from '@/components/blog/BlogPostNavigation'
import BlogComments from '@/components/blog/BlogComments'
import NewsletterSubscription from '@/components/blog/NewsletterSubscription'
import ShareButtons from '@/components/blog/ShareButtons'
import CodeBlock from '@/components/blog/CodeBlock'
import type { BlogPost } from '@/types/blog'

interface BlogPostContentProps {
  post: BlogPost
  relatedPosts: BlogPost[]
  previousPost: BlogPost | null
  nextPost: BlogPost | null
}

// Define these constants at the top of your component file
const tableStyles = {
  table:
    'min-w-full divide-y divide-gray-300 dark:divide-gray-700 text-gray-800 dark:text-gray-200',
  th: 'px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800',
  td: 'px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700',
  tr: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-800 dark:text-gray-200',
}

//const metadataStyle = "text-sm text-gray-600 dark:text-gray-400";
const BlogPostContent = ({
  post,
  relatedPosts,
  previousPost,
  nextPost,
}: BlogPostContentProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  // Custom components for ReactMarkdown
  const MarkdownComponents = {
    // Add ids to headings for the table of contents
    p: ({ node, ...props }) => (
      node,
      (
        <p
          className="my-4 leading-relaxed text-gray-800 dark:text-gray-200"
          {...props}
        />
      )
    ),
    a: ({ ...props }) => (
      <a
        className="text-blue-600 underline underline-offset-2 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        target={props.href?.startsWith('http') ? '_blank' : undefined}
        rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      />
    ),
    ul: ({ ...props }) => (
      <ul
        className="my-4 ml-6 list-disc space-y-2 text-gray-800 dark:text-gray-200"
        {...props}
      />
    ),
    ol: ({ ...props }) => (
      <ol
        className="my-4 ml-6 list-decimal space-y-2 text-gray-800 dark:text-gray-200"
        {...props}
      />
    ),
    li: ({ ...props }) => (
      <li className="pl-2 text-gray-800 dark:text-gray-200" {...props} />
    ),
    blockquote: ({ ...props }) => (
      <blockquote
        className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-700 dark:border-gray-700 dark:text-gray-300"
        {...props}
      />
    ),
    h1: ({ ...props }) => {
      // Create a safer way to generate IDs from children
      let id = ''
      if (props.children) {
        const text = React.Children.toArray(props.children)
          .map((child) => (typeof child === 'string' ? child : ''))
          .join('')
        id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      }

      return (
        <h1
          id={id}
          className="mb-6 mt-10 text-3xl font-bold tracking-tight"
          {...props}
        />
      )
    },
    h2: ({ ...props }) => {
      const id = props.children?.[0]
        ?.toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
      return (
        <h2
          id={id}
          className="mb-4 mt-8 text-2xl font-bold tracking-tight"
          {...props}
        />
      )
    },
    h3: ({ ...props }) => {
      const id = props.children?.[0]
        ?.toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
      return <h3 id={id} className="mb-3 mt-6 text-xl font-bold" {...props} />
    },
    h4: ({ ...props }) => (
      <h4 className="mb-3 mt-6 text-lg font-semibold" {...props} />
    ),
    p: ({ ...props }) => (
      <p
        className="my-4 leading-relaxed text-gray-800 dark:text-gray-200"
        {...props}
      />
    ),
    a: ({ ...props }) => (
      <a
        className="text-blue-600 underline underline-offset-2 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        target={props.href?.startsWith('http') ? '_blank' : undefined}
        rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      />
    ),
    ul: ({ ...props }) => (
      <ul className="my-4 ml-6 list-disc space-y-2" {...props} />
    ),
    ol: ({ ...props }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2" {...props} />
    ),
    li: ({ ...props }) => <li className="pl-2" {...props} />,
    blockquote: ({ ...props }) => (
      <blockquote
        className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-700 dark:border-gray-700 dark:text-gray-300"
        {...props}
      />
    ),
    table: ({ ...props }) => (
      <div className="my-6 overflow-x-auto">
        <table className={tableStyles.table} {...props} />
      </div>
    ),
    thead: ({ ...props }) => (
      <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
    ),
    th: ({ ...props }) => <th className={tableStyles.th} {...props} />,
    td: ({ ...props }) => <td className={tableStyles.td} {...props} />,
    tr: ({ ...props }) => <tr className={tableStyles.tr} {...props} />,
    img: ({ src, alt, ...props }) => {
      // For external images
      if (src?.startsWith('http')) {
        return (
          <div className="my-6 overflow-hidden rounded-lg">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={src}
                alt={alt || ''}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                {...props}
              />
            </div>
            {alt && (
              <p className="mt-2 text-center text-sm italic text-gray-600 dark:text-gray-400">
                {alt}
              </p>
            )}
          </div>
        )
      }

      // For local images (assuming they're in the public folder)
      return (
        <div className="my-6 overflow-hidden rounded-lg">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={src || ''}
              alt={alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              {...props}
            />
          </div>
          {alt && (
            <p className="mt-2 text-center text-sm italic text-gray-600 dark:text-gray-400">
              {alt}
            </p>
          )}
        </div>
      )
    },
    // Handle code blocks with syntax highlighting
    code: ({ inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''

      return !inline && language ? (
        <CodeBlock
          language={language}
          value={String(children).replace(/\n$/, '')}
        />
      ) : (
        <code
          className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200"
          {...props}
        >
          {children}
        </code>
      )
    },
  }

  return (
    <>
      <ReadingProgress />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_250px]">
          {/* Article content */}
          <div className="prose prose-lg dark:prose-invert mx-auto max-w-3xl">
            <div className="mb-8 flex gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>

            {/* Render markdown content */}
            <article className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={MarkdownComponents}
              >
                {post.content}
              </ReactMarkdown>
            </article>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <TableOfContents />
          </div>
        </div>

        {/* Tags */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={`tag-${tag}`}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Social share buttons */}
            <div className="mt-4 sm:mt-0">
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </div>
        </div>

        {/* Post navigation - previous/next */}
        <BlogPostNavigation previousPost={previousPost} nextPost={nextPost} />

        {/* Comments section */}
        <BlogComments postSlug={post.slug} />

        {/* Newsletter subscription */}
        <NewsletterSubscription />

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mx-auto mt-16 max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
              Related Posts
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={`related-${relatedPost.slug}`}
                  href={`/blog/${encodeURIComponent(relatedPost.slug)}`}
                  className="group block overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <div className="relative h-full w-full">
                      <Image
                        src={
                          relatedPost.coverImage || '/api/placeholder/600/400'
                        }
                        alt={relatedPost.title}
                        fill
                        className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {relatedPost.category}
                    </div>
                    <h3 className="mt-2 font-semibold text-gray-900 dark:text-white">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default BlogPostContent

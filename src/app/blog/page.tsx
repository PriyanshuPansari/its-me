// src/app/blog/page.tsx (continued)
'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  blogPosts,
  getAllCategories,
  getAllTags,
  filterPosts,
} from '@/lib/blog'
import Filter from '@/components/blog/BlogFilters'
import BlogSearch from '@/components/blog/BlogSearch'
import BlogPostListCard from '@/components/blog/BlogPostListCard'

export default function BlogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || ''
  )
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const categories = getAllCategories()
  const tags = getAllTags()

  // Filter posts based on search, category, and tag
  const filteredPosts = filterPosts(blogPosts, {
    search,
    category: selectedCategory,
    tag: selectedTag,
  })

  // Handler for category clicks
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setSelectedTag('') // Clear tag when category is selected
    setSearch('') // Clear search when category is selected
    setCurrentPage(1) // Reset to first page
  }
  // Handler for tag clicks
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
    setSelectedCategory('') // Clear category when tag is selected
    setSearch('') // Clear search when tag is selected
    setCurrentPage(1) // Reset to first page
  }
  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedCategory, selectedTag])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedTag) params.set('tag', selectedTag)

    const newUrl = params.toString() ? `?${params.toString()}` : ''
    router.push(`/blog${newUrl}`, { scroll: false })
  }, [search, selectedCategory, selectedTag, router])

  // Clear all filters
  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setSelectedTag('')
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900/50 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Thoughts, tutorials, and insights about web development, software
            engineering, and technology.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <BlogSearch value={search} onChange={(value) => setSearch(value)} />
          <Filter
            label="Select Category"
            options={categories}
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
          />
          <Filter
            label="Select Tag"
            options={tags}
            value={selectedTag}
            onChange={(value) => setSelectedTag(value)}
          />
        </div>

        {/* Active filters and results count */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {(search || selectedCategory || selectedTag) && (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Active filters:
                </span>
                {search && (
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    Search: {search}
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedTag && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    Tag: {selectedTag}
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Clear all
                </button>
              </>
            )}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {filteredPosts.length} posts found
          </span>
        </div>

        {/* Blog posts grid */}
        <div className="mt-8 grid gap-8">
          {paginatedPosts.map((post) => (
            <BlogPostListCard
              key={post.slug}
              {...post}
              onCategoryClick={handleCategoryClick}
              onTagClick={handleTagClick}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  currentPage === page
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'border bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        )}

        {/* No results */}
        {filteredPosts.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No posts found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

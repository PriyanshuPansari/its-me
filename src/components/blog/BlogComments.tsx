'use client'

// src/components/blog/BlogComments.tsx
import React, { useState } from 'react'
import { MessageSquare, Send, User } from 'lucide-react'
import Image from 'next/image'
// Simple mock data for comments
// In a real app, this would come from an API or database
const MOCK_COMMENTS = [
  {
    id: '1',
    author: 'Jane Smith',
    date: '2024-02-25T10:30:00Z',
    content:
      "Great article! I learned a lot about React Server Components that I didn't know before.",
    avatarUrl: '/api/placeholder/40/40',
  },
  {
    id: '2',
    author: 'John Doe',
    date: '2024-02-24T15:45:00Z',
    content:
      "I've been using Server Components in my latest project and they've made a huge difference in performance. This article explains them really well.",
    avatarUrl: '/api/placeholder/40/40',
  },
]

interface BlogCommentsProps {
  postSlug: string // Will be used for API integration in the future
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BlogComments = ({ postSlug: _ }: BlogCommentsProps) => {
  const [comments, setComments] = useState(MOCK_COMMENTS)
  const [newComment, setNewComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim() || !authorName.trim()) return

    setIsSubmitting(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      const comment = {
        id: Date.now().toString(),
        author: authorName,
        date: new Date().toISOString(),
        content: newComment,
        avatarUrl: '/api/placeholder/40/40',
      }

      setComments([comment, ...comments])
      setNewComment('')
      setIsSubmitting(false)
    }, 500)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="mx-auto mt-16 max-w-3xl border-t border-gray-200 pt-8 dark:border-gray-800">
      <h2 className="mb-8 flex items-center text-2xl font-bold text-gray-900 dark:text-white">
        <MessageSquare className="mr-2 h-5 w-5" />
        Comments ({comments.length})
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-10">
        <div className="mb-4">
          <label
            htmlFor="author"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Name
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="author"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
              placeholder="Your name"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="comment"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Your comment
          </label>
          <textarea
            id="comment"
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
            placeholder="Share your thoughts..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          <Send className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Submitting...' : 'Post Comment'}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-lg border bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative mr-3 h-8 w-8">
                  <Image
                    src={comment.avatarUrl}
                    alt={comment.author}
                    fill
                    className="rounded-full object-cover"
                    sizes="32px"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {comment.author}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {formatDate(comment.date)}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-800 dark:text-gray-200">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogComments

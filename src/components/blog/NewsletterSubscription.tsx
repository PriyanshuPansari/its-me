'use client'

// src/components/blog/NewsletterSubscription.tsx
import React, { useState } from 'react'
import { Mail, Send } from 'lucide-react'

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setError('')

    // Simulate API call with setTimeout
    try {
      // In a real app, this would be replaced with an actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSuccess(true)
      setEmail('')
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setIsSuccess(false)
    setError('')
  }

  return (
    <section className="mx-auto my-16 max-w-3xl rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 dark:from-blue-900/20 dark:to-indigo-900/20">
      <div className="flex items-center space-x-3">
        <Mail className="h-7 w-7 text-blue-600 dark:text-blue-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Subscribe to the newsletter
        </h3>
      </div>

      <p className="mt-3 text-gray-700 dark:text-gray-300">
        Get notified when I publish new articles and tutorials. No spam,
        unsubscribe at any time.
      </p>

      {isSuccess ? (
        <div className="mt-6 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <p className="text-green-800 dark:text-green-200">
            Thanks for subscribing! Please check your email to confirm your
            subscription.
          </p>
          <button
            onClick={handleReset}
            className="mt-2 text-sm font-medium text-green-700 hover:text-green-800 dark:text-green-300 dark:hover:text-green-200"
          >
            Subscribe another email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="relative flex-grow">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              {isSubmitting ? (
                'Subscribing...'
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Subscribe
                </>
              )}
            </button>
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <p className="mt-3 text-xs text-gray-600 dark:text-gray-400">
            By subscribing, you agree to our privacy policy. We{"'"}ll never
            share your email with anyone else.
          </p>
        </form>
      )}
    </section>
  )
}

export default NewsletterSubscription

'use client'

// src/components/blog/ShareButtons.tsx
import React, { useState, useEffect } from 'react'
import {
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  Check,
} from 'lucide-react'

interface ShareButtonsProps {
  title: string
  slug: string
}

const ShareButtons = ({ title, slug }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false)
  // Use state to store URLs to avoid hydration issues
  const [shareUrls, setShareUrls] = useState({
    shareUrl: '',
    twitterUrl: '#',
    facebookUrl: '#',
    linkedinUrl: '#',
  })

  // Set up the sharing URLs after component mounts (client-side only)
  useEffect(() => {
    const baseUrl = window.location.origin
    const fullUrl = `${baseUrl}/blog/${slug}`
    const shareMessage = `Check out this article: ${title}`

    setShareUrls({
      shareUrl: fullUrl,
      twitterUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(fullUrl)}`,
      facebookUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      linkedinUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    })
  }, [slug, title])

  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrls.shareUrl)
      setCopied(true)

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Share this article
      </h3>
      <div className="flex space-x-2">
        <a
          href={shareUrls.twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-blue-400 hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-blue-600"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-5 w-5" />
        </a>
        <a
          href={shareUrls.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-blue-800 hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-blue-900"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-5 w-5" />
        </a>
        <a
          href={shareUrls.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-blue-600 hover:text-white dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-blue-700"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <button
          onClick={copyToClipboard}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <LinkIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  )
}

export default ShareButtons

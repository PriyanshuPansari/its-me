// src/components/blog/TableOfContents.tsx
'use client'

import React, { useEffect, useState } from 'react'

type Heading = {
  id: string
  text: string
  level: number
}

const TableOfContents = () => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Get all headings from the article and assign unique IDs if they don't exist
    const articleHeadings = Array.from(
      document.querySelectorAll('article h2, article h3')
    ).map((heading, index) => {
      // If heading doesn't have an id, create one from the text content
      if (!heading.id) {
        const id = `heading-${index}-${heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
        heading.id = id
      }
      return {
        id: heading.id,
        text: heading.textContent || `Heading ${index + 1}`,
        level: parseInt(heading.tagName[1]),
      }
    })

    setHeadings(articleHeadings)

    // Set up intersection observer for headings
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-100px 0px -40% 0px',
    })

    articleHeadings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto">
      <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">
        Table of Contents
      </h4>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`inline-block py-1 transition-colors ${
                activeId === heading.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents

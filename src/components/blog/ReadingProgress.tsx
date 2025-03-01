// src/components/blog/ReadingProgress.tsx
'use client'

import React, { useEffect, useState } from 'react'

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const progress = (scrollTop / scrollHeight) * 100
      setProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed left-0 top-16 z-50 h-1 w-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-full bg-blue-600 transition-all duration-150 dark:bg-blue-400"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ReadingProgress

//src/components/blog/BlogSearch.tsx
import React from 'react'
import { Search } from 'lucide-react'

type BlogSearchProps = {
  value: string
  onChange: (value: string) => void
}

const BlogSearch = ({ value, onChange }: BlogSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search posts..."
        className="w-full rounded-lg border bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
      />
    </div>
  )
}

export default BlogSearch

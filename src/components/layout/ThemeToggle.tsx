'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
    >
      <Sun
        className={`h-5 w-5 transition-all ${
          theme === 'dark' ? 'scale-0' : 'scale-100'
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all ${
          theme === 'dark' ? 'scale-100' : 'scale-0'
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

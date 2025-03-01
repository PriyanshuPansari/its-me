// src/lib/utils.ts

/**
 * Calculate reading time for content
 * @param content Content to calculate reading time for
 * @param wordsPerMinute Words per minute reading speed (default: 200)
 * @returns Formatted reading time string
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): string {
  // Clean the content to remove markdown syntax
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace links with just their text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // Remove images
    .replace(/#/g, '') // Remove headings markers
    .replace(/\*\*/g, '') // Remove bold markers
    .replace(/\*/g, '') // Remove italic markers
    .replace(/>/g, '') // Remove blockquotes

  const words = cleanContent.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)

  return minutes <= 1 ? '1 min read' : `${minutes} min read`
}

/**
 * Format a date into a more readable format
 * @param dateString ISO date string
 * @param options DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  return new Date(dateString).toLocaleDateString('en-US', options)
}

/**
 * Truncate a string to a maximum length
 * @param str String to truncate
 * @param maxLength Maximum length
 * @returns Truncated string with ellipsis if needed
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str

  return str.slice(0, maxLength - 3) + '...'
}

/**
 * Generate a slug from a string
 * @param str String to generate slug from
 * @returns URL-friendly slug
 */
export function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove consecutive hyphens
    .trim() // Trim leading/trailing spaces
}

/**
 * Extract table of contents from markdown content
 * @param content Markdown content
 * @returns Array of headings with id, text, and level
 */
export function extractTableOfContents(
  content: string
): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const toc = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    // Only include h2 and h3 headings for the TOC
    if (level >= 2 && level <= 3) {
      toc.push({ id, text, level })
    }
  }

  return toc
}

/**
 * Get estimated file size of a string (in KB)
 * @param content Content to measure
 * @returns Size in KB
 */
export function getEstimatedSize(content: string): string {
  const bytes = new TextEncoder().encode(content).length
  const kb = bytes / 1024
  return `${kb.toFixed(1)} KB`
}

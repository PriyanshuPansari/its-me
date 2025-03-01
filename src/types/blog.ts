// src/types/blog.ts
export type BlogPost = {
  title: string
  slug: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  readingTime: string
  author: {
    name: string
    image: string
  }
  coverImage?: string
  content: string // Added content field
}

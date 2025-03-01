// src/lib/blog.ts
import { BlogPost } from '@/types/blog'

export const blogPosts: BlogPost[] = [
  {
    title: 'Understanding React Server Components',
    slug: 'understanding-react-server-components',
    date: '2024-02-20',
    category: 'React',
    tags: ['React', 'Next.js', 'Performance'],
    excerpt:
      'Deep dive into React Server Components, how they work, and when to use them in your Next.js applications for optimal performance.',
    readingTime: '6 min read',
    author: {
      name: 'John Doe',
      image: '/api/placeholder/40/40',
    },
    coverImage: '/api/placeholder/800/400',
    content: `
## Introduction

React Server Components (RSC) represent a paradigm shift in how we build React applications. They allow components to run on the server, enabling better performance and improved user experience. In this article, we'll explore what RSCs are, how they work, and when to use them.

## Getting Started

React Server Components were introduced to solve several challenges in modern web development:
- Reducing the JavaScript bundle size
- Improving initial page load performance
- Better server-side data fetching
- Maintaining component-based architecture

### Prerequisites

Before diving into Server Components, you should be familiar with:
- React fundamentals
- Next.js basics
- Basic understanding of server-side rendering

## How Server Components Work

Server Components run exclusively on the server and can:
- Access server-side resources directly
- Reduce client-side JavaScript
- Perform data fetching without client-side code

Here's a simple example:

\`\`\`jsx
// A Server Component
async function BlogPosts() {
  const posts = await db.query('SELECT * FROM posts');
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Key Benefits

1. **Improved Performance**
   - Smaller JavaScript bundles
   - Faster page loads
   - Reduced client-side processing

2. **Better Developer Experience**
   - Direct database access
   - Simplified data fetching
   - Natural code organization

3. **Enhanced Security**
   - Sensitive code stays on server
   - Reduced attack surface
   - Better credentials management

## Best Practices

When working with Server Components:

1. Use them for:
   - Data fetching
   - Access to server-only resources
   - Large dependencies
   - Static content

2. Keep client components for:
   - Interactivity
   - Browser APIs
   - State management
   - Event handling

## Conclusion

React Server Components are a powerful addition to the React ecosystem. They enable better performance and developer experience while maintaining the component model we love about React.`,
  },
  {
    title: 'Building Type-safe APIs with tRPC',
    slug: 'building-typesafe-api-trpc',
    date: '2024-02-18',
    category: 'TypeScript',
    tags: ['TypeScript', 'API', 'tRPC'],
    excerpt:
      'Learn how to build fully type-safe APIs using tRPC and TypeScript, ensuring end-to-end type safety in your full-stack applications.',
    readingTime: '8 min read',
    author: {
      name: 'Jane Smith',
      image: '/api/placeholder/40/40',
    },
    coverImage: '/api/placeholder/800/400',
    content: `
## Introduction

tRPC enables you to build fully type-safe APIs with TypeScript, providing a seamless development experience across your full-stack application.

## Getting Started

First, let's understand why type-safe APIs matter...
    `,
  },
  {
    title: 'Mastering Tailwind CSS: From Basics to Advanced',
    slug: 'mastering-tailwind-css',
    date: '2024-02-10',
    category: 'CSS',
    tags: ['CSS', 'Tailwind', 'Styling'],
    excerpt:
      'A comprehensive guide to using Tailwind CSS effectively, including advanced features, custom configurations, and performance optimization.',
    readingTime: '10 min read',
    author: {
      name: 'Alex Johnson',
      image: '/api/placeholder/40/40',
    },
    coverImage: '/api/placeholder/800/400',
    content: `
## Introduction

Tailwind CSS has revolutionized how we style web applications. Let's dive deep into its powerful features...
    `,
  },
]

export const getAllCategories = (): string[] => {
  const categories = new Set(blogPosts.map((post) => post.category))
  return Array.from(categories)
}

export const getAllTags = (): string[] => {
  const tags = new Set(blogPosts.flatMap((post) => post.tags))
  return Array.from(tags)
}

export const filterPosts = (
  posts: BlogPost[],
  {
    search = '',
    category = '',
    tag = '',
  }: {
    search?: string
    category?: string
    tag?: string
  }
): BlogPost[] => {
  return posts.filter((post) => {
    const matchesSearch = search
      ? post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase())
      : true

    const matchesCategory = category ? post.category === category : true

    const matchesTag = tag ? post.tags.includes(tag) : true

    return matchesSearch && matchesCategory && matchesTag
  })
}

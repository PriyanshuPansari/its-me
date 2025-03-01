// src/config/blog.ts

// Main blog configuration
export const blogConfig = {
  // Blog title and description
  title: 'My Developer Blog',
  description:
    'Thoughts, tutorials, and insights about web development, software engineering, and technology.',

  // Author information
  author: {
    name: 'Your Name',
    bio: 'Full-stack developer passionate about React, TypeScript, and web technologies.',
    avatar: '/api/placeholder/200/200', // Replace with your avatar
    social: {
      twitter: 'https://twitter.com/yourusername',
      github: 'https://github.com/yourusername',
      linkedin: 'https://linkedin.com/in/yourusername',
    },
  },

  // Blog display settings
  postsPerPage: 6,

  // Date formatting
  dateFormat: {
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions,
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions,
  },

  // Comment settings
  comments: {
    enabled: true,
    provider: 'internal', // 'internal', 'disqus', 'giscus'
  },

  // Share settings
  social: {
    sharingEnabled: true,
    platforms: ['twitter', 'facebook', 'linkedin'],
  },

  // Newsletter settings
  newsletter: {
    enabled: true,
    provider: 'convertkit', // 'convertkit', 'mailchimp', etc.
    // For real implementation, you would add your API keys and other configuration here
  },

  // SEO defaults
  seo: {
    defaultTitle: 'My Developer Blog',
    titleTemplate: '%s | My Developer Blog',
    defaultDescription:
      'Articles and tutorials about web development, React, TypeScript, and more.',
    siteUrl: 'https://yourdomain.com',
    twitterHandle: '@yourusername',
    defaultImage: '/api/placeholder/1200/630',
    language: 'en',
  },

  // Analytics settings
  analytics: {
    enabled: process.env.NODE_ENV === 'production',
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  },
}

export default blogConfig

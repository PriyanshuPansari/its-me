// src/app/projects/metadata.ts
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Your Portfolio',
  description:
    'Browse my portfolio of web development, design, and software engineering projects.',
  openGraph: {
    title: 'Projects | Your Portfolio',
    description:
      'Browse my portfolio of web development, design, and software engineering projects.',
    type: 'website',
    images: [
      {
        url: '/api/placeholder/1200/630',
        width: 1200,
        height: 630,
        alt: 'Projects Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Your Portfolio',
    description:
      'Browse my portfolio of web development, design, and software engineering projects.',
    images: ['/api/placeholder/1200/630'],
  },
}

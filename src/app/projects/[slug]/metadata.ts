// src/app/projects/[slug]/metadata.ts
import { getProjectBySlug } from '@/lib/projects'
import type { Metadata } from 'next'

// Generate metadata for individual project pages
export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  // Handle params safely without awaiting
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    }
  }

  return {
    title: `${project.title} | Your Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'website',
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  }
}

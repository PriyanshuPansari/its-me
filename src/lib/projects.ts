// src/lib/projects.ts
import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    title: 'Personal Blog Platform',
    slug: 'personal-blog-platform',
    description:
      'A modern blog platform built with Next.js and MDX, featuring dark mode, responsive design, and a custom CMS.',
    longDescription: `
# Personal Blog Platform

A modern, fast, and SEO-friendly blog platform built with Next.js and MDX...
    `,
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MDX'],
    categories: ['Web Development', 'Frontend'],
    image: '/api/placeholder/800/600',
    githubUrl: 'https://github.com/yourusername/blog-platform',
    liveUrl: 'https://blog-platform.demo',
    featured: true,
    completionDate: '2024-01-15',
  },
  // More project objects...
]

// Helper functions
export const getFeaturedProjects = (count: number = 3) => {
  return projects.filter((project) => project.featured).slice(0, count)
}

export const getProjectBySlug = (slug: string) => {
  return projects.find((project) => project.slug === slug)
}

export const getProjectCategories = () => {
  return Array.from(new Set(projects.flatMap((project) => project.categories)))
}

export const getRelatedProjects = (
  currentProject: Project,
  count: number = 3
) => {
  // Logic to find related projects based on categories and technologies
  return projects
    .filter(
      (project) =>
        project.slug !== currentProject.slug &&
        (project.categories.some((category) =>
          currentProject.categories.includes(category)
        ) ||
          project.technologies.some((tech) =>
            currentProject.technologies.includes(tech)
          ))
    )
    .slice(0, count)
}

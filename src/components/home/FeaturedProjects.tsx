// src/components/home/FeaturedProjects.tsx
import React from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import ProjectCard from './ProjectCard'
import type { ProjectCardProps } from './ProjectCard'

const FeaturedProjects = () => {
  const projects: ProjectCardProps[] = [
    {
      title: 'Personal Blog Platform',
      description:
        'A modern blog platform built with Next.js and MDX, featuring dark mode and responsive design.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/yourusername/blog-platform',
      liveUrl: 'https://blog-platform.demo',
      imageUrl: '/api/placeholder/800/600',
    },
    {
      title: 'Task Management App',
      description:
        'A collaborative task management application with real-time updates and team features.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
      githubUrl: 'https://github.com/yourusername/task-app',
      liveUrl: 'https://task-app.demo',
      imageUrl: '/api/placeholder/800/600',
    },
    {
      title: 'E-commerce Dashboard',
      description:
        'An admin dashboard for e-commerce platforms with analytics and inventory management.',
      technologies: ['React', 'Redux', 'Material UI', 'Chart.js'],
      githubUrl: 'https://github.com/yourusername/ecommerce-dashboard',
      imageUrl: '/api/placeholder/800/600',
    },
  ]

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
            Check out some of my recent work. These projects showcase my
            expertise in full-stack development and modern web technologies.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            View All Projects
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects

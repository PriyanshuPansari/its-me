// src/components/home/FeaturedProjects.tsx
import React from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import ProjectCard from '@/components/projects/ProjectCard'
import { getFeaturedProjects } from '@/lib/projects'

const FeaturedProjects = () => {
  const featuredProjects = getFeaturedProjects(3)

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
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              categories={project.categories}
              image={project.image}
              slug={project.slug}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
            />
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

// src/components/projects/ProjectCard.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  categories: string[]
  image: string
  slug: string
  githubUrl?: string
  liveUrl?: string
}

const ProjectCard = ({
  title,
  description,
  technologies,
  categories,
  image,
  slug,
  githubUrl,
  liveUrl,
}: ProjectCardProps) => {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      {/* Project Image */}
      <Link href={`/projects/${slug}`} className="overflow-hidden">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Categories */}
        <div className="mb-2 flex flex-wrap gap-2">
          {categories.slice(0, 2).map((category) => (
            <span
              key={category}
              className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            >
              {category}
            </span>
          ))}
          {categories.length > 2 && (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              +{categories.length - 2} more
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/projects/${slug}`}>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mb-4 flex-grow text-gray-600 dark:text-gray-300">
          {description.length > 120
            ? `${description.substring(0, 120)}...`
            : description}
        </p>

        {/* Technologies */}
        <div className="mb-4 flex flex-wrap gap-2">
          {technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              +{technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="mt-auto flex gap-2">
          <Link
            href={`/projects/${slug}`}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            Details
          </Link>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="View Source Code"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="View Live Project"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard

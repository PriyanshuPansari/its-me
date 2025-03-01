// src/components/projects/ProjectListItem.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'

interface ProjectListItemProps {
  title: string
  description: string
  technologies: string[]
  categories: string[]
  image: string
  slug: string
  githubUrl?: string
  liveUrl?: string
}

const ProjectListItem = ({
  title,
  description,
  technologies,
  categories,
  image,
  slug,
  githubUrl,
  liveUrl,
}: ProjectListItemProps) => {
  return (
    <div className="group overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="grid gap-4 p-2 sm:grid-cols-[200px_1fr] sm:p-0">
        {/* Image (hidden on mobile) */}
        <Link
          href={`/projects/${slug}`}
          className="relative hidden overflow-hidden sm:block"
        >
          <div className="relative h-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="200px"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-col p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Title */}
            <Link href={`/projects/${slug}`}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
            </Link>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {description.length > 180
              ? `${description.substring(0, 180)}...`
              : description}
          </p>

          {/* Technologies */}
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-2">
            <Link
              href={`/projects/${slug}`}
              className="flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              View Details
            </Link>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                <Github className="h-4 w-4" />
                Source
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectListItem

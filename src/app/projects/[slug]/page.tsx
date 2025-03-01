// src/app/projects/[slug]/page.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, Github, ExternalLink, Calendar } from 'lucide-react'
import { getProjectBySlug, getRelatedProjects } from '@/lib/projects'
import ProjectCard from '@/components/projects/ProjectCard'
import ReactMarkdown from 'react-markdown'

export default function ProjectPage({ params }: { params: { slug: string } }) {
  // For Next.js App Router, we need to make a fully synchronous version
  // and handle the Promise-like params in a safer way
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const relatedProjects = getRelatedProjects(project, 3)

  return (
    <div className="min-h-screen bg-white py-12 dark:bg-gray-900 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Project header */}
        <div className="mt-8 grid gap-12 lg:grid-cols-[2fr_1fr]">
          {/* Main content */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {project.title}
            </h1>

            {project.completionDate && (
              <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="mr-1 h-4 w-4" />
                Completed:{' '}
                {new Date(project.completionDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            )}

            <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                className="rounded-xl object-cover object-center"
                priority
              />
            </div>

            <div className="prose prose-lg dark:prose-invert mt-8 max-w-none">
              {project.longDescription ? (
                <ReactMarkdown>{project.longDescription}</ReactMarkdown>
              ) : (
                <p className="text-gray-800 dark:text-gray-200">
                  {project.description}
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-8 lg:mt-0">
            <div className="rounded-xl border bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Project Details
              </h2>

              {/* Technologies */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Technologies
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Categories
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <Link
                      key={category}
                      href={`/projects?category=${encodeURIComponent(category)}`}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="mt-6 space-y-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live Project
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  >
                    <Github className="h-4 w-4" />
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Related Projects
            </h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((relatedProject) => (
                <ProjectCard
                  key={relatedProject.slug}
                  title={relatedProject.title}
                  description={relatedProject.description}
                  technologies={relatedProject.technologies}
                  categories={relatedProject.categories}
                  image={relatedProject.image}
                  slug={relatedProject.slug}
                  githubUrl={relatedProject.githubUrl}
                  liveUrl={relatedProject.liveUrl}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

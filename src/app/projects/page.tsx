'use client'

// src/app/projects/page.tsx
import React, { useState } from 'react'
import { Grid, List, Search } from 'lucide-react'
import { projects } from '@/lib/projects'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectListItem from '@/components/projects/ProjectListItem'
import ProjectCategoryFilter from '@/components/projects/ProjectCategoryFilter'

export default function ProjectsPage() {
  // State for search, categories, and view
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isGridView, setIsGridView] = useState(true)

  // Get all unique categories from projects
  const categories = Array.from(
    new Set(projects.flatMap((project) => project.categories))
  )

  // Filter projects based on search and category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = search
      ? project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase())
      : true

    const matchesCategory = selectedCategory
      ? project.categories.includes(selectedCategory)
      : true

    return matchesSearch && matchesCategory
  })

  // Clear filters
  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('')
  }

  return (
    <div className="min-h-screen bg-white py-12 dark:bg-gray-900 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Projects
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            A collection of my work across web development, programming, and
            design. Browse through my projects to see my skills and experience.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          {/* Search and Category filter */}
          <div className="flex flex-1 flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            {/* Search */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* Category filter */}
            <div className="w-full sm:w-auto">
              <ProjectCategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>
          </div>

          {/* View toggle */}
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => setIsGridView(true)}
              className={`rounded-lg p-2 ${
                isGridView
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
              aria-label="Grid view"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`rounded-lg p-2 ${
                !isGridView
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
              aria-label="List view"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Active filters */}
        {(search || selectedCategory) && (
          <div className="mt-6 flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Active filters:
            </span>
            <div className="ml-2 flex flex-wrap gap-2">
              {search && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  Search: {search}
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  Category: {selectedCategory}
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}

        {/* Projects Grid/List */}
        {filteredProjects.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No projects found matching your criteria.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Clear all filters
            </button>
          </div>
        ) : isGridView ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
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
        ) : (
          <div className="mt-8 space-y-6">
            {filteredProjects.map((project) => (
              <ProjectListItem
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
        )}
      </div>
    </div>
  )
}

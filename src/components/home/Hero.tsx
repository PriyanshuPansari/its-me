// src/components/home/Hero.tsx
import React from 'react'
import { ArrowRight, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800" />
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-16 text-center lg:py-24">
          {/* Main heading with animation */}
          <h1 className="animate-fade-in text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Hi, I&apos;m</span>{' '}
            <span className="mt-2 block bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
              Your Name
            </span>
          </h1>

          {/* Animated subtitle */}
          <p className="animate-fade-in-up mt-6 max-w-2xl text-lg text-gray-600 [animation-delay:200ms] dark:text-gray-300">
            I&apos;m a full-stack developer passionate about building modern web
            applications. I specialize in React, TypeScript, and Next.js.
          </p>

          {/* Social links */}
          <div className="animate-fade-in-up mt-8 flex gap-4 [animation-delay:400ms]">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* CTA buttons */}
          <div className="animate-fade-in-up mt-8 flex gap-4 [animation-delay:600ms]">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            >
              Read Blog
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

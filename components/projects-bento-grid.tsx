'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/lib/projects'

interface ProjectsBentoGridProps {
  projects: Project[]
  variant?: 'featured' | 'all'
}

export function ProjectsBentoGrid({ projects, variant = 'featured' }: ProjectsBentoGridProps) {
  if (variant === 'featured' && projects.length > 0) {
    const [first, ...rest] = projects
    
    return (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Left side - featured card */}
        <Link href={`/projects/${first.id}`}>
          <ProjectCard project={first} />
        </Link>

        {/* Right side - stacked cards */}
        <div className="flex flex-col gap-6">
          {rest.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <ProjectCard project={project} />
            </Link>
          ))}
        </div>
      </div>
    )
  }

  // For 'all' variant, display all projects in a 2-column bento grid layout
  if (projects.length > 0) {
    const [first, ...rest] = projects
    
    return (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Left side - featured card */}
        <Link href={`/projects/${first.id}`}>
          <ProjectCard project={first} />
        </Link>

        {/* Right side - stacked cards */}
        <div className="flex flex-col gap-6">
          {rest.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <ProjectCard project={project} />
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return null
}

interface ProjectCardProps {
  project: Project
  isFeatured?: boolean
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group cursor-pointer h-full flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      {/* Project Image */}
      <div className="relative overflow-hidden bg-muted h-56">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Project Info */}
      <div className="space-y-3 flex flex-col flex-grow p-4">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 2).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{project.technologies.length - 2}
            </Badge>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 pt-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
          Read Case Study
          <ArrowRight className="h-4 w-4 flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}

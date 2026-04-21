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
  // For featured variant, create a bento layout with the first project taking up more space
  const getBentoLayout = () => {
    if (variant === 'featured' && projects.length > 0) {
      const [first, ...rest] = projects
      return [
        { project: first, className: 'sm:col-span-2 sm:row-span-2' },
        ...rest.map(project => ({ project, className: '' }))
      ]
    }
    return projects.map(project => ({ project, className: '' }))
  }

  const layout = getBentoLayout()

  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max">
      {layout.map(({ project, className }) => (
        <Link key={project.id} href={`/projects/${project.id}`}>
          <div className={`group cursor-pointer h-full flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 ${className}`}>
            {/* Project Image */}
            <div className={`relative overflow-hidden bg-muted flex-grow ${className === 'sm:col-span-2 sm:row-span-2' ? 'h-64 sm:h-96' : 'h-48'}`}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Project Info */}
            <div className="space-y-3 p-4 sm:p-5">
              <div>
                <h3 className="text-base sm:text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 pt-1 text-xs sm:text-sm font-medium text-primary group-hover:gap-3 transition-all">
                Read Case Study
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

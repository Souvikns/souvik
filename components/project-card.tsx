import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/50 hover:shadow-md">
        {/* Project Image */}
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Project Info */}
        <div className="space-y-4 p-4">
          <div>
            <h3 className="text-lg font-semibold leading-tight">{project.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 pt-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
            Read Case Study
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}

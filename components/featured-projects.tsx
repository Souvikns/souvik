import Link from 'next/link'
import { ProjectCard } from '@/components/project-card'
import { Button } from '@/components/ui/button'
import { featuredProjects } from '@/lib/projects'

export function FeaturedProjects() {
  return (
    <section className="space-y-8 py-12">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
        <p className="text-muted-foreground">A selection of projects I've worked on recently.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button asChild size="lg" variant="outline">
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>
    </section>
  )
}

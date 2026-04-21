import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProjectsBentoGrid } from '@/components/projects-bento-grid'
import { featuredProjects } from '@/lib/projects'

export function FeaturedProjects() {
  return (
    <section className="space-y-8 py-12">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
        <p className="text-muted-foreground">
          A selection of projects I've worked on recently.
        </p>
      </div>

      <ProjectsBentoGrid projects={featuredProjects} variant="featured" />

      <div className="flex justify-center">
        <Button asChild size="lg" variant="outline">
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>
    </section>
  )
}

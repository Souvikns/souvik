import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ProjectCard } from '@/components/project-card'
import { projects } from '@/lib/projects'

export const metadata = {
  title: 'Projects',
  description: 'A showcase of my projects and work samples.',
}

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main className="flex flex-col">
        {/* Header Section */}
        <section className="bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-950/20 dark:to-transparent">
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="mb-12 space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
              <p className="text-lg text-muted-foreground">
                Here are some of the projects I've worked on. Each one represents a unique challenge
                and learning opportunity.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="bg-gradient-to-b from-purple-50/30 to-transparent dark:from-purple-950/10 dark:to-transparent">
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

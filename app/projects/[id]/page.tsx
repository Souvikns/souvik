import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { projects } from '@/lib/projects'

interface ProjectPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projects.find(p => p.id === id)

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
    }
  }

  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projects.find(p => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <main className="flex flex-col">
        {/* Back Button */}
        <div className="border-b border-border">
          <div className="container mx-auto max-w-4xl px-4 py-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section>
          <div className="relative h-96 w-full overflow-hidden bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </section>

        {/* Project Header */}
        <section className="bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-950/20 dark:to-transparent">
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
              <p className="text-lg text-muted-foreground">{project.description}</p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-6 pt-4">
                {project.role && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Role</p>
                    <p className="text-base font-semibold">{project.role}</p>
                  </div>
                )}
                {project.duration && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Duration</p>
                    <p className="text-base font-semibold">{project.duration}</p>
                  </div>
                )}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-4">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Content */}
        {project.caseStudy && (
          <section>
            <div className="container mx-auto max-w-4xl px-4 py-12">
              <div className="space-y-12">
                {/* Challenge */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">The Challenge</h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {project.caseStudy.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">The Solution</h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {project.caseStudy.solution}
                  </p>
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Key Features</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.caseStudy.keyFeatures.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                      >
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary mt-1" />
                        <p className="text-sm font-medium">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Results & Impact</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.caseStudy.results.map((result, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4">
                        <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                          ✓
                        </span>
                        <p className="text-sm font-medium">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Links Section */}
        {(project.liveUrl || project.githubUrl) && (
          <section className="border-t border-border bg-gradient-to-b from-purple-50/30 to-transparent dark:from-purple-950/10 dark:to-transparent">
            <div className="container mx-auto max-w-4xl px-4 py-12">
              <h2 className="text-2xl font-bold mb-6">View Project</h2>
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent transition-colors font-medium"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}

import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { renderMarkdownToHtml } from '@/lib/markdown'
import { getCaseStudyMarkdown, projects } from '@/lib/projects'

interface ProjectPageProps {
  params: Promise<{
    id: string
  }>
}

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
    }
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  const caseStudyMarkdown = await getCaseStudyMarkdown(project.caseStudyFile)
  const caseStudyHtml = caseStudyMarkdown ? renderMarkdownToHtml(caseStudyMarkdown) : null

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
        {caseStudyHtml && (
          <section>
            <div className="container mx-auto max-w-4xl px-4 py-12">
              <article
                className="space-y-4 text-base leading-relaxed text-muted-foreground [&_h1]:mt-8 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-foreground [&_h2]:mt-8 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:leading-relaxed [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-4 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg [&_img]:border [&_img]:border-border [&_hr]:my-8 [&_hr]:border-border"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: case study markdown is sanitized through rehype-sanitize before rendering.
                dangerouslySetInnerHTML={{ __html: caseStudyHtml }}
              />
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

'use client'

import { CheckCircle2, Code, Database, Zap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AboutSection() {
  const highlights = [
    { stat: '4+', label: 'Years Backend Engineering Experience' },
    { stat: '20+', label: 'Projects Delivered' },
    { stat: 'Open Source', label: 'Contributor & Maintainer' },
  ]

  const techStack = [
    {
      title: 'Backend Systems',
      icon: Database,
      technologies: 'Node.js · Python · Go · PostgreSQL · Redis',
      bgGradient: 'from-blue-50/60 to-blue-50/30 dark:from-blue-950/30 dark:to-blue-950/10',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'AI Integrations',
      icon: Zap,
      technologies: 'LLM APIs · Vector Databases · Prompt Engineering',
      bgGradient: 'from-amber-50/60 to-amber-50/30 dark:from-amber-950/30 dark:to-amber-950/10',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      title: 'API Design',
      icon: Code,
      technologies: 'REST · GraphQL · gRPC · Event-Driven Architecture',
      bgGradient: 'from-cyan-50/60 to-cyan-50/30 dark:from-cyan-950/30 dark:to-cyan-950/10',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
    },
  ]

  return (
    <section id="about" className="space-y-12 py-20">
      {/* Professional Title */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Backend Engineer · AI Integrations · Open Source Contributor
          </h2>
          <p className="text-base text-foreground leading-relaxed max-w-3xl">
            Backend Engineer II with over 4 years of experience at XaneAI, contributing to scalable
            backend systems and serving as an open-source maintainer for AsyncAPI.
          </p>
        </div>

        {/* Availability and CTA */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-green-50/10 dark:bg-green-950/20 px-4 py-2 w-fit">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="font-medium text-foreground">Available for Work</span>
          </div>
          <Button asChild className="w-fit">
            <Link href="#contact">Let's Connect</Link>
          </Button>
        </div>
      </div>

      {/* Profile Highlights */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Profile Highlights</h3>
        <div className="space-y-3 rounded-lg border border-border/40 bg-slate-50/30 dark:bg-slate-950/20 p-6">
          {highlights.map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <div className="text-3xl font-bold text-foreground">{item.stat}</div>
              <div className="text-sm text-foreground/80">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Tech Stack */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Current Tech Stack</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {techStack.map((tech) => {
            const Icon = tech.icon
            return (
              <div
                key={tech.title}
                className={`rounded-lg border border-border/40 bg-gradient-to-br ${tech.bgGradient} p-5 space-y-3 transition-all hover:border-border/60`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${tech.iconColor}`} />
                  <h4 className="font-semibold text-foreground">{tech.title}</h4>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">{tech.technologies}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

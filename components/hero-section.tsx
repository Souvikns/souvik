'use client'

import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

const roles = ['Backend Developer', 'Developer Tooling Engineer', 'Open Source Contributor']

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Souvikns', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/souvik-de-a2b941169/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/buggs_lightyear', label: 'Twitter' },
    { icon: Mail, href: 'mailto:souvikde.tech@gmail.com', label: 'Email' },
  ]

  return (
    <section className="relative space-y-12 py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Greeting */}
          <div className="space-y-4">
            <p className="text-2xl font-medium text-muted-foreground">Hi, I'm Souvik</p>

            {/* Animated Role */}
            <div className="h-24 space-y-2">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {roles[currentRole]}
              </h1>
              <p className="h-6 min-w-0 text-sm text-muted-foreground">
                Building APIs, GitHub automation, and developer tools for practical engineering
                workflows.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="#contact">Get in touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">View my work</Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 pt-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-all hover:border-primary hover:bg-primary/10"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Right Column - Profile Image */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative h-64 w-64 sm:h-80 sm:w-80">
            <div className="absolute inset-0 rounded-full border-2 border-border bg-gradient-to-br from-muted to-muted/50" />
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              fill
              className="rounded-full object-cover"
              priority
              sizes="(max-width: 768px) 256px, 320px"
            />
          </div>
        </div>
      </div>

      {/* Diagonal Line */}
      <div className="absolute inset-0 -z-10">
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1000 1000"
        >
          <line
            x1="0"
            y1="300"
            x2="1000"
            y2="800"
            stroke="currentColor"
            strokeWidth="2"
            className="stroke-border/30"
          />
        </svg>
      </div>
    </section>
  )
}

import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function ContactSection() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/souvikns', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/souvik-de-a2b941169/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/buggs_lightyear', label: 'Twitter' },
    { icon: Mail, href: 'mailto:souvikde.tech@gmail.com', label: 'Email' },
  ]

  return (
    <section id="contact" className="space-y-12 border-t border-border py-12">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Let's connect</h2>
        <p className="mx-auto max-w-md text-muted-foreground">
          I'd love to hear from you. Feel free to reach out through any of these channels.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* Email Button */}
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="mailto:souvikde.tech@gmail.com">Send me an email</Link>
        </Button>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon
            return (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 transition-all hover:border-primary hover:bg-primary/10"
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{social.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

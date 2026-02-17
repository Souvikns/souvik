import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* About */}
          <div className="space-y-2">
            <h3 className="font-semibold">Portfolio</h3>
            <p className="text-xs text-muted-foreground">
              My Personal portfolio website showcasing my work.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link href="/projects" className="text-xs text-muted-foreground hover:text-foreground">
                Projects
              </Link>
              <Link href="/blog" className="text-xs text-muted-foreground hover:text-foreground">
                Blog
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h3 className="font-semibold">Connect</h3>
            <nav className="flex flex-col gap-2">
              <a
                href="https://github.com/Souvikns"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/souvik-de-a2b941169/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href="mailto:souvikde.tech@gmail.com"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Email
              </a>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/40 pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Souvik. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

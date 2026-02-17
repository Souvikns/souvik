import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { FeaturedProjects } from '@/components/featured-projects'
import { ContactSection } from '@/components/contact-section'

export default function Page() {
  return (
    <>
      <Navigation />
      <main className="flex flex-col">
        {/* Hero Section - Subtle blue background */}
        <section className="bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent">
          <div className="container mx-auto max-w-4xl px-4 py-8">
            <HeroSection />
          </div>
        </section>

        {/* About Section - Subtle amber background */}
        <section className="bg-gradient-to-b from-amber-50/40 to-transparent dark:from-amber-950/15 dark:to-transparent">
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <AboutSection />
          </div>
        </section>

        {/* Projects Section - Subtle purple background */}
        <section className="bg-gradient-to-b from-purple-50/40 to-transparent dark:from-purple-950/15 dark:to-transparent">
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <FeaturedProjects />
          </div>
        </section>

        {/* Contact Section - Subtle rose background */}
        <section className="bg-gradient-to-b from-rose-50/40 to-transparent dark:from-rose-950/15 dark:to-transparent">
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <ContactSection />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

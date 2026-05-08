import { BlogCard } from '@/components/blog-card'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { blogPosts } from '@/lib/blog'

export const metadata = {
  title: 'Blog',
  description:
    'Articles by Souvik De about GitHub, AsyncAPI, developer tooling, and software engineering.',
}

export default function BlogPage() {
  // Sort by date, newest first
  const sortedPosts = [...blogPosts].sort((a, b) => b.date.getTime() - a.date.getTime())

  return (
    <>
      <Navigation />
      <main className="flex flex-col">
        {/* Header Section */}
        <section className="bg-gradient-to-b from-cyan-50/50 to-transparent dark:from-cyan-950/20 dark:to-transparent">
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="mb-12 space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
              <p className="text-lg text-muted-foreground">
                Thoughts on web development, software engineering, and everything in between.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="bg-gradient-to-b from-cyan-50/30 to-transparent dark:from-cyan-950/10 dark:to-transparent">
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="space-y-6">
              {sortedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

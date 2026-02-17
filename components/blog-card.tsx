import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import type { BlogPost } from '@/lib/blog'
import { formatDate } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md">
      <div className="space-y-3">
        {/* Date and Reading Time */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <time dateTime={post.date.toISOString()}>
            {formatDate(post.date)}
          </time>
          <span>{post.readingTime} min read</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-tight transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Read More Link */}
        <Link
          href={`${post.slug}`}
          target='_blank'
          className="inline-block text-sm font-medium text-primary hover:underline"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}

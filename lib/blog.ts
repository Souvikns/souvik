export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: Date
  readingTime: number
  tags: string[]
  slug: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to use Repository templates in github',
    excerpt: 'A comprehensive guide on how to use Repository templates in GitHub.',
    content:
      'A practical guide to creating, configuring, and using GitHub repository templates for repeatable project setup.',
    date: new Date('2019-12-06'),
    readingTime: 4,
    tags: ['GitHub'],
    slug: 'https://dev.to/souvik_ns/how-to-use-repository-templates-in-github-mi2',
  },
  {
    id: '2',
    title: 'Introduction to glee',
    excerpt: 'An AsyncAPI framework that will make you smile again.',
    content:
      'An introduction to Glee, a spec-first AsyncAPI framework for building event-driven applications.',
    date: new Date('2024-01-15'),
    readingTime: 8,
    tags: ['AsyncAPI'],
    slug: 'https://www.asyncapi.com/blog/introduction-to-glee-a-spec-first-framework',
  },
]

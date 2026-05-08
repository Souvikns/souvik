import { readFile } from 'node:fs/promises'
import path from 'node:path'

export interface Project {
  id: string
  title: string
  description: string
  image: string
  heroImage?: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  duration?: string
  role?: string
  caseStudyFile?: string
}

export const projects: Project[] = [
  {
    id: 'notion-board',
    title: 'Notion Board',
    description: 'Sync Github Issues and Pull Requests with Notion database.',
    image: '/images/notion-board.png',
    technologies: ['TypeScript', 'Node.js'],
    liveUrl: 'https://github.com/marketplace/actions/notion-board',
    githubUrl: 'https://github.com/Souvikns/Notion-Board',
    featured: true,
    duration: '3 months',
    role: 'Full Stack Developer',
    caseStudyFile: 'notion-board.md',
  },
  {
    id: 'asyncapi-cli',
    title: 'AsyncAPI CLI',
    description:
      'Official AsyncAPI CLI used by developers to validate, generate, and automate AsyncAPI workflows.',
    image: '/images/asyncapi-cli.png',
    technologies: ['Node.js', 'TypeScript'],
    liveUrl: 'https://www.npmjs.com/package/@asyncapi/cli',
    githubUrl: 'https://github.com/asyncapi/cli',
    featured: true,
    duration: '6 months',
    role: 'Core Contributor',
    caseStudyFile: 'asyncapi-cli.md',
  },
  {
    id: 'kitsu',
    title: 'Kitsu',
    description:
      'GitHub Action that generates AI-powered pull request summaries for faster code review.',
    image: '/images/kitsu.png',
    technologies: ['Bun', 'TypeScript'],
    liveUrl: 'https://github.com/marketplace/actions/kitsu',
    githubUrl: 'https://github.com/Souvikns/kitsu',
    featured: true,
    duration: '4 months',
    role: 'Lead Developer',
    caseStudyFile: 'kitsu.md',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export async function getCaseStudyMarkdown(caseStudyFile?: string) {
  if (!caseStudyFile) {
    return null
  }

  const caseStudyPath = path.join(process.cwd(), 'content', 'case-studies', caseStudyFile)

  try {
    return await readFile(caseStudyPath, 'utf-8')
  } catch {
    return null
  }
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Notion Board',
    description: 'Sync Github Issues and Pull Requests with Notion database.',
    image: '/images/notion-board.png',
    technologies: ['TypeScript', 'Node.js'],
    liveUrl: 'https://github.com/marketplace/actions/notion-board',
    githubUrl: 'https://github.com/Souvikns/Notion-Board',
    featured: true,
  },
  {
    id: '2',
    title: 'AsyncAPI CLI',
    description: 'Official CLI tool by asyncapi cli gets over 50k downloads over a week.',
    image: '/images/asyncapi-cli.png',
    technologies: ['Node.js', 'TypeScript',],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/asyncapi/cli',
    featured: true,
  },
  {
    id: '3',
    title: 'Kitsu',
    description: 'Interactive analytics dashboard with real-time data visualization and custom reporting tools.',
    image: '/images/kitsu.png',
    technologies: ['Bun', 'TypeScript'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/Souvikns/kitsu',
    featured: true,
  }
]

export const featuredProjects = projects.filter((p) => p.featured)

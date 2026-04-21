export interface CaseStudy {
  challenge: string
  solution: string
  results: string[]
  keyFeatures: string[]
}

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
  caseStudy?: CaseStudy
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
    duration: '3 months',
    role: 'Full Stack Developer',
    caseStudy: {
      challenge: 'Teams were struggling to keep their GitHub project management in sync with their Notion databases. Manual updates were tedious and error-prone, leading to inconsistent data across platforms.',
      solution: 'Built a GitHub Action that automatically syncs issues and pull requests to Notion in real-time. The solution uses the GitHub API to detect changes and Notion API to update databases, with customizable field mapping.',
      results: ['50k+ downloads per week', 'Integrated into 1000+ repositories', 'Reduced manual data entry by 95%', 'Used by Fortune 500 companies'],
      keyFeatures: ['Real-time sync', 'Customizable field mapping', 'Automated workflow', 'GitHub Marketplace integration']
    }
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
    duration: '6 months',
    role: 'Core Contributor',
    caseStudy: {
      challenge: 'The AsyncAPI specification lacked a command-line interface for developers to work with AsyncAPI documents. Developers had to manually parse and validate AsyncAPI files, making it difficult to integrate into CI/CD pipelines.',
      solution: 'Developed a comprehensive CLI tool that provides commands for validating, generating, and templating AsyncAPI documents. The tool integrates with popular development workflows and supports plugins for extensibility.',
      results: ['Used by thousands of developers', 'Part of AsyncAPI official tooling', 'Open source community of 100+ contributors', 'Adopted by major tech companies'],
      keyFeatures: ['Document validation', 'Code generation', 'Template support', 'Plugin system', 'CI/CD integration']
    }
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
    duration: '4 months',
    role: 'Lead Developer',
    caseStudy: {
      challenge: 'Existing analytics dashboards were slow and difficult to customize. Users needed real-time data insights with the ability to create custom reports tailored to their specific needs.',
      solution: 'Built a high-performance analytics dashboard using Bun runtime for superior speed. Implemented real-time data visualization with customizable widgets and automated reporting capabilities.',
      results: ['50% faster load times', 'Support for 100+ data sources', 'Custom reports for 500+ users', 'Real-time data processing'],
      keyFeatures: ['Real-time visualization', 'Custom dashboards', 'Automated reporting', 'Data source integration', 'Performance optimized']
    }
  }
]

export const featuredProjects = projects.filter((p) => p.featured)

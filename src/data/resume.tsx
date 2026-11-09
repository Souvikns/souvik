import { Icons } from "@/components/icons";
import { Brain, Database, FileText, Globe, House, Library, Workflow } from "lucide-react";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Docker } from "@/components/ui/svgs/docker";

export const DATA = {
  name: "Souvik De",
  jobTitle: "Software Engineer",
  initials: "SD",
  url: "https://souvik.de",
  location: "Delhi, IN",
  locationLink: "https://www.google.com/maps/search/delhi%2C+Delhi%2C+India/?hl=en",
  description: "Building developer tools, maintaining opensource projects, and shipping fast, thoughtful software with a focus on usability and performance.",
  summary: `Backend Software Engineer with 4+ years of experience building production AI infrastructure, distributed backend systems, and developer tooling. Experienced in designing RAG platforms, document ingestion pipelines,
vector search systems, and LLM orchestration using Go, TypeScript, and Python. Former Postman engineer,
AsyncAPI maintainer, and Google Summer of Code mentor with experience building open-source tools used by
thousands of developers.`,
  avatarUrl: "/profile.png",
  ogImage: "/og_image.png",
  avatarThumbUrl: "/avatar.jpg",
  timezone: "IST",
  hero: {
    greeting: "Hi, I'm",
    role: "Backend Engineer",
    company: "XaneAI",
    intro: "I build AI infrastructure and developer tools: RAG platforms, ingestion pipelines and open-source tooling. Have a look around, then say hello.",
    cta: "Email me",
  },
  availability: {
    open: true,
    label: "Open to contract work",
  },
  github: {
    username: "Souvikns",
  },
  openSource: [
    { name: "AsyncAPI", detail: "Maintainer across 3+ projects", mark: "A" },
    { name: "AsyncAPI Bundler", detail: "16,000+ downloads", mark: "16k+" },
    { name: "Google Summer of Code", detail: "Mentor", mark: "GSoC" },
  ],
  sections: {
    highlights: {
      order: 1, enabled: true,
      labels: {
        experience: "Experience",
        building: "Currently building",
        openSource: "Open source",
        github: "GitHub activity",
        location: "Location",
        writing: "Latest writing",
        stack: "Stack",
      },
      experienceMore: "All details",
    },
    projects: {
      order: 2, enabled: true,
      heading: "Selected",
      headingMuted: "projects",
      moreLabel: "Everything on GitHub",
    },
    contact: {
      order: 3, enabled: true,
      heading: "Building something with",
      headingAccent: "LLMs",
      headingMuted: "Let's talk.",
      text: "RAG systems, agent tooling, MCP servers and backend work. I usually reply within a day or two.",
    },
  },
  skills: [
    { name: "Node.js", icon: Nodejs },
    { name: "LangChain", icon: Brain },
    { name: "Python", icon: Python },
    { name: "Go", icon: Golang },
    { name: "RAG", icon: Brain },
    { name: "Vector search", icon: Database },
    { name: "MySQL", icon: Database },
    { name: "Docker", icon: Docker },
    { name: "GitHub Actions", icon: Workflow },
    { name: "REST API", icon: Globe },
    { name: "TypeScript", icon: Typescript },
  ],
  navbar: [
    { href: "/#work", icon: House, label: "Work" },
    { href: "/#projects", icon: Globe, label: "Projects" },
    { href: "/blog", icon: Library, label: "Blog" },
    { href: "https://souvikns.github.io/resume/resume.pdf", icon: FileText, label: "Resume" },
  ],

  contact: {
    email: "souvikde.tech@gmail.com",
    tel: "+91 9073302976",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Souvikns",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/souvik-de-a2b941169/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:souvikde.tech@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "XaneAI",
      href: "https://xane.ai",
      badges: ["Full-time"],
      location: "Gurgaon, India",
      title: "Software Engineer II",
      logoUrl: "https://avatar.vercel.sh/xaneai?size=40",
      start: "July 2025",
      end: undefined,
      description: [
        `Built a multi stage OCR → chunking → embedding → retrieval pipeline powering Maruti Suzuki's AI assistant enabling semantic search across thousands of vehicle manuals`,
        `Designed and implemented an OCR-to-RAG ingestion pipeline converting unstructured PDFs into structured
embeddings indexed in a vector database, enabling persistent knowledge memory for AI agents.`,
        `Designed and implemented a scalable RAG evaluation pipeline using Ragas, enabling systematic measurement
of retrieval accuracy, answer relevance, and overall system performance.`
      ]
    },
    {
      company: "Postman",
      href: "https://postman.com",
      badges: ["Full-time"],
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREsH1utqLc28avGhOavyrVY5GXgA0dRFOtiG4w1gmvE0W9P1ziOCUT3TA&s=10?size=40",
      start: "February 2022",
      end: "August 2024",
      description: [
        `Developed and maintained a cross-platform CLI integrating official AsyncAPI tooling, providing a unified
workflow for developers`,
        `Created and maintained AsyncAPI Bundler (16,000+ downloads), enabling reliable resolution of complex json
ref dependency graphs across specification files.`,
        `Served as maintainer across 3+ open-source projects, reviewing contributions, guiding architectural decisions,
and driving roadmap initiatives.`,
        `Mentored contributors under Google Summer of Code (GSoC), guiding projects to production-ready completion`,
        `Co-led governance initiative to standardize parser tooling architecture across multiple languages, improving
maintainability and reducing duplication.`
      ],
    },
    {
      company: "Mage",
      href: "https://mage.ai",
      badges: ["Internship"],
      location: "Remote",
      title: "Software Engineer Intern",
      logoUrl: "https://avatar.vercel.sh/mage?size=40",
      start: "December 2021",
      end: "January 2022",
      description: [
        `Built microservices in Go to automate cloud infrastructure provisioning using templated configuration systems`,
        `Developed a React-based low-code interface for generating and provisioning infrastructure on demand.`,
        `Deployed containerized services using Docker and Kubernetes in cloud-native environments`
      ],
    }
  ],
  // Projects, newest first. Each one gets a page at /projects/<slug>.
  projects: [
    {
      slug: "jobscout",
      title: "JobScout",
      href: "https://findmejob.xyz",
      dates: "August 2026",
      year: "2026",
      active: true,
      featured: true,
      status: "In development",
      tagline: "Job research with your local AI agents",
      description: "A desktop app that hands job research to the AI agents already on your machine: Claude Code, Codex and OpenCode.",
      technologies: ["Wails", "Go", "TypeScript", "React", "Tailwind CSS", "Docker"],
      links: [
        { type: "Website", label: "Visit findmejob.xyz", href: "https://findmejob.xyz", icon: <Icons.globe className="size-3" /> },
      ],
      image: "/findmejob.png",
      facts: [
        { label: "Role", value: "Solo builder" },
        { label: "Platform", value: "Desktop · Wails" },
        { label: "Started", value: "August 2026" },
      ],
      series: "building-jobscout",
      problem: {
        heading: "Job hunting turned into",
        headingAccent: "data entry.",
        paragraphs: [
          "A dozen tabs open across job boards, careers pages and review sites. Roles saved to bookmarks, then a spreadsheet that stopped getting updated after a week.",
          "Researching each company (its stack, whether people there seem happy) meant more searches and more tabs. It's exactly the kind of work you'd hand to an agent when coding.",
        ],
      },
      features: [
        { title: "Bring your own agent", body: "Connects to Claude Code, OpenCode or Codex. No new subscription or account.", planned: false },
        { title: "Point it at a company", body: "Your agent does the digging on stack and culture; you read what it found.", planned: false },
        { title: "Save and shortlist", body: "Keep companies you like, shortlist the ones you really want, research attached.", planned: false },
        { title: "Draft applications", body: "A draft for one specific role that you read and fix before anything is sent.", planned: true },
      ],
    },
    {
      slug: "kitsu",
      title: "Kitsu",
      href: "https://souvikns.github.io/kitsu/",
      dates: "March 2026 - April 2026",
      year: "2026",
      active: true,
      featured: false,
      status: "Shipped",
      tagline: "AI code review for every pull request",
      description: "AI-powered code review for every pull request. Kitsu is a GitHub app that uses AI to review your code and give feedback on your pull requests.",
      technologies: ["TypeScript", "OpenAI API", "GitHub API", "GitHub Actions", "LangChain", "Deep Agents"],
      links: [
        { type: "Website", label: "Visit website", href: "https://souvikns.github.io/kitsu/", icon: <Icons.globe className="size-3" /> },
        { type: "Source", label: "Source", href: "https://github.com/Souvikns/kitsu", icon: <Icons.github className="size-3" /> },
      ],
      image: "/kitsu.png",
      facts: [
        { label: "Type", value: "GitHub app" },
        { label: "Built", value: "Mar – Apr 2026" },
      ],
    },
    {
      slug: "notion-board",
      title: "Notion Board",
      href: "https://souvikns.github.io/Notion-Board/index.html",
      dates: "March 2022 - April 2022",
      year: "2022",
      active: false,
      featured: false,
      status: "Shipped",
      tagline: "Sync GitHub issues and PRs into Notion",
      description: "A GitHub Action that syncs GitHub issues and pull requests into your Notion database.",
      technologies: ["Next.js", "TypeScript", "Notion API", "GitHub API", "GitHub Actions"],
      links: [
        { type: "Website", label: "Visit website", href: "https://souvikns.github.io/Notion-Board/index.html", icon: <Icons.globe className="size-3" /> },
        { type: "Source", label: "Source", href: "https://github.com/Souvikns/Notion-Board", icon: <Icons.github className="size-3" /> },
      ],
      image: "/notion-board.png",
      facts: [
        { label: "Type", value: "GitHub Action" },
        { label: "Built", value: "Mar – Apr 2022" },
      ],
    },
  ],
} as const;

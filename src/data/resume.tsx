import { Icons } from "@/components/icons";
import { Brain, Database, FileText, Globe, House, Library, Workflow } from "lucide-react";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Docker } from "@/components/ui/svgs/docker";

export const DATA = {
  name: "Souvik De - Software Engineer",
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
  sections: {
    about: { order: 1, enabled: true, heading: "About" },
    work: { order: 2, enabled: true, heading: "Work Experience", presentLabel: "Present" },
    skills: { order: 3, enabled: true, heading: "Skills" },
    projects: {
      order: 5, enabled: true,
      label: "My Projects",
      heading: "Check out my latest work",
      text: "I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.",
    },
    contact: {
      order: 8, enabled: true,
      label: "Contact",
      heading: "Get in Touch",
      text: "Want to get in touch? Drop me an email and I'll get back to you."
    },
  },
  skills: [
    { name: "Node.js", icon: Nodejs },
    { name: "Langchain", icon: Brain },
    { name: "Python", icon: Python },
    { name: "Go", icon: Golang },
    { name: "MySQL", icon: Database },
    { name: "Docker", icon: Docker },
    { name: "Gh Actions", icon: Workflow },
    { name: "REST API", icon: Globe },
    { name: "Typescript", icon: Typescript },
  ],
  navbar: [
    { href: "/", icon: House, label: "Home" },
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
        `Built a multi stage OCR --> chunking --> embedding --> retieval pipeline powering Maruti Suzuki's AI assistant enabling semantic search across thousands of vehicle manuals`,
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
  projects: [
    {
      "title": "Notion Board",
      "href": "https://souvikns.github.io/Notion-Board/index.html",
      "dates": "March 2022 - April 2022",
      "active": false,
      "description": "A GH action that syncs Github Issues and PR into your notion database.",
      "technologies": [
        "Next.js",
        "TypeScript",
        "Notion API",
        "GitHub API",
        "GitHub Actions"
      ],
      "links": [
        {
          "type": "Website",
          "href": "https://souvikns.github.io/Notion-Board/index.html",
          "icon": <Icons.globe className="size-3" />,
        },
        {
          "type": "Source",
          "href": "https://github.com/Souvikns/Notion-Board",
          "icon": <Icons.github className="size-3" />,
        }
      ],
      "image": "/notion-board.png",
    },
    {
      "title": "Kitsu",
      "href": "https://souvikns.github.io/kitsu/",
      "dates": "March 2026 - April 2026",
      "active": true,
      "description": "AI Powered code review for every pull request. Kitsu is a GitHub app that uses AI to review your code and provide feedback on your pull requests.",
      "technologies": [
        "TypeScript",
        "OpenAI API",
        "GitHub API",
        "GitHub Actions",
        "langchain",
        "deepagents"
      ],
      links: [
        {
          "type": "Website",
          "href": "https://souvikns.github.io/kitsu/",
          "icon": <Icons.globe className="size-3" />,
        },
        {
          "type": "Source",
          "href": "https://github.com/Souvikns/kitsu",
          "icon": <Icons.github className="size-3" />,
        }
      ],
      image: "/kitsu.png",
    },
  ],
} as const;

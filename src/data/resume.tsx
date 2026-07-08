import { Icons } from "@/components/icons";
import { Brain, Database, Globe, House, Library, Workflow } from "lucide-react";
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
  summary: "I started my opensource journey as an AsyncAPI maintainer in late 2021, and later joined the core developer team at Postman to work on AsyncAPI fulltime, where I also mentored students through Google Summer of Code. Since then, I've moved deeper into AI engineering and now work at XaneAI building AI powered applications for major automotive companies. Outside work, I spend my time building weird ideas, maintaining opensource projects, and shipping developer tools.",
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
      text: "Want to chat? Just shoot me a dm with a direct question on twitter and I'll respond whenever I can. I will ignore all soliciting.",
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
        `Architected and deployed scalable GenAI pipelines powering Maruti Suzuki’s Customer Assistant System,
enabling context-aware responses over enterprise-scale knowledge bases.`,
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
    }
    // {
    //   title: "Stackwise",
    //   href: "https://stackwise.dev",
    //   dates: "March 2024 - Present",
    //   active: true,
    //   description:
    //     "Built an AI-powered code review tool that integrates with GitHub PRs and provides context-aware feedback based on your team's codebase conventions. Used by 300+ engineering teams.",
    //   technologies: [
    //     "Next.js",
    //     "TypeScript",
    //     "PostgreSQL",
    //     "Prisma",
    //     "TailwindCSS",
    //     "Stripe",
    //     "Shadcn UI",
    //     "OpenAI API",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://stackwise.dev",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //   ],
    //   image: "/example-website.webp",
    //   video: "",
    // },
    // {
    //   title: "Logport",
    //   href: "https://logport.io",
    //   dates: "October 2023 - February 2024",
    //   active: true,
    //   description:
    //     "Open-source structured logging dashboard for Node.js and Python services. Ingest logs via a lightweight SDK, query them with a SQL-like syntax, and set up alerts in minutes.",
    //   technologies: [
    //     "Next.js",
    //     "TypeScript",
    //     "ClickHouse",
    //     "TailwindCSS",
    //     "Shadcn UI",
    //     "Cloudflare Workers",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://logport.io",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: "Source",
    //       href: "https://github.com/alexmercer-dev/logport",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    //   image: "",
    //   video: "https://cdn.magicui.design/bento-grid.mp4",
    // },
    // {
    //   title: "Formbase",
    //   href: "https://formbase.dev",
    //   dates: "June 2023 - September 2023",
    //   active: true,
    //   description:
    //     "A headless form backend that handles submissions, spam filtering, file uploads, and email notifications - no server required. Drop in one script tag and you're done.",
    //   technologies: [
    //     "Astro",
    //     "TypeScript",
    //     "Cloudflare Workers",
    //     "TailwindCSS",
    //     "Stripe",
    //     "Resend",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://formbase.dev",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: "Source",
    //       href: "https://github.com/alexmercer-dev/formbase",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    //   image: "/example-website.png",
    //   video: "",
    // },
    // {
    //   title: "Patchwork",
    //   href: "https://patchwork.run",
    //   dates: "February 2023 - May 2023",
    //   active: false,
    //   description:
    //     "A visual diff tool for design tokens and Tailwind config changes. Connect it to your repo and get a live preview of how a config change affects every component in your design system.",
    //   technologies: [
    //     "Next.js",
    //     "TypeScript",
    //     "TailwindCSS",
    //     "Shadcn UI",
    //     "Vercel",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://patchwork.run",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //   ],
    //   image: "",
    //   video: "https://cdn.llm.report/openai-demo.mp4",
    // },
  ],
} as const;

import { Icons } from "@/components/icons";
import { Bot, Brain, Cloud, Database, FileText, House, Library, Plug, Workflow } from "lucide-react";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Postgresql } from "@/components/ui/svgs/postgresql";

export const DATA = {
  name: "Souvik De",
  jobTitle: "Software Engineer, AI Systems",
  initials: "SD",
  url: "https://souvik.de",
  location: "Gurugram, India",
  locationLink: "https://www.google.com/maps/search/gurugram%2C+Haryana%2C+India/?hl=en",
  description: "Building production LLM systems — RAG, AI agents, and backend tooling in Python, Go, and TypeScript.",
  summary: `Software engineer with 4+ years in backend and developer tooling, now building production LLM systems in Python, Go and TypeScript. At XANE.AI I work on the agent behind Maruti Suzuki's AI assistant, where adding evals to CI helped take answer relevance from 64% to 89%. I also maintain AsyncAPI tools with 36,000+ downloads, wrote the project's MCP server, and mentor Google Summer of Code contributors.`,
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
    { name: "Python", icon: Python },
    { name: "Go", icon: Golang },
    { name: "TypeScript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "RAG", icon: Brain },
    { name: "AI Agents", icon: Bot },
    { name: "MCP", icon: Plug },
    { name: "LangChain", icon: Workflow },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Qdrant", icon: Database },
    { name: "Docker", icon: Docker },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "AWS", icon: Cloud },
  ],
  navbar: [
    { href: "/", icon: House, label: "Home" },
    { href: "/blog", icon: Library, label: "Blog" },
    { href: "https://souvikns.github.io/resume/resume.pdf", icon: FileText, label: "Resume" },
  ],
  contact: {
    email: "souvikde.tech@gmail.com",
    tel: "+91 98305 05728",
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
      company: "XANE.AI",
      href: "https://xane.ai",
      badges: ["Full-time"],
      location: "Gurugram, India",
      title: "Software Engineer II",
      logoUrl: "https://avatar.vercel.sh/xaneai?size=40",
      start: "Jul 2025",
      end: undefined,
      description: [
        `Built the Mastra agent behind Maruti Suzuki's AI assistant, which handles 100,000+ queries a day from 4.37M+ users across 34 vehicle models. It began as a RAG system over vehicle manuals and now also checks insurance policy status, handles renewals and quotes, and finds and books workshops.`,
        `For retrieval, manuals go through MinerU OCR instead of manual data entry and are then chunked, embedded and searched in Qdrant with hybrid search and reranking.`,
        `Built a separate deepagents system that sorts raw OCR output into CRM records.`,
        `Added RAGAS evals on a golden set to CI (GitHub Actions) to flag quality regressions and set up self-hosted Langfuse for tracing. Answer relevance rose from 64% to 89%.`,
        `Routed customer photos of car parts to a vision model whose output drives retrieval, and attached provenance metadata to every chunk so answers cite their sources.`,
        `Deployed it on AWS, with Bedrock for the assistant's LLM and the part-identification vision model, EC2 for the backend, and S3 and RDS for vehicle manuals and metadata.`,
      ],
    },
    {
      company: "CodeMate.AI",
      href: "https://codemate.ai",
      badges: ["Full-time"],
      location: "Noida, India",
      title: "Lead Software Engineer",
      logoUrl: "https://avatar.vercel.sh/codemate?size=40",
      start: "Dec 2024",
      end: "May 2025",
      description: [
        `Wrote a custom search algorithm for retrieval over Swagger/OpenAPI specs that improved precision in the RAG system.`,
        `Cut startup time of the VS Code extension's local server by over 30% by loading models in the background instead of at boot.`,
        `Set up GitHub Actions CI/CD for macOS, Linux and Windows releases and automated deploys to an Azure production VM, saving the team 2–5 hours of release work a week.`,
        `Led a two-engineer team working on the local server and VS Code extension.`,
      ],
    },
    {
      company: "Postman",
      href: "https://postman.com",
      badges: ["Full-time"],
      location: "Bangalore, India",
      title: "Software Engineer",
      logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREsH1utqLc28avGhOavyrVY5GXgA0dRFOtiG4w1gmvE0W9P1ziOCUT3TA&s=10?size=40",
      start: "Feb 2022",
      end: "Jun 2024",
      description: [
        `Took the official AsyncAPI CLI from an early skeleton to the standard tool for the spec (20,000+ downloads), putting the project's separate tools behind one command.`,
        `Shipped AsyncAPI Bundler (16,000+ downloads), which resolves JSON $ref references across specification files into a single document.`,
        `Maintained 3+ open-source projects, reviewed 185+ pull requests and brought two contributors up to maintainer.`,
        `Mentored 3–5 Google Summer of Code contributors and co-led an effort to standardize parsers across languages.`,
      ],
    },
    {
      company: "AsyncAPI Initiative",
      href: "https://www.asyncapi.com",
      badges: ["Open Source"],
      location: "Remote, Linux Foundation project",
      title: "Maintainer",
      logoUrl: "https://avatar.vercel.sh/asyncapi?size=40",
      start: "Sep 2021",
      end: undefined,
      description: [
        `Built asyncapi-mcp, an MCP server with four tools that lets AI agents work with AsyncAPI documents (Apache 2.0).`,
        `Won the AsyncAPI Hackathon 2021 ($5,000 prize) with the Bundler, donated the project to AsyncAPI and still maintain it.`,
      ],
    },
    {
      company: "Mage",
      href: "https://mage.ai",
      badges: ["Internship"],
      location: "Remote",
      title: "Backend Developer Intern",
      logoUrl: "https://avatar.vercel.sh/mage?size=40",
      start: "Nov 2021",
      end: "Feb 2022",
      description: [
        `Built Go microservices that provision cloud infrastructure from templated configuration and a React low-code interface for them, deployed with Docker and Kubernetes.`,
      ],
    },
  ],
  projects: [
    {
      "title": "angelone-mcp",
      "href": "https://github.com/Souvikns/angelone-mcp",
      "dates": "",
      "active": true,
      "description": "MCP server that connects Claude to an Angel One brokerage account (portfolio, orders, live market data), used on a live account to automate investing. Orders Claude proposes are sent only after approval in a desktop dialog.",
      "technologies": [
        "TypeScript",
        "Bun",
        "MCP",
        "WebSockets"
      ],
      "links": [
        {
          "type": "Source",
          "href": "https://github.com/Souvikns/angelone-mcp",
          "icon": <Icons.github className="size-3" />,
        }
      ],
      "image": "",
    },
    {
      "title": "JobScout",
      "href": "https://findmejob.xyz",
      "dates": "August 2026",
      "active": true,
      "description": "Cross-platform desktop app that uses LLMs to match job seekers with openings. Wellfound and Greenhouse scrapers refresh listings every 6 hours into a self-hosted backend.",
      "technologies": [
        "Go",
        "Wails",
        "LLMs",
        "Scrapers"
      ],
      "links": [
        {
          "type": "Website",
          "href": "https://findmejob.xyz",
          "icon": <Icons.globe className="size-3" />,
        }
      ],
      "image": "/findmejob.png",
    },
    {
      "title": "Kitsu",
      "href": "https://github.com/Souvikns/kitsu",
      "dates": "March 2026 - April 2026",
      "active": true,
      "description": "AI agent packaged as a GitHub Action that reviews pull requests and writes summaries. It filters out low-signal changes and chunks large diffs to fit context limits.",
      "technologies": [
        "LangGraph",
        "deepagents",
        "GitHub Actions"
      ],
      "links": [
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
      "image": "/kitsu.png",
    },
  ],
} as const;

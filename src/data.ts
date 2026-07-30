// ---------------------------------------------------------------------------
// Site content. Everything in here is real; there is no placeholder copy left.
// ---------------------------------------------------------------------------

export type Project = {
  name: string
  description: string
  /** Optional. Omit for private/commercial work; the card renders the name unlinked. */
  link?: string
  tech: string[]
  year: string
  /** Optional media shown in the card (and zoomable). Falls back to a typographic plate. */
  video?: string
  image?: string
  id: string
}

export type Capability = {
  label: string
  summary: string
  stack: string[]
  id: string
}

export type BlogPost = {
  title: string
  description: string
  slug: string
  uid: string
}

export type SocialLink = {
  label: string
  link: string
}

export const NAME = 'Junie Grat'
export const ROLE = 'Design Engineer'

export const SITE_DESCRIPTION =
  'I build production systems end to end: a 300-table ERP monorepo, self-hosted security tooling, WebGL showcases, and MCP servers that drive Adobe apps.'

export const EMAIL = 'juniegrat@gmail.com'

// Selected projects. Drop in an `image` (path under /public) or `video` URL to
// replace the typographic plate.
export const PROJECTS: Project[] = [
  {
    name: 'Design Library',
    description:
      'A registry of AI-generated interface designs, stored as files and served as a shadcn registry so any of them installs into another project with one command. Each design carries the brief that produced it, and the whole set exports to standalone HTML.',
    link: 'https://design.juniegrat.com',
    tech: ['TanStack Start', 'Tailwind v4', 'shadcn registry', 'Vite SSR'],
    year: '2026',
    id: 'design-library',
  },
  {
    name: 'Hadesor ERP',
    description:
      'The most complex system I have built. A Turborepo ERP monorepo (staff app, customer portal, mobile, docs) over a 300+ table PostgreSQL/Drizzle schema, with end-to-end tRPC, type-safe drizzle-zod validation, auth, i18n, and Playwright E2E coverage.',
    // Private/commercial repo, link intentionally omitted (set a live or
    // case-study URL to enable it).
    tech: ['Next.js', 'Turborepo', 'tRPC', 'Drizzle ORM', 'PostgreSQL', 'Playwright'],
    year: '2026',
    id: 'hadesor',
  },
  {
    name: 'ASM: Attack Surface Monitor',
    description:
      'Self-hosted attack-surface monitor. Continuous asset discovery and nuclei vulnerability scanning behind a dashboard, as an own-your-data alternative to ProjectDiscovery Cloud.',
    link: 'https://github.com/juniegrat/asm',
    tech: ['Python', 'FastAPI', 'TanStack Start', 'SQLite', 'nuclei'],
    year: '2026',
    id: 'asm',
  },
  {
    name: 'Coin Detector',
    description:
      'AI-powered numismatic analysis. Identify and grade coins from photos using vision models and forensic OCR passes, in a cross-platform Expo app.',
    link: 'https://github.com/juniegrat/coin-detect',
    tech: ['React Native', 'Expo', 'TypeScript', 'OpenAI Vision'],
    year: '2026',
    id: 'coin-detect',
  },
  {
    name: 'AURUM',
    description:
      'Scroll-driven 3D showcase where precious-metal coins melt and reform into one another, with a technical HUD and hover inspection.',
    link: 'https://github.com/juniegrat/threejs-nebula',
    tech: ['Three.js', 'GLSL', 'Vite'],
    year: '2026',
    id: 'aurum',
  },
  {
    name: 'Adobe MCP Bridges',
    description:
      'MCP servers that drive After Effects and Illustrator through ExtendScript, generating and rendering compositions end to end from a config file or an AI agent.',
    link: 'https://github.com/juniegrat/ae-mcp',
    tech: ['TypeScript', 'MCP', 'ExtendScript', 'AppleScript'],
    year: '2026',
    id: 'adobe-mcp',
  },
]

// What I actually work on, grouped by the stacks above rather than by employer.
export const CAPABILITIES: Capability[] = [
  {
    label: 'Product engineering',
    summary: 'Monorepo applications with one unbroken type chain from schema to UI.',
    stack: ['Next.js', 'TanStack Start', 'Turborepo', 'tRPC'],
    id: 'product',
  },
  {
    label: 'Data and backend',
    summary: 'Relational schemas at scale, validated at the edge of every call.',
    stack: ['PostgreSQL', 'Drizzle ORM', 'FastAPI', 'SQLite'],
    id: 'backend',
  },
  {
    label: 'Interface and motion',
    summary: 'Interfaces designed in code, where type, color, and motion are one system.',
    stack: ['Tailwind', 'Motion', 'Three.js', 'GLSL'],
    id: 'interface',
  },
  {
    label: 'Automation and AI',
    summary: 'Agents and MCP servers wired into real tools rather than demos.',
    stack: ['MCP', 'OpenAI Vision', 'ExtendScript', 'Playwright'],
    id: 'automation',
  },
]

// These map to the MDX files in src/content/blog/<slug>.mdx
export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design.',
    slug: 'exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'How to Export Metadata from MDX',
    description: 'A guide on exporting metadata from MDX files to drive page SEO.',
    slug: 'example-mdx-metadata',
    uid: 'blog-2',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/juniegrat',
  },
]

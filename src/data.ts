// ---------------------------------------------------------------------------
// Edit this file to make the site yours. The values wired with your GitHub /
// email are real; everything marked PLACEHOLDER is demo content to replace.
// ---------------------------------------------------------------------------

export type Project = {
  name: string
  description: string
  /** Optional — omit for private/commercial work; the card renders the name unlinked. */
  link?: string
  tech: string[]
  year: string
  /** Optional media shown in the card (and zoomable). Falls back to an accent placeholder. */
  video?: string
  image?: string
  /** Tailwind gradient classes for the placeholder when there's no image/video. */
  accent?: string
  id: string
}

export type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
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

// TODO: your display name + role (shown in the header).
export const NAME = 'Your Name'
export const ROLE = 'Design Engineer'

export const SITE_DESCRIPTION =
  'Focused on creating intuitive and performant web experiences. Bridging the gap between design and development.'

export const EMAIL = 'juniegrat@gmail.com'

// Real projects pulled from github.com/juniegrat. Reorder/trim to taste; drop in
// an `image` (path under /public) or `video` URL to replace the accent placeholder.
export const PROJECTS: Project[] = [
  {
    name: 'Hadesor ERP',
    description:
      'The most complex system I’ve built — a Turborepo ERP monorepo (staff app, customer portal, mobile, docs) over a 300+ table PostgreSQL/Drizzle schema, with end-to-end tRPC, type-safe drizzle-zod validation, auth, i18n, and Playwright E2E coverage.',
    // Private/commercial repo — link intentionally omitted (set a live/case-study URL to enable).
    tech: ['Next.js', 'Turborepo', 'tRPC', 'Drizzle ORM', 'PostgreSQL', 'Playwright'],
    year: '2026',
    accent: 'from-[#cea600]/30 to-amber-700/20',
    id: 'hadesor',
  },
  {
    name: 'ASM — Attack Surface Monitor',
    description:
      'Self-hosted attack-surface monitor: continuous asset discovery and nuclei vulnerability scanning with a dashboard — an own-your-data alternative to ProjectDiscovery Cloud.',
    link: 'https://github.com/juniegrat/asm',
    tech: ['Python', 'FastAPI', 'TanStack Start', 'SQLite', 'nuclei'],
    year: '2026',
    accent: 'from-emerald-500/25 to-cyan-500/25',
    id: 'asm',
  },
  {
    name: 'Coin Detector',
    description:
      'AI-powered numismatic analysis — identify and grade coins from photos with vision models and forensic OCR passes. Cross-platform Expo app.',
    link: 'https://github.com/juniegrat/coin-detect',
    tech: ['React Native', 'Expo', 'TypeScript', 'OpenAI Vision'],
    year: '2026',
    accent: 'from-amber-500/25 to-yellow-500/25',
    id: 'coin-detect',
  },
  {
    name: 'AURUM',
    description:
      'Scroll-driven 3D showcase where precious-metal coins melt and reform into one another, with a technical HUD and hover inspection.',
    link: 'https://github.com/juniegrat/threejs-nebula',
    tech: ['Three.js', 'GLSL', 'Vite'],
    year: '2026',
    accent: 'from-yellow-500/25 to-zinc-400/25',
    id: 'aurum',
  },
  {
    name: 'Voodoo',
    description:
      'Interactive WebGL voodoo doll — a spring-bone skinned figure you can grab, needle, burn and tear, with webcam pinch-to-throw darts.',
    link: 'https://github.com/juniegrat/threejs-voodoo',
    tech: ['Three.js', 'WebGL', 'MediaPipe', 'Vite'],
    year: '2026',
    accent: 'from-rose-500/25 to-purple-500/25',
    id: 'voodoo',
  },
  {
    name: 'Three Balisong',
    description:
      'Real-time balisong (butterfly knife) playground in Three.js, with opt-in MediaPipe webcam hand control.',
    link: 'https://github.com/juniegrat/three-balisong',
    tech: ['Three.js', 'MediaPipe', 'Vite'],
    year: '2026',
    accent: 'from-sky-500/25 to-slate-500/25',
    id: 'balisong',
  },
  {
    name: 'Adobe MCP Bridges',
    description:
      'MCP servers that drive Adobe After Effects & Illustrator via ExtendScript — generate and render compositions end-to-end from a config or an AI agent.',
    link: 'https://github.com/juniegrat/ae-mcp',
    tech: ['TypeScript', 'MCP', 'ExtendScript', 'AppleScript'],
    year: '2026',
    accent: 'from-violet-500/25 to-fuchsia-500/25',
    id: 'adobe-mcp',
  },
]

// PLACEHOLDER work history.
export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Company',
    title: 'Your Role',
    start: '2024',
    end: 'Present',
    link: 'https://github.com/juniegrat',
    id: 'work1',
  },
  {
    company: 'Previous Company',
    title: 'Previous Role',
    start: '2021',
    end: '2024',
    link: 'https://github.com/juniegrat',
    id: 'work2',
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
  {
    // TODO: replace with your handle (or delete).
    label: 'Twitter',
    link: 'https://twitter.com/',
  },
  {
    // TODO: replace with your profile (or delete).
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/',
  },
]

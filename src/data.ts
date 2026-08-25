import type { Locale } from '@/i18n/locale'
import { DESIGN_URL, LAB_URL } from '@/lib/constants'

// ---------------------------------------------------------------------------
// Site content. Everything in here is real; there is no placeholder copy left.
//
// Prose carried by the UI is localised here. Article bodies are not: they live
// as MDX under src/content/<kind>/<locale>/<slug>.mdx.
// ---------------------------------------------------------------------------

/** A string that exists in every locale. */
export type Localised = Record<Locale, string>

export type Project = {
  name: string
  description: Localised
  /** Optional. Omit for private/commercial work; the card renders the name unlinked. */
  link?: string
  tech: string[]
  year: string
  /** Optional media shown in the card (and zoomable). Falls back to a typographic plate. */
  video?: string
  image?: string
  id: string
  /**
   * Set when a writeup exists at src/content/projects/<locale>/<slug>.mdx. The
   * card then links to /projects/<slug> instead of straight out to the repo.
   */
  slug?: string
}

export type Capability = {
  label: Localised
  summary: Localised
  stack: string[]
  id: string
}

export type BlogPost = {
  title: Localised
  description: Localised
  slug: string
  uid: string
  /** ISO date. Drives the dateline; array order drives the index. */
  date: string
  /** Optional hero. Falls back to the typographic plate when absent. */
  hero?: string
  /** Reading time in minutes, rounded. */
  minutes: number
}

export type SocialLink = {
  label: string
  link: string
}

export const NAME = 'Junie Grat'

export const SITE_DESCRIPTION: Localised = {
  en: 'I build production systems end to end: a 300-table ERP monorepo, self-hosted security tooling, WebGL showcases, and MCP servers that drive Adobe apps.',
  fr: 'Je construis des systèmes de production de bout en bout : un monorepo ERP de 300 tables, des outils de sécurité auto-hébergés, des vitrines WebGL et des serveurs MCP qui pilotent les applications Adobe.',
}

export const EMAIL = 'juniegrat@gmail.com'

// Selected projects. Posters live in public/projects/ — isometric dioramas
// rendered per project, kept on one graphite ground and one gold accent so the
// grid reads as a set. Drop a `video` URL on a project to override its poster;
// omit both and the card falls back to the typographic plate.
export const PROJECTS: Project[] = [
  {
    name: 'Design Library',
    description: {
      en: 'A registry of AI-generated interface designs, stored as files and served as a shadcn registry so any of them installs into another project with one command. Each design carries the brief that produced it, and the whole set exports to standalone HTML.',
      fr: "Un registre de maquettes d'interface générées par IA, stockées sous forme de fichiers et servies comme registre shadcn : n'importe laquelle s'installe dans un autre projet en une commande. Chaque maquette conserve le brief qui l'a produite, et l'ensemble s'exporte en HTML autonome.",
    },
    link: 'https://design.juniegrat.com',
    tech: ['TanStack Start', 'Tailwind v4', 'shadcn registry', 'Vite SSR'],
    year: '2026',
    image: '/projects/library.webp',
    id: 'design-library',
  },
  {
    name: 'Hadesor ERP',
    description: {
      en: 'The most complex system I have built. A Turborepo ERP monorepo (staff app, customer portal, mobile, docs) over a 300+ table PostgreSQL/Drizzle schema, with end-to-end tRPC, type-safe drizzle-zod validation, auth, i18n, and Playwright E2E coverage.',
      fr: "Le système le plus complexe que j'aie construit. Un monorepo ERP Turborepo (application interne, portail client, mobile, documentation) sur un schéma PostgreSQL/Drizzle de plus de 300 tables, avec tRPC de bout en bout, validation typée drizzle-zod, authentification, i18n et couverture E2E Playwright.",
    },
    // Private/commercial repo, link intentionally omitted (set a live or
    // case-study URL to enable it).
    tech: ['Next.js', 'Turborepo', 'tRPC', 'Drizzle ORM', 'PostgreSQL', 'Playwright'],
    year: '2026',
    image: '/projects/hadesor.webp',
    id: 'hadesor',
  },
  {
    name: 'ASM: Attack Surface Monitor',
    description: {
      en: 'Self-hosted attack-surface monitor. Continuous asset discovery and nuclei vulnerability scanning behind a dashboard, as an own-your-data alternative to ProjectDiscovery Cloud.',
      fr: "Moniteur de surface d'attaque auto-hébergé. Découverte continue des actifs et analyse de vulnérabilités avec nuclei derrière un tableau de bord, comme alternative à ProjectDiscovery Cloud où les données restent chez vous.",
    },
    link: 'https://github.com/juniegrat/asm',
    tech: ['Python', 'FastAPI', 'TanStack Start', 'SQLite', 'nuclei'],
    year: '2026',
    image: '/projects/asm.webp',
    id: 'asm',
    slug: 'asm',
  },
  {
    name: 'Coin Detector',
    description: {
      en: 'AI-powered numismatic analysis. Identify and grade coins from photos using vision models and forensic OCR passes, in a cross-platform Expo app.',
      fr: 'Analyse numismatique assistée par IA. Identification et notation de pièces à partir de photos, via des modèles de vision et des passes OCR forensiques, dans une application Expo multiplateforme.',
    },
    link: 'https://github.com/juniegrat/coin-detect',
    tech: ['React Native', 'Expo', 'TypeScript', 'OpenAI Vision'],
    year: '2026',
    image: '/projects/coin.webp',
    id: 'coin-detect',
  },
  {
    name: 'AURUM',
    description: {
      en: 'Scroll-driven 3D showcase where precious-metal coins melt and reform into one another, with a technical HUD and hover inspection.',
      fr: 'Vitrine 3D pilotée au défilement où des pièces en métaux précieux fondent et se reforment les unes dans les autres, avec un HUD technique et une inspection au survol.',
    },
    link: 'https://github.com/juniegrat/threejs-nebula',
    tech: ['Three.js', 'GLSL', 'Vite'],
    year: '2026',
    image: '/projects/aurum.webp',
    id: 'aurum',
  },
  {
    name: 'Adobe MCP Bridges',
    description: {
      en: 'MCP servers that drive After Effects and Illustrator through ExtendScript, generating and rendering compositions end to end from a config file or an AI agent.',
      fr: 'Des serveurs MCP qui pilotent After Effects et Illustrator via ExtendScript, en générant et en rendant des compositions de bout en bout depuis un fichier de configuration ou un agent IA.',
    },
    link: 'https://github.com/juniegrat/ae-mcp',
    tech: ['TypeScript', 'MCP', 'ExtendScript', 'AppleScript'],
    year: '2026',
    image: '/projects/mcp.webp',
    id: 'adobe-mcp',
  },
]

// What I actually work on, grouped by the stacks above rather than by employer.
export const CAPABILITIES: Capability[] = [
  {
    label: { en: 'Product engineering', fr: 'Ingénierie produit' },
    summary: {
      en: 'Monorepo applications with one unbroken type chain from schema to UI.',
      fr: "Des applications en monorepo avec une chaîne de types ininterrompue, du schéma jusqu'à l'interface.",
    },
    stack: ['Next.js', 'TanStack Start', 'Turborepo', 'tRPC'],
    id: 'product',
  },
  {
    label: { en: 'Data and backend', fr: 'Données et backend' },
    summary: {
      en: 'Relational schemas at scale, validated at the edge of every call.',
      fr: "Des schémas relationnels à grande échelle, validés à l'entrée de chaque appel.",
    },
    stack: ['PostgreSQL', 'Drizzle ORM', 'FastAPI', 'SQLite'],
    id: 'backend',
  },
  {
    label: { en: 'Interface and motion', fr: 'Interface et animation' },
    summary: {
      en: 'Interfaces designed in code, where type, color, and motion are one system.',
      fr: 'Des interfaces conçues directement en code, où la typographie, la couleur et le mouvement forment un seul système.',
    },
    stack: ['Tailwind', 'Motion', 'Three.js', 'GLSL'],
    id: 'interface',
  },
  {
    label: { en: 'Automation and AI', fr: 'Automatisation et IA' },
    summary: {
      en: 'Agents and MCP servers wired into real tools rather than demos.',
      fr: 'Des agents et des serveurs MCP branchés sur de vrais outils plutôt que sur des démos.',
    },
    stack: ['MCP', 'OpenAI Vision', 'ExtendScript', 'Playwright'],
    id: 'automation',
  },
]

// These map to the MDX files in src/content/blog/<locale>/<slug>.mdx. Heroes
// live in public/blog/ and follow the project posters: isometric diorama on a
// floating rock, one graphite ground, one gold accent. Array order is the order
// the blog index renders; `date` only drives the dateline. Drop `hero` and the
// card falls back to a typographic plate.
export const BLOG_POSTS: BlogPost[] = [
  {
    title: {
      en: 'Wiring an ERP for French e-invoicing',
      fr: 'Brancher un ERP sur la facturation électronique française',
    },
    description: {
      en: 'The September 2026 deadline is not a PDF problem. The seams that survive a vendor change, and the gates that stop a bad deploy transmitting.',
      fr: "L'échéance de septembre 2026 n'est pas un problème de PDF. Les coutures qui survivent à un changement de prestataire, et les verrous qui empêchent un mauvais déploiement de transmettre.",
    },
    slug: 'wiring-an-erp-for-french-e-invoicing',
    uid: 'blog-4',
    date: '2026-08-24',
    hero: '/blog/e-invoicing.webp',
    minutes: 8,
  },
  {
    title: {
      en: 'I built a tool to check whether I was imagining it',
      fr: "J'ai construit un outil pour vérifier si je l'imaginais",
    },
    description: {
      en: 'Twenty-one months of my own messages, two detectors, and a hand-labelled sample to measure them. The tool found what I expected. Then measuring the tool took part of it back.',
      fr: "Vingt et un mois de mes propres messages, deux détecteurs, et un échantillon annoté à la main pour les mesurer. L'outil a trouvé ce que j'attendais, puis mesurer l'outil m'en a repris une partie.",
    },
    slug: 'checking-my-own-memory',
    uid: 'blog-5',
    date: '2026-08-24',
    hero: '/blog/checking-memory.webp',
    minutes: 7,
  },
  {
    title: {
      en: 'Post-mortem of a one-person build',
      fr: "Post-mortem d'un projet construit seul",
    },
    description: {
      en: 'Eighteen months, eleven applications, one committer, and what the git history recorded.',
      fr: "Dix-huit mois, onze applications, un seul auteur de commits, et ce que l'historique git a enregistré.",
    },
    slug: 'post-mortem-of-a-one-person-build',
    uid: 'blog-1',
    date: '2026-08-24',
    hero: '/blog/one-person-build.webp',
    minutes: 9,
  },
  {
    title: {
      en: 'Inheriting a nearly finished project',
      fr: "Hériter d'un projet presque terminé",
    },
    description: {
      en: 'What "already largely done" turned out to mean, measured in the files I was handed.',
      fr: "Ce que « déjà bien avancé » voulait dire en réalité, mesuré dans les fichiers qu'on m'a remis.",
    },
    slug: 'inheriting-a-nearly-finished-project',
    uid: 'blog-2',
    date: '2026-08-24',
    hero: '/blog/inheritance.webp',
    minutes: 8,
  },
  {
    title: {
      en: 'An append-only fiscal journal for NF525',
      fr: 'Un journal fiscal en ajout seul pour NF525',
    },
    description: {
      en: 'Proving to a French auditor that your records were never altered, and what that does to your release process.',
      fr: "Prouver à un auditeur que vos enregistrements n'ont jamais été altérés, et ce que cela impose à votre processus de publication.",
    },
    slug: 'append-only-fiscal-journal-nf525',
    uid: 'blog-3',
    date: '2026-08-24',
    hero: '/blog/fiscal-journal.webp',
    minutes: 7,
  },
]

// Rendered in the home page's Connect section. Lab and Design also sit in the
// desktop header; repeating them here is what gives a phone a route to them,
// since the bottom bar is reserved for primary navigation.
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/juniegrat',
  },
  {
    label: 'Lab',
    link: LAB_URL,
  },
  {
    label: 'Design',
    link: DESIGN_URL,
  },
]

import type { Locale } from './locale'

/**
 * UI chrome only. Article bodies are MDX files per locale under
 * `src/content/**`; nothing here translates content.
 *
 * `en` is the source of truth: its keys type the other catalogues, so a missing
 * or stale French key is a type error rather than a silent fallback to the key
 * name at runtime.
 */
const en = {
  'nav.work': 'Work',
  'nav.blog': 'Blog',
  'nav.lab': 'Lab',
  'nav.design': 'Design',
  'nav.contact': 'Contact',
  'nav.language': 'Language',

  'role.title': 'Design Engineer',

  'home.projects': 'Selected Projects',
  'home.capabilities': 'What I Work On',
  'home.writing': 'Writing',
  'home.allPosts': 'All posts',
  'home.connect': 'Connect',
  'home.reachMe': 'Reach me at {email}',

  'blog.title': 'Writing',
  'blog.description':
    'Post-mortems and technical writeups from building production systems, mostly about what the artifacts recorded rather than what anyone remembers.',
  'blog.readingTime': '{minutes} min',
  'blog.back': 'Writing',
  'blog.copyUrl': 'URL',
  'blog.copy': 'Copy',
  'blog.copied': 'Copied',
  'blog.notFound': 'Post not found',
  'blog.notFoundBody': 'This article does not exist (yet).',

  'project.back': 'Work',
  'project.source': 'Source',
  'project.notFound': 'Case study not found',
  'project.notFoundBody': 'This project does not have a writeup yet.',
  'project.notFoundLink': 'Back to the work',

  'footer.rights': '© {year} {name}.',
  'footer.builtWith': 'Built with TanStack Start.',
} as const

export type MessageKey = keyof typeof en

const fr: Record<MessageKey, string> = {
  'nav.work': 'Projets',
  'nav.blog': 'Articles',
  'nav.lab': 'Lab',
  'nav.design': 'Design',
  'nav.contact': 'Contact',
  'nav.language': 'Langue',

  'role.title': 'Ingénieur design',

  'home.projects': 'Projets sélectionnés',
  'home.capabilities': 'Ce sur quoi je travaille',
  'home.writing': 'Articles',
  'home.allPosts': 'Tous les articles',
  'home.connect': 'Contact',
  'home.reachMe': 'Écrivez-moi à {email}',

  'blog.title': 'Articles',
  'blog.description':
    'Post-mortems et retours techniques sur la construction de systèmes en production, surtout sur ce que les artefacts ont enregistré plutôt que sur ce dont on se souvient.',
  'blog.readingTime': '{minutes} min',
  'blog.back': 'Articles',
  'blog.copyUrl': "l'URL",
  'blog.copy': 'Copier',
  'blog.copied': 'Copié',
  'blog.notFound': 'Article introuvable',
  'blog.notFoundBody': "Cet article n'existe pas (encore).",

  'project.back': 'Projets',
  'project.source': 'Code source',
  'project.notFound': 'Étude de cas introuvable',
  'project.notFoundBody': "Ce projet n'a pas encore d'article dédié.",
  'project.notFoundLink': 'Retour aux projets',

  'footer.rights': '© {year} {name}.',
  'footer.builtWith': 'Réalisé avec TanStack Start.',
}

export const MESSAGES: Record<Locale, Record<MessageKey, string>> = { en, fr }

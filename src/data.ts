// ---------------------------------------------------------------------------
// Edit this file to make the site yours. The values wired with your GitHub /
// email are real; everything marked PLACEHOLDER is demo content to replace.
// ---------------------------------------------------------------------------

export type Project = {
  name: string
  description: string
  link: string
  video: string
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

// PLACEHOLDER projects — the videos are demo clips so the morphing dialog has
// something to show. Swap names/descriptions/links/videos for your own work.
export const PROJECTS: Project[] = [
  {
    name: 'Project One',
    description: 'A short description of what this project is and does.',
    link: 'https://github.com/juniegrat',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'project1',
  },
  {
    name: 'Project Two',
    description: 'Another project worth highlighting on your portfolio.',
    link: 'https://github.com/juniegrat',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'project2',
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

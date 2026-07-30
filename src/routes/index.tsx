import { createFileRoute, Link } from '@tanstack/react-router'
import { XIcon } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from '@/components/ui/morphing-dialog'
import {
  BLOG_POSTS,
  CAPABILITIES,
  EMAIL,
  PROJECTS,
  type Project,
  SITE_DESCRIPTION,
  SOCIAL_LINKS,
} from '@/data'
import { WEBSITE_URL } from '@/lib/constants'

export const Route = createFileRoute('/')({
  head: () => ({
    links: [{ rel: 'canonical', href: `${WEBSITE_URL}/` }],
  }),
  component: Home,
})

// Section entry is a CSS animation (see `.enter` in styles.css). 60ms between
// sections; long staggers read as the page loading slowly.
const STAGGER_MS = 60

function enter(index: number) {
  return { className: 'enter', style: { animationDelay: `${index * STAGGER_MS}ms` } }
}

/**
 * Media plate. With no screenshot to show, this renders a measured plate built
 * from theme tokens rather than a colored blur, so all three themes stay on a
 * single hue.
 */
function ProjectPlate({ name, index }: { name: string; index: number }) {
  return (
    <div className="relative flex aspect-video w-full items-end overflow-hidden rounded-plate bg-sunken">
      <div
        aria-hidden="true"
        className="drift absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, var(--line) 0 1px, transparent 1px 24px), repeating-linear-gradient(to bottom, var(--line) 0 1px, transparent 1px 24px)',
          maskImage: 'radial-gradient(120% 120% at 0% 100%, black 10%, transparent 75%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(90% 90% at 12% 115%, var(--accent-soft), transparent 68%)',
        }}
      />
      {/* Registration marks. They give the empty plate a measured composition. */}
      <span
        aria-hidden="true"
        className="absolute top-3 left-3 h-2 w-2 border-t border-l border-accent/45"
      />
      <span
        aria-hidden="true"
        className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-accent/45"
      />
      <span className="relative m-4 font-mono text-xs text-muted">{name}</span>
      <span className="tabular absolute top-4 right-4 font-mono text-xs text-accent">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  )
}

function ProjectMedia({ project, index }: { project: Project; index: number }) {
  const { video, image, name } = project

  if (!video && !image) {
    return <ProjectPlate name={name} index={index} />
  }

  const renderMedia = (className: string) =>
    video ? (
      <video src={video} autoPlay loop muted className={className} />
    ) : (
      <img src={image} alt={name} className={className} />
    )

  return (
    <MorphingDialog transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
      <MorphingDialogTrigger>
        {renderMedia('aspect-video w-full cursor-zoom-in rounded-plate object-cover')}
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-frame bg-raised p-1 ring-1 ring-line ring-inset">
          {renderMedia('aspect-video h-[50vh] w-full rounded-plate object-cover md:h-[70vh]')}
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-raised p-1"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { delay: 0.3, duration: 0.1 } },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-muted" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

function MagneticSocialLink({ children, link }: { children: React.ReactNode; link: string }) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-sunken px-2.5 py-1 text-sm text-ink transition-[background-color,color,transform] duration-200 ease-snap hover:bg-accent hover:text-accent-ink active:scale-[0.97]"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          role="img"
          aria-label="External link"
        >
          <title>External link</title>
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

function Home() {
  return (
    <main className="relative space-y-24">
      <section {...enter(0)}>
        <p className="text-balance text-lg leading-relaxed text-muted">{SITE_DESCRIPTION}</p>
      </section>

      <section {...enter(1)}>
        <h2 className="mb-5 text-lg font-medium text-ink">Selected Projects</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className="reveal space-y-2">
              <div className="drift-host relative rounded-frame bg-raised p-1 ring-1 ring-line ring-inset">
                <ProjectMedia project={project} index={index} />
              </div>
              <div className="px-1">
                <div className="flex items-baseline justify-between gap-3">
                  {project.link ? (
                    <a
                      className="group relative inline-block font-[450] text-ink"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.name}
                      <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-accent transition-[max-width] duration-200 ease-snap group-hover:max-w-full"></span>
                    </a>
                  ) : (
                    <span className="inline-block font-[450] text-ink">{project.name}</span>
                  )}
                  <span className="tabular shrink-0 font-mono text-xs text-faint">
                    {project.year}
                  </span>
                </div>
                <p className="mt-0.5 text-base text-muted">{project.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-sunken px-1.5 py-0.5 font-mono text-[11px] text-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section {...enter(2)}>
        <h2 className="mb-5 text-lg font-medium text-ink">What I Work On</h2>
        <div className="divide-y divide-line border-t border-line">
          {CAPABILITIES.map((capability) => (
            <div
              key={capability.id}
              className="reveal grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
            >
              <h3 className="font-mono text-xs text-accent sm:pt-1">{capability.label}</h3>
              <div>
                <p className="text-base text-muted">{capability.summary}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {capability.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-sunken px-1.5 py-0.5 font-mono text-[11px] text-faint"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section {...enter(3)}>
        <h2 className="mb-3 text-lg font-medium text-ink">Blog</h2>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-sunken"
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
          >
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 rounded-xl px-3 py-3"
                to="/blog/$slug"
                params={{ slug: post.slug }}
                data-id={post.uid}
              >
                <div className="flex flex-col space-y-1">
                  <h3 className="font-normal text-ink">{post.title}</h3>
                  <p className="text-muted">{post.description}</p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </section>

      <section {...enter(4)}>
        <h2 className="mb-5 text-lg font-medium text-ink">Connect</h2>
        <p className="mb-5 text-muted">
          Reach me at{' '}
          <a
            className="text-ink underline decoration-accent decoration-1 underline-offset-2"
            href={`mailto:${EMAIL}`}
          >
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </section>
    </main>
  )
}

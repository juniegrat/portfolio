import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ThemeProvider, themeInitScript } from '@/components/theme-provider'
import { NAME, ROLE, SITE_DESCRIPTION } from '@/data'
import { WEBSITE_URL } from '@/lib/constants'
import appCss from '../styles.css?url'

const SITE_TITLE = `${NAME}, ${ROLE}`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      // `viewport-fit=cover` is what makes env(safe-area-inset-*) report real
      // numbers; the `.safe-x` / `.safe-b` gutters depend on it.
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'theme-color', content: '#ffffff' },
      { title: SITE_TITLE },
      { name: 'description', content: SITE_DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: NAME },
      { property: 'og:title', content: SITE_TITLE },
      { property: 'og:description', content: SITE_DESCRIPTION },
      { property: 'og:url', content: WEBSITE_URL },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: SITE_TITLE },
      { name: 'twitter:description', content: SITE_DESCRIPTION },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* Set theme before paint to avoid a flash of the wrong theme. */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static first-paint theme bootstrap, not user input */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-surface tracking-tight text-ink antialiased">
        <ThemeProvider>
          {/* Theme-gated decoration, both inert in the other themes (see styles.css):
              the instrument measurement grid and the kinetic scroll rail. */}
          <div className="theme-grid" aria-hidden="true" />
          <div className="rail" aria-hidden="true" />
          <div className="relative flex min-h-[100dvh] w-full flex-col">
            {/* 80px of dead air above the name is a desktop luxury; on a phone
                it costs a fifth of the viewport before the first word. */}
            <div className="safe-x relative mx-auto w-full max-w-[640px] flex-1 pt-12 pb-24 sm:pt-20 sm:pb-0">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

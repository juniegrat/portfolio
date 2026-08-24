import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRoute, HeadContent, Scripts, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { IntlProvider } from 'react-intl'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { MobileBar } from '@/components/mobile-bar'
import { ThemeProvider, themeInitScript } from '@/components/theme-provider'
import { NAME, SITE_DESCRIPTION } from '@/data'
import { DEFAULT_LOCALE, HTML_LANG, localeFromPathname } from '@/i18n/locale'
import { MESSAGES } from '@/i18n/messages'
import { WEBSITE_URL } from '@/lib/constants'
import appCss from '../styles.css?url'

// Root head carries the English defaults. Locale-specific routes override the
// title and description in their own `head`, so these are what a crawler sees
// for `/` and for anything that does not set its own.
const SITE_TITLE = `${NAME}, ${MESSAGES[DEFAULT_LOCALE]['role.title']}`
const SITE_DESC = SITE_DESCRIPTION[DEFAULT_LOCALE]

/** Screenshot of the home page in the instrument theme. See README.md. */
const OG_IMAGE = `${WEBSITE_URL}/og.png`
const OG_IMAGE_ALT = `The ${NAME} portfolio home page: the intro line and the first project cards.`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      // `viewport-fit=cover` is what makes env(safe-area-inset-*) report real
      // numbers; the `.safe-x` / `.safe-b` gutters depend on it.
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'theme-color', content: '#ffffff' },
      { title: SITE_TITLE },
      { name: 'description', content: SITE_DESC },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: NAME },
      { property: 'og:title', content: SITE_TITLE },
      { property: 'og:description', content: SITE_DESC },
      { property: 'og:url', content: WEBSITE_URL },
      // Scrapers do not run JS and will not resolve a relative path, so the
      // card image has to be an absolute URL. Regenerate it with the recipe in
      // README.md whenever the home page changes shape.
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: OG_IMAGE_ALT },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: SITE_TITLE },
      { name: 'twitter:description', content: SITE_DESC },
      { name: 'twitter:image', content: OG_IMAGE },
      { name: 'twitter:image:alt', content: OG_IMAGE_ALT },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  // Locale comes from the URL rather than from a header or a cookie: it has to
  // agree between the server render and the client, and the path is the only
  // thing both sides can see. `/fr/...` is French, everything else English.
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const locale = localeFromPathname(pathname)

  return (
    <html lang={HTML_LANG[locale]} suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* Set theme before paint to avoid a flash of the wrong theme. */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static first-paint theme bootstrap, not user input */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-surface tracking-tight text-ink antialiased">
        <IntlProvider
          locale={locale}
          defaultLocale={DEFAULT_LOCALE}
          messages={MESSAGES[locale]}
          // Every key is present in every catalogue by construction (the `en`
          // catalogue types the others), so a miss is a bug worth seeing rather
          // than a console wall in development.
          onError={() => {}}
        >
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
            <MobileBar />
          </ThemeProvider>
        </IntlProvider>
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

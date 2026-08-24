import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    // Vite's default localhost binding resolves to [::1] only, which
    // `tailscale serve` (an IPv4 proxy) cannot reach. Still loopback-only.
    host: '127.0.0.1',
    // `tailscale serve` proxies to 127.0.0.1 but forwards the tailnet hostname
    // as Host, which Vite rejects by default. Tailnet-only — the dev server
    // still binds to localhost, so this opens nothing to the LAN or internet.
    allowedHosts: ['.ts.net'],
  },
  plugins: [
    devtools(),
    nitro({
      vercel: {
        // Avoid Vercel web handler 508 infinite-loop with TanStack Start SSR.
        entryFormat: 'node',
      },
    }),
    tailwindcss(),
    tanstackStart(),
    // MDX must transform `.mdx` before the React plugin runs.
    { enforce: 'pre', ...mdx() },
    viteReact({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
})

export default config

import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
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

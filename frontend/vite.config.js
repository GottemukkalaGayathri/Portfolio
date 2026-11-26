import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const spaRouteEntrypoints = () => ({
  name: 'spa-route-entrypoints',
  closeBundle() {
    const distDir = resolve(import.meta.dirname, 'dist')
    const indexHtml = resolve(distDir, 'index.html')
    for (const route of ['projects', 'certificates', 'certifications']) {
      const routeDir = resolve(distDir, route)
      mkdirSync(routeDir, { recursive: true })
      copyFileSync(indexHtml, resolve(routeDir, 'index.html'))
    }
  },
})

export default defineConfig({
  plugins: [react(), spaRouteEntrypoints()],
  server: { port: 5173 },
})

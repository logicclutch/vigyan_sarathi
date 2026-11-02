import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolveSiteUrl } from './scripts/site-url.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  define: {
    // Public URL for canonical/OG tags: VITE_SITE_URL, else the hosting platform's production URL.
    'import.meta.env.VITE_SITE_URL': JSON.stringify(resolveSiteUrl()),
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: { port: 5173 },
  preview: { port: 4173 },
  build: { target: 'es2022' },
})

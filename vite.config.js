import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Ensures relative asset paths work on GitHub Pages, Vercel, Netlify, etc.
  plugins: [
    react(),
    tailwindcss()
  ],
})

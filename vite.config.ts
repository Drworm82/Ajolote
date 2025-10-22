<link rel="manifest" href="/manifest.webmanifest" />
<meta name="theme-color" content="#0f766e" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Ajolote/', // 👈 IMPORTANTE para GitHub Pages
})

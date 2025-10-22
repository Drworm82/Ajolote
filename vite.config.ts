import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// IMPORTANTE: base para GitHub Pages en /Ajolote/
export default defineConfig({
  plugins: [react()],
  base: '/Ajolote/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})

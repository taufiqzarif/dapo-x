import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: 'hidden',
    outDir: 'build',
  },
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
})

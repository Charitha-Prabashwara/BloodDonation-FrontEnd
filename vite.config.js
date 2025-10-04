import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'build',
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    cors: {
      origin: ['https://localhost', 'http://localhost', 'https://localhost/api/v1', 'http://localhost:/api/v1'],
      methods: ['GET','POST','PUT','DELETE','OPTIONS'],
      credentials: true
    },
    hmr: {
      host: 'localhost',
      protocol: 'ws'
    }
  }
})